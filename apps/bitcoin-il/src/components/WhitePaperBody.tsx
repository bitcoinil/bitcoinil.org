import { Card } from 'antd'
import * as React from 'react'
import styled from 'styled-components'

import { ilWhitePaperTranslations, whitePaperTranslations } from '../data/WhitePaperData'
import ico_download from '../img/ico_download.svg'
import { colors } from '../theme/colors'
import { landscapeMobile, phoneDevices } from '../utils/breakpoints'
import { WhitePaperBodyProps } from '../utils/interfaces'
import { FormattedMessage } from './FormattedMessageWithHover'

const WhitePaperBody: React.FC<WhitePaperBodyProps> = ({}) => {
  return (
    <StyledWhitePaperBody id="WhitePaperBody">
      <h1>
        <FormattedMessage
          id={`bitil-white-paper.intro`}
          defaultMessage={`Bitcoin Israel's whitepaper is a low-technicalities document focusing on the usability and adoption of Bitcoin and described as a scaling attempt to the Bitcoin Core Consensus`}
          description={`intro`}
        />
      </h1>
      <div className="il-papers papers">
        {ilWhitePaperTranslations.map((translation, i) => {
          return (
            <a key={i} href={translation.link}>
              <Card>
                <h1>
                  <img src={ico_download} />
                  {translation.language}
                </h1>
                {translation.translatedBy ? (
                  <p>
                    Translated: by{' '}
                    {translation.translatedBy.map((translationSub, i) => {
                      return (
                        <span
                          className="js-link"
                          key={`tran-${i}`}
                          onClick={() =>
                            window.location.replace(translationSub.link)
                          }
                        >
                          {translationSub.author}
                        </span>
                      )
                    })}
                  </p>
                ) : (
                  <p style={{ visibility: 'hidden' }}>spacer</p>
                )}
              </Card>
            </a>
          )
        })}
      </div>
      <h2>
        <FormattedMessage
          id={`white-paper.do-you-want-translate`}
          defaultMessage={`Do you want to translate the paper into your language? Visit the Bitcoin white paper repository on GitHub for instructions and open an issue if you have any questions.`}
          description={`do-you-want-translate`}
        />
      </h2>

      <hr />
      <h1>
        <FormattedMessage
          id={`original-white-paper.intro`}
          defaultMessage={`Satoshi Nakamoto's original paper is still recommended reading for anyone studying how Bitcoin works. Choose which translation of the paper you want to read:`}
          description={`intro`}
        />
      </h1>
      <div className="papers">
        {whitePaperTranslations.map((translation, i) => {
          return (
            <a key={i} href={translation.link}>
              <Card>
                <h1>
                  <img src={ico_download} />
                  {translation.language}
                </h1>
                {translation.translatedBy ? (
                  <p>
                    Translated: by{' '}
                    {translation.translatedBy.map((translationSub, i) => {
                      return (
                        <span
                          className="js-link"
                          key={`tran-${i}`}
                          onClick={() =>
                            window.location.replace(translationSub.link)
                          }
                        >
                          {translationSub.author}
                        </span>
                      )
                    })}
                  </p>
                ) : (
                  <p style={{ visibility: 'hidden' }}>spacer</p>
                )}
              </Card>
            </a>
          )
        })}
      </div>
    </StyledWhitePaperBody>
  )
}

export default WhitePaperBody

const StyledWhitePaperBody = styled.div`
  padding: 100px;
  text-align: center;
  margin: auto;

  ${phoneDevices} {
    padding: 40px;
    margin: 0;
    width: 100vw;

    h1 {
      font-size: 15px;
    }
  }

  h1 {
    font-weight: bolder;
  }

  .papers {
    display: flex;
    margin: 50px 0;
    align-items: center;
    justify-content: center;

    ${phoneDevices} {
      flex-direction: column;
    }

    ${landscapeMobile} {
      flex-direction: row;
    }

    .ant-card {
      padding: 100px;
      height: 200px;
      width: 300px;
      max-width: 70vw;
      margin-left: 15px;
      background: transparent;
      border: 1px solid ${colors.borderColor};
      display: flex;
      align-items: center;
      justify-content: center;

      ${phoneDevices} {
        margin-bottom: 25px;
        margin-left: 0;
        padding: 0;
      }

      ${landscapeMobile} {
        margin: 0 20px;
      }

      h1 {
        margin: 0;
      }

      img {
        height: 20px;
        margin-right: 20px;
      }
    }
  }

  .js-link {
    color: #00b3f0;
  }
`
