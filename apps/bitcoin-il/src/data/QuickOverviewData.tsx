import * as React from 'react'
import { FormattedMessage } from '../components/FormattedMessageWithHover'

import BusinessImage from '../img/ico_business.svg'
import DevelopersImage from '../img/ico_developers.svg'
import IndividualImage from '../img/ico_individuals.svg'
import { BoxProps } from '../utils/interfaces'

export const boxes: BoxProps[] = [
  {
    index: 0,
    imgSrc: IndividualImage,
    id: 'individuals',
    titleDefaultMessage: (
      <FormattedMessage
        id={`box.individuals.title`}
        defaultMessage={`Individuals`}
        description={`box.individuals.title`}
      />
    ),

    titleDescription: 'individuals',
    subtitleDefaultMessage: (
      <FormattedMessage
        id={`box.individuals.subtext`}
        defaultMessage={`Learn More`}
        description={`box.individuals.subtext`}
      />
    ),
    subtitleDescription: 'learn more',
    link: '/individuals'
  },
  {
    index: 0,
    imgSrc: BusinessImage,
    id: 'businesses',
    titleDefaultMessage: (
      <FormattedMessage
        id={`box.business.title`}
        defaultMessage={`Businesses`}
        description={`box.business.title`}
      />
    ),

    titleDescription: 'businesses',
    subtitleDefaultMessage: (
      <FormattedMessage
        id={`box.business.subtext`}
        defaultMessage={`Learn More`}
        description={`box.business.subtext`}
      />
    ),
    subtitleDescription: 'learn more',
    link: '/businesses'
  },
  {
    index: 0,
    imgSrc: DevelopersImage,
    id: 'developers',
    titleDefaultMessage: (
      <FormattedMessage
        id={`box.devs.title`}
        defaultMessage={`Developers`}
        description={`box.devs.title`}
      />
    ),

    titleDescription: 'developers',
    subtitleDefaultMessage: (
      <FormattedMessage
        id={`box.devs.subtext`}
        defaultMessage={`Learn More`}
        description={`box.business.subtext`}
      />
    ),

    subtitleDescription: 'learn more',
    link: '/developers'
  }
]
