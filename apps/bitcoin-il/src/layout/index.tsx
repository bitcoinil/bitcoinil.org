import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import Support from '../components/Support'
import { currentlySelectedLanguageState } from '../state/state'
import { phoneDevices } from '../utils/breakpoints'
import { AppLayoutProps } from '../utils/interfaces'
import Footer from './Footer'
import Header from './Header'

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [ln] = useRecoilState(currentlySelectedLanguageState)

  const location = useLocation()

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location])

  return (
    <AppStyleWrap id="app" className={ln.language === 'he' ? 'dir-rtl' : ''}>
      <Support />
      <Header />
      {/* <DevTools /> */}
      {children}
      <Footer />
    </AppStyleWrap>
  )
}

export default AppLayout

const AppStyleWrap = styled.div`
  font-family: 'Titillium Web', sans-serif;
  font-weight: bolder;
  letter-spacing: 0.4px;

  ${phoneDevices} {
    width: 100vw;
  }
`
