import * as React from 'react'
import styled from 'styled-components'

import { phoneDevices } from '../utils/breakpoints'
import { FormattedMessage } from './FormattedMessageWithHover'
import GetStartedWithBitcoin from './GetStartedWithBitcoin'
import HomepageButtons from './HomepageButtons'
import QuickOverview from './QuickOverview'
import WhatIsBitcoin from './WhatIsBitcoin'

export default function HomePage(): JSX.Element {
  return (
    <StyledHomePage id="HomePage">
      <h1>
        <FormattedMessage
          id={`page.home.title`}
          defaultMessage={`Bitcoin Il is an innovative payment network and a new kind of money.`}
          description={`Homepage Title`}
        />
      </h1>
      <HomepageButtons />
      <WhatIsBitcoin />
      <QuickOverview />
      <GetStartedWithBitcoin />
    </StyledHomePage>
  )
}

const StyledHomePage = styled.div`
  ${phoneDevices} {
    padding: 50px 0 50px;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 130px 0 50px;
  max-width: 100vw;

  h1 {
    ${phoneDevices} {
      font-size: 32px;
      margin: 100px 0 20px 0;
      padding: 0 70px;
    }

    font-size: 51px;
    text-align: center;
    margin: 0px 185px 45px;
    font-weight: bolder;
  }
`
