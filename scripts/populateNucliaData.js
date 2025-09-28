// Sample script to populate Nuclia knowledge base with performance data
// Run this script to index sample performance data for testing the AI query feature

import NucliaService from '../src/services/NucliaService.js';

// Sample performance data that would typically come from your existing systems
const samplePerformanceData = [
  {
    title: 'Q2 2024 Performance Review - Development Team Bangalore',
    summary: 'Comprehensive performance analysis for the development team in Bangalore office during Q2 2024',
    content: `
      The development team in Bangalore achieved exceptional results in Q2 2024, exceeding targets by 12%.
      
      Key Metrics:
      - Team Size: 15 developers
      - Average Performance Score: 4.4/5
      - Projects Completed: 24
      - Code Quality Score: 94%
      - Bug Resolution Time: Improved by 30%
      
      Top Performers:
      1. John Smith - Senior Developer - Score: 4.8/5
      2. Sarah Johnson - Frontend Lead - Score: 4.6/5  
      3. Raj Patel - Backend Developer - Score: 4.5/5
      
      Areas of Excellence:
      - React development and modern frontend practices
      - API development and microservices architecture
      - DevOps integration and CI/CD implementation
      
      Key Achievements:
      - Launched 3 major product features
      - Reduced technical debt by 25%
      - Improved test coverage to 85%
      - Zero critical production bugs
      
      Recommendations:
      - Continue investment in senior developer mentoring
      - Expand the team by 3-4 junior developers
      - Focus on mobile development skills for 2024 H2
    `,
    department: 'Development',
    date: '2024-07-01',
    metadata: {
      quarter: 'Q2',
      year: 2024,
      location: 'Bangalore',
      teamSize: 15,
      averageScore: 4.4,
      projectsCompleted: 24,
      topPerformers: ['John Smith', 'Sarah Johnson', 'Raj Patel']
    }
  },
  
  {
    title: 'September 2024 Monthly Performance Dashboard',
    summary: 'Monthly performance metrics and analytics for all departments',
    content: `
      Monthly Performance Overview - September 2024
      
      Overall Company Metrics:
      - Total Employees: 47
      - Overall Performance Rating: 4.3/5
      - Employee Satisfaction: 4.1/5
      - Retention Rate: 96%
      
      Department Breakdown:
      
      Development Team (15 members):
      - Performance Score: 4.5/5
      - Key Projects: Mobile app enhancement, API v2, Dashboard redesign
      - Productivity: +18% vs previous month
      
      QA Team (8 members):
      - Performance Score: 4.4/5
      - Test Coverage: 88%
      - Bug Detection Rate: 95%
      - Automation Increase: +25%
      
      Marketing Team (10 members):
      - Performance Score: 4.2/5
      - Campaign Success Rate: 87%
      - Lead Generation: +32% vs Q2
      - Social Media Engagement: +45%
      
      HR Team (6 members):
      - Performance Score: 4.1/5
      - Employee Onboarding Score: 4.6/5
      - Training Completion Rate: 92%
      - Recruitment Time: Reduced by 15%
      
      Operations Team (8 members):
      - Performance Score: 4.2/5
      - Process Efficiency: +12%
      - Customer Support Rating: 4.7/5
      - System Uptime: 99.8%
      
      Highlights:
      - Record month for customer satisfaction
      - Successfully launched 2 major features
      - Zero security incidents
      - Highest employee engagement score this year
    `,
    department: 'All',
    date: '2024-09-30',
    metadata: {
      month: 'September',
      year: 2024,
      totalEmployees: 47,
      overallRating: 4.3,
      retentionRate: 96,
      departmentScores: {
        development: 4.5,
        qa: 4.4,
        marketing: 4.2,
        hr: 4.1,
        operations: 4.2
      }
    }
  },
  
  {
    title: '2024 Hiring and Employee Growth Report',
    summary: 'Annual report on hiring trends, new employee performance, and team growth',
    content: `
      2024 Employee Growth and Hiring Analysis
      
      Hiring Statistics:
      - Total New Hires: 28 employees
      - Retention Rate of New Hires: 93%
      - Average Onboarding Score: 4.5/5
      - Time to Productivity: 6.2 weeks (improved from 8.1 weeks)
      
      Department Growth:
      - Development: +8 new hires (3 senior, 5 junior)
      - QA: +5 new hires (2 senior, 3 junior)
      - Marketing: +6 new hires (4 specialists, 2 coordinators)
      - HR: +3 new hires (1 manager, 2 coordinators)
      - Operations: +6 new hires (2 leads, 4 specialists)
      
      New Employee Performance:
      - Average Performance Score after 6 months: 4.1/5
      - Training Completion Rate: 96%
      - Peer Review Scores: 4.3/5
      - Manager Satisfaction: 4.4/5
      
      Best Performing New Hires:
      1. Alex Chen - Senior Developer - Score: 4.7/5
      2. Maria Garcia - QA Lead - Score: 4.6/5
      3. David Kim - Marketing Specialist - Score: 4.5/5
      4. Lisa Wang - Operations Manager - Score: 4.5/5
      
      Diversity and Inclusion:
      - Gender Distribution: 52% Male, 48% Female
      - Remote vs Office: 60% Hybrid, 25% Remote, 15% Office
      - Experience Levels: 35% Senior, 40% Mid-level, 25% Junior
      
      Key Recruitment Sources:
      - Employee Referrals: 40%
      - LinkedIn: 25%
      - University Partnerships: 20%
      - Job Boards: 15%
      
      Challenges and Solutions:
      - Technical skill gaps addressed through mentorship programs
      - Cultural integration improved with buddy system
      - Remote onboarding enhanced with virtual sessions
    `,
    department: 'HR',
    date: '2024-09-15',
    metadata: {
      year: 2024,
      totalHires: 28,
      retentionRate: 93,
      averageOnboardingScore: 4.5,
      timeToProductivity: 6.2,
      diversityMetrics: {
        genderDistribution: { male: 52, female: 48 },
        workMode: { hybrid: 60, remote: 25, office: 15 }
      }
    }
  },
  
  {
    title: 'Q3 2024 KPI Achievement and Goals Analysis',
    summary: 'Quarterly review of KPI performance across all departments and individual achievements',
    content: `
      Q3 2024 KPI Performance Analysis
      
      Company-wide KPI Achievement: 108% of targets
      
      Strategic Goals Progress:
      
      1. Revenue Growth: 115% achieved (Target: 110%)
         - New customer acquisition: +34%
         - Customer retention: 94%
         - Average deal size: +18%
      
      2. Product Development: 102% achieved (Target: 100%)
         - Feature releases: 12 (Target: 12)
         - User engagement: +28%
         - Performance improvements: +22%
      
      3. Team Growth: 95% achieved (Target: 100%)
         - New hires: 19 (Target: 20)
         - Employee satisfaction: 4.2/5 (Target: 4.0/5)
         - Skills development: 92% completion rate
      
      4. Operational Excellence: 112% achieved (Target: 105%)
         - Process automation: +35%
         - Cost reduction: 8% (Target: 5%)
         - Quality metrics: 96% (Target: 92%)
      
      Individual KPI Highlights:
      
      Top Goal Achievers:
      - Sarah Johnson (Frontend Lead): 128% of goals
      - Michael Brown (Sales Manager): 125% of goals
      - Priya Sharma (QA Manager): 120% of goals
      - Tom Wilson (Marketing Director): 118% of goals
      
      Department KPI Summary:
      
      Development Team:
      - Code quality goals: 110% achieved
      - Feature delivery: 105% achieved
      - Technical debt reduction: 115% achieved
      
      Sales Team:
      - Revenue targets: 118% achieved
      - Pipeline growth: 125% achieved
      - Customer satisfaction: 112% achieved
      
      Marketing Team:
      - Lead generation: 108% achieved
      - Brand awareness: 95% achieved
      - Campaign ROI: 130% achieved
      
      Focus Areas for Q4:
      - Mobile app performance optimization
      - International market expansion
      - AI/ML integration in products
      - Enhanced customer support automation
    `,
    department: 'All',
    date: '2024-10-01',
    metadata: {
      quarter: 'Q3',
      year: 2024,
      overallAchievement: 108,
      topDepartments: ['Sales', 'Development', 'Operations'],
      focusAreasQ4: ['Mobile optimization', 'International expansion', 'AI integration']
    }
  }
];

