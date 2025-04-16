
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  allowedRole: string;
}

const ProtectedRoute = ({ allowedRole }: ProtectedRouteProps) => {
  const { user, userRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-school-green"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (userRole !== allowedRole) {
    // Redirect to appropriate dashboard
    if (userRole === "student") {
      return <Navigate to="/student/dashboard" />;
    } else if (userRole === "teacher") {
      return <Navigate to="/teacher/dashboard" />;
    } else if (userRole === "admin") {
      return <Navigate to="/admin/dashboard" />;
    }
    
    // If no valid role, redirect to login
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
