import * as React from 'react'
import styled from 'styled-components'

import ico_angle from '../img/ico_angle_black.svg'
import { colors } from '../theme/colors'
import { flashElement, scrollToElement } from '../util/util'
import {
  phoneDevices,
  TOCBreakPointMobile,
  TOCBreakPointMobileHeight,
  TOCBreakPointOne
} from '../utils/breakpoints'
import {
  ElementToTrack,
  HTMLElementWithID,
  tableOfContentItem,
  TableOfContentsScrollTrackedProps,
  tableOfContentSubheading
} from '../utils/interfaces'
import { FormattedMessage } from './FormattedMessageWithHover'
import TOCBurgerMenu from './TableOfContentsScrollTrackedBurger'

const TableOfContentsScrollTracked: React.FC<
  TableOfContentsScrollTrackedProps
> = ({ items }) => {
  const [isBelowZero, setIsBelowZero] = React.useState(false)
  const [isAtEnd, setIsAtEnd] = React.useState(false)
  const [isAtEndMobile, setIsAtEndMobile] = React.useState(false)
  const [isAtStart, setisAtStart] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const [elInView, setElInView] = React.useState('')
  const [openSubmenus, setOpenSubmenus] = React.useState<string[]>([])
  const [leftHandWidth, setLeftHandWidth] = React.useState<number>(0)

  const leftHandColumnRef = React.createRef<HTMLDivElement>()
  const endRef = React.createRef<HTMLDivElement>()
  const startRef = React.createRef<HTMLDivElement>()

  const rightSideElements = React.useRef<(ElementToTrack | null)[]>([])
  const leftSideElements = React.useRef<(ElementToTrack | null)[]>([])

  const isStuck = isBelowZero && !isAtEnd && isAtStart && !isAtEndMobile

  React.useEffect(() => {
    if (leftHandColumnRef?.current?.clientWidth)
      setLeftHandWidth(leftHandColumnRef?.current?.clientWidth)
  }, [leftHandColumnRef.current])

  React.useEffect(() => {
    // take element in view, find the root menu title, and open it
    const elInViewData = getLeftSideElementFromStateUsingKey(elInView)

    if (elInViewData?.element.classList.contains('submenu-title')) {
      addKeyToOpenSubmenus(elInView, true)
    } else {
      if (elInViewData?.menuParent)
        addKeyToOpenSubmenus(elInViewData?.menuParent, true)
    }
  }, [elInView])

  React.useEffect(() => {
    // Check for duplicate keys in items
    const keys: string[] = []

    items.forEach((item) => {
      if (keys.includes(item.key)) {
        console.error(
          `TableOfContentsScrollTracked found duplicate key: ${item.key}`
        )
        setIsError(true)
      } else {
        keys.push(item.key)
      }
      if (item.subHeadings) {
        item.subHeadings.map((subHeading) => {
          if (keys.includes(subHeading.key)) {
            console.error(
              `TableOfContentsScrollTracked found duplicate key: ${subHeading.key}`
            )
            setIsError(true)
          } else {
            keys.push(subHeading.key)
          }
        })
      }
    })
  }, [items])

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [rightSideElements, leftSideElements])

  React.useEffect(() => {
    window.addEventListener('scroll', scrollCheckMenuInView)

    return () => window.removeEventListener('scroll', scrollCheckMenuInView)
  })

  React.useEffect(() => {
    window.addEventListener('scroll', scrollCheckEnderInView)

    return () => window.removeEventListener('scroll', scrollCheckEnderInView)
  })

  React.useEffect(() => {
    window.addEventListener('scroll', scrollCheckTopHotboxInView)

    return () =>
      window.removeEventListener('scroll', scrollCheckTopHotboxInView)
  })

  const getLeftSideElementFromStateUsingKey = (key: string) => {
    return leftSideElements.current.find((o) => o?.key === key)
  }

  const getRightSideElementFromStateUsingKey = (key: string) => {
    return rightSideElements.current.find((o) => o?.key === key)
  }

  const handleScroll = () => {
    const elsInView: (HTMLElementWithID | null)[] = []

    rightSideElements.current.forEach((el) => {
      if (el?.element?.getBoundingClientRect()) {
        if (el?.element?.getBoundingClientRect()?.y > -20) {
          elsInView.push(el.element)
        }
      }
    })

    if (elsInView[0]) setElInView(elsInView[0].id)
  }

  const isRefStored = (ref: ElementToTrack, left: boolean) => {
    const arrayToCheck = left ? leftSideElements : rightSideElements
    return !!arrayToCheck.current.find((o) => o?.key === ref.key)
  }

  const handleRef = (
    ref: HTMLParagraphElement | null,
    left: boolean,
    item: tableOfContentItem | tableOfContentSubheading,
    menuParent?: string | null
  ) => {
    if (!ref) return null

    const { hasSubheadings, key } = item

    const newElementToTrack: ElementToTrack = {
      element: ref,
      hasSubheadings: hasSubheadings,
      key,
      isSubMenuItem: false,
      menuParent
    }
    if (isRefStored(newElementToTrack, left)) return null

    if (left) {
      leftSideElements.current.push(newElementToTrack)
    } else {
      rightSideElements.current.push(newElementToTrack)
    }
  }

  const scrollToRightSideElement = (key: string) => {
    const el = getRightSideElementFromStateUsingKey(key)?.element

    if (!el) return null

    flashElement(el)
    scrollToElement(el)
    // window.scrollBy({ top: -50 })
  }

  const isSubmenuOpen = (key: string) => {
    for (let x = 0; x < openSubmenus.length; x++) {
      if (openSubmenus[x] === key) {
        return true
      }
    }
    return false
  }

  const addKeyToOpenSubmenus = (key: string, wipe?: boolean) => {
    if (wipe) setOpenSubmenus([key])
    else setOpenSubmenus([...openSubmenus, key])
  }

  const removeKeyFromOpenSubmenus = (key: string) => {
    const newState: string[] = []

    openSubmenus.forEach((open, i) => {
      if (open !== key) {
        newState.push(open)
      }
    })

    setOpenSubmenus(newState)
  }

  const handleOpenSubmenu = (key: string) => {
    if (openSubmenus.includes(key)) removeKeyFromOpenSubmenus(key)
    else addKeyToOpenSubmenus(key)
  }

  const scrollCheckMenuInView = () => {
    if (!leftHandColumnRef.current?.getBoundingClientRect().y) return null
    setIsBelowZero(leftHandColumnRef.current?.getBoundingClientRect()?.y <= 0)
  }

  const scrollCheckEnderInView = () => {
    if (!endRef?.current) return

    setIsAtEndMobile(
      endRef.current.getBoundingClientRect().y < window.innerHeight
    )

    setIsAtEnd(
      endRef.current?.getBoundingClientRect().y < window.innerHeight - 1000
    )
  }

  const scrollCheckTopHotboxInView = () => {
    if (!startRef?.current) return
    setisAtStart(startRef.current?.getBoundingClientRect().y < 0)
  }

  if (!items) return <h1>No Items To Show</h1>

  if (isError) return <h1>You Have Duplicate Keys In Your Items, Fix That</h1>

  return (
    // Left Side First
    <StyledTableOfContentsScrollTracked id="TableOfContentsScrollTracked">
      <div className="top-hitbox" ref={startRef} />
      <div className={`mobile-toc ${isStuck ? 'mobile-toc-stuck' : ''}`}>
        <TOCBurgerMenu
          elInView={elInView}
          scrollToRightSideElement={scrollToRightSideElement}
          handleRef={handleRef}
          handleOpenSubmenu={handleOpenSubmenu}
          openSubmenus={openSubmenus}
          isSubmenuOpen={isSubmenuOpen}
          items={items}
          label={
            <p className="burger-menu-title">
              <FormattedMessage
                id={`faq.mobile.burger-menu-title`}
                defaultMessage={`See All`}
                description={`mobile.burger-menu-title`}
              />
            </p>
          }
        />
      </div>
      <div className="scroll-track-toc-main">
        <div
          className={`toc-scroll-tracked-left ${
            isStuck ? 'stuck' : 'unstuck'
          } ${isAtEndMobile ? 'hide-left-on-mobile-end' : ''}`}
          ref={leftHandColumnRef}
        >
          {items.map((item, i) => {
            if (!item.subHeadings) {
              // Here are the headings with no submenus
              return (
                <p
                  className={`toc-scroll-tracked-left-item-without-subheadings left-title ${
                    item.key === elInView ? 'active-toc-item' : ''
                  }`}
                  onClick={() => scrollToRightSideElement(item.key)}
                  ref={(ref) => handleRef(ref, true, item)}
                  key={i}
                >
                  {item.categoryHeading}
                </p>
              )
            } else {
              // Here are the heading with submenus

              return (
                <div
                  key={i}
                  className="toc-scroll-tracked-left-has-subheadings submenu-title"
                >
                  <p
                    className={`toc-scroll-tracked-left-has-subheadings-heading left-title ${
                      item.key === elInView ? 'active-toc-item' : ''
                    }`}
                    // @ts-ignore
                    // ref={handleRef}
                    ref={(ref) => handleRef(ref, true, item)}
                    onClick={() => {
                      handleOpenSubmenu(item.key)
                      // scrollToRightSideElement(item.key)
                    }}
                    key={i}
                  >
                    {item.categoryHeading}
                    <img
                      src={ico_angle}
                      className={`toc-scroll-tracked-left-has-subheadings-heading-arrow ${
                        openSubmenus.includes(item.key) ? 'open-arrow' : ''
                      }`}
                    />
                  </p>
                  <div
                    className={`toc-scroll-tracked-left-has-subheadings-foldable ${
                      isSubmenuOpen(item.key)
                        ? `foldable-open`
                        : `foldable-closed`
                    }`}
                  >
                    {item.subHeadings.map((subItem, i) => {
                      return (
                        <p
                          className={`toc-scroll-tracked-left-has-subheadings-heading-title left-subtitle ${
                            subItem.key === elInView ? 'active-toc-item' : ''
                          }`}
                          ref={(ref) => handleRef(ref, true, subItem, item.key)}
                          key={i}
                          onClick={() => {
                            scrollToRightSideElement(subItem.key)
                          }}
                        >
                          {subItem.subHeadingTitle}
                        </p>
                      )
                    })}
                  </div>
                </div>
              )
            }
          })}
        </div>
        {/* LEFT SIDE ABOVE */}
        {/* RIGHT SIDE BELOW */}
        <div
          style={{
            marginLeft: `${leftHandWidth}px`
          }}
          className={`toc-scroll-tracked-right ${
            isStuck ? 'right-when-is-stuck' : ''
          }`}
        >
          {items.map((item, i) => {
            if (!item.subHeadings) {
              // no subheadings

              return (
                <React.Fragment key={i}>
                  <p
                    id={item.key}
                    ref={(ref) => handleRef(ref, false, item)}
                    key={i}
                    className={`toc-scroll-tracked-right-item-heading right-title accented-title`}
                  >
                    {item.categoryHeading}
                  </p>
                  {item.bodyWithoutSubheadings
                    ? item.bodyWithoutSubheadings.map((subItem, ii) => {
                        return (
                          <p
                            key={ii}
                            className="toc-scroll-tracked-right-item-heading-has-subheadings-subheadings-wrap-body right-subtitle"
                          >
                            {subItem.body}
                          </p>
                        )
                      })
                    : null}
                </React.Fragment>
              )
            } else {
              return (
                // has subheadings

                <React.Fragment key={i}>
                  <p
                    id={item.key}
                    ref={(ref) => handleRef(ref, false, item)}
                    className="accented-title toc-scroll-tracked-right-item-heading-has-subheadings right-title submenu-title"
                  >
                    {item.categoryHeading}
                  </p>
                  <div className="toc-scroll-tracked-right-item-heading-has-subheadings-subheadings-wrap">
                    {item.subHeadings.map((subItem, i) => {
                      return (
                        <React.Fragment key={i}>
                          <p
                            id={subItem.key}
                            ref={(ref) =>
                              handleRef(ref, false, subItem, item.key)
                            }
                            className="toc-scroll-tracked-right-item-heading-has-subheadings-subheadings-wrap-title right-title"
                          >
                            {subItem.subHeadingTitle}
                          </p>
                          <p className="toc-scroll-tracked-right-item-heading-has-subheadings-subheadings-wrap-body right-subtitle">
                            {subItem.subHeadingBody}
                          </p>
                        </React.Fragment>
                      )
                    })}
                  </div>
                </React.Fragment>
              )
            }
          })}
        </div>
      </div>
      <div className="end-hitbox" ref={endRef} />
    </StyledTableOfContentsScrollTracked>
  )
}

