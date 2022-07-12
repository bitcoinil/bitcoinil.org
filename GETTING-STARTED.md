# Getting Started Developing BitCoin Il

# Fork Repo

Create a fork of this repo in your own GitHub

---

## Add BASE_URL Secret to Your Fork

In order to be able to deploy your fork, you will need to do some setup.

In the GitHub page of your repo set a secret for the actions:

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


## Starting




`yarn dev --filter=bitcoin-il --filter=app-layout --filter=@djitsu/themes`

---
## Using VS Code

`yarn codebitcoin` - Will start server and open VS Code




--- 
## Open Site

Open `localhost:3030` in browser

---
# Deploy to GitHub Pages

In your forked repo go to `settings` and then `pages`

Set your source as `Branch: Static` - `Folder - (root)` 

Push your changes to GitHub 

- A GitHub actions script will automatically deploy your repo to `https://${your-user-name}.github.io/bitcoinil.org`


---
# Translations

All text on BitCoin.il needs to be translatable.

In order to facilitate this, we wrap all text in a `Formatted Message` component

---
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

---
## VS Code Snippet for Fast Formatted Message Coding

There is also a project-wide snipped which will allow to create a new `FormattedMessage` via typing `nfm` and hitting enter


---
## Generating the translation dictionaries

Once a `Formatted Message` is added to the codebase, it needs to be extracted so that the translations can be written

Extract these translations using:

`yarn extract-intl`

---
## Errors caused by duplicate message IDs

please verify that no errors are found when running `yarn extract-intl`

Example echo of an error-free extraction

```
yarn run v1.22.19
$ cd apps/bitcoin-il && yarn extract-intl
$ formatjs extract "src/**/*.{ts,tsx,js,jsx}" --out-file lang.json
Done in 1.29s.

```

---
# Code Formatting



This repo uses TypeScript. Each component requires an `interface` and a `styled component`.

---

## Creating a new component

Here is a basic TSX component which follows the coding rules for BitCoin Il:

```
import * as React from "react"
import { FormattedMessage } from "react-intl"
import styled from "styled-components"

export interface NameProps {}

const Name: React.FC<NameProps> = ({}) => {
  return (
    <StyledName id="Name">
      <h1>Name</h1>
    </StyledName>
  )
}

export default Name

const StyledName = styled.div``
```

Select all instances of `Name` and change it to your component name.

NB: Ideally, you should move the interface from this file to `./src/utils/interfaces.ts`

---

## Vs Code Snippet For Fast Component Creation

In VSCODE: Easily create a `TypeScript` component using the built-in snippet.

Create a new `.tsx` document in the `/src/components/` folder

Type `ntc` in your new file, hit enter, and type your component name, then save the file

- This will generate a file with a `TypeScript` React component, with an `interface` and a `styled component`

---

## General code Formatting Rules

---
### React Hooks:

React hooks should be at the top of the component's code

The order should be 
- `useState`
- `useRecoilState`
- `useRecoilValue`
- Decalarations of external hooks such as: `const location = useLocation()`, 
- Any functions needed by a `useEffect`
- `useEffect`.

---

### Helper functions

Any helper function that occurs outside of the actual TypeScript component must be kept in the `./src/data/ComponentData.tsx

---

### Data

If a component requires hardcoded data, such as an array of data to be displayed in the component, this data should be exported from a file of the same name as your component in the `./src/data` folder.

For example:

I am writing a new component to display pricing options. I have a file in `./src/components/` called `Pricing.tsx` which renders my data, I have a file in `./src/data` called `PricingData.tsx` which exports an array of data to render. That component has an interface called `PricingProps` exported from the file `./src/util/interfaces.ts`





