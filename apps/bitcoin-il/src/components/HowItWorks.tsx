import * as React from 'react'
import styled from 'styled-components'

import { howItWorksItems } from '../data/HowItWorksData'
import { HowItWorksProps } from '../utils/interfaces'
import AlternatingTwoColumnRow from './AlternatingTwoColumnRow'

const HowItWorks: React.FC<HowItWorksProps> = ({}) => {
  return (
    <StyledHowItWorks id="HowItWorks">
      {howItWorksItems.map((item, i) => {
        return (
          <AlternatingTwoColumnRow
            index={i}
            key={i}
            imgSrc={item.imgSrc}
            titleText={item.titleText}
            bodyText={item.bodyText}
          />
        )
      })}
    </StyledHowItWorks>
  )
}

export default HowItWorks

const StyledHowItWorks = styled.div``
