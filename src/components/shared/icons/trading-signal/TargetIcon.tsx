function TargetIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24">
      <path
        fill="#6F767E"
        fillRule="evenodd"
        d="M12 13a1 1 0 100-2 1 1 0 000 2zm0 2a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"></path>
      <path
        fill="#F4F4F4"
        fillRule="evenodd"
        d="M12 2a1 1 0 011 1v1.062A8.004 8.004 0 0119.938 11H21a1 1 0 110 2h-1.062A8.004 8.004 0 0113 19.938V21a1 1 0 11-2 0v-1.062A8.004 8.004 0 014.062 13H3a1 1 0 110-2h1.062A8.004 8.004 0 0111 4.062V3a1 1 0 011-1zm0 16a6 6 0 100-12 6 6 0 000 12z"
        clipRule="evenodd"></path>
    </svg>
  )
}

export default TargetIcon
