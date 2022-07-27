import * as React from 'react'
import styled from 'styled-components'

import { colors } from '../theme/colors'
import { phoneDevices } from '../utils/breakpoints'
import { AlternatingTwoColumnRowProps } from '../utils/interfaces'

const AlternatingTwoColumnRow: React.FC<AlternatingTwoColumnRowProps> = ({
  index,
  imgSrc,
  titleText,
  bodyText
}) => {
  const even = index % 2 === 1

  return (
    <StyledAlternatingTwoColumnRow
      className={`${even ? 'even' : 'odd'}`}
      id="AlternatingTwoColumnRow"
    >
      <div className="img-side">
        <img src={imgSrc} />
      </div>
      <div className="text-side">
        <h1>{titleText}</h1>
        <p>{bodyText}</p>
      </div>
    </StyledAlternatingTwoColumnRow>
  )
}

export default AlternatingTwoColumnRow

const StyledAlternatingTwoColumnRow = styled.div`
  display: flex;
  padding: 65px;
  margin-top: 50px;
  width: 70vw;
  margin: auto;

  h1 {
    color: ${colors.accent};
  }

  p {
    font-size: 18px;
  }

  ${phoneDevices} {
    flex-direction: column;
    padding: 0;
    width: 100vw;

    img {
      max-width: 75vw;
    }
  }

  &.even {
    flex-direction: row-reverse;

    ${phoneDevices} {
      flex-direction: column;
    }
  }

  &.odd {
  }

  .text-side {
    margin: 0 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .text-side,
  .img-side {
    ${phoneDevices} {
      margin: 10px;
      text-align: center;
    }
  }

  .img-side {
    margin: 0 50px;
  }

  h1 {
    font-weight: bolder;
  }
`
