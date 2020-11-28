# Fireblocks DeFi SDK - Uniswap Example

This example demonstrates interaction with UniSwap using Fireblocks DeFi SDK and [Uniswap SDK V2](https://uniswap.org/docs/v2/javascript-SDK/quick-start).

## Usage
1) Run ```npm install``` once.

2) Set the following environment variables:
* `FIREBLOCKS_API_SECRET_PATH` - The path of your Fireblocks API secret, aka Fireblocks API Private Key.
* `FIREBLOCKS_API_KEY` -  Your Fireblocks API key.
* `FIREBLOCKS_EXTERNAL_WALLET` -  The ID of the Fireblocks External Wallet which will be tagged as the destination of the transactions.
* `FIREBLOCKS_SOURCE_VAULT_ACCOUNT` -  (Optional) The ID of Fireblocks Vault Account which will be used as the source of the transactions. Defaults to Vault Account 0.
* `ETH_CHAIN` -  (Optional) The Ethereum chain to connect to. The options are MAINNET and ROPSTEN. Defaults to ROPSTEN.

3) run ```npm start``` to run the example script.

In Linux and MacOS environments you should be able to run step 2 and 3 together under the same command line. e.g.:
`FIREBLOCKS_EXTERNAL_WALLET=22222222-4444-6666-8888-999999999999 FIREBLOCKS_API_SECRET_PATH=api-client-key.pem FIREBLOCKS_API_KEY=11111111-2222-3333-4444-555555555555 npm start`