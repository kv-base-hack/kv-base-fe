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
      return 'Here is a list of tokens buys by smart money with token age <14 days'
    case 'ST Holding':
      return 'List of token holding by smart money'
    case 'ST Top Buys':
      return 'List the top purchases made by smart money'
    case 'ST Top Sells':
      return 'List the top sales made by smart money'
    case 'Top CEX Withdraw':
      return 'List tokens with the highest net withdrawals from centralized exchanges to wallet.'
    default:
      return ''
  }
}
