import TokenLoader from './Token'

import React from 'react'

export const SkeletonTokenInfo = () => {
  return (
    <div className="mb-10 w-full p-4">
      <div className="grid w-[80%] grid-cols-3 gap-6 md:grid-cols-4 xl:grid-cols-5 2xl:w-[90%] 3xl:grid-cols-6">
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
