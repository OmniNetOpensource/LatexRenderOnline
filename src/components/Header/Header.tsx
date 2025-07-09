import React from 'react'
import './Header.css'
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Header:React.FC = ()=>{
    return (
        <header className='app-header'>
            <ThemeToggle/>
        </header>
    );
};

export default Header;