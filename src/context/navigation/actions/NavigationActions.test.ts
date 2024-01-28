import { SHOW_BACK_BUTTON, SET_IFRAME_PARAMS } from '../constants/NavigationConstants';
import { NavigationActions } from './NavigationActions';

describe('Navigation action creators', () => {
  it('should create an action to set show_back_button', () => {
    const payload = false;
    const expectedAction = {
      type: SHOW_BACK_BUTTON,
      payload: false
    };

    expect(NavigationActions.setIsBackButtonVisible(payload)).toEqual(expectedAction);
  });

  it('should create an action to set iframe params', () => {
    const payload = {
      locale: 'en-US',
      token: 'MTYxMjI1NjQ2NTk5Mw==',
      occasion: '55'
    };
    const expectedAction = {
      type: SET_IFRAME_PARAMS,
      payload
    };

    expect(NavigationActions.setIframeParams(payload)).toEqual(expectedAction);
  });
});
