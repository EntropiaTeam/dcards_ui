/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Disable this rules for "runes" package
import React, {
  useState, useEffect, memo, useRef, FC, MouseEvent
} from 'react';
import {
  Grid, makeStyles, Theme, useMediaQuery, Box
} from '@material-ui/core';
import { useHistory, useRouteMatch } from 'react-router-dom';
import runes from 'runes';
import {
  ActionBar, CustomTextEditor, EditorConfirmationModal, NavBar
} from '../../components';
import FrontPageAnimation from '../../components/UI/FrontPageAnimation';
import TextPageControls from '../../components/TextPageControls';
import { FrontCardIcon, InsideCardIcon } from '../../components/UI/Icons';
import TranslatedTypography from '../../components/UI/TranslatedTypography';
import NavButton from '../../components/UI/NavButton';
import {
  useCardContext,
  useCustomImageContext,
  useOrderContext,
  useTextContext,
  useNavigationContext
} from '../../context';
import useAppConfig from '../../hooks/useAppConfig';
import useDialog from '../../hooks/useModal';
import { CardConfig } from '../../types';
import { RoutePath } from '../../enums/Routes';
import { EditorDataManager } from '../../utils/EditorDataManager';
import Validator from '../../utils/Validator';
import AdobeAnalytics from '../../utils/AdobeAnalytics';

export const useStyles = makeStyles((theme: Theme) => ({
  navBar: {
    position: 'fixed'
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 16px 30px'
  },
  textEditorContainer: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  textEditorWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    transition: 'all .2s ease-in-out',
    width: ({ sizes }: CardConfig) => sizes.width,
    height: ({ sizes }: CardConfig) => sizes.height,
    backgroundImage: ({ innerImageUrl }: CardConfig) => (
      innerImageUrl ? `url(${innerImageUrl})` : 'none'
    ),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',
    overflow: 'visible',
    border: 'none',
    boxShadow: '0px 7px 49px rgba(202, 204, 213, 0.45)',
    [theme.breakpoints.only('xs')]: {
      transform: 'scale(0.8)'
    }
  },
  editorWrapper: ({ font, lineHeight: { sizeRatio }, textarea: { top, height } }: CardConfig) => ({
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: `${height}%`,
    maxHeight: `${height}%`,
    top: `${top}%`,
    left: 0,
    padding: '0px 14px',
    fontFamily: font.family,
    fontSize: Number(font.size),
    fontWeight: font.weight,
    lineHeight: `${Number(font.size) * sizeRatio}px`,
    color: font.color,
    overflow: 'hidden',
    boxSizing: 'border-box'
  }),
  hiddenTextarea: ({ font, lineHeight: { sizeRatio }, sizes }: CardConfig) => ({
    padding: 0,
    margin: 0,
    border: 'none',
    outline: 'none',
    resize: 'none',
    textAlign: 'center',
    backgroundColor: 'transparent',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    fontFamily: font.family,
    fontSize: Number(font.size),
    fontWeight: font.weight,
    lineHeight: `${Number(font.size) * sizeRatio}px`,
    maxWidth: `${Number(sizes.width)}px`
  })
}));

const TabIndexes = {
  textarea: 3,
  frontButton: 4,
  insideButton: 5,
  mainButton: 6
};

