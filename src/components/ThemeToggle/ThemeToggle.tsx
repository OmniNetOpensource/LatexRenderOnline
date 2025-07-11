import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import MoonIcon from '../icons/MoonIcon';
import SunIcon from '../icons/SunIcon';
import './ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="theme-toggle-button" aria-label="Toggle theme">
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};


export default ThemeToggle;
