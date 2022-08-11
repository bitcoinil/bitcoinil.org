import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import SiteButton from './BitcoinSiteButton'
import { FormattedMessage } from './FormattedMessageWithHover'

export default function HomepageButtons(): JSX.Element {
  const navigate = useNavigate()

  return (
    <StyledHomepageButtons>
      <div className="homepage-buttons">
        <SiteButton
          onClick={() => {
            navigate('/getting-started')
          }}
          type="primary"
        >
          <FormattedMessage
            id={`homepage.get-started-button`}
            defaultMessage={`Get Started With BitCoin Il`}
            description={`Get Started`}
          />
        </SiteButton>
        <SiteButton
          onClick={() => {
            navigate('/choose-your-wallet')
          }}
          type="default"
        >
          <FormattedMessage
            id={`homepage.choose-your-wallet`}
            defaultMessage={`Choose Your Wallet`}
            description={`Choose Wallet`}
          />
        </SiteButton>
        <SiteButton
          onClick={() => {
            navigate('/buy')
          }}
          type="default"
        >
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
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    .ant-btn {
      width: 285px;
      font-weight: bolder;
      font-size: 16px;
    }

    button {
      margin: 0 10px 10px 0;
    }
  }
`
