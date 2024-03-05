import React, { createContext, useContext, useEffect, useState } from "react";
import { themes } from "./constants.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();

const options = [];

for (let index = 0; index < themes.length; index++) {
  options.push(index);
}

const ThemeProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [theme, setTheme] = useState(themes[selectedOption]);

  function changeTheme(option) {
    setTheme(themes[option]); 
    setSelectedOption(option);
  }

  async function getSelectedOption() {
    try {
      const storedOption = await AsyncStorage.getItem("selectedOption");
      if (storedOption) {
        const option = Number(storedOption);
        setSelectedOption(option);
        setTheme(themes[option]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function storeSelectedOption() {
    try {
      await AsyncStorage.setItem(
        "selectedOption",
        JSON.stringify(selectedOption)
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSelectedOption();
  }, []);

  useEffect(() => {
    storeSelectedOption();
  }, [selectedOption]);

  return (
    <ThemeContext.Provider
      value={{ theme, changeTheme, options, selectedOption }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};

export default ThemeProvider;
