import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Input } from '@progress/kendo-react-inputs';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@company.com',
    avatar: null
  });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);
  
  // Form states
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  // Click outside handler for profile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  const handleAuthToggle = () => {
    setShowAuthDialog(!showAuthDialog);
    setFormData({ email: '', password: '', confirmPassword: '', name: '' });
  };

  const handleCloseDialog = () => {
    setShowAuthDialog(false);
    setFormData({ email: '', password: '', confirmPassword: '', name: '' });
  };

  const handleLogin = () => {
    // Simulate login
    setUserProfile({
      name: formData.name || 'John Doe',
      email: formData.email,
      avatar: null
    });
    setIsLoggedIn(true);
    handleCloseDialog();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfileMenu(false);
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
    setFormData({ email: '', password: '', confirmPassword: '', name: '' });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <>
      <nav style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        color: 'white'
      }}>
        {/* Left side - Logo and Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            📊
          </div>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: '600',
              letterSpacing: '-0.5px'
            }}>
              Team Dashboard
            </h1>
            <p style={{
              margin: 0,
              fontSize: '12px',
              opacity: 0.8,
              fontWeight: '400'
            }}>
              Manage your team efficiently
            </p>
          </div>
        </div>

        {/* Right side - Auth/Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {!isLoggedIn ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button
                onClick={() => {
                  setAuthMode('login');
                  handleAuthToggle();
                }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontWeight: '500'
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  setAuthMode('signup');
                  handleAuthToggle();
                }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  color: '#667eea',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontWeight: '600'
                }}
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <div style={{ position: 'relative' }} ref={profileMenuRef}>
              <div
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: '#667eea',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  {getInitials(userProfile.name)}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>
                    {userProfile.name}
                  </div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>
                    {userProfile.email}
                  </div>
                </div>
                <span style={{ fontSize: '12px', opacity: 0.7 }}>▼</span>
              </div>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                  minWidth: '200px',
                  overflow: 'hidden',
                  zIndex: 1001
                }}>
                  <div style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f0f0f0',
                    color: '#2d3748'
                  }}>
                    <div style={{ fontSize: '14px', fontWeight: '600' }}>
                      {userProfile.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#718096' }}>
                      {userProfile.email}
                    </div>
                  </div>
                  <div style={{ padding: '8px 0' }}>
                    <button
                      onClick={() => setShowProfileMenu(false)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        background: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#2d3748',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f7fafc';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      👤 Profile Settings
                    </button>
                    <button
                      onClick={() => setShowProfileMenu(false)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        background: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#2d3748',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f7fafc';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      ⚙️ Account Settings
                    </button>
                    <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #f0f0f0' }} />
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        background: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#e53e3e',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#fed7d7';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Auth Dialog */}
      {showAuthDialog && (
        <Dialog
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>{authMode === 'login' ? '🔑' : '👤'}</span>
              <span>{authMode === 'login' ? 'Login' : 'Sign Up'}</span>
            </div>
          }
          visible={showAuthDialog}
          onClose={handleCloseDialog}
          width={400}
          modal={true}
        >
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'grid', gap: '20px' }}>
            {authMode === 'signup' && (
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  color: '#2d3748',
                  fontSize: '14px'
                }}>
                  Full Name
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  style={{ width: '100%' }}
                />
              </div>
            )}
            
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: '#2d3748',
                fontSize: '14px'
              }}>
                Email Address
              </label>
              <Input
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                type="email"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: '#2d3748',
                fontSize: '14px'
              }}>
                Password
              </label>
              <Input
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your password"
                type="password"
                style={{ width: '100%' }}
              />
            </div>

            {authMode === 'signup' && (
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  color: '#2d3748',
                  fontSize: '14px'
                }}>
                  Confirm Password
                </label>
                <Input
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  type="password"
                  style={{ width: '100%' }}
                />
              </div>
            )}
          </div>

          <div style={{ 
            marginTop: '20px', 
            textAlign: 'center',
            fontSize: '14px',
            color: '#718096'
          }}>
            {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={toggleAuthMode}
              style={{
                background: 'none',
                border: 'none',
                color: '#4299e1',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '14px'
              }}
            >
              {authMode === 'login' ? 'Sign up' : 'Login'}
            </button>
          </div>
        </div>
        
        <DialogActionsBar style={{ padding: '20px' }}>
          <Button 
            onClick={handleCloseDialog}
            style={{ 
              marginRight: '12px',
              backgroundColor: '#e2e8f0',
              color: '#4a5568',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '8px',
              fontWeight: '500'
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleLogin}
            themeColor="primary"
            style={{ 
              backgroundColor: '#4299e1',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '8px',
              fontWeight: '500',
              color: 'white'
            }}
          >
            {authMode === 'login' ? 'Login' : 'Create Account'}
          </Button>
        </DialogActionsBar>
      </Dialog>
      )}
    </>
  );
};

export default Navbar;