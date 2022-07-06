import * as React from 'react'
import styled from 'styled-components'

import { BusinessBodyProps } from '../utils/interfaces'
import SiteButton from './BitcoinSiteButton'
import { businessCards } from '../data/BusinessesBodyData'
import CardsDisplay from './CardsDisplay'
import CustomNavLink from './CustomNavLink'

const BusinessBody: React.FC<BusinessBodyProps> = ({}) => {
  return (
    <StyledBusinessBody id="IndividualsBody">
      <CardsDisplay cards={businessCards} />
      <div className="individuals-button">
        <CustomNavLink to="/getting-started">
          <SiteButton type="primary">Get Started With BitCoin Il</SiteButton>
        </CustomNavLink>
      </div>
    </StyledBusinessBody>
  )
}

export default BusinessBody

const StyledBusinessBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;

  .individuals-button {
    margin: 50px;
    align-self: center;
  }
`
