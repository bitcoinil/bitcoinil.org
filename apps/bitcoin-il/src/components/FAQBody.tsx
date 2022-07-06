import { Divider } from 'antd'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { colors } from '../theme/colors'
import { phoneDevices } from '../utils/breakpoints'
import { FAQBodyProps } from '../utils/interfaces'
import { FAQ } from '../data/FAQData'

const FAQBody: React.FC<FAQBodyProps> = ({}) => {
  return (
    <StyledFAQBody id="FAQBody">
      <div className="faq-left">
        <ul>
          {FAQ.map((faq, i) => {
            return (
              <li key={i}>
                {faq.categoryHeading}
                {faq.hasSubHeadings ? (
                  <ul>
                    {faq.subHeadings?.map((subHead, i) => {
                      return <li key={i}>{subHead.subHeadingTitle}</li>
                    })}
                  </ul>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="faq-right">
        {FAQ.map((faq, i) => {
          return (
            <React.Fragment key={i}>
              <h1 className="faq-category-heading faq-accented-header">
                {faq.categoryHeading}
              </h1>
              {faq.hasSubHeadings
                ? faq.subHeadings?.map((subH, i) => {
                    return (
                      <React.Fragment key={i}>
                        <h1 className="faq-subheading-title">
                          {subH.subHeadingTitle}
                        </h1>
                        <p>{subH.subHeadingBody}</p>
                      </React.Fragment>
                    )
                  })
                : null}
            </React.Fragment>
          )
        })}
        <Divider />
        <div className="faq-help">
          <h1 className="faq-help-title faq-accented-header">
            <FormattedMessage
              id={`faq.help-title`}
              defaultMessage={`Help`}
              description={`help-title`}
            />
          </h1>
          <p className="faq-help-subtitle">
            <FormattedMessage
              id={`faq.help-like-help`}
              defaultMessage={`I'd like to learn more. Where can I get help?`}
              description={`help-like-help`}
            />
          </p>
          <p className="faq-help-subtitle-small">
            <FormattedMessage
              id={`faq.help-wiki`}
              defaultMessage={`You can find more information`}
              description={`help-wiki`}
            />
            {'    '}
            <a href="google.com">
              <FormattedMessage
                id={`faq.help-subtitle-info-here`}
                defaultMessage={`here`}
                description={`help-subtitle-info-here`}
              />
            </a>
          </p>
        </div>
      </div>
    </StyledFAQBody>
  )
}

export default FAQBody

const StyledFAQBody = styled.div`
  padding: 30px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  .faq {
    &-accented-header {
      color: ${colors.accent};
      font-weight: bolder;
    }

    &-left {
      width: 30%;
      position: sticky;
      top: 0;

      ${phoneDevices} {
        display: none;
      }

      ul {
        list-style: none;
      }
    }

    &-help {
    }

    &-right {
      width: 70%;

      ${phoneDevices} {
        width: unset;
      }
    }

    &-category-heading {
    }

    &-subheading-title {
      font-weight: bolder;
      font-size: 22px;
    }

    &-help {
      &-subtitle {
        font-size: 22px;
        &-small {
          font-size: 19px;
        }
      }
    }
  }
`
