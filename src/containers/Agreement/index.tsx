import React, { FC, useState, useEffect } from 'react';
import {
  useLocation, useRouteMatch, useHistory, useParams
} from 'react-router-dom';
import { i18n as I18n } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import {
  ActionBar, Agreement, CustomScrollbar, NavBar, TranslatedTypography
} from '../../components';
import { useCustomImageContext } from '../../context/customImage';
import { Agreement as AgreementType } from '../../context/customImage/types/CustomImageTypes';
import useAppConfig from '../../hooks/useAppConfig';
import { RoutePath } from '../../enums/Routes';
import TranslationUtils from '../../utils/Translation';
import useStyles from './styles';

type Location = {
  pathname: string;
  state: {
    targetLocation: string;
  };
};

type RouteParams = {
  categoryId: string;
  cardId: string;
};

const tabIndexes = {
  mainButton: 6
};

const AgreementContainer: FC = () => {
  const classes = useStyles();
  const location: Location = useLocation();
  const history = useHistory();
  const params: RouteParams = useParams();
  const rootRouteMatch = useRouteMatch(RoutePath.Root);
  const agreementRouteMatch = useRouteMatch(RoutePath.Agreement);
  const {
    state: { agreementTranslation }, actions: { setAgreement }
  } = useCustomImageContext();
  const [i18nInstance, seti18nInstance] = useState<I18n>();
  const catalogRouteMatch = useRouteMatch(RoutePath.Catalog);
  const { appConfig } = useAppConfig();

  const handleAgree = (): void => {
    setAgreement(true);
    history.replace({
      pathname: location.state.targetLocation,
      state: { isAgreementPrevLocation: agreementRouteMatch !== null }
    });
  };

  const handleClickBack = (): void => {
    if (appConfig.customCategoryId === params.categoryId) {
      history.replace(rootRouteMatch!.url);
    } else {
      history.replace(catalogRouteMatch!.url);
    }
  };

  useEffect(() => {
    async function instantiateI18n(): Promise<void> {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const newI18nInstance = await TranslationUtils.instantiateI18n<AgreementType>(agreementTranslation!, 'tos');
      seti18nInstance(newI18nInstance);
    }
    instantiateI18n().catch((e) => { throw new Error(e); });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={classes.tosContainer}>
        <NavBar pageTitle="termsOfService.title" onBackClick={handleClickBack} />
        <CustomScrollbar>
          <div className={classes.contentWrapper}>
            <I18nextProvider i18n={i18nInstance!}>
              <Agreement />
            </I18nextProvider>
          </div>
          <div className={classes.gradient} />
        </CustomScrollbar>
      </div>
      <ActionBar
        className={classes.footer}
        mainButtonCallback={handleAgree}
        tabIndex={tabIndexes.mainButton}
        mainButtonContent={<TranslatedTypography variant="button" i18nKey="termsOfService.agree" />}
      />
    </>
  );
};

export default AgreementContainer;
