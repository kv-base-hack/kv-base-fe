export const tabs = [
  'Unusual Buying',
  'ST New Listing Buys',
  'ST Holding',
  'ST Top Buys',
  'ST First Time Buy',
  'Top AI Score',
] as const

export type ActiveTab = (typeof tabs)[number]

export const tabToURLMapping: Record<ActiveTab, string> = {
  'Unusual Buying': 'unusual-buying',
  'ST New Listing Buys': 'st-new-listing-buys',
  'ST Holding': 'st-holding',
  'ST Top Buys': 'st-top-buy',
  'ST First Time Buy': 'st-first-time-buy',
  'Top AI Score': 'top-ai-score',
}

export const URLToTabMapping: Record<string, ActiveTab> = Object.fromEntries(
  Object.entries(tabToURLMapping).map(([key, value]) => [
    value,
    key as ActiveTab,
  ]),
)
