import {
  IconFiltedFunnel,
  IconFilterFunnel,
} from '@/components/shared/icons/activity/icon-filter-funnel'
import BuyingIcon from '@/components/shared/icons/dashboard/BuyingIcon'
import CexDepositIcon from '@/components/shared/icons/dashboard/CexDepositIcon'
import CexWithdrawIcon from '@/components/shared/icons/dashboard/CexWithdrawIcon'
import NewListingBuyIcon from '@/components/shared/icons/dashboard/NewListingBuyIcon'
import NewListingSellIcon from '@/components/shared/icons/dashboard/NewListingSellIcon'
import SellingIcon from '@/components/shared/icons/dashboard/SellingIcon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useState } from 'react'

export const DropdownMovements = ({
  movement,
  setMovement,
  setPage,
}: {
  movement: string
  setMovement: (v: string) => void
  setPage: (v: number) => void
}) => {
  const [filtered, setFiltered] = useState<boolean>(false)

  const handleSetMovement = (v: string) => {
    setMovement(v)
    setPage(1)
    setFiltered(v === 'all' ? false : true)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {filtered ? <IconFiltedFunnel /> : <IconFilterFunnel />}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="border border-white/10 bg-black">
        <DropdownMenuItem onClick={() => handleSetMovement('all')}>
          <span className="w-full cursor-pointer">All Movement</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetMovement('buying')}>
          <div className="flex cursor-pointer items-center gap-2.5">
            <BuyingIcon className="h-4 w-4" />
            <span>Buying</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetMovement('selling')}>
          <div className="flex items-center gap-2.5">
            <SellingIcon className="h-4 w-4" />
            <span>Selling</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetMovement('new_listing_buy')}>
          <div className="flex items-center gap-2.5">
            <NewListingBuyIcon className="h-4 w-4" />
            <span>New Listing Buy</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetMovement('new_listing_sell')}>
          <div className="flex items-center gap-2.5">
            <NewListingSellIcon className="text-red-500 h-4 w-4" />
            <span>New Listing Sell</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetMovement('deposit')}>
          <div className="flex items-center gap-2.5">
            <CexDepositIcon className="h-4 w-4" />
            <span>Deposit</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetMovement('withdraw')}>
          <div className="flex items-center gap-2.5">
            <CexWithdrawIcon className="h-4 w-4" />
            <span>Withdraw</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
