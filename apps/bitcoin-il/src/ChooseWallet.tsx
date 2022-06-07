import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

export default function ChooseWallet(): JSX.Element {
  return (
    <StyledChooseYourWallet>
      <h1>
        <FormattedMessage
          id={`page.home.title`}
          defaultMessage={`Choose Your Wallet`}
          description={`Homepage Title`}
        />
      </h1>
    </StyledChooseYourWallet>
  )
}

const StyledChooseYourWallet = styled.div``