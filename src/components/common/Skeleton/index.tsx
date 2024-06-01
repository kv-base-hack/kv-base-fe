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
      speed={2}
      width={200}
      height={200}
      viewBox="0 0 200 200"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" rx="8" ry="8" width="200" height="200" />
    </ContentLoader>
  </div>
)

export default Skeleton
