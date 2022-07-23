import * as React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { mainMenuItems } from '../routes/mainMenuItems'
import { currentlySelectedLanguage, isBurgerMenuOpen } from '../state/state'
import { phoneDevices } from '../utils/breakpoints'
import { BurgerMenuProps } from '../utils/interfaces'
import BurgerMenuMenu from './BurgerMenuMenu'
import LanguageSelectMobile from './LanguageSelectMobile'
import ThemeSelectMobileNew from './ThemeSelectMobileNew'

const BurgerMenu: React.FC<BurgerMenuProps> = ({}) => {
  const [burgerOpen, setBurgerOpen] = useRecoilState(isBurgerMenuOpen)

  const currentLang = useRecoilValue(currentlySelectedLanguage)

  const slideOutRef = React.createRef<HTMLDivElement>()

  React.useEffect(() => {
    if (!slideOutRef.current) return
    console.log(burgerOpen)
    console.log(slideOutRef)
    if (burgerOpen) {
      slideOutRef.current.style.height = 'auto'
    } else {
      slideOutRef.current.style.height = '0'
    }
  }, [burgerOpen])

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
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </div>
      <div
        ref={slideOutRef}
        className={`slide-out ${burgerOpen ? 'open' : 'closed'}`}
      >
        <BurgerMenuMenu items={mainMenuItems} />
        <LanguageSelectMobile />
        <ThemeSelectMobileNew />
      </div>
      <div
        className={`on-click-outside ${burgerOpen ? 'open' : 'closed'}`}
        onClick={() => {
          setBurgerOpen(false)
        }}
      />
    </BurgerWrap>
  )
}

export default BurgerMenu

const BurgerWrap = styled.div`
  transition: all 400ms;
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

    .hamburger-lines .line {
      display: block;
      height: 2px;
      width: 100%;
      border-radius: 10px;
      background: #0e2431;
    }

    .hamburger-lines .line1 {
      transform-origin: 0% 0%;
      transition: transform 0.4s ease-in-out;
    }

    .hamburger-lines .line2 {
      transition: transform 0.2s ease-in-out;
    }

    .hamburger-lines .line3 {
      transform-origin: 0% 100%;
      transition: transform 0.4s ease-in-out;
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

    .slide-out {
      height: 1px;
      z-index: 5;
      overflow: hidden;
      width: 100vw;
      position: absolute;
      background-color: black;
      color: white;
      top: 60px;
      left: 0;
      transition: all 400ms;

      &.open {
        transition: all 400ms;
        height: unset;
      }
    }

    .on-click-outside {
      height: 100vh;
      width: 100vw;
      transition: e all 400ms;
      position: absolute;
      top: 0;
      left: 0;

      &.closed {
        display: none;
      }
    }
  }
`
