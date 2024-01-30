function PostionsIcon({ className }: { className?: string }) {
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
        d="M3 2a1 1 0 011 1v16a1 1 0 001 1h16a1 1 0 110 2H5a3 3 0 01-3-3V3a1 1 0 011-1z"
        clipRule="evenodd"></path>
      <path
        fill="#6F767E"
        fillRule="evenodd"
        d="M21.707 8.293a1 1 0 010 1.414l-4.586 4.586a3 3 0 01-4.242 0l-2.172-2.172a1 1 0 00-1.414 0l-2.086 2.086a1 1 0 01-1.414-1.414l2.086-2.086a3 3 0 014.242 0l2.172 2.172a1 1 0 001.414 0l4.586-4.586a1 1 0 011.414 0z"
        clipRule="evenodd"></path>
    </svg>
  )
}

export default PostionsIcon
