import i18n, { i18n as I18n } from 'i18next';

class Translation {
  static async instantiateI18n<T>(translationObj: T, language: string): Promise<I18n> {
    const instance = i18n.createInstance();

    await instance.init({
      lng: language,
      resources: {
        tos: {
          translation: translationObj
        }
      },
      interpolation: {
        escapeValue: false
      },
      fallbackLng: language,
      react: {
        transSupportBasicHtmlNodes: true,
        transKeepBasicHtmlNodesFor: ['p', 'strong', 'span']
      }
    }).catch((err) => {
      throw new Error(err);
    });

    return instance;
  }
}

export default Translation;
