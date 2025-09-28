import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { Input } from '@progress/kendo-react-inputs';
import { Badge } from '@progress/kendo-react-indicators';
import NucliaService from '../services/NucliaService';

const NucliaQueryWidget = ({ expanded, onResultsFound }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searchResponse, setSearchResponse] = useState(null);
  const [recentQueries, setRecentQueries] = useState(NucliaService.getSuggestedQueries().slice(0, 3));
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Nuclia API integration
  const performNucliaSearch = async (searchQuery) => {
    setIsLoading(true);
    
    try {
      const response = await NucliaService.search(searchQuery, {
        limit: 5,
        highlight: true
      });
      
      setSearchResponse(response);
      setResults(response.results);
      
      // Add to recent queries if not already there and it's a real query
      if (!recentQueries.includes(searchQuery) && searchQuery.trim().length > 5) {
        setRecentQueries(prev => [searchQuery, ...prev.slice(0, 4)]);
      }
      
      onResultsFound && onResultsFound(response);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
      setSearchResponse({ error: 'Search failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      performNucliaSearch(query.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleRecentQueryClick = (recentQuery) => {
    setQuery(recentQuery);
    performNucliaSearch(recentQuery);
  };

  const renderCompactButton = () => (
    <button
      onClick={() => setIsOpen(!isOpen)}
      style={{
        width: '100%',
        padding: '12px 14px',
        border: 'none',
        background: isOpen ? '#3498db' : 'transparent',
        color: '#ecf0f1',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        transition: 'all 0.2s ease',
        position: 'relative',
        borderRadius: '0',
        margin: 0
      }}
      title="AI Query Assistant"
      onMouseEnter={(e) => {
        if (!isOpen) {
          e.target.style.backgroundColor = '#34495e';
        }
      }}
      onMouseLeave={(e) => {
        if (!isOpen) {
          e.target.style.backgroundColor = 'transparent';
        }
      }}
    >
      <span style={{ fontSize: '20px' }}>🤖</span>
      
      {/* Tooltip for collapsed state */}
      <div style={{
        position: 'absolute',
        left: '70px',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '12px',
        whiteSpace: 'nowrap',
        opacity: 0,
        visibility: 'hidden',
        transition: 'all 0.2s ease',
        zIndex: 1001,
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        border: '1px solid #34495e',
        pointerEvents: 'none'
      }}
      className="sidebar-tooltip"
      >
        AI Query Assistant
      </div>
    </button>
  );

  const renderExpandedSection = () => (
    <div style={{
      padding: '15px',
      borderTop: '1px solid #34495e',
      backgroundColor: '#2c3e50'
    }}>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          marginBottom: '12px' 
        }}>
          <span style={{ fontSize: '16px' }}>🤖</span>
          <span style={{ fontSize: '14px', color: '#ecf0f1', fontWeight: '600' }}>
            AI Query Assistant
          </span>
          <Badge 
            themeColor="info" 
            size="small"
            style={{ backgroundColor: '#3498db', fontSize: '10px' }}
          >
            Nuclia
          </Badge>
        </div>
        
        <div style={{ display: 'flex', gap: '5px' }}>
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about performance data..."
            style={{ 
              width: '100%', 
              fontSize: '12px',
              backgroundColor: '#34495e',
              color: '#ecf0f1',
              border: '1px solid #4a5f7a'
            }}
            disabled={isLoading}
          />
          <Button
            icon={isLoading ? "loading" : "search"}
            look="flat"
            onClick={handleSearch}
            disabled={isLoading || !query.trim()}
            style={{
              backgroundColor: '#3498db',
              border: '1px solid #2980b9',
              color: 'white',
              minWidth: '32px',
              height: '32px',
              padding: '6px'
            }}
            title="Search with AI"
          />
        </div>
      </div>
      
      {/* Recent Queries */}
      {!isLoading && results.length === 0 && (
        <div style={{ marginTop: '10px' }}>
          <div style={{ 
            fontSize: '11px', 
            color: '#bdc3c7', 
            marginBottom: '8px',
            fontWeight: '500'
          }}>
            Try these queries:
          </div>
          {recentQueries.slice(0, 3).map((recentQuery, index) => (
            <button
              key={index}
              onClick={() => handleRecentQueryClick(recentQuery)}
              style={{
                width: '100%',
                padding: '6px 8px',
                margin: '2px 0',
                border: 'none',
                backgroundColor: '#34495e',
                color: '#bdc3c7',
                fontSize: '10px',
                textAlign: 'left',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#4a5f7a';
                e.target.style.color = '#ecf0f1';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#34495e';
                e.target.style.color = '#bdc3c7';
              }}
            >
              💡 {recentQuery}
            </button>
          ))}
        </div>
      )}
      
      {/* Loading State */}
      {isLoading && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '10px',
          padding: '8px',
          backgroundColor: '#34495e',
          borderRadius: '4px'
        }}>
          <span className="k-icon k-i-loading" style={{ 
            fontSize: '12px', 
            color: '#3498db',
            animation: 'k-loader-spin 1s linear infinite'
          }}></span>
          <span style={{ fontSize: '11px', color: '#bdc3c7' }}>
            Searching with AI...
          </span>
        </div>
      )}
      
      {/* Results */}
      {results.length > 0 && (
        <div style={{ marginTop: '10px', maxHeight: '250px', overflowY: 'auto' }}>
          <div style={{ 
            fontSize: '11px', 
            color: '#bdc3c7', 
            marginBottom: '8px',
            fontWeight: '500',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Found {results.length} result(s)</span>
            {searchResponse?.processingTime && (
              <span>⚡ {Math.round(searchResponse.processingTime)}ms</span>
            )}
          </div>
          {results.map((result, index) => (
            <div
              key={result.id || index}
              style={{
                backgroundColor: '#34495e',
                padding: '10px',
                marginBottom: '8px',
                borderRadius: '6px',
                border: '1px solid #4a5f7a',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#4a5f7a';
                e.target.style.borderColor = '#5a6f8a';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#34495e';
                e.target.style.borderColor = '#4a5f7a';
              }}
              onClick={() => {
                // Could open detailed view or navigate to relevant page
                console.log('Clicked result:', result);
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '6px'
              }}>
                <span style={{ 
                  fontSize: '11px', 
                  color: '#ecf0f1', 
                  fontWeight: '600',
                  lineHeight: '1.3',
                  flex: 1,
                  marginRight: '8px'
                }}>
                  {result.title}
                </span>
                <Badge 
                  themeColor="success" 
                  size="small"
                  style={{ 
                    backgroundColor: result.score > 0.9 ? '#27ae60' : result.score > 0.8 ? '#f39c12' : '#3498db', 
                    fontSize: '9px',
                    padding: '2px 6px',
                    minWidth: '35px'
                  }}
                >
                  {Math.round(result.score * 100)}%
                </Badge>
              </div>
              <p style={{
                fontSize: '10px',
                color: '#bdc3c7',
                margin: '0 0 6px 0',
                lineHeight: '1.4',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {result.excerpt}
              </p>
              
              {/* Show relevant data if available */}
              {result.relevantData && Object.keys(result.relevantData).length > 0 && (
                <div style={{
                  fontSize: '9px',
                  color: '#95a5a6',
                  marginBottom: '4px',
                  padding: '4px 6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '3px'
                }}>
                  {Object.entries(result.relevantData).slice(0, 2).map(([key, value]) => (
                    <span key={key} style={{ marginRight: '8px' }}>
                      {key}: <strong style={{ color: '#ecf0f1' }}>{value}</strong>
                    </span>
                  ))}
                </div>
              )}
              
              <div style={{
                fontSize: '9px',
                color: '#7f8c8d',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>📁 {result.source}</span>
                <span>{result.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Error State */}
      {searchResponse?.error && (
        <div style={{
          marginTop: '10px',
          padding: '8px',
          backgroundColor: '#e74c3c',
          color: 'white',
          borderRadius: '4px',
          fontSize: '11px'
        }}>
          ❌ {searchResponse.error}
        </div>
      )}
    </div>
  );

  if (!expanded) {
    return renderCompactButton();
  }

  return renderExpandedSection();
};

export default NucliaQueryWidget;