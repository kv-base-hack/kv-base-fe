import { chainAtom } from '@/atom/chain'
import Close from '@/components/shared/icons/Close'
import { cn } from '@/lib/utils'
import { useAtomValue } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MenuOverlay = ({
  navbarOpen,
  setNavbarOpen,
}: {
  navbarOpen: boolean
  setNavbarOpen: (open: boolean) => void
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
    <nav
      className={`fixed overflow-y-auto !z-[9999] flex top-0 left-0 w-screen shadow-lg h-screen backdrop-blur-[20px] bg-neutral-07/50  text-white transform delay-100 transition-all duration-300 ${
        navbarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
      }`}
    >
      <div className="flex flex-col self-stretch px-4 py-2 w-full">
        <div className="flex gap-3 justify-between px-3 w-full text-3xl leading-10 text-white whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
          <Link
            href="/"
            className="cursor-pointer flex items-center gap-2 my-auto text-3xl leading-10 text-white whitespace-nowrap"
          >
            <div className="w-[28px] h-[30px]">
              <Image
                loading="lazy"
                src="/assets/images/logo.svg"
                className="shrink-0 w-[36px]"
                alt="logo"
                width={36}
                height={40}
              />
            </div>
            <div>Kaivest</div>
          </Link>
          <Close
            onclick={() => setNavbarOpen(!navbarOpen)}
            className="cursor-pointer shrink-0 my-auto w-8 aspect-square"
          />
        </div>
        <div className="shrink-0 mt-4 h-px rounded-sm bg-white bg-opacity-10 max-md:max-w-full" />
        <div className="flex justify-center items-center px-4 py-2 mt-4 text-base font-medium leading-6 text-center text-white rounded-2xl max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col gap-2 items-center max-w-full w-[165px]">
            {MENU.map((item) => {
              const isActive = pathname.includes(item.url?.split('?')[0])
              return (
                <Link
                  className={cn(
                    'flex cursor-pointer items-center gap-2 justify-center self-stretch px-3 py-2 whitespace-nowrap',
                    isActive
                      ? 'rounded-3xl backdrop-blur-[50px] bg-white/20'
                      : '',
                  )}
                  onClick={() => setNavbarOpen(false)}
                  href={item.url}
                  key={item.menu}
                >
                  {item.menu}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default MenuOverlay
