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
import { cn } from '@/lib/utils'

export type ISidebarMenu = {
  title: string
  icon: JSX.Element
  href: string
  children: ISidebarMenu[]
  canNavigate: boolean | true
}

export const SIDEBAR_MENU = () => [
  {
    title: 'Dashboard',
    icon: (
      <HomeIcon
        className={cn(
          'object-contain object-center shrink-0 w-6 aspect-square',
          document.location.pathname === '/' ? 'text-gray-100' : 'text-[#6F767E]'
        )}
      />
    ),
    href: '/dashboard',
    children: [],
    canNavigate: true,
  },
  {
    title: 'My Portfolio',
    icon: (
      <PortfolioIcon
        className={cn(
          'object-contain object-center shrink-0 w-6 aspect-square',
          document.location.pathname === '/my-portfolio' ? 'text-gray-100' : 'text-[#6F767E]'
        )}
      />
    ),
    href: '/my-portfolio',
    children: [],
    canNavigate: true,
  },
  {
    title: 'Onchain Discovery',
    icon: (
      <OnchainDiscoveryIcon className="object-contain object-center shrink-0 w-6 aspect-square" />
    ),
    href: '/onchain-discovery',
    canNavigate: false,
    children: [
      {
        title: 'Onchain Signals',
        icon: <LeafTreeIcon className="object-contain object-center shrink-0 w-9 aspect-[0.75]" />,
        href: '/onchain-discovery/onchain-signals',
        children: [],
        canNavigate: true,
      },
      {
        title: 'Leaderboard',
        icon: <LeafTreeIcon className="object-contain object-center shrink-0 w-9 aspect-[0.75]" />,
        href: '/onchain-discovery/leaderboard',
        children: [],
        canNavigate: true,
      },
      {
        title: 'Token Explorer',
        icon: <LeafTreeIcon className="object-contain object-center shrink-0 w-9 aspect-[0.75]" />,
        href: '/onchain-discovery/token-explorer',
        children: [],
        canNavigate: true,
      },
      {
        title: 'Wallet Explorer',
        icon: (
          <LeafTreeLastIcon className="object-contain object-center shrink-0 w-9 aspect-[0.75]" />
        ),
        href: '/onchain-discovery/wallet-explorer',
        children: [],
        canNavigate: true,
      },
    ],
  },
  {
    title: 'Market',
    icon: (
      <MarketIcon
        className={cn(
          'object-contain object-center shrink-0 w-6 aspect-square',
          document.location.pathname === '/market' ? 'text-gray-100' : 'text-[#6F767E]'
        )}
      />
    ),
    canNavigate: true,
    href: '/market',
    children: [],
  },
  {
    title: 'Swap',
    icon: (
      <SwapIcon
        className={cn(
          'object-contain object-center shrink-0 w-6 aspect-square',
          document.location.pathname === '/swap' ? 'text-gray-100' : 'text-[#6F767E]'
        )}
      />
    ),
    canNavigate: true,
    href: '/swap',
    children: [],
  },
  {
    title: 'Bots Strategy',
    icon: (
      <BotsStrategyIcon
        className={cn(
          'object-contain object-center shrink-0 w-6 aspect-square',
          document.location.pathname === '/bots-strategy' ? 'text-gray-100' : 'text-[#6F767E]'
        )}
      />
    ),
    canNavigate: true,
    href: '/bots-strategy',
    children: [],
  },
  {
    title: 'Trading Terminal',
    icon: (
      <TradingTerminalIcon
        className={cn(
          'object-contain object-center shrink-0 w-6 aspect-square',
          document.location.pathname === '/trading-terminal' ? 'text-gray-100' : 'text-[#6F767E]'
        )}
      />
    ),
    canNavigate: true,
    href: '/trading-terminal',
    children: [],
  },
  {
    title: 'Education',
    icon: (
      <EducationIcon
        className={cn(
          'object-contain object-center shrink-0 w-6 aspect-square',
          document.location.pathname === '/education' ? 'text-gray-100' : 'text-[#6F767E]'
        )}
      />
    ),
    canNavigate: true,
    href: '/education',
    children: [],
  },
  {
    title: 'Subcriptions',
    icon: (
      <SubcriptionsIcon
        className={cn(
          'object-contain object-center shrink-0 w-6 aspect-square',
          document.location.pathname === '/subcriptions' ? 'text-gray-100' : 'text-[#6F767E]'
        )}
      />
    ),
    canNavigate: true,
    href: '/subcriptions',
    children: [],
  },
]
