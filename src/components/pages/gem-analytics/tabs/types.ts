export const tabs = [
  'ST New Listing Buys',
  'Unusual Buying',
  'ST Holding',
  'ST Top Buys',
  'ST Top Sells',
  'Top CEX Withdraw',
  'Top CEX Deposit',
  'Unusual CEX',
] as const

export type ActiveTab = (typeof tabs)[number]
