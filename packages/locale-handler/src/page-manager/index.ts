import { Client } from '@notionhq/client'
import {
  ListBlockChildrenResponse,
  QueryDatabaseResponse
} from '@notionhq/client/build/src/api-endpoints'
import NotionDatabaseHandler from './database.handler'

type Cache = {
  confBlockId?: string
  containers: Record<string, any>
  handlers: Record<string, any>
  items: Record<string, string>
  values: Record<string, any>
  fetching: Record<string, Promise<any> | null | false>
  blocks: Record<string, ListBlockChildrenResponse>
}

type BaseBlock = {
  id: string
}

type ToggleBlock = BaseBlock & {
  type: 'toggle-block'
  keys: () => string[]
  set: (key: string, value: any) => Promise<void>
  get: (key: string) => Promise<any>
}

type DatabaseBlock = BaseBlock & {
  type: 'database-block'
  rows: () => number
}

type ABlock = ToggleBlock | DatabaseBlock

type BlockHandler = {
  find: (children: ListBlockChildrenResponse) => Record<string, any>
  create: () => Promise<any>
  read: (pageSize?: number, readAll?: Boolean) => Promise<any>
  write: (key: string, value: any) => Promise<void>
  get: (key?: string, read?: () => Promise<any>) => Promise<any>
  listen: (callback: (data: any) => void) => void
}

type BlockHandlers = {
  [handlerType: string]: (
    parentBlockId: string,
    name: string,
    cacheObject: Record<string, any>,
    properties?: Record<string, any>,
    wetProperties?: Record<string, any>
  ) => BlockHandler
}

class PageManager {
  static BLOCK_PREFIX = '🧧 '
  static KEY_VALUE_PREFIX = `⚙️ `

  public onReady = () => {}

  public pageName: string = ''
  public pageId: string = ''

  public client: Client
  // private cache: Cache = { /**
  public cache: Cache = {
    //  */
    containers: {},
    handlers: {},
    items: {},
    values: {},
    fetching: {},
    blocks: {}
  }

  static async initFromPageName(pageName: string, notion: Client) {
    const pageId = await this.findPageIdByName(pageName, notion)
    if (!pageId) throw new Error('Page not found')

    const pageManager = new PageManager(pageId, notion)
    pageManager.pageName = pageName

    return pageManager
  }

  static async findPageIdByName(pageName: string, client: Client) {
    const response = await client.search({
      query: pageName,
      sort: {
        direction: 'descending',
        timestamp: 'last_edited_time'
      }
    })

    const ourPage = response.results.find((page: any) => {
      const title = page.properties.title.title.reduce(
        (acc: string, { plain_text }: { plain_text: string }) =>
          acc + plain_text,
        ''
      )
      return title === pageName
    })

    return ourPage?.id
  }

  constructor(pageId: string, client: Client) {
    this.pageId = pageId
    this.client = client

    this.init()
  }

  public async getOption(optionName: string) {
    // @ts-ignore
    return await this.blocks.configuration?.get(optionName)
  }

  public async setOption(optionName: string, value: any) {
    // @ts-ignore
    return this.blocks.configuration?.set(optionName, value)
  }

  public async getDatabase(
    dbName: string,
    properties: Record<string, any>,
    wetProperties: Record<string, any>
  ) {
    // // @ts-ignore
    // let dbId = this.blocks.databases?.get(dbName)
    this.cache.containers[`database-${dbName}`] = {
      dbName
    }
    const cache = this.cache.containers[`database-${dbName}`]
    const dbHandler = this.blockHandler.database(
      this.pageId,
      dbName,
      cache,
      properties,
      wetProperties
    )

    // @ts-ignore
    let db = await dbHandler.find()
    if (!db) {
      const res = await dbHandler.create()
      if (res) {
        // @ts-ignore
        this.blocks.databases.set(dbName, res.id)
        db = res
      }
    }

    return {
      instance: db,
      attachHandler: (handler: NotionDatabaseHandler) => {
        this.cache.handlers[dbName] = handler
        cache.handler = handler
      },
      updateProperties: (properties: Record<string, any>) =>
        // @ts-ignore
        dbHandler.updateProperties(properties),
      read: (pageSize?: 100, readAll?: Boolean) =>
        dbHandler.read(pageSize, readAll),
      getAll: () => 'ALL',
      get: (key: string) => dbHandler.get(key),
      set: (key: string, value: any) => dbHandler.write(key, value),
      listen: (callback: (data: any) => void) => dbHandler.listen(callback)
    }
  }

