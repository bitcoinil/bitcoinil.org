import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../components/HomePage'
import { useTranslations } from '../hooks/useTranslations'
import { mainMenuItems } from './mainMenuItems'
import { nonMenuRoutes } from './nonMenuRoutes'
import NotARoute from '../layout/NotARoute'

const RoutesProvider = () => {
  const intl = useTranslations()
  const { availableLanguages } = intl
  return (
    <Routes>
      {availableLanguages.map((lang, ii) => {
        const langCode = lang.name === 'en' ? '' : `${lang.name}/`
        return mainMenuItems.map((menuItem, i) => {
          const { submenu } = menuItem

          if (submenu) {
            return submenu.map((subMenuItem, ii) => {
              return (
                <Route
                  key={`submenu-item-${ii}`}
                  path={`/${langCode}${subMenuItem.key}`}
                  element={subMenuItem.element}
                />
              )
            })
          }

          return (
            <Route
              key={i}
              path={`/${langCode}${menuItem.key}`}
              element={menuItem.element}
            />
          )
        })
      })}

      {availableLanguages.map((lang, ii) => {
        const langCode = lang.name === 'en' ? '' : `${lang}/`

        nonMenuRoutes.map((route) => {
          return (
            <Route
              key={route.key}
              path={`/${langCode}${route.path}`}
              element={route.element}
            />
          )
        })
      })}

      {availableLanguages.map((lang, i) => {
        // console.log(lang.name)
        const base = lang.name === 'en' ? '' : lang.name
        return (
          <Route
            key={`base-route-${i}`}
            path={`${base}/`}
            element={<HomePage />}
          />
        )
      })}
      <Route path="*" element={<NotARoute />} />
    </Routes>
  )
}

export default RoutesProvider
