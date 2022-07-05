# Getting Started Developming BitCoin Il

# Fork Repo

Create a fork of this repo in your own GitHub

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

