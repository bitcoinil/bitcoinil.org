import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { FAQ } from '../data/FAQData'
import { IndividualFAQ } from '../utils/interfaces'
import TableOfContentsScrollTracked from './TableOfContentsScrollTracked'

export interface FAQBodyTwoProps {
  items: IndividualFAQ[]
}

const FAQBodyTwo: React.FC<FAQBodyTwoProps> = ({}) => {
  return (
    <StyledFAQBodyTwo id="FAQBodyTwo">
      <TableOfContentsScrollTracked items={FAQ} />
    </StyledFAQBodyTwo>
  )
}

export default FAQBodyTwo

const StyledFAQBodyTwo = styled.div``
