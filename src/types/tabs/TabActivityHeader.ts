export const tabsActivity = [
  'Smart Traders Activity',
  'Unusual Activity',
] as const

export type ActiveTab = (typeof tabsActivity)[number]
