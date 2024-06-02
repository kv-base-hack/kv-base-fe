import MagicIcon from '@/components/shared/icons/MagicIcon'
import Image from 'next/image'
import Link from 'next/link'

export const Banner = () => {
  return (
    <div className="flex flex-col justify-center self-stretch rounded-lg border border-solid border-white/10 bg-gradient-to-r from-[#9945FF]/40 to-[#14F195]/40 w-full">
      <div className="justify-center max-md:px-4 max-md:max-w-full rounded-lg">
        <div className="flex max-md:flex-col max-md:gap-0">
          <div className="flex flex-col items-center lg:items-start py-3 pl-4 w-1/2 relative">
            <Image
              loading="lazy"
              src="/images/banner.webp"
              className="lg:w-full lg:h-full object-fill"
              width={125}
              height={125}
              alt="banner"
            />
          </div>
          <div className="flex flex-col w-1/2 relative overflow-hidden">
            <div className="flex flex-col pr-4 justify-center self-stretch my-auto text-base max-md:mt-9 max-md:max-w-full">
              <div className="tracking-normal leading-6 text-center text-violet-100 max-md:max-w-full">
                Hi BOL AI, please help me summarize recent major events and
                market perspectives of this token
              </div>
              <div className="flex cursor-pointer flex-col justify-center self-center px-4 py-2 mt-4 max-w-full font-medium text-white rounded-3xl border border-solid shadow-lg backdrop-blur-[2px] bg-[linear-gradient(80deg,#9945FF_0%,#14F195_100%)] border-violet-200 border-opacity-10 leading-[150%] w-[219px]">
                <Link href="/ai" className="flex gap-2 justify-center">
                  <div className="whitespace-nowrap">BOL AI Analyst Token</div>
                  <MagicIcon />
                </Link>
              </div>
            </div>
            <Image
              loading="lazy"
              src="/images/bot-bg.webp"
              className="absolute w-full lg:-bottom-1/2 lg:-right-1/2 object-contain"
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
