import * as React from 'react'
import styled from 'styled-components'

import { terms } from '../data/VocabularyBodyData'
import { VocabularyProps } from '../utils/interfaces'
import TableOfContentsScrollTracked from './TableOfContentsScrollTracked'

const Vocabulary: React.FC<VocabularyProps> = ({}) => {
  return (
    <StyledVocabulary id="Vocabulary">
      <TableOfContentsScrollTracked items={terms} />
    </StyledVocabulary>
  )
}

export default Vocabulary

const StyledVocabulary = styled.div``
