import * as React from 'react'
import styled from 'styled-components'

import { boxes } from '../data/QuickOverviewData'
import OverviewBG from '../img/overview-bg.svg'
import { largeDevices, phoneDevices } from '../utils/breakpoints'
import { QuickOverviewBoxProps } from '../utils/interfaces'
import { FormattedMessage } from './FormattedMessageWithHover'
import QuickOverviewBox from './QuickOverviewBox'

export default function QuickOverview(): JSX.Element {
  const baseFormattedMessageId: String = 'page.home.quick-overview'

  return (
    <StyledQuickOverview id="QuickOverview">
      <h1>
        <FormattedMessage
          id={`${baseFormattedMessageId}.title`}
          defaultMessage={`Get A Quick Overview For`}
          description={`QuickOverview`}
        />
      </h1>
      <div className="quick-overview-boxes">
        {boxes.map((boxInfo: QuickOverviewBoxProps, i: number) => {
          const {
            imgSrc,
            index,
            id,
            titleDefaultMessage,
            titleDescription,
            subtitleDefaultMessage,
            subtitleDescription,
            link
          } = boxInfo
          return (
            <QuickOverviewBox
              key={i}
              index={index}
              imgSrc={imgSrc}
              id={id}
              titleDefaultMessage={titleDefaultMessage}
              titleDescription={titleDescription}
              subtitleDefaultMessage={subtitleDefaultMessage}
              subtitleDescription={subtitleDescription}
              baseFormattedMessage={baseFormattedMessageId}
              link={link}
            />
          )
        })}
      </div>
    </StyledQuickOverview>
  )
}

const StyledQuickOverview = styled.div`
  margin-top: 50px;
  box-sizing: border-box;
  padding: 300px 0 60px 0;
  background: url(${OverviewBG}) top no-repeat;
  background-size: cover;
  max-width: 100vw;

  h1 {
    ${phoneDevices} {
      margin-top: 50px;
    }

    color: white;
  }

  .quick-overview-boxes {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;

    ${phoneDevices} {
    }

    ${largeDevices} {
      flex-direction: row;
    }
  }
`
