import { ReactNode } from 'react'

export const CardCommon = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-neutral-01 p-6 rounded-2xl flex flex-col gap-4 border border-[#EFEFEF] w-full">
      {children}
    </div>
  )
}
