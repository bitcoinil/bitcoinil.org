import * as React from 'react'
import styled from 'styled-components'

import { FormattedMessage } from './FormattedMessageWithHover'

export default function ChooseWallet(): JSX.Element {
  return (
    <StyledChooseYourWallet id="ChooseWallet">
      <h1>
        <FormattedMessage
          id={`page.choose-wallet.title`}
          defaultMessage={`Choose Your Wallet`}
          description={`Homepage Title`}
        />
      </h1>
    </StyledChooseYourWallet>
  )
}

const StyledChooseYourWallet = styled.div``
