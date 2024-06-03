export const tabs = [
  'SM Holding',
  'SM Top Buys',
  'SM Top Sells',
  'SM New Listing Buys',
  'Unusual Buying',
  'Top CEX Withdraw',
  'Top CEX Deposit',
  'Unusual CEX'
] as const

export type ActiveTab = (typeof tabs)[number]
