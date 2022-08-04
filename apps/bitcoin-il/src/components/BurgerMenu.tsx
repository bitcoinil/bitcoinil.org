import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { mainMenuItems } from '../routes/mainMenuItems'
import {
  currentlySelectedLanguageState,
  isBurgerMenuOpenState,
  isDarkModeState
} from '../state/state'
import { landscapeMobile, phoneDevices } from '../utils/breakpoints'
import { BurgerMenuProps } from '../utils/interfaces'
import BurgerMenuMenu from './BurgerMenuMenu'
import LanguageSelectMobile from './LanguageSelectMobile'
import ThemeSwitchMobile from './ThemeSwitchMobile'

const BurgerMenu: React.FC<BurgerMenuProps> = ({}) => {
  const [bodyHeight, setBodyHeight] = React.useState(0)

  const [burgerOpen, setBurgerOpen] = useRecoilState(isBurgerMenuOpenState)

  const isInDarkMode = useRecoilValue(isDarkModeState)
  const currentLang = useRecoilValue(currentlySelectedLanguageState)

  const slideOutRef = React.createRef<HTMLDivElement>()

  const location = useLocation()

  const rootRef = document.getElementById('root')

  React.useEffect(() => {
    if (rootRef && rootRef.clientHeight) setBodyHeight(rootRef.clientHeight)
  }, [location])

  const toggleBurger = () => {
    setBurgerOpen(!burgerOpen)
  }

  return (
    <BurgerWrap>
      <input
        className={`checkbox ${
          currentLang.language === 'he' ? 'on-left' : 'on-right'
        }`}
        onChange={toggleBurger}
        type="checkbox"
        checked={burgerOpen}
      />
      <div className="hamburger-lines">
        <span
          className={`line line1 ${isInDarkMode ? 'dark-mode-burger' : ''}`}
        />
        <span
          className={`line line2 ${isInDarkMode ? 'dark-mode-burger' : ''}`}
        />
        <span
          className={`line line3 ${isInDarkMode ? 'dark-mode-burger' : ''}`}
        />
      </div>
      <div
        ref={slideOutRef}
        className={`burger-slide-out ${burgerOpen ? 'open' : 'closed'}`}
      >
        <div className="burger-slide-out-inner">
          <BurgerMenuMenu items={mainMenuItems} />
          <LanguageSelectMobile />
          <ThemeSwitchMobile />
        </div>
      </div>
      <div
        style={{ height: `${bodyHeight + 60}px` }}
        className={`on-click-outside ${burgerOpen ? 'open' : 'closed'}`}
        onClick={() => {
          setBurgerOpen(false)
        }}
      />
    </BurgerWrap>
  )
}

export default BurgerMenu

const mainClosingDuration = `1000ms`

const landscapeClosingDuration = mainClosingDuration
const portraitOpeningDuration = mainClosingDuration
const portraitClosingDuration = mainClosingDuration

const BurgerWrap = styled.div`
  display: none;

  ${phoneDevices} {
    display: unset;

    .checkbox {
      position: absolute;
      display: block;
      height: 32px;
      width: 100px;
      top: 20px;
      z-index: 5;
      opacity: 0;
      cursor: pointer;
    }

    .on-left {
      left: 0;
    }

    .on-right {
      right: 0;
    }

    .hamburger-lines {
      display: block;
      height: 12px;
      width: 15px;
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .hamburger-lines {
      .line {
        display: block;
        height: 2px;
        width: 100%;
        border-radius: 10px;
        background: #0e2431;
      }

      .dark-mode-burger {
        background: white;
      }

      .line1 {
        transform-origin: 0% 0%;
        transition: transform 0.4s ease-in-out;
      }

      .line2 {
        transition: transform 0.2s ease-in-out;
      }

      .line3 {
        transform-origin: 0% 100%;
        transition: transform 0.4s ease-in-out;
      }
    }
    .menu-items {
      padding-top: 120px;
      box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
      height: 100vh;
      width: 100%;
      transform: translate(-150%);
      display: flex;
      flex-direction: column;
      margin-left: -40px;
      padding-left: 50px;
      transition: transform 0.5s ease-in-out;
      text-align: center;
    }

    .menu-items li {
      margin-bottom: 1.2rem;
      font-size: 1.5rem;
      font-weight: 500;
    }

    input[type='checkbox']:checked ~ .menu-items {
      transform: translateX(0);
    }

    input[type='checkbox']:checked ~ .hamburger-lines .line1 {
      transform: rotate(45deg);
    }

    input[type='checkbox']:checked ~ .hamburger-lines .line2 {
      transform: scaleY(0);
    }

    input[type='checkbox']:checked ~ .hamburger-lines .line3 {
      transform: rotate(-45deg);
    }

    input[type='checkbox']:checked ~ .logo {
      display: none;
    }

    .ant-menu {
      border-right: none;
    }

    .burger-slide-out {
      z-index: 5;
      overflow: hidden;
      width: 100vw;
      position: absolute;
      background-color: transparent;
      color: white;
      top: 60px;
      left: 0;
      transition: height ${portraitClosingDuration}; // CLSOING SPEED
      height: 0px;
      overflow: scroll;

      ${landscapeMobile} {
        transition: height ${landscapeClosingDuration};
      }

      &-inner {
        background: black;
      }

      &.open {
        height: 100%;
        ${landscapeMobile} {
          height: 1000%;
        }
        transition: height ${portraitOpeningDuration};
        background: transparent;
      }
    }

    .on-click-outside {
      position: absolute;
      background: transparent;
      top: 60px;
      left: 0;
      width: 100vw;

      &.closed {
        height: 0;
        display: none;
      }
    }
  }
`
