import * as React from 'react'
import styled from 'styled-components'

import { innovationCards } from '../data/InnovationData'
import { InnovationBodyProps } from '../utils/interfaces'
import CardsDisplay from './CardsDisplay'

const InnovationBody: React.FC<InnovationBodyProps> = ({}) => {
  return (
    <StyledInnovationBody id="IndividualsBody">
      <CardsDisplay cards={innovationCards} />
    </StyledInnovationBody>
  )
}

export default InnovationBody

const StyledInnovationBody = styled.div`
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
