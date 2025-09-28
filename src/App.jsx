import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
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
  const [notifications, setNotifications] = useState([]);

  const handleSidebarToggle = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const addNotification = (message, type = 'success') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      closable: true
    };
    setNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
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
            className="main-content"
            style={{
              padding: compactMode ? '10px' : '20px',
              backgroundColor: darkMode ? '#1a1a1a' : '#f5f5f5'
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

        <NotificationGroup
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999
          }}
        >
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              type={{ style: notification.type, icon: true }}
              closable={notification.closable}
              onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
            >
              {notification.message}
            </Notification>
          ))}
        </NotificationGroup>
      </div>
    </Router>
  );
}

export default App;