  private async init() {
    await this.initBlocks()

    this.onReady?.()
  }

  private async initBlocks() {
    const children = await this.getBlock(this.pageId)
    const conf = this.blocksConfiguration
    // Iterate all `this.block` entries to initialize and load the blocks
    const nextBlocks = {}

    await Object.entries(conf).reduce(
      async (p, [blockName, options]) =>
        p.then(async () => {
          this.cache.containers[blockName] = {
            ...(this.cache.containers[blockName] || {})
          }
          const cache = this.cache.containers[blockName]
          const blockType = options.type
          const handler = this.blockHandler[blockType]
          const actions = handler(this.pageId, blockName, cache)

          let block = actions.find(children)

          if (!block) {
            block = await actions.create()
          }

          const [results, conf] = await actions.read()
          const blockApp = {
            ...options,
            id: block.id,
            get: (key?: string) => actions.get(key, () => actions.read()),
            set: actions.write,
            keys: () => Object.keys(cache.values)
          } as ABlock

          // @ts-ignore
          nextBlocks[blockName] = blockApp
        }),
      Promise.resolve()
    )

    this.blocks = nextBlocks
    // this.blocks = nextBlocks.reduce(
    //   (acc, [blockName, block]) => ({ ...acc, [blockName as string]: block }),
    //   {}
    // )
  }

  private blocksConfiguration = {
    configuration: {
      type: 'toggle-block'
    },
    databases: {
      type: 'toggle-block'
    }
    // general: {
    //   type: "toggle-block",
    // },
  } as const

  private blocks = {}

