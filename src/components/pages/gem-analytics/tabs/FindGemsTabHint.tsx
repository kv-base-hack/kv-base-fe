import React from 'react'
import { ActiveTab } from './types'

interface FindGemsTabHintProps {
  activeTab: ActiveTab
}

export const FindGemsTabHint: React.FC<FindGemsTabHintProps> = ({
  activeTab,
}) => {
  switch (activeTab) {
    case 'Unusual Buying':
      return `Here is a list of tokens with Unusual buying actions identified by Kaivest's AI`
    case 'ST New Listing Buys':
      return 'Here is a list of tokens buys by smart traders with token age <14 days'
    case 'ST Holding':
      return 'List of token holding by smart traders.'
    case 'ST Top Buys':
      return 'Top purchases made by Smart Traders ranked by Volume Buy.'
    case 'ST First Time Buy':
      return 'List tokens with the highest net withdrawals from centralized exchanges to wallet.'
    default:
      return ''
  }
}
