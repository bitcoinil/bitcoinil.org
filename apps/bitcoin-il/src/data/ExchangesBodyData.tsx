import * as React from 'react'
import ReactCountryFlag from 'react-country-flag'
import { FormattedMessage } from '../components/FormattedMessageWithHover'
import { useIntl } from 'react-intl'

import { ExchangeLocation, tableOfContentItem } from '../utils/interfaces'

export const exhchanges: tableOfContentItem[] = [
  {
    categoryHeading: (
      <FormattedMessage
        id={`exchanges.p2p`}
        defaultMessage={`Peer-to-Peer (P2P)`}
        description={`p2p`}
      />
    ),
    hasSubheadings: false,
    isSubmenuItem: false,
    isSubmenuParent: true,
    parentMenuKey: null,
    bodyWithoutSubheadings: [
      {
        body: () => {
          const intl = useIntl()

          return (
            <div style={{ color: 'red' }}>
              {[
                'btcil-exchange.p2p.telegram',
                'btcil-exchange.p2p.cantina',
                'btcil-exchange.p2p.btcil'
              ].map((id, i) => {
                return (
                  <div className="p2p-exchange-list-item">
                    <a
                      href={intl.formatMessage({
                        id: `${id}.url`,
                        defaultMessage: 'https://some.url.com/'
                      })}
                    >
                      <FormattedMessage
                        id={`${id}.label`}
                        defaultMessage={`${id}.label`}
                        description={`${id}.label`}
                      />
                    </a>
                  </div>
                )
              })}
            </div>
          )
        }
      }
    ],
    key: 'p2p'
  },
  // {
  //   categoryHeading: (
  //     <FormattedMessage
  //       id={`exchanges.international`}
  //       defaultMessage={`International`}
  //       description={`international`}
  //     />
  //   ),
  //   hasSubheadings: false,
  //   isSubmenuItem: false,
  //   isSubmenuParent: true,
  //   parentMenuKey: null,
  //   bodyWithoutSubheadings: [
  //     {
  //       body: (
  //         <div style={{ color: 'red' }}>
  //           {' '}
  //           To Do: Add International Exchanges
  //         </div>
  //       )
  //     }
  //   ],
  //   key: 'international'
  // },
  {
    categoryHeading: (
      <FormattedMessage
        id={`exchanges.asia`}
        defaultMessage={`Asia`}
        description={`asia`}
      />
    ),
    hasSubheadings: true,
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
        hasSubheadings: false
      }
    ],
    key: 'asia-exchanges'
  }
  // {
  //   categoryHeading: (
  //     <FormattedMessage
  //       id={`exchanges.europe`}
  //       defaultMessage={`Europe`}
  //       description={`Europe`}
  //     />
  //   ),
  //   hasSubheadings: true,
  //   isSubmenuItem: false,
  //   isSubmenuParent: true,
  //   parentMenuKey: null,
  //   subHeadings: [
  //     {
  //       subHeadingTitle: (
  //         <FormattedMessage
  //           id={`exchanges.asia.czech`}
  //           defaultMessage={`🇨🇿 Czech Replublic `}
  //           description={`asia.czech`}
  //         />
  //       ),
  //       subHeadingBody: (
  //         <>
  //           <p>TO DO: ADD czech EXCHANGES</p>
  //         </>
  //       ),
  //       key: 'czech',
  //       hasSubheadings: false
  //     },
  //     {
  //       subHeadingTitle: (
  //         <FormattedMessage
  //           id={`exchanges.asia.france`}
  //           defaultMessage={`🇫🇷 France `}
  //           description={`asia.france`}
  //         />
  //       ),
  //       subHeadingBody: (
  //         <>
  //           <p>TO DO: ADD france EXCHANGES</p>
  //         </>
  //       ),
  //       key: 'france',
  //       hasSubheadings: false
  //     }
  //   ],
  //   key: 'europe-exchanges'
  // }
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
