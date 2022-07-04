import * as React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import Support from '../components/support'
import { currentlySelectedLanguage } from '../state/state'
import { phoneDevices } from '../utils/breakpoints'
import Footer from './Footer'
import Header from './Header'

const AppLayout = ({ children }) => {
  const [ln] = useRecoilState(currentlySelectedLanguage)

  return (
    <AppStyleWrap id="app" className={ln.language === 'he' ? 'dir-rtl' : ''}>
      <Support />
      <Header />
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
