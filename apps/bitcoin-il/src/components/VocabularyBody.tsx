import * as React from 'react'
import styled from 'styled-components'
import { terms } from '../data/VocabularyBodyData'

import { colors } from '../theme/colors'
import { flashElement, scrollToElement } from '../util/util'
import { phoneDevices } from '../utils/breakpoints'
import { VocabularyProps } from '../utils/interfaces'

const Vocabulary: React.FC<VocabularyProps> = ({}) => {
  return (
    <StyledVocabulary id="Vocabulary">
      <div>
        <div className={`left`}>
          <ul>
            {terms.map((term, i) => {
              return (
                <li
                  className="dict-word-link"
                  onClick={() => {
                    scrollToElement(document.getElementById(`word-${i}`))
                    flashElement(document.getElementById(`word-${i}`))
                  }}
                  key={i}
                >
                  {term.word}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="right">
        {terms.map((term, i) => {
          return (
            <li key={i} id={`word-${i}`}>
              <h3>{term.word}</h3>
              <p>{term.definition}</p>
            </li>
          )
        })}
      </div>
    </StyledVocabulary>
  )
}

export default Vocabulary

const StyledVocabulary = styled.div`
  justify-content: center;
  display: flex;

  li {
    list-style: none;
  }

  .left {
    width: 35vw;
    font-size: 20px;
    border-right: 1px solid #b9b9c350;
    position: sticky;
    top: 0;
    left: 0;
    height: 100vh;
    padding-top: 60px;

    ul {
      ${phoneDevices} {
        font-size: 17px;
        padding: 7px;
      }
    }

    li {
      margin-bottom: 10px;
    }
  }

  .right {
    width: 65vw;

    li {
      padding: 50px;
      border-bottom: 1px solid #b9b9c350;
      ${phoneDevices} {
        padding: 10px;
      }
    }

    h3 {
      color: ${colors.accent};
      font-size: 25px;
      font-weight: bolder;
    }

    p {
      font-size: 18px;
    }
  }

  .dict-word-link {
    cursor: pointer;

    transition: opacity 400ms;
    &:hover {
      transition: opacity 400ms;
      opacity: 0.6;
    }
  }
`