const TextEditor: FC = () => {
  const history = useHistory();
  const textEditorRouteMatch = useRouteMatch(RoutePath.TextEditor);
  const [isBackButtonClicked, setIsBackButtonClicked] = useState(false);
  const [modalCallback, setModalCallback] = useState(() => () => {});
  const { isModalOpen, handleCloseModal, handleOpenModal } = useDialog();
  const {
    cardConfig,
    isCustomCard
  } = useAppConfig();
  const { state: { text, isTextHeightValid } } = useTextContext();
  const { state: { card } } = useCardContext();
  const {
    state: {
      cropper, userImage, agreement, croppedImage
    },
    actions: { setErrors }
  } = useCustomImageContext();
  const { actions } = useOrderContext();
  const { state: { iframeParams: { locale } } } = useNavigationContext();
  const cardOuter = useRef(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const hiddenTextareaRef = useRef<HTMLTextAreaElement>(null);
  const classes = useStyles(cardConfig);
  const isMobileView = useMediaQuery('(max-width:600px)');
  const placeholder = 'placeholder.editorPlaceholder';
  const { width } = cardConfig.sizes;
  const { height } = cardConfig.sizes;

  useEffect(() => {
    if (editorRef && editorRef.current) {
      editorRef.current.value = text;

      if (isMobileView) {
        editorRef.current.setAttribute('readonly', 'readonly');
      }
    }
    setErrors([]);
  }, [text, isMobileView, setErrors]);

  const onOutsideClick = (event: MouseEvent): void => {
    if (event.target !== cardOuter.current) {
      if (isMobileView) {
        history.push(`${textEditorRouteMatch!.url}/mobile`);
      }
      if (editorRef && editorRef.current) {
        editorRef.current.focus();
      }
    } else if (editorRef && editorRef.current) {
      editorRef.current.blur();
    }
  };

  const handleModal = (callback: () => void): void => {
    handleOpenModal();
    setModalCallback(callback);
  };

  const isCharEmoji = (char: string): boolean => {
    const REGEX_EMOJI = /\u00a9|\u00ae|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/g;
    return !char.replace(REGEX_EMOJI, '').length || char.length > 1;
  };

  const applyLineBreaks = (): string => {
    let outputValue = '';
    const newLineRegExp = /\r\n|\r|\n/;
    if (editorRef && editorRef.current && hiddenTextareaRef && hiddenTextareaRef.current) {
      const currentEditor = editorRef.current;
      const currentHiddenArea = hiddenTextareaRef.current;
      currentHiddenArea.style.width = '0px';

      const rawValue = currentEditor.value;
      const runedStrValue: string[] = runes(rawValue);
      const nEmptyWidth = currentEditor.clientWidth;
      let nLastWrappingIndex = -1;

      for (let i = 0; i < runedStrValue.length; i += 1) {
        const currChar = runedStrValue[i];
        if (currChar === ' ' || currChar === '-' || currChar === '+' || isCharEmoji(currChar) || newLineRegExp.test(currChar)) { nLastWrappingIndex = i; }
        currentHiddenArea.value += currChar;
        if (currentHiddenArea.scrollWidth > nEmptyWidth || newLineRegExp.test(currChar)) {
          let buffer = '';
          if (nLastWrappingIndex >= 0) {
            for (let j = nLastWrappingIndex + 1; j < i; j += 1) { buffer += runedStrValue[j]; }
            nLastWrappingIndex = -1;
          }
          buffer += currChar === ' ' ? '' : currChar;
          const bufferLength = !buffer.length ? 1 : buffer.length;
          currentHiddenArea.value = currentHiddenArea.value.substr(
            0, currentHiddenArea.value.length - bufferLength
          );
          if (!newLineRegExp.test(currChar)) {
            outputValue += `${currentHiddenArea.value}\r\n`;
          } else {
            outputValue += currentHiddenArea.value;
          }
          currentHiddenArea.value = buffer;
        }
      }
      outputValue += currentHiddenArea.value;
    }
    return outputValue;
  };

  const handleMainBtnClick = (): void => {
    const trimmedText = applyLineBreaks();

    EditorDataManager.getInstance().sendEditorData({
      card, text: trimmedText, cropper, actions, agreement, croppedImage, locale
    });

    AdobeAnalytics.getInstance().doneButton();
  };

  const handleBackBtnClick = (): void => {
    setIsBackButtonClicked(true);
  };

  const disableMainButton = Validator.isEditorValuesValid(
    text,
    isTextHeightValid,
    userImage,
    isCustomCard
  );

  const navLinks = (
    <>
      <NavButton
        onClick={handleBackBtnClick}
        tabIndex={TabIndexes.frontButton}
      >
        <FrontCardIcon style={{ marginRight: '5px' }} />
        <TranslatedTypography variant="button" i18nKey="buttons.Front" />
      </NavButton>
      <NavButton
        isActive={Boolean(textEditorRouteMatch)}
        tabIndex={TabIndexes.insideButton}
      >
        <InsideCardIcon />
        <TranslatedTypography variant="button" i18nKey="buttons.Inside" />
      </NavButton>
    </>
  );

  const mainButtonContent = <TranslatedTypography variant="button" tabIndex={0} i18nKey="buttons.Finish" />;

  return (
    <>
      <NavBar
        pageTitle="stepper.insideOfCard"
        onBackClick={handleBackBtnClick}
        setModalCallback={handleModal}
      />
      <Grid
        ref={cardOuter}
        className={classes.textEditorContainer}
        onClick={onOutsideClick}
      >
        <Box className={classes.textEditorWrapper} id="textEditorCard">
          <Box
            className={classes.editorWrapper}
          >
            <CustomTextEditor
              ref={editorRef}
              isMobileView={isMobileView}
              placeholderText={placeholder}
              textareaHeight={cardConfig.textarea.height}
              pageHeight={height}
              tabIndex={TabIndexes.textarea}
            />
            <textarea
              className={classes.hiddenTextarea}
              tabIndex={-1}
              ref={hiddenTextareaRef}
            />
          </Box>
          <FrontPageAnimation
            width={width}
            height={height}
            imageUrl={cardConfig.frontImageUrl}
            isBackButtonClicked={isBackButtonClicked}
          />
        </Box>
        {isMobileView && text && <TextPageControls />}
      </Grid>
      <ActionBar
        mainButtonCallback={handleMainBtnClick}
        mainButtonContent={mainButtonContent}
        mainButtonDisabled={disableMainButton}
        tabIndex={TabIndexes.mainButton}
        navLinks={navLinks}
      />
      <EditorConfirmationModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        onConfirm={modalCallback}
      />
    </>
  );
};

export default memo(TextEditor);
