import { SelectChain } from '@/components/common/SelectChain'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SearchComp } from '../Search'
import MenuIcon from '@/components/shared/icons/onchain/MenuIcon'
import { ButtonConnectWallet } from '../ConnectWallet'
import { useAtomValue } from 'jotai'
import { chainAtom } from '@/atom/chain'
import { Suspense } from 'react'

export const Header = ({
  navbarOpen,
  setNavbarOpen,
}: {
  navbarOpen: boolean
  setNavbarOpen: (value: boolean) => void
}) => {
  const pathname = usePathname()
  const CHAIN = useAtomValue(chainAtom)

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
      url: `/trading-signal?chain=${CHAIN}`,
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

  return (
    <div className="w-full px-8 py-4">
      <div className="flex w-full items-center justify-between rounded-[48px] bg-header p-3 shadow-2xl max-md:flex-wrap max-md:px-5">
        <Link href="/" className="flex items-center">
          <Image
            loading="lazy"
            src="/assets/images/logo.svg"
            className="w-[43px] shrink-0"
            width={43}
            height={47}
            alt="logo"
          />
          <p className="font-sora hidden text-[32px] font-semibold leading-10 lg:block">
            Kaivest
          </p>
        </Link>

        <div className="hidden items-center gap-1 whitespace-nowrap xl:flex">
          {MENU.map((i) => {
            const isActive = pathname.includes(i.url?.split('?')[0])
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

        <div className="flex items-center justify-end gap-4">
          <SearchComp />
          <div className="flex shrink-0 items-stretch justify-between gap-4">
            <Suspense fallback={<div>Loading...</div>}>
              <SelectChain size="lg" showName={false} />
            </Suspense>
          </div>
          <ButtonConnectWallet />
          <div className="flex items-center justify-center !rounded-full bg-[#0080FF]">
            <div
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="flex h-8 w-8 items-center justify-center overflow-visible rounded-full lg:h-10 lg:w-10 xl:hidden"
              role="button"
            >
              <MenuIcon />
            </div>
          </div>
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
        'rounded-[48px] px-3 py-2 text-sm font-semibold transition-all duration-200 ease-in-out hover:bg-[#6f767e66] hover:text-neutral-01',
        isActive ? 'bg-[#6f767e66] text-neutral-01' : 'text-neutral-04',
      )}
    >
      {menu}
    </Link>
  )
}
