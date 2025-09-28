import React, { useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { Input, Switch, NumericTextBox, Slider } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import { Badge } from '@progress/kendo-react-indicators';
import { Avatar } from '@progress/kendo-react-layout';
import { Chip, ChipList } from '@progress/kendo-react-buttons';
import { Tooltip } from '@progress/kendo-react-tooltip';

const Settings = () => {
  const [selected, setSelected] = useState(0);
  const [notification, setNotification] = useState(null);
  const [showResetDialog, setShowResetDialog] = useState(false);
  
  // Profile Settings State
  const [profile, setProfile] = useState({
    fullName: 'John Admin',
    email: 'admin@company.com',
    department: 'Management',
    phone: '+1 (555) 123-4567',
    role: 'Administrator',
    location: 'San Francisco, CA',
    timezone: 'PST',
    bio: 'Experienced team leader with 10+ years in management and strategic planning.',
    skills: ['Leadership', 'Project Management', 'Strategy', 'Team Building'],
    profileColor: '#4299e1',
    workHours: { start: '09:00', end: '17:00' },
    emergencyContact: { name: 'Jane Doe', phone: '+1 (555) 987-6543' }
  });
  
  // System Preferences State
  const [systemPrefs, setSystemPrefs] = useState({
    emailNotifications: true,
    autoRefresh: false,
    dataExportAccess: true,
    darkMode: false,
    compactView: false,
    showTooltips: true,
    autoSave: true,
    refreshInterval: 5
  });
  
  // Security Settings State
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    allowMultipleSessions: true,
    requirePasswordChange: false,
    loginNotifications: true
  });
  
  const skillOptions = [
    'Leadership', 'Project Management', 'Strategy', 'Team Building',
    'Communication', 'Problem Solving', 'Analytics', 'Marketing',
    'Finance', 'Operations', 'Technology', 'Innovation'
  ];
  
  const profileColors = [
    { text: 'Blue', value: '#4299e1' },
    { text: 'Green', value: '#48bb78' },
    { text: 'Purple', value: '#9f7aea' },
    { text: 'Orange', value: '#ed8936' },
    { text: 'Pink', value: '#ed64a6' },
    { text: 'Teal', value: '#38b2ac' }
  ];
  
  const departments = [
    { text: 'Management', value: 'Management' },
    { text: 'Human Resources', value: 'HR' },
    { text: 'Information Technology', value: 'IT' },
    { text: 'Finance', value: 'Finance' },
    { text: 'Marketing', value: 'Marketing' },
    { text: 'Operations', value: 'Operations' }
  ];
  
  const roles = [
    { text: 'Administrator', value: 'Administrator' },
    { text: 'Manager', value: 'Manager' },
    { text: 'Team Lead', value: 'Team Lead' },
    { text: 'Employee', value: 'Employee' }
  ];
  
  const timezones = [
    { text: 'Pacific Standard Time (PST)', value: 'PST' },
    { text: 'Mountain Standard Time (MST)', value: 'MST' },
    { text: 'Central Standard Time (CST)', value: 'CST' },
    { text: 'Eastern Standard Time (EST)', value: 'EST' }
  ];
  
  const addNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };
  
  const handleSaveSettings = () => {
    addNotification('Settings saved successfully!', 'success');
  };
  
  const handleResetSettings = () => {
    setProfile({
      fullName: 'John Admin',
      email: 'admin@company.com',
      department: 'Management',
      phone: '+1 (555) 123-4567',
      role: 'Administrator',
      location: 'San Francisco, CA',
      timezone: 'PST'
    });
    setSystemPrefs({
      emailNotifications: true,
      autoRefresh: false,
      dataExportAccess: true,
      darkMode: false,
      compactView: false,
      showTooltips: true,
      autoSave: true,
      refreshInterval: 5
    });
    setSecurity({
      twoFactorAuth: false,
      sessionTimeout: 30,
      allowMultipleSessions: true,
      requirePasswordChange: false,
      loginNotifications: true
    });
    setShowResetDialog(false);
    addNotification('Settings reset to defaults', 'info');
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{ 
          color: '#2d3748',
          margin: 0,
          fontSize: '28px',
          fontWeight: '600'
        }}>
          Settings & Preferences
        </h1>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button
            themeColor="secondary"
            onClick={() => setShowResetDialog(true)}
            icon="reset"
          >
            Reset to Defaults
          </Button>
          
          <Button
            themeColor="primary"
            onClick={handleSaveSettings}
            icon="save"
          >
            Save All Changes
          </Button>
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        border: '1px solid #f0f0f0',
        overflow: 'hidden'
      }}>
        <TabStrip
          selected={selected}
          onSelect={(e) => setSelected(e.selected)}
          style={{ border: 'none' }}
        >
          {/* Profile Settings Tab */}
          <TabStripTab title="👤 Profile Settings">
            <div style={{ 
              padding: '0',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}>
              {/* Profile Header */}
              <div style={{ 
                padding: '40px 30px 30px 30px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '200px',
                  height: '200px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%'
                }} />
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '25px', position: 'relative', zIndex: 1 }}>
                  <div style={{ position: 'relative' }}>
                    <Avatar
                      size="large"
                      style={{ 
                        width: '80px', 
                        height: '80px',
                        backgroundColor: profile.profileColor,
                        fontSize: '32px',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      {profile.fullName.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <div style={{
                      position: 'absolute',
                      bottom: '2px',
                      right: '2px',
                      width: '20px',
                      height: '20px',
                      backgroundColor: '#48bb78',
                      borderRadius: '50%',
                      border: '3px solid white'
                    }} />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h2 style={{ 
                      margin: '0 0 8px 0',
                      fontSize: '28px',
                      fontWeight: '700'
                    }}>
                      {profile.fullName}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px' }}>
                      <Badge themeColor="light" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                        {profile.role}
                      </Badge>
                      <span style={{ opacity: 0.9 }}>{profile.department}</span>
                    </div>
                    <p style={{ 
                      margin: 0,
                      opacity: 0.9,
                      fontSize: '14px',
                      lineHeight: '1.4'
                    }}>
                      {profile.bio}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Profile Form */}
              <div style={{ padding: '30px', backgroundColor: 'white' }}>
                {/* Basic Information Card */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '25px',
                  marginBottom: '25px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #f0f0f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <span style={{ fontSize: '24px' }}>🆔</span>
                    <h3 style={{ 
                      margin: 0,
                      color: '#2d3748',
                      fontSize: '18px',
                      fontWeight: '600'
                    }}>
                      Basic Information
                    </h3>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '8px', 
                        fontWeight: '600', 
                        color: '#2d3748',
                        fontSize: '14px'
                      }}>
                        Full Name *
                      </label>
                      <Input
                        value={profile.fullName}
                        onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                        style={{ width: '100%' }}
                        placeholder="Enter your full name"
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
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        style={{ width: '100%' }}
                        placeholder="Enter your email"
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
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        style={{ width: '100%' }}
                        placeholder="Enter your phone number"
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
                        Location
                      </label>
                      <Input
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                        style={{ width: '100%' }}
                        placeholder="Enter your location"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Professional Information Card */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '25px',
                  marginBottom: '25px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #f0f0f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <span style={{ fontSize: '24px' }}>💼</span>
                    <h3 style={{ 
                      margin: 0,
                      color: '#2d3748',
                      fontSize: '18px',
                      fontWeight: '600'
                    }}>
                      Professional Details
                    </h3>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '8px', 
                        fontWeight: '600', 
                        color: '#2d3748',
                        fontSize: '14px'
                      }}>
                        Department
                      </label>
                      <DropDownList
                        data={departments}
                        textField="text"
                        dataItemKey="value"
                        value={profile.department}
                        onChange={(e) => setProfile({...profile, department: e.target.value})}
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
                        Role
                      </label>
                      <DropDownList
                        data={roles}
                        textField="text"
                        dataItemKey="value"
                        value={profile.role}
                        onChange={(e) => setProfile({...profile, role: e.target.value})}
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
                        Timezone
                      </label>
                      <DropDownList
                        data={timezones}
                        textField="text"
                        dataItemKey="value"
                        value={profile.timezone}
                        onChange={(e) => setProfile({...profile, timezone: e.target.value})}
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
                        Profile Theme
                      </label>
                      <DropDownList
                        data={profileColors}
                        textField="text"
                        dataItemKey="value"
                        value={profile.profileColor}
                        onChange={(e) => setProfile({...profile, profileColor: e.target.value})}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: '600', 
                      color: '#2d3748',
                      fontSize: '14px'
                    }}>
                      Bio / Description
                    </label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                        minHeight: '80px',
                        outline: 'none'
                      }}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
                
                {/* Skills & Expertise Card */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '25px',
                  marginBottom: '25px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #f0f0f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <span style={{ fontSize: '24px' }}>🎯</span>
                    <h3 style={{ 
                      margin: 0,
                      color: '#2d3748',
                      fontSize: '18px',
                      fontWeight: '600'
                    }}>
                      Skills & Expertise
                    </h3>
                  </div>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: '600', 
                      color: '#2d3748',
                      fontSize: '14px'
                    }}>
                      Add Skills
                    </label>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {skillOptions.map(skill => (
                        <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <input
                            type="checkbox"
                            id={skill}
                            checked={profile.skills.includes(skill)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setProfile({...profile, skills: [...profile.skills, skill]});
                              } else {
                                setProfile({...profile, skills: profile.skills.filter(s => s !== skill)});
                              }
                            }}
                          />
                          <label htmlFor={skill} style={{ fontSize: '14px', color: '#2d3748' }}>
                            {skill}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '12px', 
                      fontWeight: '600', 
                      color: '#2d3748',
                      fontSize: '14px'
                    }}>
                      Current Skills
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {profile.skills.map((skill, index) => (
                        <Chip
                          key={index}
                          text={skill}
                          removable
                          onRemove={() => {
                            const newSkills = profile.skills.filter((_, i) => i !== index);
                            setProfile({...profile, skills: newSkills});
                          }}
                          style={{
                            backgroundColor: profile.profileColor + '20',
                            color: profile.profileColor,
                            border: `1px solid ${profile.profileColor}30`
                          }}
                        />
                      ))}
                      {profile.skills.length === 0 && (
                        <span style={{ color: '#a0aec0', fontStyle: 'italic' }}>
                          No skills added yet
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Work Schedule & Emergency Contact Card */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '25px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #f0f0f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <span style={{ fontSize: '24px' }}>⏰</span>
                    <h3 style={{ 
                      margin: 0,
                      color: '#2d3748',
                      fontSize: '18px',
                      fontWeight: '600'
                    }}>
                      Additional Information
                    </h3>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '8px', 
                        fontWeight: '600', 
                        color: '#2d3748',
                        fontSize: '14px'
                      }}>
                        Work Start Time
                      </label>
                      <Input
                        type="time"
                        value={profile.workHours.start}
                        onChange={(e) => setProfile({
                          ...profile, 
                          workHours: {...profile.workHours, start: e.target.value}
                        })}
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
                        Work End Time
                      </label>
                      <Input
                        type="time"
                        value={profile.workHours.end}
                        onChange={(e) => setProfile({
                          ...profile, 
                          workHours: {...profile.workHours, end: e.target.value}
                        })}
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
                        Emergency Contact Name
                      </label>
                      <Input
                        value={profile.emergencyContact.name}
                        onChange={(e) => setProfile({
                          ...profile, 
                          emergencyContact: {...profile.emergencyContact, name: e.target.value}
                        })}
                        style={{ width: '100%' }}
                        placeholder="Emergency contact name"
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
                        Emergency Contact Phone
                      </label>
                      <Input
                        type="tel"
                        value={profile.emergencyContact.phone}
                        onChange={(e) => setProfile({
                          ...profile, 
                          emergencyContact: {...profile.emergencyContact, phone: e.target.value}
                        })}
                        style={{ width: '100%' }}
                        placeholder="Emergency contact phone"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Profile Picture Upload Card */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '25px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #f0f0f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <span style={{ fontSize: '24px' }}>📷</span>
                    <h3 style={{ 
                      margin: 0,
                      color: '#2d3748',
                      fontSize: '18px',
                      fontWeight: '600'
                    }}>
                      Profile Picture
                    </h3>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Avatar
                      size="large"
                      style={{ 
                        width: '100px', 
                        height: '100px',
                        backgroundColor: profile.profileColor,
                        fontSize: '36px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      {profile.fullName.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    
                    <div style={{ flex: 1 }}>
                      <p style={{ 
                        margin: '0 0 15px 0', 
                        color: '#718096', 
                        fontSize: '14px' 
                      }}>
                        Upload a new profile picture. Recommended size: 400x400px
                      </p>
                      <div>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          style={{
                            padding: '8px 12px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '6px',
                            backgroundColor: 'white',
                            fontSize: '14px',
                            width: '100%',
                            maxWidth: '300px'
                          }}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file && file.size > 2048000) {
                              alert('File size must be less than 2MB');
                              e.target.value = '';
                            }
                          }}
                        />
                        <p style={{ fontSize: '12px', color: '#718096', margin: '5px 0 0 0' }}>
                          Max file size: 2MB. Accepted formats: JPG, JPEG, PNG
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabStripTab>

          {/* System Preferences Tab */}
          <TabStripTab title="⚙️ System Preferences">
            <div style={{ padding: '30px' }}>
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ 
                  color: '#2d3748',
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  Application Settings
                </h3>
                <p style={{ color: '#718096', fontSize: '14px', margin: '0 0 20px 0' }}>
                  Configure how the application behaves and displays information
                </p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={{ 
                  padding: '20px', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', color: '#2d3748', fontSize: '16px' }}>
                        Email Notifications
                      </h4>
                      <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>
                        Receive email updates about team activities and important changes
                      </p>
                    </div>
                    <Switch
                      checked={systemPrefs.emailNotifications}
                      onChange={(e) => setSystemPrefs({...systemPrefs, emailNotifications: e.target.checked})}
                    />
                  </div>
                </div>

                <div style={{ 
                  padding: '20px', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', color: '#2d3748', fontSize: '16px' }}>
                        Auto-refresh Data
                      </h4>
                      <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>
                        Automatically refresh dashboard data every few minutes
                      </p>
                    </div>
                    <Switch
                      checked={systemPrefs.autoRefresh}
                      onChange={(e) => setSystemPrefs({...systemPrefs, autoRefresh: e.target.checked})}
                    />
                  </div>
                  {systemPrefs.autoRefresh && (
                    <div style={{ marginTop: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
                        Refresh Interval (minutes): {systemPrefs.refreshInterval}
                      </label>
                      <Slider
                        value={systemPrefs.refreshInterval}
                        onChange={(e) => setSystemPrefs({...systemPrefs, refreshInterval: e.target.value})}
                        min={1}
                        max={30}
                        step={1}
                        style={{ width: '100%' }}
                      />
                    </div>
                  )}
                </div>

                <div style={{ 
                  padding: '20px', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', color: '#2d3748', fontSize: '16px' }}>
                        Data Export Access
                      </h4>
                      <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>
                        Allow data export for reports and analytics
                      </p>
                    </div>
                    <Switch
                      checked={systemPrefs.dataExportAccess}
                      onChange={(e) => setSystemPrefs({...systemPrefs, dataExportAccess: e.target.checked})}
                    />
                  </div>
                </div>

                <div style={{ 
                  padding: '20px', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', color: '#2d3748', fontSize: '16px' }}>
                        Show Tooltips
                      </h4>
                      <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>
                        Display helpful tooltips and information hints
                      </p>
                    </div>
                    <Switch
                      checked={systemPrefs.showTooltips}
                      onChange={(e) => setSystemPrefs({...systemPrefs, showTooltips: e.target.checked})}
                    />
                  </div>
                </div>

                <div style={{ 
                  padding: '20px', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', color: '#2d3748', fontSize: '16px' }}>
                        Auto-save Changes
                      </h4>
                      <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>
                        Automatically save changes as you make them
                      </p>
                    </div>
                    <Switch
                      checked={systemPrefs.autoSave}
                      onChange={(e) => setSystemPrefs({...systemPrefs, autoSave: e.target.checked})}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabStripTab>

          {/* Security Tab */}
          <TabStripTab title="🔒 Security & Privacy">
            <div style={{ padding: '30px' }}>
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ 
                  color: '#2d3748',
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  Security Settings
                </h3>
                <p style={{ color: '#718096', fontSize: '14px', margin: '0 0 20px 0' }}>
                  Manage your account security and privacy preferences
                </p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={{ 
                  padding: '20px', 
                  backgroundColor: '#fff5f5', 
                  borderRadius: '8px',
                  border: '1px solid #fed7d7'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', color: '#2d3748', fontSize: '16px' }}>
                        Two-Factor Authentication
                      </h4>
                      <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Badge themeColor={security.twoFactorAuth ? 'success' : 'warning'} size="small">
                        {security.twoFactorAuth ? 'Enabled' : 'Disabled'}
                      </Badge>
                      <Switch
                        checked={security.twoFactorAuth}
                        onChange={(e) => setSecurity({...security, twoFactorAuth: e.target.checked})}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ 
                  padding: '20px', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <h4 style={{ margin: '0 0 12px 0', color: '#2d3748', fontSize: '16px' }}>
                    Session Timeout
                  </h4>
                  <p style={{ margin: '0 0 15px 0', color: '#718096', fontSize: '14px' }}>
                    Automatically log out after {security.sessionTimeout} minutes of inactivity
                  </p>
                  <Slider
                    value={security.sessionTimeout}
                    onChange={(e) => setSecurity({...security, sessionTimeout: e.target.value})}
                    min={5}
                    max={120}
                    step={5}
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ 
                  padding: '20px', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', color: '#2d3748', fontSize: '16px' }}>
                        Multiple Sessions
                      </h4>
                      <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>
                        Allow login from multiple devices simultaneously
                      </p>
                    </div>
                    <Switch
                      checked={security.allowMultipleSessions}
                      onChange={(e) => setSecurity({...security, allowMultipleSessions: e.target.checked})}
                    />
                  </div>
                </div>

                <div style={{ 
                  padding: '20px', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', color: '#2d3748', fontSize: '16px' }}>
                        Login Notifications
                      </h4>
                      <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>
                        Get notified of new login attempts on your account
                      </p>
                    </div>
                    <Switch
                      checked={security.loginNotifications}
                      onChange={(e) => setSecurity({...security, loginNotifications: e.target.checked})}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabStripTab>

          {/* Data Management Tab */}
          <TabStripTab title="💾 Data Management">
            <div style={{ padding: '30px' }}>
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ 
                  color: '#2d3748',
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  Data Operations
                </h3>
                <p style={{ color: '#718096', fontSize: '14px', margin: '0 0 20px 0' }}>
                  Manage your data with backup, import, and export tools
                </p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
                <div style={{
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '25px',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#4299e1';
                  e.currentTarget.style.backgroundColor = '#f7fafc';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.backgroundColor = 'white';
                }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '15px' }}>📦</div>
                  <h3 style={{ margin: '0 0 8px 0', color: '#2d3748', fontSize: '18px' }}>Backup Data</h3>
                  <p style={{ margin: '0 0 20px 0', color: '#718096', fontSize: '14px' }}>
                    Create a complete backup of all dashboard data and settings
                  </p>
                  <Button themeColor="primary" style={{ width: '100%' }}>
                    Create Backup
                  </Button>
                </div>

                <div style={{
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '25px',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#48bb78';
                  e.currentTarget.style.backgroundColor = '#f0fff4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.backgroundColor = 'white';
                }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '15px' }}>📤</div>
                  <h3 style={{ margin: '0 0 8px 0', color: '#2d3748', fontSize: '18px' }}>Import Data</h3>
                  <p style={{ margin: '0 0 20px 0', color: '#718096', fontSize: '14px' }}>
                    Import employee data and settings from CSV or backup files
                  </p>
                  <Button themeColor="success" style={{ width: '100%' }}>
                    Import Data
                  </Button>
                </div>

                <div style={{
                  border: '2px solid #fed7d7',
                  borderRadius: '12px',
                  padding: '25px',
                  textAlign: 'center',
                  backgroundColor: '#fffaf0',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#e53e3e';
                  e.currentTarget.style.backgroundColor = '#fed7d7';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#fed7d7';
                  e.currentTarget.style.backgroundColor = '#fffaf0';
                }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '15px' }}>🗑️</div>
                  <h3 style={{ margin: '0 0 8px 0', color: '#2d3748', fontSize: '18px' }}>Reset Data</h3>
                  <p style={{ margin: '0 0 20px 0', color: '#718096', fontSize: '14px' }}>
                    Reset all data to default values. This action cannot be undone.
                  </p>
                  <Button themeColor="error" style={{ width: '100%' }}>
                    Reset All Data
                  </Button>
                </div>
              </div>
            </div>
          </TabStripTab>
        </TabStrip>
      </div>

      {/* Reset Confirmation Dialog */}
      {showResetDialog && (
        <Dialog 
          title="Reset Settings to Defaults"
          onClose={() => setShowResetDialog(false)}
          width={450}
        >
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>⚠️</div>
            <h3 style={{ margin: '0 0 10px 0', color: '#2d3748' }}>Are you sure?</h3>
            <p style={{ margin: '0 0 20px 0', color: '#718096', lineHeight: '1.5' }}>
              This will reset all your settings to their default values. This action cannot be undone.
            </p>
          </div>
          
          <DialogActionsBar>
            <Button onClick={() => setShowResetDialog(false)}>
              Cancel
            </Button>
            <Button themeColor="error" onClick={handleResetSettings}>
              Reset Settings
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}

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
  );
};

export default Settings;