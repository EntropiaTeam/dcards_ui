import React, { FC, PropsWithChildren, ReactNode } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, Box } from '@material-ui/core';
import { ImageConfig } from '../../../types';

const useStyles = makeStyles((theme: Theme) => ({
  imageContainer: ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    width: (imgConfig: ImageConfig) => imgConfig.width,
    height: (imgConfig: ImageConfig) => imgConfig.height,
    cursor: 'pointer',
    transform: ({ rotation = 0 }: ImageConfig) => `rotate(${rotation}deg)`,
    marginLeft: ({ leftMargin = 1 }: ImageConfig) => `${leftMargin}px`,
    [theme.breakpoints.only('xs')]: {
      width: (imgConfig: ImageConfig) => imgConfig.xsWidth,
      height: (imgConfig: ImageConfig) => imgConfig.xsHeight
    },
    '&:focus': {
      outline: 'none'
    },
    '&:focus-visible': {
      outline: 'auto',
      outlineColor: theme.palette.primary.main
    }
  })
}));

type Props = {
  imgConfig: ImageConfig;
  children: ReactNode;
  cls?: string;
  onClick?: () => void;
  tabIndex?: number;
};

const ImageContainer: FC<PropsWithChildren<Props>> = ({
  imgConfig,
  children,
  cls,
  onClick,
  tabIndex = -1
}) => {
  const classes = useStyles(imgConfig);

  const className = clsx(classes.imageContainer, cls);

  return (
    <Box className={className} onClick={onClick} tabIndex={tabIndex}>
      {children}
    </Box>
  );
};

export default ImageContainer;
