import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { CustomNavLinkProps } from '../utils/interfaces'
import { currentlySelectedLanguage } from '../state/state'

const CustomNavLink: React.FC<CustomNavLinkProps> = ({ to, children }) => {
  const atomLang = useRecoilValue(currentlySelectedLanguage)
  //   console.log('👻👻👻', to)

  const languageCode = atomLang.language === 'en' ? '' : `/${atomLang.language}`
  return <NavLink to={`${languageCode}${to}`}>{children}</NavLink>
}

export default CustomNavLink

const StyledCustomNavLink = styled.div``
