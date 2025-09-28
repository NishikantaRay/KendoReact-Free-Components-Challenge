import React, { useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { Calendar, DatePicker } from '@progress/kendo-react-dateinputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { ProgressBar } from '@progress/kendo-react-progressbars';
import { Badge } from '@progress/kendo-react-indicators';

const Reports = () => {
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState({ start: null, end: null });
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [notification, setNotification] = useState(null);
  const [generatingReports, setGeneratingReports] = useState(new Set());

  const reports = [
    {
      id: 1,
      title: 'Monthly Performance Report',
      description: 'Comprehensive analysis of team performance metrics',
      type: 'PDF',
      category: 'Performance',
      lastGenerated: '2025-09-15',
      status: 'Ready',
      size: '2.4 MB',
      downloads: 12,
      tags: ['Performance', 'Monthly', 'Analytics'],
      schedule: 'Monthly'
    },
    {
      id: 2,
      title: 'Attendance Summary',
      description: 'Employee attendance patterns and statistics',
      type: 'Excel',
      category: 'HR',
      lastGenerated: '2025-09-20',
      status: 'Ready',
      size: '1.8 MB',
      downloads: 8,
      tags: ['Attendance', 'HR', 'Statistics'],
      schedule: 'Weekly'
    },
    {
      id: 3,
      title: 'KPI Achievement Report',
      description: 'Individual and team KPI tracking report',
      type: 'PDF',
      category: 'Performance',
      lastGenerated: '2025-09-18',
      status: 'Ready',
      size: '3.1 MB',
      downloads: 15,
      tags: ['KPI', 'Goals', 'Achievement'],
      schedule: 'Quarterly'
    },
    {
      id: 4,
      title: 'Team Productivity Analysis',
      description: 'Detailed productivity trends and insights',
      type: 'Excel',
      category: 'Analytics',
      lastGenerated: '2025-09-25',
      status: generatingReports.has(4) ? 'Generating' : 'Ready',
      size: '4.2 MB',
      downloads: 6,
      tags: ['Productivity', 'Trends', 'Analytics'],
      schedule: 'Bi-weekly'
    },
    {
      id: 5,
      title: 'Employee Development Report',
      description: 'Training completion and skill development tracking',
      type: 'PDF',
      category: 'HR',
      lastGenerated: '2025-09-22',
      status: 'Ready',
      size: '1.9 MB',
      downloads: 4,
      tags: ['Development', 'Training', 'Skills'],
      schedule: 'Monthly'
    }
  ];

  const reportTypes = [
    { text: 'Performance Report', value: 'performance' },
    { text: 'Attendance Report', value: 'attendance' },
    { text: 'KPI Dashboard', value: 'kpi' },
    { text: 'Custom Analytics', value: 'custom' },
    { text: 'Employee Development', value: 'development' },
    { text: 'Project Summary', value: 'projects' }
  ];

  const teams = [
    { text: 'Frontend Team', value: 'frontend' },
    { text: 'Backend Team', value: 'backend' },
    { text: 'UI/UX Team', value: 'uiux' },
    { text: 'QA Team', value: 'qa' },
    { text: 'DevOps Team', value: 'devops' },
    { text: 'Product Team', value: 'product' }
  ];

  const addNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleGenerateReport = () => {
    if (!selectedReportType) {
      addNotification('Please select a report type', 'error');
      return;
    }
    
    const reportId = Date.now();
    setGeneratingReports(prev => new Set([...prev, reportId]));
    setShowGenerateDialog(false);
    addNotification('Report generation started...', 'info');
    
    setTimeout(() => {
      setGeneratingReports(prev => {
        const newSet = new Set(prev);
        newSet.delete(reportId);
        return newSet;
      });
      addNotification('Report generated successfully!', 'success');
    }, 3000);
  };

  const handleDownloadReport = (report) => {
    addNotification(`Downloading ${report.title}...`, 'info');
    setTimeout(() => {
      addNotification(`${report.title} downloaded successfully!`, 'success');
    }, 1500);
  };

  const handleScheduleReport = () => {
    setShowScheduleDialog(false);
    addNotification('Report scheduled successfully!', 'success');
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px'
      }}>
        <h1 style={{ 
          color: '#2d3748',
          margin: 0,
          fontSize: '28px',
          fontWeight: '600'
        }}>
          Reports & Analytics
        </h1>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button
            themeColor="primary"
            onClick={() => setShowGenerateDialog(true)}
            icon="plus"
          >
            Generate Report
          </Button>
          
          <Button
            themeColor="secondary"
            onClick={() => setShowScheduleDialog(true)}
            icon="clock"
          >
            Schedule
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
          border: '1px solid #f0f0f0',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ margin: '0 0 8px 0', color: '#718096', fontSize: '14px' }}>Total Reports</h3>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#4299e1' }}>{reports.length}</div>
            </div>
            <div style={{ fontSize: '32px' }}>📊</div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
          border: '1px solid #f0f0f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ margin: '0 0 8px 0', color: '#718096', fontSize: '14px' }}>Ready Downloads</h3>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#48bb78' }}>
                {reports.filter(r => r.status === 'Ready').length}
              </div>
            </div>
            <div style={{ fontSize: '32px' }}>✅</div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
          border: '1px solid #f0f0f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ margin: '0 0 8px 0', color: '#718096', fontSize: '14px' }}>Total Downloads</h3>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#9f7aea' }}>
                {reports.reduce((sum, r) => sum + r.downloads, 0)}
              </div>
            </div>
            <div style={{ fontSize: '32px' }}>⬇️</div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
          border: '1px solid #f0f0f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ margin: '0 0 8px 0', color: '#718096', fontSize: '14px' }}>Last Updated</h3>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#ed8936' }}>Sep 26, 2025</div>
            </div>
            <div style={{ fontSize: '32px' }}>🕒</div>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        border: '1px solid #f0f0f0',
        overflow: 'hidden',
        marginBottom: '25px'
      }}>
        <div style={{
          padding: '25px',
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>
            Available Reports
          </h2>
          <p style={{ margin: '5px 0 0 0', opacity: 0.9, fontSize: '14px' }}>
            Download or schedule your reports
          </p>
        </div>

        <div style={{ padding: '0' }}>
          {reports.map((report, index) => (
            <div
              key={report.id}
              style={{
                padding: '25px',
                borderBottom: index < reports.length - 1 ? '1px solid #f0f0f0' : 'none',
                transition: 'background-color 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, paddingRight: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <h3 style={{ 
                      margin: 0, 
                      color: '#2d3748', 
                      fontSize: '18px',
                      fontWeight: '600'
                    }}>
                      {report.title}
                    </h3>
                    <Badge 
                      themeColor="primary" 
                      size="small"
                      style={{ fontSize: '10px' }}
                    >
                      {report.category}
                    </Badge>
                  </div>
                  
                  <p style={{ 
                    margin: '0 0 12px 0', 
                    color: '#718096', 
                    fontSize: '14px',
                    lineHeight: '1.5'
                  }}>
                    {report.description}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        padding: '4px 8px',
                        backgroundColor: report.type === 'PDF' ? '#fed7d7' : '#c6f6d5',
                        color: report.type === 'PDF' ? '#c53030' : '#22543d',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {report.type}
                      </span>
                      <span style={{ fontSize: '12px', color: '#a0aec0' }}>•</span>
                      <span style={{ fontSize: '12px', color: '#718096' }}>{report.size}</span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="k-icon k-i-download" style={{ fontSize: '12px', color: '#718096' }}></span>
                      <span style={{ fontSize: '12px', color: '#718096' }}>{report.downloads} downloads</span>
                    </div>
                    
                    <div style={{ fontSize: '12px', color: '#718096' }}>
                      Generated: {report.lastGenerated}
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '12px' }}>
                    {report.tags.map(tag => (
                      <span key={tag} style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        backgroundColor: '#edf2f7',
                        color: '#4a5568',
                        borderRadius: '12px',
                        fontSize: '10px',
                        fontWeight: '500',
                        marginRight: '6px',
                        marginTop: '4px'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
                  <Badge
                    themeColor={report.status === 'Ready' ? 'success' : 'warning'}
                    style={{ fontSize: '12px' }}
                  >
                    {report.status}
                  </Badge>
                  
                  {report.status === 'Generating' ? (
                    <div style={{ width: '120px' }}>
                      <ProgressBar value={65} style={{ height: '6px' }} />
                      <div style={{ fontSize: '10px', color: '#718096', textAlign: 'center', marginTop: '4px' }}>
                        Processing...
                      </div>
                    </div>
                  ) : (
                    <Button
                      themeColor="primary"
                      size="small"
                      onClick={() => handleDownloadReport(report)}
                      disabled={report.status !== 'Ready'}
                    >
                      Download
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Report Dialog */}
      {showGenerateDialog && (
        <Dialog 
          title="Generate New Report"
          onClose={() => setShowGenerateDialog(false)}
          width={550}
        >
          <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block', color: '#2d3748' }}>
                Report Type
              </label>
              <DropDownList
                data={reportTypes}
                textField="text"
                dataItemKey="value"
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value)}
                style={{ width: '100%' }}
                placeholder="Select report type..."
              />
            </div>
            
            <div>
              <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block', color: '#2d3748' }}>
                Date Range
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <DatePicker
                  placeholder="Start date"
                  value={selectedDateRange.start}
                  onChange={(e) => setSelectedDateRange(prev => ({...prev, start: e.target.value}))}
                  style={{ flex: 1 }}
                />
                <DatePicker
                  placeholder="End date"
                  value={selectedDateRange.end}
                  onChange={(e) => setSelectedDateRange(prev => ({...prev, end: e.target.value}))}
                  style={{ flex: 1 }}
                />
              </div>
            </div>
            
            <div>
              <label style={{ fontWeight: '600', marginBottom: '12px', display: 'block', color: '#2d3748' }}>
                Select Teams
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '120px', overflowY: 'auto' }}>
                {teams.map(team => (
                  <div key={team.value} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      id={team.value}
                      checked={selectedTeams.includes(team.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTeams([...selectedTeams, team.value]);
                        } else {
                          setSelectedTeams(selectedTeams.filter(t => t !== team.value));
                        }
                      }}
                    />
                    <label htmlFor={team.value} style={{ fontSize: '14px', color: '#2d3748', cursor: 'pointer' }}>
                      {team.text}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogActionsBar>
            <Button onClick={() => setShowGenerateDialog(false)}>
              Cancel
            </Button>
            <Button themeColor="primary" onClick={handleGenerateReport}>
              Generate Report
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}

      {/* Schedule Report Dialog */}
      {showScheduleDialog && (
        <Dialog 
          title="Schedule Report"
          onClose={() => setShowScheduleDialog(false)}
          width={500}
        >
          <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block', color: '#2d3748' }}>
                Report Type
              </label>
              <DropDownList
                data={reportTypes}
                textField="text"
                dataItemKey="value"
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value)}
                style={{ width: '100%' }}
                placeholder="Select report type..."
              />
            </div>
            
            <div>
              <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block', color: '#2d3748' }}>
                Schedule Calendar
              </label>
              <Calendar
                value={new Date()}
                style={{ width: '100%' }}
              />
            </div>
          </div>
          
          <DialogActionsBar>
            <Button onClick={() => setShowScheduleDialog(false)}>
              Cancel
            </Button>
            <Button themeColor="primary" onClick={handleScheduleReport}>
              Schedule Report
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

export default Reports;