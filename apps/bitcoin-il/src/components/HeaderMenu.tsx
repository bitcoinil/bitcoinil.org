import { Menu, MenuProps } from 'antd'
import * as React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { generateMenuItems } from '../routes/mainMenuItems'

export default function HeaderMenu(): JSX.Element {
  const [current, setCurrent] = React.useState('FAQ')
  const location = useLocation()

  React.useEffect(() => {
    const splitLocation = location.pathname.split('/')
    setCurrent(splitLocation[splitLocation.length - 1])
  }, [])

  const onClick: MenuProps['onClick'] = (e: any) => {
    setCurrent(e.key)
  }

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

const transitionSpeed = 100

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
        transition: all ${transitionSpeed}ms;
      }

      .collapsable-menu {
        transition: all ${transitionSpeed}ms;
        &:hover > .menu-arrow {
          transition: all ${transitionSpeed}ms;
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
