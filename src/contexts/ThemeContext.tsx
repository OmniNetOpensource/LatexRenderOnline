import React,{ createContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType{
    theme:Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme:'light',
    toggleTheme: () => {},
});

interface ThemeProviderProps{
    children:React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) =>{

    const [theme,setTheme] = useState<Theme>(()=>{
        const storedTheme = localStorage.getItem('theme');
        if(storedTheme){
            return storedTheme as Theme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    })

    useEffect(()=>{
        localStorage.setItem('theme',theme);
    },[theme]);

    const toggleTheme = ()=>{
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const contextValue = useMemo(()=>({theme,toggleTheme}),[theme])

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};