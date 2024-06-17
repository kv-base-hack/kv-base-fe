import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import CexDepositIcon from '@/components/shared/icons/dashboard/CexDepositIcon'
import CexWithdrawIcon from '@/components/shared/icons/dashboard/CexWithdrawIcon'
import BuyingIcon from '@/components/shared/icons/dashboard/BuyingIcon'
import SellingIcon from '@/components/shared/icons/dashboard/SellingIcon'
import NewListingBuyIcon from '@/components/shared/icons/dashboard/NewListingBuyIcon'
import NewListingSellIcon from '@/components/shared/icons/dashboard/NewListingSellIcon'

const renderMovement = (chain: string) => {
  switch (chain) {
    case 'all':
      return {
        value: 'All Movements',
        icon: null,
      }
    case 'deposit': {
      return {
        value: 'Deposit',
        icon: <CexDepositIcon className="w-4 h-4" />,
      }
    }
    case 'withdraw': {
      return {
        value: 'Withdraw',
        icon: <CexWithdrawIcon className="w-4 h-4" />,
      }
    }
    case 'buying': {
      return {
        value: 'Buying',
        icon: <BuyingIcon className="w-4 h-4" />,
      }
    }
    case 'selling': {
      return {
        value: 'Selling',
        icon: <SellingIcon className="w-4 h-4" />,
      }
    }
    case 'new_listing_buy': {
      return {
        value: 'New Listing Buy',
        icon: <NewListingBuyIcon className="w-4 h-4" />,
      }
    }
    case 'new_listing_sell': {
      return {
        value: 'New Listing Sell',
        icon: <NewListingSellIcon className="w-4 h-4 text-red-500" />,
      }
    }
    default: {
      return {
        value: 'All Movements',
        icon: null,
      }
    }
  }
}

export const SelectMovement = ({
  movement,
  setMovement,
}: {
  movement: string
  setMovement: (value: string) => void
}) => {
  return (
    <Select value={movement} onValueChange={(val: string) => setMovement(val)}>
      <SelectTrigger className="flex w-auto cursor-pointer gap-2 px-4 py-3 my-auto text-base font-medium tracking-normal leading-6 border-solid border-neutral-03 rounded-xl bg-transparent whitespace-nowrap border">
        <div className="flex items-center gap-2 justify-between text-neutral-04">
          {renderMovement(movement).icon}
          <div className="grow">{renderMovement(movement).value}</div>
        </div>
      </SelectTrigger>
      <SelectContent className="border-none bg-white text-neutral-07 z-[9999]">
        <SelectItem value="all">All Movements</SelectItem>
        <SelectItem value="buying">
          <div className="flex items-center gap-2.5">
            <BuyingIcon className="w-4 h-4" />
            <span>Buying</span>
          </div>
        </SelectItem>
        <SelectItem value="selling">
          <div className="flex items-center gap-2.5">
            <SellingIcon className="w-4 h-4" />
            <span>Selling</span>
          </div>
        </SelectItem>
        <SelectItem value="new_listing_buy">
          <div className="flex items-center gap-2.5">
            <NewListingBuyIcon className="w-4 h-4" />
            <span>New Listing Buy</span>
          </div>
        </SelectItem>
        <SelectItem value="new_listing_sell">
          <div className="flex items-center gap-2.5">
            <NewListingSellIcon className="w-4 h-4 text-red-500" />
            <span>New Listing Sell</span>
          </div>
        </SelectItem>
        <SelectItem value="deposit">
          <div className="flex items-center gap-2.5">
            <CexDepositIcon className="w-4 h-4" />
            <span>Deposit</span>
          </div>
        </SelectItem>
        <SelectItem value="withdraw">
          <div className="flex items-center gap-2.5">
            <CexWithdrawIcon className="w-4 h-4" />
            <span>Withdraw</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
