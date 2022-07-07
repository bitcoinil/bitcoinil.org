import * as React from 'react'
import styled from 'styled-components'

import LogoSVG from '../img/logo.svg'
import darkLogoSVG from '../img/logo_dark_mode.svg'

export interface LogoProps {
  isDark: boolean
  props?: any
}

const Logo: React.FC<LogoProps> = ({ props, isDark }) => {
  return <StyledLogo src={isDark ? darkLogoSVG : LogoSVG} {...props} />
}

const StyledLogo = styled.img`
  width: 100%;
`

export default Logo
