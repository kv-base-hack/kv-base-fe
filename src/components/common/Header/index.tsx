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
    <div className="px-8 py-4 w-full">
      <div className="w-full flex items-center justify-between p-3 shadow-2xl bg-header max-md:flex-wrap max-md:px-5 rounded-[48px]">
        <Link href="/" className="flex items-center">
          <Image
            loading="lazy"
            src="/assets/images/logo.svg"
            className="shrink-0 w-[43px]"
            width={43}
            height={47}
            alt="logo"
          />
          <p className="text-[32px] leading-10 font-semibold font-sora hidden lg:block">
            Kaivest
          </p>
        </Link>

        <div className="items-center gap-1 whitespace-nowrap hidden xl:flex">
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
          <div className="flex gap-4 justify-between items-stretch shrink-0">
            <SelectChain size="lg" showName={false} />
          </div>
          <ButtonConnectWallet />
          <div className="bg-[#0080FF] flex items-center justify-center !rounded-full ">
            <div
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="flex xl:hidden overflow-visible w-8 h-8 lg:h-10 lg:w-10 justify-center rounded-full items-center"
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
        'text-sm font-semibold px-3 py-2 rounded-[48px] hover:bg-[#6f767e66] hover:text-neutral-01 transition-all duration-200 ease-in-out',
        isActive ? 'bg-[#6f767e66] text-neutral-01' : 'text-neutral-04',
      )}
    >
      {menu}
    </Link>
  )
}
