import * as React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import {
  isDevModeVisibleState,
  isThemeDebugVisibleState,
  isTooltipShownOnFormattedMessagesHover
} from '../state/state'

export default function DevTools() {
  const [isDevTools, setIsDevTools] = useRecoilState(isDevModeVisibleState)
  const [isThemeDebug, setIsThemeDebug] = useRecoilState(
    isThemeDebugVisibleState
  )

  const [isTooltip, setIsTooltip] = useRecoilState(
    isTooltipShownOnFormattedMessagesHover
  )

  const [isMin, setIsMin] = React.useState(false)

  const [positions, setPositions] = React.useState({
    leftRight: '',
    topBottom: ''
  })

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.altKey && e.key === 'd') {
      setIsThemeDebug(false)
    }
  }
  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <StyledDevTools
      id="DevTools"
      positions={positions}
      showingTheme={isThemeDebug}
      isMin={isMin}
    >
      <div className="close-btn-dev-tools-wrap">
        <button
          className="close-btn-dev-tools"
          onClick={() => {
            setIsMin(!isMin)
          }}
        >
          {!isMin ? '➖' : '➕'}
        </button>
        <button
          className="close-btn-dev-tools"
          onClick={() => {
            setIsDevTools(false)
          }}
        >
          ❌
        </button>
      </div>

      <button
        className="direction-arrow-btn left"
        onClick={() => setPositions({ ...positions, leftRight: 'left' })}
      >
        {'<'}
      </button>
      <button
        className="direction-arrow-btn right"
        onClick={() => setPositions({ ...positions, leftRight: 'right' })}
      >
        {'>'}
      </button>
      <button
        className="direction-arrow-btn up"
        onClick={() => setPositions({ ...positions, topBottom: 'top' })}
      >
        {'^'}
      </button>
      <button
        className="direction-arrow-btn down"
        onClick={() => setPositions({ ...positions, topBottom: 'bottom' })}
      >
        {'V'}
      </button>
      <h1>DEV TOOLS </h1>
      <div className="dev-tools-body">
        <button
          className="big-btn-dev-tools"
          onClick={() => setIsTooltip(!isTooltip)}
        >
          {isTooltip ? 'Disbale' : 'Enable'} Hover Info On Strings
        </button>
        <button
          className="big-btn-dev-tools"
          onClick={() => setIsThemeDebug(!isThemeDebug)}
        >
          {isThemeDebug ? 'Hide' : 'Show'} Theme Debug
        </button>
        <button className="big-btn-dev-tools" onClick={() => console.clear()}>
          Clear Console
        </button>
      </div>
    </StyledDevTools>
  )
}

const StyledDevTools = styled.div`
  z-index: 9999999999;
  position: fixed;
  left: ${(props) => (props.positions.leftRight === 'left' ? '0' : '')};
  right: ${(props) => (props.positions.leftRight === 'right' ? '0' : '0')};
  top: ${(props) => (props.positions.topBottom === 'top' ? '0' : '0')};
  bottom: ${(props) => (props.positions.topBottom === 'bottom' ? '0' : '')};

  ${(props) => (props.isMin ? `height: 45px; overflow: hidden;` : '')};

  border: 2px solid;
  .dev-tools-body {
    display: flex;
    flex-direction: column;
  }

  ${(props) =>
    props.isMin
      ? `.dev-tools-body,
  .direction-arrow-btn {
    display: none;
  }`
      : null}

  ${(props) =>
    props.showingTheme
      ? `top:0;
  right:0;`
      : ``}

  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background: white;
  padding: ${(props) => (props.isMin ? '0' : `60px;`)};

  .close-btn-dev-tools-wrap {
    position: absolute;
    top: 0;
    right: 0;
    .close-btn-dev-tools {
      border: none;
      background: none;
      cursor: pointer;
      font-size: 25px;

      &:hover {
        opacity: 0.5;
      }
    }
  }

  .big-btn-dev-tools {
    font-size: 18px;
    padding: 20px;
    margin-bottom: 10px;
  }

  .direction-arrow-btn {
    position: absolute;
    font-weight: bolder;
    color: white;
    background: black;
    font-size: 25px;
  }

  .up {
    top: 0;
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }

  .down {
    bottom: 0;
  }
`
