import './style.css'

export const TradingDexscreener = ({ address }: { address: string }) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      <div id="dexscreener-embed">
        <iframe
          src={`https://dexscreener.com/solana/${address}?embed=1&theme=dark&trades=0&info=0`}
        ></iframe>
      </div>
      <div
        className='absolute left-0 right-0 h-[38px] z-1 -bottom-[100px] bg-neutral-07' 
      ></div>
    </div>
  )
}
