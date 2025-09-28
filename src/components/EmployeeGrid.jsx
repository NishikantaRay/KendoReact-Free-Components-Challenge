import React, { useState } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { Input } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';

const EmployeeGrid = ({ 
  data, 
  onEdit, 
  onDelete, 
  onAdd, 
  onExport, 
  searchValue, 
  onSearchChange,
  teams,
  roles,
  compactMode 
}) => {
  const [teamFilter, setTeamFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // Filter data based on search and filters
  const filteredData = data.filter(employee => {
    const matchesSearch = !searchValue || 
      employee.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.email?.toLowerCase().includes(searchValue.toLowerCase());
    const matchesTeam = !teamFilter || employee.team === teamFilter;
    const matchesRole = !roleFilter || employee.role === roleFilter;
    
    return matchesSearch && matchesTeam && matchesRole;
  });

  const getStatusBadge = (status) => {
    const statusColors = {
      'Active': { bg: '#c6f6d5', color: '#2f855a', border: '#9ae6b4' },
      'On Leave': { bg: '#fed7d7', color: '#c53030', border: '#feb2b2' },
      'Inactive': { bg: '#e2e8f0', color: '#4a5568', border: '#cbd5e0' }
    };
    
    const colors = statusColors[status] || statusColors['Active'];
    
    return (
      <span style={{
        backgroundColor: colors.bg,
        color: colors.color,
        border: `1px solid ${colors.border}`,
        borderRadius: '12px',
        padding: '4px 8px',
        fontSize: '12px',
        fontWeight: '500',
        display: 'inline-block'
      }}>
        {status}
      </span>
    );
  };

  const getPerformanceBadge = (performance) => {
    let color = '#e2e8f0';
    let textColor = '#4a5568';
    let label = 'N/A';

    if (performance >= 90) {
      color = '#c6f6d5';
      textColor = '#2f855a';
      label = 'Excellent';
    } else if (performance >= 80) {
      color = '#bee3f8';
      textColor = '#2b6cb0';
      label = 'Good';
    } else if (performance >= 70) {
      color = '#feebc8';
      textColor = '#c05621';
      label = 'Average';
    } else if (performance >= 60) {
      color = '#fed7d7';
      textColor = '#c53030';
      label = 'Poor';
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          backgroundColor: color,
          color: textColor,
          borderRadius: '8px',
          padding: '2px 6px',
          fontSize: '11px',
          fontWeight: '500'
        }}>
          {label}
        </span>
        <span style={{ fontSize: '12px', color: '#718096' }}>
          {performance}%
        </span>
      </div>
    );
  };

  const formatSalary = (salary) => {
    if (!salary) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const ActionsCell = (props) => {
    const { dataItem } = props;
    return (
      <td style={{ textAlign: 'center', padding: '8px' }}>
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          justifyContent: 'center',
          alignItems: 'center' 
        }}>
          <Button
            onClick={() => onEdit(dataItem)}
            size="small"
            style={{
              backgroundColor: '#4299e1',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              color: 'white',
              minWidth: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title="Edit Employee"
          >
            ✏️ Edit
          </Button>
          <Button
            onClick={() => onDelete(dataItem)}
            size="small"
            style={{
              backgroundColor: '#f56565',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              color: 'white',
              minWidth: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title="Delete Employee"
          >
            🗑️ Delete
          </Button>
        </div>
      </td>
    );
  };

  const NameCell = (props) => {
    const { dataItem } = props;
    return (
      <td style={{ padding: '12px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4299e1 0%, #2b6cb0 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: '600',
            boxShadow: '0 4px 8px rgba(66, 153, 225, 0.3)'
          }}>
            {dataItem.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div>
            <div style={{ fontWeight: '600', color: '#2d3748', fontSize: '14px' }}>
              {dataItem.name}
            </div>
            <div style={{ color: '#718096', fontSize: '12px' }}>
              {dataItem.email}
            </div>
          </div>
        </div>
      </td>
    );
  };

  const StatusCell = (props) => {
    const { dataItem } = props;
    return (
      <td style={{ padding: '12px 8px', textAlign: 'center' }}>
        {getStatusBadge(dataItem.status)}
      </td>
    );
  };

  const PerformanceCell = (props) => {
    const { dataItem } = props;
    const avgPerformance = Math.round(
      (dataItem.attendance + dataItem.productivity + dataItem.kpi) / 3
    );
    return (
      <td style={{ padding: '12px 8px', textAlign: 'center' }}>
        {getPerformanceBadge(avgPerformance)}
      </td>
    );
  };

  const SalaryCell = (props) => {
    const { dataItem } = props;
    return (
      <td style={{ padding: '12px 8px', textAlign: 'right', fontWeight: '600', color: '#2d3748' }}>
        {formatSalary(dataItem.salary)}
      </td>
    );
  };

  const CustomToolbar = () => (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '12px 12px 0 0',
      padding: '20px 25px',
      color: 'white'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button 
            onClick={onAdd}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              borderRadius: '8px',
              padding: '8px 16px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ➕ Add Employee
          </Button>
          <Button 
            onClick={onExport}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              borderRadius: '8px',
              padding: '8px 16px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            📥 Export
          </Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <Input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="🔍 Search employees..."
            style={{ 
              minWidth: '200px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '14px'
            }}
          />
        </div>
      </div>

      {/* Filter Row */}
      <div style={{ 
        display: 'flex', 
        gap: '15px', 
        alignItems: 'center',
        marginTop: '15px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500' }}>Team:</label>
          <DropDownList
            data={['', ...(teams?.filter(t => t !== 'All Teams') || [])]}
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            placeholder="All Teams"
            style={{ 
              minWidth: '140px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '6px'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500' }}>Role:</label>
          <DropDownList
            data={['', ...(roles?.filter(r => r !== 'All Roles') || [])]}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            placeholder="All Roles"
            style={{ 
              minWidth: '140px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '6px'
            }}
          />
        </div>

        <div style={{ 
          marginLeft: 'auto',
          fontSize: '14px',
          fontWeight: '500',
          opacity: 0.9
        }}>
          {filteredData.length} employee{filteredData.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ 
      backgroundColor: 'white', 
      borderRadius: '12px', 
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      border: 'none',
      overflow: 'hidden'
    }}>
      <CustomToolbar />
      
      <Grid
        data={filteredData}
        resizable
        sortable
        pageable={{
          buttonCount: 5,
          pageSizes: [5, 10, 20, 50],
          pageSize: 10
        }}
        style={{
          fontSize: '14px',
          border: 'none'
        }}
      >
        <GridColumn 
          field="name" 
          title="Employee" 
          width="280px"
          cell={NameCell}
          headerStyle={{ 
            fontWeight: '600', 
            backgroundColor: '#f8f9fa',
            borderBottom: '2px solid #e2e8f0',
            padding: '12px 8px'
          }}
        />
        <GridColumn 
          field="team" 
          title="Team" 
          width="120px"
          headerStyle={{ 
            fontWeight: '600', 
            backgroundColor: '#f8f9fa',
            borderBottom: '2px solid #e2e8f0',
            padding: '12px 8px'
          }}
        />
        <GridColumn 
          field="role" 
          title="Role" 
          width="130px"
          headerStyle={{ 
            fontWeight: '600', 
            backgroundColor: '#f8f9fa',
            borderBottom: '2px solid #e2e8f0',
            padding: '12px 8px'
          }}
        />
        <GridColumn 
          field="salary" 
          title="Salary" 
          width="120px"
          cell={SalaryCell}
          headerStyle={{ 
            fontWeight: '600', 
            backgroundColor: '#f8f9fa',
            borderBottom: '2px solid #e2e8f0',
            padding: '12px 8px',
            textAlign: 'right'
          }}
        />
        <GridColumn 
          title="Performance" 
          width="140px"
          cell={PerformanceCell}
          headerStyle={{ 
            fontWeight: '600', 
            backgroundColor: '#f8f9fa',
            borderBottom: '2px solid #e2e8f0',
            padding: '12px 8px',
            textAlign: 'center'
          }}
        />
        <GridColumn 
          field="status" 
          title="Status" 
          width="110px"
          cell={StatusCell}
          headerStyle={{ 
            fontWeight: '600', 
            backgroundColor: '#f8f9fa',
            borderBottom: '2px solid #e2e8f0',
            padding: '12px 8px',
            textAlign: 'center'
          }}
        />
        <GridColumn 
          title="Actions" 
          width="160px"
          cell={ActionsCell}
          headerStyle={{ 
            fontWeight: '600', 
            backgroundColor: '#f8f9fa',
            borderBottom: '2px solid #e2e8f0',
            padding: '12px 8px',
            textAlign: 'center'
          }}
        />
      </Grid>
    </div>
  );
};

export default EmployeeGrid;