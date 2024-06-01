import KaichatAIAssistantIcon from '@/components/shared/icons/sidebar/KaichatAIAssistantIcon'
import SubcriptionsIcon from '@/components/shared/icons/sidebar/Subcriptions'
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

export const SIDEBAR_MENU = () => {
  return [
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
          icon: (
            <LeafTreeIcon className="object-contain object-center shrink-0 w-9 aspect-[0.75]" />
          ),
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
      ],
    },
    {
      title: 'Trading Signal',
      icon: (
        <TradingSignalIcon
          className={cn(
            'object-contain object-center shrink-0 w-6 aspect-square',
          )}
        />
      ),
      href: '/trading-signal/dashboard',
      children: [],
      canNavigate: true,
    },
    {
      title: 'Find Gems',
      icon: (
        <SubcriptionsIcon
          className={cn(
            'object-contain object-center shrink-0 w-6 aspect-square',
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
          )}
        />
      ),
      canNavigate: true,
      href: '/swap',
      children: [],
    },
  ]
}
