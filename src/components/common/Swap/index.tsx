import { chainAtom } from '@/atom/chain'
import { useTokenListQuery } from '@/query/token-explorer/getListToken'
import { Widget } from '@kyberswap/widgets'
import { useAtom } from 'jotai'

const theme = {
  // Check out the theme examples below
  primary: '#FFFFFF',
  secondary: '#F8F8F8',
  dialog: '#EDEDED',
  borderRadius: '20px',
  buttonRadius: '24px',
  stroke: '#E0E0E0',
  icons: '#a9a9a9',
  layer1: '#27262C',
  layer2: '#363046',
  interactive: '#F0F0F0',
  chartRange: '#5DC5D2',
  chartArea: '#457F89',
  accent: '#4A90E2',
  success: '#7ED321',
  warning: '#F5A623',
  error: '#D0021B',
  text: '#4A4A4A',
  subtext: '#9B9B9B',
  fontFamily: 'Sora, Sans-serif',
}
export const IntegratedTerminal = () => {
  const [CHAIN] = useAtom(chainAtom)
  // const listTokenQuery = useTokenListQuery({
  //   symbol_search: '',
  //   chain: CHAIN,
  //   limit: 1000,
  // })
  // const listTokenData = listTokenQuery.data?.data?.tokens || []

  // const MY_TOKEN_LIST = [
  //   {
  //     name: 'KNC',
  //     address: '0x1C954E8fe737F99f68Fa1CCda3e51ebDB291948C',
  //     symbol: 'KNC',
  //     decimals: 18,
  //     chainId: 1,
  //     logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/9444.png',
  //   },
  //   {
  //     name: 'Tether USD',
  //     address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  //     symbol: 'USDT',
  //     decimals: 6,
  //     chainId: 1,
  //     logoURI:
  //       'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
  //   },
  //   {
  //     name: 'USD Coin',
  //     address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  //     symbol: 'USDC',
  //     decimals: 6,
  //     chainId: 1,
  //     logoURI:
  //       'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
  //   },
  // ]
  return (
    <Widget
      client="kaivest"
      feeSetting={{
        feeAmount: 50,
        feeReceiver: '0x4522d369AecD8162A461e1d3782e2587Db125108',
        chargeFeeBy: 'currency_in',
        isInBps: true,
      }}
      width={350}
      theme={theme as any}
      tokenList={[]}
      enableRoute
      enableDexes="kyberswap-elastic,uniswapv3,uniswap"
      title={<div className="font-bold font-sora">Kaivest</div>}
    />
  )
}
