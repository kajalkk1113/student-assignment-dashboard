
import { useContext } from "react";

import { AuthContext, AuthProvider } from "./components/context/AuthContext";
import { AssignmentProvider } from "./components/context/AssignmentContext";

import Login from "./components/pages/Login";
import AdminDashboard from "./components/pages/AdminDashboard";
import StudentDashboard from "./components/pages/StudentDasboard";

function AppContent() {
  const { user, login, logout } = useContext(AuthContext);

  if (!user) {
    return <Login onLogin={login} />;
  }

  if (user.role === "admin") {
    return <AdminDashboard user={user} onLogout={logout} />;
  }

  return <StudentDashboard user={user} onLogout={logout} />;
}

function App() {
  return (
    <AuthProvider>
      <AssignmentProvider>
        <AppContent />
      </AssignmentProvider>
    </AuthProvider>
  );
}

export default App;
