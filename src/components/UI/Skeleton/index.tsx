import React, { FC } from 'react';
import { Skeleton as MUISkeleton } from '@material-ui/lab';
import ImageIcon from '@material-ui/icons/Image';
import { makeStyles, styled } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
    position: 'absolute'
  }
}));

const SkeletonContainer = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#fff',
  zIndex: 100
});

const SkeletonImage = styled(ImageIcon)({
  display: 'block',
  color: 'lightgray',
  width: '100%',
  height: '100%',
  margin: 'auto'
});

const Skeleton: FC = () => {
  const classes = useStyles();

  return (
    <SkeletonContainer>
      <MUISkeleton className={classes.root} variant="rect" height="100%" width="100%" />
      <SkeletonImage />
    </SkeletonContainer>
  );
};

export default Skeleton;
