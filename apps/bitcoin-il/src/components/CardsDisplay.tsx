import { Card } from 'antd'
import * as React from 'react'
import styled from 'styled-components'

import { phoneDevices } from '../utils/breakpoints'
import { BodyCard, CardsDisplayProps } from '../utils/interfaces'

const CardsDisplay: React.FC<CardsDisplayProps> = ({ cards }) => {
  return (
    <StyledCardsDisplay id="CardsDisplay">
      <div className="body-cards">
        {cards.map((card: BodyCard, i: number) => {
          return (
            <Card key={`card-${i}`}>
              <img src={card.img} />
              <h1 className="card-title">{card.title}</h1>
              <span>{card.text}</span>
            </Card>
          )
        })}
      </div>
    </StyledCardsDisplay>
  )
}

export default CardsDisplay

const StyledCardsDisplay = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  margin: 120px 0;

  .body-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100vw;
    padding: 25px 0 0 0;
    width: 70vw;
    margin: auto;

    ${phoneDevices} {
      width: 100vw;
    }
  }

  .ant-card {
    width: 20vw;
    margin: 20px;
    background: transparent;

    ${phoneDevices} {
      width: 95vw;
    }

    &-body {
      height: 70vh;
      padding: 30px;
      border: 1px solid #dadada;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

      .card-title {
        font-weight: bolder;
        text-align: center;
        margin-bottom: 50px;
      }
      .list-of-links {
        font-size: 16px;
        padding: 0;
        font-weight: bolder;
      }
    }
  }
`
