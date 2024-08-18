function CheckDone({
  props,
  onClick,
  className,
}: {
  props?: any
  onClick?: () => void
  className?: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="41"
      viewBox="0 0 40 41"
      fill="none"
      className={className}
      onClick={onClick}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35 20.25C35 22.2198 34.612 24.1704 33.8582 25.9903C33.1044 27.8101 31.9995 29.4637 30.6066 30.8566C29.2137 32.2495 27.5601 33.3544 25.7403 34.1082C23.9204 34.862 21.9698 35.25 20 35.25C18.0302 35.25 16.0796 34.862 14.2597 34.1082C12.4399 33.3544 10.7863 32.2495 9.3934 30.8566C8.00052 29.4637 6.89563 27.8101 6.14181 25.9903C5.38799 24.1704 5 22.2198 5 20.25C5 16.2718 6.58035 12.4564 9.3934 9.6434C12.2064 6.83035 16.0218 5.25 20 5.25C23.9782 5.25 27.7936 6.83035 30.6066 9.6434C33.4196 12.4564 35 16.2718 35 20.25ZM26.7767 12.7783L17 22.555L12.4733 18.0283L9.52667 20.9733L17 28.4467L29.7233 15.7233L26.7767 12.7783Z"
        fill="#474D57"
      />
    </svg>
  )
}

export default CheckDone
