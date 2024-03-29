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
  const [isForcedOpen, setIsForcedOpen] = React.useState(false)

  const showHoverInfo = useRecoilValue(isTooltipShownOnFormattedMessagesHover)

  const showNotification = () => {
    notification.open({
      message: 'Copied'
    })
  }

  return (
    <StyledFormattedMessageWithHoverInfo
      id="FormattedMessageWithHoverInfo"
      onMouseEnter={(e) => {
        if (e.shiftKey && showHoverInfo) {
          setIsForcedOpen(true)
        }
      }}
    >
      <span className="formatted-message-with-hover-body">
        <intl.FormattedMessage
          id={id}
          defaultMessage={defaultMessage}
          description={description}
        />
        <span
          className={`popup ${showHoverInfo ? 'info' : 'do-not-show'} ${
            isForcedOpen ? 'forced-open' : ''
          }`}
        >
          <span
            className="close-if-forced"
            onClick={(e) => {
              e.stopPropagation()
              setIsForcedOpen(false)
            }}
          >
            {isForcedOpen ? '🔒️' : ''}
          </span>
          <span className="monospaced">
            <span
              onClick={(e) => {
                e.stopPropagation()
                navigator.clipboard.writeText(id)
                showNotification()
              }}
            >
              id: "{id}" 📋️
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation()
                navigator.clipboard.writeText(defaultMessage)
                showNotification()
              }}
            >
              defaultMessage: "{defaultMessage}" 📋️
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation()
                if (!description) return
                navigator.clipboard.writeText(description)
                showNotification()
              }}
            >
              {' '}
              description: "{description}" 📋️
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

  .formatted-message-with-hover-body {
    &:hover {
      .info {
        display: block;
      }
    }
  }

  .forced-open {
    display: block;
  }

  .close-if-forced {
    cursor: pointer;
    position: absolute;
    right: 10px;
  }
`
