import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';


function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const {t, i18n} = useTranslation();
  const [lang, setLang] = useState('en')

  const toggleMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() =>{
    i18n.changeLanguage(lang)
  }, [lang])

  
  return (
      <div
      className={`h-screen flex flex-col items-center justify-center ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <button
        onClick={toggleMode}
        className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-800"
      >
        dark/Light Mode
      </button>

      <h1>{t('hello')} {t('how')} {t('are')} {t('you')} ?</h1>

      <select className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-800" value={lang} onChange={(e) => {setLang(e.target.value)}} >
        <option>en</option>
        <option>ru</option>
      </select>

    </div>
    
  );
}

export default Home;
