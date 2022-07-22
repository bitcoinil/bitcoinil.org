import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { currentlySelectedLanguage } from '../state/state'
import { CustomNavLinkProps } from '../utils/interfaces'

const CustomNavLink: React.FC<CustomNavLinkProps> = ({ to, children }) => {
  const atomLang = useRecoilValue(currentlySelectedLanguage)

  const languageCode = atomLang.language === 'en' ? '' : `/${atomLang.language}`

  return (
    <StyledCustomNavLink to={`${languageCode}${to}`}>
      {children}
    </StyledCustomNavLink>
  )
}

export default CustomNavLink

const StyledCustomNavLink = styled(NavLink)`
  color: unset;

  &:hover {
    color: unset;
  }
`
