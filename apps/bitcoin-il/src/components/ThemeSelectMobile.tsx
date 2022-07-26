import * as React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'

import arrow from '../img/ico_angle_white.svg'
import { isBurgerMenuOpenState, isDarkModeState } from '../state/state'
import { colors } from '../theme/colors'
import { ThemeSelectMobileNewProps } from '../utils/interfaces'
import ThemeSwitch from './ThemeSwitch'

const ThemeSelectMobile: React.FC<ThemeSelectMobileNewProps> = ({}) => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [size, setSize] = React.useState<number>(0)
  const [sizeFOund, setSizeFound] = React.useState<boolean>(false)
  const isDark = useRecoilValue(isDarkModeState)

  const submenuRef = React.createRef<HTMLDivElement>()

  const [burgerOpen, setBurgerOpen] = useRecoilState(isBurgerMenuOpenState)

  const toggleOpen = () => {
    setOpen(!open)
  }

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

  return (
    <StyledBurgerMenuMenu>
      <div className="menu-title" onClick={toggleOpen}>
        <span
          className={`menu-title-label ${
            isDark
              ? 'burgermenu-menu-title-dark'
              : 'burgermenu-menu-title-light'
          }`}
        >
          Theme <img className={`arrow`} src={arrow} />
        </span>
        <div
          ref={submenuRef}
          className={`submenu ${open ? 'submenu-open' : 'submenu-closed'}`}
        >
          <ThemeSwitch isMobile={true} />
        </div>
      </div>
    </StyledBurgerMenuMenu>
  )
}

export default React.memo(ThemeSelectMobile)

const StyledBurgerMenuMenu = styled.div`
  .menu-title {
    text-align: center;
    background-color: ${colors.burgerMenuBgDark};
    display: flex;
    font-size: 18px;
    flex-direction: column;

    &-label {
      padding: 20px 0;

      display: flex;
      align-items: center;
      justify-content: center;

      .hidden-arrow {
        visibility: hidden;
      }

      .arrow {
        transition: transform 400ms;
        margin-left: 20px;
      }

      .open-arrow {
        transition: transform 400ms;
        transform: rotate(-90deg);
      }
    }

    &-submenu-label {
      padding: 20px 0;
      background-color: ${colors.burgerMenuSubBgDark};
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .submenu {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition: height 400ms;
    }
  }

  .theme-toggle {
    margin-bottom: 20px;
  }

  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 100px;
    height: 50px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '🖖';
    align-items: center;
    justify-content: center;
    display: flex;
    height: 43px;
    width: 43px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .is-system:before {
    content: '🖥️';
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(46px);
    -ms-transform: translateX(46px);
    transform: translateX(46px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .disabled {
    opacity: 0.2;
    cursor: not-allowed;
    pointer-events: none;
  }

  .burgermenu-menu-title-dark {
    background: ${colors.burgerMenuBgDark};
  }

  .burgermenu-menu-title-light {
    background: ${colors.burgerMenuBgLight};
    color: black;
  }
`
