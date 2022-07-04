import * as React from 'react'

// @ts-ignore
import { ReactComponent as LogoSVG } from '../img/logo.svg'
import styled from 'styled-components'


// const Logo = ({ width, height }: { width?: number, height?: number }) => {
const Logo = (props: any) => {
  // const Logo = ':)'

  return <StyledLogo {...props} />
}

const StyledLogo = styled(LogoSVG)`
  width: 100%;
`

export default Logo
