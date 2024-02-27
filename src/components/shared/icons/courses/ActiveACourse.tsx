function ActiveACourceIcon({ props, className }: { props?: any; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5 4H14.5V19H9.5V4ZM3 11H7.5V19H3V11ZM21 9H16.5V19H21V9Z"
        fill="#32D993"
      />
    </svg>
  )
}

export default ActiveACourceIcon
