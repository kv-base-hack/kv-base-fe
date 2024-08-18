export const tabs = [
  'SM New Listing Buys',
  'Unusual Buying',
  'SM Holding',
  'SM Top Buys',
  'SM Top Sells',
  'Top CEX Withdraw',
  'Top CEX Deposit',
  'Unusual CEX',
] as const

export type ActiveTab = (typeof tabs)[number]
