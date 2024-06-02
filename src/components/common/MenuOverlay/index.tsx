import Close from '@/components/shared/icons/Close'
import ShadowPremiumIcon from '@/components/shared/icons/ShadowPremium'
import { MENU } from '@/constant/menu'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { MenuDropdown } from './MenuDropdown'

const MenuOverlay = ({
  navbarOpen,
  setNavbarOpen,
}: {
  navbarOpen: boolean
  setNavbarOpen: (open: boolean) => void
}) => {
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
                src="/images/logo.svg"
                className="shrink-0 w-[28px]"
                alt="logo"
                width={28}
                height={30}
              />
            </div>
            <div>Boltrade</div>
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
              if (item.title === 'Feedback') {
                return (
                  <a
                    href={item.href}
                    className="flex cursor-pointer items-center gap-2 justify-center self-stretch px-3 py-2 whitespace-nowrap"
                    target="_blank"
                    key={item.title}
                  >
                    {item.title}
                  </a>
                )
              }
              const isActive = item.href === '/' ? true : false
              return item?.children?.length > 0 ? (
                <MenuDropdown
                  title={item.title}
                  isActive={isActive}
                  data={item.children}
                  key={item.title}
                  setNavbarOpen={setNavbarOpen}
                />
              ) : (
                <Link
                  className={cn(
                    'flex cursor-pointer items-center gap-2 justify-center self-stretch px-3 py-2 whitespace-nowrap',
                    isActive
                      ? 'rounded-3xl backdrop-blur-[50px] bg-white/20'
                      : '',
                  )}
                  onClick={() => setNavbarOpen(false)}
                  href={item.href}
                  key={item.title}
                >
                  {item.title}
                </Link>
              )
            })}
          </div>
        </div>
        <div className="w-full flex justify-center mt-4 pb-4">
          <div className="flex flex-col self-stretch p-4 rounded-3xl backdrop-blur-[32px] bg-neutral-07 shadow-[0px_-2px_16px_0px_rgba(123,61,187,0.40),0px_0px_14px_-4px_rgba(0,0,0,0.05),0px_32px_48px_-8px_rgba(0,0,0,0.10)] max-w-[802px]">
            <div className="flex gap-5 items-start pb-2.5 max-md:flex-wrap">
              <div className="flex flex-col flex-1 max-md:max-w-full">
                <div className="text-xl font-bold tracking-tight leading-8 text-white max-md:max-w-full">
                  TRY OUR PREMIUM FEATURES
                </div>
                <div className="mt-2.5 text-sm tracking-normal leading-5 text-gray-300 underline max-md:max-w-full">
                  Boltrade&apos;s PRO package is an investment to always stay
                  ahead of the game. PRO users have exclusive access to{' '}
                  <span className="font-bold underline">
                    special tools and data
                  </span>{' '}
                  that help them to make more informed decisions, and earn more.
                </div>
              </div>
              <div className="relative flex justify-center items-center">
                <Image
                  loading="lazy"
                  src="/images/premium.webp"
                  alt="premium"
                  width={91}
                  height={91}
                />
                <ShadowPremiumIcon className="absolute bottom-0" />
              </div>
            </div>
            <div className="button-gradient rounded-[20px] flex justify-center items-center px-6 py-2 w-full">
              See premium features
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default MenuOverlay
