import {
  SET_INITIAL_DATA_SUCCESS,
  SET_INITIAL_DATA_FAILURE,
  SET_INITIAL_DATA_REQUEST
} from '../constants/InitialDataConstants';
import { InitialDataActionTypes } from '../types/InitialDataTypes';
import { InitialDataActions } from './InitialDataActions';

describe('Initial data action creators', () => {
  it('should create an action to set initial data request', () => {
    const expectedAction: InitialDataActionTypes = {
      type: SET_INITIAL_DATA_REQUEST
    };

    expect(InitialDataActions.setInitialDataRequest()).toEqual(expectedAction);
  });

  it('should create an action to set initial data success', () => {
    const expectedAction: InitialDataActionTypes = {
      type: SET_INITIAL_DATA_SUCCESS
    };

    expect(InitialDataActions.setInitialDataSuccess()).toEqual(expectedAction);
  });

  it('should create an action to set initial data failure', () => {
    const error = 'The request is failured';

    const expectedAction: InitialDataActionTypes = {
      type: SET_INITIAL_DATA_FAILURE,
      payload: error
    };

    expect(InitialDataActions.setInitialDataFailure(error)).toEqual(expectedAction);
  });
});
