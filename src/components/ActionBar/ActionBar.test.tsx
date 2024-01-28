import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import ActionBar from '.';

describe('<ActionBar />', () => {
  const props = {
    navLinks: [1, 2, 3, 4, 5],
    mainButtonCallback: jest.fn()
  };

  const ActionBarComponent = renderer.create(<ActionBar {...props} />).toJSON();
  const wrapper = mount(<ActionBar {...props} />);

  it('should render ActionBar component correctly', () => {
    expect(ActionBarComponent).toMatchSnapshot();
  });

  it('should render ComponentNavLinks with given navlinks', () => {
    const ComponentNavLinksText = wrapper.find('.MuiGrid-justify-xs-space-around').text();
    expect(ComponentNavLinksText).toBe(props.navLinks.join(''));
  });

  it('should render ActionBar component with proper navLinks prop', () => {
    expect((wrapper).prop('navLinks')).toEqual(props.navLinks);
  });
});
