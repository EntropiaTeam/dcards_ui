/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, {
  useState, memo, FC, useEffect, useCallback
} from 'react';
import {
  useRouteMatch, useHistory, useParams
} from 'react-router-dom';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import {
  ActionBar,
  CardImage,
  EditorConfirmationModal,
  ImageContainer,
  NavBar,
  NavButton,
  TranslatedTypography
} from '../../components';
import Cropper from '../../components/Cropper';
import { FrontCardIcon, InsideCardIcon, ForwardIcon } from '../../components/UI/Icons';
import { useCustomImageContext } from '../../context';
import useAppConfig from '../../hooks/useAppConfig';
import useDialog from '../../hooks/useModal';
import useEditorStateCheck from '../../hooks/useEditorStateCheck';
import { RoutePath } from '../../enums/Routes';

export const useStyles = makeStyles((theme: Theme) => ({
  editorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 5%',
    height: '100%'
  },
  imgContainer: {
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0px 7px 49px rgba(202, 204, 213, 0.45)'
  },
  editorNavbar: {
    marginBottom: '30px',
    [theme.breakpoints.only('xs')]: {
      marginBottom: '0px'
    }
  }
}));

type RouteParams = {
  categoryId: string;
  cardId: string;
};

type UseTabIndex = {
  mainButton: number;
  insideButton: number;
  frontButton: number;
};

const useTabIndex = (isCustomCard: boolean):UseTabIndex => {
  const [mainButtonTabIndex, setMainButtonTabIndex] = useState(0);
  const [insideButtonTabIndex, setInsideButtonTabIndex] = useState(0);
  const [frontButtonTabIndex, setFrontButtonTabIndex] = useState(0);

  useEffect(() => {
    setMainButtonTabIndex(isCustomCard ? 9 : 5);
    setInsideButtonTabIndex(isCustomCard ? 8 : 4);
    setFrontButtonTabIndex(isCustomCard ? 7 : 3);
  }, [isCustomCard]);

  return {
    mainButton: mainButtonTabIndex,
    insideButton: insideButtonTabIndex,
    frontButton: frontButtonTabIndex
  };
};

const PhotoEditor: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const params: RouteParams = useParams();
  const rootRouteMatch = useRouteMatch(RoutePath.Root);
  const editorsRouteMatch = useRouteMatch(RoutePath.Editors);
  const photoEditorRouteMatch = useRouteMatch(RoutePath.PhotoEditor);
  const catalogRouteMatch = useRouteMatch(RoutePath.Catalog);
  const {
    appConfig, cardConfig, isCustomCard
  } = useAppConfig();
  const [modalCallback, setModalCallback] = useState(() => () => {});
  const isEditorEmpty = useEditorStateCheck();
  const { isModalOpen, handleCloseModal, handleOpenModal } = useDialog();
  const {
    state: { cropper, userImage },
    actions: {
      setCroppedImage, setCroppedCanvasData, setRotationDegree
    }
  } = useCustomImageContext();

  const handleModal = useCallback((callback: () => void): void => {
    handleOpenModal();
    setModalCallback(callback);
  }, [handleOpenModal]);

  const handleBackBtnClick = useCallback((): void => {
    if (appConfig.customCategoryId === params.categoryId) {
      history.push(rootRouteMatch!.url);
    } else {
      history.push(catalogRouteMatch!.url);
    }
  }, [
    history,
    params.categoryId,
    appConfig.customCategoryId,
    catalogRouteMatch,
    rootRouteMatch
  ]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    window.onpopstate = (event: Event) => {
      if (isEditorEmpty) {
        handleModal(() => handleBackBtnClick);
        return;
      }
      handleBackBtnClick();
    };
  }, [isEditorEmpty, handleModal, handleBackBtnClick]);

  const saveCustomImageData = (): void => {
    if (cropper) {
      cropper.getCroppedCanvas(appConfig.croppedImageConfig).toBlob((blob) => {
        setCroppedImage(blob);
      }, 'image/jpeg');
      const rotationDegree = cropper.getImageData().rotate;
      const croppedData = cropper.getCanvasData();
      setCroppedCanvasData(croppedData);
      setRotationDegree(rotationDegree);
    }
  };

  const handleMainBtnClick = (): void => {
    saveCustomImageData();
    history.push(`${editorsRouteMatch!.url}/text`);
  };

  const disableMainButton = isCustomCard ? !userImage : false;
  const tabIndexes = useTabIndex(isCustomCard);

  const navLinks = (
    <>
      <NavButton
        isActive={Boolean(photoEditorRouteMatch)}
        tabIndex={tabIndexes.frontButton}
      >
        <FrontCardIcon style={{ marginRight: '5px' }} />
        <TranslatedTypography variant="button" i18nKey="buttons.Front" />
      </NavButton>
      <NavButton
        disabled={disableMainButton}
        onClick={handleMainBtnClick}
        tabIndex={tabIndexes.insideButton}
      >
        <InsideCardIcon />
        <TranslatedTypography
          variant="button"
          i18nKey="buttons.Inside"
        />
      </NavButton>
    </>
  );

  const mainButtonContent = <ForwardIcon />;

  const frontCardPage = isCustomCard
    ? (
      <Cropper
        cropperConfig={appConfig.cropper}
        cardConfig={cardConfig}
      />
    )
    : (
      <ImageContainer
        imgConfig={cardConfig.sizes}
        cls={classes.imgContainer}
        onClick={handleMainBtnClick}
      >
        <CardImage
          imageUrl={cardConfig.frontImageUrl}
          cardName={cardConfig.name}
        />
      </ImageContainer>
    );

  return (
    <>
      <NavBar
        showModal={isEditorEmpty}
        setModalCallback={handleModal}
        className={classes.editorNavbar}
        pageTitle="stepper.frontOfCard"
        onBackClick={handleBackBtnClick}
      />
      <Grid container className={classes.editorContainer}>
        {frontCardPage}
      </Grid>
      <ActionBar
        mainButtonCallback={handleMainBtnClick}
        mainButtonContent={mainButtonContent}
        mainButtonDisabled={disableMainButton}
        navLinks={navLinks}
        tabIndex={tabIndexes.mainButton}
      />
      <EditorConfirmationModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        onConfirm={modalCallback}
      />
    </>
  );
};

export default memo(PhotoEditor);
