import React, { FC } from 'react';
import { TypographyClassKey, Grid } from '@material-ui/core';
import { Category } from '../../context/categories/types/CategoriesTypes';
import TranslatedTypography from '../UI/TranslatedTypography';
import CategoryPreview from '../CategoryPreview';

interface MatchedCategoryProps {
  className: string;
  classes: Partial<Record<TypographyClassKey, string>>;
  matchedCategory: Category[];
}

const MatchedCategory: FC<MatchedCategoryProps> = ({ className, classes, matchedCategory }) => (
  <Grid container className={className}>
    <TranslatedTypography classes={classes} i18nKey="categoriesList.matchedTitle" />
    <Grid container>
      {
        matchedCategory.map((category: Category) => (
          <CategoryPreview key={`category-${category.name}-${Date.now()}`} category={category} />
        ))
      }
    </Grid>
  </Grid>

);

export default MatchedCategory;
