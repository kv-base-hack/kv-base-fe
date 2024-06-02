import BuyingIcon from '@/components/shared/icons/dashboard/BuyingIcon'
import CexDepositIcon from '@/components/shared/icons/dashboard/CexDepositIcon'
import CexWithdrawIcon from '@/components/shared/icons/dashboard/CexWithdrawIcon'
import NewListingBuyIcon from '@/components/shared/icons/dashboard/NewListingBuyIcon'
import NewListingSellIcon from '@/components/shared/icons/dashboard/NewListingSellIcon'
import SellingIcon from '@/components/shared/icons/dashboard/SellingIcon'
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
    default:
      return 'Movement'
  }
}

export const renderMovementIcon = (movement: string) => {
  switch (movement) {
    case 'deposit':
      return <CexDepositIcon className="w-4 h-4" />
    case 'withdraw':
      return <CexWithdrawIcon className="w-4 h-4" />
    case 'buying':
      return <IconShoppingCart className="w-4 h-4" color="#1A1D1F" />
    case 'selling':
      return <SellingIcon className="w-4 h-4" />
    case 'new_listing_buy':
      return <NewListingBuyIcon className="w-4 h-4 " />
    case 'new_listing_sell':
      return <NewListingSellIcon className="w-4 h-4 " />
    default:
      return null
  }
}