  private blockHandler: BlockHandlers = {
    // @ts-ignore
    'toggle-block': (
      parentBlockId: string,
      blockName: string,
      cacheObject: Record<string, any>
    ) => ({
      find: (children: ListBlockChildrenResponse) => {
        if (cacheObject.block) return cacheObject.block

        const block = this.findToggleBlock(blockName, children)

        if (!block) return null

        cacheObject.block = block
        cacheObject.blockId = block.id
        return block
      },
      create: async () => {
        const res = await this.writeToggleBlock(parentBlockId, blockName, {
          created: new Date().toISOString()
        })
        cacheObject.block = res
        cacheObject.blockId = res.id
        return res
      },
      read: async () => {
        const blockId = cacheObject.blockId
        const children = await this.getBlock(blockId)
        const [results, config] = await this.parseToggleBlock(children)

        // store in local cache
        // @ts-ignore
        await results.reduce(
          (
            p: Promise<any>,
            { key, value, block, blockId, ...rest }: Record<string, any>
          ) =>
            p.then(async () => {
              cacheObject.ids = { ...(cacheObject.ids || {}), [key]: blockId }
              cacheObject.values = {
                ...(cacheObject.values || {}),
                [key]: value
                  ? PageManager.parseValue(value)
                  : rest['truncated-value']
                  ? await this.loadBlockValue(block.id)
                  : null
              }
            }),
          Promise.resolve()
        )

        return [results, config]
      },
      write: async (key: string, value: any) => {
        const blockId = cacheObject.ids?.[key]

        if (!blockId) {
          const result = await this.writeNewToggleValue(
            cacheObject.blockId,
            key,
            value
          )
          cacheObject.ids = { ...(cacheObject.ids || {}), [key]: result.id }
        } else {
          const result = await this.updateToggleValue(blockId, key, value)
          return result
        }
        cacheObject.values = {
          ...(cacheObject.values || {}),
          [key]: value
        }
      },
      get: async (key?: string, read?: any) => {
        // console.log('🩸 GET KEY', `[${key}]`)
        // console.log('🩸 cacheObject', cacheObject)
        // key && console.log('🩸 cacheObject.values[key]', `[${key}]`, cacheObject.values?.[key])
        if (!key) return cacheObject.values
        if (cacheObject.values?.[key]) return cacheObject.values[key]

        read && (await read?.())
        // key && console.log('🩸 after loading cache cacheObject.values[key]', `[${key}]`, cacheObject.values?.[key])

        return cacheObject.values?.[key]
      }
    }),

    //
    //
    //
    //
    //
    //
    //
    // 88888888ba,                                     88
    // 88      `"8b                 ,d                 88
    // 88        `8b                88                 88
    // 88         88  ,adPPYYba,  MM88MMM  ,adPPYYba,  88,dPPYba,   ,adPPYYba,  ,adPPYba,   ,adPPYba,
    // 88         88  ""     `Y8    88     ""     `Y8  88P'    "8a  ""     `Y8  I8[    ""  a8P_____88
    // 88         8P  ,adPPPPP88    88     ,adPPPPP88  88       d8  ,adPPPPP88   `"Y8ba,   8PP"""""""
    // 88      .a8P   88,    ,88    88,    88,    ,88  88b,   ,a8"  88,    ,88  aa    ]8I  "8b,   ,aa
    // 88888888Y"'    `"8bbdP"Y8    "Y888  `"8bbdP"Y8  8Y"Ybbd8"'   `"8bbdP"Y8  `"YbbdP"'   `"Ybbd8"'
    //
    //

    // @ts-ignore
    database: (
      parentBlockId: string,
      dbName: string,
      cacheObject: Record<string, any>,
      dbProperties: Record<string, any>,
      wetDbProperties: Record<string, any>
    ) => ({
      find: async () => {
        if (cacheObject.db) return cacheObject.dbHandler

        // @ts-ignore
        const dbId = await this.blocks.databases.get(dbName)

        if (!dbId) return null

        const db = await this.client.databases.retrieve({
          database_id: dbId
        })

        cacheObject.db = db
        cacheObject.dbId = dbId
        return db
      },
      updateProperties: async (properties: any) => {
        const result = await this.client.databases.update({
          database_id: cacheObject.dbId,
          title: cacheObject.db.title as any,
          properties
        })
        return result
      },
      create: async () => {
        const res = await this.createDatabase(this.pageId, dbName, dbProperties)

        const db = await this.client.databases.retrieve({
          database_id: res.id
        })

        cacheObject.db = db
        cacheObject.dbId = res.id

        return db
      },
      read: async (pageSize?: 100, readAll?: true) => {
        const [indexName] = Object.entries(dbProperties).find(
          ([dbName, prop]) => prop.type === 'title'
        ) as any

        const items = []
        let cursor

        while (true) {
          const response = (await this.client.databases.query({
            database_id: cacheObject.dbId,
            page_size: pageSize,
            sorts: [
              {
                property: indexName,
                direction: 'ascending'
              }
            ],
            ...(cursor ? { start_cursor: cursor } : {})
          })) as any

          if (response.results.length) items.push(...response.results)

          if ((typeof readAll === 'undefined' || readAll) && response.has_more)
            cursor = response.next_cursor
          else break
        }

        const valued = PageManager.valuefy(items)

        if (cacheObject.handler) {
          const handler = cacheObject.handler

          const final = await valued.reduce(
            (p, item) =>
              p.then(async (results: any[]) => {
                const hydrated = await handler.hydrateValues(
                  dbName,
                  item.values
                )
                return [...results, { ...item, hydrated }]
              }),
            Promise.resolve([])
          )

          return final
        }
        return valued
      },
      write: async (key: string, data: any) => {
        const [indexName, indexProperty] = Object.entries(dbProperties).find(
          ([dbPropName, prop]) => prop.type === 'title'
        ) as any

        // Find row ID
        const queryObject = {
          database_id: cacheObject.dbId,
          filter: {
            property: indexName,
            [indexProperty.type as 'rich_text']: {
              equals: key
            }
          }
        }

        const response = await this.client.databases.query(queryObject)
        if (response.results.length) {
          const resultProperties = (response.results[0] as any).properties

          // Find the differences
          const differences = Object.entries(data).filter(
            ([dataKey, dataValue]: [string, any]) =>
              dataValue !== PageManager.propertyValue(resultProperties[dataKey])
          )

          if (differences.length) {
            const preProperties = differences.reduce(
              (acc, [key, value]) => ({ ...acc, [key]: value }),
              {}
            )

            const properties = PageManager.dataToProperties(
              preProperties,
              dbProperties,
              wetDbProperties
            )

            const updateObject = {
              page_id: response.results[0].id,
              properties
            }

            await this.client.pages.update(updateObject)
          }
          return response.results[0].id
        } else {
          const properties = PageManager.dataToPropertiesWithKey(
            key,
            data,
            dbProperties,
            wetDbProperties
          )

          const response = await this.client.pages.create({
            parent: {
              database_id: cacheObject.dbId
            },
            icon: {
              type: 'emoji',
              emoji: '🥬'
            },
            properties
          })
          return response.id
        }
      },
      get: async (key: string) => {},
      listen: async (callback: () => Promise<void>) => {
        cacheObject.listenCount = 0
        cacheObject.last_edited_time = ''

        const filename = `./dist/database-${dbName}-cache.json`

        const readFromDatabase = async () => {
          const response = await this.client.databases.query({
            database_id: cacheObject.dbId,
            sorts: [
              {
                property: 'LastUpdate',
                direction: 'descending'
              }
            ]
          })
          return response?.results?.[0]
        }
        const readFromFile = async () => {
          // read from file and compare

          try {
            const fileData = await (
              await import('fs/promises')
            ).readFile(filename, 'utf8')
            if (fileData)
              try {
                const parsedData = JSON.parse(fileData)
                return parsedData
              } catch (e) {
                console.log('🏓', e)
              }
          } catch (e: any) {
            if (e.code === 'ENOENT') return null
            else console.log('🪀', e)
          }
        }

        const writeToFile = async (data: any) => {
          await (
            await import('fs/promises')
          ).writeFile(filename, JSON.stringify(data, null, 2))
        }

        while (true) {
          const live = await readFromDatabase()

          const file = await readFromFile()
          // // @ts-ignore
          // console.log(
          //   'Checking',
          //   dbName,
          //   '\nChanged:',
          //   // @ts-ignore
          //   live?.last_edited_time !== file?.last_edited_time,
          //   '\nLive:',
          //   // @ts-ignore
          //   live?.last_edited_time,
          //   '\nFile:',
          //   // @ts-ignore
          //   file?.last_edited_time
          // )

          if (live) {
            // @ts-ignore
            if (live.last_edited_time !== file?.last_edited_time) {
              // @ts-ignore
              await callback(live.last_edited_time)
              await writeToFile(live)
            }
          }

          // sleep for 3 seconds
          await new Promise((resolve) => setTimeout(resolve, 3000))
        }
      }
    })
  }

