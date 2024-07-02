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
          'flex w-auto cursor-pointer gap-2 px-4 py-3 my-auto text-base font-medium tracking-normal leading-6 text-gray-300 whitespace-nowrap border border-solid backdrop-blur-[50px] bg-neutral-07/50 border-white/10 rounded-xl',
        )}
      >
        <div className="justify-center px-7 py-2.5 text-sm tracking-normal leading-5 text-white rounded-xl border border-purple-500 border-solid shadow-lg backdrop-blur-[2px] bg-white bg-opacity-10">
          Specific Token
        </div>
      </SelectTrigger>
      {/* <SelectContent className="border-none bg-neutral-07 z-[9999]">
        <SelectItem value="solana">Solana</SelectItem>
      </SelectContent> */}
    </Select>
  )
}
