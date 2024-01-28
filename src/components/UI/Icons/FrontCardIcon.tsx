import React, { FC, SVGProps } from 'react';

const FrontCardIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    fill="none"
    width="15"
    height="21"
    viewBox="0 0 15 21"
    {...props}
  >
    <mask id="path-1-inside-1" fill="white">
      <rect y="-0.322021" width="15" height="21" rx="1" />
    </mask>
    <rect
      y="-0.322021"
      width="15"
      height="21"
      rx="1"
      stroke="currentColor"
      strokeWidth="4"
      mask="url(#path-1-inside-1)"
    />
    <rect x="4" y="3.67798" width="7" height="13" rx="1" fill="currentColor" />
  </svg>
);

export default FrontCardIcon;
