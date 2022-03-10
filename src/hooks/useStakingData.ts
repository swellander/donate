import { useState, useEffect } from 'react'
import { useEthers } from '@usedapp/core'
import { PrizePool } from '@pooltogether/v4-client-js'
import useAcceptedNetwork from './useAcceptedNetwork'
import {
  prizePoolAddresses,
  multiSigAddresses,
  usdcTokenAddresses
} from '../utils/poolTogether'
import { PrizePoolNetwork } from '../utils/poolTogether'

export default () => {
  const [prizePool, setPrizePool] = useState<PrizePool | undefined>()
  const [multiSigAddress, setMultiSigAddress] = useState<string | undefined>()
  const [usdcTokenAddress, setUsdcTokenAddress] = useState<string | undefined>()
  const { chainId } = useEthers()
  const acceptedNetwork = useAcceptedNetwork()

  useEffect(() => {
    if (acceptedNetwork && chainId) {
      const newPrizePool = PrizePoolNetwork.getPrizePool(
        chainId,
        prizePoolAddresses[chainId]
      )
      setPrizePool(newPrizePool)
      setMultiSigAddress(multiSigAddresses[chainId])
      setUsdcTokenAddress(usdcTokenAddresses[chainId])
    }
  }, [acceptedNetwork, chainId])

  return { prizePool, multiSigAddress, usdcTokenAddress }
}
