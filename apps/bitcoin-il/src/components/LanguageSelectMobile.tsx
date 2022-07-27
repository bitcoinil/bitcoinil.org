import * as React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { useTranslations } from '../hooks/useTranslations'
import arrow_dark from '../img/ico_angle_black.svg'
import arrow from '../img/ico_angle_white.svg'
import {
  currentlySelectedLanguageState,
  isBurgerMenuOpenState,
  isDarkModeState
} from '../state/state'
import { colors } from '../theme/colors'
import {
  AvailableLanguage,
  LanguageSelectMobileNewProps
} from '../utils/interfaces'

const LanguageSelectMobile: React.FC<LanguageSelectMobileNewProps> = ({}) => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [size, setSize] = React.useState<number>(0)
  const [sizeFOund, setSizeFound] = React.useState<boolean>(false)
  const isDark = useRecoilValue(isDarkModeState)

  const submenuRef = React.createRef<HTMLDivElement>()

  const [burgerOpen, setBurgerOpen] = useRecoilState(isBurgerMenuOpenState)
  const [, setLanugageState] = useRecoilState(currentlySelectedLanguageState)

  const intl = useTranslations()
  const { availableLanguages, navigateWithLanguageChange } = intl

  React.useEffect(() => {
    if (!submenuRef.current) return

    if (!open && !sizeFOund) return

    if (open) submenuRef.current.style.height = `${size}px`
    else submenuRef.current.style.height = `0px`
  }, [open])

  React.useEffect(() => {
    if (!burgerOpen) return
    if (sizeFOund) return
    if (!submenuRef.current?.clientHeight) return

    setSize(submenuRef.current?.clientHeight)
    submenuRef.current.style.height = '0'
    setSizeFound(true)
  }, [burgerOpen])

  const closeBurger = () => {
    setBurgerOpen(false)
  }

  const toggleOpen = () => {
    setOpen(!open)
  }

  const handleChangeLanguage = (lang: AvailableLanguage) => {
    closeBurger()

    setLanugageState({ language: lang.name })

    navigateWithLanguageChange(location.pathname, lang.name)
  }

  return (
    <StyledBurgerMenuMenu>
      <div className="menu-title" onClick={toggleOpen}>
        <span
          className={`menu-title-label ${
            isDark ? 'dark-mode-title' : 'light-mode-title'
          }`}
        >
          Language <img className={`arrow`} src={isDark ? arrow : arrow_dark} />
        </span>
        <div
          ref={submenuRef}
          className={`submenu ${open ? 'submenu-open' : 'submenu-closed'} ${
            isDark ? 'dark-sub' : 'light-sub'
          }`}
        >
          {availableLanguages.map((lang, i) => {
            return (
              <span
                key={i}
                onClick={() => handleChangeLanguage(lang)}
                className="menu-title-submenu-label"
              >
                {lang.icon}
                {'    '}
                {lang.longName}
              </span>
            )
          })}
        </div>
      </div>
    </StyledBurgerMenuMenu>
  )
}

export default React.memo(LanguageSelectMobile)

const StyledBurgerMenuMenu = styled.div`
  .menu-title {
    text-align: center;
    background-color: ${colors.burgerMenuBgDark};
    display: flex;
    font-size: 18px;
    flex-direction: column;

    &-label {
      padding: 20px 0;

      .hidden-arrow {
        visibility: hidden;
      }

      .arrow {
        transition: transform margin-left 400ms;
        margin-left: 20px;
      }

      .open-arrow {
        transition: transform margin-left 400ms;
        transform: rotate(-90deg);
      }
    }

    &-submenu-label {
      padding: 20px 0;
      background-color: ${colors.burgerMenuSubBgDark};
    }

    .submenu {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition: height 400ms;
    }
  }

  .dark-mode-title {
    background: ${colors.burgerMenuBgDark};
  }

  .light-mode-title {
    color: black;
    background: ${colors.burgerMenuBgLight};
  }

  .dark-sub {
    span {
      background: ${colors.burgerMenuSubBgDark};
    }
  }

  .light-sub {
    span {
      background: ${colors.burgerMenuSubBgLight};
      color: black;
    }
  }
`
