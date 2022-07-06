import { Button } from 'antd'
import * as React from 'react'
import styled from 'styled-components'

import { SiteButtonProps } from '../utils/interfaces'

export default function SiteButton({
  onClick = () => {},
  children,
  type = 'default',
  background,
  color
}: SiteButtonProps) {
  return (
    <StyledButton
      id="SiteButton"
      style={{
        color: color ? color : 'unset',
        background: background ? background : 'unset',
        border: background ? `2px solid ${background}` : 'unset'
      }}
      type={type}
      onClick={() => onClick()}
    >
      {children}
    </StyledButton>
  )
}

const StyledButton = styled(Button)`
  &.ant-btn {
    padding: 25px 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
