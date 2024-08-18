function WinrateIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      fill="none"
      viewBox="0 0 25 24"
    >
      <path
        fill="#1A1D1F"
        fillRule="evenodd"
        d="M7.667 9a2 2 0 100-4 2 2 0 000 4zm0 2a4 4 0 100-8 4 4 0 000 8zM17.667 19a2 2 0 100-4 2 2 0 000 4zm0 2a4 4 0 100-8 4 4 0 000 8zM19.267 3.2a1 1 0 01.2 1.4l-12 16a1 1 0 01-1.6-1.2l12-16a1 1 0 011.4-.2z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

export default WinrateIcon
