import React, { FC } from 'react';
import {
  Grid, makeStyles, Theme, Typography
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { CardImage, ImageContainer } from '..';
import { useCardContext } from '../../context';
import { Category } from '../../context/categories/types/CategoriesTypes';
import useAppConfig from '../../hooks/useAppConfig';
import { getImageUrl } from '../../helpers';

type Props = {
  category: Category;
  tabIndex?: number;
};

const useStyles = makeStyles((theme: Theme) => ({
  categoryContainer: {
    display: 'flex',
    flexFlow: 'column',
    textAlign: 'center',
    margin: '27px 0 8px 0',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none'
    },
    '&:focus-visible': {
      outline: 'auto',
      outlineColor: theme.palette.primary.main
    }
  },
  imagesContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 16,
    paddingTop: 16
  },
  imgContainer: {
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0px 7px 49px rgba(202, 204, 213, 0.45)'
  }
}));

const CategoryPreview: FC<Props> = ({ category, tabIndex }) => {
  const classes = useStyles();
  const history = useHistory();
  const { appConfig } = useAppConfig();
  const { actions: { setCardToEdit } } = useCardContext();

  const imgConfigRotateToLeft = {
    ...appConfig.categoriesImgConfig,
    rotation: -8
  };

  const imgConfigRotateToRight = {
    ...appConfig.categoriesImgConfig,
    rotation: 8,
    leftMargin: -60
  };

  const handlePushToNextRoute = (): void => {
    if (appConfig.customCategoryId === category.id) {
      const card = category.cards[0];
      setCardToEdit(card);

      const targetLocation = `/categories/${category.id}/cards/${card.id}/edit/photo`;
      history.push({ pathname: `/categories/${category.id}/cards/agreement`, state: { targetLocation } });
    } else {
      history.push(`/categories/${category.id}/cards`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      handlePushToNextRoute();
    }
  };

  const firstImgConfig = category.cards.length === 1
    ? appConfig.categoriesImgConfig
    : imgConfigRotateToLeft;

  const bottomPreview = category.preview_cards[0];
  const topPreview = category.preview_cards[1];
  return (
    <Grid
      item
      xs={6}
      sm={6}
      md={3}
      lg={3}
      xl={3}
      className={classes.categoryContainer}
      onClick={handlePushToNextRoute}
      onKeyDown={handleKeyDown}
      tabIndex={tabIndex}
    >
      <div className={classes.imagesContainer}>
        {bottomPreview && (
          <ImageContainer imgConfig={firstImgConfig} cls={classes.imgContainer}>
            <CardImage
              imageUrl={getImageUrl(`${bottomPreview}_front.png`, 'thumb')}
              cardName={bottomPreview}
            />
          </ImageContainer>
        )}
        {topPreview && (
        <ImageContainer imgConfig={imgConfigRotateToRight} cls={classes.imgContainer}>
          <CardImage
            imageUrl={getImageUrl(`${category.preview_cards[1]}_front.png`, 'thumb')}
            cardName={topPreview}
          />
        </ImageContainer>
        )}
      </div>
      <Typography>{category.name}</Typography>
    </Grid>
  );
};

export default CategoryPreview;
