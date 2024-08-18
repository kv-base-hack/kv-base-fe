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
        icon: <CexDepositIcon className="h-4 w-4" />,
      }
    }
    case 'withdraw': {
      return {
        value: 'Withdraw',
        icon: <CexWithdrawIcon className="h-4 w-4" />,
      }
    }
    case 'buying': {
      return {
        value: 'Buying',
        icon: <BuyingIcon className="h-4 w-4" />,
      }
    }
    case 'selling': {
      return {
        value: 'Selling',
        icon: <SellingIcon className="h-4 w-4" />,
      }
    }
    case 'new_listing_buy': {
      return {
        value: 'New Listing Buy',
        icon: <NewListingBuyIcon className="h-4 w-4" />,
      }
    }
    case 'new_listing_sell': {
      return {
        value: 'New Listing Sell',
        icon: <NewListingSellIcon className="h-4 w-4 text-red-500" />,
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
      <SelectTrigger className="my-auto flex w-auto cursor-pointer gap-2 whitespace-nowrap rounded-xl border border-solid border-neutral-03 bg-transparent px-4 py-3 text-base font-medium leading-6 tracking-normal">
        <div className="flex items-center justify-between gap-2 text-neutral-04">
          {renderMovement(movement).icon}
          <div className="grow">{renderMovement(movement).value}</div>
        </div>
      </SelectTrigger>
      <SelectContent className="z-[9999] border-none bg-white text-neutral-07">
        <SelectItem value="all">All Movements</SelectItem>
        <SelectItem value="buying">
          <div className="flex items-center gap-2.5">
            <BuyingIcon className="h-4 w-4" />
            <span>Buying</span>
          </div>
        </SelectItem>
        <SelectItem value="selling">
          <div className="flex items-center gap-2.5">
            <SellingIcon className="h-4 w-4" />
            <span>Selling</span>
          </div>
        </SelectItem>
        <SelectItem value="new_listing_buy">
          <div className="flex items-center gap-2.5">
            <NewListingBuyIcon className="h-4 w-4" />
            <span>New Listing Buy</span>
          </div>
        </SelectItem>
        <SelectItem value="new_listing_sell">
          <div className="flex items-center gap-2.5">
            <NewListingSellIcon className="h-4 w-4 text-red-500" />
            <span>New Listing Sell</span>
          </div>
        </SelectItem>
        <SelectItem value="deposit">
          <div className="flex items-center gap-2.5">
            <CexDepositIcon className="h-4 w-4" />
            <span>Deposit</span>
          </div>
        </SelectItem>
        <SelectItem value="withdraw">
          <div className="flex items-center gap-2.5">
            <CexWithdrawIcon className="h-4 w-4" />
            <span>Withdraw</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
