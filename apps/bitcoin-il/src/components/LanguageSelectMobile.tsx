import { Menu } from 'antd'
import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { useTranslations } from '../hooks/useTranslations'

import { LanguageSelectMobileProps } from '../utils/interfaces'
import { currentlySelectedLanguage, isBurgerMenuOpen } from '../state/state'

const LanguageSelectMobile: React.FC<LanguageSelectMobileProps> = ({}) => {
  const [, setMenuOpen] = React.useState(false)
  const [current, setCurrent] = React.useState('English')
  const [openKeys, setOpenKeys] = React.useState([])

  const [, setLanguage] = useRecoilState(currentlySelectedLanguage)
  const [, setHideBurgerMenu] = useRecoilState(isBurgerMenuOpen)
  const [, setAtomLang] = useRecoilState(currentlySelectedLanguage)

  const { navigateWithLanguageChange } = useTranslations()
  const { generateLanguageMenuItems } = useTranslations()

  const location = useLocation()

  const onOpenChange = (keys: any) => {
    setOpenKeys(keys)
  }

  const onClick = (e: any) => {
    setLanguage({ language: e.key })
    setCurrent(e.key)
    setAtomLang({ language: e.key })
    navigateWithLanguageChange(location.pathname, e.key)
    setMenuOpen(false)
    setHideBurgerMenu(false)
  }

  return (
    <StyledLanguageSelectMobile id="LanguageSelectMobile">
      <Menu
        mode="inline"
        selectedKeys={[current]}
        openKeys={openKeys}
        onClick={onClick}
        onOpenChange={onOpenChange}
        items={generateLanguageMenuItems()}
      />
    </StyledLanguageSelectMobile>
  )
}

export default LanguageSelectMobile

const StyledLanguageSelectMobile = styled.div`
  .ant-menu {
    text-align: center;
  }
`
