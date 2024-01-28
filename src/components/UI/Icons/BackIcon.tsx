import React, { FC, SVGProps } from 'react';

const BackIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M17.9688 6L10 14.9062L17.9688 23.8125" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default BackIcon;
