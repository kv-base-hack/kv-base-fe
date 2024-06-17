import { CHAIN_X } from '@/constant/chain'
import './style.css'

export const TradingDexscreener = ({ address }: { address: string }) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '420px' }}>
      <div id="dexscreener-embed">
        <iframe
          allowFullScreen
          src={`https://dexscreener.com/${CHAIN_X}/${address}?embed=1&theme=ligh&trades=0&info=0&full`}
        ></iframe>
      </div>
      <div className="absolute left-0 right-0 h-[38px] z-1 -bottom-[60px] bg-neutral-07"></div>
    </div>
  )
}
