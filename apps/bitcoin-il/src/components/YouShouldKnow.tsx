import * as React from 'react'
import { FormattedMessage } from './FormattedMessageWithHover'
import styled from 'styled-components'

export interface YouShouldKnowProps {}

const YouShouldKnow: React.FC<YouShouldKnowProps> = ({}) => {
  return (
    <StyledYouShouldKnow id="YouShouldKnow">
      <h1>YouShouldKnow</h1>
    </StyledYouShouldKnow>
  )
}

export default YouShouldKnow

const StyledYouShouldKnow = styled.div``
