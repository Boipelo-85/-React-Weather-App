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
      aria-label='Toggle theme'
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#6b7280',
        borderRadius: '25px',
        padding: '4px',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        width: '100px',
        height: '40px'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          left: isDark ? 'calc(100% - 44px)' : '4px',
          width: '40px',
          height: '32px',
          backgroundColor: 'white',
          borderRadius: '20px',
          transition: 'left 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isDark ? '🌙' : '☀️'}
      </div>
      <span 
        style={{
          flex: 1,
          textAlign: 'center',
          color: isDark ? '#9ca3af' : 'white',
          fontSize: '14px',
          fontWeight: '500',
          zIndex: 1
        }}
      >
        Light
      </span>
      <span 
        style={{
          flex: 1,
          textAlign: 'center',
          color: isDark ? 'white' : '#9ca3af',
          fontSize: '14px',
          fontWeight: '500',
          zIndex: 1
        }}
      >
        Dark
      </span>
    </button>
  );
};
