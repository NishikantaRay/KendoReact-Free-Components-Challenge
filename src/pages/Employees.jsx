import React, { useState, useMemo } from 'react';
import EmployeeGrid from '../components/EmployeeGrid';
import EmployeeDialog from '../components/EmployeeDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import { employeeData, teams, roles } from '../data/mockData';

const Employees = ({ onNotification }) => {
  // Employee state
  const [employees, setEmployees] = useState(employeeData);
  const [searchValue, setSearchValue] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('All Teams');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  
  // Dialog states
  const [employeeDialogVisible, setEmployeeDialogVisible] = useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Filtered employees based on search and filters
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = searchValue === '' || 
        emp.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchValue.toLowerCase());
      
      const matchesTeam = selectedTeam === 'All Teams' || emp.team === selectedTeam;
      const matchesRole = selectedRole === 'All Roles' || emp.role === selectedRole;
      
      return matchesSearch && matchesTeam && matchesRole;
    });
  }, [employees, searchValue, selectedTeam, selectedRole]);

  // Event handlers
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCloseEmployeeDialog = () => {
    setEmployeeDialogVisible(false);
    setSelectedEmployee(null);
    setIsEditMode(false);
  };

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setIsEditMode(false);
    setEmployeeDialogVisible(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsEditMode(true);
    setEmployeeDialogVisible(true);
  };

  const handleDeleteEmployee = (employee) => {
    setEmployeeToDelete(employee);
    setConfirmDialogVisible(true);
  };

  const handleSaveEmployee = (employeeData) => {
    if (isEditMode) {
      setEmployees(prev => prev.map(emp => 
        emp.id === employeeData.id ? employeeData : emp
      ));
      onNotification?.(`Employee ${employeeData.name} updated successfully!`, 'success');
    } else {
      // Generate new ID
      const newEmployee = {
        ...employeeData,
        id: Math.max(...employees.map(e => e.id)) + 1
      };
      setEmployees(prev => [...prev, newEmployee]);
      onNotification?.(`Employee ${employeeData.name} added successfully!`, 'success');
    }
    handleCloseEmployeeDialog();
  };

  const handleConfirmDelete = () => {
    if (employeeToDelete) {
      setEmployees(prev => prev.filter(emp => emp.id !== employeeToDelete.id));
      onNotification?.(`Employee ${employeeToDelete.name} deleted successfully!`, 'info');
      setEmployeeToDelete(null);
    }
    setConfirmDialogVisible(false);
  };

  const handleExport = () => {
    // Simple CSV export functionality
    const csvData = filteredEmployees.map(emp => 
      `${emp.name},${emp.role},${emp.team},${emp.email},${emp.attendance},${emp.productivity},${emp.kpi},${emp.status}`
    ).join('\n');
    
    const csvContent = `Name,Role,Team,Email,Attendance,Productivity,KPI,Status\n${csvData}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employees-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    onNotification?.('Employee data exported successfully!', 'success');
  };

  return (
    <div>
      {/* Employee Statistics */}
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
          <h3 style={{ margin: '0 0 10px 0', color: '#2d3748', fontSize: '14px' }}>Total Employees</h3>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#4299e1' }}>{employees.length}</div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
          border: '1px solid #f0f0f0'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#2d3748', fontSize: '14px' }}>Teams</h3>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#48bb78' }}>{teams.length - 1}</div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
          border: '1px solid #f0f0f0'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#2d3748', fontSize: '14px' }}>Active</h3>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#48bb78' }}>
            {employees.filter(emp => emp.status === 'Active').length}
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
          border: '1px solid #f0f0f0'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#2d3748', fontSize: '14px' }}>Filtered Results</h3>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#9f7aea' }}>{filteredEmployees.length}</div>
        </div>
      </div>

      {/* Quick Filters */}
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
          <label style={{ fontWeight: '600', color: '#2d3748', fontSize: '14px' }}>Search:</label>
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search employees..."
            style={{
              padding: '8px 12px',
              border: '2px solid #e2e8f0',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s',
              minWidth: '200px'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontWeight: '600', color: '#2d3748', fontSize: '14px' }}>Team:</label>
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '2px solid #e2e8f0',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: 'white'
            }}
          >
            {teams.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontWeight: '600', color: '#2d3748', fontSize: '14px' }}>Role:</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '2px solid #e2e8f0',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: 'white'
            }}
          >
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Employee Grid */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '25px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        border: '1px solid #f0f0f0'
      }}>
        <EmployeeGrid
          data={filteredEmployees}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
          onAdd={handleAddEmployee}
          onExport={handleExport}
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          teams={teams}
          roles={roles}
        />
      </div>

      {/* Dialogs */}
      <EmployeeDialog
        visible={employeeDialogVisible}
        onClose={handleCloseEmployeeDialog}
        employee={selectedEmployee}
        onSave={handleSaveEmployee}
        teams={teams}
        roles={roles}
        isEdit={isEditMode}
      />

      <ConfirmDialog
        visible={confirmDialogVisible}
        onClose={() => setConfirmDialogVisible(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Employee"
        message={`Are you sure you want to delete ${employeeToDelete?.name}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default Employees;