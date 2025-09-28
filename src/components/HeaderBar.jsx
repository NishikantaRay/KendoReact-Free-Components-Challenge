import React from 'react';
import { Switch } from '@progress/kendo-react-inputs';

const HeaderBar = ({ darkMode, onDarkModeToggle, compactMode, onCompactModeToggle }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      left: '250px', // Adjust based on sidebar width
      height: '60px',
      backgroundColor: 'white',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 25px',
      gap: '20px',
      zIndex: 999,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      transition: 'left 0.3s ease'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        padding: '6px 12px',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
        border: '1px solid #e2e8f0'
      }}>
        <span className="k-icon k-i-moon" style={{ fontSize: '14px', color: '#666' }}></span>
        <Switch
          checked={darkMode}
          onChange={onDarkModeToggle}
          size="small"
        />
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        padding: '6px 12px',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
        border: '1px solid #e2e8f0'
      }}>
        <span className="k-icon k-i-grid-layout" style={{ fontSize: '14px', color: '#666' }}></span>
        <Switch
          checked={compactMode}
          onChange={onCompactModeToggle}
          size="small"
        />
      </div>
    </div>
  );
};

export default HeaderBar;