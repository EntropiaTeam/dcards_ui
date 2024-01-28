import React, {
  createContext, useContext, useReducer, useMemo, FC
} from 'react';
import { CustomImageActionsType, UseCustomImageContext } from './types/CustomImageTypes';
import { CustomImageActions } from './actions/CustomImageActions';
import CustomImageReducer, { initialState } from './reducer/CustomImageReducer';

// Create Context
export const CustomImageContext = createContext(initialState);
export const CustomImageActionsContext = createContext({} as CustomImageActionsType);
export const useCustomImageContext = (): UseCustomImageContext => (
  { state: useContext(CustomImageContext), actions: useContext(CustomImageActionsContext) }
);

export const CustomImageProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(CustomImageReducer, initialState);
  // Actions
  const actions: CustomImageActionsType = useMemo(() => ({
    setErrors: CustomImageActions.setErrors(dispatch),
    setUserImage: CustomImageActions.setUserImage(dispatch),
    setCropper: CustomImageActions.setCropper(dispatch),
    setAgreement: CustomImageActions.setAgreement(dispatch),
    setAgreementTranslation: CustomImageActions.setAgreementTranslation(dispatch),
    setCroppedImage: CustomImageActions.setCroppedImageValue(dispatch),
    setCropperBackImageURL: CustomImageActions.setCropperBackImageValue(dispatch),
    setRotationDegree: CustomImageActions.setRotationDegree(dispatch),
    setZoomRatio: CustomImageActions.setZoomRatio(dispatch),
    setCroppedCanvasData: CustomImageActions.setCroppedCanvasData(dispatch),
    resetCustomImageState: CustomImageActions.resetCustomImageState(dispatch)
  }), [dispatch]);

  return (
    <CustomImageContext.Provider value={state}>
      <CustomImageActionsContext.Provider value={actions}>
        {children}
      </CustomImageActionsContext.Provider>
    </CustomImageContext.Provider>
  );
};
