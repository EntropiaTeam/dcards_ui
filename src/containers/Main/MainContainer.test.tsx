import React from 'react';
import { mount } from 'enzyme';
import MainContainer from '.';
import {
  CircularProgressBar
} from '../../components';
import { GlobalProvider } from '../../context/GlobalProvider';
import { OrderContext } from '../../context/order';

describe('<MainContainer />', () => {
  let wrapper;

  const initOrderState = {
    error: null,
    isLoading: false,
    progress: 0,
    printibleID: ''
  };

  const updatedOrderState = {
    error: null,
    isLoading: true,
    progress: 0.5,
    printibleID: ''
  };

  const MainContainerWithInitStepState = () => (
    <GlobalProvider>
      <MainContainer />
    </GlobalProvider>
  );

  const MainContainerWithUpdatedStepState = () => (
    <GlobalProvider>
      <OrderContext.Provider value={initOrderState}>
        <MainContainer />
      </OrderContext.Provider>
    </GlobalProvider>
  );

  const MainContainerWithUpdatedState = () => (
    <GlobalProvider>
      <OrderContext.Provider value={updatedOrderState}>
        <MainContainer />
      </OrderContext.Provider>
    </GlobalProvider>
  );
  // TODO: make new tests for this stuff
  it('should render Header and Footer components', () => {
    wrapper = mount(<MainContainerWithInitStepState />);
    // expect(wrapper.find(Header)).toHaveLength(1);
    // expect(wrapper.find(Footer)).toHaveLength(1);
    expect(wrapper.find(CircularProgressBar).exists()).toEqual(false);
  });

  it('should render Catalog container when step value equal to 0 initialy', () => {
    wrapper = mount(<MainContainerWithInitStepState />);

    // expect(wrapper.find(Catalog)).toHaveLength(1);
    expect(wrapper.find(CircularProgressBar).exists()).toEqual(false);
  });

  it('should render PhotoEditor container when step value is not equal to 0', () => {
    wrapper = mount(<MainContainerWithUpdatedStepState />);

    // expect(wrapper.find(PhotoEditor)).toHaveLength(1);
    expect(wrapper.find(CircularProgressBar).exists()).toEqual(false);
  });

  it('should render CircularProgressBar component when isLoading from order context is true', () => {
    wrapper = mount(<MainContainerWithUpdatedState />);

    expect(wrapper.find(CircularProgressBar)).toHaveLength(1);
  });
});
