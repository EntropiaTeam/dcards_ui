import React, { FC, SVGProps } from 'react';

const RotateIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="6" y="9.5" width="16" height="16" rx="2" fill="currentColor" />
    <path d="M26 16V8C26 6.34315 24.6569 5 23 5H15" stroke="currentColor" />
    <path d="M17.5 2L14.5 5L17.5 8" stroke="currentColor" />
  </svg>
);

export default RotateIcon;
