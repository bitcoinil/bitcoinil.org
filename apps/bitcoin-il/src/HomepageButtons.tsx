import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import SiteButton from './BitcoinSiteButton'
// import { useNavigate } from 'react-router-dom'

export default function HomepageButtons(): JSX.Element {
  //   const navigate = useNavigate()
  return (
    <StyledHomepageButtons>
      <div className="homepage-buttons">
        <SiteButton type="primary">
          <FormattedMessage
            id={`homepage.get-started-button`}
            defaultMessage={`Get Started With BitCoin Il`}
            description={`Get Started`}
          />
        </SiteButton>
        <SiteButton type="default">
          <FormattedMessage
            id={`homepage.choose-your-wallet`}
            defaultMessage={`Choose Your Wallet`}
            description={`Choose Wallet`}
          />
        </SiteButton>
        <SiteButton type="default">
          <FormattedMessage
            id={`homepage.buy-bitcoin`}
            defaultMessage={`Buy Bitcoin`}
            description={`Buy`}
          />
        </SiteButton>
      </div>
    </StyledHomepageButtons>
  )
}

const StyledHomepageButtons = styled.div`
  .homepage-buttons {
    display: flex;

    .ant-btn {
      width: 285px;
      font-weight: bolder;
      font-size: 16px;
    }

    button {
      margin-right: 10px;
    }
  }
`
