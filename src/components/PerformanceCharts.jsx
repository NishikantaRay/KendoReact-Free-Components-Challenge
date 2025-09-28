import React from 'react';

const PerformanceCharts = ({ performanceData, teamData }) => {
  // Improved line chart with proper scaling and responsive design
  const LineChart = ({ data }) => {
    if (!data || data.length === 0) return null;
    
    const maxValue = 100; // Fixed max for better visualization
    const minValue = 80;  // Fixed min for better visualization
    const range = maxValue - minValue;
    
    // Make chart responsive - use container-based sizing
    const baseWidth = 400;
    const chartWidth = Math.min(baseWidth, window.innerWidth > 768 ? baseWidth : window.innerWidth - 100);
    const chartHeight = 300;
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const innerWidth = chartWidth - margin.left - margin.right;
    const innerHeight = chartHeight - margin.top - margin.bottom;

    const getY = (value) => {
      return margin.top + innerHeight - ((value - minValue) / range) * innerHeight;
    };

    const getX = (index) => {
      return margin.left + (index * (innerWidth / (data.length - 1)));
    };

    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'auto' }}>
        <svg 
          width={chartWidth} 
          height={chartHeight} 
          className="chart-svg"
          style={{ 
            background: '#fafafa', 
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            maxWidth: '100%'
          }}
        >
          {/* Grid lines */}
          {[80, 85, 90, 95, 100].map((value, i) => (
            <line
              key={i}
              x1={margin.left}
              y1={getY(value)}
              x2={chartWidth - margin.right}
              y2={getY(value)}
              stroke="#e8e8e8"
              strokeWidth="1"
            />
          ))}
          
          {/* Y-axis */}
          <line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left}
            y2={chartHeight - margin.bottom}
            stroke="#ccc"
            strokeWidth="1"
          />
          
          {/* X-axis */}
          <line
            x1={margin.left}
            y1={chartHeight - margin.bottom}
            x2={chartWidth - margin.right}
            y2={chartHeight - margin.bottom}
            stroke="#ccc"
            strokeWidth="1"
          />
          
          {/* Y-axis labels */}
          {[80, 85, 90, 95, 100].map((value, i) => (
            <text
              key={i}
              x={margin.left - 10}
              y={getY(value) + 4}
              textAnchor="end"
              fontSize="12"
              fill="#666"
            >
              {value}
            </text>
          ))}

          {/* Lines */}
          <polyline
            points={data.map((d, i) => `${getX(i)},${getY(d.productivity)}`).join(' ')}
            fill="none"
            stroke="#ff6b6b"
            strokeWidth="3"
          />
          
          <polyline
            points={data.map((d, i) => `${getX(i)},${getY(d.attendance)}`).join(' ')}
            fill="none"
            stroke="#4ecdc4"
            strokeWidth="3"
          />
          
          <polyline
            points={data.map((d, i) => `${getX(i)},${getY(d.kpi)}`).join(' ')}
            fill="none"
            stroke="#45b7d1"
            strokeWidth="3"
          />

          {/* Data points */}
          {data.map((d, i) => (
            <g key={i}>
              <circle cx={getX(i)} cy={getY(d.productivity)} r="4" fill="#ff6b6b" stroke="white" strokeWidth="2" />
              <circle cx={getX(i)} cy={getY(d.attendance)} r="4" fill="#4ecdc4" stroke="white" strokeWidth="2" />
              <circle cx={getX(i)} cy={getY(d.kpi)} r="4" fill="#45b7d1" stroke="white" strokeWidth="2" />
              
              {/* Month labels */}
              <text
                x={getX(i)}
                y={chartHeight - margin.bottom + 20}
                textAnchor="middle"
                fontSize="12"
                fill="#666"
                fontWeight="500"
              >
                {d.month}
              </text>
            </g>
          ))}
        </svg>
        
        {/* Legend */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '25px', 
          marginTop: '15px',
          padding: '10px',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '3px', backgroundColor: '#ff6b6b', borderRadius: '2px' }}></div>
            <span style={{ fontSize: '13px', color: '#555', fontWeight: '500' }}>Productivity</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '3px', backgroundColor: '#4ecdc4', borderRadius: '2px' }}></div>
            <span style={{ fontSize: '13px', color: '#555', fontWeight: '500' }}>Attendance</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '3px', backgroundColor: '#45b7d1', borderRadius: '2px' }}></div>
            <span style={{ fontSize: '13px', color: '#555', fontWeight: '500' }}>KPI Score</span>
          </div>
        </div>
      </div>
    );
  };

  // Improved pie chart with better rendering
  const PieChart = ({ data }) => {
    if (!data || data.length === 0) return null;
    
    const total = data.reduce((sum, item) => sum + item.count, 0);
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57', '#ff9ff3'];
    
    let currentAngle = 0;
    const segments = data.map((item, index) => {
      const percentage = (item.count / total) * 100;
      const angle = (item.count / total) * 360;
      const startAngle = currentAngle;
      currentAngle += angle;
      
      return {
        ...item,
        percentage,
        angle,
        startAngle,
        color: colors[index % colors.length]
      };
    });

    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <svg width="220" height="220" style={{ marginBottom: '20px' }}>
          <defs>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <dropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.1)"/>
            </filter>
          </defs>
          
          {segments.map((segment, index) => {
            const largeArcFlag = segment.angle > 180 ? 1 : 0;
            const startX = 110 + 90 * Math.cos((segment.startAngle - 90) * Math.PI / 180);
            const startY = 110 + 90 * Math.sin((segment.startAngle - 90) * Math.PI / 180);
            const endX = 110 + 90 * Math.cos((segment.startAngle + segment.angle - 90) * Math.PI / 180);
            const endY = 110 + 90 * Math.sin((segment.startAngle + segment.angle - 90) * Math.PI / 180);
            
            return (
              <path
                key={index}
                d={`M 110 110 L ${startX} ${startY} A 90 90 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                fill={segment.color}
                stroke="white"
                strokeWidth="3"
                filter="url(#shadow)"
                style={{ cursor: 'pointer' }}
              />
            );
          })}
          
          {/* Center circle for donut effect */}
          <circle
            cx="110"
            cy="110"
            r="40"
            fill="white"
            stroke="#f0f0f0"
            strokeWidth="2"
          />
          
          {/* Total text in center */}
          <text
            x="110"
            y="105"
            textAnchor="middle"
            fontSize="12"
            fill="#666"
            fontWeight="500"
          >
            Total
          </text>
          <text
            x="110"
            y="120"
            textAnchor="middle"
            fontSize="18"
            fill="#333"
            fontWeight="700"
          >
            {total}
          </text>
        </svg>
        
        {/* Legend */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr',
          gap: '8px',
          width: '100%',
          maxWidth: '200px'
        }}>
          {segments.map((segment, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              padding: '6px 8px',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              border: `2px solid ${segment.color}`,
              borderLeft: `4px solid ${segment.color}`
            }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: segment.color,
                  borderRadius: '50%'
                }}
              ></div>
              <span style={{ fontSize: '12px', color: '#555', fontWeight: '500', flex: 1 }}>
                {segment.team}
              </span>
              <span style={{ fontSize: '12px', color: '#333', fontWeight: '600' }}>
                {segment.percentage.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="performance-charts-container">
      {/* Line Chart for Performance Trends */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '25px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        border: '1px solid #f0f0f0',
        minHeight: '400px',
        minWidth: 0,
        overflow: 'hidden'
      }}>
        <h3 style={{ 
          marginTop: 0, 
          marginBottom: '25px', 
          color: '#2d3748',
          fontSize: '18px',
          fontWeight: '600',
          borderBottom: '2px solid #e2e8f0',
          paddingBottom: '10px'
        }}>
          Performance Trends
        </h3>
        <LineChart data={performanceData} />
      </div>

      {/* Pie Chart for Team Distribution */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '25px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        border: '1px solid #f0f0f0',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        overflow: 'hidden'
      }}>
        <h3 style={{ 
          marginTop: 0, 
          marginBottom: '25px', 
          color: '#2d3748',
          fontSize: '18px',
          fontWeight: '600',
          borderBottom: '2px solid #e2e8f0',
          paddingBottom: '10px'
        }}>
          Team Distribution
        </h3>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <PieChart data={teamData} />
        </div>
      </div>
    </div>
  );
};

export default PerformanceCharts;