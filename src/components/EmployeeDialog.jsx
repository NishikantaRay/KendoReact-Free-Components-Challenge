import React, { useState, useEffect } from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Button } from '@progress/kendo-react-buttons';
import { Input } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { DatePicker } from '@progress/kendo-react-dateinputs';

const EmployeeDialog = ({ 
  visible, 
  onClose, 
  employee, 
  onSave, 
  teams, 
  roles,
  isEdit = false 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    team: '',
    attendance: 95,
    productivity: 85,
    kpi: 90,
    joinDate: new Date(),
    status: 'Active',
    salary: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        role: employee.role || (roles && roles[1]) || '',
        team: employee.team || (teams && teams[1]) || '',
        attendance: employee.attendance || 95,
        productivity: employee.productivity || 85,
        kpi: employee.kpi || 90,
        joinDate: employee.joinDate || new Date(),
        status: employee.status || 'Active',
        salary: employee.salary || ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        role: (roles && roles[1]) || '',
        team: (teams && teams[1]) || '',
        attendance: 95,
        productivity: 85,
        kpi: 90,
        joinDate: new Date(),
        status: 'Active',
        salary: ''
      });
    }
    setErrors({});
    setTouched({});
  }, [employee, visible, teams, roles]);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value || value.trim().length < 2) {
          return 'Name must be at least 2 characters long';
        }
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          return 'Name can only contain letters and spaces';
        }
        break;
      
      case 'email':
        if (!value) {
          return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        break;
      
      case 'salary':
        if (!value) {
          return 'Salary is required';
        }
        const salaryNum = parseFloat(value);
        if (isNaN(salaryNum) || salaryNum < 0) {
          return 'Salary must be a valid positive number';
        }
        if (salaryNum < 30000) {
          return 'Salary must be at least $30,000';
        }
        if (salaryNum > 500000) {
          return 'Salary cannot exceed $500,000';
        }
        break;
      
      case 'attendance':
      case 'productivity':
      case 'kpi':
        const num = parseFloat(value);
        if (isNaN(num) || num < 0 || num > 100) {
          return `${name} must be between 0 and 100`;
        }
        break;
      
      default:
        break;
    }
    return null;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['name', 'email', 'salary'];
    
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    
    setErrors(newErrors);
    setTouched(requiredFields.reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const employeeData = {
        ...formData,
        id: employee?.id || Date.now(),
        salary: parseFloat(formData.salary),
        attendance: parseFloat(formData.attendance),
        productivity: parseFloat(formData.productivity),
        kpi: parseFloat(formData.kpi)
      };
      onSave(employeeData);
      onClose();
    }
  };

  const statusOptions = [
    { text: 'Active', value: 'Active' },
    { text: 'On Leave', value: 'On Leave' },
    { text: 'Inactive', value: 'Inactive' }
  ];

  const getInputStyle = (fieldName) => ({
    borderColor: errors[fieldName] ? '#e53e3e' : touched[fieldName] ? '#38a169' : '#e2e8f0',
    backgroundColor: errors[fieldName] ? '#fed7d7' : '#ffffff'
  });

  if (!visible) return null;

  return (
    <Dialog
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>{isEdit ? '✏️' : '👤'}</span>
          <span>{isEdit ? 'Edit Employee' : 'Add New Employee'}</span>
        </div>
      }
      visible={visible}
      onClose={onClose}
      width={650}
      height={700}
      modal={true}
    >
      <div style={{ 
        padding: '25px', 
        maxHeight: '500px', 
        overflowY: 'auto',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
      }}>
        <div style={{ display: 'grid', gap: '25px' }}>
          {/* Name Field */}
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
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              placeholder="Enter full name"
              style={{
                ...getInputStyle('name'),
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            {errors.name && (
              <div style={{ 
                color: '#e53e3e', 
                fontSize: '12px', 
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span>⚠️</span>
                {errors.name}
              </div>
            )}
          </div>

          {/* Email Field */}
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
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              placeholder="Enter email address"
              type="email"
              style={{
                ...getInputStyle('email'),
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            {errors.email && (
              <div style={{ 
                color: '#e53e3e', 
                fontSize: '12px', 
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span>⚠️</span>
                {errors.email}
              </div>
            )}
          </div>

          {/* Team and Role Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: '#2d3748',
                fontSize: '14px'
              }}>
                Team
              </label>
              <DropDownList
                data={teams ? teams.filter(team => team !== 'All Teams') : []}
                value={formData.team}
                onChange={(e) => handleInputChange('team', e.target.value)}
                placeholder="Select team"
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
                data={roles ? roles.filter(role => role !== 'All Roles') : []}
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                placeholder="Select role"
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Salary Field */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600',
              color: '#2d3748',
              fontSize: '14px'
            }}>
              Annual Salary ($) *
            </label>
            <Input
              value={formData.salary}
              onChange={(e) => handleInputChange('salary', e.target.value)}
              onBlur={() => handleBlur('salary')}
              placeholder="e.g., 65000"
              type="number"
              style={{
                ...getInputStyle('salary'),
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            {errors.salary && (
              <div style={{ 
                color: '#e53e3e', 
                fontSize: '12px', 
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span>⚠️</span>
                {errors.salary}
              </div>
            )}
          </div>

          {/* Performance Metrics Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: '#2d3748',
                fontSize: '14px'
              }}>
                Attendance (%)
              </label>
              <Input
                value={formData.attendance}
                onChange={(e) => handleInputChange('attendance', e.target.value)}
                onBlur={() => handleBlur('attendance')}
                placeholder="95"
                type="number"
                min="0"
                max="100"
                style={{
                  ...getInputStyle('attendance'),
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              {errors.attendance && (
                <div style={{ color: '#e53e3e', fontSize: '11px', marginTop: '2px' }}>
                  {errors.attendance}
                </div>
              )}
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: '#2d3748',
                fontSize: '14px'
              }}>
                Productivity (%)
              </label>
              <Input
                value={formData.productivity}
                onChange={(e) => handleInputChange('productivity', e.target.value)}
                onBlur={() => handleBlur('productivity')}
                placeholder="85"
                type="number"
                min="0"
                max="100"
                style={{
                  ...getInputStyle('productivity'),
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              {errors.productivity && (
                <div style={{ color: '#e53e3e', fontSize: '11px', marginTop: '2px' }}>
                  {errors.productivity}
                </div>
              )}
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: '#2d3748',
                fontSize: '14px'
              }}>
                KPI Score (%)
              </label>
              <Input
                value={formData.kpi}
                onChange={(e) => handleInputChange('kpi', e.target.value)}
                onBlur={() => handleBlur('kpi')}
                placeholder="90"
                type="number"
                min="0"
                max="100"
                style={{
                  ...getInputStyle('kpi'),
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              {errors.kpi && (
                <div style={{ color: '#e53e3e', fontSize: '11px', marginTop: '2px' }}>
                  {errors.kpi}
                </div>
              )}
            </div>
          </div>

          {/* Join Date and Status Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: '#2d3748',
                fontSize: '14px'
              }}>
                Join Date
              </label>
              <DatePicker
                value={formData.joinDate}
                onChange={(e) => handleInputChange('joinDate', e.target.value)}
                format="MM/dd/yyyy"
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
                Status
              </label>
              <DropDownList
                data={statusOptions}
                textField="text"
                valueField="value"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
      
      <DialogActionsBar style={{ 
        padding: '20px 25px',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        borderTop: '1px solid #e2e8f0'
      }}>
        <Button 
          onClick={onClose}
          style={{ 
            marginRight: '12px',
            backgroundColor: '#e2e8f0',
            color: '#4a5568',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '8px',
            fontWeight: '500'
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          themeColor="primary"
          style={{ 
            backgroundColor: '#4299e1',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '8px',
            fontWeight: '500',
            color: 'white'
          }}
        >
          {isEdit ? '✅ Update Employee' : '➕ Add Employee'}
        </Button>
      </DialogActionsBar>
    </Dialog>
  );
};

export default EmployeeDialog;