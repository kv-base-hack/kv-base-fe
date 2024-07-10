/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button'
import { IconArrow } from './shared/icons/IconArrow'
import { cn } from '@/lib/utils'

const exampleMessages = [
  {
    heading: 'Onchain analyst of ETH',
    message: 'Onchain analyst of ETH',
  },
  {
    heading: 'News Analysic of market today',
    message: 'News Analysic of market today',
  },
  {
    heading: 'Technical analyst of ETH in 1h timeframe',
    message: 'Technical analyst of ETH in 1h timeframe',
  },
  {
    heading: 'Whitepaper Analysis of LDO',
    message: 'Whitepaper Analysis of LDO',
  },
  {
    heading: 'What tokens I should buy now?',
    message: 'What tokens I should buy now?',
  },
  {
    heading: 'Analyze wallet 0xb0ba33566bd1ddd1f0e9',
    message: 'Analyze wallet 0xb0ba33566bd1ddd1f0e9',
  },
]

const messageColor = [
  {
    heading: 'Tokenomic Analysis',
    message: 'Tokenomic Analysis',
  },
  {
    heading: 'Onchain Analysis',
    message: 'Onchain Analysis',
  },
  {
    heading: 'Technical Analysis',
    message: 'Technical Analysis',
  },
  {
    heading: 'Whitepaper Analysis (Coming soon)',
    message: 'Whitepaper Analysis',
  },
]

export function EmptyScreen({
  submitMessage,
}: {
  submitMessage: (message: string) => void
}) {
  return (
    <div className="flex flex-col gap-6 h-full p-4 overflow-auto">
      <div className="flex flex-col gap-4 px-4 md:px-8 md:gap-8 pb-5">
        <div className="flex flex-col gap-[30px]">
          <h2 className="text-neutral-07 text-[32px] md:text-[48px] font-bold leading-[48px]">
            Welcome To Kaichat,
            <p className="text-neutral-04">
              your personal AI investment assistant
            </p>
          </h2>
          <p className="text-neutral-07 font-medium text-xl md:text-xl ">
            Need suggestions about hot coins, market trends, trading strategies,
            technical analysis, smartmoney onchain analysis? I&apos;m here to
            help!
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
          {messageColor.map((message, index) => (
            <div
              key={index}
              className={cn(
                'h-auto p-3 border border-[#EFEFEF] rounded-[20px] text-neutral-07 text-lg font-bold flex items-center gap-4 relative',
                index === 0
                  ? 'bg-[#FFF6EB]'
                  : index === 1
                  ? 'bg-[#DFF9E8]'
                  : index === 2
                  ? 'bg-[#F5EDFA]'
                  : 'bg-[#c8dcf7]',
                message.message === 'Whitepaper Analysis',
              )}
              onClick={async () => {
                submitMessage(message.message)
              }}
            >
              <div
                className={cn(
                  'p-2 rounded-xl',
                  index === 0
                    ? 'bg-[#FBA94B]'
                    : index === 1
                    ? 'bg-[#32AE60]'
                    : index === 2
                    ? 'bg-[#B981DA]'
                    : 'bg-[#0C68E9]',
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15.5 3.5V2M19.4393 4.56066L20.5 3.5M20.5103 8.5H22.0103M21.9506 13C21.4489 18.0533 17.1853 22 12 22C6.47715 22 2 17.5228 2 12C2 6.81465 5.94668 2.5511 11 2.04938M12 8H16V12M15.6197 8C13.2653 11.3276 9.38636 13.5 5 13.5C3.9971 13.5 3.02072 13.3864 2.08302 13.1715"
                    stroke="#1A1D1F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="line-clamp-2 md:line-clamp-1 text-left w-full">
                {message.heading}
              </div>
              <div
                className={cn(
                  'w-full h-full absolute bg-[#EEE]/60 rounded-[20px] z-10 cursor-not-allowed right-[0.5px]',
                  message.message === 'Whitepaper Analysis'
                    ? 'visible'
                    : 'hidden',
                )}
              ></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-4 md:gap-x-8 w-full">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-3 border-[#EFEFEF] border bg-neutral-01 rounded-[20px] text-sm text-neutral-07 text-[15px] leading-6 font-normal flex items-center gap-4"
              onClick={async () => {
                submitMessage(message.message)
              }}
            >
              <div className="line-clamp-2 md:line-clamp-1 text-left w-full">
                {message.heading}
              </div>
              <div className="">
                <IconArrow className="hidden md:block" />
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
