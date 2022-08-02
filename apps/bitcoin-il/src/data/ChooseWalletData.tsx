import * as React from 'react'
import { FormattedMessage } from '../components/FormattedMessageWithHover'

interface WalletChoice {
  name: JSX.Element
  gitHubRepo: string
  releases: string
  appstoreLink?: string
  websiteLink: string
}

export const walletChoices: WalletChoice[] = [
  {
    name: (
      <FormattedMessage
        id={`walletChoices.BitCoinIlCore.id`}
        defaultMessage={`BitCoin IL Core`}
        description={`id`}
      />
    ),
    gitHubRepo: '',
    releases: 'http://www.google.com',
    appstoreLink: '',
    websiteLink: ''
  },
  {
    name: (
      <FormattedMessage
        id={`walletchoice.BitilWalletiPhone`}
        defaultMessage={`BitilWallet iPhone`}
        description={`BitilWallet iPhone`}
      />
    ),
    gitHubRepo: '',
    releases: 'http://www.google.com',
    appstoreLink: '',
    websiteLink: ''
  },
  {
    name: (
      <FormattedMessage
        id={`walletchoice.BitilWallet Android`}
        defaultMessage={`BitilWallet Android`}
        description={`BitilWallet Android`}
      />
    ),
    gitHubRepo: '',
    releases: 'http://www.google.com',
    appstoreLink: '',
    websiteLink: ''
  },
  {
    name: (
      <FormattedMessage
        id={`walletchoice.'CiliaWallet'`}
        defaultMessage={`Cilia Wallet`}
        description={`'Cilia Wallet'`}
      />
    ),
    gitHubRepo: '',
    releases: 'http://www.google.com',
    appstoreLink: '',
    websiteLink: ''
  }
]
