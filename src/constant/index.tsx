// import HomeIcon from '@/components/shared/icons/sidebar/HomeIcon'
// import PortfolioIcon from '@/components/shared/icons/sidebar/PortfolioIcon'
import KaichatAIAssistantIcon from '@/components/shared/icons/sidebar/KaichatAIAssistantIcon'
// import EducationIcon from '@/components/shared/icons/sidebar/EducationIcon'
// import MarketIcon from '@/components/shared/icons/sidebar/MarketIcon'
import SubcriptionsIcon from '@/components/shared/icons/sidebar/Subcriptions'
// import TradingTerminalIcon from '@/components/shared/icons/sidebar/TradingTerminal'
// import AcademyIcon from '@/components/shared/icons/sidebar/AcademyIcon'
import LeafTreeIcon from '@/components/shared/icons/sidebar/LeafTreeIcon'
import LeafTreeLastIcon from '@/components/shared/icons/sidebar/LeafTreeLastIcon'
import SmartmoneyOnchainIcon from '@/components/shared/icons/sidebar/SmartmoneyOnchainIcon'
import SwapIcon from '@/components/shared/icons/sidebar/SwapIcon'
import { cn } from '@/lib/utils'
import TradingSignalIcon from '@/components/shared/icons/sidebar/TradingSignalIcon'

export type ISidebarMenu = {
  title: string
  icon: JSX.Element
  href: string
  children: ISidebarMenu[]
  canNavigate: boolean | true
}

export const SIDEBAR_MENU = () => [
  // {
  //   title: 'Dashboard',
  //   icon: (
  //     <HomeIcon
  //       className={cn(
  //         'object-contain object-center shrink-0 w-6 aspect-square',
  //         document.location.pathname === '/' ? 'text-gray-100' : 'text-[#6F767E]'
  //       )}
  //     />
  //   ),
  //   href: '/dashboard',
  //   children: [],
  //   canNavigate: true,
  // },
  // {
  //   title: 'My Portfolio',
  //   icon: (
  //     <PortfolioIcon
  //       className={cn(
  //         'object-contain object-center shrink-0 w-6 aspect-square',
  //         document.location.pathname === '/my-portfolio' ? 'text-gray-100' : 'text-[#6F767E]'
  //       )}
  //     />
  //   ),
  //   href: '/my-portfolio',
  //   children: [],
  //   canNavigate: true,
  // },
  {
    title: 'Smartmoney Onchain',
    icon: (
      <SmartmoneyOnchainIcon className="object-contain object-center shrink-0 w-6 aspect-square" />
    ),
    href: '/smartmoney-onchain',
    canNavigate: false,
    children: [
      {
        title: 'Dashboard',
        icon: <LeafTreeIcon className="object-contain object-center shrink-0 w-9 aspect-[0.75]" />,
        href: '/smartmoney-onchain/onchain-signals',
        children: [],
        canNavigate: true,
      },
      {
        title: 'Leaderboard',
        icon: (
          <LeafTreeLastIcon className="object-contain object-center shrink-0 w-9 aspect-[0.75]" />
        ),
        href: '/smartmoney-onchain/leaderboard',
        children: [],
        canNavigate: true,
      },
      // {
      //   title: 'Token Explorer',
      //   icon: <LeafTreeIcon className="object-contain object-center shrink-0 w-9 aspect-[0.75]" />,
      //   href: '/smartmoney-onchain/token-explorer',
      //   children: [],
      //   canNavigate: true,
      // },
      // {
      //   title: 'Wallet Explorer',
      //   icon: (
      //     <LeafTreeLastIcon className="object-contain object-center shrink-0 w-9 aspect-[0.75]" />
      //   ),
      //   href: '/smartmoney-onchain/wallet-explorer',
      //   children: [],
      //   canNavigate: true,
      // },
    ],
  },
  // {
  //   title: 'Market',
  //   icon: (
  //     <MarketIcon
  //       className={cn(
  //         'object-contain object-center shrink-0 w-6 aspect-square',
  //         document.location.pathname === '/market' ? 'text-gray-100' : 'text-[#6F767E]'
  //       )}
  //     />
  //   ),
  //   canNavigate: true,
  //   href: '/market',
  //   children: [],
  // },
  {
    title: 'Trading Signal',
    icon: (
      <TradingSignalIcon
        className={cn(
          'object-contain object-center shrink-0 w-6 aspect-square',
          document.location.pathname === '/trading-signal' ? 'text-gray-100' : 'text-[#6F767E]'
        )}
      />
    ),
    href: '/trading-signal',
    children: [],
    canNavigate: true,
  },
  // {
  //   title: 'Academy',
  //   icon: <AcademyIcon className="object-contain object-center shrink-0 w-6 aspect-square" />,
  //   href: '/academy',
  //   canNavigate: false,
  //   children: [
  //     {
  //       title: 'Articles',
  //       icon: <LeafTreeIcon className="object-contain object-center shrink-0 w-9 aspect-[0.75]" />,
  //       href: '/academy/articles',
  //       children: [],
  //       canNavigate: true,
  //     },
  //     {
  //       title: 'Courses',
  //       icon: (
  //         <LeafTreeLastIcon className="object-contain object-center shrink-0 w-9 aspect-[0.75]" />
  //       ),
  //       href: '/academy/courses',
  //       children: [],
  //       canNavigate: true,
  //     },
  //   ],
  // },
  {
    title: 'Find Gems',
    icon: (
      <SubcriptionsIcon
        className={cn(
          'object-contain object-center shrink-0 w-6 aspect-square',
          document.location.pathname === '/find-gems' ? 'text-gray-100' : 'text-[#6F767E]'
        )}
      />
    ),
    canNavigate: true,
    href: '/find-gems',
    children: [],
  },
  {
    title: 'Kaichat - AI Assistant',
    icon: (
      <KaichatAIAssistantIcon
        className={cn(
          'object-contain object-center shrink-0 w-6 aspect-square',
          document.location.pathname === '/kaichat-ai-assistant'
            ? 'text-gray-100'
            : 'text-[#6F767E]'
        )}
      />
    ),
    canNavigate: true,
    href: '/kaichat-ai-assistant',
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
  // {
  //   title: 'Trading Terminal',
  //   icon: (
  //     <TradingTerminalIcon
  //       className={cn(
  //         'object-contain object-center shrink-0 w-6 aspect-square',
  //         document.location.pathname === '/trading-terminal' ? 'text-gray-100' : 'text-[#6F767E]'
  //       )}
  //     />
  //   ),
  //   canNavigate: true,
  //   href: '/trading-terminal',
  //   children: [],
  // },
  // {
  //   title: 'Education',
  //   icon: (
  //     <EducationIcon
  //       className={cn(
  //         'object-contain object-center shrink-0 w-6 aspect-square',
  //         document.location.pathname === '/education' ? 'text-gray-100' : 'text-[#6F767E]'
  //       )}
  //     />
  //   ),
  //   canNavigate: true,
  //   href: '/education',
  //   children: [],
  // },
]
