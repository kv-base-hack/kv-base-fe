function ROIIcon({ className }: { className?: string }) {
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
        fill="#1A1D1F"
        fillRule="evenodd"
        d="M9.489 5.053c-.113-.527-.865-.527-.978 0l-1.194 5.575a3 3 0 01-2.934 2.371H3a1 1 0 110-2h1.383a1 1 0 00.978-.79l1.194-5.575C7.12 2 10.88 2 11.445 4.634l3.066 14.311c.113.527.865.527.978 0l1.194-5.574a3 3 0 012.934-2.372H21a1 1 0 110 2h-1.383a1 1 0 00-.978.79l-1.194 5.575c-.565 2.635-4.325 2.635-4.89 0L9.49 5.054z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

export default ROIIcon
