import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import CustomTextEditor from '.';
import { TextProvider } from '../../../context/text';

interface IntlMock {
  useTranslation: () => void;
}

interface TranslationMock {
  t: () => void;
}

interface TextAreaProps {
  onHeightChange: () => void;
}

interface ElementProps {
  props: () => void;
}

jest.mock('react-i18next', (): IntlMock => ({
  useTranslation: (): TranslationMock => ({
    t: (key: string): string => key
  })
}));

describe('<CustomTextEditor />', () => {
  const blurHandlerMock = jest.fn();
  const props = {
    blurHandler: blurHandlerMock,
    placeholderText: 'Test placeholder',
    tabIndex: 2,
    maxLength: 370,
    pageHeight: 200,
    textareaHeight: 400
  };

  const wrapper = mount(
    <TextProvider>
      <CustomTextEditor {...props} />
    </TextProvider>
  );
  const textAreaComponent = wrapper.childAt(0).find('textarea').first();

  it('should call bloor function', () => {
    act(() => {
      textAreaComponent.props().onBlur();
    });
    expect(blurHandlerMock).toHaveBeenCalledTimes(1);
  });

  it('should set correct props in deep', () => {
    const settedPlaceholder = textAreaComponent.getDOMNode().getAttribute('placeholder');
    const tabIndex = textAreaComponent.getDOMNode().getAttribute('tabIndex');
    expect(settedPlaceholder).toBe(props.placeholderText);
    expect(tabIndex).toBe(String(props.tabIndex));
  });

  it('should track change height', () => {
    const parentCompnent: ElementProps = textAreaComponent.parent();
    const parentProps: TextAreaProps = parentCompnent.props();
    const node = textAreaComponent.getDOMNode();
    const original = node.getAttribute('maxLength');
    act(() => {
      parentProps.onHeightChange(500);
    });
    const compared = node.getAttribute('maxLength');
    expect(original).toBeTruthy();
    expect(compared).toBeTruthy();
    expect(Number(compared)).toBeGreaterThanOrEqual(Number(original));
  });

  it('should render CustomTextEditor component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
