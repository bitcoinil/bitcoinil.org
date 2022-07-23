import * as React from 'react'
import styled from 'styled-components'

import { FAQ } from '../data/FAQData'
import { FAQBodyProps } from '../utils/interfaces'
import TableOfContentsScrollTracked from './TableOfContentsScrollTracked'

const FAQBody: React.FC<FAQBodyProps> = ({}) => {
  return (
    <StyledFAQBodyTwo id="FAQBodyTwo">
      <TableOfContentsScrollTracked items={FAQ} />
    </StyledFAQBodyTwo>
  )
}

export default FAQBody

const StyledFAQBodyTwo = styled.div``
