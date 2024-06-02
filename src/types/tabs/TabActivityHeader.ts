export const tabsActivity = [
  'Smart Money Activity',
  'Unusual Activity',
] as const

export type ActiveTab = (typeof tabsActivity)[number]
