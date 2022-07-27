import { notification, Tooltip } from 'antd'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { isTooltipShownOnFormattedMessagesHover } from '../state/state'

export interface FormattedMessageWithHoverInfoProps {
  id: string
  defaultMessage: string
  description: string
}

const FormattedMessageWithHoverInfo: React.FC<
  FormattedMessageWithHoverInfoProps
> = ({ id, defaultMessage, description }) => {
  const showHoverInfo = useRecoilValue(isTooltipShownOnFormattedMessagesHover)

  const showNotification = () => {
    notification.open({
      message: 'Copied'
    })
  }

  return (
    <StyledFormattedMessageWithHoverInfo id="FormattedMessageWithHoverInfo">
      <div className="body">
        <FormattedMessage
          id={id}
          defaultMessage={defaultMessage}
          description={description}
        />
        <div className={`popup ${showHoverInfo ? 'info' : 'do-not-show'}`}>
          <pre>
            <p
              onClick={() => {
                navigator.clipboard.writeText(id)
                showNotification()
              }}
            >
              id: "{id}"
            </p>
            <p
              onClick={() => {
                navigator.clipboard.writeText(defaultMessage)
                showNotification()
              }}
            >
              defaultMessage: "{defaultMessage}"
            </p>
            <p
              onClick={() => {
                navigator.clipboard.writeText(description)
                showNotification()
              }}
            >
              {' '}
              description: "{description}"
            </p>
          </pre>
        </div>
      </div>
    </StyledFormattedMessageWithHoverInfo>
  )
}

export default FormattedMessageWithHoverInfo

const StyledFormattedMessageWithHoverInfo = styled.div`
  display: flex;
  flex-direction: column;

  p,
  pre {
    margin: 0;
  }

  pre p:hover {
    opacity: 0.5;
    cursor: copy;
  }

  .popup {
    color: white;
    font-size: 15px;
    padding: 5px;
    z-index: 999999999999999999999;
    position: absolute;
    background: #00b3f0;
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
