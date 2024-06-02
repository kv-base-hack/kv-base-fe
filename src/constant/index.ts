import { DEFAULT_EXPLORER, FormProps } from '@/types/jup'

export const JUPITER_DEFAULT_RPC =
  process.env.NEXT_PUBLIC_JUPITER_DEFAULT_RPC ||
  'https://solana-mainnet.g.alchemy.com/v2/NOV80zydGpa5nhFvoEwILiLcWeEcEQ1S'
export const DEFAULT_SLIPPAGE = 0.5

export interface IFormConfigurator {
  simulateWalletPassthrough: boolean
  strictTokenList: boolean
  defaultExplorer: DEFAULT_EXPLORER
  formProps: FormProps
  useUserSlippage: boolean
}
