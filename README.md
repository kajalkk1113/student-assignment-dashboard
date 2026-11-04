# student-assignment-dashboard
=======
# AssignHub – Student Assignment Management Dashboard

AssignHub is a responsive Student Assignment Management Dashboard built using React and Tailwind CSS. It provides separate dashboards for students and administrators to manage assignments, track submissions, and monitor assignment progress.

## Features

### Authentication & Roles

- Mock login system with predefined users.
- Role-based dashboards for Admin and Student.
- Separate access and functionalities for each role.

### Student Dashboard

- View assigned assignments.
- Search, filter, and sort assignments.
- Check assignment status and deadlines.
- Submit assignments with confirmation.
- Track personal assignment completion progress.

### Admin Dashboard

- Create, edit, and delete assignments.
- Assign assignments to students.
- View assignment submission status.
- Monitor student progress and completion statistics.

### Additional Features

- Responsive design for mobile, tablet, and desktop.
- Dark mode and light mode support.
- LocalStorage-based data persistence.
- Reusable UI components.
- Accessible interface with clear visual feedback.

## Tech Stack

- React.js – Component-based UI development.
- JavaScript – Application logic.
- Tailwind CSS – Styling and responsive design.
- Vite – Development server and build tool.
- Lucide React – Icons.
- LocalStorage – Client-side data persistence.

## Project Setup

### Prerequisites

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/kajalkk1113/student-assignment-dashboard.git
```

2. Navigate to the project directory:

```bash
cd student-assignment-dashboard
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the application in your browser using the URL displayed in the terminal.

### Build for Production

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Folder Structure

```text
student-assignment-dashboard/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── assignments/
│   │   │   ├── AssignmentCard.jsx
│   │   │   ├── AssignmentForm.jsx
│   │   │   ├── AssignmentTable.jsx
│   │   │   └── SubmissionModal.jsx
│   │   │
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   └── StatusBadge.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── AssignmentContext.jsx
│   │   │
│   │   ├── data/
│   │   │   └── user.js
│   │   │
│   │   ├── layout/
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   └── pages/
│   │       ├── Login.jsx
│   │       ├── AdminDashboard.jsx
│   │       └── StudentDasboard.jsx
│   │
│   ├── utils/
│   │   └── dateUtils.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Component Architecture

The application follows a modular and component-based architecture.

### 1. App.jsx

- Main application entry component.
- Wraps the application with authentication and assignment providers.
- Determines which dashboard to display based on the logged-in user's role.

### 2. Context

- **AuthContext:** Manages login, logout, and authenticated user state.
- **AssignmentContext:** Manages assignment data, assignment operations, and persistence.

### 3. Layout Components

- **DashboardLayout:** Provides the common dashboard layout.
- **Sidebar:** Handles navigation and role-specific menu items.
- **Navbar:** Contains user information and dashboard controls.

### 4. Page Components

- **Login:** Handles mock user authentication.
- **AdminDashboard:** Provides assignment management and monitoring features.
- **StudentDasboard:** Displays student assignments, filters, and submission progress.

### 5. Assignment Components

- **AssignmentCard:** Displays assignment information in card format.
- **AssignmentForm:** Handles creating and editing assignments.
- **AssignmentTable:** Displays assignments in a structured table.
- **SubmissionModal:** Provides confirmation before submitting assignments.

### 6. Common Components

- **Button:** Reusable button component.
- **ProgressBar:** Displays assignment completion progress.
- **StatusBadge:** Shows assignment status using visual badges.

## Key Design Decisions

### Component-Based Architecture

The application is divided into smaller reusable components to improve maintainability, readability, and scalability.

### Context API for State Management

React Context API is used to share authentication and assignment data across components without unnecessary prop drilling.

### Role-Based Rendering

The dashboard interface changes based on the authenticated user's role. Admins can manage assignments, while students can view and submit their assignments.

### LocalStorage Persistence

LocalStorage is used to preserve assignment data and user-related application state across browser refreshes without requiring a backend.

### Reusable UI Components

Common elements such as buttons, status badges, and progress bars are reused throughout the application to maintain consistent UI behavior.

### Responsive Design

Tailwind CSS responsive utilities are used to create layouts that adapt to different screen sizes.

### Dark Mode

A shared dark mode state is used to provide consistent theme switching across the dashboard.

##

##
>>>>>>> f6fdb91 (Add project documentation)
