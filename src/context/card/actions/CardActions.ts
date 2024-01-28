import { Dispatch } from 'react';
import { SET_CARD } from '../constants/CardConstants';
import { SingleCard, SetCardAction } from '../types/CardTypes';
import AdobeAnalytics from '../../../utils/AdobeAnalytics';

const setCard = (card: SingleCard): SetCardAction => ({
  type: SET_CARD,
  payload: card
});

const setCardToEdit = (dispatch: Dispatch<SetCardAction>) => (
  card: SingleCard
): void => {
  dispatch(setCard(card));
  AdobeAnalytics.getInstance().personalizeCard();
};

export const CardActions = {
  setCardToEdit,
  setCard
};
