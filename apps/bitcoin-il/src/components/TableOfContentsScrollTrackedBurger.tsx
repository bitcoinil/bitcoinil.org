import * as React from 'react'
import styled from 'styled-components'

import ico_angle from '../img/ico_angle.svg'
import { TOCBurgerMenuProps } from '../utils/interfaces'

const TOCBurgerMenu: React.FC<TOCBurgerMenuProps> = ({
  label,
  items,
  elInView,
  scrollToRightSideElement,
  handleRef,
  handleOpenSubmenu,
  openSubmenus,
  isSubmenuOpen
}) => {
  const [burgerOpen, setBurgerOpen] = React.useState(false)

  const toggleBurger = () => {
    setBurgerOpen(!burgerOpen)
  }

  return (
    <BurgerWrap id="TOC-Burger-Wrap">
      <input
        className={`checkbox`}
        onChange={toggleBurger}
        type="checkbox"
        checked={burgerOpen}
      />
      <div className="hamburger-lines">
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </div>
      {label ? (
        <span className="hamburger-lines-label" onClick={toggleBurger}>
          {label}
        </span>
      ) : null}
      <div className={`TOC-slide-out ${burgerOpen ? 'open' : 'closed'}`}>
        {items.map((item, i) => {
          if (!item.subHeadings) {
            // Here are the headings with no submenus
            return (
              <p
                className={`toc-scroll-tracked-left-item-without-subheadings left-title ${
                  item.key === elInView ? 'active-toc-item' : ''
                }`}
                onClick={() => {
                  toggleBurger()
                  scrollToRightSideElement(item.key)
                }}
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
                          toggleBurger()
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
      <div
        className={`on-click-outside ${burgerOpen ? 'open' : 'closed'}`}
        onClick={() => {
          setBurgerOpen(false)
        }}
      />
    </BurgerWrap>
  )
}

export default TOCBurgerMenu

const BurgerWrap = styled.div`
  transition: height 400ms;
  display: flex;
  align-items: center;
  padding-right: 10px;

  .checkbox {
    position: relative;
    display: block;
    height: 32px;
    width: 32px;
    left: 20px;
    z-index: 5;
    opacity: 0;
    cursor: pointer;
  }

  .hamburger-lines {
    display: block;
    height: 12px;
    width: 15px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-label {
      padding-left: 15px;
      cursor: pointer;
    }
  }

  .hamburger-lines .line {
    display: block;
    height: 2px;
    width: 100%;
    border-radius: 10px;
    background: white;
  }

  .hamburger-lines .line1 {
    transform-origin: 0% 0%;
    transition: transform 0.4s ease-in-out;
  }

  .hamburger-lines .line2 {
    transition: transform 0.2s ease-in-out;
  }

  .hamburger-lines .line3 {
    transform-origin: 0% 100%;
    transition: transform 0.4s ease-in-out;
  }

  .menu-items {
    padding-top: 120px;
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
    height: 100vh;
    width: 100%;
    transform: translate(-150%);
    display: flex;
    flex-direction: column;
    margin-left: -40px;
    padding-left: 50px;
    transition: transform 0.5s ease-in-out;
    text-align: center;
  }

  .menu-items li {
    margin-bottom: 1.2rem;
    font-size: 1.5rem;
    font-weight: 500;
  }

  input[type='checkbox']:checked ~ .menu-items {
    transform: translateX(0);
  }

  input[type='checkbox']:checked ~ .hamburger-lines .line1 {
    transform: rotate(45deg);
  }

  input[type='checkbox']:checked ~ .hamburger-lines .line2 {
    transform: scaleY(0);
  }

  input[type='checkbox']:checked ~ .hamburger-lines .line3 {
    transform: rotate(-45deg);
  }

  input[type='checkbox']:checked ~ .logo {
    display: none;
  }

  .ant-menu {
    border-right: none;
  }

  .TOC-slide-out {
    height: 0;
    z-index: 5;
    overflow: hidden;
    width: 65vw;
    position: absolute;
    background-color: black;
    color: white;
    top: 62px;
    left: 0;
    transition: height 400ms;
    overflow: scroll;

    &.open {
      transition: height 400ms;
      height: 100vh;
      padding: 20px;
    }
  }

  .on-click-outside {
    height: 100vh;
    width: 100vw;
    transition: e all 400ms;
    position: absolute;
    top: 60px;
    left: 0;

    &.closed {
      display: none;
    }
  }

  .toc-scroll-tracked-left-item-without-subheadings,
  .left-title {
    border-bottom: 1px solid grey;
  }
`
