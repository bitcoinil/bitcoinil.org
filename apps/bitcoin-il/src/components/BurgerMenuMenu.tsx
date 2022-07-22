import * as React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import arrow from '../img/ico_angle_white.svg'
import { isBurgerMenuOpen } from '../state/state'
import { colors } from '../theme/colors'
import { BurgerMenuMenuProps, SubmenuRef } from '../utils/interfaces'
import CustomNavLink from './CustomNavLink'

const BurgerMenuMenu: React.FC<BurgerMenuMenuProps> = ({ items }) => {
  const [openKeys, setOpenKeys] = React.useState<string[]>([])
  const [sizesFound, setSizesFound] = React.useState(false)
  const [submenusReffed, setSubMenusReffed] = React.useState<SubmenuRef[]>([])

  const [burgerOpen, setBurgerOpen] = useRecoilState(isBurgerMenuOpen)

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
          <div key={i} className="menu-title">
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
                    <img className={`arrow hidden-arrow`} src={arrow} />
                  </span>
                </CustomNavLink>
              ) : (
                <span>
                  {mainItem.label}
                  {mainItem.submenu ? (
                    <img
                      className={`arrow ${
                        openKeys.includes(mainItem.key) ? 'open-arrow' : null
                      }`}
                      src={arrow}
                    />
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
                          className="menu-title-submenu-label"
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
    background-color: ${colors.burgerMenuBg};
    display: flex;
    font-size: 18px;
    flex-direction: column;

    &-label {
      padding: 20px 0;

      .hidden-arrow {
        visibility: hidden;
      }

      .arrow {
        transition: all 400ms;
        margin-left: 20px;
      }

      .open-arrow {
        transition: all 400ms;
        transform: rotate(-90deg);
      }
    }

    &-submenu-label {
      padding: 20px 0;
      background-color: ${colors.burgerMenuSubBg};
    }

    .submenu {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition: height 400ms;
    }
  }
`
