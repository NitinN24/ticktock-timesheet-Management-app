// TypeScript interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface TimesheetWeek {
  id: string;
  week: number;
  dateRange: string;
  status: "COMPLETED" | "INCOMPLETE" | "MISSING";
}

export interface TimesheetEntry {
  id: string;
  date: string;
  project: string;
  type: string;
  description: string;
  hours: number;
}

// User data for login
export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@tentwenty.com",
    password: "password123", // In a real app, never store plaintext!
  },
];

// Timesheet weeks
export const timesheets: TimesheetWeek[] = [
  {
    id: "1",
    week: 1,
    dateRange: "1 - 5 January, 2024",
    status: "COMPLETED",
  },
  {
    id: "2",
    week: 2,
    dateRange: "8 - 12 January, 2024",
    status: "COMPLETED",
  },
  {
    id: "3",
    week: 3,
    dateRange: "15 - 19 January, 2024",
    status: "INCOMPLETE",
  },
  {
    id: "4",
    week: 4,
    dateRange: "22 - 26 January, 2024",
    status: "COMPLETED",
  },
  {
    id: "5",
    week: 5,
    dateRange: "28 January - 1 February, 2024",
    status: "MISSING",
  },
];

// Timesheet entries per week
export const timesheetEntries: Record<string, TimesheetEntry[]> = {
  "1": [
    {
      id: "e1",
      date: "2024-01-01",
      project: "Homepage Development",
      type: "Feature",
      description: "Created homepage layout",
      hours: 8,
    },
    {
      id: "e2",
      date: "2024-01-02",
      project: "Homepage Development",
      type: "Bug Fix",
      description: "Fixed responsive design issues",
      hours: 6,
    },
    {
      id: "e3",
      date: "2024-01-03",
      project: "User Authentication",
      type: "Feature",
      description: "Implemented login system",
      hours: 8,
    },
  ],
  "2": [
    {
      id: "e4",
      date: "2024-01-08",
      project: "API Development",
      type: "Feature",
      description: "Created REST endpoints",
      hours: 7,
    },
    {
      id: "e5",
      date: "2024-01-09",
      project: "API Development",
      type: "Testing",
      description: "Unit tests for API endpoints",
      hours: 6,
    },
    {
      id: "temp-edit-id", // ✅ Task added
      date: "2024-01-10",
      project: "UI Enhancement",
      type: "Bug Fix",
      description: "Fix alignment in header component",
      hours: 5,
    },
  ],
  "3": [
    {
      id: "e6",
      date: "2024-01-15",
      project: "Database Design",
      type: "Feature",
      description: "Created user tables",
      hours: 4,
    },
  ],
  "4": [
    {
      id: "e7",
      date: "2024-01-22",
      project: "Frontend Components",
      type: "Feature",
      description: "Built reusable UI components",
      hours: 8,
    },
    {
      id: "e8",
      date: "2024-01-23",
      project: "Frontend Components",
      type: "Styling",
      description: "Applied design system",
      hours: 6,
    },
  ],
  "5": [],
};
