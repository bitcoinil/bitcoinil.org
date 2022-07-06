import { Card } from 'antd'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { whitePaperTranslations } from '../data/WhitePaperData'

import ico_download from '../img/ico_download.svg'
import { phoneDevices } from '../utils/breakpoints'
import { WhitePaperBodyProps } from '../utils/interfaces'

const WhitePaperBody: React.FC<WhitePaperBodyProps> = ({}) => {
  return (
    <StyledWhitePaperBody id="WhitePaperBody">
      <h1>
        <FormattedMessage
          id={`white-paper.intro`}
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
      <h1>
        <FormattedMessage
          id={`white-paper.do-you-want-translate`}
          defaultMessage={`Do you want to translate the paper into your language? Visit the Bitcoin white paper repository on GitHub for instructions and open an issue if you have any questions.`}
          description={`do-you-want-translate`}
        />
      </h1>
    </StyledWhitePaperBody>
  )
}

export default WhitePaperBody

const StyledWhitePaperBody = styled.div`
  padding: 100px;

  ${phoneDevices} {
    padding: 40px;

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

    ${phoneDevices} {
      flex-direction: column;
    }

    .ant-card {
      padding: 60px;
      height: 200px;
      margin-left: 15px;

      display: flex;
      align-items: center;
      justify-content: center;

      ${phoneDevices} {
        margin-bottom: 25px;
        margin-left: 0;
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
    color: blue;
  }
`
