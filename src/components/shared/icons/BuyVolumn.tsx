function BuyVolumnIcon({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <svg
      className={className}
      onClick={onClick}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g id="currency-ethereum-circle">
        <path
          id="Icon"
          d="M8.66699 20.667L16.0006 24.0003L23.3337 20.667M29.3337 16.0003C29.3337 23.3641 23.3641 29.3337 16.0003 29.3337C8.63653 29.3337 2.66699 23.3641 2.66699 16.0003C2.66699 8.63653 8.63653 2.66699 16.0003 2.66699C23.3641 2.66699 29.3337 8.63653 29.3337 16.0003ZM8.66699 15.3337L16.0006 18.667L23.3337 15.3337L16.0006 6.66699L8.66699 15.3337Z"
          stroke="#CABDFF"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  )
}

export default BuyVolumnIcon
