import React from 'react';
import { mount } from 'enzyme';
import CardImage from '.';

describe('<CardImage />', () => {
  const props = {
    imageUrl: 'https://steu2sprntdevstore01.blob.core.windows.net/assets/i/Halloween_A_editor_front.png',
    cardName: 'Birthday_general_A (purplish, bubbly)'
  };

  const wrapper = mount(<CardImage {...props} />);

  it('should renders img tag with proper props', () => {
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('img').prop('src')).toEqual(props.imageUrl);
    expect(wrapper.find('img').prop('alt')).toEqual(props.cardName);
  });
});
