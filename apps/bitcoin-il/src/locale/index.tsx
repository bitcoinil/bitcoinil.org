import * as React from 'react'
import { ConfigProvider } from 'antd'
import { useRecoilState } from 'recoil'
import { currentlySelectedLanguage } from '../state/state'
import { IntlProvider } from 'react-intl'

import locales from '@bitil/locales'
import { useLocation } from 'react-router-dom'
import { useTranslations } from '../hooks/useTranslations'

const LocaleProvider = ({ children }) => {
  const [ln, setLn] = useRecoilState(currentlySelectedLanguage)
  const [atomLang, setAtomLang] = useRecoilState(currentlySelectedLanguage)
  const location = useLocation()

  const intl = useTranslations()
  const { availableLanguages } = intl

  React.useEffect(() => {
    if (
      atomLang.language !== 'en' &&
      !location.pathname.startsWith(`/${atomLang.language}/`)
    ) {
    }
  }, [location, atomLang])

  React.useEffect(() => {
    availableLanguages.forEach((avLang) => {
      if (location.pathname.startsWith(`/${avLang.name}`)) {
        setLn({ language: location.pathname.substring(1, 3) })
        setAtomLang({ language: location.pathname.substring(1, 3) })
      }
    })
  }, [])

  return (
    <ConfigProvider direction={ln.language === 'he' ? 'rtl' : 'ltr'}>
      <IntlProvider
        // @ts-ignore
        messages={locales[ln.language]}
        locale={ln.language}
        defaultLocale="en"
        onError={(err) => {
          // console.log('Error from translation:', err)
          // Here be collecting missing translations!
          // Maybe shove them back to notion or something?
        }}
      >
        {children}
      </IntlProvider>
    </ConfigProvider>
  )
}

export default LocaleProvider
