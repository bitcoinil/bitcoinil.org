import * as React from 'react'
import { FormattedMessage } from '../components/FormattedMessageWithHover'

import chat from '../img/ico_chat.svg'
import develop from '../img/ico_develop.svg'
import docs from '../img/ico_docs.svg'
import donate from '../img/ico_donate.svg'
import law from '../img/ico_law.svg'
import mining from '../img/ico_mining.svg'
import network from '../img/ico_network.svg'
import spread from '../img/ico_spread.svg'
import translate from '../img/ico_translate.svg'
import using from '../img/ico_using.svg'
import { BodyCard } from '../utils/interfaces'

export const supportCards: BodyCard[] = [
  {
    img: using,
    title: (
      <FormattedMessage
        id={`support.using`}
        defaultMessage={`Using BitCoin Il`}
        description={`id`}
      />
    ),
    text: (
      <FormattedMessage
        id={`support.using.body`}
        defaultMessage={`Using Bitcoin is the first thing you can do to support Bitcoin. There are probably many cases where it can make your life easier. You can accept payments and make purchases with Bitcoin.`}
        description={`id`}
      />
    ),
    id: `using`
  },
  {
    img: network,
    title: (
      <FormattedMessage
        id={`support.network`}
        defaultMessage={'Be the network'}
        description={`network`}
      />
    ),
    text: (
      <FormattedMessage
        id={`support.network.body`}
        defaultMessage={`If you have a good Internet connection, you can strengthen the Bitcoin network by keeping full node software running on your computer or server with port 8333 open. Full nodes are securing and relaying all transactions.`}
        description={`network.body`}
      />
    ),
    id: `network`
  },
  {
    img: mining,
    title: (
      <FormattedMessage
        id={`support.mining`}
        defaultMessage={`Mining`}
        description={`mining`}
      />
    ),
    text: (
      <FormattedMessage
        id={`support.mining.body`}
        defaultMessage={`You can start mining bitcoins to help processing transactions. In order to protect the network, you should join smaller mining pools and prefer decentralized pools like P2Pool or pools with getblocktemplate (GBT) support.`}
        description={`mining.body`}
      />
    ),
    id: 'network'
  },
  {
    img: translate,
    title: (
      <FormattedMessage
        id={`support.translate`}
        defaultMessage={`Translate`}
        description={`translate`}
      />
    ),
    text: (
      <FormattedMessage
        id={`support.translate.body`}
        defaultMessage={`You can help spread Bitcoin awareness by translating or improving translations inside important parts of the Bitcoin ecosystem. Just pick a project you would like to help with.
  
      Bitcoin Core - Bitcoin.org - Bitcoin Wiki - Bitcoin Wallet (Android) - Electrum`}
        description={`translate.body`}
      />
    ),
    id: `translate`
  },
  {
    img: develop,
    title: (
      <FormattedMessage
        id={`support.develop`}
        defaultMessage={`Develop`}
        description={`id`}
      />
    ),
    text: (
      <FormattedMessage
        id={`support.develop.body`}
        defaultMessage={`Bitcoin is free software. If you are a developer, you can use your superpowers to do good and improve Bitcoin. Or you can build amazing new services or software that use Bitcoin.`}
        description={`develop.body`}
      />
    ),
    id: `develop`
  },
  {
    img: donate,
    title: (
      <FormattedMessage
        id={`support.donations`}
        defaultMessage={`Donation`}
        description={`donations`}
      />
    ),
    text: (
      <FormattedMessage
        id={`support.donate.body`}
        defaultMessage={`The easiest way to help is to donate some bitcoin to BitGive. Or you can help directly fund any project related to Bitcoin that you believe will be helpful in the future.`}
        description={`donate.body`}
      />
    ),
    id: `donate`
  },
  {
    img: law,
    title: (
      <FormattedMessage
        id={`support.organizations`}
        defaultMessage={'Organizations'}
        description={`organizations`}
      />
    ),
    text: (
      <FormattedMessage
        id={`support.organizations.body`}
        defaultMessage={`Many non-profit organizations are dedicated to protecting and promoting Bitcoin. You can help these groups by joining them and taking part in their projects, discussions and events.`}
        description={`organizations.body`}
      />
    ),
    id: `law`
  },
  {
    img: spread,
    title: (
      <FormattedMessage
        id={`support.spread`}
        defaultMessage={'Spread'}
        description={`spread`}
      />
    ),
    text: (
      <FormattedMessage
        id={`support.spread.body`}
        defaultMessage={`Speak about Bitcoin to interested people. Write about it on your blog. Tell your favorite shops you would like to pay with Bitcoin. Help to keep merchant directories up to date. Or be creative and make yourself a nice Bitcoin T-shirt.`}
        description={`spread.body`}
      />
    ),
    id: `spread`
  },
  {
    img: docs,
    title: (
      <FormattedMessage
        id={`support.docs`}
        defaultMessage={'Documentation'}
        description={`docs`}
      />
    ),
    text: (
      <FormattedMessage
        id={`support.docs.body`}
        defaultMessage={`Bitcoin.org and the Bitcoin wiki provide useful documentation and we are constantly improving the information they contain. You can help to improve these resources and keep them up to date.`}
        description={`docs.body`}
      />
    ),
    id: `docs`
  },
  {
    img: chat,
    title: (
      <FormattedMessage
        id={`support.chat`}
        defaultMessage={'Meet the communities'}
        description={`chat`}
      />
    ),
    text: (
      <FormattedMessage
        id={`support.chat.body`}
        defaultMessage={`You can join Bitcoin communities and talk with other Bitcoin enthusiasts. You can learn more about Bitcoin every day, give help to new users and get involved in interesting projects.`}
        description={`chat.body`}
      />
    ),
    id: `chat`
  }
]