  private findToggleBlock(name: string, children: ListBlockChildrenResponse) {
    // @ts-ignore
    // console.log("🐇🐕 Finding the toggles:", children.results[0].toggle);
    return (
      children?.results?.length > 0 &&
      children.results.find(
        (block: any) =>
          block.type === 'toggle' &&
          (block.toggle.rich_text?.[0]?.plain_text ===
            `${PageManager.BLOCK_PREFIX}${name}` ||
            block.toggle.text?.[0]?.plain_text ===
              `${PageManager.BLOCK_PREFIX}${name}`)
      )
    )
  }

  private async getBlock(
    blockId: string,
    forceUpdate = false
  ): Promise<ListBlockChildrenResponse> {
    if (!forceUpdate && this.cache.blocks[blockId])
      return this.cache.blocks[blockId]

    if (this.cache.fetching[blockId]) return this.cache.fetching[blockId]

    const prom: Record<string, any> = {}

    const promise = new Promise((rs, rj) => {
      prom.resolve = rs
      prom.reject = rj
    })
    this.cache.fetching[blockId] = promise

    const response = await this.client.blocks.children.list({
      block_id: blockId,
      page_size: 500
    })

    this.cache.blocks[blockId] = response
    prom.resolve(response)
    this.cache.fetching[blockId] = null

    return response
  }

