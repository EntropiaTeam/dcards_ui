import React from 'react';
import {
  CardProvider,
  CategoriesProvider,
  TextProvider,
  OrderProvider,
  CustomImageProvider
} from '.';
import { NavigationProvider } from './navigation';

export const GlobalProvider: React.FunctionComponent = ({ children }) => (
  <NavigationProvider>
    <CardProvider>
      <CategoriesProvider>
        <TextProvider>
          <CustomImageProvider>
            <OrderProvider>
              {children}
            </OrderProvider>
          </CustomImageProvider>
        </TextProvider>
      </CategoriesProvider>
    </CardProvider>
  </NavigationProvider>
);
