import { LineChart } from '@/components/common/ChartDetail/LineChart'
import { ContractDetail } from '@/components/common/ContractDetail'
import { Activity } from '@/components/common/DataTable/columnsActivity'
import { GroupHeader } from '@/components/common/GroupHeader'
import { News } from '@/components/common/News'
import { Onchain } from '@/components/common/Onchain'
import { SelectChain } from '@/components/common/SelectChain'
import { Technical } from '@/components/common/Technical'
import { cn } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

async function getDataActivity(): Promise<Activity[]> {
  return [
    {
      id: '1',
      time: 'Nov 19, 01:24',
      smart_money: 'Amber Group',
      symbol: 'USDT',
      movements: 'OUTFLOW',
      value: {
        total: 14740000,
        amount: 2000000,
        symbol: 'BLUR',
      },
      avg_cost: 0.524773,
      realized_pnl: {
        percent: 2.1,
        amount: 300000,
      },
      unrealized_pnl: {
        percent: 8.4,
        amount: 1200000,
      },
    },
    {
      id: '2',
      time: 'Nov 19, 01:24',
      smart_money: 'Amber Group',
      symbol: 'USDT',
      movements: 'OUTFLOW',
      value: {
        total: 14740000,
        amount: 2000000,
        symbol: 'BLUR',
      },
      avg_cost: 0.524773,
      realized_pnl: {
        percent: 2.1,
        amount: 300000,
      },
      unrealized_pnl: {
        percent: 8.4,
        amount: 1200000,
      },
    },
    {
      id: '3',
      time: 'Nov 19, 01:24',
      smart_money: 'Amber Group',
      symbol: 'USDT',
      movements: 'OUTFLOW',
      value: {
        total: 14740000,
        amount: 2000000,
        symbol: 'BLUR',
      },
      avg_cost: 0.524773,
      realized_pnl: {
        percent: 2.1,
        amount: 300000,
      },
      unrealized_pnl: {
        percent: 8.4,
        amount: 1200000,
      },
    },
    {
      id: '4',
      time: 'Nov 19, 01:24',
      smart_money: 'Amber Group',
      symbol: 'USDT',
      movements: 'OUTFLOW',
      value: {
        total: 14740000,
        amount: 2000000,
        symbol: 'BLUR',
      },
      avg_cost: 0.524773,
      realized_pnl: {
        percent: 2.1,
        amount: 300000,
      },
      unrealized_pnl: {
        percent: 8.4,
        amount: 1200000,
      },
    },
    {
      id: '5',
      time: 'Nov 19, 01:24',
      smart_money: 'Amber Group',
      symbol: 'USDT',
      movements: 'OUTFLOW',
      value: {
        total: 14740000,
        amount: 2000000,
        symbol: 'BLUR',
      },
      avg_cost: 0.524773,
      realized_pnl: {
        percent: 2.1,
        amount: 300000,
      },
      unrealized_pnl: {
        percent: 8.4,
        amount: 1200000,
      },
    },
  ]
}

export const Route = createFileRoute('/onchain-discovery/token-explorer/$token/deep')({
  loader: async () => {
    return {
      dataActivity: await getDataActivity(),
    }
  },
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

  const { dataActivity } = Route.useLoaderData()

  const handleChangeTab = (tab: string) => () => {
    setTabs(tab)
  }

  const handleModeChange = useCallback((mode: string) => {
    setMode(mode)
  }, [])

  const renderContentTab = (tab: string) => {
    switch (tab) {
      case 'onchain':
        return <Onchain dataActivity={dataActivity} />
      case 'news':
        return <News />
      case 'technical':
        return <Technical />
    }
    return null
  }

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
          <ContractDetail />
        </div>
      </div>
      <div className="mx-10 bg-[url('/assets/images/bg-tabs.svg')] w-full bg-no-repeat bg-cover flex overflow-hidden relative flex-col justify-center items-start self-stretch px-5 text-base font-semibold tracking-normal leading-6 whitespace-nowrap min-h-[55px] max-md:px-5">
        <div className="flex relative gap-5 justify-between">
          <div
            onClick={handleChangeTab('onchain')}
            className="cursor-pointer flex flex-col flex-1 justify-between pt-3">
            <div className={cn(tab === 'onchain' ? 'text-neutral-01' : 'text-neutral-04')}>
              Onchain
            </div>
            <div
              className={cn(
                'shrink-0 mt-4 h-1 rounded-sm',
                tab === 'onchain' ? 'bg-amber-200' : ''
              )}
            />
          </div>
          <div
            onClick={handleChangeTab('news')}
            className="cursor-pointer flex flex-col flex-1 justify-between pt-3">
            <div className={cn(tab === 'news' ? 'text-neutral-01' : 'text-neutral-04')}>News</div>
            <div
              className={cn('shrink-0 mt-4 h-1 rounded-sm', tab === 'news' ? 'bg-amber-200' : '')}
            />
          </div>
          <div
            onClick={handleChangeTab('technical')}
            className="cursor-pointer flex flex-col flex-1 justify-between pt-3">
            <div className={cn(tab === 'technical' ? 'text-neutral-01' : 'text-neutral-04')}>
              Technical
            </div>
            <div
              className={cn(
                'shrink-0 mt-4 h-1 rounded-sm',
                tab === 'technical' ? 'bg-amber-200' : ''
              )}
            />
          </div>
        </div>
      </div>
      <div className="m-10 mt-4">{renderContentTab(tab)}</div>
    </div>
  )
}
