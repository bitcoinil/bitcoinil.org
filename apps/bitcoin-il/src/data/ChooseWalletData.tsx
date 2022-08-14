import * as React from 'react'
import { FormattedMessage } from '../components/FormattedMessageWithHover'
import { WalletChoice } from '../utils/interfaces'

export const walletChoices: WalletChoice[] = [
  {
    nameAsElement: (
      <FormattedMessage
        id={`walletChoices.BitCoinIlCore.id`}
        defaultMessage={`BitCoin IL Core`}
        description={`id`}
      />
    ),
    id: 'bitil-core',
    gitHubRepo: '',
    releases: 'http://www.google.com',
    appstoreLink: '',
    websiteLink: ''
  },
  {
    nameAsElement: (
      <FormattedMessage
        id={`walletchoice.BitilWalletiPhone`}
        defaultMessage={`BitilWallet iPhone`}
        description={`BitilWallet iPhone`}
      />
    ),
    gitHubRepo: '',
    releases: 'http://www.google.com',
    appstoreLink: '',
    websiteLink: '',
    id: 'BitilWallet-iPhone'
  },
  {
    nameAsElement: (
      <FormattedMessage
        id={`walletchoice.BitilWallet Android`}
        defaultMessage={`BitilWallet Android`}
        description={`BitilWallet Android`}
      />
    ),
    gitHubRepo: '',
    releases: 'http://www.google.com',
    appstoreLink: '',
    websiteLink: '',
    id: 'Bitil-wallet-Android,'
  },
  {
    nameAsElement: (
      <FormattedMessage
        id={`walletchoice.'CiliaWallet'`}
        defaultMessage={`Cilia Wallet`}
        description={`'Cilia Wallet'`}
      />
    ),
    gitHubRepo: '',
    releases: 'http://www.google.com',
    appstoreLink: '',
    websiteLink: '',
    id: 'Cilia-Wallet'
  }
]
