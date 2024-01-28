import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

describe('test App layout', () => {
  const AppComponent = renderer.create(<App />).toJSON();

  it('should render App Component correctly', () => {
    expect(AppComponent).toMatchSnapshot();
  });
});
