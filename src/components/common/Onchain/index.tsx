import { DataTable } from '@/components/common/DataTable'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { Activity, columnsActivity } from '@/components/common/DataTable/columnsActivity'
import { PaginationCustom } from '@/components/common/Pagination'
import { useState } from 'react'

const TypeActivityGroup = () => {
  return (
    <div className="flex gap-5 justify-between items-center text-base tracking-normal text-gray-500">
      <div className="justify-center self-stretch px-4 py-2 text-gray-300 rounded-lg aspect-[1.6] bg-gray-300 bg-opacity-10">
        All
      </div>{' '}
      <div className="self-stretch my-auto">Inflow</div>
      <div className="self-stretch my-auto">Outflow</div>
      <div className="grow self-stretch my-auto">Buying</div>
      <div className="grow self-stretch my-auto">Selling</div>
    </div>
  )
}

export const Onchain = ({ dataActivity }: { dataActivity: Activity[] }) => {
  const [page, setPage] = useState(1)
  return (
    <>
      <div className="flex my-4 items-center gap-4 self-stretch font-semibold whitespace-nowrap leading-[160%] max-md:flex-wrap">
        <div className="flex gap-2 my-auto text-xl tracking-tight">
          <div className="flex gap-2 justify-between text-gray-300">
            <div>ETH</div>
            <img
              loading="lazy"
              src="/assets/icons/chain/ethereum.svg"
              className="object-center w-6 aspect-square"
            />
          </div>
          <div className="grow text-gray-300">Onchain Signal</div>
        </div>
        <div className="flex gap-2 justify-between text-base tracking-normal max-md:flex-wrap max-md:max-w-full">
          <div className="grow justify-center px-4 py-2 text-gray-300 rounded-lg bg-zinc-800">
            Smart Money{' '}
          </div>
          <div className="grow justify-center px-4 py-2 text-gray-500 rounded-lg bg-zinc-900">
            Insider Trade
          </div>
        </div>
      </div>
      <WrapTable title="Smart Money's Activity" childHeader={<TypeActivityGroup />}>
        <div className="mt-8">
          {dataActivity ? (
            <DataTable
              className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-zinc-800 bg-neutral-07/50"
              columns={columnsActivity}
              data={dataActivity}
              noneBorder
              noneBgHeader
              emptyData="No results."
            />
          ) : null}
        </div>
        <PaginationCustom
          className="mt-8"
          currentPage={page}
          updatePage={() => null}
          pageSize={10}
          total={10}
          setPage={setPage}
        />
      </WrapTable>
    </>
  )
}