// Function to index all sample data
async function indexSampleData() {
  console.log('🚀 Starting to index sample performance data...\n');
  
  for (let i = 0; i < samplePerformanceData.length; i++) {
    const data = samplePerformanceData[i];
    
    try {
      console.log(`📊 Indexing: ${data.title}`);
      
      const result = await NucliaService.indexPerformanceData(data);
      
      if (result.success) {
        console.log(`✅ Successfully indexed with ID: ${result.id}\n`);
      } else {
        console.log(`❌ Failed to index: ${data.title}\n`);
      }
      
      // Add delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Error indexing ${data.title}:`, error.message);
    }
  }
  
  console.log('🎉 Sample data indexing completed!');
  console.log('\n📋 You can now test these queries:');
  console.log('• "Show me Q2 results for developers in Bangalore"');
  console.log('• "What was the average performance score last month?"');
  console.log('• "How many employees joined in 2024?"'); 
  console.log('• "Which team has the highest KPI achievement?"');
  console.log('• "Show me hiring trends and statistics"');
}

// Function to verify indexed data
async function testQueries() {
  console.log('\n🔍 Testing sample queries...\n');
  
  const testQueries = [
    'Show me Q2 results for developers in Bangalore',
    'What was the average performance score last month?',
    'How many employees joined in 2024?'
  ];
  
  for (const query of testQueries) {
    try {
      console.log(`Query: "${query}"`);
      const results = await NucliaService.search(query);
      console.log(`Results: ${results.results.length} found`);
      
      if (results.results.length > 0) {
        console.log(`Top result: ${results.results[0].title}`);
      }
      console.log('---');
      
    } catch (error) {
      console.error(`Error testing query "${query}":`, error.message);
    }
  }
}

// Export functions for use in other scripts
export { indexSampleData, testQueries, samplePerformanceData };

// Run automatically if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('🤖 Nuclia Knowledge Base Population Script');
  console.log('==========================================\n');
  
  try {
    await indexSampleData();
    await testQueries();
  } catch (error) {
    console.error('Script execution error:', error);
    process.exit(1);
  }
}