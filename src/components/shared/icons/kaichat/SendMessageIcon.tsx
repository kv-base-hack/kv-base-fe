function SendMessageIcon({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) {
  return (
    <svg
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <g>
        <path
          fill="#6F767E"
          fillRule="evenodd"
          d="M.193 4.578C-.638 2.085 1.91-.196 4.296.906l13.802 6.37c2.324 1.072 2.324 4.375 0 5.448l-13.802 6.37C1.91 20.195-.638 17.914.193 15.42l1.49-4.473a3 3 0 000-1.897L.194 4.578zm3.265-1.857l13.802 6.37a1 1 0 010 1.817l-13.802 6.37c-.795.367-1.645-.393-1.368-1.224l1.491-4.473c.064-.191.116-.385.156-.581H12a1 1 0 100-2H3.737a4.998 4.998 0 00-.156-.581l-1.49-4.473c-.278-.831.572-1.592 1.367-1.225z"
          clipRule="evenodd"
        ></path>
      </g>
    </svg>
  )
}

export default SendMessageIcon
