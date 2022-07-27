import * as React from 'react'
import ReactCountryFlag from 'react-country-flag'
import { FormattedMessage } from '../components/FormattedMessageWithHover'

import { ExchangeLocation, tableOfContentItem } from '../utils/interfaces'

export const exhchanges: tableOfContentItem[] = [
  {
    categoryHeading: (
      <FormattedMessage
        id={`exchanges.international`}
        defaultMessage={`International`}
        description={`international`}
      />
    ),
    hasSubHeadings: false,
    isSubmenuItem: false,
    isSubmenuParent: true,
    parentMenuKey: null,
    bodyWithoutSubheadings: [
      {
        body: (
          <div style={{ color: 'red' }}>
            {' '}
            To Do: Add International Exchanges
          </div>
        )
      }
    ],
    key: 'international'
  },
  {
    categoryHeading: (
      <FormattedMessage
        id={`exchanges.asia`}
        defaultMessage={`Asia`}
        description={`asia`}
      />
    ),
    hasSubHeadings: true,
    isSubmenuItem: false,
    isSubmenuParent: true,
    parentMenuKey: null,
    subHeadings: [
      {
        subHeadingTitle: (
          <FormattedMessage
            id={`exchanges.asia.vietnam`}
            defaultMessage={`🇻🇳 Vietnam `}
            description={`asia.vietnam`}
          />
        ),
        subHeadingBody: (
          <>
            <p>TO DO: ADD VIETNAME EXCHANGES</p>
          </>
        ),
        key: 'vietnam',
        hasSubHeadings: false
      }
    ],
    key: 'asia-exchanges'
  },
  {
    categoryHeading: (
      <FormattedMessage
        id={`exchanges.europe`}
        defaultMessage={`Europe`}
        description={`Europe`}
      />
    ),
    hasSubHeadings: true,
    isSubmenuItem: false,
    isSubmenuParent: true,
    parentMenuKey: null,
    subHeadings: [
      {
        subHeadingTitle: (
          <FormattedMessage
            id={`exchanges.asia.czech`}
            defaultMessage={`🇨🇿 Czech Replublic `}
            description={`asia.czech`}
          />
        ),
        subHeadingBody: (
          <>
            <p>TO DO: ADD czech EXCHANGES</p>
          </>
        ),
        key: 'czech',
        hasSubHeadings: false
      },
      {
        subHeadingTitle: (
          <FormattedMessage
            id={`exchanges.asia.france`}
            defaultMessage={`🇫🇷 France `}
            description={`asia.france`}
          />
        ),
        subHeadingBody: (
          <>
            <p>TO DO: ADD france EXCHANGES</p>
          </>
        ),
        key: 'france',
        hasSubHeadings: false
      }
    ],
    key: 'europe-exchanges'
  }
]

export const renderCitiesList = (ex: ExchangeLocation) => {
  return ex?.cities?.map((city, i) => {
    return (
      <div key={`city-${i}`}>
        <span className="city-label">
          {city.countryCode ? (
            <ReactCountryFlag
              className="country-flag"
              countryCode={city.countryCode}
            />
          ) : null}
          {city.city}
        </span>
        <ul>
          {city.exchanges.map((exc, ii) => {
            return (
              <span key={`city-exchange-${ii}`}>
                <a href={exc.link}>
                  <h4>{exc.name}</h4>
                </a>
              </span>
            )
          })}
        </ul>
      </div>
    )
  })
}
