import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      greeting: 'Hello, {{name}}!',
      wrongemailerror: 'error - wrong email!',
      wrongemailorpassword: 'Wrong email or password',
      servererror: 'Server error, try again later',
      login: 'Login',
      logintoyouraccount: 'Login to your account: ',
      emailaddress: 'E-mail address ',
      password: 'Password ',
      submitlogin: 'Login',
      donthaveanaccountmsg: 'Dont have and account yet? ',
      register: 'Register',
      cantcontainhash: 'Name cant contain "#".',
      passwordsnotmatch: 'Passwords must match ',
      passwordregexinfo: 'The password should contain at least 8 characters, including uppercase and lowercase letters, numbers and special characters.',
      registertitle: 'Register',
      registernewaccount: 'Register new account ',
      accountname: 'Account name',
      confirmpassword: 'Confirm password',
      alreadyhaveanaccount: 'You already have an account? ',
      logintoyouraccount: 'Login',
      pinname: 'Name: ',
      description: 'Description: ',
      category: 'Category: ',
      favourite: 'Favourite: ',
      addfriend: 'Add friend',
      removefriend: 'Remove friend',
      joined: 'Joined: ',
      pins: 'Pins: ',
      friends: 'Friends: ',
      observers: 'Observers: ',
      mostusedcategory: 'Most used category: ',
      usernotfound: 'User not found!',
      nonameordesc: 'No name or description!',
      editpin: 'Edit pin',
      removepind: 'Remove pin',
      removepinmsg: 'Pin was deleted!',
      addpinmsg: 'Pin was added!',
      addpintitle: 'Add pin',
      view: 'View',
      shop: 'Shop',
      fun: 'Fun',
      holidays: 'Holidays',
      other: 'Other',
      localization: 'Localization: ',
      addpin: 'Add pin',
      latlongvalueerr: 'Coordinates exceed the maximum or minimum value! Only from -180 to +180',
      editedpinmsg: 'Pin was edited!',
      editpintitle: 'Edit pin',
      latitude: 'latitude',
      longitude: 'longitude',
      editpinend: 'Edit Pin',
      updateusernameerror: 'The name cannot be empty and contain the "#" symbol',
      usersettings: 'User settings',
      newaccountname: 'New account name: ',
      updatenameaccount: 'Update name',
      newpassword: 'New password: ',
      updatenewpassword: 'Update password',
      updatedescription: 'Update description',
      searcherror: 'Enter the username to search or user id!',
      nouserwithname: 'No results for the user you are looking for.',
      errorduringsearch: 'Error occured during search',
      searchforuser: 'Search user...',
      search: 'Search',
      searchresults: 'Wyniki wyszukiwania: ',
      viewprofile: 'View Profile',
      searchusertitle: 'User search',
    },
  },
  pl: {
    translation: {
      welcome: 'Witaj',
      greeting: 'Cześć, {{name}}!',
      wrongemailerror: 'błąd - niepoprawny adres e-mail!',
      wrongemailorpassword: 'Niepoprawny adres email lub hasło',
      servererror: 'Błąd serwera, spróbuj ponownie później',
      login: 'Logowanie',
      logintoyouraccount: 'Zaloguj się do swojego konta: ',
      emailaddress: 'Adres e-mail ',
      password: 'Hasło ',
      submitlogin: 'Zaloguj',
      donthaveanaccountmsg: 'Nie masz jeszcze konta? ',
      register: 'Zarejestruj się',
      cantcontainhash: 'Nazwa nie może zawierać symbolu "#".',
      passwordsnotmatch: 'Hasła nie są identyczne! ',
      passwordregexinfo: 'Hasło powinno zawierać co najmniej 8 znaków, w tym wielkie i małe litery, cyfry i znaki specjalne.',
      registertitle: 'Rejestracja',
      registernewaccount: 'Zarejestruj nowe konto: ',
      accountname: 'Nazwa konta',
      confirmpassword: 'Potwierdź hasło',
      alreadyhaveanaccount: 'Masz już konto? ',
      logintoyouraccount: 'Zaloguj się',
      pinname: 'Nazwa: ',
      description: 'Opis: ',
      category: 'Kategoria: ',
      favourite: 'Ulubiony: ',
      addfriend: 'Dodaj przyjaciela',
      removefriend: 'Usuń przyjaciela',
      joined: 'Dołączył: ',
      pins: 'Pinezki: ',
      friends: 'Przyjaciele: ',
      observers: 'Obserwujący: ',
      mostusedcategory: 'Najczęściej używana kategoria: ',
      usernotfound: 'Nie znaleziono użytkownika!',
      nonameordesc: 'Nie podano nazwy lub opisu!',
      editpin: 'Edytuj pinezkę',
      removepind: 'Usuń pinezkę',
      removepinmsg: 'Pinezka została usunięta!',
      addpinmsg: 'Pinezka została dodana!',
      addpintitle: 'Dodawanie pinezki',
      view: 'Widok',
      shop: 'Sklep',
      fun: 'Zabawa',
      holidays: 'Wakacje',
      other: 'Inne',
      localization: 'Lokalizacja: ',
      addpin: 'Dodaj pinezkę',
      latlongvalueerr: 'Współrzędne przekraczają maksymalną lub minimalną wartość! Tylko od -180 do +180',
      editedpinmsg: 'Pinezka została edytowana!',
      editpintitle: 'Edytowanie pinezki',
      latitude: 'latitude',
      longitude: 'longitude',
      editpinend: 'Edytuj Pinezkę',
      updateusernameerror: 'Nazwa nie może być pusta i zawierać symbol "#"',
      usersettings: 'Ustawienia użytkownika',
      newaccountname: 'Nowa nazwa konta: ',
      updatenameaccount: 'Aktualizuj nazwę konta',
      newpassword: 'Nowe hasło: ',
      updatenewpassword: 'Aktualizuj hasło',
      updatedescription: 'Aktualizuj opis',
      searcherror: 'Wpisz nazwę użytkownika do wyszukania lub # użytkownika!',
      nouserwithname: 'Brak wyników dla szukanego użytkownika.',
      errorduringsearch: 'Wystąpił błąd podczas wyszukiwania użytkowników.',
      searchforuser: 'Wyszukaj użytkownika...',
      search: 'Szukaj',
      searchresults: 'Wyniki wyszukiwania: ',
      viewprofile: 'Pokaz profil',
      searchusertitle: 'Wyszukiwanie użytkowników',
    },
  },
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: 'pl', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;