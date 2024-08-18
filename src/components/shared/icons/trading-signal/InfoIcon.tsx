function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill="#6F767E"
        fillRule="evenodd"
        d="M14.666 8A6.667 6.667 0 111.333 8a6.667 6.667 0 0113.333 0zM8 7.335c.368 0 .666.298.666.667v3.334a.667.667 0 01-1.333 0V8c0-.369.298-.667.667-.667zm0-1.333a.667.667 0 100-1.334.667.667 0 000 1.334z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

export default InfoIcon
