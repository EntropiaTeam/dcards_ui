import React, { FC } from 'react';
import { Trans } from 'react-i18next';
import { Link, Typography } from '@material-ui/core';
import { AppConfig } from '../../utils/AppConfig';
import { useNavigationContext } from '../../context/navigation';
import useStyles from './styles';
import { Brand } from '../../enums/Brand';

const tabIndexes = {
  termsOfUse1: 3,
  privacyPolicy: 4,
  termsOfUse2: 5,
  termsOfUse3: 6
};

const Agreement: FC = () => {
  const classes = useStyles();
  const { state: { iframeParams: { locale } } } = useNavigationContext();
  let brand = Brand.Edible;

  if (document.referrer.indexOf(Brand.FruitFlowers)) {
    brand = Brand.FruitFlowers;
  }

  const getRightsReservedSymbol = () => {
    switch (locale) {
      case 'fr-CA': {
        return <span className={classes.rightReservedSign}>&#77;&#67;</span>;
      }
      case 'en-US':
      case 'en-CA':
      default: {
        return <span className={classes.rightReservedSign}>&reg;</span>;
      }
    }
  };

  const ExternalDocLinkComponent = (href: string, tabIndex = 0) => (
    <Link
      variant="body2"
      className={classes.link}
      href={href}
      target="_blank"
      rel="noreferrer"
      tabIndex={tabIndex}
    >
      Terms of Use
    </Link>
  );

  return (
    <>
      <div className={classes.header}>
        <Typography variant="h4" className={classes.title}>
          <Trans i18nKey="agreement.title" />
          {getRightsReservedSymbol()}
        </Typography>
        <div className={classes.subTitle}>
          <Trans i18nKey="agreement.subTitle" />
        </div>
        <div className={classes.subTitle}>
          <Trans i18nKey="agreement.updateDateTitle" />
        </div>
      </div>
      <Trans
        i18nKey="agreement.tos"
        components={{
          terms_of_use_1: ExternalDocLinkComponent(
            AppConfig[brand].termsOfUseLink,
            tabIndexes.termsOfUse1
          ),
          terms_of_use_2: ExternalDocLinkComponent(
            AppConfig[brand].termsOfUseLink,
            tabIndexes.termsOfUse2
          ),
          terms_of_use_3: ExternalDocLinkComponent(
            AppConfig[brand].termsOfUseLink,
            tabIndexes.termsOfUse3
          ),
          privacy_policy: ExternalDocLinkComponent(
            AppConfig[brand].privatePolicyLink,
            tabIndexes.privacyPolicy
          )
        }}
      />
    </>
  );
};

export default Agreement;
