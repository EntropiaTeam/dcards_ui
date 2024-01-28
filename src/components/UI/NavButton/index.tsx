import React, { FC, ReactNode } from 'react';
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  btnLink: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    minWidth: 75,
    height: 45,
    textDecoration: 'none',
    color: '#393939',
    '&>button': {
      '&:focus-visible': {
        outline: 'auto'
      }
    }
  },
  activeNavLink: {
    color: '#C8102E '
  },
  disabled: {
    '&>span': {
      color: '#B1B4C3'
    },
    '&>svg': {
      color: '#DDDFE8'
    }
  }
}));

interface Props {
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  isActive?: boolean;
  tabIndex?: number;
  onClick?(): void;
}

const NavButton: FC<Props> = ({
  disabled,
  children,
  className,
  isActive = false,
  tabIndex = 0,
  onClick
}) => {
  const classes = useStyles();
  const activeCls = isActive ? `${classes.btnLink} ${classes.activeNavLink}` : classes.btnLink;
  const disabledCls = disabled ? ` ${classes.disabled}` : '';
  const cls = activeCls + disabledCls;

  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className={className || cls}
      tabIndex={tabIndex}
    >
      {children}
    </Button>
  );
};

export default NavButton;
