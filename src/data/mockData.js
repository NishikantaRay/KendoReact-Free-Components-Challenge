export const employeeData = [
  {
    id: 1,
    name: "John Doe",
    role: "Developer",
    team: "Frontend",
    attendance: 95,
    productivity: 87,
    kpi: 92,
    email: "john.doe@company.com",
    joinDate: new Date(2023, 0, 15),
    status: "Active"
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Designer",
    team: "UI/UX",
    attendance: 98,
    productivity: 94,
    kpi: 96,
    email: "jane.smith@company.com",
    joinDate: new Date(2022, 5, 20),
    status: "Active"
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Developer",
    team: "Backend",
    attendance: 92,
    productivity: 89,
    kpi: 88,
    email: "mike.johnson@company.com",
    joinDate: new Date(2023, 2, 10),
    status: "Active"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    role: "Manager",
    team: "Frontend",
    attendance: 97,
    productivity: 91,
    kpi: 93,
    email: "sarah.wilson@company.com",
    joinDate: new Date(2021, 8, 5),
    status: "Active"
  },
  {
    id: 5,
    name: "David Brown",
    role: "Developer",
    team: "Backend",
    attendance: 89,
    productivity: 85,
    kpi: 84,
    email: "david.brown@company.com",
    joinDate: new Date(2023, 4, 12),
    status: "Active"
  },
  {
    id: 6,
    name: "Lisa Davis",
    role: "QA Engineer",
    team: "Quality",
    attendance: 94,
    productivity: 90,
    kpi: 91,
    email: "lisa.davis@company.com",
    joinDate: new Date(2022, 10, 8),
    status: "Active"
  },
  {
    id: 7,
    name: "Tom Anderson",
    role: "DevOps",
    team: "Infrastructure",
    attendance: 96,
    productivity: 88,
    kpi: 89,
    email: "tom.anderson@company.com",
    joinDate: new Date(2023, 1, 3),
    status: "Active"
  },
  {
    id: 8,
    name: "Emma Taylor",
    role: "Designer",
    team: "UI/UX",
    attendance: 93,
    productivity: 92,
    kpi: 90,
    email: "emma.taylor@company.com",
    joinDate: new Date(2022, 7, 25),
    status: "Active"
  }
];

export const performanceData = [
  { month: "Jan", productivity: 85, attendance: 92, kpi: 88 },
  { month: "Feb", productivity: 87, attendance: 94, kpi: 90 },
  { month: "Mar", productivity: 89, attendance: 93, kpi: 91 },
  { month: "Apr", productivity: 91, attendance: 95, kpi: 93 },
  { month: "May", productivity: 88, attendance: 96, kpi: 92 },
  { month: "Jun", productivity: 92, attendance: 97, kpi: 94 }
];

export const teamData = [
  { team: "Frontend", count: 2, avgProductivity: 89 },
  { team: "Backend", count: 2, avgProductivity: 87 },
  { team: "UI/UX", count: 2, avgProductivity: 93 },
  { team: "Quality", count: 1, avgProductivity: 90 },
  { team: "Infrastructure", count: 1, avgProductivity: 88 }
];

export const teams = ["All Teams", "Frontend", "Backend", "UI/UX", "Quality", "Infrastructure"];
export const roles = ["All Roles", "Developer", "Designer", "Manager", "QA Engineer", "DevOps"];