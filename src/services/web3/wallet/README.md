@author Igor Gordilov

# web3 wallet integration
Wallets integration in dApp.

# Add new wallet
1. Create new wallet in ./wallets folder. JS file must include connect function for wallet connection.
2. Add new id in ./ids.js file.
3. Add new provider in WALLET_PROVIDERS (./providers.js)

## wallets (folder)
Here is all wallets files with their providers. Any wallet has connect function. Use this function for connection.

## actions (folder)
wallet autoConnect - ./actions/autoConnect.js (use for autoconnect on page reload)

wallet logout - ./actions/logout.js (user for logout from web3 wallet);

wallet onConnect - ./actions/onConnect.js (use for logic after wallet connect in popup);

## popup (folder)
- Popup state
- Actions for popup: open & close

## ids.js (file)
Here is all ids of wallets

## providers.js (file)
Here is all providers for wallets

## chain.js (file)
Here is active chain data

## useState.js (file)
State manager of wallet

## useWallet.js (file)
Hook for wallet usage (abstract)