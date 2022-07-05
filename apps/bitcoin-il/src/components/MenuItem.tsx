import * as React from 'react'
import styled from 'styled-components'

export interface MenuItemProps {
  label: JSX.Element
}

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
    background: #a9d69b;
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
