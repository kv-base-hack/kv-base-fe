function Aclock({
  props,
  onClick,
  className,
}: {
  props?: any
  onClick?: () => void
  className?: string
}) {
  return (
    <svg
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      fill="none"
      {...props}
      viewBox="0 0 24 25">
      <path
        fill="#848E9C"
        fillRule="evenodd"
        d="M21 12.25a9 9 0 11-18 0 9 9 0 0118 0zm-7.75-.518V5.75h-2.5v7.018l3.866 3.866 1.768-1.768-3.134-3.134z"
        clipRule="evenodd"></path>
    </svg>
  )
}

export default Aclock
