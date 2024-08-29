import './style.css'
import { useAtom } from 'jotai'
import { chainAtom } from '@/atom/chain'
import { useSearchParams } from 'next/navigation'

export const TradingDexscreener = ({ address }: { address: string }) => {
  const [CHAIN] = useAtom(chainAtom)
  const searchParams = useSearchParams()
  const search = searchParams.get('chain')
  let addressFormat = address
  if (
    address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' &&
    (search === 'ethereum' || CHAIN === 'ethereum')
  ) {
    addressFormat = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
  }

  if (
    address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' &&
    (search === 'base' || CHAIN === 'base')
  ) {
    addressFormat = '0x4200000000000000000000000000000000000006'
  }
  return (
    <div
      className="overflow-hidden !rounded-[20px]"
      style={{ position: 'relative', width: '100%', height: '580px' }}
    >
      <div id="dexscreener-embed">
        <iframe
          src={`https://dexscreener.com/${
            search ?? CHAIN
          }/${addressFormat}?embed=1&theme=ligh&trades=0&info=1`}
        ></iframe>
      </div>
    </div>
  )
}
