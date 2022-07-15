import * as React from 'react'
import styled from 'styled-components'

import { FAQ } from '../data/FAQData'
import { FAQBodyTwoProps } from '../utils/interfaces'
import TableOfContentsScrollTracked from './TableOfContentsScrollTracked'

const FAQBodyTwo: React.FC<FAQBodyTwoProps> = ({}) => {
  return (
    <StyledFAQBodyTwo id="FAQBodyTwo">
      <TableOfContentsScrollTracked items={FAQ} />
    </StyledFAQBodyTwo>
  )
}

export default FAQBodyTwo

const StyledFAQBodyTwo = styled.div``
