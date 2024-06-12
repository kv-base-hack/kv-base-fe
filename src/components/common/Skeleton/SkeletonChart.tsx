import ContentLoader from 'react-content-loader'

const SkeletonChart = (props: any) => (
  <ContentLoader
    className="mb-4 -mt-[50px] rounded-lg overflow-hidden"
    speed={1}
    width={1500}
    height={300}
    viewBox="0 0 1500 300"
    backgroundColor="#D6D9DC"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="1500" height="300" />
  </ContentLoader>
)

export default SkeletonChart