export default TableOfContentsScrollTracked

const leftTitleSize = 19
const leftSubtitleSize = 16
const rightTitleSize = 22
const rightBodySize = 20

const borderSize = 5

const StyledTableOfContentsScrollTracked = styled.div`
  margin-top: 100px;

  ${phoneDevices} {
    margin-bottom: 65px;
  }

  .mobile-toc {
    background-color: ${colors.accent};
    color: white;
    display: none;
    position: sticky;
    top: 0;
    left: 0;
    align-items: center;
    padding: 15px 0;

    .burger-menu-title {
      margin: 0;
      font-size: 17px;
      font-weight: bolder;
    }

    ${TOCBreakPointMobile} {
      display: flex;
      padding-left: 15px;
    }

    ${TOCBreakPointMobileHeight} {
      display: flex;
    }
  }

  .scroll-track-toc-main {
    display: flex;

    ${TOCBreakPointMobile} {
      flex-direction: column;

      .toc-scroll-tracked-right {
        width: 90vw;
      }
    }
  }

  .toc-scroll-tracked {
    &-right {
      padding-top: 30px;
      padding-left: 50px;
      padding-right: 5vw;
      width: 65vw;

      &-item-heading {
        font-size: ${leftTitleSize}px;
        &-has-subheadings {
          &-subheadings-wrap {
            &-title {
            }
          }
        }
      }
    }

    &-left {
      border-right: 1px solid grey;
      padding-left: 20vw;
      position: absolute;
      min-height: 100vh;

      &-has-subheadings {
        &-foldable {
          &-open {
          }

          &-closed {
          }
        }

        &-heading {
          font-size: ${leftTitleSize}px;
          cursor: pointer;

          &-arrow {
          }

          &-title {
          }
        }
      }

      &-item-without-subheadings {
        padding-right: 200px;
        font-size: ${leftTitleSize}px;
        cursor: pointer;
      }
    }
  }

  .stuck {
    position: fixed;
    top: 0;
    height: 100vh;
    overflow: scroll;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 200px;
    }

    &::-webkit-scrollbar-thumb:hover {
      opacity: 1;
    }
  }

  .left-title {
    border-right: ${borderSize}px solid transparent;
    img {
      transition: margin-right padding-top transform float 400ms;
      float: right;
      margin-right: 15px;
      padding-top: 10px;
    }
  }

  .left-subtitle {
    font-size: ${leftSubtitleSize}px;
    color: grey;
    cursor: pointer;
    padding-left: 20px;
  }

  .unstuck {
  }

  .end-hitbox,
  .top-hitbox {
    width: 80vw;
    height: 10px;
  }

  .end-hitbox {
    margin-top: 250px;

    ${TOCBreakPointMobile} {
      margin-top: 0;
    }
  }

  .right-when-is-stuck {
    position: sticky;
    top: 0;

    ${TOCBreakPointOne} {
    }
  }

  .right-title {
    font-size: ${rightTitleSize}px;
    font-weight: bolder;

    ${phoneDevices} {
      padding-top: 80px;
    }
  }

  .right-subtitle {
    font-size: ${rightBodySize}px;
    color: grey;
  }

  .active-toc-item {
    border-right: ${borderSize}px solid #00b3f0;
  }

  .foldable-closed {
    height: 0;
    overflow: hidden;
  }

  .foldable-open {
    height: unset;
  }

  .open-arrow {
    transition: margin-right padding-top transform float 400ms;
    transform: rotate(-90deg);
  }

  .accented-title {
    color: ${colors.accent};
    font-weight: bolder;
  }

  ${TOCBreakPointMobileHeight} {
    .toc-scroll-tracked {
      &-left {
        display: none;
      }
    }

    ${TOCBreakPointMobile} {
      .toc-scroll-tracked {
        &-left {
          display: none;
        }
        &-right {
          padding: 0;
          margin: 0;
          width: 95vw;
          padding: 50px;
          margin: auto;
        }
        .mobile-toc {
          background: red;
        }
      }
    }
  }
`
