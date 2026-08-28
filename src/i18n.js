import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'pt-BR',          // idioma padrão ao abrir
    fallbackLng: 'en',     // se tradução não existir, usa inglês
    interpolation: {
      escapeValue: false   // React já protege contra XSS
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json?v=20260828-2',
      requestOptions: {
        cache: 'no-store'
      }
    }
  });

export default i18n;
