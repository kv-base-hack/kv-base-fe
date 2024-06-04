import { SelectChain } from '@/components/common/SelectChain'
import SearchIcon from '@/components/shared/icons/SearchIcon'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ButtonConnectWallet } from '../ConnectWallet'
import { ConnectButton } from '@suiet/wallet-kit'
import { ConnectSuiWalletButton } from '../ConnectWalletButton'

const MENU = [
  {
    url: '/smartmoney-onchain/dashboard',
    menu: 'Dashboard',
  },
  {
    url: '/find-gems',
    menu: 'Find Gems',
  },
  {
    url: '/trading-signal',
    menu: 'Trading Signal',
  },
  {
    url: '/tracking',
    menu: 'Tracking',
  },
  {
    url: '/leaderboard',
    menu: 'Leaderboard',
  },
  {
    url: '/kaichat',
    menu: 'Kaichat',
  },
]

export const Header = () => {
  const pathname = usePathname()

  return (
    <div className="px-8 py-4 w-full z-[9999] fixed">
      <div className="w-full flex  items-center justify-between p-3 shadow-2xl bg-neutral-07 max-md:flex-wrap max-md:px-5 rounded-[48px]">
        <Link href="/" className="flex items-center gap-1">
          <Image
            loading="lazy"
            src="/assets/images/logo.svg"
            className="shrink-0 w-[43px]"
            width={43}
            height={47}
            alt="logo"
          />
          <p className="text-[32px] leading-10 font-semibold font-sora">
            Kaivest
          </p>
        </Link>

        <div className="flex items-center gap-1">
          {MENU.map((i) => {
            const isActive = pathname.includes(i.url)
            return (
              <MenuItem
                key={i.url}
                url={i.url}
                menu={i.menu}
                isActive={isActive}
              />
            )
          })}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-0 justify-between items-stretch text-base leading-6 whitespace-nowrap">
            <div className="flex flex-col justify-center py-2 text-base font-semibold tracking-normal leading-6 text-neutral-04 rounded-xl border border-solid shadow-lg backdrop-blur-lg bg-white/5 bg-opacity-10 border-white/10 min-w-[380px]">
              <div className="flex gap-3 px-5">
                <SearchIcon />
                <input
                  className="flex flex-1 bg-transparent w-full border-none outline-none text-neutral-01"
                  placeholder="Search wallets, tokens or contract ..."
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-between items-stretch">
            <SelectChain size="lg" showName={false} />
          </div>
          <ConnectSuiWalletButton />
        </div>
      </div>
    </div>
  )
}

const MenuItem = ({
  menu,
  url,
  isActive,
}: {
  menu: string
  url: string
  isActive: boolean
}) => {
  return (
    <Link
      href={url}
      className={cn(
        'text-sm font-semibold px-4 py-2 rounded-[48px] hover:bg-[#6f767e66] hover:text-neutral-01 transition-all duration-200 ease-in-out',
        isActive ? 'bg-[#6f767e66] text-neutral-01' : 'text-neutral-04',
      )}
    >
      {menu}
    </Link>
  )
}
