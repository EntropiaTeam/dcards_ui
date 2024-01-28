import React, { FC, SVGProps } from 'react';

const EditIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="40" height="40" rx="2" fill="#F6F6F6" />
    <path d="M16.4873 20.1569L27.094 9.84412C27.4861 9.46294 28.1116 9.46734 28.4983 9.85399L29.9233 11.279C30.3134 11.6692 30.3138 12.3016 29.9242 12.6923L19.4873 23.1567L16.4873 20.1569Z" fill="#C8102E" />
    <path d="M15.049 24.6934L16.4873 20.1569L19.4874 23.157L15.049 24.6934Z" fill="currentColor" />
    <path d="M19.5 12.5H11V29.5H28V20" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default EditIcon;
