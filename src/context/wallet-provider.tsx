import React from 'react'

// Ethers
import { BigNumber } from '@ethersproject/bignumber'
import { Web3Provider, JsonRpcProvider } from '@ethersproject/providers'

// UseDapp
import {
  useEtherBalance,
  useEthers,
  useLookupAddress,
  Web3Ethers,
  active
} from '@usedapp/core'

type IWalletProviderContext = {
  activateBrowserWallet: () => void
  account?: string | null
  ens?: string | null
  etherBalance: BigNumber | 0
  library: Web3Provider | JsonRpcProvider
  active: boolean
}

const WalletContext = React.createContext(
  null as unknown as IWalletProviderContext
)

export const WalletProvider = ({ children }: any) => {
  const { account, activateBrowserWallet, library, active } = useEthers()
  const ens = useLookupAddress()
  const etherBalance = useEtherBalance(account) || 0

  return (
    <WalletContext.Provider
      value={{
        account,
        activateBrowserWallet,
        ens,
        etherBalance,
        library,
        active
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => {
  return React.useContext(WalletContext)
}
