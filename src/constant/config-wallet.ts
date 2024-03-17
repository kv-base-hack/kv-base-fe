import { http } from 'wagmi'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

import {
  mainnet,
  arbitrum,
  arbitrumGoerli,
  avalanche,
  bsc,
  mantle,
  optimism,
  optimismGoerli,
  polygon,
} from 'wagmi/chains'

const PROJECT_ID = '82e862897ee6aefe406b918ec6affe10'

export const configWallet = getDefaultConfig({
  chains: [
    mainnet,
    arbitrum,
    arbitrumGoerli,
    avalanche,
    bsc,
    mantle,
    optimism,
    optimismGoerli,
    polygon,
  ],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [arbitrumGoerli.id]: http(),
    [avalanche.id]: http(),
    [bsc.id]: http(),
    [mantle.id]: http(),
    [optimism.id]: http(),
    [optimismGoerli.id]: http(),
    [polygon.id]: http(),
  },
  appName: 'Kaivest',
  projectId: PROJECT_ID,
})
