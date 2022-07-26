import * as React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'

import angle_white from '../img/ico_angle_white.svg'
import angle_black from '../img/ico_angle_black.svg'

import { isBurgerMenuOpenState, isDarkModeState } from '../state/state'
import { colors } from '../theme/colors'
import { BurgerMenuMenuProps, SubmenuRef } from '../utils/interfaces'
import CustomNavLink from './CustomNavLink'

const BurgerMenuMenu: React.FC<BurgerMenuMenuProps> = ({ items }) => {
  const [openKeys, setOpenKeys] = React.useState<string[]>([])
  const [sizesFound, setSizesFound] = React.useState(false)
  const [submenusReffed, setSubMenusReffed] = React.useState<SubmenuRef[]>([])

  const [burgerOpen, setBurgerOpen] = useRecoilState(isBurgerMenuOpenState)

  const isDarkMode = useRecoilValue(isDarkModeState)

  const findElementInStateViaKey = (key: string) => {
    return submenusReffed.findIndex((item) => item.key === key)
  }

  const handleAddSubmenuRef = (ref: HTMLDivElement | null, key: string) => {
    if (!ref) return null

    if (findElementInStateViaKey(key) === -1)
      setSubMenusReffed([...submenusReffed, { ref: ref, key: key }])
  }

  React.useEffect(() => {
    if (!sizesFound) {
      const newSizes: SubmenuRef[] = []

      if (!burgerOpen) return

      submenusReffed.forEach((ref) => {
        newSizes.push({ ...ref, size: ref.ref.clientHeight })
        ref.ref.style.height = '0'
      })

      setSizesFound(true)
      setSubMenusReffed(newSizes)
    }
  }, [burgerOpen])

  const handleClickRoute = () => {
    setBurgerOpen(false)
  }

  const handleClickMainMenu = (key: string) => {
    const { size, ref } = submenusReffed[findElementInStateViaKey(key)]

    if (openKeys.includes(key)) {
      ref.style.height = '0'

      setOpenKeys(
        openKeys.filter(function (person) {
          return person !== key
        })
      )
    } else {
      ref.style.height = `${size}px`

      setOpenKeys([...openKeys, key])
    }
  }

  return (
    <StyledBurgerMenuMenu>
      {items.map((mainItem, i) => {
        return (
          <div
            key={i}
            className={`menu-title ${
              isDarkMode ? 'dark-menu-menu' : 'light-menu-menu'
            }`}
          >
            <span
              onClick={() => {
                !mainItem.submenu
                  ? handleClickRoute()
                  : handleClickMainMenu(mainItem.key)
              }}
              className="menu-title-label"
            >
              {!mainItem.submenu ? (
                <CustomNavLink to={mainItem.key}>
                  <span>
                    {mainItem.label}
                    <img
                      className={`arrow hidden-arrow ${
                        isDarkMode ? 'dark-arrow' : ''
                      }`}
                      src={angle_white}
                    />
                  </span>
                </CustomNavLink>
              ) : (
                <span>
                  {mainItem.label}
                  {mainItem.submenu ? (
                    <>
                      <img
                        className={`arrow ${
                          openKeys.includes(mainItem.key) ? 'open-arrow' : ''
                        } `}
                        src={isDarkMode ? angle_white : angle_black}
                      />
                    </>
                  ) : null}
                </span>
              )}
            </span>
            {mainItem.submenu ? (
              <div
                ref={(ref) => handleAddSubmenuRef(ref, mainItem.key)}
                className={`submenu ${
                  openKeys.includes(mainItem.key)
                    ? 'submenu-open'
                    : 'submenu-closed'
                }`}
              >
                {mainItem.submenu
                  ? mainItem.submenu.map((subItem, ii) => {
                      return (
                        <span
                          onClick={handleClickRoute}
                          key={ii}
                          className={`menu-title-submenu-label ${
                            isDarkMode
                              ? 'dark-submenu-label'
                              : 'light-submenu-label'
                          }`}
                        >
                          <CustomNavLink to={subItem.key}>
                            {subItem.label}
                          </CustomNavLink>
                        </span>
                      )
                    })
                  : null}
              </div>
            ) : null}
          </div>
        )
      })}
      {/* <LanguageSelectMobile /> */}
      {/* <ThemeSelectMobile /> */}
    </StyledBurgerMenuMenu>
  )
}

export default React.memo(BurgerMenuMenu)

const StyledBurgerMenuMenu = styled.div`
  .menu-title {
    text-align: center;
    display: flex;
    font-size: 18px;
    flex-direction: column;

    &-label {
      padding: 20px 0;

      .hidden-arrow {
        visibility: hidden;
      }

      .arrow {
        margin-left: 20px;
      }

      .open-arrow {
        transform: rotate(-90deg);
      }
    }

    &-submenu-label {
      // the label inside the submenu
      padding: 20px 0;
      /* background-color: ${colors.burgerMenuSubBg}; */
      /* background: blue; */
    }

    .submenu {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition: height 400ms;
    }
  }

  .dark-menu-menu {
    background-color: ${colors.burgerMenuBg};
  }

  .light-menu-menu {
    background-color: ${colors.burgerMenuBgLight};
    color: black;
  }

  .dark-submenu-label {
    background: #00006a;
  }

  .light-submenu-label {
    background: #cccca1;
  }

  .dark-arrow {
    filter: invert(1);
  }
`
