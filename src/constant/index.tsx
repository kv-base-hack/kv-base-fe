import BotsStrategyIcon from '@/components/shared/icons/sidebar/BotsStrategyIcon'
import EducationIcon from '@/components/shared/icons/sidebar/EducationIcon'
import HomeIcon from '@/components/shared/icons/sidebar/HomeIcon'
import LeafTreeIcon from '@/components/shared/icons/sidebar/LeafTreeIcon'
import LeafTreeLastIcon from '@/components/shared/icons/sidebar/LeafTreeLastIcon'
import MarketIcon from '@/components/shared/icons/sidebar/MarketIcon'
import OnchainDiscoveryIcon from '@/components/shared/icons/sidebar/OnchainDiscoveryIcon'
import PortfolioIcon from '@/components/shared/icons/sidebar/PortfolioIcon'
import SubcriptionsIcon from '@/components/shared/icons/sidebar/Subcriptions'
import SwapIcon from '@/components/shared/icons/sidebar/SwapIcon'
import TradingTerminalIcon from '@/components/shared/icons/sidebar/TradingTerminal'

export type ISidebarMenu = {
  title: string
  icon: JSX.Element
  href: string | null
  children: ISidebarMenu[]
}

export const SIDEBAR_MENU: ISidebarMenu[] = [
  {
    title: 'Dashboard',
    icon: <HomeIcon className="object-contain object-center shrink-0 w-6 aspect-square" />,
    href: '/',
    children: [],
  },
  {
    title: 'My Portfolio',
    icon: <PortfolioIcon className="object-contain object-center shrink-0 w-6 aspect-square" />,
    href: '/my-portfolio',
    children: [],
  },
  {
    title: 'Onchain Discovery',
    icon: (
      <OnchainDiscoveryIcon className="object-contain object-center shrink-0 w-6 aspect-square" />
    ),
    href: null,
    children: [
      {
        title: 'Onchain Signals',
        icon: <LeafTreeIcon className="object-contain object-center shrink-0 w-9 aspect-[0.75]" />,
        href: '/onchain-discovery/onchain-signals',
        children: [],
      },
      {
        title: 'Leaderboard',
        icon: <LeafTreeIcon className="object-contain object-center shrink-0 w-9 aspect-[0.75]" />,
        href: '/onchain-discovery/leaderboard',
        children: [],
      },
      {
        title: 'Token Explorer',
        icon: <LeafTreeIcon className="object-contain object-center shrink-0 w-9 aspect-[0.75]" />,
        href: '/onchain-discovery/token-explorer',
        children: [],
      },
      {
        title: 'Wallet Explorer',
        icon: (
          <LeafTreeLastIcon className="object-contain object-center shrink-0 w-9 aspect-[0.75]" />
        ),
        href: '/onchain-discovery/wallet-explorer',
        children: [],
      },
    ],
  },
  {
    title: 'Market',
    icon: <MarketIcon className="object-contain object-center shrink-0 w-6 aspect-square" />,
    href: '/market',
    children: [],
  },
  {
    title: 'Swap',
    icon: <SwapIcon className="object-contain object-center shrink-0 w-6 aspect-square" />,
    href: '/swap',
    children: [],
  },
  {
    title: 'Bots Strategy',
    icon: <BotsStrategyIcon className="object-contain object-center shrink-0 w-6 aspect-square" />,
    href: '/bots-strategy',
    children: [],
  },
  {
    title: 'Trading Terminal',
    icon: (
      <TradingTerminalIcon className="object-contain object-center shrink-0 w-6 aspect-square" />
    ),
    href: '/trading-terminal',
    children: [],
  },
  {
    title: 'Education',
    icon: <EducationIcon className="object-contain object-center shrink-0 w-6 aspect-square" />,
    href: '/education',
    children: [],
  },
  {
    title: 'Subcriptions',
    icon: <SubcriptionsIcon className="object-contain object-center shrink-0 w-6 aspect-square" />,
    href: '/subcriptions',
    children: [],
  },
]
