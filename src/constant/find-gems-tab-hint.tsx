export const findGemsTabHint = (activeTab: string) => {
  switch (activeTab) {
    case 'Unusual Buying':
      return `List of tokens with unusual buying actions identified by Kaivest AI. Unusual Buys may indicate insider trading and should be monitored closely.`
    case 'ST New Listing Buys':
      return 'List of tokens created less than 14 days ago, bought by Smartmoney, ranked by default according to PnL.'
    case 'ST Holding':
      return 'List of token holding by smart money.'
    case 'ST Top Buy':
      return 'Top purchases made by Smartmoney ranked by Volume Buy.'
    case 'ST Top Sells':
      return 'Top sales made by Smartmoney ranked by Volume Sell.'
    case 'ST First Time Buy':
      return 'List tokens with the highest net withdrawals from centralized exchanges to wallet.'
    default:
      return ''
  }
}
