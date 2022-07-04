import * as React from 'react'
import { Helmet } from 'react-helmet'

const BASE_URL = import.meta.env.BASE_URL || '/'

const FaviconHandler = () => {
  return (
    <Helmet>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${BASE_URL}apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${BASE_URL}favicon-16x16.png`}
      />
      <link rel="manifest" href={`${BASE_URL}site.webmanifest`} />
      <meta
        name="msapplication-config"
        content={`${BASE_URL}browserconfig.xml`}
      />
      <meta name="msapplication-TileColor" content="#00B3F0" />
      <meta name="theme-color" content="#00B3F0"></meta>
    </Helmet>
  )
}

export default FaviconHandler
