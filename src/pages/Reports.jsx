import React from 'react';

const Reports = () => {
  const reports = [
    {
      title: 'Monthly Performance Report',
      description: 'Comprehensive analysis of team performance metrics',
      type: 'PDF',
      lastGenerated: '2025-09-15',
      status: 'Ready'
    },
    {
      title: 'Attendance Summary',
      description: 'Employee attendance patterns and statistics',
      type: 'Excel',
      lastGenerated: '2025-09-20',
      status: 'Ready'
    },
    {
      title: 'KPI Achievement Report',
      description: 'Individual and team KPI tracking report',
      type: 'PDF',
      lastGenerated: '2025-09-18',
      status: 'Ready'
    },
    {
      title: 'Team Productivity Analysis',
      description: 'Detailed productivity trends and insights',
      type: 'Excel',
      lastGenerated: '2025-09-25',
      status: 'Generating'
    }
  ];

  return (
    <div>
      <h1 style={{ 
        color: '#2d3748',
        marginBottom: '25px',
        fontSize: '28px',
        fontWeight: '600'
      }}>
        Reports & Downloads
      </h1>

      {/* Quick Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
        marginBottom: '25px' 
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
          border: '1px solid #f0f0f0'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#2d3748', fontSize: '14px' }}>Available Reports</h3>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#4299e1' }}>{reports.length}</div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
          border: '1px solid #f0f0f0'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#2d3748', fontSize: '14px' }}>Ready to Download</h3>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#48bb78' }}>
            {reports.filter(r => r.status === 'Ready').length}
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
          border: '1px solid #f0f0f0'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#2d3748', fontSize: '14px' }}>Last Updated</h3>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#9f7aea' }}>Sep 25, 2025</div>
        </div>
      </div>

      {/* Reports List */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        border: '1px solid #f0f0f0',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '20px 25px',
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: '#f8f9fa'
        }}>
          <h2 style={{ margin: 0, color: '#2d3748', fontSize: '18px', fontWeight: '600' }}>
            Available Reports
          </h2>
        </div>

        <div style={{ padding: '0' }}>
          {reports.map((report, index) => (
            <div
              key={index}
              style={{
                padding: '20px 25px',
                borderBottom: index < reports.length - 1 ? '1px solid #f0f0f0' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  margin: '0 0 8px 0', 
                  color: '#2d3748', 
                  fontSize: '16px',
                  fontWeight: '600'
                }}>
                  {report.title}
                </h3>
                <p style={{ 
                  margin: '0 0 8px 0', 
                  color: '#718096', 
                  fontSize: '14px' 
                }}>
                  {report.description}
                </p>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <span style={{
                    padding: '4px 8px',
                    backgroundColor: '#e2e8f0',
                    color: '#4a5568',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {report.type}
                  </span>
                  <span style={{ fontSize: '12px', color: '#718096' }}>
                    Last generated: {report.lastGenerated}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: report.status === 'Ready' ? '#c6f6d5' : '#fed7d7',
                    color: report.status === 'Ready' ? '#22543d' : '#c53030'
                  }}
                >
                  {report.status}
                </span>
                
                <button
                  disabled={report.status !== 'Ready'}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: report.status === 'Ready' ? '#4299e1' : '#e2e8f0',
                    color: report.status === 'Ready' ? 'white' : '#a0aec0',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: report.status === 'Ready' ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (report.status === 'Ready') {
                      e.target.style.backgroundColor = '#3182ce';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (report.status === 'Ready') {
                      e.target.style.backgroundColor = '#4299e1';
                    }
                  }}
                >
                  {report.status === 'Ready' ? 'Download' : 'Generating...'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generate New Report Section */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        border: '1px solid #f0f0f0',
        marginTop: '25px'
      }}>
        <h2 style={{ 
          margin: '0 0 20px 0', 
          color: '#2d3748', 
          fontSize: '18px',
          fontWeight: '600'
        }}>
          Generate New Report
        </h2>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px' 
        }}>
          <div style={{
            border: '2px dashed #e2e8f0',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = '#4299e1';
            e.target.style.backgroundColor = '#f7fafc';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = '#e2e8f0';
            e.target.style.backgroundColor = 'white';
          }}
          >
            <span className="k-icon k-i-file-pdf" style={{ fontSize: '24px', color: '#4299e1', marginBottom: '10px', display: 'block' }}></span>
            <h3 style={{ margin: '0 0 8px 0', color: '#2d3748', fontSize: '16px' }}>Custom Report</h3>
            <p style={{ margin: '0', color: '#718096', fontSize: '14px' }}>Generate a custom report with selected metrics</p>
          </div>

          <div style={{
            border: '2px dashed #e2e8f0',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = '#48bb78';
            e.target.style.backgroundColor = '#f0fff4';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = '#e2e8f0';
            e.target.style.backgroundColor = 'white';
          }}
          >
            <span className="k-icon k-i-file-excel" style={{ fontSize: '24px', color: '#48bb78', marginBottom: '10px', display: 'block' }}></span>
            <h3 style={{ margin: '0 0 8px 0', color: '#2d3748', fontSize: '16px' }}>Data Export</h3>
            <p style={{ margin: '0', color: '#718096', fontSize: '14px' }}>Export raw data in Excel format</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;