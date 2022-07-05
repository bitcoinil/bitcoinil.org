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
  transition: all 400ms;

  &:hover {
    transition: all 400ms;
    transform: translateY(-2px);
  }

  &:hover span {
    transition: all 400ms;
    color: #333333;
  }

  span {
    transition: all 400ms;
    cursor: pointer;
  }
`
