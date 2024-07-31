"use client"

import useThemeStore, { iThemeStore } from "@/_app/store/theme";
import { darkTheme, lightTheme } from "@/shared/theme/theme";
import { ThemeConfig } from "antd";
import { useEffect } from "react";

const useTheme = () =>{
    
    const isDarkMode = useThemeStore((state: iThemeStore) => state.isDarkMode);
  
    const toggleDarkMode = useThemeStore(
      (state: iThemeStore) => state.toggleDarkMode
    );

    useEffect(() => {}, [isDarkMode]);

    const CurrentTheme:ThemeConfig|undefined = isDarkMode ? darkTheme : lightTheme;

    const isDarkTheme: React.CSSProperties = {
      backgroundColor: isDarkMode ? 'black' : 'white',
      color: isDarkMode ? 'white' : 'black'
    };

    const isDarkThemeImage: React.CSSProperties = {
      filter: isDarkMode ? 'invert(1)' : 'invert(0)'
    }

    return {CurrentTheme,isDarkMode,toggleDarkMode,isDarkTheme,isDarkThemeImage}
}

export default useTheme;