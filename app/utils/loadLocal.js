import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.defaultLocale = 'pa';
i18n.locale = 'pa';
i18n.fallbacks = true;

export const loadLocale = async () => {
  for (const locale of Localization.locales) {
    if (i18n.translations[locale.languageCode] !== null) {
      i18n.locale = locale.languageCode;
      switch (locale.languageCode) {
        case 'en':
          import('./en.json').then(en => {
            i18n.translations = {en};
          });
          break;
        default:
        case 'pa':
          import('./pa.json').then(fr => {
            i18n.translations = {fr};
          });
          break;
      }
      break;
    }
  }
};

export default i18n;
