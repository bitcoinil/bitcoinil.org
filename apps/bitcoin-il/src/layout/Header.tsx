import * as React from 'react'
import styled from 'styled-components'

import { phoneDevices } from '../utils/breakpoints'
import BurgerMenu from '../components/BurgerMenu'
import CustomNavLink from '../components/CustomNavLink'
import HeaderMenu from '../components/HeaderMenu'
import { HeaderProps } from '../utils/interfaces'
import LanguageSelect from '../components/LanguageSelect'
import ThemeSwitch from '../components/ThemeSwitch'
import Logo from '../components/Logo'

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <StyledHeader className="header">
      <div className="header-left logo">
        <CustomNavLink to="/">
          {/* <img src={logo} /> */}
          <Logo />
        </CustomNavLink>
      </div>
      <div className="header-middle">
        <HeaderMenu />
      </div>
      <div className="header-right">
        <div className="header-right-hide-on-mobile">
          <ThemeSwitch />
          <LanguageSelect />
        </div>
        <BurgerMenu />
      </div>
    </StyledHeader>
  )
}

const StyledHeader = styled.div`
  ${phoneDevices} {
    justify-content: space-between;
    padding: 0 25px;
  }

  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;

  #app.dir-rtl & {
    flex-direction: row-reverse;
  }

  .header {
    &-left {
      display: flex;
      align-items: center;
      &.logo {
        > a {
          display: flex;
          align-items: center;
          max-width: 100px;
          margin: 0;
          cursor: pointer;
          transition: all 200ms;
          color: var(--text-color);

          &:hover {
            opacity: 0.5;
            transition: all 200ms;
          }

          img {
            height: 20px;
          }
        }
      }
    }

    &-middle {
      width: 35vw;

      ${phoneDevices} {
        display: none;
      }
    }

    &-right {
      display: flex;
      align-items: center;
      justify-content: center;

      &-hide-on-mobile {
        display: flex;
        align-items: center;

        ${phoneDevices} {
          display: none;
        }
      }
    }
  }
`

export default Header
