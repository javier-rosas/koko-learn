import React, { useState, useEffect } from "react";
import LanguagesDropdown from "./LanguagesDropdown";
import ThemeDropdown from "./ThemeDropdown";
import Link from "next/link";
import { defineTheme } from "../../lib/defineTheme";
import ProfileNavbar from "../shared/ProfileNavbar";

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
    <>
    <ProfileNavbar/>
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex sm:flex-row">
        <div className="px-2 py-2">
          <LanguagesDropdown />
        </div>
        <div className="px-2 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div>
    </div>
    </>
  );
}

export default Navbar;
