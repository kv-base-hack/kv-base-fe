import BuyingIcon from '@/components/shared/icons/dashboard/BuyingIcon'
import CexDepositIcon from '@/components/shared/icons/dashboard/CexDepositIcon'
import CexWithdrawIcon from '@/components/shared/icons/dashboard/CexWithdrawIcon'
import NewListingBuyIcon from '@/components/shared/icons/dashboard/NewListingBuyIcon'
import NewListingSellIcon from '@/components/shared/icons/dashboard/NewListingSellIcon'
import SellingIcon from '@/components/shared/icons/dashboard/SellingIcon'
import { UnusualBuyIcon } from '@/components/shared/icons/dashboard/UnusualBuy'
import { IconShoppingCart } from '@/components/shared/icons/leaderboard/IconShoppingCart'

export const renderMovementName = (movement: string) => {
  switch (movement) {
    case 'deposit':
      return 'Deposit'
    case 'withdraw':
      return 'Withdraw'
    case 'buying':
      return 'Buying'
    case 'selling':
      return 'Selling'
    case 'new_listing_buy':
      return 'New Listing Buy'
    case 'new_listing_sell':
      return 'New Listing Sell'
    case 'unusual_buy':
      return 'Unusual Buy'
    default:
      return 'Movement'
  }
}

export const renderMovementIcon = (
  movement: string,
  className?: string,
  color?: string,
) => {
  switch (movement) {
    case 'deposit':
      return <CexDepositIcon className={className || 'h-4 w-4'} color={color} />
    case 'withdraw':
      return (
        <CexWithdrawIcon className={className || 'h-4 w-4'} color={color} />
      )
    case 'buying':
      return <BuyingIcon className={className || 'h-4 w-4'} />
    case 'selling':
      return <SellingIcon className={className || 'h-4 w-4'} color={color} />
    case 'new_listing_buy':
      return (
        <NewListingBuyIcon className={className || 'h-4 w-4'} color={color} />
      )
    case 'new_listing_sell':
      return (
        <NewListingSellIcon className={className || 'h-4 w-4'} color={color} />
      )
    case 'unusual_buy':
      return <UnusualBuyIcon />
    default:
      return null
  }
}
