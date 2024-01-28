import React, { FC, ReactNode } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const StyledButton = withStyles((theme) => ({
  root: {
    minWidth: 40,
    height: 40,
    padding: 0,
    textAlign: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 2,
    color: theme.palette.primary.main
  }
}))(Button);

type Props = {
  children: ReactNode;
  cls?: string;
  tabIndex?: number;
  onClick?: () => void;
};

const IconButton: FC<Props> = ({
  cls,
  children,
  onClick,
  tabIndex = 0
}) => (
  <StyledButton
    disableRipple
    className={cls}
    onClick={onClick}
    tabIndex={tabIndex}
  >
    {children}
  </StyledButton>
);

export default IconButton;
