import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import './App.css';

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('All Teams');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [notification, setNotification] = useState(null);

  const handleSidebarToggle = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const addNotification = (message, type = 'success') => {
    setNotification({ message, type });
    
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark-mode' : ''} ${compactMode ? 'compact-mode' : ''}`}>
        <Navbar />
        
        <div className="app-body">
          <Sidebar
            expanded={sidebarExpanded}
            onToggle={handleSidebarToggle}
            darkMode={darkMode}
            onDarkModeToggle={(e) => setDarkMode(e.target.checked)}
            compactMode={compactMode}
            onCompactModeToggle={(e) => setCompactMode(e.target.checked)}
          />
          
          <main 
            className={`main-content ${!sidebarExpanded ? 'sidebar-collapsed' : ''}`}
            style={{
              padding: compactMode ? '10px' : '20px',
              backgroundColor: darkMode ? '#1a1a1a' : undefined
            }}
          >
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <Dashboard
                      dateRange={dateRange}
                      onDateRangeChange={(e) => setDateRange(e.target.value)}
                      selectedTeam={selectedTeam}
                      onTeamChange={(e) => setSelectedTeam(e.target.value)}
                      selectedRole={selectedRole}
                      onRoleChange={(e) => setSelectedRole(e.target.value)}
                    />
                  } 
                />
                <Route 
                  path="/employees" 
                  element={<Employees onNotification={addNotification} />} 
                />
                <Route 
                  path="/analytics" 
                  element={<Analytics />} 
                />
                <Route 
                  path="/reports" 
                  element={<Reports />} 
                />
                <Route 
                  path="/settings" 
                  element={<Settings />} 
                />
              </Routes>
            </div>
          </main>
        </div>

        {/* Custom Notification */}
        {notification && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            backgroundColor: notification.type === 'success' ? '#48bb78' : notification.type === 'error' ? '#e53e3e' : '#4299e1',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            maxWidth: '300px'
          }}>
            <span>{notification.type === 'success' ? '✅' : notification.type === 'error' ? '❌' : 'ℹ️'}</span>
            <span>{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '16px',
                cursor: 'pointer',
                padding: '0',
                marginLeft: '8px'
              }}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
