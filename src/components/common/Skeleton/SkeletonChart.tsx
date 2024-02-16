import ContentLoader from 'react-content-loader'

const SkeletonChart = (props: any) => (
  <ContentLoader
    className="mb-4 -mt-[50px] rounded-lg overflow-hidden"
    speed={2}
    width={674}
    height={300}
    viewBox="0 0 700 300"
    backgroundColor="rgba(255,255,255, 0.05)"
    foregroundColor="rgba(255,255,255, 0.1)"
    {...props}>
    <rect x="25" y="47" rx="0" ry="10" width="674" height="300" />
  </ContentLoader>
)

export default SkeletonChart
