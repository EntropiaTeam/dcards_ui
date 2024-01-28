import { NavigationInitialState, NavigationActions } from '../types/NavigationTypes';
import { SHOW_BACK_BUTTON, SET_IFRAME_PARAMS } from '../constants/NavigationConstants';
import reducer from './NavigationReducer';

describe('Navigation reducer', () => {
  const initialState: NavigationInitialState = {
    isBackButtonVisible: true,
    iframeParams: {
      token: '',
      locale: '',
      occasion: ''
    }
  };

  it('should return the initial state', () => {
    expect(reducer(initialState, {} as NavigationActions)).toEqual(initialState);
  });

  it('should set show back button to false', () => {
    const payload = false;

    expect(reducer(initialState, { type: SHOW_BACK_BUTTON, payload })).toEqual({
      isBackButtonVisible: payload,
      iframeParams: {
        token: '',
        locale: '',
        occasion: ''
      }
    });
  });

  it('should set iframe params', () => {
    const payload = {
      locale: 'en-US',
      token: 'MTYxMjI1NjQ2NTk5Mw==',
      occasion: '55'
    };

    expect(reducer(initialState, { type: SET_IFRAME_PARAMS, payload })).toEqual({
      isBackButtonVisible: true,
      iframeParams: payload
    });
  });
});
