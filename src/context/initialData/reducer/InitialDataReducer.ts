import {
  SET_INITIAL_DATA_SUCCESS,
  SET_INITIAL_DATA_FAILURE,
  SET_INITIAL_DATA_REQUEST
} from '../constants/InitialDataConstants';
import { InitialDataPrimaryState, InitialDataActionTypes } from '../types/InitialDataTypes';

// Initial state
export const initialState: InitialDataPrimaryState = {
  error: '',
  isLoading: false
};

export default (state = initialState, action: InitialDataActionTypes): InitialDataPrimaryState => {
  switch (action.type) {
    case SET_INITIAL_DATA_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case SET_INITIAL_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: ''
      };
    case SET_INITIAL_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
