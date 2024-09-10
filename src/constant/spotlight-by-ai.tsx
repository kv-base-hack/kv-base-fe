import {
  IconCart,
  IconFirstTimeBuy,
  IconSell,
  IconTarget,
  IconUnusualBuy,
} from '@/components/shared/icons/spotlight'

export const ACTION_SPOTLIGHT = {
  new_listing_buy: { name: 'New Listing Buy', icon: <IconTarget /> },
  first_time_buy: { name: 'First Time Buy', icon: <IconFirstTimeBuy /> },
  selling: { name: 'Selling', icon: <IconSell /> },
  new_listing_sell: { name: 'New Listing Sell', icon: <IconSell /> },
  deposit: { name: 'Deposit', icon: <IconSell /> },
  unusual_buy: { name: 'Unusual Buy', icon: <IconUnusualBuy /> },
  massive_buy: { name: 'Massive Buy', icon: <IconSell /> },
  all_in_buy: { name: 'All In Buy', icon: <IconCart /> },
  buy_more: { name: 'Buy More', icon: <IconCart /> },
  low_cap_buy: { name: 'Low Cap Buy', icon: <IconTarget /> },
  major_sell_off: { name: 'Major Sell Off', icon: <IconSell /> },
  sell_all_position: { name: 'Sell All Position', icon: <IconSell /> },
  token_dump: { name: 'Token Dump', icon: <IconSell /> },
  panic_sell: { name: 'Panic Sell', icon: <IconSell /> },
  withdraw: { name: 'Withdraw', icon: <IconSell /> },
}

export type ActionSpotlight =
  (typeof ACTION_SPOTLIGHT)[keyof typeof ACTION_SPOTLIGHT]['name']
export type ActionSpotlightIcon =
  (typeof ACTION_SPOTLIGHT)[keyof typeof ACTION_SPOTLIGHT]['icon']
