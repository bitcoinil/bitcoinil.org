import { Menu } from 'antd'
import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import { generateMenuItems } from '../routes/mainMenuItems'
import { isBurgerMenuOpen } from '../state/state'
import { BurgerMenuMenuProps } from '../utils/interfaces'
import LanguageSelectMobile from './LanguageSelectMobile'
import ThemeSelectMobile from './ThemeSelectMobile'

const BurgerMenuMenu: React.FC<BurgerMenuMenuProps> = ({}) => {
  const [, setMenuOpen] = useRecoilState(isBurgerMenuOpen)
  const [openKeys, setOpenKeys] = React.useState([])
  const [open, setOpen] = React.useState('')
  const location = useLocation()

  // Tried to fix this, can't do it
  const onOpenChange = (keys: any) => {
    setOpenKeys(keys)
  }

  React.useEffect(() => {
    const splitLocation = location.pathname.split('/')
    setOpen(splitLocation[splitLocation.length - 1])
  }, [])

  return (
    <StyledBurgerMenuMenu>
      {generateMenuItems().map((mainItem) => {
        console.log(mainItem)
        return (
          <div className="main-menu-item">
            <span className="main-menu-item-label">{mainItem.label}</span>
            {mainItem.children
              ? mainItem.children.map((child) => {
                  return (
                    <span className="main-menu-item-sub-label">
                      {child.label}
                    </span>
                  )
                })
              : null}
          </div>
        )
      })}
      <LanguageSelectMobile />
      <ThemeSelectMobile />
    </StyledBurgerMenuMenu>
  )
}

export default BurgerMenuMenu

const StyledBurgerMenuMenu = styled.div`
  .main-menu-item {
    /* background: red; */

    &-sub {
      &-label {
        div {
          background: yellow;
        }
      }
    }

    &-label {
      div {
        background: green;
      }
    }
  }
`
