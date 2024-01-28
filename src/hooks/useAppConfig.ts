import { useState, useEffect } from 'react';
import { useCardContext, useNavigationContext } from '../context';
import { AppConfig } from '../utils/AppConfig';
import { CardConfig, GlobalFontConfig } from '../types';

export type UseAppConfig = {
  appConfig: AppConfig;
  cardConfig: CardConfig;
  isCustomCard: boolean;
  globalFontConfig: GlobalFontConfig;
};

const config = new AppConfig();

const useAppConfig = (): UseAppConfig => {
  const [appConfig, setAppConfig] = useState<AppConfig>(config);
  const [cardConfig, setCardConfig] = useState<CardConfig>(config.card);
  const [globalFontConfig, setGlobalFontConfig] = useState({} as GlobalFontConfig);
  const { state: { card } } = useCardContext();
  const { state: { iframeParams: { locale } } } = useNavigationContext();

  const isCustomCard = card.attributes.some((attr) => attr === 'photo' || attr === 'overlay');

  useEffect(() => {
    setAppConfig(config);
  }, [setAppConfig]);

  useEffect(() => {
    appConfig.initializeCardConfig(card, locale);
  }, [
    appConfig,
    card,
    locale
  ]);

  useEffect(() => {
    setGlobalFontConfig({
      family: appConfig.card.font.family,
      src: appConfig.card.font.family.replace(/\s/g, ''),
      weight: appConfig.card.font.weight
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCardConfig(appConfig.card);

    return () => {
      setCardConfig(config.card);
    };
  }, [appConfig.card]);

  return {
    appConfig, cardConfig, isCustomCard, globalFontConfig
  };
};

export default useAppConfig;
