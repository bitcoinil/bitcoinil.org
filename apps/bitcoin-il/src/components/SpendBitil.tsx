import * as React from 'react'
import styled from 'styled-components'

import { spendCards } from '../data/SpendBitilData'
import { SpendBitilProps } from '../utils/interfaces'
import CardsDisplay from './CardsDisplay'

const SpendBitil: React.FC<SpendBitilProps> = ({}) => {
  return (
    <StyledSpendBitil id="SpendBitil">
      <CardsDisplay cards={spendCards} />
    </StyledSpendBitil>
  )
}

export default SpendBitil

const StyledSpendBitil = styled.div``
