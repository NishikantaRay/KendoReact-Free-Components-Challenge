import React from 'react';
import PerformanceCharts from '../components/PerformanceCharts';
import FilterBar from '../components/FilterBar';
import { performanceData, teamData, teams, roles } from '../data/mockData';

const Dashboard = ({
  dateRange,
  onDateRangeChange,
  selectedTeam,
  onTeamChange,
  selectedRole,
  onRoleChange
}) => {
  const quickStats = [
    {
      title: 'Total Employees',
      value: '8',
      subtitle: 'Active team members',
      icon: '👥',
      color: '#4299e1',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      trend: '+2',
      trendText: 'vs last month'
    },
    {
      title: 'Avg Productivity',
      value: '89.5%',
      subtitle: '↑ 2.1% from last month',
      icon: '📈',
      color: '#48bb78',
      gradient: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
      trend: '+2.1%',
      trendText: 'increase'
    },
    {
      title: 'Avg Attendance',
      value: '94.1%',
      subtitle: '↑ 1.5% from last month',
      icon: '✅',
      color: '#ed8936',
      gradient: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
      trend: '+1.5%',
      trendText: 'improvement'
    },
    {
      title: 'Avg KPI Score',
      value: '90.8',
      subtitle: '↑ 3.2% from last month',
      icon: '🎯',
      color: '#9f7aea',
      gradient: 'linear-gradient(135deg, #9f7aea 0%, #805ad5 100%)',
      trend: '+3.2%',
      trendText: 'growth'
    }
  ];

  const recentActivities = [
    { action: 'John Smith completed Project Alpha', time: '2 hours ago', type: 'success' },
    { action: 'Team UI/UX exceeded monthly target', time: '5 hours ago', type: 'achievement' },
    { action: 'Sarah Johnson joined Frontend team', time: '1 day ago', type: 'info' },
    { action: 'Q3 performance review completed', time: '2 days ago', type: 'milestone' }
  ];

  const upcomingTasks = [
    { task: 'Monthly team meeting', date: 'Today, 3:00 PM', priority: 'high' },
    { task: 'Performance review - Mike Davis', date: 'Tomorrow, 10:00 AM', priority: 'medium' },
    { task: 'Project Beta deadline', date: 'Oct 2, 2025', priority: 'high' },
    { task: 'Team building event', date: 'Oct 5, 2025', priority: 'low' }
  ];

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
      padding: '0',
      margin: '-20px',
      paddingTop: '20px',
      paddingLeft: '20px',
      paddingRight: '20px'
    }}>
      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        padding: '30px',
        marginBottom: '30px',
        color: 'white',
        boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)'
      }}>
        <p style={{ 
          margin: '0 0 25px 0', 
          fontSize: '16px', 
          opacity: 0.9,
          fontWeight: '300'
        }}>
          Monitor your team's performance and track key metrics in real-time
        </p>
      </div>

      {/* Quick Actions - Moved to top */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '25px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        marginBottom: '25px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <span style={{ fontSize: '20px' }}>⚡</span>
          <h3 style={{ margin: 0, color: '#2d3748', fontSize: '18px', fontWeight: '600' }}>
            Quick Actions
          </h3>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          {[
            { icon: '👤', title: 'Add Employee', desc: 'Onboard new team member', color: '#4299e1' },
            { icon: '📊', title: 'Generate Report', desc: 'Create performance report', color: '#48bb78' },
            { icon: '🎯', title: 'Set Goals', desc: 'Define team objectives', color: '#9f7aea' },
            { icon: '📅', title: 'Schedule Review', desc: 'Plan performance review', color: '#ed8936' }
          ].map((action, index) => (
            <div key={index} style={{
              padding: '20px',
              borderRadius: '15px',
              background: `linear-gradient(135deg, ${action.color}15 0%, ${action.color}08 100%)`,
              border: `1px solid ${action.color}30`,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = `0 12px 25px ${action.color}25`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ 
                fontSize: '28px', 
                marginBottom: '12px',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}>
                {action.icon}
              </div>
              <div style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: action.color,
                marginBottom: '6px'
              }}>
                {action.title}
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: '#718096',
                lineHeight: '1.4'
              }}>
                {action.desc}
              </div>
              
              {/* Subtle background decoration */}
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: `${action.color}10`,
                opacity: 0.5
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ marginBottom: '30px' }}>
        <FilterBar
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
          selectedTeam={selectedTeam}
          onTeamChange={onTeamChange}
          selectedRole={selectedRole}
          onRoleChange={onRoleChange}
          teams={teams}
          roles={roles}
        />
      </div>

      {/* Enhanced Summary Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '25px', 
        marginBottom: '35px' 
      }}>
        {quickStats.map((stat, index) => (
          <div key={index} style={{
            background: 'white',
            borderRadius: '20px',
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            border: 'none',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
          }}>
            {/* Gradient accent */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: stat.gradient
            }} />
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
              <div style={{ 
                fontSize: '40px',
                background: stat.gradient,
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 8px 20px ${stat.color}30`
              }}>
                {stat.icon}
              </div>
              <div style={{
                background: stat.gradient,
                color: 'white',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {stat.trend}
              </div>
            </div>
            
            <h3 style={{ 
              margin: '0 0 10px 0', 
              color: '#2d3748', 
              fontSize: '16px',
              fontWeight: '600'
            }}>
              {stat.title}
            </h3>
            
            <div style={{ 
              fontSize: '36px', 
              fontWeight: '800', 
              color: stat.color,
              marginBottom: '8px',
              background: stat.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {stat.value}
            </div>
            
            <div style={{ 
              fontSize: '13px', 
              color: '#718096',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <span>{stat.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '30px',
        marginBottom: '30px'
      }}>
        {/* Performance Charts */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <PerformanceCharts
            performanceData={performanceData}
            teamData={teamData}
          />
        </div>

        {/* Side Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Recent Activities */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '20px' }}>📋</span>
              <h3 style={{ margin: 0, color: '#2d3748', fontSize: '18px', fontWeight: '600' }}>
                Recent Activities
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentActivities.map((activity, index) => (
                <div key={index} style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: '#f7fafc',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ 
                    fontSize: '14px', 
                    color: '#2d3748', 
                    marginBottom: '4px',
                    fontWeight: '500'
                  }}>
                    {activity.action}
                  </div>
                  <div style={{ fontSize: '12px', color: '#718096' }}>
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '20px' }}>⏰</span>
              <h3 style={{ margin: 0, color: '#2d3748', fontSize: '18px', fontWeight: '600' }}>
                Upcoming Tasks
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {upcomingTasks.map((task, index) => (
                <div key={index} style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: '#f7fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ 
                      fontSize: '14px', 
                      color: '#2d3748', 
                      marginBottom: '4px',
                      fontWeight: '500'
                    }}>
                      {task.task}
                    </div>
                    <div style={{ fontSize: '12px', color: '#718096' }}>
                      {task.date}
                    </div>
                  </div>
                  <div style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    background: task.priority === 'high' ? '#fed7d7' : 
                               task.priority === 'medium' ? '#feebc8' : '#e6fffa',
                    color: task.priority === 'high' ? '#c53030' : 
                           task.priority === 'medium' ? '#c05621' : '#065f46'
                  }}>
                    {task.priority}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Dashboard;