import * as React from 'react'
import styled from 'styled-components'

import { HTMLElementWithID, IndividualFAQ } from '../utils/interfaces'

import ico_angle from '../img/ico_angle_white.svg'

export interface TableOfContentsScrollTrackedProps {
  items: IndividualFAQ[]
}

const TableOfContentsScrollTracked: React.FC<
  TableOfContentsScrollTrackedProps
> = ({ items }) => {
  const [isBelowZero, setIsBelowZero] = React.useState(false)
  const [isAtEnd, setIsAtEnd] = React.useState(false)
  const [isAtStart, setisAtStart] = React.useState(false)
  const [elementsToTrack, setElementsToTrack] = React.useState<
    (HTMLElement | null)[]
  >([])
  const [isError, setIsError] = React.useState(false)
  const [elInView, setElInView] = React.useState('')

  const columnsRef = React.createRef<HTMLDivElement>()
  const endRef = React.createRef<HTMLDivElement>()
  const startRef = React.createRef<HTMLDivElement>()

  console.log(elInView)

  const handleScroll = () => {
    const elsInView: (HTMLElementWithID | null)[] = []
    // console.log('scroll')
    // console.log(elementsToTrack)
    // console.log(elementsToTrack[0])
    if (elementsToTrack[0]?.getBoundingClientRect) {
      // console.log(elementsToTrack[0]?.getBoundingClientRect())
    }

    // console.log('🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱')
    elementsToTrack.forEach((el) => {
      // console.log('TRACKING', el)
      // console.log('--------------------------------')
      // console.log(el)
      if (elementsToTrack[0]?.getBoundingClientRect().y) {
        // TS Is telling me that objtec could be undefined, but that's not true
        // @ts-ignore
        if (el?.getBoundingClientRect()?.y > 0) {
          elsInView.push(el)
        }
      }
    })

    // console.log('⛰️', elsInView[0]?.id)
    if (elsInView[0]) setElInView(elsInView[0].id)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [elementsToTrack])

  React.useEffect(() => {
    const elsToTrack: (HTMLElement | null)[] = []
    const keys: string[] = []

    items.forEach((item) => {
      // console.log(item.key)
      if (keys.includes(item.key)) {
        console.error(
          `TableOfContentsScrollTracked found duplicate key: ${item.key}`
        )
        setIsError(true)
      }
      keys.push(item.key)
      // console.log(document.getElementById(item.key))
      elsToTrack.push(document.getElementById(item.key))
      // console.log(item.subHeadings)
      item.subHeadings?.map((sub) => {
        // console.log(sub.key)
        if (keys.includes(sub.key)) {
          console.error(`Found duplicate key: ${sub.key}`)
          setIsError(true)
        }
        keys.push(sub.key)
        // console.log(document.getElementById(item.key))
        elsToTrack.push(document.getElementById(sub.key))
      })
    })
    // console.log(keys)
    // console.log(elsToTrack)
    setElementsToTrack(elsToTrack)
  }, [])

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

  if (isError) return <h1>You Have Duplicate Keys In Your Items, Fix That</h1>

  return (
    <StyledTableOfContentsScrollTracked id="TableOfContentsScrollTracked">
      {/* <button onClick={() => console.log(rightSideElements)}>LOG ELES</button> */}
      <div className="top-hitbox" ref={startRef} />
      <div className="scroll-track-toc-main">
        <div
          className={`toc-scroll-tracked-left ${
            isBelowZero && !isAtEnd && isAtStart ? 'stuck' : 'unstuck'
          }`}
          ref={columnsRef}
        >
          {items.map((item, i) => {
            // console.log(item.key === elInView)
            if (!item.subHeadings) {
              // Here are the headings with no submenus
              return (
                <p
                  className={`toc-scroll-tracked-left-item-without-subheadings left-title ${
                    item.key === elInView ? 'blink' : null
                  }`}
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
                <div
                  key={i}
                  className="toc-scroll-tracked-left-has-subheadings"
                >
                  <p
                    className={`toc-scroll-tracked-left-has-subheadings-heading left-title ${
                      item.key === elInView ? 'blink' : ''
                    }`}
                    key={i}
                  >
                    {item.categoryHeading}
                    <img
                      src={ico_angle}
                      className="toc-scroll-tracked-left-has-subheadings-heading-arrow"
                    />
                  </p>
                  <div style={{ background: 'yellow' }}>
                    {item.subHeadings.map((subItem, i) => {
                      //   console.log(subItem)
                      return (
                        <p
                          className={`toc-scroll-tracked-left-has-subheadings-heading-title left-subtitle ${
                            subItem.key === elInView ? 'blink' : ''
                          }`}
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
              // Item without subheadings
              // console.log(item)
              return (
                <p
                  id={item.key}
                  key={i}
                  className="toc-scroll-tracked-right-item-heading right-title"
                >
                  {item.categoryHeading}
                </p>
              )
            } else {
              // Item which has subheadings
              // console.log(rightSideElements)
              return (
                <React.Fragment key={i}>
                  <p
                    id={item.key}
                    className="toc-scroll-tracked-right-item-heading-has-subheadings right-title"
                  >
                    {item.categoryHeading}
                  </p>
                  <div className="toc-scroll-tracked-right-item-heading-has-subheadings-subheadings-wrap">
                    {item.subHeadings.map((subItem, i) => {
                      // console.log(subItem)
                      return (
                        <React.Fragment key={i}>
                          <p
                            id={subItem.key}
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
          margin-bottom: 0;
          display: flex;
          justify-content: space-between;

          &-arrow {
            background: red;
            margin-right: 5px;
          }

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

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 179, 240, 0.2);
      border-radius: 200px;
    }

    &::-webkit-scrollbar-thumb:hover {
      opacity: 1;
      background: #00b3f0;
    }
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

  .blink {
    border-right: 10px solid red;
  }
`
