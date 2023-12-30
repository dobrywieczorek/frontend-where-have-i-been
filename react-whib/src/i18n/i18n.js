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
          registerdesc: 'Register new account',
          loginwithgoogle: 'Google sign in',
          servererror: 'Server error, try again later',
          emailpassworderror: 'Wrong email or password',
          emailerror: 'Wrong email!',
          identicalpassworderror: 'Passwords are not identical',
          passwordregexerror: 'The password should contain at least 8 characters, including uppercase and lowercase letters, numbers and special characters.',
          accountname: 'Account name',
          hidepassword: 'Hide password',
          showpassword: 'Show password',
          confirmpassword: 'Confirm password',
          haveanaccountmsg: 'Already have an account? ',
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
          registerdesc: 'Zarejestruj nowe konto:',
          loginwithgoogle: 'Zaloguj przez Google',
          servererror: 'Błąd serwera, spróbuj ponownie później',
          emailpassworderror: 'Niepoprawny adres email lub hasło',
          emailerror: 'Niepoprawny email!',
          identicalpassworderror: 'Hasła nie są identyczne!',
          passwordregexerror: 'Hasło powinno zawierać co najmniej 8 znaków, w tym wielkie i małe litery, cyfry i znaki specjalne.',
          accountname: 'Nazwa konta',
          hidepassword: 'Ukryj hasło',
          showpassword: 'Pokaż hasło',
          confirmpassword: 'Potwierdź hasło',
          haveanaccountmsg: 'Masz już konto? ',
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