import { CardCommon } from '../common/Card/CardCommon'
import { TitleCard } from '../common/Card/TitleCard'
import { LinkCustom } from '../common/Link'
import { IconFire } from '../shared/icons/leaderboard/IconFire'
import { useGetAITradingSignalQuery } from '@/query/leaderboard/getAITradingSignal'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { chainAtom } from '@/atom/chain'
import { CardAISignal } from '../pages/trading-signal/ai-trading-signal/CardAISignal'

export const LastestAiSignal = () => {
  const CHAIN = useAtomValue(chainAtom)

  const dataAITradingSignalQuery = useQuery({
    ...useGetAITradingSignalQuery({
      limit: 2,
      start: 1,
      chain: CHAIN,
    }),
  })

  const dataAITradingSignal = dataAITradingSignalQuery.isFetching
    ? [...(Array(2).keys() as any)]
    : dataAITradingSignalQuery.data?.data || []

  return (
    <CardCommon>
      <TitleCard iconFirst={<IconFire />} title="Lastest AI Trading Signal">
        <LinkCustom url={`/trading-signal?chain=${CHAIN}`} title="See all" />
      </TitleCard>
      <div className="flex items-center gap-2">
        {dataAITradingSignal.map((item, i) => {
          return (
            <CardAISignal
              item={item}
              key={i}
              loading={dataAITradingSignalQuery.isFetching}
              index={i}
            />
          )
        })}
      </div>
    </CardCommon>
  )
}
