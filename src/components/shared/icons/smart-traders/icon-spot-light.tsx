import React from 'react'

function IconSpotLight({ fill = '#77FF60' }: { fill?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="12" fill="#182317"></circle>
      <path
        fill={fill}
        d="M12 5.531l2.25 4.219L18.469 12l-4.219 2.25L12 18.469 9.75 14.25 5.531 12 9.75 9.75 12 5.531z"
      ></path>
    </svg>
  )
}

export default IconSpotLight
