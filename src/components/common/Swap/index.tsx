import { chainAtom } from '@/atom/chain'
import { useTokenListQuery } from '@/query/token-explorer/getListToken'
import { Widget } from '@kyberswap/widgets'
import { useAtom } from 'jotai'

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
  const [CHAIN] = useAtom(chainAtom)
  // const listTokenQuery = useTokenListQuery({
  //   symbol_search: '',
  //   chain: CHAIN,
  //   limit: 1000,
  // })
  // const listTokenData = listTokenQuery.data?.data?.tokens || []

  let settingFee = {
    feeAmount: 50,
    feeReceiver: '0x1b23FE43c1D6b3041B1C832334Fdd12f6d9dbD4e',
    chargeFeeBy: 'currency_in',
    isInBps: true,
  }
  if (CHAIN === 'bnb') {
    settingFee = {
      feeAmount: 50,
      feeReceiver: '0xFE532Ecf242b950bAeE2956E77FAbF4764Fd0f5a',
      chargeFeeBy: 'currency_in',
      isInBps: true,
    }
  }
  if (CHAIN === 'base') {
    settingFee = {
      feeAmount: 50,
      feeReceiver: '0x1Cc7CAdbDc6E0E5a0b1f3EAB247A543E9420d1aD',
      chargeFeeBy: 'currency_in',
      isInBps: true,
    }
  }

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
      feeSetting={settingFee as any}
      width={425}
      theme={theme as any}
      tokenList={[]}
      enableRoute
      enableDexes="kyberswap-elastic,uniswapv3,uniswap"
      title={<div className="font-bold">Kaivest</div>}
    />
  )
}
