import { useState, useEffect } from 'react'
import { useEthers } from '@usedapp/core'
import { acceptedChainIds } from '../utils/poolTogether'

export default () => {
  const [isAcceptedNetwork, setIsAcceptedNetwork] = useState(false)
  const { chainId } = useEthers()

  useEffect(() => {
    const isAccepted = chainId ? acceptedChainIds.includes(chainId) : false
    setIsAcceptedNetwork(isAccepted)
  }, [chainId])

  return isAcceptedNetwork
}
