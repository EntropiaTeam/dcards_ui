import React, {
  ChangeEvent, forwardRef, useCallback, useState, useEffect
} from 'react';
import { useTranslation } from 'react-i18next';
import TextareaAutosize from 'react-textarea-autosize';
import { makeStyles, Theme } from '@material-ui/core';
import { useTextContext } from '../../../context';
import useAppConfig from '../../../hooks/useAppConfig';
import { AppConfig } from '../../../utils/AppConfig';

const useStyles = makeStyles((theme: Theme) => ({
  textArea: {
    width: '100%',
    minHeight: '48px',
    marginTop: ({ topOffset }: StyleProps) => (topOffset),
    padding: 0,
    border: 'none',
    outline: 'none',
    resize: 'none',
    textAlign: 'center',
    fontFamily: 'inherit',
    backgroundColor: 'transparent',
    fontSize: 'inherit',
    lineHeight: ({ lineHeightSize }: StyleProps) => `${lineHeightSize}px`,
    fontWeight: 'inherit',
    color: 'inherit',
    cursor: 'pointer',
    overflow: 'hidden',
    lineBreak: 'normal',
    '&::placeholder': {
      color: '#C8102E',
      fontFamily: theme.typography.button.fontFamily,
      fontSize: '16px',
      textDecoration: 'underline'
    },
    transform: ({ desktopFitScale }: StyleProps) => `scale(${desktopFitScale || 1})`,
    transformOrigin: '50% 0'
  },
  textAreaWrapper: {
    margin: '0 auto',
    width: ({ width }) => width,
    height: ({
      desktopFitScale, currentTextareaHeight
    }: StyleProps) => `${desktopFitScale ? (desktopFitScale * currentTextareaHeight) : currentTextareaHeight}px`
  }
}));

type Props = {
  isMobileView?: boolean;
  placeholderText?: string;
  desktopFitScale?: number;
  textareaHeight: number;
  pageHeight: number;
  width?: string;
  topOffset?: string;
  tabIndex?: number;
  blurHandler?: () => void;
};

type StyleProps = {
  desktopFitScale?: number;
  topOffset: string;
  currentTextareaHeight: number;
  lineHeightSize: number;
  width: string;
};

const CustomTextEditor = forwardRef<HTMLTextAreaElement, Props>(({
  placeholderText,
  isMobileView,
  textareaHeight,
  pageHeight,
  desktopFitScale,
  width,
  topOffset,
  tabIndex = 0,
  blurHandler
}, editorRef) => {
  const [pasting, setPasting] = useState(false);
  const [isTextEditorFocused, setIsTextEditorFocused] = useState(false);
  const [combinedEditorRef] = useState(
    editorRef as unknown as React.MutableRefObject<HTMLInputElement>
  );
  const {
    state: {
      isTextHeightValid, maxTextareaHeight, currentTextareaHeight
    },
    actions: {
      setCustomText, setMaxTextareaHeight, setCurrentTextareaHeight
    }
  } = useTextContext();
  const { appConfig, cardConfig } = useAppConfig();
  const { font, lineHeight: { sizeRatio } } = cardConfig;
  const lineHeightSize = Number(font.size) * sizeRatio;
  const maxTextareaLength = (37 * (Math.floor(maxTextareaHeight / lineHeightSize)));
  const { t } = useTranslation();
  const localizedPlaceholder = placeholderText && t(placeholderText);
  const computedPixelHeight = AppConfig.percentsToPixelsHeight(pageHeight, textareaHeight);
  const classes = useStyles({
    desktopFitScale,
    currentTextareaHeight,
    lineHeightSize,
    width: width || '100%',
    topOffset: topOffset || '0px'
  });

  const textareaHeightHandler = useCallback((height: number): void => {
    setCurrentTextareaHeight(height);
    setMaxTextareaHeight(computedPixelHeight);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [computedPixelHeight]);

  const focusOutTextarea = useCallback((): void => {
    setIsTextEditorFocused(false);
    if (blurHandler) {
      blurHandler();
    }
  }, [blurHandler]);

  const focusOnTextarea = useCallback((): void => {
    setIsTextEditorFocused(true);
  }, []);

  useEffect(() => {
    if (combinedEditorRef
        && combinedEditorRef.current
        && isMobileView
    ) {
      const bottomOffset = isTextEditorFocused ? currentTextareaHeight * 1.5 : 0;
      combinedEditorRef.current.style.marginBottom = `${bottomOffset}px`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTextareaHeight, isTextEditorFocused]);

  const customTextHandler = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;

    if (pasting) {
      const pastedValue = value
        .replace(/(^\s*)|(\s*$)/gi, '') // removes leading and trailing spaces
        .replace(/[ ]{2,}/gi, ' ') // replaces multiple spaces with one space
        .replace(/\n +/, '\n') // removes spaces after newlines
        .replace(/(\r\n|\n|\r)/gm, ''); // removes new lines and tabs

      let pastedSubstringValue = pastedValue.substring(0, maxTextareaLength);

      if (pastedValue.length >= maxTextareaLength
          && combinedEditorRef
          && combinedEditorRef.current
      ) {
        pastedSubstringValue += '\n';
        combinedEditorRef.current.value = pastedSubstringValue;
      }

      setCustomText(pastedSubstringValue);
      setPasting(false);
    }

    if (!pasting) {
      setCustomText(value);
    }
  };

  const handlePaste = (): void => {
    setPasting(true);
    if (combinedEditorRef && combinedEditorRef.current) {
      textareaHeightHandler(Number(combinedEditorRef.current.clientHeight));
    }
  };

  const placeholder = !isTextEditorFocused ? localizedPlaceholder : '';

  return (
    <div className={classes.textAreaWrapper}>
      <TextareaAutosize
        ref={editorRef}
        maxLength={isTextHeightValid ? appConfig.maxTextareaLength : 0}
        className={classes.textArea}
        placeholder={placeholder}
        onChange={customTextHandler}
        onHeightChange={(height) => textareaHeightHandler(height)}
        onBlur={focusOutTextarea}
        onFocus={focusOnTextarea}
        onPaste={handlePaste}
        tabIndex={tabIndex}
      />
    </div>
  );
});

export default CustomTextEditor;
