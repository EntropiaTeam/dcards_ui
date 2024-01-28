import {
  SET_INITIAL_DATA_SUCCESS,
  SET_INITIAL_DATA_FAILURE,
  SET_INITIAL_DATA_REQUEST
} from '../constants/InitialDataConstants';
import reducer from './InitialDataReducer';
import { InitialDataPrimaryState, InitialDataActionTypes } from '../types/InitialDataTypes';

describe('Initial data Reducer', () => {
  const initialState: InitialDataPrimaryState = {
    isLoading: false,
    error: ''
  };

  it('should return the initial state', () => {
    expect(reducer(initialState, {} as InitialDataActionTypes)).toEqual(initialState);
  });

  it('should handle SET_INITIAL_DATA_REQUEST', () => {
    const setInitialDataRequest: InitialDataActionTypes = {
      type: SET_INITIAL_DATA_REQUEST
    };

    const newState: InitialDataPrimaryState = {
      isLoading: true,
      error: ''
    };

    expect(reducer(initialState, setInitialDataRequest)).toEqual(newState);
  });

  it('should handle SET_INITIAL_DATA_SUCCESS', () => {
    const setInitialDataSuccess: InitialDataActionTypes = {
      type: SET_INITIAL_DATA_SUCCESS
    };

    const newState: InitialDataPrimaryState = {
      isLoading: false,
      error: ''
    };

    expect(reducer(initialState, setInitialDataSuccess)).toEqual(newState);
  });

  it('should handle SET_INITIAL_DATA_FAILURE', () => {
    const payload = 'The request is failured';

    const setInitialDataFailure: InitialDataActionTypes = {
      type: SET_INITIAL_DATA_FAILURE,
      payload
    };

    const newState: InitialDataPrimaryState = {
      isLoading: false,
      error: 'The request is failured'
    };

    expect(reducer(initialState, setInitialDataFailure)).toEqual(newState);
  });
});
