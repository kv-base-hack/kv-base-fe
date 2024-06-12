import ContentLoader from 'react-content-loader'

const Skeleton = ({
  props,
  width = 140,
  height = 14,
  rx = 8,
  ry = 8,
}: {
  props?: any
  width?: number
  height?: number
  rx?: number
  ry?: number
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
    <rect x="0" y="0" rx={rx} ry={ry} width={width} height={height} />
  </ContentLoader>
)

export default Skeleton
