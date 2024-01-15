import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
        <div>
            <button onClick={() => changeLanguage('en')}>English</button>
        </div>
        <div>
            <button onClick={() => changeLanguage('pl')}>Polish</button>
        </div>
    </div>
  );
};

export default LanguageSwitcher;