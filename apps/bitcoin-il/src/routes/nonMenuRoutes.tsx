import * as React from 'react'
import ChooseWallet from '../components/ChooseWallet'
import { FormattedMessage } from '../components/FormattedMessageWithHover'
import RoutePage from '../layout/RoutePage'

export const nonMenuRoutes = [
  {
    key: 'choose-your-wallet',
    path: 'choose-your-wallet',
    element: (
      <RoutePage
        id="choose-your-wallet"
        title={
          <FormattedMessage
            id="page.choose-wallet.title.menu"
            defaultMessage="Choose Your Wallet"
            description="Choose Wallet"
          />
        }
        subtitle={
          <FormattedMessage
            id="page.choose-wallet.subtitle"
            defaultMessage="Which Wallet Is For You?"
            description="Choose Wallet"
          />
        }
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
        title={
          <FormattedMessage
            id="page.buy-bitil.title"
            defaultMessage="Buy BitcoinIL"
            description="Choose Wallet"
          />
        }
        subtitle={
          <FormattedMessage
            id="page.buy-bitil.subtitle"
            defaultMessage="Buy BitcoinIL"
            description="Choose Wallet"
          />
        }
        body={<h1>Buy Body</h1>}
      />
    )
  }
]
