import React, { FC, ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';

const useStyles = makeStyles(() => ({
  root: {
    '&>div:last-child': {
      marginBottom: '30px',
      marginRight: '6px'
    }
  }
}));

type Props = {
  children: ReactNode;
};

const CustomScrollbar: FC<Props> = ({ children }) => {
  const classes = useStyles();
  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      className={classes.root}
    >
      {children}
    </Scrollbars>
  );
};

export default CustomScrollbar;
