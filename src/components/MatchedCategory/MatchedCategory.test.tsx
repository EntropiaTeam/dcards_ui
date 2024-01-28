import React from 'react';
import renderer from 'react-test-renderer';
import MatchedCategory from '.';

interface IntlMock {
  useTranslation: () => void;
}

interface TranslationMock {
  t: () => void;
}

jest.mock('react-i18next', (): IntlMock => ({
  useTranslation: (): TranslationMock => ({
    t: (key: string): string => key
  })
}));

describe('<MatchedCategory />', () => {
  const props = {
    matchedCategory: [{
      name: 'Test category',
      cards: [],
      preview_cards: [{}]
    }]
  };

  const MatchedCategoryComponent = renderer.create(<MatchedCategory {...props} />).toJSON();

  it('should render MatchedCategory component correctly', () => {
    expect(MatchedCategoryComponent).toMatchSnapshot();
  });
});
