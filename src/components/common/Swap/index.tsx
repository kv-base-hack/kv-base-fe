import { Widget } from '@kyberswap/widgets'

const theme = {
  // Check out the theme examples below
  primary: '#FBFBFB',
  secondary: '#D6D9DC',
  dialog: '#FBFBFB',
  borderRadius: '20px',
  buttonRadius: '24px',
  stroke: '#FCFCFC',
  interactive: '#D6D9DC',
  accent: '#6F767E',
  success: '#189470',
  warning: '#FF9901',
  error: '#FF537B',
  text: '#1C1A1F',
  subtext: '#33383F',
  fontFamily: 'Roboto',
}
export const IntegratedTerminal = () => {
  return (
    <Widget
      client="kaivest"
      width={480}
      theme={theme as any}
      tokenList={[]}
      enableRoute
      enableDexes="kyberswap-elastic,uniswapv3,uniswap"
      title={<div className="font-bold">Kaivest</div>}
    />
  )
}
