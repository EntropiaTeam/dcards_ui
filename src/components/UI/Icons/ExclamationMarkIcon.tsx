import React, { FC, SVGProps } from 'react';

const ExclamationMarkIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <path d="M13.8554 15.4749L13.741 10.7949H15.2594L15.1501 15.4749H13.8554ZM15.1242 17.9605C14.9578 18.1269 14.7498 18.2101 14.5002 18.2101C14.2506 18.2101 14.0391 18.1269 13.8658 17.9605C13.6994 17.7872 13.6162 17.5792 13.6162 17.3365C13.6162 17.0869 13.6994 16.8755 13.8658 16.7021C14.0391 16.5288 14.2506 16.4421 14.5002 16.4421C14.7498 16.4421 14.9578 16.5288 15.1242 16.7021C15.2975 16.8755 15.3842 17.0869 15.3842 17.3365C15.3842 17.5792 15.2975 17.7872 15.1242 17.9605Z" fill="white" />
    <circle cx="14.5" cy="14.5" r="6.5" stroke="white" strokeWidth="1.5" />
  </svg>
);

export default ExclamationMarkIcon;
