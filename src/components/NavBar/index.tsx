import React, {
  memo, FC, useCallback, ReactNode
} from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { BackIcon, CloseIcon } from '../UI/Icons';
import TranslatedTypography from '../UI/TranslatedTypography';
import ProgressBar from '../UI/ProgressBar';
import { useNavigationContext } from '../../context';
import IframeActions from '../../utils/IframeActions';
import AdobeAnalytics from '../../utils/AdobeAnalytics';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '84px'
  },
  navBtn: {
    flex: 1,
    minWidth: 'auto',
    padding: 0,
    [theme.breakpoints.only('xs')]: {
      minWidth: '64px'
    }
  },
  backIcon: {
    [theme.breakpoints.only('xs')]: {
      marginRight: 'auto'
    }
  },
  closeIcon: {
    [theme.breakpoints.only('xs')]: {
      marginLeft: 'auto'
    }
  },
  appBar: {
    borderRadius: '32px 32px 0 0',
    backgroundColor: 'white',
    color: theme.palette.primary.dark,
    boxShadow: 'none'
  },
  toolBar: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    minHeight: '80px',
    [theme.breakpoints.only('xs')]: {
      minHeight: '60px'
    }
  },
  headerTitle: {
    flex: 12,
    backgroundColor: '#ffffff',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'center',
    fontSize: '2rem',
    margin: '0 10px',
    [theme.breakpoints.only('xs')]: {
      fontSize: '1.5rem'
    },
    '&::first-letter': {
      textTransform: 'capitalize'
    }
  }
}));

interface NavbarProps {
  pageTitle: string;
  onBackClick?(): void;
  className?: string;
  position?: 'static' | 'fixed';
  setModalCallback?: (callback: () => void) => void;
  showModal?: boolean;
  rightControlContent?: ReactNode;
}

const NavBar: FC<NavbarProps> = ({
  className = '',
  position = 'static',
  pageTitle,
  onBackClick = () => { },
  setModalCallback,
  showModal = false,
  rightControlContent
}) => {
  const { state: { isBackButtonVisible } } = useNavigationContext();
  const classes = useStyles();

  const onCloseClick = useCallback(() => {
    AdobeAnalytics.getInstance().cancelButton();
    IframeActions.closeWindow();
  }, []);

  const handleCloseClick = (): void => {
    if (setModalCallback) {
      setModalCallback(() => onCloseClick);
      return;
    }
    onCloseClick();
  };

  const handleBackClick = (): void => {
    if (showModal && setModalCallback) {
      setModalCallback(() => onBackClick);
      return;
    }
    onBackClick();
  };

  const backIconTabIndex = isBackButtonVisible ? 1 : -1;
  const closeIconTabIndex = 2;

  const rightNavControl = rightControlContent || (
  <Button
    className={classes.navBtn}
    onClick={handleCloseClick}
    tabIndex={closeIconTabIndex}
    role="button"
  >
    <CloseIcon className={classes.closeIcon} />
  </Button>
  );

  return (
    <div className={className}>
      <AppBar position={position} className={classes.appBar}>
        <Toolbar variant="dense" className={classes.toolBar}>
          {
            isBackButtonVisible ? (
              <Button className={classes.navBtn} onClick={handleBackClick} role="button" tabIndex={backIconTabIndex}>
                <BackIcon className={classes.backIcon} />
              </Button>
            ) : (
              <Button disabled className={classes.navBtn} style={{ color: 'transparent' }}>
                <BackIcon />
              </Button>
            )
          }
          <TranslatedTypography
            i18nKey={pageTitle}
            variant="h3"
            classes={{ root: classes.headerTitle }}
          />
          {rightNavControl}
        </Toolbar>
        <ProgressBar />
      </AppBar>
    </div>
  );
};

export default memo(NavBar);
