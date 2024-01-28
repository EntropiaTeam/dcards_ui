import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import TextPageControls from '.';

const mockHistoryPush = jest.fn();

interface ReactRouterDom {
  useHistory: () => void;
  useRouteMatch: () => void;
}

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

jest.mock('react-router-dom', (): ReactRouterDom => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  }),
  useRouteMatch: jest.fn().mockReturnValue(true)
}));

describe('<TextPageControls />', () => {
  const props = {
  };

  const TextPageControlsComponent = renderer.create(<TextPageControls {...props} />).toJSON();
  const wrapper = mount(<TextPageControls {...props} />);

  it('should track history when edit button click', () => {
    act(() => {
      wrapper.find('button').first().simulate('click');
    });
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should render TextPageControls component correctly', () => {
    expect(TextPageControlsComponent).toMatchSnapshot();
  });
});
