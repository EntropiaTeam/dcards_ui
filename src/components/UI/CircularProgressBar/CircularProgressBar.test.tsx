import React from 'react';
import renderer from 'react-test-renderer';
import CircularProgressBar from '.';

describe('<CircularProgressBar />', () => {
  const CircularProgressBarComponent = renderer.create(<CircularProgressBar />).toJSON();

  it('should render CircularProgressBar component correctly', () => {
    expect(CircularProgressBarComponent).toMatchSnapshot();
  });
});
