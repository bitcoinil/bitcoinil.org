import { Menu, MenuProps } from 'antd'
import * as React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

import {
  generateMenuItems,
  recursiveGenerateMenuItems
} from '../routes/mainMenuItems'

export default function HeaderMenu(): JSX.Element {
  const [current, setCurrent] = React.useState('')
  const location = useLocation()

  // /////////////////////////////////////////////////////////
  // Use effect to set the current menu item based on the
  //      url
  React.useEffect(() => {
    console.log(location.pathname.substring(1))
    setCurrent(location.pathname.substring(1))
  }, [])

  const onClick: MenuProps['onClick'] = (e: any) => {
    console.log('I a herere, old current is', current)
    console.log(e.key)
    setCurrent(e.key)
  }

  React.useEffect(() => {
    const splitLocation = location.pathname.split('/')
    setCurrent(splitLocation[splitLocation.length - 1])
  }, [])

  return (
    <StyledAppMenu id="HeaderMenu">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={generateMenuItems()}
      />
    </StyledAppMenu>
  )
}

const StyledAppMenu = styled.div`
  .ant-menu {
    display: flex;
    align-items: center;
    justify-content: center;

    &.ant-menu {
      background: transparent;
      border-bottom: none;

      p {
        margin: 0;
      }

      .menu-arrow {
        transition: all 200ms;
      }

      .collapsable-menu {
        transition: all 200ms;
        &:hover > .menu-arrow {
          transition: all 200ms;
          transform: rotate(180deg);
        }
      }

      > li {
        &::after {
          width: 0;
          height: 0;
        }
        &.ant-menu-item {
          &::after {
            width: 0;
            height: 0;
          }
        }
      }
    }
  }
`
