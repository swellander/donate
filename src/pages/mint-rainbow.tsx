import { useState, useEffect, useMemo, useCallback } from 'react'
import type { NextPage } from 'next'
import { Heading, Flex, Text, Box } from '@chakra-ui/layout'
import { Button, Image, VStack, useToast } from '@chakra-ui/react'

import { utils } from 'ethers'
import { TranslatedParagraph } from '../components/TranslatedParagraph'
import { NFTPreview } from '../components/Mint'
import { ButtonConnect } from '../components/ConnectWallet/ButtonConnect'
import {
  useAccount,
  useConnect,
  useContractRead,
  useContractWrite,
  useNetwork
} from 'wagmi'
import Erc721Abi from '../services/abis/Erc721Abi.json'

const translations = require('../../public/locales/mint.json')

// Mainnet
const tokenAddress = '0x5E96d69257b025d097863F3d69E9DcADb9a9810c'
const networkChainId = 1

// Rinkeby
// const tokenAddress = '0xFdfFB8f724322dAdb0FeC710c081E7fc3537DBAf'
// const networkChainId = 4

const contractConfig = {
  addressOrName: tokenAddress,
  contractInterface: Erc721Abi
}

const MintPage: NextPage = () => {
  const toast = useToast()

  // Contract States
  const [{ data: networkData }] = useNetwork()
  const [{ data: connection }] = useConnect()
  const [{ data: account }] = useAccount()

  const isConnected = connection?.connected && account?.address

  const [totalSupply, setTotalSupply] = useState(0)
  const [maxSupply, setMaxSupply] = useState(5000)

  // Contract i/o
  const [{ data: dataIsSaleActive, loading: loadingIsSaleActive }] =
    useContractRead(contractConfig, 'isSaleActive')

  const [{ data: dataTotalMinted, loading: loadingTotalMinted }] =
    useContractRead(contractConfig, 'totalSupply')

  const [{ data: dataMaximumSupply, loading: loadingMaximumSupply }] =
    useContractRead(contractConfig, 'MAX_SUPPLY')

  const [{ data: mintData, error: mintError, loading: mintLoading }, mint] =
    useContractWrite(contractConfig, 'mint')

  // Mint error
  useEffect(() => {
    mintError &&
      toast({
        title: 'Uh oh.',
        description: mintError,
        status: 'error',
        isClosable: true,
        position: 'bottom-right'
      })
  }, [mintError, toast])

  const doMint = useCallback(async () => {
    await mint({
      args: [1],
      overrides: {
        gasLimit: '1000000',
        value: utils.parseEther(`0.05`)
      }
    })
  }, [mint])

  const isSoldOut = useMemo(() => {
    return totalSupply >= maxSupply
  }, [maxSupply, totalSupply])

  const isCorrectChainId = useMemo(() => {
    return networkData?.chain?.id === networkChainId
  }, [networkData?.chain?.id])

  return (
    <Flex direction="row" width="100%" height="100%" pb={10}>
      <div className="mx-auto p-3 sm:p-8">
        <div className="grid sm:gap-8 sm:grid-cols-12">
          <div className="sm:col-span-5 pb-8">
            <NFTPreview />
          </div>

          <div className="sm:col-start-7 sm:col-span-5">
            <div className="flex flex-col items-center sm:items-start gap-6">
              <Heading fontSize={48} lineHeight={1.33}>
                Bubki NFTs
              </Heading>

              <TranslatedParagraph
                translations={translations}
                paragraphs={['p1', 'p2']}
              />

              <VStack spacing={5} align="stretch">
                <ButtonConnect />

                {isConnected && (
                  <>
                    <Button
                      onClick={doMint}
                      disabled={!isCorrectChainId || isSoldOut || mintLoading}
                      fontSize="24px"
                      py="27px"
                      px="24px"
                      colorScheme="yellow"
                      style={{
                        boxShadow: '0 0 0 8px rgba(255, 213, 0, 0.2)',
                        borderRadius: '12px'
                      }}
                    >
                      {mintLoading ? 'Minting' : 'Mint 1'}
                    </Button>
                    <Text>{!isCorrectChainId && 'Switch to Mainnet'}</Text>
                  </>
                )}
              </VStack>
            </div>
          </div>
        </div>
      </div>
    </Flex>
  )
}

export default MintPage
