import * as React from 'react'
import styled from 'styled-components'

import { TimelineItemProps } from '../utils/interfaces'
import SiteButton from './BitcoinSiteButton'

const TimelineItem: React.FC<TimelineItemProps> = ({
  // key,
  title,
  body,
  buttonText,
  buttonOnClick
}) => {
  return (
    <StyledTimelineItem id="TimelineItem">
      <h1>{title}</h1>
      <p>{body}</p>
      <SiteButton type="primary" onClick={buttonOnClick}>
        {buttonText}
      </SiteButton>
    </StyledTimelineItem>
  )
}

export default TimelineItem

const StyledTimelineItem = styled.div`
  button {
    margin-top: 35px;
  }

  h1 {
    font-weight: bolder;
  }
`
