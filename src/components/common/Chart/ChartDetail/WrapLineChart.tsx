import { TokenInfo } from '@/types/tokenInfo'
import { TradingDexscreener } from '@/components/common/Chart/Dexscreener'

export function WrapLineChart({ address }: { address: string }) {
  return (
    <div className="flex h-[570px] flex-col gap-4">
      <TradingDexscreener address={address} />
    </div>
  )
}
