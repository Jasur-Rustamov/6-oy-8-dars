import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Home() {
  const [lang, setLang] = useState("uz");
  const [t, i18n] = useTranslation();

  const [bgColor, setBgColor] = useState("bg-blue-500");

  const toggleBg = () => {
    setBgColor(prev => (prev === "bg-blue-500" ? "bg-red-500" : "bg-blue-500"));
  };

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <div>
      <div className={`container w-full h-dvh ${bgColor} `}>
        <h1>{t("hello")}</h1>

        <select
          value={lang}
          onChange={(e) => {
            setLang(e.target.value);
          }}
        >
          <option>uz</option>
          <option>en</option>
          <option>ru</option>
        </select> <br />

        <button
          onClick={toggleBg}
          className="p-2 text-white rounded-md transition-all duration-300 border bg-amber-400 cursor-pointer mt-3.5"
        >
          Изменить фон
        </button>
      </div>
    </div>
  );
}

export default Home;
