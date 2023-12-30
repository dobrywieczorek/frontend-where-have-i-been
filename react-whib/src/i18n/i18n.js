import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          login: 'Login',
          logindesc: 'Login to your account:',
          emailaddress: 'Email address:',
          password: 'Password:',
          donthaveaccountmsg: 'Dont have an account? ',
          register: 'Register',
          loginwithgoogle: 'Google sign in',
          servererror: 'Server error, try again later',
          emailpassworderror: 'Wrong email or password',
          emailerror: 'Wrong email!',
        },
      },
      pl: {
        translation: {
          login: 'Zaloguj',
          logindesc: 'Zaloguj się do swojego konta:',
          emailaddress: 'Adres email:',
          password: 'Hasło:',
          donthaveaccountmsg: 'Nie masz jeszcze konta? ',
          register: 'Zarejestruj się',
          loginwithgoogle: 'Zaloguj przez Google',
          servererror: 'Błąd serwera, spróbuj ponownie później',
          emailpassworderror: 'Niepoprawny adres email lub hasło',
          emailerror: 'Niepoprawny email!',
        },
      },
      // Możesz dodać zasoby dla innych języków
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;