import * as React from 'react'
import styled from 'styled-components'
import { youShouldKnowItems } from '../data/YouShouldKnowData'
import { YouShouldKnowProps } from '../utils/interfaces'

import AlternatingTwoColumnRow from './AlternatingTwoColumnRow'

const YouShouldKnow: React.FC<YouShouldKnowProps> = ({}) => {
  return (
    <StyledYouShouldKnow id="YouShouldKnow">
      {youShouldKnowItems.map((item, i) => {
        return (
          <AlternatingTwoColumnRow
            index={i}
            key={i}
            imgSrc={item.imgSrc}
            titleText={item.titleText}
            bodyText={item.bodyText}
            sideElement={item.sideElement ? item.sideElement : null}
          />
        )
      })}
    </StyledYouShouldKnow>
  )
}

export default YouShouldKnow

const StyledYouShouldKnow = styled.div`
  width: 90vw;
  margin: auto;
`
