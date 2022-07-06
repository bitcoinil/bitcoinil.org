# Getting Started Developming BitCoin Il

# Fork Repo

Create a fork of this repo in your own GitHub

# Add BASE_URL Secret to Your Fork

In the GitHub of your repo set a secret for the actions:

(In GitHub)
- Settings
- Secrets
- Actions
- New Repository Secret
- Name: `BASE_URL`
- Value: `/bitcoinil.org/`    

# Install Dependencies

In root folder:

`yarn`

# Start Server

## Using VS Code

`yarn codebitcoin` - Will start server and open VS 

## Not Using VS Code

`code . && yarn dev --filter=bitcoin-il --filter=app-layout --filter=@djitsu/themes`

## Open Site

Open `localhost:3030` in browser

# Deploy to GitHub Pages

In your forked repo go to `settings` and then `pages`

Set your source as `Branch: Static` - `Folder - (root)` 

Push your changes to GitHub 

- A GitHub actions script will automatically deploy your repo to `https://${your-user-name}.github.io/bitcoinil.org`

# Translations

All text on BitCoin.il needs to be translatable.

In order to facilitate this, we wrap all text in a `Formatted Message` component

## Formatted Message

Here is an example:

```
import { FormattedMessage } from 'react-intl'


 <FormattedMessage
          id={`mainMenuItem.buy.body-message`}
          defaultMessage={`The above widget is provided by a third party provider.
          `}
          description={`buy.body-message`}
        />
```

## Code Snippet for Fast Formatted Message Coding

There is also a project-wide snipped which will allow to create a new `FormattedMessage` via typing `nfm` and hitting enter

## Generating the translation dictionaries

Once a `Formatted Message` is added to the codebase, it needs to be extracted so that the translations can be written

Extract these translations using:

`yarn extract-intl`


