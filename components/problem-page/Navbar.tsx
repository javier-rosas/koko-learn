import React, { useState, useEffect } from "react";
import LanguagesDropdown from "./LanguagesDropdown";
import ThemeDropdown from "./ThemeDropdown";
import Link from "next/link";
import { defineTheme } from "../../lib/defineTheme";

function Navbar(props: any) {
  // props inherited from [questionName].tsx page
  const { theme, setTheme, language, setLanguage } = props;

  function handleThemeChange(th: any) {
    const theme = th;
    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }

  // set the theme to oceanic-next by default
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, [setTheme]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex sm:flex-row">
        <div className="px-2 py-2">
          <LanguagesDropdown />
        </div>
        <div className="px-2 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
        <Link
          href="/"
          className="sm:ml-auto sm:mr-4 sm:self-end self-start text-center h-10 m-2 px-2 py-2 
                                  border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] 
                                  hover:shadow transition duration-200 bg-white flex-shrink-0"
        >
          Search Problems
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
