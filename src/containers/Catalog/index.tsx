import React, {
  memo, FC, useState, useEffect
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CardsList, NavBar } from '../../components';
import CustomScrollbar from '../../components/UI/CustomScrollbar';
import { useCategoriesContext, useTextContext, useCustomImageContext } from '../../context';
import { Category } from '../../context/categories/types/CategoriesTypes';
import { RoutePath } from '../../enums/Routes';

type CatalogParams = {
  categoryId: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    padding: 30,
    paddingTop: 35,
    [theme.breakpoints.only('xs')]: {
      padding: '35px 10px'
    }
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  categoryTitle: {
    paddingLeft: '25px',
    paddingTop: '16px',
    marginTop: '10px',
    [theme.breakpoints.only('xs')]: {
      paddingLeft: '10px'
    }
  }
}));

const filterCardsByCategory = (
  categoryId: string,
  categories: Category[]
): Category[] => categories.filter(
  (category: Category) => category.id === categoryId
);

const Catalog: FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const {
    state: { categories }
  } = useCategoriesContext();
  const { actions: { resetCustomTextState } } = useTextContext();
  const { actions: { resetCustomImageState } } = useCustomImageContext();

  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const params = useParams<CatalogParams>();

  useEffect(() => {
    const cardsByCategoryId = filterCardsByCategory(params.categoryId, categories);
    setFilteredCategories(cardsByCategoryId);
    if (cardsByCategoryId.length) setCategoryName(cardsByCategoryId[0].name);
  }, [params, categories]);

  useEffect(() => {
    resetCustomTextState();
    resetCustomImageState();
  }, [resetCustomTextState, resetCustomImageState]);

  const onBackClick = () => {
    history.push({ pathname: RoutePath.Root, state: { prevPath: 'Catalog' } });
  };

  const categoriesContent = filteredCategories.map((category: Category) => (
    <Box key={`category-${category.name}`}>
      <CardsList
        key={`${Math.random()}-category`}
        cards={category.cards}
      />
    </Box>
  ));

  return (
    <>
      <NavBar pageTitle={categoryName} onBackClick={onBackClick} />
      <CustomScrollbar>
        <Box className={classes.container}>
          { categoriesContent }
        </Box>
      </CustomScrollbar>
    </>
  );
};

export default memo(Catalog);
