export const WrapGradient = ({
  children,
  props,
  onClick,
}: {
  children: React.ReactNode
  props?: any
  onClick?: () => void
}) => {
  return (
    <div
      role="button"
      className="group relative overflow-hidden rounded-xl bg-white/5"
      onClick={onClick}
      {...props}
    >
      <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 h-full w-full rounded-xl transition-all duration-200 ease-in-out group-hover:bg-gradient-to-r group-hover:from-[#9945FF] group-hover:to-[#14F195]"></div>
      {children}
    </div>
  )
}
