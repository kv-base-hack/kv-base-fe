import { cn } from '@/lib/utils'
import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = ({
  className,
  props,
}: {
  className?: string
  props?: any
}) => (
  <div className={cn('overflow-hidden', className)}>
    <ContentLoader
      speed={1}
      width={500}
      height={200}
      viewBox="0 0 500 200"
      backgroundColor="rgba(255,255,255, 0.05)"
      foregroundColor="rgba(255,255,255, 0.1)"
      {...props}
    >
      <rect x="0" y="0" rx="0" ry="0" width="500" height="200" />
    </ContentLoader>
  </div>
)

export default Skeleton
