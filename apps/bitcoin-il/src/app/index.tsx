import * as React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import Theme from '../theme'
import RoutesProvider from '../routes'
import LocaleProvider from '../locale'
import AppLayout from '../layout'

const App = () => {
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

const AppWrappers = ({ children }) => {
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