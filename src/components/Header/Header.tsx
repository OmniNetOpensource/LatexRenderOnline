import React from 'react'
import './Header.css'
import ThemeToggle from '../ThemeToggle/ThemeToggle';

interface HeaderProps {
    onExportPDF: () => void;
}

const Header:React.FC<HeaderProps> = ({onExportPDF})=>{
    return (
        <header className='app-header'>
            <button className='export-pdf' onClick={onExportPDF}>
                导出为pdf
            </button>
            <ThemeToggle/>
        </header>
    );
};

export default Header;