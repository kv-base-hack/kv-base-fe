import { cn } from '@/lib/utils'

type IData = {
  value: string
  label: string
}

export const DateGroup = ({
  dataSource,
  active,
  handleActive,
}: {
  dataSource: IData[]
  active: string
  handleActive: (active: string) => void
}) => {
  return (
    <div className="flex gap-1 cursor-pointer justify-between items-center text-base tracking-normal text-gray-500">
      {dataSource.map((item: { value: string; label: string }, index: number) => {
        return (
          <div
            key={index}
            onClick={() => handleActive(item.value)}
            className={cn(
              active === item.value ? ' bg-gray-300/10 text-gray-300 rounded-lg' : '',
              'px-4 py-1.5 cursor-pointer hover:bg-gray-300/10 hover:text-gray-300 hover:rounded-lg transition-all duration-300'
            )}>
            {item.label}
          </div>
        )
      })}
    </div>
  )
}
