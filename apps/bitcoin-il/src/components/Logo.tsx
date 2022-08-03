import * as React from 'react'

import { ReactComponent as LogoSVG } from '../img/logo.svg'
import { LogoProps } from '../utils/interfaces'

const Logo: React.FC<LogoProps> = ({ props, isDark }) => {
  return <LogoSVG width={80} {...props} />
}

export default Logo
