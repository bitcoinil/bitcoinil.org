import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import DevTools from '../components/DevTools'

import Support from '../components/Support'
import {
  currentlySelectedLanguageState,
  isDevModeVisibleState,
  isTooltipShownOnFormattedMessagesHover
} from '../state/state'
import { phoneDevices } from '../utils/breakpoints'
import { AppLayoutProps } from '../utils/interfaces'
import Footer from './Footer'
import Header from './Header'

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const ln = useRecoilValue(currentlySelectedLanguageState)
  const [isDevModeVisible, setIsDevModeVisible] = useRecoilState(
    isDevModeVisibleState
  )
  const [isShowHoverInfo, setHoverInfo] = useRecoilState(
    isTooltipShownOnFormattedMessagesHover
  )

  const location = useLocation()

  const handleKeyDown = (e: KeyboardEvent) => {
    // console.log(e)
    if (e.ctrlKey && e.altKey && e.key === 'd') {
      setIsDevModeVisible(!isDevModeVisible)
    }
    if (e.ctrlKey && e.altKey && e.key === 'h') {
      setHoverInfo(true)
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location])

  return (
    <AppStyleWrap id="app" className={ln.language === 'he' ? 'dir-rtl' : ''}>
      <Support />
      <Header />
      {isDevModeVisible ? <DevTools /> : null}
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
