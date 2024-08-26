import { useAtom } from 'jotai'

import { Select, SelectTrigger } from '@/components/ui/select'
import { chainAtom } from '@/atom/chain'
import { cn } from '@/lib/utils'

export const SelectSpecificToken = () => {
  const [chain, setChain] = useAtom(chainAtom)

  return (
    <Select value={chain} onValueChange={(val: string) => setChain(val)}>
      <SelectTrigger
        className={cn(
          'my-auto flex w-auto cursor-pointer gap-2 whitespace-nowrap rounded-xl border border-solid border-white/10 bg-neutral-07/50 px-4 py-3 text-base font-medium leading-6 tracking-normal text-gray-300 backdrop-blur-[50px]',
        )}
      >
        <div className="justify-center rounded-xl border border-solid border-purple-500 bg-white bg-opacity-10 px-7 py-2.5 text-sm leading-5 tracking-normal text-white shadow-lg backdrop-blur-[2px]">
          Specific Token
        </div>
      </SelectTrigger>
    </Select>
  )
}
