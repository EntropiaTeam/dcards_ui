import React, { FC, SVGProps } from 'react';

const InsideCardIcon: FC< SVGProps<SVGSVGElement>> = (props) => (
  <svg
    fill="none"
    width="25"
    height="29"
    viewBox="0 0 25 29"
    {...props}
  >
    <path d="M7 5H20V24H7V5Z" stroke="currentColor" strokeWidth="2" />
    <path
      d="M1 1.61803L7 4.61803V24.4458L0.999999 28.1958L1 1.61803Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect x="10" y="8" width="7" height="13" rx="1" fill="currentColor" />
  </svg>
);

export default InsideCardIcon;
