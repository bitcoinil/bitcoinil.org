import * as React from 'react'

import TimelineItem from '../components/TimelineItem'

export const howToAcceptTimelineItems: JSX.Element[] = [
  <TimelineItem
    key="0"
    title="Inform yourself"
    body="Bitcoin does not require merchants to change their habits. However, Bitcoin is different than what you know and use every day. Before you start using Bitcoin, there are a few things that you need to know in order to use it securely and avoid common pitfalls."
    buttonText="Read More"
    buttonOnClick={() => {
      console.log('to do')
    }}
  />,
  <TimelineItem
    key="1"
    title="Processing payments"
    body="You can process payments and invoices by yourself or you can use merchant services and deposit money in your local currency or bitcoins. Most point of sales businesses use a tablet or a mobile phone to let customers pay with their mobile phones."
    buttonText="Find merchant services"
    buttonOnClick={() => {
      console.log('to do')
    }}
  />,
  <TimelineItem
    key="2"
    title="Accounting and Taxes"
    body="Merchants often deposit and display prices in their local currency. In other cases, Bitcoin works similarly to a foreign currency. To get appropriate guidance regarding tax compliance for your own jurisdiction, you should contact a qualified accountant."
    buttonText="Read More"
    buttonOnClick={() => {
      console.log('to do')
    }}
  />,
  <TimelineItem
    key="3"
    title="Gaining Visibility"
    body="There is a growing number of users searching for ways to spend their bitcoins. You can submit your business in online directories to help them easily find you. You can also display the Bitcoin logo on your website or your brick and mortar business."
    buttonText="Submit Your Business"
    buttonOnClick={() => {
      console.log('to do')
    }}
  />
]

export const howToUseTimelineItems: JSX.Element[] = [
  <TimelineItem
    key="0"
    title="Inform yourself"
    body="Bitcoin is different than what you know and use every day. Before you start using Bitcoin, there are a few things that you need to know in order to use it securely and avoid common pitfalls."
    buttonText="Read More"
    buttonOnClick={() => {
      console.log('to do')
    }}
  />,
  <TimelineItem
    key="0"
    title="Choose your wallet"
    body="Free bitcoin wallets are available for all major operating systems and devices to serve a variety of your needs. For example, you can install an app on your mobile device for everyday use or you can have a wallet only for online payments on your computer. In any case, choosing a wallet is easy and can be done in minutes."
    buttonText="Choose your wallet"
    buttonOnClick={() => {
      console.log('to do')
    }}
  />,
  <TimelineItem
    key="0"
    title="Get BitCoin Il"
    body="You can get Bitcoin by accepting it as a payment for goods and services. There are also several ways you can buy Bitcoin."
    buttonText="Buy Bitcoin Il"
    buttonOnClick={() => {
      console.log('to do')
    }}
  />,
  <TimelineItem
    key="0"
    title="Spend Bitcoin"
    body="There are a growing number of services and merchants accepting Bitcoin all over the world. Use Bitcoin to pay them and rate your experience to help them gain more visibility."
    buttonText="Read More"
    buttonOnClick={() => {
      console.log('to do')
    }}
  />
]
