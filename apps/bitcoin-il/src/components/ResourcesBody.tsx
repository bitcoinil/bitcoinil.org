import * as React from 'react'
import styled from 'styled-components'

import { resourceCards } from '../data/ResourcesBodyData'
import { phoneDevices } from '../utils/breakpoints'
import { ResourcesBodyProps } from '../utils/interfaces'
import CardsDisplay from './CardsDisplay'

const ResourcesBody: React.FC<ResourcesBodyProps> = ({}) => {
  return (
    <StyledResourcesBody id="ResourcesBody">
      <CardsDisplay cards={resourceCards} />
    </StyledResourcesBody>
  )
}

export default ResourcesBody

const StyledResourcesBody = styled.div`
  .list-of-links {
    display: flex;
    flex-direction: column;
    text-align: center;
    list-style: none;
  }

  ${phoneDevices} {
    padding: 0;
  }
`
