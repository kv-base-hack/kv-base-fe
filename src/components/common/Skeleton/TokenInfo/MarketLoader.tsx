import React from 'react'
import ContentLoader from 'react-content-loader'

const MarketLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={100}
    height={60}
    viewBox="0 0 100 60"
    backgroundColor="rgba(255,255,255, 0.05)"
    foregroundColor="rgba(255,255,255, 0.1)"
    {...props}
  >
    <rect x="0" y="25" rx="3" ry="3" width="60" height="6" />
    <rect x="0" y="8" rx="3" ry="3" width="60" height="6" />
  </ContentLoader>
)

export default MarketLoader
