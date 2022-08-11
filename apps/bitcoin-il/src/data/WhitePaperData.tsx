import * as React from 'react'

import { FormattedMessage } from '../components/FormattedMessageWithHover'
import { WhitePaperTranslation } from '../utils/interfaces'

export const whitePaperTranslations: WhitePaperTranslation[] = [
  {
    link: 'https://bitcoin.org/bitcoin.pdf',
    language: (
      <FormattedMessage
        id={`white-paper.english.label`}
        defaultMessage={`English (Original)`}
        description={`english.label`}
      />
    )
  },
  {
    link: 'https://bitcoin.org/files/bitcoin-paper/bitcoin_iw.pdf',
    language: (
      <FormattedMessage
        id={`white-paper.hebrew.label`}
        defaultMessage={`עברית`}
        description={`hebrew.label`}
      />
    ),
    translatedBy: [
      {
        author: (
          <FormattedMessage
            id={`white-paper.hebrew.translator0`}
            defaultMessage={`Meni Rosenfeld`}
            description={`hebrew.translator0`}
          />
        ),
        link: 'https://twitter.com/MeniRosenfeld'
      }
    ]
  }
]
export const ilWhitePaperTranslations: WhitePaperTranslation[] = [
  {
    link: '/bitcoinil.pdf',
    language: (
      <FormattedMessage
        id={`il-white-paper.english.label`}
        defaultMessage={`English (Original)`}
        description={`english.label`}
      />
    )
  },
  // {
  //   link: 'https://bitcoin.org/files/bitcoin-paper/bitcoin_iw.pdf',
  //   language: (
  //     <FormattedMessage
  //       id={`white-paper.hebrew.label`}
  //       defaultMessage={`עברית`}
  //       description={`hebrew.label`}
  //     />
  //   ),
  //   translatedBy: [
  //     {
  //       author: (
  //         <FormattedMessage
  //           id={`white-paper.hebrew.translator0`}
  //           defaultMessage={`Meni Rosenfeld`}
  //           description={`hebrew.translator0`}
  //         />
  //       ),
  //       link: 'https://twitter.com/MeniRosenfeld'
  //     }
  //   ]
  // }
]
