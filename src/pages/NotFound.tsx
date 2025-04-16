
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const NotFound = () => {
  const location = useLocation();
  const { userRole } = useAuth();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Determine where to redirect the user based on their role
  const getHomeRoute = () => {
    if (userRole === "student") return "/student/dashboard";
    if (userRole === "teacher") return "/teacher/dashboard";
    if (userRole === "admin") return "/admin/dashboard";
    return "/";
  };

  const homeRoute = getHomeRoute();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-school-bg p-4">
      <div className="text-center">
        <div className="mb-8">
          <svg 
            className="h-20 w-20 mx-auto text-school-green" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to={homeRoute}>
          <Button className="bg-school-green text-white hover:bg-opacity-90">
            Return to {userRole ? "Dashboard" : "Home"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
