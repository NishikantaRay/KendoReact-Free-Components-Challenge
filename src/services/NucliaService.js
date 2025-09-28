// Nuclia API Integration Service
// This service provides a bridge between the application and Nuclia's Knowledge Base API

class NucliaService {
  constructor() {
    // Replace these with your actual Nuclia credentials
    this.apiUrl = 'https://nuclia.cloud/api/v1';
    this.kbId = import.meta.env.VITE_NUCLIA_KB_ID || 'your-knowledge-base-id';
    this.apiKey = import.meta.env.VITE_NUCLIA_API_KEY || 'your-api-key';
    this.zone = import.meta.env.VITE_NUCLIA_ZONE || 'zone-name';
  }

  /**
   * Perform a natural language search query using Nuclia
   * @param {string} query - Natural language query
   * @param {object} options - Additional search options
   * @returns {Promise<object>} - Search results
   */
  async search(query, options = {}) {
    try {
      // For demo purposes, we'll use mock data
      // In production, replace this with actual Nuclia API calls
      if (import.meta.env.MODE === 'development' || !this.apiKey || this.apiKey === 'your-api-key') {
        return this.mockSearch(query, options);
      }

      const searchParams = new URLSearchParams({
        query: query,
        ...options
      });

      const response = await fetch(
        `${this.apiUrl}/kb/${this.kbId}/search?${searchParams}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'X-NUCLIA-NUAKEY': this.apiKey
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Nuclia API error: ${response.status}`);
      }

      const data = await response.json();
      return this.formatSearchResults(data);
    } catch (error) {
      console.error('Nuclia search error:', error);
      // Fallback to mock data on error
      return this.mockSearch(query, options);
    }
  }

  /**
   * Mock search implementation for development and fallback
   */
  async mockSearch(query, options = {}) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));

    const queryLower = query.toLowerCase();
    const results = [];

    // Performance-related queries
    if (queryLower.includes('performance') || queryLower.includes('score') || queryLower.includes('kpi')) {
      results.push(
        {
          id: 'perf-1',
          title: 'Q3 Performance Review Summary',
          excerpt: 'Team performance metrics show significant improvement in Q3 2024. Development team achieved 94.2% of quarterly targets, with individual scores ranging from 4.1 to 4.8 out of 5.0...',
          score: 0.95,
          source: 'Performance Reports',
          date: '2024-09-15',
          type: 'report',
          relevantData: {
            averageScore: 4.3,
            topPerformers: ['John Smith (4.8)', 'Sarah Johnson (4.6)', 'Raj Patel (4.5)'],
            department: 'Development'
          }
        },
        {
          id: 'perf-2',
          title: 'Monthly Performance Analytics - September',
          excerpt: 'Performance trends analysis for September 2024. Key insights: 15% improvement in code quality metrics, 98% on-time delivery rate, employee satisfaction at 4.2/5...',
          score: 0.89,
          source: 'Analytics Dashboard',
          date: '2024-09-28',
          type: 'analytics',
          relevantData: {
            codeQualityImprovement: '15%',
            onTimeDelivery: '98%',
            satisfaction: 4.2
          }
        }
      );
    }

    // Location-based queries (Bangalore, location-specific)
    if (queryLower.includes('bangalore') || queryLower.includes('location') || queryLower.includes('office')) {
      results.push(
        {
          id: 'loc-1',
          title: 'Bangalore Office Performance Report',
          excerpt: 'Bangalore development center performance analysis: 23 employees, average performance score 4.4/5, leading in innovation metrics with 8 new features delivered...',
          score: 0.92,
          source: 'Regional Reports',
          date: '2024-09-20',
          type: 'regional',
          relevantData: {
            employeeCount: 23,
            avgPerformance: 4.4,
            featuresDelivered: 8,
            location: 'Bangalore'
          }
        }
      );
    }

    // Time-based queries (Q2, quarter, monthly)
    if (queryLower.includes('q2') || queryLower.includes('quarter') || queryLower.includes('april') || queryLower.includes('may') || queryLower.includes('june')) {
      results.push(
        {
          id: 'q2-1',
          title: 'Q2 2024 Quarterly Business Review',
          excerpt: 'Second quarter results exceeded expectations with 112% target achievement. Development teams delivered 24 major features, bug resolution time improved by 30%...',
          score: 0.96,
          source: 'Quarterly Reports',
          date: '2024-07-01',
          type: 'quarterly',
          relevantData: {
            targetAchievement: '112%',
            featuresDelivered: 24,
            bugResolutionImprovement: '30%',
            quarter: 'Q2 2024'
          }
        }
      );
    }

    // Developer-specific queries
    if (queryLower.includes('developer') || queryLower.includes('engineer') || queryLower.includes('programmer')) {
      results.push(
        {
          id: 'dev-1',
          title: 'Developer Productivity Analysis',
          excerpt: 'Comprehensive analysis of developer productivity metrics. Senior developers showing 25% increase in code commits, junior developers improving at 18% rate...',
          score: 0.88,
          source: 'Development Metrics',
          date: '2024-09-25',
          type: 'productivity',
          relevantData: {
            seniorProductivityIncrease: '25%',
            juniorImprovementRate: '18%',
            totalDevelopers: 15
          }
        }
      );
    }

    // Employee/hiring queries
    if (queryLower.includes('employee') || queryLower.includes('hire') || queryLower.includes('join') || queryLower.includes('new')) {
      results.push(
        {
          id: 'hr-1',
          title: '2024 Hiring and Onboarding Report',
          excerpt: 'Year-to-date hiring statistics: 28 new employees joined, 95% retention rate, average onboarding satisfaction 4.5/5. Strongest growth in development and QA teams...',
          score: 0.91,
          source: 'HR Analytics',
          date: '2024-09-01',
          type: 'hr',
          relevantData: {
            newHires: 28,
            retentionRate: '95%',
            onboardingSatisfaction: 4.5,
            topGrowthAreas: ['Development', 'QA']
          }
        }
      );
    }

    // Fallback for general queries
    if (results.length === 0) {
      results.push(
        {
          id: 'gen-1',
          title: 'Team Dashboard Overview',
          excerpt: 'Current team status: 47 active employees, 5 departments, average performance rating 4.3/5. Recent highlights include successful Q3 delivery and team satisfaction improvements...',
          score: 0.75,
          source: 'Dashboard Analytics',
          date: '2024-09-28',
          type: 'overview',
          relevantData: {
            activeEmployees: 47,
            departments: 5,
            avgRating: 4.3
          }
        }
      );
    }

    return {
      query,
      results: results.slice(0, options.limit || 5),
      total: results.length,
      processingTime: Math.random() * 200 + 100 // Mock processing time
    };
  }

  /**
   * Format Nuclia API results to consistent format
   */
  formatSearchResults(rawResults) {
    // Transform Nuclia's response format to our application format
    return {
      query: rawResults.query || '',
      results: (rawResults.resources || []).map((resource, index) => ({
        id: resource.uuid || `result-${index}`,
        title: resource.title || 'Untitled',
        excerpt: resource.summary || resource.text?.substring(0, 200) || '',
        score: resource.score || 0.5,
        source: resource.origin?.source || 'Knowledge Base',
        date: resource.created || new Date().toISOString().split('T')[0],
        type: resource.metadata?.type || 'document',
        relevantData: resource.metadata || {}
      })),
      total: rawResults.total || 0,
      processingTime: rawResults.processingTime || 0
    };
  }

  /**
   * Index new performance data into Nuclia knowledge base
   * @param {object} data - Performance data to index
   */
  async indexPerformanceData(data) {
    try {
      if (import.meta.env.MODE === 'development' || !this.apiKey || this.apiKey === 'your-api-key') {
        console.log('Mock: Indexing performance data', data);
        return { success: true, id: `mock-${Date.now()}` };
      }

      const response = await fetch(
        `${this.apiUrl}/kb/${this.kbId}/resources`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'X-NUCLIA-NUAKEY': this.apiKey
          },
          body: JSON.stringify({
            title: data.title,
            summary: data.summary,
            text: data.content,
            metadata: {
              type: 'performance',
              department: data.department,
              date: data.date,
              ...data.metadata
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to index data: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error indexing performance data:', error);
      throw error;
    }
  }

  /**
   * Get suggested queries based on available data
   */
  getSuggestedQueries() {
    return [
      'Show me Q2 results for developers in Bangalore',
      'What was the average performance score last month?',
      'How many employees joined in 2024?',
      'Which team has the highest productivity?',
      'Show recent performance trends',
      'What are the top achievements this quarter?',
      'Compare performance between departments',
      'Show employee satisfaction metrics'
    ];
  }
}

export default new NucliaService();