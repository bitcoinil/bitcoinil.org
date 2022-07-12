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

  .body-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100vw;
  }

  .ant-card {
    width: 300px;
    margin: 20px;

    ${phoneDevices} {
      width: 95vw;
    }

    &-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .card-title {
        font-weight: bolder;
        text-align: center;
      }
    }
  }
`
