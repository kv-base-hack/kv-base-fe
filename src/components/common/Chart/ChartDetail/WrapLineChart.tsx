import { TokenInfo } from '@/types/tokenInfo'
import { TradingDexscreener } from '@/components/common/Chart/Dexscreener'

export function WrapLineChart({
  address,
  dataTokenInfo,
}: {
  mode: string
  sparkLineIn7D?: number[][]
  onModeChange: (mode: string) => void
  loading?: boolean
  dataTokenInfo?: TokenInfo
  address: string
}) {
  return (
    <div className="flex h-[570px] flex-col gap-4 !rounded-[20px]">
      <TradingDexscreener
        address={address}
        symbol={dataTokenInfo?.symbol || ''}
      />
    </div>
  )
}