  private async writeToggleBlock(blockId: string, name: string, data: any) {
    const childs = PageManager.dataToToggleChildren(data) as any
    const longPut = childs.length > 99

    const appendObject = {
      block_id: blockId,
      children: [
        {
          type: 'toggle',
          toggle: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: PageManager.BLOCK_PREFIX + name,
                  link: null
                }
              }
            ],
            color: 'default',
            children: longPut ? childs.slice(0, 99) : childs
          }
        }
      ]
    }

    // @ts-ignore
    const response = await this.client.blocks.children.append(appendObject)

    if (longPut) {
      await this.client.blocks.children.append({
        block_id: blockId,
        children: childs.slice(99)
      })
    }
    return response.results[0]
  }

  private async writeNewToggleValue(
    blockId: string,
    key: string,
    data: any,
    linkUrl = ''
  ) {
    const childs = PageManager.getValueChildren(data) as any
    const longPut = childs.length > 99

    const response = await this.client.blocks.children.append({
      block_id: blockId,
      children: [
        {
          type: 'toggle',
          toggle: {
            rich_text: PageManager.getKeyValueRichText(key, data) as any,
            color: 'gray',
            children: longPut ? childs.slice(0, 99) : childs
          }
        }
      ]
    })

    if (longPut) {
      await this.client.blocks.children.append({
        block_id: blockId,
        children: childs.slice(99)
      })
    }
    return response.results[0]
  }

  private async updateToggleValue(blockId: string, key: string, value: any) {
    if (!key) throw new Error('Key for blockId not found')

    const response = await this.client.blocks.update({
      block_id: blockId,
      toggle: {
        rich_text: PageManager.getKeyValueRichText(key, value) as any,
        color: 'gray'
      }
    })

    const children = await this.getBlock(blockId, true)
    await Promise.all(
      children.results.map((block: any) =>
        this.client.blocks.delete({
          block_id: block.id
        })
      )
    )
    await this.client.blocks.children.append({
      block_id: blockId,
      children: PageManager.getValueChildren(value) as any
    })

    return response
  }

  private async createDatabase(
    parentId: string,
    dbName: string,
    properties: any
  ) {
    const createProps = {
      parent: {
        page_id: parentId
      },
      title: [
        {
          type: 'text',
          text: {
            content: dbName,
            link: null
          }
        }
      ],
      properties
    }

    // @ts-ignore
    const myDb = await this.client.databases.create(createProps)

    return myDb
  }

  private async parseToggleBlock(items: ListBlockChildrenResponse) {
    const results = items.results
      .filter(
        (block: any) =>
          block.type === 'toggle' &&
          (block.toggle.rich_text?.[0]?.plain_text ===
            PageManager.KEY_VALUE_PREFIX ||
            block.toggle.text?.[0]?.plain_text === PageManager.KEY_VALUE_PREFIX)
      )
      .map((block: any) =>
        block.toggle[block.toggle.rich_text ? 'rich_text' : 'text']
          .map((text: any) => [
            text.href.match(/^https:\/\/notion.settings.config\/(.*)\/$/)?.[1],
            text.plain_text
          ])
          .filter(
            ([itemType]: string[]) =>
              ['key', 'value', 'truncated-value'].indexOf(itemType) >= 0
          )
          .reduce(
            (acc: any, [key, value]: string[]) => ({
              ...acc,
              [key]: value
            }),
            {
              block,
              blockId: block.id
            }
          )
      )

    const configed = {}

    await results.reduce(
      async (p, setting: Record<string, string>) =>
        p.then(async () => {
          // @ts-ignore
          configed[setting.key] = setting.value
            ? PageManager.parseValue(setting.value)
            : setting['truncated-value']
            ? // @ts-ignore
              await this.loadBlockValue(setting.block.id)
            : ''
        }),
      Promise.resolve()
    )

    return [results, configed]
  }

  private async loadBlockValue(blockId: string) {
    // console.log("🍄🪺 LOADING BLOCK VALUE:", blockId);

    let result
    let cursor
    let collected = ''

    while (true) {
      result = await this.client.blocks.children.list({
        block_id: blockId,
        page_size: 100,
        ...(cursor ? { cursor } : {})
      })

      // @ts-ignore
      const texts = result.results
        .find((block: any) => block.type === 'code')
        // @ts-ignore
        ?.code?.text?.map((text: any) => text.plain_text)
        .join('')
      collected = collected + texts
      if (result.has_more) {
        cursor = result.next_cursor
        continue
      } else break
    }

    // console.log("🍄🪺 Texts:", texts);
    try {
      const value = JSON.parse(collected)
      // console.log("🍄🪺 LOADED VALUE:", blockId, value);
      return value
    } catch (e) {
      console.log('🍄🪺 ERROR VALUE:', blockId, e)
      return null
    }

    // try {
    //   const result = JSON.parse(value);
    //   return result;
    // } catch (error) {
    //   return null;
    // }
  }

  static dataToToggleChildren(data: any) {
    return Object.entries(data).map(([key, value]: [string, any]) => ({
      type: 'toggle',
      //...other keys excluded
      toggle: {
        rich_text: PageManager.getKeyValueRichText(key, value) as any,
        color: 'gray',
        children: PageManager.getValueChildren(value) as any
      }
    }))
  }

  static getKeyValueRichText(key: string, data: any) {
    const value = JSON.stringify(data)

    return [
      {
        type: 'text',
        text: {
          content: PageManager.KEY_VALUE_PREFIX,
          link: {
            url: 'https://notion.settings.config/key-value-prefix/'
          }
        }
      },
      {
        type: 'text',
        text: {
          content: key,
          link: {
            url: 'https://notion.settings.config/key/'
          }
        },
        annotations: {
          code: true,
          color: 'green'
        }
      },
      {
        type: 'text',
        text: {
          content: '=',
          link: {
            url: 'https://notion.settings.config/equal/'
          }
        }
      },
      {
        type: 'text',
        text: {
          content: value.length < 256 ? value : value.substring(0, 56) + '...',
          ...(value.length < 256
            ? {
                link: {
                  url: 'https://notion.settings.config/value/'
                }
              }
            : {
                link: {
                  url: 'https://notion.settings.config/truncated-value/'
                }
              })
        },
        annotations: {
          code: true,
          color: 'blue'
        }
      }
    ]
  }

  static getValueChildren(data: any) {
    const formattedValue = JSON.stringify(data)

    const chunks = formattedValue.match(/.{1,1501}/g)
    if (!chunks) return false

    return [
      {
        object: 'block',
        type: 'code',
        code: {
          rich_text: chunks.map((line: string) => ({
            type: 'text',
            text: {
              content: line,
              link: {
                url: 'https://notion.settings.config/formatted-value/'
              }
            }
          })),
          language: 'json'
        }
      }
    ]
  }

  static parseValue(value: string) {
    try {
      const result = JSON.parse(value)
      return result
    } catch (error) {
      return null
    }
  }

  static dataToPropertiesWithKey(
    key: string,
    data: any,
    dbProperties: Record<string, any>,
    wetProperties: Record<string, any>
  ) {
    const [indexName] =
      Object.entries(dbProperties).find(([, prop]) => prop.type === 'title') ||
      []

    if (!indexName) throw new Error('Index name not found')

    const properties = PageManager.dataToProperties(
      {
        [indexName]: key,
        ...data
      },
      dbProperties,
      wetProperties
    )
    return properties
  }

  static dataToProperties(
    data: any,
    dbProperties: Record<string, any>,
    wetProperties: Record<string, any>
  ) {
    const properties = Object.entries({
      ...data
    })
      .map(([nkey, value]) => {
        const [dbName, prop] =
          Object.entries(dbProperties).find(
            ([dbName, property]) => dbName === nkey
          ) ||
          Object.entries(wetProperties).find(
            ([localName, prop]) => localName === nkey
          ) ||
          ([] as any)

        if (prop.type === 'title') {
          return {
            [dbName]: {
              title: [
                {
                  text: {
                    content: value
                  }
                }
              ]
            }
          }
        }
        if (prop.type === 'rich_text') {
          return {
            [dbName]: {
              [prop.type]: [
                {
                  text: {
                    content: value
                  }
                }
              ]
            }
          }
        }
        if (prop.type === 'number') {
          return {
            [dbName]: {
              [prop.type]: Number(value)
            }
          }
        }
        if (prop.type === 'relation') {
          return {
            [dbName]: {
              [prop.type]: (value as string[]).map((id) => ({ id }))
            }
          }
        }
      })
      .reduce((acc, exp) => ({ ...acc, ...exp }), {}) as any
    return properties
  }

  static propertyValue = (prop: any) =>
    prop.type === 'rich_text' || prop.type === 'text' || prop.type === 'title'
      ? prop[prop.type].reduce(
          (acc: string, rt: any) =>
            `${acc && acc + ' '}${rt.type === 'text' && rt.text.content}`,
          ''
        )
      : prop.type === 'number' ||
        prop.type === 'checkbox' ||
        prop.type === 'created_time' ||
        prop.type === 'last_edited_time'
      ? prop[prop.type]
      : prop.type === 'relation'
      ? prop.relation.map(({ id }: any) => id).join(', ')
      : prop.type === 'date'
      ? `${prop.date.start}${prop.date.end ? ' - ' + prop.date.end : ''}`
      : prop.type === 'formula'
      ? prop.formula[prop.formula.type]
      : prop.type === 'multi_select'
      ? prop.multi_select.map(({ name }: any) => name).join(', ')
      : `Unsupported prop type: ${prop.type}`

  static valuefy = (items: QueryDatabaseResponse[]) =>
    items
      .map((item: any) => ({
        ...item,
        properties: Object.entries(item.properties)
          .map(([name, prop]: [string, any]) => [
            name,
            { ...prop, value: PageManager.propertyValue(prop) }
          ])
          .reduce((acc, [name, prop]) => ({ ...acc, [name]: prop }), {})
      }))
      .map((item) => ({
        ...item,
        values: Object.entries(item.properties).reduce(
          (acc, [name, prop]: [string, any]) => ({
            ...acc,
            [name]: prop.value
          }),
          {}
        )
      }))
}

export default PageManager
