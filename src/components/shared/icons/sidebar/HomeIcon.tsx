function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5 22a3 3 0 01-3-3v-7.664a3 3 0 01.993-2.23l7-6.3a3 3 0 014.014 0l7 6.3a3 3 0 01.993 2.23V19a3 3 0 01-3 3H5zm15-10.664V19a1 1 0 01-1 1h-3v-5a3 3 0 00-3-3h-2a3 3 0 00-3 3v5H5a1 1 0 01-1-1v-7.664a1 1 0 01.331-.743l7-6.3a1 1 0 011.338 0l7 6.3a1 1 0 01.331.743zM10 20v-5a1 1 0 011-1h2a1 1 0 011 1v5h-4z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

export default HomeIcon
