import React, { FC, memo, useEffect } from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import {
  CustomScrollbar,
  NavBar,
  TranslatedTypography
} from '../../components';
import MatchedCategories from '../../components/MatchedCategory';
import CategoryPreview from '../../components/CategoryPreview';
import {
  useCategoriesContext,
  useNavigationContext,
  useTextContext,
  useCustomImageContext
} from '../../context';
import { Category } from '../../context/categories/types/CategoriesTypes';
import useAppConfig from '../../hooks/useAppConfig';
import 'url-search-params-polyfill';

export const useStyles = makeStyles((theme: Theme) => ({
  categoriesContainer: {
    padding: '0px 40px 20px 40px',
    [theme.breakpoints.only('xs')]: {
      padding: '0px 6px 20px 6px'
    }
  },
  categoriesContainerTwo: {
    padding: '20px 40px',
    [theme.breakpoints.only('xs')]: {
      padding: '0px 6px 20px 6px'
    }
  },
  customScroll: {
    '&>div:last-child': {
      marginBottom: '30px',
      marginRight: '6px'
    }
  },
  categoriesTitle: {
    display: 'flex',
    color: '#B1B4C3',
    width: '100%',
    whiteSpace: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0',
    '&:before': {
      content: '""',
      height: '1px',
      width: '100%',
      backgroundColor: '#B1B4C3',
      marginRight: '20px'
    },
    '&:after': {
      content: '""',
      height: '1px',
      width: '100%',
      backgroundColor: '#B1B4C3',
      marginLeft: '20px'
    }
  }
}));

type FilteredCategories = {
  matched: Category[];
  other: Category[];
  isMatched: boolean;
};

type Location = {
  pathname: string;
  state: {
    prevPath: string;
  };
};

const CategoriesContainer: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const location: Location = useLocation();
  const {
    state: { categories }
  } = useCategoriesContext();
  const {
    state: {
      iframeParams: { occasion, locale }
    },
    actions: { changeIsBackButtonVisible }
  } = useNavigationContext();
  const { appConfig } = useAppConfig();
  const {
    actions: { resetCustomTextState }
  } = useTextContext();
  const {
    actions: { resetCustomImageState }
  } = useCustomImageContext();

  useEffect(() => {
    resetCustomTextState();
    resetCustomImageState();
  }, [resetCustomTextState, resetCustomImageState]);

  useEffect(() => {
    changeIsBackButtonVisible(false);
    return () => {
      changeIsBackButtonVisible(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const matchCategoryIdsList = (): string[] => {
    const categoryIds: string[] = [];
    const prevPath = location.state && location.state.prevPath;

    categories.forEach((category: Category) => {
      if (category.occasion_maps && category.occasion_maps[locale]) {
        const occasionExist = category.occasion_maps[locale].includes(
          Number(occasion)
        );
        if (occasionExist) {
          categoryIds.push(category.id);
        }
      }
    });

    if (categoryIds.length === 1 && !prevPath) {
      history.push(`/categories/${categoryIds[0]}/cards`);
    }

    return categoryIds;
  };

  const getFilterCondition = (
    category: Category,
    isForMatch?: boolean
  ): boolean => {
    const categoryIdsList: string[] = matchCategoryIdsList();

    if (isForMatch) {
      return categoryIdsList.some((id: string) => id === category.id);
    }
    return categoryIdsList.every((id: string) => id !== category.id);
  };

  const filterCategories = (): FilteredCategories => {
    let matchedCategories: Category[] = [];
    let otherCategories: Category[] = [];
    const isOccasionExist = Boolean(occasion);

    if (occasion) {
      matchedCategories = categories.filter(
        (category: Category): boolean => getFilterCondition(category, isOccasionExist)
      );
    }

    const customCategory = categories.find(
      (category: Category) => appConfig.customCategoryId === category.id
    );

    if (customCategory) {
      const categoriesWithoutCustom = categories.filter(
        (category: Category): boolean => appConfig.customCategoryId !== category.id
          && getFilterCondition(category)
      );

      otherCategories = [customCategory, ...categoriesWithoutCustom];
    } else {
      const categoriesByFilterCondition = categories.filter(
        (category: Category): boolean => getFilterCondition(category)
      );

      otherCategories = categoriesByFilterCondition;
    }

    return {
      matched: matchedCategories,
      other: otherCategories,
      isMatched: Boolean(matchedCategories.length)
    };
  };

  const filteredCategories: FilteredCategories = filterCategories();

  const categoriesContainerStyles = filteredCategories.isMatched
    ? classes.categoriesContainer
    : classes.categoriesContainerTwo;

  const cardTabIndexIsset = 2;

  return (
    <>
      <NavBar pageTitle="editorMessage.customizeCard" />
      <CustomScrollbar>
        {filteredCategories.isMatched && (
          <MatchedCategories
            className={classes.categoriesContainer}
            classes={{ root: classes.categoriesTitle }}
            matchedCategory={filteredCategories.matched}
          />
        )}
        <Grid container className={categoriesContainerStyles}>
          {filteredCategories.isMatched && (
            <TranslatedTypography
              classes={{ root: classes.categoriesTitle }}
              i18nKey="categoriesList.otherTitle"
            />
          )}
          <Grid container>
            {filteredCategories.other.map((category: Category, idx: number) => (
              <CategoryPreview
                key={`category-${category.name}-${Date.now()}`}
                category={category}
                tabIndex={idx + cardTabIndexIsset}
              />
            ))}
          </Grid>
        </Grid>
      </CustomScrollbar>
    </>
  );
};

export default memo(CategoriesContainer);
