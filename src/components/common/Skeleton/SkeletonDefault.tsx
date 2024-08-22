import ContentLoader from 'react-content-loader'

const SkeletonDefault = (props: any) => (
  <ContentLoader
    speed={2}
    width={500}
    height={300}
    viewBox="0 0 500 300"
    backgroundColor="rgba(255,255,255, 0.05)"
    foregroundColor="rgba(255,255,255, 0.1)"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="10" width="500" height="300" />
  </ContentLoader>
)

export default SkeletonDefault
