import MagicIcon from '@/components/shared/icons/MagicIcon'
import Image from 'next/image'
import Link from 'next/link'

export const Banner = () => {
  return (
    <div className="flex w-full flex-col justify-center self-stretch rounded-lg border border-solid border-white/10 bg-gradient-to-r from-[#9945FF]/40 to-[#14F195]/40">
      <div className="justify-center rounded-lg max-md:max-w-full max-md:px-4">
        <div className="flex max-md:flex-col max-md:gap-0">
          <div className="relative flex w-1/2 flex-col items-center py-3 pl-4 lg:items-start">
            <Image
              loading="lazy"
              src="/images/banner.webp"
              className="object-fill lg:h-full lg:w-full"
              width={125}
              height={125}
              alt="banner"
            />
          </div>
          <div className="relative flex w-1/2 flex-col overflow-hidden">
            <div className="my-auto flex flex-col justify-center self-stretch pr-4 text-base max-md:mt-9 max-md:max-w-full">
              <div className="text-center leading-6 tracking-normal text-violet-100 max-md:max-w-full">
                Hi KAI AI, please help me summarize recent major events and
                market perspectives of this token
              </div>
              <div className="mt-4 flex w-[219px] max-w-full cursor-pointer flex-col justify-center self-center rounded-3xl border border-solid border-violet-200 border-opacity-10 bg-[linear-gradient(80deg,#9945FF_0%,#14F195_100%)] px-4 py-2 font-medium leading-[150%] text-white shadow-lg backdrop-blur-[2px]">
                <Link href="/ai" className="flex justify-center gap-2">
                  <div className="whitespace-nowrap">KAI AI Analyst Token</div>
                  <MagicIcon />
                </Link>
              </div>
            </div>
            <Image
              loading="lazy"
              src="/images/bot-bg.webp"
              className="absolute w-full object-contain lg:-bottom-1/2 lg:-right-1/2"
              width={125}
              height={125}
              alt="bot"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
