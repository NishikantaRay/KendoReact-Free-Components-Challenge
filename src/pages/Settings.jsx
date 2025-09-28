import React from 'react';

const Settings = () => {
  return (
    <div>
      <h1 style={{ 
        color: '#2d3748',
        marginBottom: '25px',
        fontSize: '28px',
        fontWeight: '600'
      }}>
        Settings
      </h1>

      {/* Profile Settings */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        border: '1px solid #f0f0f0',
        marginBottom: '25px'
      }}>
        <h2 style={{ 
          margin: '0 0 20px 0', 
          color: '#2d3748', 
          fontSize: '18px',
          fontWeight: '600',
          borderBottom: '2px solid #e2e8f0',
          paddingBottom: '10px'
        }}>
          Profile Settings
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
              Full Name
            </label>
            <input
              type="text"
              defaultValue="John Admin"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '2px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
              Email
            </label>
            <input
              type="email"
              defaultValue="admin@company.com"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '2px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
              Department
            </label>
            <select
              defaultValue="Management"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '2px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: 'white'
              }}
            >
              <option value="Management">Management</option>
              <option value="HR">Human Resources</option>
              <option value="IT">Information Technology</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
              Phone
            </label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '2px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        border: '1px solid #f0f0f0',
        marginBottom: '25px'
      }}>
        <h2 style={{ 
          margin: '0 0 20px 0', 
          color: '#2d3748', 
          fontSize: '18px',
          fontWeight: '600',
          borderBottom: '2px solid #e2e8f0',
          paddingBottom: '10px'
        }}>
          System Preferences
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0', color: '#2d3748', fontSize: '16px' }}>Email Notifications</h3>
              <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>Receive email updates about team activities</p>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
              <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#4299e1',
                borderRadius: '34px',
                transition: '0.4s'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '""',
                  height: '26px',
                  width: '26px',
                  right: '4px',
                  bottom: '4px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  transition: '0.4s'
                }}></span>
              </span>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0', color: '#2d3748', fontSize: '16px' }}>Auto-refresh Data</h3>
              <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>Automatically refresh dashboard data every 5 minutes</p>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
              <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#ccc',
                borderRadius: '34px',
                transition: '0.4s'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '""',
                  height: '26px',
                  width: '26px',
                  left: '4px',
                  bottom: '4px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  transition: '0.4s'
                }}></span>
              </span>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0', color: '#2d3748', fontSize: '16px' }}>Data Export Access</h3>
              <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>Allow data export for reports and analytics</p>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
              <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#4299e1',
                borderRadius: '34px',
                transition: '0.4s'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '""',
                  height: '26px',
                  width: '26px',
                  right: '4px',
                  bottom: '4px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  transition: '0.4s'
                }}></span>
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        border: '1px solid #f0f0f0'
      }}>
        <h2 style={{ 
          margin: '0 0 20px 0', 
          color: '#2d3748', 
          fontSize: '18px',
          fontWeight: '600',
          borderBottom: '2px solid #e2e8f0',
          paddingBottom: '10px'
        }}>
          Data Management
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <span className="k-icon k-i-download" style={{ fontSize: '24px', color: '#4299e1', marginBottom: '10px', display: 'block' }}></span>
            <h3 style={{ margin: '0 0 8px 0', color: '#2d3748', fontSize: '16px' }}>Backup Data</h3>
            <p style={{ margin: '0 0 15px 0', color: '#718096', fontSize: '14px' }}>Create a backup of all dashboard data</p>
            <button style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#4299e1',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Create Backup
            </button>
          </div>

          <div style={{
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <span className="k-icon k-i-upload" style={{ fontSize: '24px', color: '#48bb78', marginBottom: '10px', display: 'block' }}></span>
            <h3 style={{ margin: '0 0 8px 0', color: '#2d3748', fontSize: '16px' }}>Import Data</h3>
            <p style={{ margin: '0 0 15px 0', color: '#718096', fontSize: '14px' }}>Import employee data from CSV file</p>
            <button style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#48bb78',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Import Data
            </button>
          </div>

          <div style={{
            border: '2px solid #fed7d7',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#fffaf0'
          }}>
            <span className="k-icon k-i-trash" style={{ fontSize: '24px', color: '#e53e3e', marginBottom: '10px', display: 'block' }}></span>
            <h3 style={{ margin: '0 0 8px 0', color: '#2d3748', fontSize: '16px' }}>Reset Data</h3>
            <p style={{ margin: '0 0 15px 0', color: '#718096', fontSize: '14px' }}>Reset all data to default values</p>
            <button style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#e53e3e',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Reset Data
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button style={{
          padding: '12px 30px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#4299e1',
          color: 'white',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(66, 153, 225, 0.3)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#3182ce';
          e.target.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#4299e1';
          e.target.style.transform = 'translateY(0)';
        }}
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;