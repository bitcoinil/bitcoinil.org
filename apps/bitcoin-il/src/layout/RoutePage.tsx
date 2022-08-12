import * as React from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import HeroBg from '../img/hero-bg.svg'
import HeroBgLight from '../img/hero-bg-light.svg'

import { isDarkModeState } from '../state/state'
import { phoneDevices } from '../utils/breakpoints'
import { RoutePageProps } from '../utils/interfaces'

export default function RoutePage({
  title,
  subtitle,
  body,
  id
}: RoutePageProps): JSX.Element {
  const isDark = useRecoilValue(isDarkModeState)

  return (
    <StyledRoutePage isDark={isDark} id="RoutePage">
      <div
        className={`page-title ${isDark ? 'dark-mode-routepage' : ''} ${
          !subtitle ? 'page-title-no-subtitle' : ''
        }`}
      >
        <h1 className="routepage-title">
          <br />
          {title}
        </h1>
        <h3 className="routepage-subtitle">{subtitle}</h3>
        <div className="trans-bel"></div>
      </div>
      <div className="routepage-body">{body}</div>
    </StyledRoutePage>
  )
}

interface StyledRoutePageProps {
  isDark: boolean
  id: string
}

const StyledRoutePage = styled.div<StyledRoutePageProps>`
  min-height: 100vh;

  .page-title {
    background-image: url('${HeroBgLight}');
    background-size: cover;
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    text-align: center;
    padding: 50px 0;

    h1 {
      margin: 25px 20px 0 20px;
      color: white;
      text-align: center;
      font-size: 40px;
      font-weight: bolder;
    }

    h3 {
      color: #9d9d9d;
      max-width: 65vw;
      font-weight: bold;
      font-size: 22px;

      ${phoneDevices} {
        max-width: 90vw;
      }
    }

    .trans-bel {
    }

    .routepage-title {
      color: black;
    }

    .routepage-subtitle {
      color: #505050;
    }
  }

  .page-title-no-subtitle {
    min-height: 400px;
  }

  .dark-mode-routepage {
    background-image: url('${HeroBg}');
    .routepage-title {
      color: unset;
    }

    .routepage-no-subtitle {
      color: unset;
    }
  }
`
