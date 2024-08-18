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
    <div className="flex cursor-pointer items-center justify-between gap-1 text-base tracking-normal text-gray-500">
      {dataSource?.map(
        (item: { value: string; label: string }, index: number) => {
          return (
            <div
              key={index}
              onClick={() => handleActive(item.value)}
              className={cn(
                active === item.value
                  ? 'rounded-lg bg-gray-300/10 text-gray-300'
                  : '',
                'cursor-pointer px-4 py-1.5 transition-all duration-300 hover:rounded-lg hover:bg-gray-300/10 hover:text-gray-300',
              )}
            >
              {item.label}
            </div>
          )
        },
      )}
    </div>
  )
}
