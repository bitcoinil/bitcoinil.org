import * as React from 'react'
import { Helmet } from 'react-helmet'
import styled, { createGlobalStyle } from 'styled-components'
import { Button } from 'antd'

import type { CompiledTheme, CompiledVariant } from '@djitsu/themes'
import { themes } from '@djitsu/themes'
import { ThemeContextValue } from '../utils/interfaces'
import FaviconHandler from './favicon'

const { createContext, useContext, useMemo, useState } = React

const showDebugButton = false
// const showDebugButton = true

const BASE_URL = import.meta.env.BASE_URL || '/'

const defaultThemeContext: ThemeContextValue = [
  { themes: [], active: { theme: '', variant: '', isDark: false }, debug: {} },
  { setTheme: () => {} }
]
const ThemeContext = createContext(defaultThemeContext)

type Props = {
  children: JSX.Element
}

const Theme = ({ children }: Props) => {
  const [selectedTheme, selectedVariant] = ['bitil-theme', '']
  const [activeState, setActiveState] = useState({
    theme: selectedTheme,
    variant: selectedVariant,
    isDark: false
  })

  const [showDebug, setShowDebug] = React.useState(false)
  const [prefersDark, setPrefersDark] = React.useState(false)

  const isPrefersDarkInitial = useMemo(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      // dark mode
      return true
    }
    return false
  }, [])

  React.useEffect(() => {
    const handler = (event: any) => {
      const newColorScheme = event.matches ? 'dark' : 'light'
      setPrefersDark(newColorScheme === 'dark')
    }
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handler)

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handler)
    }
  }, [])

  const state = {
    themes,
    active: activeState,
    debug: {}
  }

  const actions = {
    setTheme: (theme: string, variant?: string) => {
      setActiveState((v) => ({ ...v, theme, variant: variant || '' }))
    }
  }

  const [hrefLight, hrefDark] =
    useMemo(() => {
      const theme = themes.find(
        ({ name }: CompiledTheme) => state.active.theme === name
      )
      if (!theme) return null

      if (!state.active.variant) {
        const variantLight = theme.variants.find(
          ({ isDark }: CompiledVariant) => !isDark
        )
        const variantDark = theme.variants.find(
          ({ isDark }: CompiledVariant) => isDark
        )
        return [
          variantLight && `${BASE_URL}themes/${variantLight.css}`,
          variantDark && `${BASE_URL}themes/${variantDark.css}`
        ]
      }
      const variant = theme?.variants.find(
        ({ name }: CompiledVariant) => state.active.variant === name
      )

      if (!variant) return null

      return [`${BASE_URL}themes/${variant.css}`]
    }, [state.active.variant, state.active.theme]) || []

  const fontHref = useMemo(() => {
    const theme = themes.find(
      ({ name }: CompiledTheme) => state.active.theme === name
    )
    if (!theme) return null

    return theme.fontStylesheet
  }, [state.active.theme])

  state.debug = {
    activeState,
    hrefLight,
    hrefDark,
    fontHref,
    prefersDark,
    isPrefersDarkInitial
  }

  return (
    <ThemeContext.Provider value={[state, actions]}>
      <Helmet>
        {hrefLight && (
          <link
            rel="stylesheet"
            href={hrefLight}
            media={hrefDark && '(prefers-color-scheme: light)'}
          />
        )}
        {hrefDark && (
          <link
            rel="stylesheet"
            href={hrefDark}
            media="(prefers-color-scheme: dark)"
          />
        )}
        {/* Check if fontHref is array */}
        {fontHref &&
          (Array.isArray(fontHref) ? (
            fontHref.map((fh) => (
              <link key={'font-href ' + fh} rel="stylesheet" href={fh} />
            ))
          ) : (
            <link rel="stylesheet" href={fontHref} />
          ))}
      </Helmet>
      
      <FaviconHandler />

      {showDebug ? (
        <>
          <GlobalStyle />
          <div className="themer">
            <h1>DEBUG: </h1>
            <pre>{JSON.stringify(state.debug, null, 2)}</pre>
            <h2>This is theme stuff</h2>
            <h1>Current Theme</h1>
            <pre>{JSON.stringify(activeState, null, 2)}</pre>
            <Button type="primary">IMMA BUTTON</Button>

            <pre>{JSON.stringify(themes, null, 2)}</pre>
            <Button
              onClick={() => {
                actions.setTheme('bitil-theme', 'bitil-dark')
              }}
            >
              Change to Dark
            </Button>
            <Button
              onClick={() => {
                actions.setTheme('bitil-theme', 'bitil-light')
              }}
            >
              Change to Light
            </Button>
          </div>
          <DebugButtons>
            <button onClick={() => setShowDebug(false)}>
              Hide Theme Debug
            </button>
          </DebugButtons>
        </>
      ) : (
        <DebugButtons>
          {showDebugButton ? (
            <button onClick={() => setShowDebug(true)}>Show Theme Debug</button>
          ) : null}
        </DebugButtons>
      )}
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

const DebugButtons = styled.div`
  position: fixed;
  top: 0;
  opacity: 0.2;
  z-index: 96;

  button {
    cursor: pointer;
    background: black;
    color: white;
    padding: 30px;
  }

  &:hover {
    opacity: 1;
  }
`

const GlobalStyle = createGlobalStyle`
  html body {
    /* background: none; */
  }
`

export default Theme
