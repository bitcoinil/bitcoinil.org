import * as React from 'react'
import styled from 'styled-components'

import LogoSVG from '../img/logo.svg'

const Logo = (props: any) => {
  return <StyledLogo src={LogoSVG} {...props} />
}

const StyledLogo = styled.img`
  width: 100%;
`

export default Logo
