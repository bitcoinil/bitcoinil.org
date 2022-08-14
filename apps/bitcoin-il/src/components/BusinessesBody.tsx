import * as React from 'react'
import styled from 'styled-components'

import { businessCards } from '../data/BusinessesBodyData'
import { BusinessBodyProps } from '../utils/interfaces'
import SiteButton from './BitcoinSiteButton'
import CardsDisplay from './CardsDisplay'
import CustomNavLink from './CustomNavLink'
import { FormattedMessage } from './FormattedMessageWithHover'

const BusinessBody: React.FC<BusinessBodyProps> = ({}) => {
  return (
    <StyledBusinessBody id="IndividualsBody">
      <CardsDisplay cards={businessCards} />
      <div className="individuals-button">
        <CustomNavLink to="/getting-started">
          <SiteButton
            buttonLinkWrapUrl={`https://www.FooFighters.com`}
            buttonLinkId={`Foo Fighters`}
            type="primary"
          >
            <FormattedMessage
              id={`businesses.get-started-button`}
              defaultMessage={`Get Started With BitCoin Il`}
              description={`get-started-button`}
            />
          </SiteButton>
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
