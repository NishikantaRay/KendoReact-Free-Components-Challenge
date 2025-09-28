import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  RadialLinearScale
} from 'chart.js';
import { Bar, Line, Doughnut, Pie, Radar } from 'react-chartjs-2';
import PerformanceCharts from '../components/PerformanceCharts';
import ChartErrorBoundary from '../components/ChartErrorBoundary';
import { performanceData, teamData } from '../data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  RadialLinearScale
);

const Analytics = () => {
  // Chart data configurations
  const monthlyProductivityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Productivity Score',
        data: [75, 82, 78, 85, 89, 92, 87, 94, 91],
        borderColor: '#4299e1',
        backgroundColor: 'rgba(66, 153, 225, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Target',
        data: [80, 80, 82, 85, 87, 90, 90, 92, 92],
        borderColor: '#48bb78',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
      }
    ]
  };

  const departmentPerformanceData = {
    labels: ['UI/UX', 'Frontend', 'Backend', 'QA', 'DevOps', 'Product'],
    datasets: [
      {
        label: 'Current Quarter',
        data: [93, 89, 87, 90, 88, 85],
        backgroundColor: ['#4299e1', '#48bb78', '#9f7aea', '#ed8936', '#e53e3e', '#38b2ac'],
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  };

  const teamDistributionData = {
    labels: ['Senior', 'Mid-level', 'Junior', 'Intern'],
    datasets: [
      {
        data: [28, 45, 32, 12],
        backgroundColor: ['#4299e1', '#48bb78', '#ed8936', '#9f7aea'],
        borderWidth: 3,
        borderColor: '#fff'
      }
    ]
  };

  const skillsRadarData = {
    labels: ['Technical Skills', 'Communication', 'Problem Solving', 'Teamwork', 'Leadership', 'Innovation'],
    datasets: [
      {
        label: 'Team Average',
        data: [85, 78, 82, 90, 75, 80],
        borderColor: '#4299e1',
        backgroundColor: 'rgba(66, 153, 225, 0.2)',
        pointBackgroundColor: '#4299e1',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#4299e1'
      },
      {
        label: 'Industry Standard',
        data: [80, 75, 78, 85, 70, 75],
        borderColor: '#48bb78',
        backgroundColor: 'rgba(72, 187, 120, 0.2)',
        pointBackgroundColor: '#48bb78',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#48bb78'
      }
    ]
  };

  const projectTimelineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Planned',
        data: [20, 40, 60, 80, 90, 100],
        backgroundColor: 'rgba(72, 187, 120, 0.6)',
      },
      {
        label: 'Actual',
        data: [18, 35, 58, 78, 92, 95],
        backgroundColor: 'rgba(66, 153, 225, 0.6)',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: 'rgba(0, 0, 0, 0.7)'
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: 'rgba(0, 0, 0, 0.7)'
        }
      }
    }
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  };

  return (
    <div>
      {/* Key Metrics Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        {[
          { title: 'Overall Productivity', value: '91.2%', change: '+5.2%', color: '#48bb78', icon: '📈' },
          { title: 'Team Satisfaction', value: '4.7/5', change: '+0.3', color: '#4299e1', icon: '😊' },
          { title: 'Project Completion', value: '94.8%', change: '+2.1%', color: '#9f7aea', icon: '✅' },
          { title: 'Avg Response Time', value: '2.3h', change: '-0.5h', color: '#ed8936', icon: '⚡' }
        ].map((metric, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
            border: '1px solid #f0f0f0',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{metric.icon}</div>
            <h3 style={{ margin: '0 0 8px 0', color: '#718096', fontSize: '14px' }}>{metric.title}</h3>
            <div style={{ color: '#2d3748', fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
              {metric.value}
            </div>
            <div style={{ color: metric.color, fontSize: '14px', fontWeight: '600' }}>
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      {/* Original Performance Charts */}
      <PerformanceCharts
        performanceData={performanceData}
        teamData={teamData}
      />

      {/* Enhanced Analytics Charts */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '25px', 
        marginTop: '30px' 
      }}>
        {/* Monthly Productivity Trend */}
        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
          border: '1px solid #f0f0f0'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#2d3748', fontSize: '18px' }}>Monthly Productivity Trend</h3>
          <div style={{ height: '300px' }}>
            <ChartErrorBoundary>
              <Line key="productivity-chart" data={monthlyProductivityData} options={chartOptions} />
            </ChartErrorBoundary>
          </div>
        </div>

        {/* Department Performance */}
        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
          border: '1px solid #f0f0f0'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#2d3748', fontSize: '18px' }}>Department Performance</h3>
          <div style={{ height: '300px' }}>
            <ChartErrorBoundary>
              <Bar key="department-chart" data={departmentPerformanceData} options={chartOptions} />
            </ChartErrorBoundary>
          </div>
        </div>

        {/* Team Experience Distribution */}
        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
          border: '1px solid #f0f0f0'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#2d3748', fontSize: '18px' }}>Team Experience Distribution</h3>
          <div style={{ height: '300px' }}>
            <ChartErrorBoundary>
              <Doughnut key="distribution-chart" data={teamDistributionData} options={{ responsive: true, maintainAspectRatio: false }} />
            </ChartErrorBoundary>
          </div>
        </div>

        {/* Skills Assessment Radar */}
        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
          border: '1px solid #f0f0f0'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#2d3748', fontSize: '18px' }}>Skills Assessment</h3>
          <div style={{ height: '300px' }}>
            <ChartErrorBoundary>
              <Radar key="skills-radar-chart" data={skillsRadarData} options={radarOptions} />
            </ChartErrorBoundary>
          </div>
        </div>
      </div>

      {/* Project Progress & Team Rankings */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '25px', 
        marginTop: '25px' 
      }}>
        {/* Project Timeline */}
        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
          border: '1px solid #f0f0f0'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#2d3748', fontSize: '18px' }}>Project Progress Timeline</h3>
          <div style={{ height: '300px' }}>
            <ChartErrorBoundary>
              <Bar key="timeline-chart" data={projectTimelineData} options={chartOptions} />
            </ChartErrorBoundary>
          </div>
        </div>

        {/* Performance Metrics & Rankings */}
        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
          border: '1px solid #f0f0f0'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#2d3748', fontSize: '18px' }}>Performance Metrics</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#718096' }}>Productivity Trend</span>
              <span style={{ color: '#48bb78', fontWeight: '600' }}>↑ 5.2%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#718096' }}>Attendance Rate</span>
              <span style={{ color: '#4299e1', fontWeight: '600' }}>94.1%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#718096' }}>KPI Achievement</span>
              <span style={{ color: '#9f7aea', fontWeight: '600' }}>90.8%</span>
            </div>
          </div>

          <h4 style={{ margin: '20px 0 15px 0', color: '#2d3748', fontSize: '16px' }}>Team Rankings</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { team: 'UI/UX', score: 93, color: '#48bb78' },
              { team: 'Frontend', score: 89, color: '#4299e1' },
              { team: 'Quality', score: 90, color: '#9f7aea' },
              { team: 'Infrastructure', score: 88, color: '#ed8936' },
              { team: 'Backend', score: 87, color: '#e53e3e' }
            ].map((item, index) => (
              <div key={item.team} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  backgroundColor: item.color,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {index + 1}
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#2d3748' }}>{item.team}</span>
                  <span style={{ color: item.color, fontWeight: '600' }}>{item.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        border: '1px solid #f0f0f0',
        marginTop: '25px'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#2d3748', fontSize: '18px' }}>Key Insights & Recommendations</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {[
            {
              icon: '🚀',
              title: 'Productivity Boost',
              description: 'UI/UX team shows exceptional performance this quarter with 93% efficiency.',
              action: 'Consider knowledge sharing sessions'
            },
            {
              icon: '⚠️',
              title: 'Attention Needed',
              description: 'Backend team performance slightly below target. Additional support recommended.',
              action: 'Schedule 1-on-1 reviews'
            },
            {
              icon: '📊',
              title: 'Trend Analysis',
              description: 'Overall productivity increased by 5.2% compared to last quarter.',
              action: 'Continue current practices'
            },
            {
              icon: '🎯',
              title: 'Goal Achievement',
              description: '90.8% KPI achievement rate exceeds company standards.',
              action: 'Set stretch goals for Q4'
            }
          ].map((insight, index) => (
            <div key={index} style={{
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: '#f7fafc',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px' }}>{insight.icon}</span>
                <h4 style={{ margin: 0, color: '#2d3748', fontSize: '16px' }}>{insight.title}</h4>
              </div>
              <p style={{ margin: '0 0 12px 0', color: '#718096', fontSize: '14px', lineHeight: '1.5' }}>
                {insight.description}
              </p>
              <div style={{ 
                color: '#4299e1', 
                fontSize: '13px', 
                fontWeight: '600',
                padding: '6px 12px',
                backgroundColor: '#ebf8ff',
                borderRadius: '20px',
                display: 'inline-block'
              }}>
                💡 {insight.action}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;