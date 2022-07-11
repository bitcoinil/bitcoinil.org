import * as React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import AppLayout from '../layout'
import LocaleProvider from '../locale'
import RoutesProvider from '../routes'
import Theme from '../theme'
import { AppProps, AppWrappersProps } from '../utils/interfaces'

const App: React.FC<AppProps> = () => {
  return (
    <AppWrappers>
      <LocaleProvider>
        <AppLayout>
          <RoutesProvider />
        </AppLayout>
      </LocaleProvider>
    </AppWrappers>
  )
}

const AppWrappers: React.FC<AppWrappersProps> = ({ children }) => {
  return (
    <Router>
      <RecoilRoot>
        <React.StrictMode>
          <Theme>{children}</Theme>
        </React.StrictMode>
      </RecoilRoot>
    </Router>
  )
}

export default App
