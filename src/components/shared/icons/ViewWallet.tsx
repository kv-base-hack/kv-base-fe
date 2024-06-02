import React from "react";

function ViewWalletIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <rect
        width="20"
        height="20"
        fill="#1A1D1F"
        fillOpacity="0.5"
        rx="10"
      ></rect>
      <rect
        width="19"
        height="19"
        x="0.5"
        y="0.5"
        stroke="#fff"
        strokeOpacity="0.1"
        rx="9.5"
      ></rect>
      <path
        stroke="url(#paint0_linear_6869_66333)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7.5 12.5l5-5m0 0h-5m5 0v5"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_6869_66333"
          x1="7.5"
          x2="13.194"
          y1="12.5"
          y2="11.515"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9945FF"></stop>
          <stop offset="1" stopColor="#14F195"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default ViewWalletIcon;
