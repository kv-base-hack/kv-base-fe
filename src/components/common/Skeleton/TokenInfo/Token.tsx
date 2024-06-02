import React from 'react'
import ContentLoader from 'react-content-loader'

const TokenLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={170}
    height={110}
    viewBox="0 0 170 110"
    backgroundColor="rgba(255,255,255, 0.05)"
    foregroundColor="rgba(255,255,255, 0.1)"
    {...props}
  >
    <rect x="0" y="0" rx="20" ry="20" width="170" height="100" />
  </ContentLoader>
)

export default TokenLoader
