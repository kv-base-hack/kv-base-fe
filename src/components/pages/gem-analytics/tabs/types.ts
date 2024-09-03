export const tabs = [
  'Unusual Buying',
  'ST New Listing Buys',
  'ST Holding',
  'ST Top Buys',
  'ST First Time Buy',
  'Top Score By AI',
] as const

export const tabToURLMapping: Record<ActiveTab, string> = {
  'Unusual Buying': 'unusual-buying',
  'ST New Listing Buys': 'st-new-listing-buys',
  'ST Holding': 'st-holding',
  'ST Top Buys': 'st-top-buy',
  'ST First Time Buy': 'st-first-time-buy',
  'Top Score By AI': 'top-score-by-ai',
}

export type ActiveTab = (typeof tabs)[number]
