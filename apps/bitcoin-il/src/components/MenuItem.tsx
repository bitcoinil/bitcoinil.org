import * as React from 'react'
import styled from 'styled-components'
import { MenuItemProps } from '../utils/interfaces'

const MenuItem: React.FC<MenuItemProps> = ({ label }) => {
  return (
    <StyledMenuItem id="MenuItem">
      <span>{label}</span>
    </StyledMenuItem>
  )
}

export default MenuItem

const StyledMenuItem = styled.div`
  transition: all 200ms;

  .active {
    transform: translateY(-2px);
  }

  & > .ant-menu-sub {
    background-color: red;
  }

  &:hover {
    transition: all 200ms;
    transform: translateY(-2px);
  }

  &:hover span {
    transition: all 200ms;
  }

  span {
    transition: all 200ms;
    cursor: pointer;
  }
`