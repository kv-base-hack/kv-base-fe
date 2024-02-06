import ContentLoader from 'react-content-loader'

const SkeletonCell = (props: any, width?: number, height?: number) => (
  <ContentLoader
    speed={2}
    width={width ? width : 69}
    height={height ? height : 12}
    viewBox="0 0 69 12"
    backgroundColor="rgba(255,255,255, 0.05)"
    foregroundColor="rgba(255,255,255, 0.1)"
    {...props}>
    <rect x="1" y="0" rx="6" ry="6" width="68" height={height ? height : 12} />
  </ContentLoader>
)

export default SkeletonCell
