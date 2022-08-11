import * as React from 'react'
import styled from 'styled-components'

import { colors } from '../theme/colors'
import { phoneDevices } from '../utils/breakpoints'
import { AlternatingTwoColumnRowProps } from '../utils/interfaces'

const AlternatingTwoColumnRow: React.FC<AlternatingTwoColumnRowProps> = ({
  index,
  imgSrc,
  titleText,
  bodyText,
  sideElement
}) => {
  const even = index % 2 === 1
  console.log(sideElement)
  return (
    <StyledAlternatingTwoColumnRow
      className={`${even ? 'even' : 'odd'}`}
      id="AlternatingTwoColumnRow"
    >
      <div className="img-side">
        {imgSrc ? <img src={imgSrc} /> : null}
        {sideElement ? sideElement : null}
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
    margin: 0 5em;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .text-side,
  .img-side {
    ${phoneDevices} {
      /* margin: 10px; */
      text-align: center;
    }
  }

  .img-side {
    margin: 0 50px;

    table {
      width: 475px;
      font-size: 14px;

      th,
      td {
        padding: 10px;
        border: 1px solid #ddd;
      }

      tr:nth-of-type(even) {
        background: #f9f9f9;
      }

      tr:nth-child(1) {
        th {
          font-size: 16px;
        }
      }

      th {
        font-weight: bolder;
      }
    }
  }

  h1 {
    font-weight: bolder;
  }
`
