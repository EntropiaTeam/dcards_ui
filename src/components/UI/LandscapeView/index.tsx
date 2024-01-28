import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Box } from '@material-ui/core';
import TranslatedTypography from '../TranslatedTypography';
import ReturnIcon from '../Icons/ReturnIcon';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    background: '#fff'
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 505
  },
  textBlock: {
    display: 'flex',
    flexDirection: 'column',
    width: 283
  },
  title: {
    marginBottom: 10,
    fontSize: 38,
    lineHeight: 1.1,
    color: '#C8102E'
  },
  text: {
    fontSize: 14,
    lineHeight: 1.5,
    color: '#000'
  }
});

const LandscapeView: FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <ReturnIcon style={{ width: 150, height: 158 }} />
        <Box className={classes.textBlock}>
          <TranslatedTypography
            variant="h3"
            i18nKey={t('pages.dummyTitle')}
            className={classes.title}
          />
          <TranslatedTypography variant="body1" i18nKey={t('pages.dummyText')} className={classes.text} />
        </Box>
      </Box>
    </Box>
  );
};

export default LandscapeView;
