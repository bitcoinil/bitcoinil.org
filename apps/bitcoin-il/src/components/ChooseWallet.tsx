import {
  AndroidOutlined,
  AppleFilled,
  AppleOutlined,
  AppstoreOutlined,
  GithubOutlined,
  GlobalOutlined,
  HomeOutlined,
  RocketOutlined,
  WindowsOutlined
} from '@ant-design/icons'
import { Avatar, Button, Card } from 'antd'
import * as React from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { walletChoices } from '../data/ChooseWalletData'
import { FormattedMessage } from './FormattedMessageWithHover'

export default function ChooseWallet(): JSX.Element {
  const intl = useIntl()
  console.log('Intl:', intl.messages)

  const walletProperties = [
    'name',
    'title',
    'description',
    'screenshots',
    'platforms'
    // 'community',
  ]
  const links = [
    'website',
    'appstore',
    'playstore',
    'repo',
    'releases',
    'windows',
    'osx',
    'linux',
    'logo',
    'screenshot'
  ]
  const communityProperties = [
    'telegram',
    'instagram',
    'facebook',
    'whatsapp',
    'reddit'
  ]

  const wallets = React.useMemo(
    () =>
      ((intl.messages['wallets.LIST'] as string) || '').split(', ').map((w) =>
        walletProperties.reduce(
          (acc, p) => ({
            ...acc,
            [p]: intl.messages[`wallets.wallet.${w}.${p}`]
          }),
          {
            walletId: w,
            community: communityProperties.reduce(
              (acc2, p) => ({
                ...acc2,
                [p]: intl.messages[`wallets.wallet.${w}.community.${p}`]
              }),
              {}
            ),
            links: links.reduce(
              (acc2, p) => ({
                ...acc2,
                [p]: intl.messages[`wallets.wallet.${w}.${p}`]
              }),
              {}
            ) as Record<string, string>
          } as Record<string, any>
        )
      ),
    [intl.messages]
  )

  const actions = {
    website: { icon: <HomeOutlined />, text: 'Website' } as Record<string, any>,
    windows: { icon: <WindowsOutlined />, text: 'Windows' } as Record<
      string,
      any
    >,
    osx: { icon: <AppleFilled />, text: 'OSX' } as Record<string, any>,
    linux: { icon: <AppstoreOutlined />, text: 'Linux' } as Record<string, any>,
    appstore: { icon: <AppleOutlined />, text: 'iOS' } as Record<string, any>,
    playstore: { icon: <AndroidOutlined />, text: 'Android' } as Record<
      string,
      any
    >,
    repo: { icon: <GithubOutlined />, text: 'Source Code' } as Record<
      string,
      any
    >,
    releases: { icon: <RocketOutlined />, text: 'Releases' } as Record<
      string,
      any
    >,
    telegram: { text: 'Telegram' }
  } as Record<string, any>

  return (
    <StyledChooseYourWallet id="ChooseWallet">
      <h1 className="wallet-choices-title">
        <FormattedMessage
          id={`page.choose-wallet.title`}
          defaultMessage={`Choose Your Wallet`}
          description={`Homepage Title`}
        />
      </h1>
      {
        <div className="wallet-choices-wrap">
          {wallets.map((wallet, i) => (
            <WalletChoiceCard
              cover={
                wallet.links.screenshot || wallet.screenshots?.[0] ? (
                  <img
                    src={wallet.links.screenshot || wallet.screenshots?.[0]}
                    alt={wallet.title}
                  />
                ) : null
              }
              actions={[
                Object.entries(actions)
                  .filter(([action]) => wallet.links[action])
                  .map(([action, conf]) => (
                    <Button
                      type="text"
                      target="_blank"
                      href={wallet.links[action]}
                      key={`action-${action}`}
                      icon={conf.icon}
                    >
                      {conf.text}
                    </Button>
                  ))
              ]}
            >
              <Card.Meta
                avatar={
                  wallet.links.logo ? (
                    <Avatar
                      shape="square"
                      size="large"
                      src={wallet.links.logo}
                    />
                  ) : null
                }
                title={wallet.name}
                description={wallet.description}
              />
              <div className="community">
                {Object.entries(wallet.community)
                  .filter(([, v]) => !!v)
                  .map(([key, value]) => (
                    <a href={value as string} key={key}>
                      {actions[key].text}
                    </a>
                  ))}
              </div>
            </WalletChoiceCard>
          ))}
        </div>
      }
    </StyledChooseYourWallet>
  )
}

const WalletChoiceCard = styled(Card)`
  background: red;
  &.ant-card {
    display: grid;
    @media screen and (max-width: 390px) {
      grid-template-areas:
        'cover cover cover'
        'content content content'
        'actions actions actions';
    }
    @media screen and (min-width: 390px) {
      grid-template-areas:
        'cover content content'
        'cover content content'
        'actions actions actions';
    }

    @media screen and (min-width: 996px) {
      grid-template-areas:
        'cover content content'
        'cover content content'
        'cover actions actions';
    }
    grid-template-columns: 160px 1fr 1fr;
    grid-template-rows: 1fr 1fr min-content;
    grid-column-gap: 12px;
    padding: 24px 12px;
    background: var(--body-background);

    > .ant-card-cover {
      grid-area: cover;
      max-height: 180px;

      > img {
        /* width: auto;
        height: auto; */
        object-fit: contain;
        max-height: 180px;

        /* display: inline-block; */
        /* max-height: 250px; */
      }
    }
    > .ant-card-body {
      grid-area: content;
      width: 100%;
    }
    > .ant-card-actions {
      grid-area: actions;
      background: var(--body-background);
    }
  }
  .ant-card-meta-avatar {
    span {
      img {
        max-height: 100%;
        max-width: 100%;
        height: auto;
        width: auto;
      }
    }
  }
`

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
    /* justify-content: space-evenly; */
    /* flex-wrap: wrap; */
    flex-direction: column;

    @media screen and (max-width: 390px) {
      padding: 0 3vw;
      row-gap: 12px;
    }
    @media screen and (min-width: 390px) {
      padding: 0 8vw;
      row-gap: 30px;
    }
    @media screen and (min-width: 996px) {
      padding: 0 180px;
      row-gap: 30px;
    }
    .ant-card {
      width: 100%;
    }
  }
`
