import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { colors } from '../theme/colors'
import { GettingStartedBodyProps, TimelineItemProps } from '../utils/interfaces'
import TimelineComp from './Timeline'
import TimelineItem from './TimelineItem'
import { Divider } from 'antd'
import {
  howToAcceptTimelineItems,
  howToUseTimelineItems
} from '../data/GettingStartedData'

const GettingStartedBody: React.FC<GettingStartedBodyProps> = ({}) => {
  return (
    <StyledGettingStartedBody id="GettingStartedBody">
      <h1 className="getting-started-title">
        <FormattedMessage
          id={`page.getting-started-how-to-use`}
          defaultMessage={`How To Use Bitcoin`}
          description={`How To Start`}
        />
      </h1>
      <TimelineComp items={howToUseTimelineItems} />
      <Divider />
      <h1 className="getting-started-title">
        <FormattedMessage
          id={`page.getting-started-how-to-accept`}
          defaultMessage={`How To Accept Bitcoin`}
          description={`How To Accept`}
        />
      </h1>
      <TimelineComp items={howToAcceptTimelineItems} />
    </StyledGettingStartedBody>
  )
}

export default GettingStartedBody

const StyledGettingStartedBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 105px;
  flex-direction: column;

  .getting-started-title {
    color: ${colors.accent};
    font-weight: bolder;
  }
`
