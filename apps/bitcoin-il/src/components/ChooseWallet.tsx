import { Card } from 'antd'
import * as React from 'react'
import styled from 'styled-components'

import { walletChoices } from '../data/ChooseWalletData'
import { FormattedMessage } from './FormattedMessageWithHover'

export default function ChooseWallet(): JSX.Element {
  return (
    <StyledChooseYourWallet id="ChooseWallet">
      <h1 className="wallet-choices-title">
        <FormattedMessage
          id={`page.choose-wallet.title`}
          defaultMessage={`Choose Your Wallet`}
          description={`Homepage Title`}
        />
      </h1>
      <div className="wallet-choices-wrap">
        {walletChoices.map((walletC, i) => {
          return (
            <Card key={`wallet-choice-${i}`}>
              <h1 className="wallet-choice-card-title">{walletC.name}</h1>
              <p>
                <a href={walletC.releases}>
                  <FormattedMessage
                    id={`walletchoice.releases`}
                    defaultMessage={`Releases`}
                    description={`releases`}
                  />
                </a>
              </p>
              <p>
                <a href={walletC.websiteLink}>
                  <FormattedMessage
                    id={`walletchoice.web`}
                    defaultMessage={`Website`}
                    description={`web`}
                  />
                </a>
              </p>
              <p>
                <a href={walletC.gitHubRepo}>
                  <FormattedMessage
                    id={`walletchoice.GitHubRepo`}
                    defaultMessage={`GitHub Repo`}
                    description={`GitHubRepo`}
                  />
                </a>
              </p>
              {walletC.appstoreLink ? (
                <p>
                  <a href={walletC.appstoreLink}>
                    <FormattedMessage
                      id={`walletchoice.AppStore`}
                      defaultMessage={`AppStore`}
                      description={`AppStore`}
                    />
                  </a>
                </p>
              ) : null}
            </Card>
          )
        })}
      </div>
    </StyledChooseYourWallet>
  )
}

const StyledChooseYourWallet = styled.div`
  margin-bottom: 150px;

  .wallet-choices-title {
    text-align: center;
    font-size: 30px;
    font-weight: bolder;
    margin-top: 100px;
  }

  .wallet-choice-card-title {
  }

  .wallet-choices-wrap {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;

    .ant-card {
      margin: 30px;
      &-body {
        width: 250px;
        padding: 30px;

        p {
          font-size: 15px;
        }
      }
    }
  }
`
