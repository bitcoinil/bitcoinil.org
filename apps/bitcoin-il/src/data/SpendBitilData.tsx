import * as React from 'react'
import { FormattedMessage } from '../components/FormattedMessageWithHover'
import { BodyCard } from '../utils/interfaces'

import ico_product from '../img/ico_product.svg'
import ico_search from '../img/ico_search.svg'
import ico_directory from '../img/ico_directory.svg'
import ico_local from '../img/ico_local.svg'

export const spendCards: BodyCard[] = [
  {
    img: ico_product,
    title: (
      <FormattedMessage
        id={`spendCards.find.title`}
        defaultMessage={'Find Products for Sale Online'}
        description={`individuals card mobile title`}
      />
    ),

    text: (
      <FormattedMessage
        id={`spendCards.find.subtitle`}
        defaultMessage={`One common use for Bitcoin is making purchases online. There are hundreds of online shops and retailers that accept Bitcoin. Using a search engine like Spendabit you can search through millions of products, all available for purchase with bitcoins.`}
      />
    ),
    id: 'learning-resources'
  },
  {
    img: ico_search,
    title: (
      <FormattedMessage
        id={`spendCards.global-local.title`}
        defaultMessage={'Global local and online business search'}
        description={`individuals card mobile title`}
      />
    ),

    text: (
      <FormattedMessage
        id={`spendCards.global-local.subtitle`}
        defaultMessage={`BitcoinWide.com is a global, open and free platform to search businesses, organizations or individuals who accept Bitcoin and other Cryptocurrency.`}
      />
    ),
    id: 'learning-resources'
  },
  {
    img: ico_directory,
    title: (
      <FormattedMessage
        id={`spendCards.navigate.title`}
        defaultMessage={'Navigate a business directory'}
        description={`individuals card mobile title`}
      />
    ),

    text: (
      <FormattedMessage
        id={`spendCards.navigate.subtitle`}
        defaultMessage={`You can also find many businesses listed in online directories.`}
      />
    ),
    id: 'learning-resources'
  },
  {
    img: ico_local,
    title: (
      <FormattedMessage
        id={`spendCards.find-local.title`}
        defaultMessage={'Find local businesses'}
        description={`individuals card mobile title`}
      />
    ),

    text: (
      <FormattedMessage
        id={`spendCards.find-local.subtitle`}
        defaultMessage={`There are also many local businesses, like cafes and restaurants, that accept Bitcoin. You can use Coinmap.org to browse thousands of businesses across the globe.`}
      />
    ),
    id: 'learning-resources'
  }
]
