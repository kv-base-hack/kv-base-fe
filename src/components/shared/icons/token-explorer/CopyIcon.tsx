function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      fill="none"
      viewBox="0 0 12 12">
      <path
        fill="#DCDEEE"
        d="M8.25.5h-6c-.55 0-1 .45-1 1v7h1v-7h6v-1zm1.5 2h-5.5c-.55 0-1 .45-1 1v7c0 .55.45 1 1 1h5.5c.55 0 1-.45 1-1v-7c0-.55-.45-1-1-1zm0 8h-5.5v-7h5.5v7z"></path>
    </svg>
  )
}

export default CopyIcon
