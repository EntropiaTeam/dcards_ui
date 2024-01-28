import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Error from '.';
import { MainButton } from '..';

describe('<Error />', () => {
  const mockCallback = jest.fn();

  const props = {
    errorText: 'The error is occured!',
    retryCallback: mockCallback
  };

  const ErrorComponent = renderer.create(<Error {...props} />).toJSON();

  const wrapper = mount(<Error {...props} />);

  it('should render Error component correctly', () => {
    expect(ErrorComponent).toMatchSnapshot();
  });

  it('should render Error component with proper errorText prop', () => {
    expect((wrapper).prop('errorText')).toEqual(props.errorText);
  });

  it('should render one MainButton component with proper text', () => {
    expect(wrapper.find(MainButton)).toHaveLength(1);
    expect(wrapper.find(MainButton).text()).toEqual('Retry');
  });

  it('should simulate click to invoke retry callback', () => {
    wrapper.find(MainButton).simulate('click');
    expect(mockCallback.mock.calls.length).toEqual(1);
    expect(props.retryCallback).toHaveBeenCalledTimes(1);
  });
});
