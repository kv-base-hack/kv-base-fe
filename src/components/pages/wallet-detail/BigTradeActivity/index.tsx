import { chainAtom } from '@/atom/chain'
import { DataTable } from '@/components/common/DataTable'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { columnsBigTradeActivity } from '@/components/common/DataTable/columnsBigTradeActivity'

import { ImageToken } from '@/components/common/Image/ImageToken'
import { PaginationCustom } from '@/components/common/Pagination'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { SelectMovement } from '@/components/common/Select/SelectMovements'
import { SelectTradeValue } from '@/components/common/Select/SelectTradeValue'
import { DialogSelectToken } from '@/components/common/SelectTokens/DialogSelectTokens'
import Close from '@/components/shared/icons/Close'
import { Switch } from '@/components/ui/switch'
import { useTradeActivityQuery } from '@/query/wallet-explorer/getTradeActivity'
import { TokenList } from '@/types/tokenList'
import { useAtomValue } from 'jotai'
import { useState } from 'react'

type BigTradeActivityProps = {
  address: string
  chain: string
}

export const BigTradeActivity: React.FC<BigTradeActivityProps> = ({
  address,
  chain,
}) => {
  const [pageActivity, setPageActivity] = useState(1)
  const [filterActivity, setFilterActivity] = useState('all')
  const [listToken, setListToken] = useState<TokenList[]>([])
  const [tradeValue, setTradeValue] = useState<unknown>([])
  const [showBigTradeBigger5k, setShowBigTradeBigger5k] = useState(false)

  // get data Big Trade Activity
  const activityQuery = useTradeActivityQuery({
    action: filterActivity,
    limit: 10,
    start: pageActivity,
    chain,
    address,
    amount_filter: tradeValue?.toString() || '',
    is_big_trade_only: showBigTradeBigger5k,
    token_address:
      listToken?.map((item) => item.tokenAddress)?.toString() || '',
  })

  const dataActivity = activityQuery.isFetching
    ? [...(Array(10).keys() as any)]
    : activityQuery.data?.data.activities || []
  const totalActivity = activityQuery.data?.data.total || 1

  const handleRemoveToken = (item: TokenList) => (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const newListToken = listToken.filter(
      (token) => token.tokenAddress !== item.tokenAddress,
    )
    setListToken([...newListToken])
  }

  const handleFilterBigTrade = (checked: boolean) => {
    setShowBigTradeBigger5k(checked)
  }

  return (
    <WrapTable
      title={
        <div className="flex items-center gap-4">
          <div>Trade Activity</div>
          <div className="flex items-center gap-4">
            <span className="font-normal leading-5 tracking-[-0.14px]">
              {`Only show big trade(>$5K)`}
            </span>
            <Switch
              checked={showBigTradeBigger5k}
              onCheckedChange={handleFilterBigTrade}
            />
          </div>
        </div>
      }
      childHeader={
        <div className="flex items-center gap-4 max-md:flex-wrap">
          <div className="flex items-center gap-2">
            <DialogSelectToken
              listToken={listToken}
              setListToken={setListToken}
            >
              <button className="whitespace-nowrap border border-solid border-neutral-03 rounded-xl bg-transparent text-neutral-04 px-4 py-2 my-auto">
                Specific Token
              </button>
            </DialogSelectToken>
            {listToken?.length > 0 ? (
              <div className="flex items-center gap-2">
                {listToken.map((item) => (
                  <div
                    className="rounded-3xl h-9 p-px bg-gradient-to-r from-[#9945FF] to-[#14F195] shadow-lg backdrop-blur-[2px]"
                    key={item.tokenAddress}
                  >
                    <div className="bg-neutral-07 cursor-pointer rounded-3xl flex items-center justify-center px-4 gap-1 h-full text-sm tracking-normal leading-5 text-white">
                      <ImageToken
                        imgUrl={item?.imageUrl}
                        symbol={item?.symbol}
                      />
                      <div>{item.symbol}</div>
                      <Close onclick={handleRemoveToken(item)} />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <SelectTradeValue
            valueSelected={tradeValue}
            setValueSelected={setTradeValue}
          />
          <SelectMovement
            movement={filterActivity}
            setMovement={setFilterActivity}
          />
        </div>
      }
    >
      <div className="mt-8">
        <DataTable
          className="text-xs font-bold tracking-normal leading-4"
          columns={columnsBigTradeActivity(chain)}
          data={dataActivity?.slice(0, 10) || []}
          isFetching={activityQuery.isFetching}
          noneBorder
          noneBgHeader
          emptyData="No results."
        />
      </div>
      <PaginationCustom
        className="mt-4"
        currentPage={pageActivity}
        updatePage={(page: number) => setPageActivity(page)}
        pageSize={10}
        total={totalActivity}
        setPage={setPageActivity}
      />
    </WrapTable>
  )
}
