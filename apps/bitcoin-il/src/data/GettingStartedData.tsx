import * as React from 'react'

import { FormattedMessage } from '../components/FormattedMessageWithHover'
import TimelineItem from '../components/TimelineItem'

export const howToAcceptTimelineItems: JSX.Element[] = [
  <TimelineItem
    title={
      <FormattedMessage
        id={`howToAccept.inform`}
        defaultMessage={`Inform yourself`}
        description={`inform`}
      />
    }
    body={
      <FormattedMessage
        id={`howToAccept.inform.body`}
        defaultMessage={`Bitcoin does not require merchants to change their habits. However, Bitcoin is different than what you know and use every day. Before you start using Bitcoin, there are a few things that you need to know in order to use it securely and avoid common pitfalls.`}
        description={`habits`}
      />
    }
    buttonText={
      <FormattedMessage
        id={`howToAccept.button.readmore`}
        defaultMessage={`Read more`}
        description={`button.readmore`}
      />
    }
    buttonOnClick={() => {
      console.log('to do')
    }}
  />,
  <TimelineItem
    title={
      <FormattedMessage
        id={`howToAccept.processing`}
        defaultMessage={`Processing payments`}
        description={`processing`}
      />
    }
    body={
      <FormattedMessage
        id={`howToAccept.processing.body`}
        defaultMessage={`You can process payments and invoices by yourself or you can use merchant services and deposit money in your local currency or bitcoins. Most point of sales businesses use a tablet or a mobile phone to let customers pay with their mobile phones.`}
        description={`processing.body`}
      />
    }
    buttonText={
      <FormattedMessage
        id={`howToAccept.button.find-sercives`}
        defaultMessage={`Find merchant services`}
        description={`button.find-services`}
      />
    }
    buttonOnClick={() => {
      console.log('to do')
    }}
  />,
  <TimelineItem
    title={
      <FormattedMessage
        id={`howToAccept.taxes`}
        defaultMessage={`Accounting and Taxes`}
        description={`taxes`}
      />
    }
    body={
      <FormattedMessage
        id={`howToAccept.taxes.body`}
        defaultMessage={`"Merchants often deposit and display prices in their local currency. In other cases, Bitcoin works similarly to a foreign currency. To get appropriate guidance regarding tax compliance for your own jurisdiction, you should contact a qualified accountant."`}
        description={`taxes.body`}
      />
    }
    buttonText={
      <FormattedMessage
        id={`howToAccept.button.readmore`}
        defaultMessage={`Read More`}
        description={`button.`}
      />
    }
    buttonOnClick={() => {
      console.log('to do')
    }}
  />,
  <TimelineItem
    title={
      <FormattedMessage
        id={`howToAccept.visibility`}
        defaultMessage={`Gaining Visibility`}
        description={`visibility`}
      />
    }
    body={
      <FormattedMessage
        id={`howToAccept.visibility.body`}
        defaultMessage={`"There is a growing number of users searching for ways to spend their bitcoins. You can submit your business in online directories to help them easily find you. You can also display the Bitcoin logo on your website or your brick and mortar business."`}
        description={`visibility.body`}
      />
    }
    buttonText={
      <FormattedMessage
        id={`howToAccept.button.submit`}
        defaultMessage={`Submit your message`}
        description={`button.`}
      />
    }
    buttonOnClick={() => {
      console.log('to do')
    }}
  />
]

export const howToUseTimelineItems: JSX.Element[] = [
  <TimelineItem
    title={
      <FormattedMessage
        id={`howToAccept.inform`}
        defaultMessage={`Inform yourself`}
        description={`inform`}
      />
    }
    body={
      <FormattedMessage
        id={`howToAccept.inform.body`}
        defaultMessage={`Bitcoin is different than what you know and use every day. Before you start using Bitcoin, there are a few things that you need to know in order to use it securely and avoid common pitfalls.`}
        description={`inform.body`}
      />
    }
    buttonText={
      <FormattedMessage
        id={`howToAccept.button.read-more`}
        defaultMessage={`Read More`}
        description={`button.`}
      />
    }
    buttonOnClick={() => {
      console.log('to do')
    }}
  />,
  <TimelineItem
    title={
      <FormattedMessage
        id={`howToAccept.choose`}
        defaultMessage={`Choose your wallet`}
        description={`choose`}
      />
    }
    body={
      <FormattedMessage
        id={`howToAccept.choose.body`}
        defaultMessage={`Free bitcoin wallets are available for all major operating systems and devices to serve a variety of your needs. For example, you can install an app on your mobile device for everyday use or you can have a wallet only for online payments on your computer. In any case, choosing a wallet is easy and can be done in minutes.`}
        description={`choose.body`}
      />
    }
    buttonText={
      <FormattedMessage
        id={`howToAccept.button.choose`}
        defaultMessage={`Choose your wallet`}
        description={`button.`}
      />
    }
    buttonOnClick={() => {
      console.log('to do')
    }}
  />,
  <TimelineItem
    title={
      <FormattedMessage
        id={`howToAccept.get`}
        defaultMessage={`Get BitCoin Il`}
        description={`get`}
      />
    }
    body={
      <FormattedMessage
        id={`howToAccept.get.body`}
        defaultMessage={`You can get Bitcoin by accepting it as a payment for goods and services. There are also several ways you can buy Bitcoin.`}
        description={`get.body`}
      />
    }
    buttonText={
      <FormattedMessage
        id={`howToAccept.button.buy`}
        defaultMessage={`Buy BitCoin IL`}
        description={`button.`}
      />
    }
    buttonOnClick={() => {
      console.log('to do')
    }}
  />,
  <TimelineItem
    title={
      <FormattedMessage
        id={`howToAccept.spend`}
        defaultMessage={`Spend Bitcoin`}
        description={`spend`}
      />
    }
    body={
      <FormattedMessage
        id={`howToAccept.spend.body`}
        defaultMessage={`There are a growing number of services and merchants accepting Bitcoin all over the world. Use Bitcoin to pay them and rate your experience to help them gain more visibility.`}
        description={`spend.body`}
      />
    }
    buttonText={
      <FormattedMessage
        id={`howToAccept.button.readmore-2`}
        defaultMessage={`Read More`}
        description={`button.`}
      />
    }
    buttonOnClick={() => {
      console.log('to do')
    }}
  />
]
