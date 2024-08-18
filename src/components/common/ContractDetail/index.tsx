import ArrowDown from '@/components/shared/icons/ArowDown'
import Community from '@/components/shared/icons/Community'
import Copy from '@/components/shared/icons/Copy'
import Explorers from '@/components/shared/icons/Explorers'
import Info from '@/components/shared/icons/Info'
import Link from '@/components/shared/icons/Link'
import Metamask from '@/components/shared/icons/Metamask'
import OpenLink from '@/components/shared/icons/OpenLink'
import SourceCode from '@/components/shared/icons/SourceCode'
import Whitepaper from '@/components/shared/icons/Whitepaper'
import { TokenInfo } from '@/types/tokenInfo'
import Image from 'next/image'
import numeral from 'numeral'

export const ContractDetail = ({
  dataTokenInfo,
  address,
}: {
  dataTokenInfo?: TokenInfo
  address: string
}) => {
  return (
    <>
      <div className="text-sm leading-5 text-gray-300">Contract</div>
      <div className="mt-2 flex items-center justify-start gap-0 whitespace-nowrap text-gray-300">
        <div className="flex justify-center gap-2 rounded-s-lg bg-white bg-opacity-10 py-1 pl-2 pr-4 text-xs leading-4">
          <div className="flex justify-between gap-2">
            <Image
              alt="token"
              loading="lazy"
              src="/assets/icons/token/eth.png"
              className="aspect-square w-5"
              width={20}
              height={20}
            />
            <div className="my-auto grow">{`${address?.substring(
              0,
              6,
            )}...${address?.slice(-6)}`}</div>
          </div>
          <Copy />
          <Metamask />
          <Image
            loading="lazy"
            alt="gecko"
            width={19}
            height={19}
            src="/assets/icons/gecko-terminal.png"
            className="aspect-square w-[19px] self-start"
          />
        </div>
        <div className="aspect-[1.46] justify-center rounded-e-lg bg-neutral-dark-08 p-2 text-xs font-black leading-3">
          ...
        </div>
      </div>
      <div className="ml-0 mt-4 flex justify-start gap-1 whitespace-nowrap text-center text-xs leading-4 text-gray-300">
        <div className="flex gap-2 rounded-lg bg-white bg-opacity-10 px-2 py-1">
          <Link />
          <div>Website</div>
          <ArrowDown />
        </div>
        <div className="flex gap-2 rounded-lg bg-white bg-opacity-10 px-2 py-1">
          <Explorers />
          <div>Explorers</div>
          <ArrowDown />
        </div>
        <div className="flex gap-2 rounded-lg bg-white bg-opacity-10 px-2 py-1">
          <Community />
          <div>Community</div>
          <ArrowDown />
        </div>
      </div>
      <div className="ml-0 mt-1 flex justify-start gap-1 text-xs leading-4 text-gray-300">
        <div className="flex gap-2 rounded-lg bg-white bg-opacity-10 px-2 py-1">
          <SourceCode />
          <div>Source code</div>
          <OpenLink />
        </div>
        <div className="flex gap-2 whitespace-nowrap rounded-lg bg-white bg-opacity-10 px-2 py-1">
          <Whitepaper />
          <div>Whitepaper</div>
          <OpenLink />
        </div>
      </div>
      <div className="mt-4 self-start text-sm leading-5 text-gray-300">
        Tags
      </div>
      <div className="mt-2 flex flex-wrap gap-1 self-start whitespace-nowrap py-0.5 text-xs font-semibold leading-5 text-gray-300">
        {dataTokenInfo?.tags?.map((tag: string, index: number) => (
          <div
            key={index}
            className="justify-center rounded-[40px] bg-white bg-opacity-10 px-2 py-0.5"
          >
            {tag}
          </div>
        ))}
      </div>
      <div className="mt-4 flex w-full justify-between gap-5 whitespace-nowrap border-b border-solid border-b-gray-200 border-b-gray-200/10 py-2.5 text-sm leading-5">
        <div className="my-auto flex items-center gap-1.5 text-white text-opacity-60">
          <div className="grow">Market Cap </div>
          <Info />
        </div>
        <div className="text-right text-white">
          {numeral(dataTokenInfo?.market_cap).format('$0,0.[00000000]')}
        </div>
      </div>
      <div className="flex w-full justify-between gap-5 whitespace-nowrap border-b border-solid border-b-gray-200/10 py-3 text-sm leading-5">
        <div className="my-auto flex items-center gap-1.5 text-white text-opacity-60">
          <div className="grow">24 Hour Trading Vol </div>
          <Info />
        </div>
        <div className="text-right text-white">
          {numeral(dataTokenInfo?.volume_24h).format('$0,0.[00000000]')}
        </div>
      </div>
      <div className="flex w-full justify-between gap-5 border-b border-solid border-b-gray-200 border-b-gray-200/10 py-3 text-sm leading-5">
        <div className="my-auto flex items-center gap-4 text-white text-opacity-60">
          <div className="flex-auto">Circulating Supply </div>
          <Info />
        </div>
        <div className="text-right text-white">
          {numeral(dataTokenInfo?.circulating_supply).format('$0,0.[00000000]')}
        </div>
      </div>
      <div className="flex w-full justify-between gap-5 border-b border-solid border-b-gray-200 border-b-gray-200/10 py-3 text-sm leading-5">
        <div className="my-auto flex items-center justify-between gap-5 text-white text-opacity-60">
          <div>Total Supply </div>
          <Info />
        </div>
        <div className="text-right text-white">
          {numeral(dataTokenInfo?.total_supply).format('$0,0.[00000000]')}
        </div>
      </div>
      <div className="flex w-full justify-between gap-5 border-b border-solid border-b-gray-200 border-b-gray-200/10 py-3 text-sm leading-5">
        <div className="my-auto flex items-center justify-between gap-5 text-white text-opacity-60">
          <div>Max Supply </div>
          <Info />
        </div>
        <div className="text-right text-white">
          {numeral(dataTokenInfo?.max_supply).format('$0,0.[00000000]')}
        </div>
      </div>
      <div className="flex w-full justify-between gap-5 whitespace-nowrap pb-0.5 pt-2.5 text-sm leading-5">
        <div className="flex items-center gap-1.5 self-start text-white text-opacity-60">
          <div className="grow">Fully Diluted Valuation </div>
          <Info />
        </div>
        <div className="text-right text-white">
          {numeral(dataTokenInfo?.fully_diluted_valuation).format(
            '$0,0.[00000000]',
          )}
        </div>
      </div>
    </>
  )
}
