import React from "react";
import useDarkMode from "../hooks/useDarkMode";
import DarkModeContainer from "../utils/DarkModeContainer";
import LightMoon from "../assets/logos/icons8-do-not-disturb-ios-48.png";
import DarkMoon from "../assets/logos/icons8-do-not-disturb-ios-50.png";

export default function Navbar() {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <DarkModeContainer>
      <nav className="text-sm font-bold h-[85px] flex items-center justify-between px-6 shadow-md md:px-12">
        <h1 className="text-bold text-md">
          <a href="/">Where in the world?</a>
        </h1>
        <button onClick={toggleDarkMode} className="flex items-center gap-2">
          <div className="">
            <img
              src={darkMode ? LightMoon : DarkMoon}
              alt="moon_logo"
              className="h-4"
            />
          </div>
          <h3 className="text-sm">{!darkMode ? "Dark Mode" : "Light Mode"}</h3>
        </button>
      </nav>
    </DarkModeContainer>
  );
}
