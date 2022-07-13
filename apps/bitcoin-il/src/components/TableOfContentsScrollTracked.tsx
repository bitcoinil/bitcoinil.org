import * as React from 'react'
import styled from 'styled-components'

import { IndividualFAQ } from '../utils/interfaces'

export interface TOCItem {
  label: string
}

export interface TableOfContentsScrollTrackedProps {
  items: IndividualFAQ[]
}

const TableOfContentsScrollTracked: React.FC<
  TableOfContentsScrollTrackedProps
> = ({ items }) => {
  const [isBelowZero, setIsBelowZero] = React.useState(false)
  const [isAtEnd, setIsAtEnd] = React.useState(false)
  const [isAtStart, setisAtStart] = React.useState(false)

  React.useEffect(() => {
    console.log(isAtEnd)
  }, [isAtEnd])

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

  const columnsRef = React.createRef<HTMLDivElement>()
  const endRef = React.createRef<HTMLDivElement>()
  const startRef = React.createRef<HTMLDivElement>()

  const scrollCheckMenuInView = () => {
    if (!columnsRef.current?.getBoundingClientRect().y) return null
    setIsBelowZero(columnsRef.current?.getBoundingClientRect()?.y <= 0)
  }

  const scrollCheckEnderInView = () => {
    if (!endRef?.current) return
    setIsAtEnd(
      endRef.current?.getBoundingClientRect().y < window.innerHeight - 400
    )
  }

  const scrollCheckTopHotboxInView = () => {
    if (!startRef?.current) return
    setisAtStart(
      startRef.current?.getBoundingClientRect().y < 0
      //   < window.innerHeight - 400
    )
  }

  if (!items) return <h1>No Items To Show</h1>

  return (
    <StyledTableOfContentsScrollTracked id="TableOfContentsScrollTracked">
      <div className="top-hitbox" ref={startRef} />
      <div className="scroll-track-toc-main">
        <div
          className={`toc-scroll-tracked-left ${
            isBelowZero && !isAtEnd && isAtStart ? 'stuck' : 'unstuck'
          }`}
          ref={columnsRef}
        >
          {items.map((item, i) => {
            //   console.log(item.hasSubHeadings)
            if (!item.subHeadings) {
              // Here are the headings with no submenus
              return (
                <p
                  className="toc-scroll-tracked-left-item-without-subheadings left-title"
                  key={i}
                >
                  {item.categoryHeading}
                </p>
              )
            } else {
              // Here are the heading with submenus

              item.subHeadings.map((subHead, i) => {
                //   console.log(subHead)
              })

              return (
                <div className="toc-scroll-tracked-left-has-subheadings">
                  <p
                    className="toc-scroll-tracked-left-has-subheadings-heading left-title"
                    key={i}
                  >
                    {item.categoryHeading}
                  </p>
                  {item.subHeadings.map((subItem, i) => {
                    //   console.log(subItem)
                    return (
                      <p
                        className="toc-scroll-tracked-left-has-subheadings-heading-title left-subtitle"
                        key={i}
                      >
                        {subItem.subHeadingTitle}
                      </p>
                    )
                  })}
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
              // Item without subheadings
              // console.log(item)
              return (
                <p className="toc-scroll-tracked-right-item-heading right-title">
                  {item.categoryHeading}
                </p>
              )
            } else {
              // Item which has subheadings
              return (
                <React.Fragment>
                  <p className="toc-scroll-tracked-right-item-heading-has-subheadings right-title">
                    {item.categoryHeading}
                  </p>
                  <div className="toc-scroll-tracked-right-item-heading-has-subheadings-subheadings-wrap">
                    {item.subHeadings.map((subItem, i) => {
                      // console.log(subItem)
                      return (
                        <React.Fragment>
                          <p className="toc-scroll-tracked-right-item-heading-has-subheadings-subheadings-wrap-title right-title">
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

const StyledTableOfContentsScrollTracked = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 80px 0;
  flex-direction: column;

  .scroll-track-toc-main {
    display: flex;
    justify-content: space-between;
  }
  .toc-scroll-tracked {
    &-right {
      background: #c7adad;
      width: 70vw;

      &-item-heading {
        background: #e0e09a;

        &-has-subheadings {
          background: #a9e9a9;

          &-subheadings-wrap {
            background: #c82976;
            display: flex;
            flex-direction: column;

            &-title {
              background: #d6b371;
            }
          }
        }
      }
    }

    &-left {
      background: #9a9ac7;
      width: 25vw;
      z-index: 3000;

      &-has-subheadings {
        background: maroon;

        &-heading {
          background: pink;
          font-size: ${titleSize}px;

          &-title {
            background: #17bc56;
          }
        }
      }

      &-item-without-subheadings {
        font-size: ${titleSize}px;
        background: grey;
      }
    }
  }

  .stuck {
    background: black;
    position: fixed;
    top: 0;
    overflow-y: auto;
    height: 100vh;
  }

  .left-title {
    font-size: ${titleSize}px;
    margin-left: 10px;
  }

  .left-subtitle {
    font-size: ${titleSize - 5}px;
    margin-left: 20px;
  }

  .unstuck {
    position: unset;
    background: gainsboro;
  }

  .end-hitbox,
  .top-hitbox {
    width: 80vw;
    background-color: red;
    height: 10px;
  }

  .right-when-is-stuck {
    margin-left: 29vw;
  }

  .right-title {
    font-size: 30px;
  }

  .right-subtitle {
    margin-left: 20px;
    font-size: 20px;
  }
`
