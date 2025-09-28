import React from 'react';

class ChartErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Chart Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          backgroundColor: '#fed7d7',
          borderRadius: '8px',
          border: '1px solid #feb2b2',
          textAlign: 'center'
        }}>
          <h4 style={{ color: '#c53030', margin: '0 0 10px 0' }}>
            Chart Loading Error
          </h4>
          <p style={{ color: '#742a2a', margin: 0, fontSize: '14px' }}>
            Unable to display this chart. Please refresh the page or contact support.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ChartErrorBoundary;