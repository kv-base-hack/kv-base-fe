import ContentLoader from 'react-content-loader'

const SkeletonChart = (props: any) => (
  <ContentLoader
    className="-mt-[50px] mb-4 overflow-hidden rounded-lg"
    speed={1}
    width={1500}
    height={300}
    viewBox="0 0 1500 300"
    backgroundColor="rgba(255,255,255, 0.05)"
    foregroundColor="rgba(255,255,255, 0.1)"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="1500" height="300" />
  </ContentLoader>
)

export default SkeletonChart
