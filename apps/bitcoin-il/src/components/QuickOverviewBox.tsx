import * as React from 'react'
import styled from 'styled-components'

import { landscapeMobile, phoneDevices } from '../utils/breakpoints'
import { QuickOverviewBoxProps } from '../utils/interfaces'
import CustomNavLink from './CustomNavLink'

const QuickOverviewBox: React.FC<QuickOverviewBoxProps> = ({
  imgSrc,
  titleDefaultMessage,
  subtitleDefaultMessage,
  link
}) => {
  return (
    <CustomNavLink to={link}>
      <StyledQuickOverviewBox id="QuickOverviewBox">
        <img src={imgSrc} />
        <div className="box-text">
          <h4>{titleDefaultMessage}</h4>
          <p>{subtitleDefaultMessage}</p>
        </div>
      </StyledQuickOverviewBox>
    </CustomNavLink>
  )
}

export default QuickOverviewBox

const StyledQuickOverviewBox = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  background-color: black;
  color: white;
  margin: 20px;
  width: 20vw;
  align-items: center;
  justify-content: space-around;
  padding: 30px;

  ${phoneDevices} {
    width: 50vw;
    flex-direction: row;
  }

  ${landscapeMobile} {
    width: 30vw;
  }

  &:hover {
    opacity: 0.6;
  }

  .box-text {
    display: flex;
    flex-direction: column;

    h4 {
      color: white;
      font-weight: bolder;
    }

    p {
      color: grey;
    }
  }
`
