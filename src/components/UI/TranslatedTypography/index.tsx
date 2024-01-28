import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, TypographyProps } from '@material-ui/core';

interface TranslatedTypographyProps extends TypographyProps {
  i18nKey: string;
}

const TranslatedTypography: FC<TranslatedTypographyProps> = ({
  i18nKey,
  variant = 'body1',
  ...props
}) => {
  const { t } = useTranslation();
  return <Typography variant={variant} {...props}>{t(i18nKey)}</Typography>;
};

export default TranslatedTypography;
