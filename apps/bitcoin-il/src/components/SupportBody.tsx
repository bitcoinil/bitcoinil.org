import * as React from 'react'
import styled from 'styled-components'

import { supportCards } from '../data/SupportBodyData'
import { SupportBodyProps } from '../utils/interfaces'
import CardsDisplay from './CardsDisplay'

const SupportBody: React.FC<SupportBodyProps> = ({}) => {
  return (
    <StyledSupportBody id="IndividualsBody">
      <CardsDisplay cards={supportCards} />
    </StyledSupportBody>
  )
}

export default SupportBody

const StyledSupportBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;

  .individuals-button {
    margin: 50px;
    align-self: center;

    button {
      padding: 35px;
    }
  }
`
