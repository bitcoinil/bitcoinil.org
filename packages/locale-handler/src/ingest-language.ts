import arg from 'arg'
import 'dotenv/config'
import { Client } from '@notionhq/client'
import fs from 'fs/promises'
import path from 'path'

import PageManager from './page-manager'
import { databases as schema } from './language-handler'
import NotionDatabaseHandler from './page-manager/database.handler'

const args = arg(
  {
    '--page': String,
    '--token': String,
    '--demo': Boolean,
    '--start-index': Number,
    '--limit': Number,
    '--no-write': Boolean,
    '--no-extract': Boolean,
    '--no-cache-fill': Boolean,
    '--verbose': Boolean
  },
  { permissive: true }
)

const init = async () => {
  const notionToken = args['--token'] || process.env.NOTION_TOKEN
  const pageName = args['--page'] || process.env.NOTION_PAGE
  const verbose = args['--verbose']
  const noWrite = args['--no-write']
  const noExtract = args['--no-extract']
  const noCacheFill = args['--no-cache-fill']
  const allowToPost = true

  const cachedDir = './cached'

  if (!pageName) {
    console.log(
      'ℹ️ Please provide a page name with --page or set the environment variable NOTION_PAGE'
      // 'Pass in page name via cli (e.g. `$ locale-handler --page my-page-name`) or as a env variable named `NOTION_PAGE`'
    )
    throw new Error('Page name is required')
  }
  if (!notionToken) {
    console.log(
      'ℹ️ Please provide a Notion token with --token or set the environment variable NOTION_TOKEN'
      // 'Pass in page name via cli (e.g. `$ locale-handler --page my-page-name`) or as a env variable named `NOTION_PAGE`'
    )
    throw new Error('Notion token is required')
  }

  // Initializing a client
  const client = new Client({
    auth: notionToken
  })

  const caches = {} as Record<string, any>

  verbose && console.log('📄 Initializing on page:', pageName)
  verbose && console.time('init')

  const page = await PageManager.initFromPageName(pageName, client)
  verbose && console.log('📄 Page initialized', page.pageId)

  await new Promise((r) => (page.onReady = () => r(null)))
  verbose && console.timeLog('init', 'Page ready')

  const database = new NotionDatabaseHandler(page, schema)
  verbose && console.log('🗂 Database initialized', database.page.pageId)

  await new Promise((r) => (database.onReady = () => r(null)))
  verbose && console.timeLog('init', 'Database ready')
  verbose && console.log('🗂 Database ready')

  if (!noExtract) {
    const util = await import('node:util')
    const exec = util.promisify((await import('node:child_process')).exec)
    const { stdout, stderr, ...rest } = await exec(
      'cd ../../apps/bitcoin-il/ && yarn extract-intl'
    )
    verbose && console.timeLog('init', 'Language extracted')
    verbose && console.log('🗂 Language ready')
  }

  if (!noCacheFill) {
    // Load cached languages
    const langs = ['en', 'he']

    const result = await langs.reduce(
      (p, lang) =>
        p.then(async (acc) => {
          const filename = path.join(cachedDir, '/', `${lang}.wet.json`)
          const fileData = await fs.readFile(filename, 'utf8')
          const parsedData = (fileData && JSON.parse(fileData)) || {}

          return {
            ...acc,
            [lang]: parsedData
          }
        }),
      Promise.resolve({})
    )
    caches.langs = result
  }

  if (!noWrite) {
    const langData = await (
      await import('fs/promises')
    ).readFile('../../apps/bitcoin-il/lang.json', 'utf8')
    verbose && console.timeLog('init', 'Source ready')

    const demoMode = args['--demo']

    const limitTo = args['--limit'] || 3
    const startFrom = args['--start-index'] || 0
    let lastId = ''
    if (limitTo && allowToPost) {
      try {
        const langDataJSON = JSON.parse(langData)
        const langDataKeys = Object.keys(langDataJSON)
        await langDataKeys.reduce(
          (p, key, index) =>
            ((!demoMode || index <= limitTo - 1) &&
              (!startFrom || startFrom <= index) &&
              p.then(async () => {
                const { defaultMessage, description } = langDataJSON[key]

                const setRes = await database.set('language', key, {
                  Default: demoMode
                    ? defaultMessage.replace(
                        /\d{3}$/,
                        Math.floor(Math.random() * 1000)
                      )
                    : defaultMessage,
                  ...(description ? { Description: description } : {})
                })
                // const setRes = 'fake'
                setRes && verbose && console.log('Set res:', key, '-', setRes)

                const langs = { en: 'English', he: 'Hebrew' }

                const updates = await Object.entries(langs).reduce(
                  (p, [lang, dbName]) =>
                    p.then(async (acc) => {
                      const cached = caches.langs[lang]?.[key]
                      if (cached) {
                        const createRes = await database.set(
                          `${lang}-language`,
                          cached,
                          {}
                        )
                        // const createRes = 'fake'
                        await database.set('language', key, {
                          [dbName]: [createRes]
                        })
                        caches.hits = {
                          ...(caches.hits || {}),
                          [lang]: [...((caches.hits || {})[lang] || []), key]
                        }
                        return {
                          ...acc,
                          [lang]: 'created'
                        }
                      }
                      return {
                        ...acc
                      }
                    }),
                  Promise.resolve({})
                )
                verbose && console.log('Updates:', key, '-', updates)

                verbose &&
                  console.timeLog(
                    'init',
                    `Finished '${key}' (${index + 1}/${langDataKeys.length})`
                  )
                lastId = setRes
              })) ||
            p,
          Promise.resolve()
        )
        verbose && console.timeLog('init', 'Language loaded into notion')

        const missed = Object.entries(caches.langs)
          .map(([lang, cached]: [string, any]) => {
            const keys = Object.keys(cached)
            const misses = keys.filter(
              (key) => (caches.hits[lang] || []).indexOf(key) === -1
            )
            return [lang, misses]
          })
          .reduce(
            (acc, [lang, misses]: any) => ({ ...acc, [lang]: misses }),
            {}
          )
        const langs = { en: 'English', he: 'Hebrew' } as Record<string, any>

        const missedUpdates = await Object.entries(missed).reduce(
          (p, [lang, misses]) =>
            p.then(async (acc) => {
              const dbName = langs[lang]
              const reses = await (misses as string[]).reduce(
                (sp, missingKey) =>
                  sp.then(async (sacc) => {
                    const langValue = caches.langs[lang][missingKey]
                    const setRes = await database.set('language', missingKey, {
                      ...(lang === 'en' ? { Default: langValue } : {})
                      // ...(description ? { Description: description } : {})
                    })

                    const createRes = await database.set(
                      `${lang}-language`,
                      langValue,
                      {}
                    )

                    await database.set('language', missingKey, {
                      [dbName]: [createRes]
                    })

                    return {
                      ...sacc,
                      [missingKey]: 'updated'
                    }
                  }),
                Promise.resolve({})
              )
              return {}
            }),
          Promise.resolve({})
        )

        verbose && console.timeLog('init', 'Missed items filled')
        verbose && console.log('🗂 Language write complete')
      } catch (e) {
        console.error('📄 Error filling in database', e)
      }
    }

    if (demoMode && lastId) {
      verbose &&
        console.log('🚨🚨🚨🚨 DELETING LAST ID in 20 seconds...', lastId)
      setTimeout(async () => {
        verbose && console.log('🚨🚨🚨🚨 DELETING LAST ID', lastId)
        await client.pages.update({
          page_id: lastId,
          archived: true
        })
      }, 20000)
    }
  }

  verbose && console.log('🗂 Everything ready')
  verbose && console.timeEnd('init')
}

export default init
