import { TokenInfo } from '@/types/tokenInfo'
import { TradingDexscreener } from '@/components/common/Chart/Dexscreener'

export function WrapLineChart({
  address,
}: {
  mode: string
  sparkLineIn7D?: number[][]
  onModeChange: (mode: string) => void
  loading?: boolean
  dataTokenInfo?: TokenInfo
  address: string
}) {
  return (
    <div className="rounded-lg h-[570px] flex flex-col gap-4">
      <TradingDexscreener address={address} />
    </div>
  )
}
