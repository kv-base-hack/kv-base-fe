import { DataTable } from '@/components/common/DataTable'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { useTradeActivityQuery } from '@/query/wallet-explorer/getTradeActivity'
import { TokenList } from '@/types/tokenList'
import { useState } from 'react'
import { columnsActivityWalletDetail } from './columns-activity-wallet-detail'

type BigTradeActivityProps = {
  address: string
  chain: string
  hideSmallTrade: boolean
}

export const BigTradeActivity: React.FC<BigTradeActivityProps> = ({
  address,
  chain,
  hideSmallTrade,
}) => {
  const [pageActivity, setPageActivity] = useState(1)
  const [filterActivity, setFilterActivity] = useState('all')
  const [listToken, setListToken] = useState<TokenList[]>([])
  const [tradeValue, setTradeValue] = useState<unknown>([])
  // get data Big Trade Activity
  const activityQuery = useTradeActivityQuery({
    action: filterActivity,
    limit: 10,
    start: pageActivity,
    chain,
    address,
    amount_filter: tradeValue?.toString() || '',
    is_big_trade_only: hideSmallTrade,
    token_address:
      listToken?.map((item) => item.tokenAddress)?.toString() || '',
  })

  const dataActivity = activityQuery.isFetching
    ? [...(Array(10).keys() as any)]
    : activityQuery.data?.data.activities || []
  const totalActivity = activityQuery.data?.data.total || 1

  // const handleRemoveToken = (item: TokenList) => (e: any) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   const newListToken = listToken.filter(
  //     (token) => token.tokenAddress !== item.tokenAddress,
  //   )
  //   setListToken([...newListToken])
  // }

  // const handleFilterBigTrade = (checked: boolean) => {
  //   setShowBigTradeBigger5k(checked)
  // }

  return (
    <div>
      {/* <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm not-italic font-normal leading-5 tracking-[-0.14px]">
              {`Only show big trade(>$5K)`}
            </span>
            <Switch
              checked={showBigTradeBigger5k}
              onCheckedChange={handleFilterBigTrade}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 max-md:flex-wrap">
          <div className="my-auto text-base tracking-normal leading-6 text-zinc-50">
            Filter by
          </div>
          <div className="flex items-center gap-2">
            <DialogSelectToken
              listToken={listToken}
              setListToken={setListToken}
            >
              <div className="rounded-3xl h-10 p-px bg-gradient-to-r from-[#9945FF] to-[#14F195] shadow-lg backdrop-blur-[2px]">
                <div className="bg-background cursor-pointer rounded-3xl flex items-center justify-center px-7 h-full text-sm tracking-normal leading-5 text-white">
                  Choose Token
                </div>
              </div>
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
            setPage={setPageActivity}
          />
          <SelectMovement
            movement={filterActivity}
            setMovement={setFilterActivity}
            setPage={setPageActivity}
          />
        </div>
      </div> */}
      <div>
        <DataTable
          className="bg-neutral-06 bg-neutral-07/50 text-xs font-normal leading-4 tracking-normal text-gray-300"
          columns={columnsActivityWalletDetail}
          data={dataActivity?.slice(0, 10) || []}
          isFetching={activityQuery.isFetching}
          noneBorder
          noneBgHeader
          emptyData="No results."
        />
      </div>
      <PaginationTable
        className="mt-4"
        currentPage={pageActivity}
        pageSize={10}
        total={totalActivity}
        setPage={setPageActivity}
      />
    </div>
  )
}
