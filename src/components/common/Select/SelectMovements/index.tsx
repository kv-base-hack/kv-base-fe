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
        icon: <NewListingSellIcon className="text-red-500 h-4 w-4" />,
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
  setPage,
  text = 'All Movements',
}: {
  movement: string
  setMovement: (value: string) => void
  setPage?: (val: number) => void
  text?: string
}) => {
  return (
    <Select
      value={movement}
      onValueChange={(val: string) => {
        setMovement(val)
        if (setPage) setPage(1)
      }}
    >
      <SelectTrigger className="my-auto flex h-8 w-auto cursor-pointer gap-2 whitespace-nowrap rounded-[360px] border border-solid border-white/40 bg-transparent px-4 py-0 text-sm font-medium leading-6 tracking-normal text-white">
        <div className="flex items-center justify-between gap-2">
          {renderMovement(movement).icon}
          <div className="grow">{renderMovement(movement).value}</div>
        </div>
      </SelectTrigger>
      <SelectContent className="z-[9999] border-none bg-neutral-07">
        <SelectItem value="all">{text}</SelectItem>
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
            <NewListingSellIcon className="text-red-500 h-4 w-4" />
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
