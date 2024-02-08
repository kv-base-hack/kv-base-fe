function WarningIcon({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <svg
      className={className}
      onClick={onClick}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g id="UI icon/alert_circled/light">
        <path
          id="Path 51 (Stroke)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 14C12.5523 14 13 13.5523 13 13V8.00001C13 7.44772 12.5523 7.00001 12 7.00001C11.4477 7.00001 11 7.44772 11 8.00001V13C11 13.5523 11.4477 14 12 14Z"
          fill="#FFBC99"
        />
        <path
          id="Ellipse 135"
          d="M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z"
          fill="#FFBC99"
        />
        <path
          id="Ellipse 134 (Stroke)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          fill="#FFBC99"
        />
      </g>
    </svg>
  )
}

export default WarningIcon
