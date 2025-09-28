import React from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';

const FilterBar = ({
  dateRange,
  onDateRangeChange,
  selectedTeam,
  onTeamChange,
  selectedRole,
  onRoleChange,
  teams,
  roles
}) => {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '20px 25px', 
      borderRadius: '12px', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
      border: '1px solid #f0f0f0',
      marginBottom: '25px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <label style={{ fontWeight: '600', color: '#2d3748', fontSize: '14px' }}>Date Range:</label>
        <input
          type="date"
          style={{
            padding: '8px 12px',
            border: '2px solid #e2e8f0',
            borderRadius: '6px',
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.2s',
            ':focus': {
              borderColor: '#4299e1'
            }
          }}
          onChange={(e) => onDateRangeChange({ target: { value: { start: new Date(e.target.value), end: null } } })}
        />
        <span style={{ margin: '0 8px', color: '#718096', fontWeight: '500' }}>to</span>
        <input
          type="date"
          style={{
            padding: '8px 12px',
            border: '2px solid #e2e8f0',
            borderRadius: '6px',
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onChange={(e) => onDateRangeChange({ target: { value: { start: dateRange?.start, end: new Date(e.target.value) } } })}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <label style={{ fontWeight: '600', color: '#2d3748', fontSize: '14px' }}>Team:</label>
        <DropDownList
          data={teams}
          value={selectedTeam}
          onChange={onTeamChange}
          style={{ 
            width: '160px',
            borderRadius: '6px'
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <label style={{ fontWeight: '600', color: '#2d3748', fontSize: '14px' }}>Role:</label>
        <DropDownList
          data={roles}
          value={selectedRole}
          onChange={onRoleChange}
          style={{ 
            width: '160px',
            borderRadius: '6px'
          }}
        />
      </div>
    </div>
  );
};

export default FilterBar;