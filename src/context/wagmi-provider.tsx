import * as React from 'react'
import { defaultChains, WagmiProvider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const infuraId = process.env['INFURA_ID'] || '24aa4245f7744be4855c02c48c9a6993'

const chains = defaultChains

const connectors = () => {
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true }
    }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true
      }
    })
  ]
}

export const WagmiWalletProvider: React.FC = ({ children }) => (
  <WagmiProvider autoConnect connectors={connectors}>
    {children}
  </WagmiProvider>
)
