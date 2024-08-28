import React from 'react'

function IconSpotLight({ fill = '#77FF60' }: { fill?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M7 0.53125L9.25 4.75L13.4688 7L9.25 9.25L7 13.4688L4.75 9.25L0.53125 7L4.75 4.75L7 0.53125Z"
        fill={fill}
      />
    </svg>
  )
}

export default IconSpotLight
