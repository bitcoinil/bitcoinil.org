import * as React from 'react'
import styled from 'styled-components'

import { individualCards } from '../data/IndividualsBodyData'
import { IndividualsBodyProps } from '../utils/interfaces'
import SiteButton from './BitcoinSiteButton'
import CardsDisplay from './CardsDisplay'
import CustomNavLink from './CustomNavLink'

const IndividualsBody: React.FC<IndividualsBodyProps> = ({}) => {
  return (
    <StyledIndividualsBody id="IndividualsBody">
      <CardsDisplay cards={individualCards} />
      <div className="individuals-button">
        <CustomNavLink to="/getting-started">
          <SiteButton type="primary">Get Started With BitCoin Il</SiteButton>
        </CustomNavLink>
      </div>
    </StyledIndividualsBody>
  )
}

export default IndividualsBody

const StyledIndividualsBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;

  .individuals-button {
    margin: 50px;
    align-self: center;
  }
`
