import { createPublicClient, http, createWalletClient, custom } from 'viem'
import { sepolia } from 'viem/chains'

export const client = createPublicClient({ 
    chain: sepolia,
    transport: http('https://eth-sepolia.g.alchemy.com/v2/lDuX-RjQIcUK9oTCL6uolR5-_jmI5Azf')
})
  
export const walletClient = createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum!)
})