import React from 'react';
import renderer from 'react-test-renderer';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CropperControls, IconButton } from '..';

configure({ adapter: new Adapter() });

describe('<CropperControls />', () => {
  const props = {
    onRotate: jest.fn(),
    onRemove: jest.fn()
  };

  const CropperControlsComponent = renderer.create(<CropperControls {...props} />).toJSON();

  const wrapper = mount(<CropperControls {...props} />);

  it('should render CropperControls component correctly', () => {
    expect(CropperControlsComponent).toMatchSnapshot();
  });

  it('should render one Slider Component with prop "disabled" that is equal to true', () => {
    expect(wrapper.find(IconButton)).toHaveLength(2);
  });
});
