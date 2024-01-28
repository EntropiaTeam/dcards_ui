import { SingleCard } from '../context/card/types/CardTypes';

class Card {
  static isCustomCard(card: SingleCard): boolean {
    return card.attributes.some((attr) => attr === 'photo' || attr === 'overlay');
  }

  static isOverlayCard(card: SingleCard): boolean {
    return card.attributes.some((attr) => attr === 'overlay');
  }
}

export default Card;
