import { Widget } from '@kyberswap/widgets'

const theme = {
  // Check out the theme examples below
}
export const IntegratedTerminal = () => {
  return (
    <Widget
      client="kaivest"
      theme={theme as any}
      tokenList={[]}
      enableRoute
      enableDexes="kyberswap-elastic,uniswapv3,uniswap"
      title={<div>Custom Title</div>}
    />
  )
}
