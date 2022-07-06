import * as React from 'react'
import styled from 'styled-components'

import { phoneDevices } from '../utils/breakpoints'
import { CommunityBodyProps } from '../utils/interfaces'
import CardsDisplay from './CardsDisplay'
import { communityCards } from '../data/CommunityBodyData'

const CommunityBody: React.FC<CommunityBodyProps> = ({}) => {
  return (
    <StyledCommunityBody id="CommunityBody">
      <CardsDisplay cards={communityCards} />
    </StyledCommunityBody>
  )
}

export default CommunityBody

const StyledCommunityBody = styled.div`
  .list-of-links {
    display: flex;
    flex-direction: column;
    text-align: center;
    list-style: none;

    ${phoneDevices} {
      padding: 0;
    }
  }
`
