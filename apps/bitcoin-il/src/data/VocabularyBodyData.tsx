import * as React from 'react'
import { FormattedMessage } from '../components/FormattedMessageWithHover'

import { tableOfContentItem, VocabularyTerm } from '../utils/interfaces'

export const terms: tableOfContentItem[] = [
  {
    categoryHeading: (
      <FormattedMessage
        id={'vocabulary.Address.word'}
        defaultMessage={'Address'}
      />
    ),
    bodyWithoutSubheadings: [
      {
        body: (
          <FormattedMessage
            id={'vocabulary.Address.definition'}
            defaultMessage={
              'A Bitcoin address is similar to a physical address or an email. It is the only information you need to provide for someone to pay you with Bitcoin. An important difference, however, is that each address should only be used for a single transaction.'
            }
          />
        )
      }
    ],
    key: 'address',
    hasSubheadings: false
  },
  {
    key: 'bit',
    hasSubheadings: false,
    categoryHeading: (
      <FormattedMessage id={'vocabulary.Bit.word'} defaultMessage={'Bit'} />
    ),
    bodyWithoutSubheadings: [
      {
        body: (
          <FormattedMessage
            id={'vocabulary.Bit.definition'}
            defaultMessage={
              'Bit is a common unit used to designate a sub-unit of a bitcoin - 1,000,000 bits is equal to 1 bitcoin (BTC). This unit is usually more convenient for pricing tips, goods and services.'
            }
          />
        )
      }
    ]
  },
  {
    categoryHeading: (
      <FormattedMessage
        id={'vocabulary.Bitcoin.word'}
        defaultMessage={'Bitcoin'}
      />
    ),
    bodyWithoutSubheadings: [
      {
        body: (
          <FormattedMessage
            id={'vocabulary.Bitcoin.definition'}
            defaultMessage={`Bitcoin - with capitalization, is used when describing the concept of Bitcoin, or the entire network itself. e.g. "I was learning about the Bitcoin protocol today."
            bitcoin - without capitalization, is used to describe bitcoins as a unit of account. e.g. "I sent ten bitcoins today."; it is also often abbreviated BTC or XBT.`}
          />
        )
      }
    ],
    key: 'bitcoin',
    hasSubheadings: false
  },
  {
    categoryHeading: (
      <FormattedMessage
        id={'vocabulary.BlockChain.word'}
        defaultMessage={'Block Chain'}
      />
    ),
    bodyWithoutSubheadings: [
      {
        body: (
          <FormattedMessage
            id={'vocabulary.BlockChain.definition'}
            defaultMessage={
              'The block chain is a public record of Bitcoin transactions in chronological order. The block chain is shared between all Bitcoin users. It is used to verify the permanence of Bitcoin transactions and to prevent double spending.'
            }
          />
        )
      }
    ],
    key: 'block-chain',
    hasSubheadings: false
  },
  {
    categoryHeading: (
      <FormattedMessage id={'vocabulary.Block.word'} defaultMessage={'Block'} />
    ),
    bodyWithoutSubheadings: [
      {
        body: (
          <FormattedMessage
            id={'vocabulary.Block.definition'}
            defaultMessage={
              'A block is a record in the block chain that contains and confirms many waiting transactions. Roughly every 10 minutes, on average, a new block including transactions is appended to the block chain through mining.'
            }
          />
        )
      }
    ],
    key: 'block',
    hasSubheadings: false
  },
  {
    categoryHeading: (
      <FormattedMessage id={'vocabulary.BTC.word'} defaultMessage={'BTC'} />
    ),
    bodyWithoutSubheadings: [
      {
        body: (
          <FormattedMessage
            id={'vocabulary.BTC.definition'}
            defaultMessage={
              'BTC is a common unit used to designate one bitcoin.'
            }
          />
        )
      }
    ],
    key: 'btc',
    hasSubheadings: false
  },
  {
    categoryHeading: (
      <FormattedMessage
        id={'vocabulary.Confirmation.word'}
        defaultMessage={'Confirmation'}
      />
    ),
    bodyWithoutSubheadings: [
      {
        body: (
          <FormattedMessage
            id={'vocabulary.Confirmation.definition'}
            defaultMessage={
              'Confirmation means that a transaction has been processed by the network and is highly unlikely to be reversed. Transactions receive a confirmation when they are included in a block and for each subsequent block. Even a single confirmation can be considered secure for low value transactions, although for larger amounts like $1000 USD, it makes sense to wait for 6 confirmations or more. Each confirmation exponentially decreases the risk of a reversed transaction.'
            }
          />
        )
      }
    ],
    key: 'confirmation',
    hasSubheadings: false
  },
  {
    categoryHeading: (
      <FormattedMessage
        id={'vocabulary.Cryptography.word'}
        defaultMessage={'Cryptography'}
      />
    ),
    bodyWithoutSubheadings: [
      {
        body: (
          <FormattedMessage
            id={'vocabulary.Cryptography.definition'}
            defaultMessage={`Cryptography is the branch of mathematics that lets us create mathematical proofs that provide high levels of security. Online commerce and banking already uses cryptography. In the case of Bitcoin, cryptography is used to make it impossible for anybody to spend funds from another user's wallet or to corrupt the block chain. It can also be used to encrypt a wallet, so that it cannot be used without a password.`}
          />
        )
      }
    ],
    key: 'cryptography',
    hasSubheadings: false
  },
  {
    categoryHeading: (
      <FormattedMessage
        id={'vocabulary.DoubleSpend.word'}
        defaultMessage={'Double Spend'}
      />
    ),
    bodyWithoutSubheadings: [
      {
        body: (
          <FormattedMessage
            id={'vocabulary.DoubleSpend.definition'}
            defaultMessage={
              'If a malicious user tries to spend their bitcoins to two different recipients at the same time, this is double spending. Bitcoin mining and the block chain are there to create a consensus on the network about which of the two transactions will confirm and be considered valid.'
            }
          />
        )
      }
    ],
    key: 'double-spend',
    hasSubheadings: false
  },
  {
    categoryHeading: (
      <FormattedMessage
        id={'vocabulary.HashRate.word'}
        defaultMessage={'Hash Rate'}
      />
    ),
    bodyWithoutSubheadings: [
      {
        body: (
          <FormattedMessage
            id={'vocabulary.HashRate.definition'}
            defaultMessage={
              'The hash rate is the measuring unit of the processing power of the Bitcoin network. The Bitcoin network must make intensive mathematical operations for security purposes. When the network reached a hash rate of 10 Th/s, it meant it could make 10 trillion calculations per second.'
            }
          />
        )
      }
    ],
    key: 'hash-rate',
    hasSubheadings: false
  },
  {
    categoryHeading: (
      <FormattedMessage
        id={'vocabulary.Mining.word'}
        defaultMessage={'Mining'}
      />
    ),
    bodyWithoutSubheadings: [
      {
        body: (
          <FormattedMessage
            id={'vocabulary.Mining.definition'}
            defaultMessage={
              'Bitcoin mining is the process of making computer hardware do mathematical calculations for the Bitcoin network to confirm transactions and increase security. As a reward for their services, Bitcoin miners can collect transaction fees for the transactions they confirm, along with newly created bitcoins. Mining is a specialized and competitive market where the rewards are divided up according to how much calculation is done. Not all Bitcoin users do Bitcoin mining, and it is not an easy way to make money.'
            }
          />
        )
      }
    ],
    key: 'mining',
    hasSubheadings: false
  },
  {
    categoryHeading: (
      <FormattedMessage id={'vocabulary.P2P.word'} defaultMessage={'P2P'} />
    ),
    bodyWithoutSubheadings: [
      {
        body: (
          <FormattedMessage
            id={'vocabulary.P2P.definition'}
            defaultMessage={
              'Peer-to-peer refers to systems that work like an organized collective by allowing each individual to interact directly with the others. In the case of Bitcoin, the network is built in such a way that each user is broadcasting the transactions of other users. And, crucially, no bank is required as a third party.'
            }
          />
        )
      }
    ],
    key: 'p2p',
    hasSubheadings: false
  },
  {
    categoryHeading: (
      <FormattedMessage
        id={'vocabulary.PrivateKey.word'}
        defaultMessage={'Private Key'}
      />
    ),
    bodyWithoutSubheadings: [
      {
        body: (
          <FormattedMessage
            id={'vocabulary.PrivateKey.definition'}
            defaultMessage={
              'A private key is a secret piece of data that proves your right to spend bitcoins from a specific wallet through a cryptographic signature. Your private key(s) are stored in your computer if you use a software wallet; they are stored on some remote servers if you use a web wallet. Private keys must never be revealed as they allow you to spend bitcoins for their respective Bitcoin wallet.'
            }
          />
        )
      }
    ],
    key: 'private-key',
    hasSubheadings: false
  },
  {
    categoryHeading: (
      <FormattedMessage
        id={'vocabulary.Signature.word'}
        defaultMessage={'Signature'}
      />
    ),
    bodyWithoutSubheadings: [
      {
        body: (
          <FormattedMessage
            id={'vocabulary.Signature.definition'}
            defaultMessage={
              'A cryptographic signature is a mathematical mechanism that allows someone to prove ownership. In the case of Bitcoin, a Bitcoin wallet and its private key(s) are linked by some mathematical magic. When your Bitcoin software signs a transaction with the appropriate private key, the whole network can see that the signature matches the bitcoins being spent. However, there is no way for the world to guess your private key to steal your hard-earned bitcoins.'
            }
          />
        )
      }
    ],
    key: 'signature',
    hasSubheadings: false
  },
  {
    categoryHeading: (
      <FormattedMessage
        id={'vocabulary.Wallet.word'}
        defaultMessage={'Wallet'}
      />
    ),
    bodyWithoutSubheadings: [
      {
        body: (
          <FormattedMessage
            id={'vocabulary.Wallet.definition'}
            defaultMessage={
              'A Bitcoin wallet is loosely the equivalent of a physical wallet on the Bitcoin network. The wallet actually contains your private key(s) which allow you to spend the bitcoins allocated to it in the block chain. Each Bitcoin wallet can show you the total balance of all bitcoins it controls and lets you pay a specific amount to a specific person, just like a real wallet. This is different to credit cards where you are charged by the merchant.'
            }
          />
        )
      }
    ],
    key: 'wallet',
    hasSubheadings: false
  }
]
