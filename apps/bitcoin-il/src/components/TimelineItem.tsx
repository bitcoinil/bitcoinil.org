import * as React from 'react'
import styled from 'styled-components'

import { TimelineItemProps } from '../utils/interfaces'
import SiteButton from './BitcoinSiteButton'
import CustomNavLink from './CustomNavLink'

const TimelineItem: React.FC<TimelineItemProps> = ({
  // key,
  title,
  body,
  buttonText,
  buttonOnClick,
  navigateTo,
  buttonLinkWrapUrl
}) => {
  return (
    <StyledTimelineItem id="TimelineItem">
      <h1>{title}</h1>
      <p>{body}</p>
      {navigateTo ? (
        <CustomNavLink to={navigateTo}>
          <SiteButton type="primary">{buttonText}</SiteButton>
        </CustomNavLink>
      ) : (
        <SiteButton
          buttonLinkWrapUrl={buttonLinkWrapUrl}
          type="primary"
          onClick={buttonOnClick}
        >
          {buttonText}
        </SiteButton>
      )}
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
