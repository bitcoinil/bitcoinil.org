import * as React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import ico_angle from '../img/ico_angle_white.svg'
import { ThemeSelectMobileProps } from '../utils/interfaces'
import { isBurgerMenuOpen } from '../state/state'
import ThemeSwitch from './ThemeSwitch'

const ThemeSelectMobile: React.FC<ThemeSelectMobileProps> = ({}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <StyledThemeSelectMobile id="LanguageSelectMobile">
      <div
        className={`theme-select-mobile-title ${
          isOpen ? 'open-title' : 'closed-title'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        Theme{' '}
        <img
          className={`theme-title-arrow ${
            isOpen ? 'arrow-open' : 'arrow-closed'
          }`}
          src={ico_angle}
        />
      </div>
      <div
        className={`theme-select-mobile-body ${
          isOpen ? 'open-body' : 'closed-body'
        }`}
      >
        <ThemeSwitch />
      </div>
    </StyledThemeSelectMobile>
  )
}

export default ThemeSelectMobile

const StyledThemeSelectMobile = styled.div`
  text-align: center;

  .theme-select-mobile-title {
    height: 32px;
  }

  .theme-select-mobile-body {
    background: grey;
    transition: all 400ms;
  }

  .mobile-theme-select-theme-panel {
    height: 300px;
  }

  .open-body {
    height: 60px;
    padding: 20px 0;
    border-bottom: 1px solid black;
  }

  .closed-body {
    height: 0px;
  }

  .open-title {
    color: #00b3f0;
    animation: flash 400ms;
  }

  @keyframes flash {
    0% {
      background-color: black;
    }
    50% {
      background-color: white;
    }
    100% {
      background-color: black;
    }
  }

  .closed-title {
  }

  .theme-title-arrow {
    position: absolute;
    right: 18px;
    margin-top: 7px;
    height: 6px;
    transition: all 400ms;
  }

  .arrow-closed {
  }

  .arrow-open {
    transform: rotate(180deg);
  }
`
