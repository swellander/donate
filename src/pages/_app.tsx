import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { DAppProvider } from '@usedapp/core'
import { WalletProvider } from '../context/wallet-provider'
import Particle from '../../src/components/Particle'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={{}}>
      <WalletProvider>
        <ChakraProvider>
          <>
            <Particle />
            <Component {...pageProps} />
          </>
        </ChakraProvider>
      </WalletProvider>
    </DAppProvider>
  )
}

export default MyApp
