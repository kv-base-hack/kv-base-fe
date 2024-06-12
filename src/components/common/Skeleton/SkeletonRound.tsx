import React from 'react'
import ContentLoader from 'react-content-loader'

const SkeletonRound = ({
  props,
  cx = 28,
  cy = 29,
  r = 27,
  width = 58,
  height = 58,
}: {
  props?: any
  cx?: number
  cy?: number
  r?: number
  width?: number
  height?: number
}) => (
  <ContentLoader
    speed={1}
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    backgroundColor="#D6D9DC"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx={cx} cy={cy} r={r} />
  </ContentLoader>
)

export default SkeletonRound
