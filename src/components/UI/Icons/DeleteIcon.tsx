import React, { FC, SVGProps } from 'react';

const DeleteIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="7" y="6" width="16" height="2" rx="1" fill="currentColor" />
    <rect x="13" y="5" width="4" height="2" rx="1" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M7.14051 10.124C7.0659 9.52718 7.53129 9 8.13278 9H21.8672C22.4687 9 22.9341 9.52718 22.8595 10.124L21.1095 24.124C21.0469 24.6245 20.6215 25 20.1172 25H9.88278C9.37846 25 8.95306 24.6245 8.89051 24.124L7.14051 10.124ZM12 13C12 12.4477 12.4477 12 13 12C13.5523 12 14 12.4477 14 13V21C14 21.5523 13.5523 22 13 22C12.4477 22 12 21.5523 12 21V13ZM17 12C16.4477 12 16 12.4477 16 13V21C16 21.5523 16.4477 22 17 22C17.5523 22 18 21.5523 18 21V13C18 12.4477 17.5523 12 17 12Z" fill="currentColor" />
  </svg>
);

export default DeleteIcon;
