import React, { FC } from 'react';
import { Box } from '@material-ui/core';
import TranslatedTypography from '../UI/TranslatedTypography';

const NotFoundPage: FC = () => (
  <Box
    width="100%"
    height="100%"
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
  >
    <Box>
      <img src="./logo.svg" alt="edible-logo" style={{ width: '400px' }} />
    </Box>
    <Box>
      <TranslatedTypography variant="subtitle1" i18nKey="pages.notFound" />
    </Box>
  </Box>
);

export default NotFoundPage;
