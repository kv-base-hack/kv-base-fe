import ContentLoader from 'react-content-loader'

const SkeletonDefault = (props: any) => (
  <ContentLoader
    speed={2}
    width={300}
    height={300}
    viewBox="0 0 300 300"
    backgroundColor="#D6D9DC"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="10" width="300" height="300" />
  </ContentLoader>
)

export default SkeletonDefault
