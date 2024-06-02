import TokenLoader from './Token'

import React from 'react'

export const SkeletonTokenInfo = () => {
  return (
    <div className="p-4 mb-10 w-full">
      <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-6 gap-6 w-[80%] 2xl:w-[90%]">
        <TokenLoader />
        <TokenLoader />
        <TokenLoader />
        <TokenLoader />
        <TokenLoader />
        <TokenLoader />
        <TokenLoader className="hidden md:block" />
        <TokenLoader className="hidden md:block" />
        <TokenLoader className="hidden xl:block" />
        <TokenLoader className="hidden xl:block" />
        <TokenLoader className="hidden 3xl:block" />
        <TokenLoader className="hidden 3xl:block" />
      </div>
    </div>
  )
}
