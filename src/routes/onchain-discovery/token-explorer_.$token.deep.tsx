import { LineChart } from '@/components/common/ChartDetail/LineChart'
import { GroupHeader } from '@/components/common/GroupHeader'
import { SelectChain } from '@/components/common/SelectChain'
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
import { cn } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

export const Route = createFileRoute('/onchain-discovery/token-explorer/$token/deep')({
  component: TokenExplorerDetail,
})

const DUMMY = [
  [1700582400, 1.2820760583722837],
  [1700596800, 1.293678752367937],
  [1700611200, 1.267607134722679],
  [1700625600, 1.2383452159168096],
  [1700640000, 1.2713647267275487],
  [1700654400, 1.2849299222571455],
  [1700668800, 1.2812792112861628],
  [1700683200, 1.285411599501722],
  [1700697600, 1.304992187923194],
  [1700712000, 1.3025387325266873],
  [1700726400, 1.3101804211155927],
  [1700740800, 1.3364311866861343],
  [1700755200, 1.3574309481187357],
  [1700769600, 1.3420127842033551],
  [1700784000, 1.3613067184270784],
  [1700798400, 1.3632495568806504],
  [1700812800, 1.3694888962263747],
  [1700827200, 1.3761433222446537],
  [1700841600, 1.3878710860154058],
  [1700856000, 1.4008211214315036],
  [1700870400, 1.3716115965345537],
  [1700884800, 1.366702161216628],
  [1700899200, 1.3818821947181688],
  [1700913600, 1.3814228210891752],
  [1700928000, 1.3573893566747037],
  [1700942400, 1.365540065327867],
  [1700956800, 1.3677196547919548],
  [1700971200, 1.3684873657780736],
  [1700985600, 1.367661884521799],
  [1701000000, 1.378807753589557],
  [1701014400, 1.371757678574763],
  [1701028800, 1.3549718023010506],
  [1701043200, 1.3597396116316751],
  [1701057600, 1.3689482638454455],
  [1701072000, 1.3459421066735182],
  [1701086400, 1.329871889398035],
  [1701100800, 1.3196045314155003],
  [1701115200, 1.309947025324972],
  [1701129600, 1.2978960445684065],
  [1701144000, 1.3226601297295046],
  [1701158400, 1.3206287657374929],
  [1701172800, 1.3115544795935061],
  [1701187200, 1.3333333333333333],
]

