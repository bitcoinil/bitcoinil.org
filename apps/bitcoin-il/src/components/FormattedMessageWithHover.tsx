import { notification } from 'antd'
import * as React from 'react'
import * as intl from 'react-intl'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { isTooltipShownOnFormattedMessagesHover } from '../state/state'
import { FormattedMessageWithHoverInfoProps } from '../utils/interfaces'

export const FormattedMessage: React.FC<FormattedMessageWithHoverInfoProps> = ({
  id,
  defaultMessage,
  description
}) => {
  const showHoverInfo = useRecoilValue(isTooltipShownOnFormattedMessagesHover)

  const showNotification = () => {
    notification.open({
      message: 'Copied'
    })
  }

  return (
    <StyledFormattedMessageWithHoverInfo id="FormattedMessageWithHoverInfo">
      <span className="body">
        <intl.FormattedMessage
          id={id}
          defaultMessage={defaultMessage}
          description={description}
        />
        <span className={`popup ${showHoverInfo ? 'info' : 'do-not-show'}`}>
          <span className="monospaced">
            <span
              onClick={() => {
                navigator.clipboard.writeText(id)
                showNotification()
              }}
            >
              id: "{id}"
            </span>
            <span
              onClick={() => {
                navigator.clipboard.writeText(defaultMessage)
                showNotification()
              }}
            >
              defaultMessage: "{defaultMessage}"
            </span>
            <span
              onClick={() => {
                navigator.clipboard.writeText(description)
                showNotification()
              }}
            >
              {' '}
              description: "{description}"
            </span>
          </span>
        </span>
      </span>
    </StyledFormattedMessageWithHoverInfo>
  )
}

const StyledFormattedMessageWithHoverInfo = styled.span`
  display: inline;
  flex-direction: column;

  .monospaced {
    font-family: monospace;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    span {
      margin-bottom: 20px;
      cursor: cell;
    }
  }

  p,
  pre {
    margin: 0;
  }

  pre {
    display: flex;
    flex-direction: column;
  }

  pre span {
    &:hover {
      opacity: 0.5;
      cursor: copy;
    }
  }

  .popup {
    color: white;
    font-size: 15px;
    padding: 5px;
    z-index: 999999999999999999999;
    position: absolute;
    background: #00b3f0;
    border: 3px solid black;
    width: 45vw;
  }

  .do-not-show {
    display: none;
  }
  .info {
    display: none;
    position: absolute;
  }
  .body {
    &:hover {
      .info {
        display: block;
      }
    }
  }
`
