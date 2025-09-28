# Team Performance Dashboard

A comprehensive internal web application for managers to track team productivity, attendance, and KPIs built with React and Kendo UI components.

## Features

### 🎯 Core Functionality
- **Employee Management**: Add, edit, and delete team members with comprehensive details
- **Performance Tracking**: Monitor productivity, attendance, and KPI scores
- **Data Visualization**: Interactive charts showing performance trends and team distribution
- **Advanced Filtering**: Filter by team, role, date range, and search functionality
- **Data Export**: Export filtered data to CSV format

### 🧩 Kendo UI Components Used

1. **Grid** - Employee data display with:
   - Filtering and sorting capabilities
   - Inline editing support
   - Pagination with customizable page sizes
   - Color-coded performance indicators

2. **Charts** - Performance visualization:
   - Line charts for performance trends over time
   - Pie charts for team distribution analysis

3. **DatePicker & DateRangePicker** - Time period selection for reports

4. **DropDownList** - Filter controls for teams and roles

5. **Drawer/Sidebar** - Collapsible navigation menu with:
   - Dashboard overview
   - Employee management
   - Analytics section
   - Reports module
   - Settings panel

6. **Notification** - Success/error messages for user actions

7. **Dialog** - Modal windows for:
   - Adding new employees
   - Editing existing employee data
   - Confirmation dialogs for deletions

8. **Toolbar** - Action bar with:
   - Add employee button
   - Export functionality
   - Quick search input

9. **Switch** - Toggle controls for:
   - Dark mode theme
   - Compact view mode

10. **Input** - Quick text search across employee data

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- **Kendo React License Key** (required for Kendo UI components)

### Installation

1. Clone or navigate to the project directory:
```bash
cd team-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. **Set up Kendo React License Key:**

   **Option 1: Using Environment Variables (Recommended)**
   - Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   - Get your license key:
     - **Trial Users**: Sign up at [Kendo React UI](https://www.telerik.com/kendo-react-ui) for a free trial
     - **Paid Users**: Login to your Telerik account to find your license key
   - Edit `.env` file and replace `your_license_key_here` with your actual license key:
   ```
   REACT_APP_KENDO_LICENSE_KEY=your_actual_license_key_here
   ```

   **Option 2: Direct Code Update**
   - Open `src/main.jsx`
   - Replace `YOUR_LICENSE_KEY_HERE` with your actual license key

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173` (or the port shown in terminal)

## 📋 Usage Guide

### Dashboard Overview
- **Performance Charts**: View team performance trends and distribution
- **Filter Bar**: Use date range, team, and role filters to refine data
- **Theme Options**: Toggle between light/dark mode and compact/standard view

### Employee Management
1. **Add Employee**: Click "Add Employee" button in the grid toolbar
2. **Edit Employee**: Click "Edit" button in the employee row
3. **Delete Employee**: Click "Delete" button and confirm the action
4. **Search**: Use the search box to find employees by name or email
5. **Export**: Click "Export" to download filtered data as CSV

### Navigation
- Use the collapsible sidebar to navigate between different sections
- Click the hamburger menu to expand/collapse the sidebar
- Current view is highlighted in the navigation menu

### Filtering & Search
- **Team Filter**: Select specific team or "All Teams"
- **Role Filter**: Filter by job role or "All Roles"
- **Date Range**: Set reporting periods using the date picker
- **Quick Search**: Type in the search box to filter by name or email
- **Real-time Updates**: Filters apply instantly as you make changes

## 🎨 Customization

### Themes
- **Light Mode**: Default clean, professional appearance
- **Dark Mode**: Dark theme for reduced eye strain
- **Compact Mode**: Condensed layout for viewing more data

### Data Structure
Employee data includes:
- Personal info (name, email, join date)
- Organization details (team, role, status)
- Performance metrics (attendance %, productivity %, KPI score)

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Sidebar.jsx      # Navigation drawer
│   ├── FilterBar.jsx    # Filter controls
│   ├── EmployeeGrid.jsx # Data grid
│   ├── PerformanceCharts.jsx # Charts
│   ├── EmployeeDialog.jsx # Add/edit modal
│   └── ConfirmDialog.jsx # Confirmation modal
├── data/
│   └── mockData.js      # Sample data
├── App.jsx              # Main application component
├── App.css              # Application styles
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 Sample Data

The dashboard includes sample data for 8 employees across different teams:
- Frontend Team
- Backend Team  
- UI/UX Team
- Quality Assurance
- Infrastructure Team

Performance metrics are color-coded:
- 🟢 Green: 90%+ (Excellent)
- 🟡 Yellow: 85-89% (Good)
- 🔴 Red: <85% (Needs Improvement)

## 🛠️ Technologies Used

- **React 19** - Frontend framework
- **Vite** - Build tool and development server
- **Kendo UI React** - Professional UI components
- **CSS3** - Styling and responsive design
- **JavaScript ES6+** - Modern JavaScript features

## 📈 Performance Features

- **Lazy Loading**: Components load on demand
- **Responsive Design**: Works on desktop and mobile devices
- **Memory Efficient**: Proper state management and cleanup
- **Fast Filtering**: Client-side filtering for instant results
- **Smooth Animations**: CSS transitions for better UX

## 🔐 Security Considerations

- Input validation for all form fields
- XSS protection through proper data handling
- Safe CSV export without executable content
- Controlled user actions with confirmation dialogs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

1. **Kendo License Key Missing**: 
   ```
   License key missing for KendoReact v12.1.0
   ```
   **Solutions:**
   - Ensure you have a valid license key from Telerik
   - Check that your `.env` file contains `REACT_APP_KENDO_LICENSE_KEY=your_key`
   - Verify the license key is correct (no extra spaces or characters)
   - Restart the development server after adding the license key
   - For trial users: Check your email for the license key after signup

2. **Port in use**: If port 5173 is occupied, Vite will automatically use the next available port

3. **Module not found**: Run `npm install` to ensure all dependencies are installed

4. **Styling issues**: Ensure Kendo theme is properly imported in App.css

5. **Chart not rendering**: Check that chart data is properly formatted

6. **Environment variables not loading**: 
   - Ensure `.env` file is in the project root
   - Restart the development server
   - Check that variable names start with `REACT_APP_`

### License Key Setup Help

**Getting a Trial License:**
1. Visit [https://www.telerik.com/kendo-react-ui](https://www.telerik.com/kendo-react-ui)
2. Click "Start Free Trial"
3. Fill out the form and verify your email
4. Check your email for the license key
5. Add it to your `.env` file

**For Existing Customers:**
1. Login to your Telerik account
2. Go to "Your Account" → "Your Licenses"
3. Find your Kendo React license key
4. Copy and paste it into your `.env` file

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

For additional support or feature requests, please create an issue in the repository.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# KendoReact-Free-Components-Challenge
