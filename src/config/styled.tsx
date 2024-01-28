import React, { memo } from 'react';
import { createGlobalStyle } from 'styled-components';
import { GlobalFontConfig } from '../types/index';

interface Props {
  family: string;
  src: string;
  weight: number;
}

export function fontFace(props: Props): string {
  const isFontFamilyExists = props.family;
  if (isFontFamilyExists) {
    return `
        @font-face{
            font-family: "${props.family}";
            src: local("${props.family}"), url(${`/assets/f/${props.src}.ttf`}) format("truetype");
            font-style: 'normal';
            font-weight: ${props.weight};
        }
    `;
  }
  return '';
}

const GlobalStyle = createGlobalStyle`
  ${(props: Props) => fontFace(props)}
`;

export const CardFontFace = memo((fontConfig: GlobalFontConfig) => (
  <>
    <GlobalStyle {...fontConfig} />
  </>
));
