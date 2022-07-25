import * as React from 'react'
import styled from 'styled-components'
import { phoneDevices } from '../utils/breakpoints'
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
  ${phoneDevices} {
    height: auto;
    font-size: 18px;
    margin: 18px 0;
  }

  .active {
    transform: translateY(-2px);
  }

  & > .ant-menu-sub {
    background-color: red;
  }

  &:hover {
    transition: transform 200ms;
    transform: translateY(-2px);
  }

  &:hover span {
    transition: transform 200ms;
  }

  span {
    transition: transform 200ms;
    cursor: pointer;
  }
`
