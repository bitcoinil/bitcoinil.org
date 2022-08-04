import * as React from 'react'

import { ReactComponent as LogoSVG } from '../img/logo.svg'
import { LogoProps } from '../utils/interfaces'

const Logo: React.FC<LogoProps> = ({ props, isDark }) => {
  const [size, setSize] = React.useState(500)
  console.log(window.innerWidth - 40)

  React.useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth < 500) setSize(window.innerWidth - 40)
    }
    window.addEventListener('resize', resizeHandler)

    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  return <LogoSVG width={size} {...props} />
}

export default Logo
