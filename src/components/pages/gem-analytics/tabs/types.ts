export const tabs = [
  'Dashboard',
  'Unusual Buying',
  'SM New Listing Buys',
  'SM Holding',
  'SM Top Buys',
  'SM Top Sells',
  'SM CEX Withdraw',
] as const

export type ActiveTab = (typeof tabs)[number]