function TokenExplorerDetail() {
  const [mode, setMode] = useState('1d')
  const [tab, setTabs] = useState('onchain')

  const handleChangeTab = (tab: string) => () => {
    setTabs(tab)
  }

  const handleModeChange = useCallback((mode: string) => {
    setMode(mode)
  }, [])

  return (
    <div className="w-full h-full">
      <GroupHeader className="mt-4 mx-10" title="Token Explorer" desc="">
        <SelectChain name="ETH" />
      </GroupHeader>
      <div className="mx-10 mt-4 flex items-start gap-4 mb-4">
        <div className="w-7/12 h-full shadow-2xl backdrop-blur-lg bg-neutral-07/50 border-white/10">
          <LineChart
            mode={mode}
            sparkLineIn7D={DUMMY}
            onModeChange={handleModeChange}
            value={345.29}
            loading={false}
          />
        </div>
        <div className="flex flex-col justify-start self-stretch p-6 rounded-lg border border-solid shadow-2xl backdrop-blur-lg bg-neutral-07/50 border-white/10 w-5/12">
          <div className="text-sm leading-5 text-gray-300">Contract</div>
          <div className="flex gap-0 items-center justify-start mt-2 text-gray-300 whitespace-nowrap">
            <div className="flex gap-2 justify-center py-1 pl-2 pr-4 text-xs leading-4 rounded-s-lg bg-white bg-opacity-10">
              <div className="flex gap-2 justify-between">
                <img
                  loading="lazy"
                  srcSet="/assets/icons/token/eth.png"
                  className="w-5 aspect-square"
                />
                <div className="grow my-auto">0x698...311933</div>
              </div>
              <Copy />
              <Metamask />
              <img
                loading="lazy"
                src="/assets/icons/gecko-terminal.png"
                className="self-start aspect-square w-[19px]"
              />
            </div>
            <div className="justify-center p-2 text-xs font-black leading-3 rounded-e-lg aspect-[1.46] bg-zinc-600">
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
          <div className="flex gap-1 self-start py-0.5 mt-2 text-xs font-semibold leading-5 text-gray-300 whitespace-nowrap">
            <div className="justify-center px-2 py-0.5 aspect-[1.86] bg-white bg-opacity-10 rounded-[40px]">
              LPoS
            </div>
            <div className="justify-center px-2 py-0.5 aspect-[2.68] bg-white bg-opacity-10 rounded-[40px]">
              Platform
            </div>
            <div className="grow justify-center px-2 py-0.5 bg-white bg-opacity-10 rounded-[40px]">
              Smart Contracts
            </div>
          </div>
          <div className="flex gap-5 justify-between py-2.5 mt-4 w-full text-sm leading-5 whitespace-nowrap border-b border-solid border-b-gray-200 border-b-gray-200/10">
            <div className="flex gap-1.5 my-auto text-white text-opacity-60">
              <div className="grow">Market Cap </div>
              <Info />
            </div>
            <div className="text-right text-white">$237,975,500</div>
          </div>
          <div className="flex gap-5 justify-between py-3 w-full text-sm leading-5 whitespace-nowrap border-b border-solid border-b-gray-200/10">
            <div className="flex gap-1.5 my-auto text-white text-opacity-60">
              <div className="grow">24 Hour Trading Vol </div>
              <Info />
            </div>
            <div className="text-right text-white">$365,028,275</div>
          </div>
          <div className="flex gap-5 justify-between py-3 w-full text-sm leading-5 border-b border-solid border-b-gray-200 border-b-gray-200/10">
            <div className="flex gap-4 my-auto text-white text-opacity-60">
              <div className="flex-auto">Circulating Supply </div>
              <Info />
            </div>
            <div className="text-right text-white">$365,028,275</div>
          </div>
          <div className="flex gap-5 justify-between py-3 w-full text-sm leading-5 border-b border-solid border-b-gray-200 border-b-gray-200/10">
            <div className="flex gap-5 justify-between my-auto text-white text-opacity-60">
              <div>Total Supply </div>
              <Info />
            </div>
            <div className="text-right text-white">$365,028,275</div>
          </div>
          <div className="flex gap-5 justify-between py-3 w-full text-sm leading-5 border-b border-solid border-b-gray-200 border-b-gray-200/10">
            <div className="flex gap-5 justify-between my-auto text-white text-opacity-60">
              <div>Max Supply </div>
              <Info />
            </div>
            <div className="text-right text-white">$365,028,275</div>
          </div>
          <div className="flex gap-5 justify-between pt-2.5 pb-0.5 w-full text-sm leading-5 whitespace-nowrap">
            <div className="flex gap-1.5 self-start text-white text-opacity-60">
              <div className="grow">Fully Diluted Valuation </div>
              <Info />
            </div>
            <div className="text-right text-white">$238,785,857</div>
          </div>
        </div>
      </div>
      <div className="mx-10 bg-[url('/assets/images/bg-tabs.svg')] w-full bg-no-repeat bg-cover flex overflow-hidden relative flex-col justify-center items-start self-stretch px-5 text-base font-semibold tracking-normal leading-6 whitespace-nowrap min-h-[55px] max-md:px-5">
        <div className="flex relative gap-5 justify-between">
          <div
            onClick={handleChangeTab('onchain')}
            className="cursor-pointer flex flex-col flex-1 justify-between pt-3 text-zinc-50">
            <div>Onchain</div>
            <div
              className={cn(
                'shrink-0 mt-4 h-1 rounded-sm',
                tab === 'onchain' ? 'bg-amber-200' : ''
              )}
            />
          </div>
          <div
            onClick={handleChangeTab('news')}
            className="cursor-pointer flex flex-col flex-1 justify-between pt-3 text-gray-500">
            <div>News</div>
            <div
              className={cn('shrink-0 mt-4 h-1 rounded-sm', tab === 'news' ? 'bg-amber-200' : '')}
            />
          </div>
          <div
            onClick={handleChangeTab('technical')}
            className="cursor-pointer flex flex-col flex-1 justify-between pt-3 text-gray-500">
            <div>Technical</div>
            <div
              className={cn(
                'shrink-0 mt-4 h-1 rounded-sm',
                tab === 'technical' ? 'bg-amber-200' : ''
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
