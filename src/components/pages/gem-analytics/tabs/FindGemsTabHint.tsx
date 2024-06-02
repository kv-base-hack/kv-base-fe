import React from 'react'
import { ActiveTab } from './types'

interface FindGemsTabHintProps {
  activeTab: ActiveTab
}

export const FindGemsTabHint: React.FC<FindGemsTabHintProps> = ({
  activeTab,
}) => {
  switch (activeTab) {
    case 'Dashboard':
      return ''
    case 'Unusual Buying':
      return `Here is a list of tokens with Unusual buying actions identified by Boltrade's AI`
    case 'SM New Listing Buys':
      return 'Here is a list of tokens buys by smart money with token age <14 days'
    case 'SM Holding':
      return 'List of token holding by smart money'
    case 'SM Top Buys':
      return 'List the top purchases made by smart money'
    case 'SM Top Sells':
      return 'List the top sales made by smart money'
    case 'SM CEX Withdraw':
      return 'List tokens with the highest net withdrawals from centralized exchanges to wallet.'
    default:
      return ''
  }
}
