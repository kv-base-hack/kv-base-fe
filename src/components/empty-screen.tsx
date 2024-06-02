/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button'
import { IconArrow } from './shared/icons/IconArrow'
import Image from 'next/image'

const exampleMessages = [
  {
    heading: 'Make a analysis of SOL today',
    message: 'Make a analysis of SOL today',
  },
  {
    heading: 'What is going market today',
    message: 'What is going market today',
  },
  {
    heading: 'Technical analyst of SOL',
    message: 'Technical analyst of SOL',
  },
  {
    heading: 'What token Smart Money is buying now',
    message: 'What token Smart Money is buying now',
  },
  {
    heading: 'Token summary of SOL',
    message: 'Token summary of SOL',
  },
  {
    heading: 'What is the unsual activity on market now',
    message: 'What is the unsual activity on market now',
  },
]

export function EmptyScreen({
  submitMessage,
}: {
  submitMessage: (message: string) => void
}) {
  return (
    <div className="flex flex-col w-full h-full gap-4 bg-gradient-linear-1 shadow-chat-ai border border-b-0 border-white/10 backdrop-blur rounded-xl overflow-hidden py-8">
      <div className="flex items-center justify-center">
        <Image
          loading="lazy"
          src="/images/retro.png"
          className="w-[140px] h-[150px]"
          width={140}
          height={150}
          alt="bol-ai"
        />
      </div>
      <div className="flex flex-col items-center gap-4 px-4 md:px-8 md:gap-8 pb-5">
        <div className="flex flex-col gap-3">
          <h2 className="text-neutral-03 text-[32px] md:text-[48px] md:leading-[60px] text-center font-bold leading-[48px]">
            Welcome to Bol AI, your personal AI investment assistant
          </h2>
          <p className="text-[#D0D5DD] font-medium text-base md:text-xl text-center">
            Need suggestions about hot coins, market trends, trading strategies,
            technical analysis, smartmoney onchain analysis? I&apos;m here to
            help!
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 md:gap-x-8 w-full">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-3 bg-[#D6D9DC0D]/5 border border-[#343839] rounded-[20px] text-sm text-[#FEFEFE] font-normal flex items-center gap-4"
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
