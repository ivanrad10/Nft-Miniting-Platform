import { createPublicClient, http } from 'viem'
import { sepolia, mainnet } from 'viem/chains'

export const client = createPublicClient({
  chain: sepolia,
  transport: http('https://eth-sepolia.g.alchemy.com/v2/lDuX-RjQIcUK9oTCL6uolR5-_jmI5Azf')
})