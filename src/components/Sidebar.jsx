import React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { Switch } from '@progress/kendo-react-inputs';
import { useNavigate, useLocation } from 'react-router-dom';
import NucliaQueryWidget from './NucliaQueryWidget';

const Sidebar = ({ 
  expanded, 
  onToggle, 
  darkMode,
  onDarkModeToggle,
  compactMode,
  onCompactModeToggle
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    { id: 'dashboard', icon: 'k-icon k-i-chart-line-markers', label: 'Dashboard', path: '/', emoji: '📊' },
    { id: 'employees', icon: 'k-icon k-i-user', label: 'Employees', path: '/employees', emoji: '👥' },
    { id: 'analytics', icon: 'k-icon k-i-chart-pie-slice', label: 'Analytics', path: '/analytics', emoji: '📈' },
    { id: 'reports', icon: 'k-icon k-i-file', label: 'Reports', path: '/reports', emoji: '📄' },
    { id: 'settings', icon: 'k-icon k-i-gear', label: 'Settings', path: '/settings', emoji: '⚙️' }
  ];

  return (
    <div
      style={{
        width: expanded ? '250px' : '60px',
        backgroundColor: '#2c3e50',
        color: 'white',
        borderRight: '1px solid #34495e',
        transition: 'width 0.3s ease',
        zIndex: 1000,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'fixed',
        top: '70px', // Account for navbar height
        left: 0,
        bottom: 0
      }}
    >
        <div style={{ padding: '0' }}>
          {/* Header */}
          <div style={{ 
            padding: expanded ? '20px 15px' : '20px 12px', 
            borderBottom: '1px solid #34495e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: expanded ? 'space-between' : 'center',
            minHeight: '60px'
          }}>
            {expanded && (
              <h3 style={{ margin: 0, color: '#ecf0f1', fontSize: '18px' }}>
                Team Dashboard
              </h3>
            )}
            <Button
              icon={expanded ? 'chevron-left' : 'chevron-right'}
              look="flat"
              onClick={onToggle}
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ecf0f1',
                minWidth: '32px',
                height: '32px',
                padding: '6px',
                borderRadius: '6px',
                transition: 'all 0.2s ease'
              }}
              title={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            />
          </div>

          {/* Navigation Menu */}
          <div className="sidebar-scroll-content">
            <nav style={{ padding: '20px 0', flex: 1 }}>
              {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                style={{
                  width: '100%',
                  padding: expanded ? '12px 20px' : '12px 14px',
                  border: 'none',
                  background: location.pathname === item.path ? '#3498db' : 'transparent',
                  color: '#ecf0f1',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: expanded ? '12px' : '0',
                  fontSize: '14px',
                  justifyContent: expanded ? 'flex-start' : 'center',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                title={!expanded ? item.label : ''}
                onMouseEnter={(e) => {
                  if (location.pathname !== item.path) {
                    e.target.style.backgroundColor = '#34495e';
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== item.path) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {expanded ? (
                  <span className={item.icon} style={{ fontSize: '18px' }}></span>
                ) : (
                  <span style={{ fontSize: '20px' }}>{item.emoji}</span>
                )}
                {expanded && <span>{item.label}</span>}
                
                {/* Tooltip for collapsed state */}
                {!expanded && (
                  <div style={{
                    position: 'absolute',
                    left: '70px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: '#2c3e50',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    opacity: 0,
                    visibility: 'hidden',
                    transition: 'all 0.2s ease',
                    zIndex: 1001,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    border: '1px solid #34495e',
                    pointerEvents: 'none'
                  }}
                  className="sidebar-tooltip"
                  >
                    {item.label}
                  </div>
                )}
              </button>
              ))}
            </nav>
            
            {/* Nuclia AI Query Widget */}
            <div style={{ 
              borderTop: '1px solid #34495e', 
              borderBottom: '1px solid #34495e',
              margin: '0'
            }}>
              <NucliaQueryWidget 
                expanded={expanded} 
                onResultsFound={(results) => {
                  console.log('Nuclia search results:', results);
                }}
              />
            </div>
          </div>          {/* Footer with Toggle Controls */}
          <div style={{
            marginTop: 'auto',
            padding: expanded ? '15px' : '10px 8px',
            borderTop: '1px solid #34495e',
            backgroundColor: '#2c3e50'
          }}>
            {expanded ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="k-icon k-i-moon" style={{ fontSize: '14px', color: '#bdc3c7' }}></span>
                    <span style={{ fontSize: '12px', color: '#bdc3c7' }}>Dark</span>
                  </div>
                  <Switch
                    checked={darkMode}
                    onChange={onDarkModeToggle}
                    size="small"
                  />
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="k-icon k-i-grid-layout" style={{ fontSize: '14px', color: '#bdc3c7' }}></span>
                    <span style={{ fontSize: '12px', color: '#bdc3c7' }}>Compact</span>
                  </div>
                  <Switch
                    checked={compactMode}
                    onChange={onCompactModeToggle}
                    size="small"
                  />
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                <button
                  onClick={onDarkModeToggle}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: darkMode ? '#3498db' : '#bdc3c7',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '3px',
                    transition: 'color 0.2s ease'
                  }}
                  title="Toggle Dark Mode"
                >
                  <span className="k-icon k-i-moon" style={{ fontSize: '16px' }}></span>
                </button>
                
                <button
                  onClick={onCompactModeToggle}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: compactMode ? '#3498db' : '#bdc3c7',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '3px',
                    transition: 'color 0.2s ease'
                  }}
                  title="Toggle Compact Mode"
                >
                  <span className="k-icon k-i-grid-layout" style={{ fontSize: '16px' }}></span>
                </button>
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default Sidebar;