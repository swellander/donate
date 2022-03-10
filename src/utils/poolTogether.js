import {
  PrizePoolNetwork as PoolNetwork,
  User
} from '@pooltogether/v4-client-js'
import { testnet, mainnet } from '@pooltogether/v4-pool-data'
import { ethers } from 'ethers'

const DEBUG = true

export const providers = {
  // Mainnet Ethereum
  1: ethers.getDefaultProvider(1),
  // Rinkeby
  4: ethers.getDefaultProvider(
    'https://eth-rinkeby.alchemyapi.io/v2/URMQnJWJ0om6yAOnDGlFMZEQfPJo4VCZ'
  ),
  // Polygon
  137: new ethers.providers.JsonRpcProvider('https://polygon-rpc.com'),
  // Mumbai Testnet
  80001: new ethers.providers.JsonRpcProvider(
    'https://rpc-mumbai.maticvigil.com'
  ),
  // Avalanche
  43114: new ethers.providers.JsonRpcProvider(
    'https://api.avax.network/ext/bc/C/rpc'
  ),
  // Avalanche Fuji Testnet
  43113: new ethers.providers.JsonRpcProvider(
    'https://api.avax-test.network/ext/bc/C/rpc'
  )
}

export const ticketTokenAddress = '0x325E456e8Ac0bCB65a5515FA70B6b9D581809c36'

export const PrizePoolNetwork = new PoolNetwork(providers, mainnet)
// export const PrizePoolNetwork = new PoolNetwork(providers, testnet)

export const usdcTokenAddresses = {
  1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  4: '0xeb8f08a975Ab53E34D8a0330E0D34de942C95926',
  137: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  43113: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
  43114: '0xAF82969ECF299c1f1Bb5e1D12dDAcc9027431160',
  80001: '0xe11A86849d99F524cAC3E7A0Ec1241828e332C62'
}
export const prizePoolAddresses = {
  1: '0xd89a09084555a7D0ABe7B111b1f78DFEdDd638Be',
  137: '0x19DE635fb3678D8B8154E37d8C9Cdf182Fe84E60',
  4: '0xB452d71016Ed5f4FE98707b33C005fE9E17Fba19',
  43113: '0xB7d1A750B2A662a0b331775B4EC21EaB0BdB84B7',
  43114: '0xF830F5Cb2422d555EC34178E27094a816c8F95EC',
  80001: '0xff349E7c5d8815cf058252393D104117e1BADBC1'
}
export const multiSigAddresses = {
  1: '0x10E1439455BD2624878b243819E31CfEE9eb721C',
  137: '0xb37b3b78022E6964fe80030C9161525880274010',
  4: '0xe7Cb0aD22b7326dfc3978D79E83e5e50a8B12E3c',
  43113: '0xe7Cb0aD22b7326dfc3978D79E83e5e50a8B12E3c',
  43114: '0x0a1e264cDeb531657b7Ff65860B70bE6761DC7aa',
  80001: '0xe7Cb0aD22b7326dfc3978D79E83e5e50a8B12E3c'
}

// mainnets
// const acceptedChainIds = [1, 137, 43114];
// testents
export const acceptedChainIds = [4, 80001, 43113, 1, 137, 43114]

console.log({ mainnet, testnet })
