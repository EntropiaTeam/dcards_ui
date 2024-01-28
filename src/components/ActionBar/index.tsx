import React, { FC, ReactNode } from 'react';
import {
  Box, makeStyles, Grid, Theme
} from '@material-ui/core';
import MainButton from '../UI/MainButton';

const useStyles = makeStyles((theme: Theme) => ({
  footerContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    padding: 27,
    [theme.breakpoints.only('xs')]: {
      padding: '0 13px 27px 13px'
    },
    width: '100%',
    boxSizing: 'border-box'
  }
}));

interface Props {
  mainButtonContent: ReactNode;
  mainButtonCallback(): void;
  className?: string;
  mainButtonDisabled?: boolean;
  tabIndex?: number;
  navLinks?: ReactNode;
}

const ActionBar: FC<Props> = ({
  mainButtonContent,
  mainButtonCallback,
  mainButtonDisabled,
  className = '',
  tabIndex = 0,
  navLinks
}) => {
  const classes = useStyles();
  return (
    <Box className={`${classes.footerContainer} ${className}`}>
      <Grid container>
        <Grid item md={4} lg={4} xl={4} />
        <Grid item xs={8} sm={8} md={4} lg={4} xl={4} justify="space-around" container>
          {navLinks}
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4} justify="flex-end" container>
          <MainButton
            disabled={mainButtonDisabled}
            onClick={mainButtonCallback}
            tabIndex={tabIndex}
          >
            {mainButtonContent}
          </MainButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ActionBar;
