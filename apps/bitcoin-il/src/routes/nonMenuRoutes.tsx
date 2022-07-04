import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import ChooseWallet from '../components/ChooseWallet'
import RoutePage from '../layout/RoutePage'

export const nonMenuRoutes = [
  {
    key: 'choose-your-wallet',
    path: 'choose-your-wallet',
    element: (
      <RoutePage
        id="choose-your-wallet"
        title={<FormattedMessage id="page.choose-wallet.title" defaultMessage="Choose Your Wallet" />}
        subtitle={<FormattedMessage id="page.choose-wallet.subtitle" defaultMessage="Which Wallet Is For You?" />}
        body={<ChooseWallet />}
      />
    )
  },
  {
    key: 'buy',
    path: 'buy',
    element: (
      <RoutePage
        id="buy"
        title={<FormattedMessage id="page.buy-bitil.title" defaultMessage="Buy BitcoinIL" />}
        subtitle={<FormattedMessage id="page.buy-bitil.subtitle" defaultMessage="Buy BitcoinIL" />}
        body={<h1>Buy Body</h1>}
      />
    )
  }
]
