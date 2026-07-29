import { useState } from 'react';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <button 
      className='theme-toggle'
      onClick={toggleTheme}
      aria-label='Toggle dark mode'
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};
