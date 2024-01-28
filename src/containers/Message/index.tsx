import React, {
  useState, useEffect, memo, useRef, FC, useCallback
} from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import {
  makeStyles, Button, Grid, useMediaQuery
} from '@material-ui/core';
import {
  CustomTextEditor,
  EditorConfirmationModal,
  NavBar,
  TranslatedTypography
} from '../../components';
import { useTextContext } from '../../context';
import useDialog from '../../hooks/useModal';
import useAppConfig from '../../hooks/useAppConfig';
import { RoutePath } from '../../enums/Routes';
import { CardConfig } from '../../types';

export const useStyles = makeStyles(() => ({
  messageContainer: ({ cardConfig: { font, lineHeight: { sizeRatio } } }: StyleProps) => ({
    maxHeight: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingTop: 16,
    width: '100%',
    '-webkit-overflow-scrolling': 'touch',
    fontFamily: font.family,
    fontSize: Number(font.size),
    fontWeight: font.weight,
    lineHeight: `${Number(font.size) * sizeRatio}px`
  }),
  saveButton: {
    fontSize: '16px'
  }
}));

type StyleProps = {
  cardConfig: CardConfig;
};

type InavBarPosition = 'static' | 'fixed' | undefined;

const Message: FC = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const textEditorRouteMatch = useRouteMatch(RoutePath.TextEditor);
  const [desktopFitScale, setDesktopFitScale] = useState(1);
  const [navBarPosition, setNavBarPosition] = useState<InavBarPosition>('static');
  const [modalCallback, setModalCallback] = useState(() => () => {});
  const { cardConfig } = useAppConfig();
  const { isModalOpen, handleCloseModal, handleOpenModal } = useDialog();
  const {
    state: { text, isTextHeightValid },
    actions: { setCustomText }
  } = useTextContext();
  const classes = useStyles({ cardConfig });
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const initialTextValue = useRef('');
  const isMessageChanged = initialTextValue.current !== text;
  const pageHeight: number = cardConfig.sizes.height;
  const isIphone = window.navigator.platform === 'iPhone';
  const isMobileView = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    initialTextValue.current = text;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (editorRef && editorRef.current) {
      editorRef.current.value = text;
    }
  }, [text]);

  useEffect(() => {
    let widthRatio: number;

    if (window.innerWidth < window.innerHeight) {
      widthRatio = (window.innerWidth - 28) / cardConfig.sizes.width;
      setDesktopFitScale(widthRatio);
      localStorage.setItem('widthRatio', widthRatio.toString());
    } else {
      widthRatio = Number(localStorage.getItem('widthRatio'))!;
      setDesktopFitScale(widthRatio);
    }
  }, [cardConfig.sizes.width]);

  const setIphoneDimensions = (): void => {
    if (editorRef
      && editorRef.current
      && messageContainerRef
      && messageContainerRef.current
    ) {
      editorRef.current.style.maxHeight = '0px';
    }
  };

  const focusOnTextarea = useCallback((): void => {
    if (editorRef && editorRef.current) {
      if (isIphone) {
        setIphoneDimensions();
      }
      editorRef.current.focus();
      editorRef.current.style.maxHeight = 'none';
    }
  }, [isIphone]);

  const preventEventDefault = (event: Event) => {
    event.preventDefault();
  };
  const stopEventPropogation = (event: Event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const root = document.getElementById('root') as HTMLElement;

    if (editorRef && editorRef.current) {
      const editorCurrentRef = editorRef.current;

      root.addEventListener('touchmove', preventEventDefault);
      editorCurrentRef.addEventListener('touchmove', stopEventPropogation);
    }

    return () => {
      if (editorRef && editorRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const editorCurrentRef = editorRef.current;
        root.removeEventListener('touchmove', preventEventDefault);
        editorCurrentRef.removeEventListener('touchmove', stopEventPropogation);
      }
    };
  }, [focusOnTextarea]);

  useEffect(() => {
    const position = isMobileView ? 'fixed' : 'static';
    setNavBarPosition(position);
  }, [isMobileView]);

  const blurHandler = (): void => {
    if (editorRef
      && editorRef.current
      && messageContainerRef
      && messageContainerRef.current) {
      messageContainerRef.current.style.maxHeight = '100%';
      editorRef.current.style.maxHeight = '100%';
      editorRef.current.style.marginBottom = '0px';
    }
  };

  const handleModal = (callback: () => void): void => {
    handleOpenModal();
    setModalCallback(callback);
  };

  const setTextBeforeChanges = () => {
    setCustomText(initialTextValue.current);
  };

  const handleBackClick = () => {
    if (textEditorRouteMatch) {
      history.push({
        pathname: textEditorRouteMatch.url,
        state: { pathname }
      });
    }
    setTextBeforeChanges();
  };

  const saveText = (): void => {
    if (editorRef && editorRef.current && textEditorRouteMatch) {
      setCustomText(editorRef.current.value);
      history.push({
        pathname: textEditorRouteMatch.url,
        state: { pathname }
      });
    }
  };

  const rightNavbarControl = (
    <Button
      disabled={!isTextHeightValid}
      onClick={saveText}
      variant="text"
      color="primary"
    >
      <TranslatedTypography
        classes={{ root: classes.saveButton }}
        variant="button"
        i18nKey="editorMessage.save"
      />
    </Button>
  );
  return (
    <>
      <NavBar
        position={navBarPosition}
        showModal={isMessageChanged}
        setModalCallback={handleModal}
        pageTitle="buttons.Inside"
        onBackClick={handleBackClick}
        rightControlContent={rightNavbarControl}
      />
      <Grid
        onClick={focusOnTextarea}
        className={classes.messageContainer}
        ref={messageContainerRef}
        body-scroll-lock-ignore="true"
      >
        <CustomTextEditor
          ref={editorRef}
          isMobileView={isMobileView}
          pageHeight={pageHeight}
          textareaHeight={cardConfig.textarea.height}
          desktopFitScale={desktopFitScale}
          blurHandler={blurHandler}
          topOffset="84px"
          width="274px"
        />
      </Grid>
      <EditorConfirmationModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        onConfirm={modalCallback}
      />
    </>
  );
};

export default memo(Message);
