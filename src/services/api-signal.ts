import { CHAIN } from "@/constant/chain"
import axios from "axios"

const api = axios.create({
  baseURL: 'https://api-signals.kaivest.net',
})

export const tokenDetail = ({tokenAddress}: {tokenAddress: string}) => {
  return api.post('/generate-token-detail', {
    chainName: CHAIN,
    tokenAddress,
  })
}

export const walletDetail = ({walletAddress}: {walletAddress: string}) => {
  return api.post('/generate-wallet-detail', {
    chainName: CHAIN,
    walletAddress,
  })
}

