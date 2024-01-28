import React, { FC, SVGProps } from 'react';

const BackIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M7.03125 7.03125L22.9688 22.9688" stroke="currentColor" strokeWidth="2" />
    <path d="M7 22.9375L22.9375 7" stroke="currentColor" strokeWidth="2" />
  </svg>

);

export default BackIcon;
