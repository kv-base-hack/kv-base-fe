// import DolphinIcon from '@/components/shared/icons/trade-value/Dolphin'
// import FishIcon from '@/components/shared/icons/trade-value/Fish'
// import ShrimpIcon from '@/components/shared/icons/trade-value/Shrimp'
// import WhaleIcon from '@/components/shared/icons/trade-value/Whale'

export const renderTradingValue = (value: number) => {
  if (value < 15000) {
    return '🦐'
  } else if (value >= 15000 && value < 50000) {
    return '🦈'
  } else if (value >= 50000 && value < 100000) {
    return '🐬'
  } else if (value >= 100000 && value < 200000) {
    return '🐳'
  } else if (value >= 200000) {
    return '🌊'
  }
  return '🦐'
}
