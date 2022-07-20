import * as React from 'react'
import { FormattedMessage } from 'react-intl'

import { tableOfContentItem } from '../utils/interfaces'

export const FAQ: tableOfContentItem[] = [
  // FAQ With no subheadings:
  {
    categoryHeading: (
      <FormattedMessage
        id={`faq.general`}
        defaultMessage={`General`}
        description={`general`}
      />
    ),
    hasSubheadings: false,
    bodyWithoutSubheadings: [
      {
        body: (
          <FormattedMessage
            id={`faq.what-is.body`}
            defaultMessage={`Bitcoin is a consensus network that enables a new payment system and a completely digital money. It is the first decentralized peer-to-peer payment network that is powered by its users with no central authority or middlemen. From a user perspective, Bitcoin is pretty much like cash for the Internet. Bitcoin can also be seen as the most prominent triple entry bookkeeping system in existence.`}
            description={`what-is.body`}
          />
        )
      }
    ],
    key: 'what-is'
  },
  // FAQ With subheadings:
  {
    categoryHeading: (
      <FormattedMessage
        id={`faq.legal`}
        defaultMessage={`Legal`}
        description={`legal`}
      />
    ),
    hasSubheadings: true,
    subHeadings: [
      {
        hasSubheadings: false,
        key: 'is-it-legal',
        subHeadingTitle: (
          <FormattedMessage
            id={`faq.is-legal`}
            defaultMessage={`Is Bitcoin Legal?`}
            description={`is-legal`}
          />
        ),
        subHeadingBody: (
          <FormattedMessage
            id={`faq.is-legal.body`}
            defaultMessage={`To the best of our knowledge, Bitcoin has not been made illegal by legislation in most jurisdictions. However, some jurisdictions (such as Argentina and Russia) severely restrict or ban foreign currencies. Other jurisdictions (such as Thailand) may limit the licensing of certain entities such as Bitcoin exchanges.
  
          Regulators from various jurisdictions are taking steps to provide individuals and businesses with rules on how to integrate this new technology with the formal, regulated financial system. For example, the Financial Crimes Enforcement Network (FinCEN), a bureau in the United States Treasury Department, issued non-binding guidance on how it characterizes certain activities involving virtual currencies.
          
          `}
            description={`is-legal.body`}
          />
        )
      }
    ],
    key: 'is-legal'
  }
]
