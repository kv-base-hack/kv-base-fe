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
      url: '/smart-traders',
      menu: 'Smart Traders',
    },
    {
      url: '/find-gems',
      menu: 'Find Gems',
    },
    {
      url: '/activity',
      menu: 'Activity',
    },

    {
      url: '/kaichat',
      menu: 'Kaichat',
    },
  ]
  return (
    <nav
      className={`fixed left-0 top-0 !z-[9999] flex h-screen w-screen transform overflow-y-auto bg-neutral-07/50 text-white shadow-lg backdrop-blur-[20px] transition-all delay-100 duration-300 ${
        navbarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}
    >
      <div className="flex w-full flex-col self-stretch px-4 py-2">
        <div className="flex w-full justify-between gap-3 whitespace-nowrap px-3 text-3xl leading-10 text-white max-md:max-w-full max-md:flex-wrap">
          <Link
            href="/"
            className="my-auto flex cursor-pointer items-center gap-2 whitespace-nowrap text-3xl leading-10 text-white"
          >
            <div className="h-[30px] w-[28px]">
              <Image
                loading="lazy"
                src="/assets/images/logo.svg"
                className="w-[36px] shrink-0"
                alt="logo"
                width={36}
                height={40}
              />
            </div>
            <div>Kaivest</div>
          </Link>
          <Close
            onclick={() => setNavbarOpen(!navbarOpen)}
            className="my-auto aspect-square w-8 shrink-0 cursor-pointer"
          />
        </div>
        <div className="mt-4 h-px shrink-0 rounded-sm bg-white bg-opacity-10 max-md:max-w-full" />
        <div className="mt-4 flex items-center justify-center rounded-2xl px-4 py-2 text-center text-base font-medium leading-6 text-white max-md:max-w-full max-md:px-5">
          <div className="flex w-[165px] max-w-full flex-col items-center gap-2">
            {MENU.map((item) => {
              const isActive = pathname.includes(item.url?.split('?')[0])
              return (
                <Link
                  className={cn(
                    'flex cursor-pointer items-center justify-center gap-2 self-stretch whitespace-nowrap px-3 py-2',
                    isActive
                      ? 'rounded-3xl bg-white/20 backdrop-blur-[50px]'
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
