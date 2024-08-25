export const SPOTLIGHT_TYPES = {
  MOST_PROFITABLE: 'most_profit',
  LARGEST_BUY_VOLUME: 'most_buy_by_volume',
  LARGEST_HOLD_VALUE: 'most_hold_by_volume',
  MOST_ST_BUY: 'most_buy_by_user_number',
  MOST_ST_HOLD: 'most_hold_by_user_number',
} as const

export type SpotlightType =
  (typeof SPOTLIGHT_TYPES)[keyof typeof SPOTLIGHT_TYPES]
