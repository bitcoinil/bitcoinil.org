import * as React from 'react'
import styled from 'styled-components'

import ico_angle from '../img/ico_angle_black.svg'
import {
  ElementToTrack,
  FAQSubheading,
  HTMLElementWithID,
  IndividualFAQ,
  TableOfContentsScrollTrackedProps
} from '../utils/interfaces'

const TableOfContentsScrollTracked: React.FC<
  TableOfContentsScrollTrackedProps
> = ({ items }) => {
  const [isBelowZero, setIsBelowZero] = React.useState(false)
  const [isAtEnd, setIsAtEnd] = React.useState(false)
  const [isAtStart, setisAtStart] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const [elInView, setElInView] = React.useState('')
  const [openSubmenus, setOpenSubmenus] = React.useState<string[]>([])

  const columnRef = React.createRef<HTMLDivElement>()
  const endRef = React.createRef<HTMLDivElement>()
  const startRef = React.createRef<HTMLDivElement>()
  const rightSideElements = React.useRef<(ElementToTrack | null)[]>([])
  const leftSideElements = React.useRef<(ElementToTrack | null)[]>([])

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

  const getLeftSideElementFromStateUsingKey = (key: string) => {
    return leftSideElements.current.find((o) => o?.key === key)
  }

  const handleScroll = () => {
    const elsInView: (HTMLElementWithID | null)[] = []

    rightSideElements.current.forEach((el) => {
      if (el?.element?.getBoundingClientRect()) {
        if (el?.element?.getBoundingClientRect()?.y > 0) {
          elsInView.push(el.element)
        }
      }
    })

    if (elsInView[0]) setElInView(elsInView[0].id)
  }

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

  const isRefStored = (ref: ElementToTrack, left: boolean) => {
    const arrayToCheck = left ? leftSideElements : rightSideElements
    return !!arrayToCheck.current.find((o) => o?.key === ref.key)
  }

  const handleRef = (
    ref: HTMLParagraphElement | null,
    left: boolean,
    item: IndividualFAQ | FAQSubheading,
    menuParent?: string | null
  ) => {
    if (!ref) return null

    const { hasSubHeadings, key } = item

    const newElementToTrack: ElementToTrack = {
      element: ref,
      hasSubheadings: hasSubHeadings,
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
    if (!columnRef.current?.getBoundingClientRect().y) return null
    setIsBelowZero(columnRef.current?.getBoundingClientRect()?.y <= 0)
  }

  const scrollCheckEnderInView = () => {
    if (!endRef?.current) return
    setIsAtEnd(
      endRef.current?.getBoundingClientRect().y < window.innerHeight - 400
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
      <div className="scroll-track-toc-main">
        <div
          className={`toc-scroll-tracked-left ${
            isBelowZero && !isAtEnd && isAtStart ? 'stuck' : 'unstuck'
          }`}
          ref={columnRef}
        >
          {items.map((item, i) => {
            if (!item.subHeadings) {
              // Here are the headings with no submenus
              return (
                <p
                  className={`toc-scroll-tracked-left-item-without-subheadings left-title ${
                    item.key === elInView ? 'blink' : ''
                  }`}
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
                      item.key === elInView ? 'blink' : ''
                    }`}
                    // @ts-ignore
                    // ref={handleRef}
                    ref={(ref) => handleRef(ref, true, item)}
                    onClick={() => handleOpenSubmenu(item.key)}
                    key={i}
                  >
                    {item.categoryHeading}
                    <img
                      src={ico_angle}
                      className="toc-scroll-tracked-left-has-subheadings-heading-arrow"
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
                            subItem.key === elInView ? 'blink' : ''
                          }`}
                          ref={(ref) => handleRef(ref, true, subItem, item.key)}
                          key={i}
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
          className={`toc-scroll-tracked-right ${
            isBelowZero && !isAtEnd && isAtStart ? 'right-when-is-stuck' : ''
          }`}
        >
          {items.map((item, i) => {
            if (!item.subHeadings) {
              // no subheadings

              return (
                <p
                  id={item.key}
                  // @ts-ignore
                  // ref={handleRef}
                  ref={(ref) => handleRef(ref, false, item)}
                  key={i}
                  className="toc-scroll-tracked-right-item-heading right-title"
                >
                  {item.categoryHeading}
                </p>
              )
            } else {
              return (
                // has subheadings

                <React.Fragment key={i}>
                  <p
                    id={item.key}
                    // @ts-ignore
                    ref={(ref) => handleRef(ref, false, item)}
                    // ref={handleRef}
                    className="toc-scroll-tracked-right-item-heading-has-subheadings right-title submenu-title"
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
                            // @ts-ignore
                            // ref={handleRef}
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

const titleSize = 18
const menuItemHeight = 40
const borderSize = 5

const StyledTableOfContentsScrollTracked = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  margin: auto;

  .scroll-track-toc-main {
    display: flex;
    justify-content: space-between;
  }
  .toc-scroll-tracked {
    &-right {
      width: 70%;
      margin-left: auto;

      &-item-heading {
        &-has-subheadings {
          &-subheadings-wrap {
            display: flex;
            flex-direction: column;
            margin-right: 17vw;
            padding-left: 135px;

            &-title {
            }
          }
        }
      }
    }

    &-left {
      width: 300px;
      z-index: 3000;
      border-right: 1px solid grey;
      background-color: yellow;
      &-has-subheadings {
        &-foldable {
          overflow: hidden;
          &-open {
          }

          &-closed {
          }
        }

        &-heading {
          font-size: ${titleSize}px;
          margin-bottom: 0;
          display: flex;
          justify-content: space-between;
          cursor: pointer;

          &-arrow {
            margin-right: 5px;
          }

          &-title {
            height: ${menuItemHeight}px;
            margin-bottom: 0;
          }
        }
      }

      &-item-without-subheadings {
        font-size: ${titleSize}px;
      }
    }
  }

  .stuck {
    position: fixed;
    top: 0;
    overflow-y: auto;
    height: 100vh;

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
    font-size: ${titleSize}px;
    font-size: 22px;
    margin-left: 10px;
    margin-bottom: 0;
    height: ${menuItemHeight}px;
    border-right: ${borderSize}px solid transparent;

    img {
      height: 7px;
      margin: auto 0;
    }
  }

  .left-subtitle {
    font-size: 18px;
    margin-left: 20px;
  }

  .unstuck {
    position: unset;
  }

  .end-hitbox,
  .top-hitbox {
    width: 80vw;
    height: 10px;
  }

  .right-when-is-stuck {
  }

  .right-title {
    font-size: 30px;
  }

  .right-subtitle {
    margin-left: 20px;
    font-size: 20px;
  }

  .blink {
    border-right: ${borderSize}px solid #00b3f0;
  }

  .foldable-closed {
    height: 0;
  }

  .foldable-open {
    height: auto;
  }
`
