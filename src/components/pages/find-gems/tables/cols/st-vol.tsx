import { nFormatter } from '@/lib/utils/nFormatter'

export const StVol = ({
  buyVol,
  sellVol,
}: {
  buyVol: number
  sellVol: number
}) => {
  const total = buyVol + sellVol
  const percentBuy = (buyVol / total) * 100
  const percentSell = (sellVol / total) * 100

  return (
    <div>
      <div className="flex items-start gap-2">
        <div className="flex flex-col items-start">
          <p className="text-sm font-medium text-neutral-500">Buy Vol</p>
          <p className="text-neutral-03">${nFormatter(buyVol)}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-sm font-medium text-neutral-500">Sell Vol</p>
          <p className="text-neutral-03">${nFormatter(sellVol)}</p>
        </div>
      </div>
      <div className="flex w-full gap-0.5 py-0.5">
        <div
          style={{ width: percentBuy + '%' }}
          className="h-1 shrink-0 rounded-[100px] bg-core"
        />
        <div
          style={{ width: percentSell + '%' }}
          className="h-1 shrink-0 rounded-[100px] bg-red"
        />
      </div>
    </div>
  )
}
