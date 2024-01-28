import React, { memo, FC } from 'react';
import { Grid } from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { useHistory, useRouteMatch } from 'react-router-dom';
import CardImage from '../UI/CardImage';
import ImageContainer from '../UI/ImageContainer';
import { useCardContext } from '../../context';
import { SingleCard } from '../../context/card/types/CardTypes';
import useAppConfig from '../../hooks/useAppConfig';
import CardUtils from '../../utils/Card';
import { RoutePath } from '../../enums/Routes';
import { getImageUrl } from '../../helpers';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: theme.palette.background.paper
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    padding: '0 10px',
    [theme.breakpoints.only('xs')]: {
      marginBottom: 20
    }
  },
  imgContainer: {
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0px 7px 49px rgba(202, 204, 213, 0.45)'
  }
}));

type Props = {
  cards: SingleCard[];
};

const CardsList: FC<Props> = ({ cards }) => {
  const classes = useStyles();
  const history = useHistory();
  const catalogRouteMatch = useRouteMatch({ path: RoutePath.Catalog, exact: true });
  const { appConfig } = useAppConfig();
  const { actions: { setCardToEdit } } = useCardContext();

  const handleClick = (card: SingleCard) => (): void => {
    const targetLocation = `${catalogRouteMatch!.url}/${card.id}/edit/photo`;
    setCardToEdit(card);

    if (CardUtils.isCustomCard(card)) {
      history.push({ pathname: `${catalogRouteMatch!.url}/agreement`, state: { targetLocation } });
      return;
    }
    if (catalogRouteMatch) history.push(targetLocation);
  };

  const handleCardKeyDown = (
    card: SingleCard,
    event: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    if (event.key === 'Enter') {
      handleClick(card)();
    }
  };

  const cardTabIndexIsset = 3;

  const renderCards = cards.length && cards.map((card: SingleCard, idx: number) => (
    <Grid
      item
      xs={6}
      sm={6}
      md={4}
      lg={4}
      xl={4}
      key={`card-${card.category[0]}-${card.id}`}
      className={classes.cardContainer}
      onKeyDown={(event) => {
        handleCardKeyDown(card, event);
      }}
    >
      <ImageContainer
        imgConfig={appConfig.cardsListImgConfig}
        cls={classes.imgContainer}
        onClick={handleClick(card)}
        tabIndex={idx + cardTabIndexIsset}
      >
        <CardImage
          imageUrl={getImageUrl(`${card.id}_front.png`, 'gallery')}
          cardName={card.name}
        />
      </ImageContainer>
    </Grid>
  ));

  return (
    <Grid container className={classes.root}>
      {renderCards}
    </Grid>
  );
};

export default memo(CardsList);
