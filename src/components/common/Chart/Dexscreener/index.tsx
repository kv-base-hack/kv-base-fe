import { CHAIN_X } from '@/constant/chain'
import './style.css'

export const TradingDexscreener = ({ address }: { address: string }) => {
  return (
    <div
      className="overflow-hidden !rounded-[20px]"
      style={{ position: 'relative', width: '100%', height: '580px' }}
    >
      <div id="dexscreener-embed">
        <iframe
          src={`https://dexscreener.com/${CHAIN_X}/${address}?embed=1&theme=ligh&trades=0&info=1`}
        ></iframe>
      </div>
    </div>
  )
}
