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
      <div className="flex gap-0 items-center justify-start mt-2 text-gray-300 whitespace-nowrap">
        <div className="flex gap-2 justify-center py-1 pl-2 pr-4 text-xs leading-4 rounded-s-lg bg-white bg-opacity-10">
          <div className="flex gap-2 justify-between">
            <Image
              alt="token"
              loading="lazy"
              src="/assets/icons/token/eth.png"
              className="w-5 aspect-square"
              width={20}
              height={20}
            />
            <div className="grow my-auto">{`${address?.substring(0, 6)}...${address?.slice(
              -6
            )}`}</div>
          </div>
          <Copy />
          <Metamask />
          <Image
            loading="lazy"
            alt="gecko"
            width={19}
            height={19}
            src="/assets/icons/gecko-terminal.png"
            className="self-start aspect-square w-[19px]"
          />
        </div>
        <div className="justify-center p-2 text-xs font-black leading-3 rounded-e-lg aspect-[1.46] bg-neutral-dark-08">
          ...
        </div>
      </div>
      <div className="flex justify-start gap-1 mt-4 ml-0 text-xs leading-4 text-center text-gray-300 whitespace-nowrap">
        <div className="flex gap-2 px-2 py-1 rounded-lg bg-white bg-opacity-10">
          <Link />
          <div>Website</div>
          <ArrowDown />
        </div>
        <div className="flex gap-2 px-2 py-1 rounded-lg bg-white bg-opacity-10">
          <Explorers />
          <div>Explorers</div>
          <ArrowDown />
        </div>
        <div className="flex gap-2 px-2 py-1 rounded-lg bg-white bg-opacity-10">
          <Community />
          <div>Community</div>
          <ArrowDown />
        </div>
      </div>
      <div className="flex gap-1 justify-start mt-1 ml-0 text-xs leading-4 text-gray-300">
        <div className="flex gap-2 py-1 px-2 rounded-lg bg-white bg-opacity-10">
          <SourceCode />
          <div>Source code</div>
          <OpenLink />
        </div>
        <div className="flex gap-2 py-1 px-2 whitespace-nowrap rounded-lg bg-white bg-opacity-10">
          <Whitepaper />
          <div>Whitepaper</div>
          <OpenLink />
        </div>
      </div>
      <div className="self-start mt-4 text-sm leading-5 text-gray-300">Tags</div>
      <div className="flex flex-wrap gap-1 self-start py-0.5 mt-2 text-xs font-semibold leading-5 text-gray-300 whitespace-nowrap">
        {dataTokenInfo?.tags?.map((tag, index) => (
          <div
            key={index}
            className="justify-center px-2 py-0.5 bg-white bg-opacity-10 rounded-[40px]">
            {tag}
          </div>
        ))}
      </div>
      <div className="flex gap-5 justify-between py-2.5 mt-4 w-full text-sm leading-5 whitespace-nowrap border-b border-solid border-b-gray-200 border-b-gray-200/10">
        <div className="flex gap-1.5 items-center my-auto text-white text-opacity-60">
          <div className="grow">Market Cap </div>
          <Info />
        </div>
        <div className="text-right text-white">
          {numeral(dataTokenInfo?.market_cap).format('$0,0.[00000000]')}
        </div>
      </div>
      <div className="flex gap-5 justify-between py-3 w-full text-sm leading-5 whitespace-nowrap border-b border-solid border-b-gray-200/10">
        <div className="flex gap-1.5 items-center my-auto text-white text-opacity-60">
          <div className="grow">24 Hour Trading Vol </div>
          <Info />
        </div>
        <div className="text-right text-white">
          {numeral(dataTokenInfo?.volume_24h).format('$0,0.[00000000]')}
        </div>
      </div>
      <div className="flex gap-5 justify-between py-3 w-full text-sm leading-5 border-b border-solid border-b-gray-200 border-b-gray-200/10">
        <div className="flex gap-4 items-center my-auto text-white text-opacity-60">
          <div className="flex-auto">Circulating Supply </div>
          <Info />
        </div>
        <div className="text-right text-white">
          {numeral(dataTokenInfo?.circulating_supply).format('$0,0.[00000000]')}
        </div>
      </div>
      <div className="flex gap-5 justify-between py-3 w-full text-sm leading-5 border-b border-solid border-b-gray-200 border-b-gray-200/10">
        <div className="flex gap-5 items-center justify-between my-auto text-white text-opacity-60">
          <div>Total Supply </div>
          <Info />
        </div>
        <div className="text-right text-white">
          {numeral(dataTokenInfo?.total_supply).format('$0,0.[00000000]')}
        </div>
      </div>
      <div className="flex gap-5 justify-between py-3 w-full text-sm leading-5 border-b border-solid border-b-gray-200 border-b-gray-200/10">
        <div className="flex gap-5 items-center justify-between my-auto text-white text-opacity-60">
          <div>Max Supply </div>
          <Info />
        </div>
        <div className="text-right text-white">
          {numeral(dataTokenInfo?.max_supply).format('$0,0.[00000000]')}
        </div>
      </div>
      <div className="flex gap-5 justify-between pt-2.5 pb-0.5 w-full text-sm leading-5 whitespace-nowrap">
        <div className="flex gap-1.5 items-center self-start text-white text-opacity-60">
          <div className="grow">Fully Diluted Valuation </div>
          <Info />
        </div>
        <div className="text-right text-white">
          {numeral(dataTokenInfo?.fully_diluted_valuation).format('$0,0.[00000000]')}
        </div>
      </div>
    </>
  )
}
