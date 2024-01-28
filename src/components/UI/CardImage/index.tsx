import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  image: ({
    maxHeight, maxWidth, position, zIndex
  }: CardStyles) => ({
    width: '100%',
    color: '#fff',
    maxHeight,
    maxWidth,
    position,
    zIndex
  })
});

export type CardStyles = {
  maxHeight: number | 'unset';
  maxWidth: number | 'unset';
  position: 'unset' | 'absolute';
  zIndex?: number;
};

type Props = {
  imageUrl: string;
  cardName?: string;
  styles?: CardStyles;
};

const defaultStyles: CardStyles = { maxHeight: 'unset', maxWidth: 'unset', position: 'unset' };

const CardImage: FC<Props> = ({ imageUrl, cardName, styles }) => {
  const customStyles = { ...defaultStyles, ...styles };
  const classes = useStyles(customStyles);

  return (
    <img
      src={imageUrl}
      className={classes.image}
      alt={cardName}
    />
  );
};

export default CardImage;
