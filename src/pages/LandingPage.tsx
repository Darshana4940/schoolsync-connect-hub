
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const LandingPage = () => {
  const { user, userRole } = useAuth();

  // Determine dashboard URL based on user role
  const getDashboardUrl = () => {
    if (userRole === "student") return "/student/dashboard";
    if (userRole === "teacher") return "/teacher/dashboard";
    if (userRole === "admin") return "/admin/dashboard";
    return "/login";
  };

  return (
    <div className="min-h-screen bg-school-bg">
      {/* Header/Navbar */}
      <header className="bg-school-green shadow-md">
        <div className="container mx-auto py-6 px-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg 
              className="h-8 w-8 mr-2 text-white" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v7" />
            </svg>
            <h1 className="text-xl md:text-2xl font-bold text-white">SchoolSync</h1>
          </div>
          <div>
            {user ? (
              <Link to={getDashboardUrl()}>
                <Button className="bg-white text-school-green hover:bg-gray-100">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <div className="flex gap-4">
                <Link to="/login">
                  <Button variant="outline" className="bg-white text-school-green border-school-green hover:bg-school-green hover:text-white">
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-white text-school-green hover:bg-gray-100">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to SchoolSync</h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            The complete school management system for students, teachers, and administrators
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link to="/register">
                <Button className="bg-school-green hover:bg-opacity-90 text-white text-lg px-8 py-6">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-school-green text-school-green hover:bg-school-green hover:text-white text-lg px-8 py-6">
                  Log in
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-school-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose SchoolSync?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-school-bg p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-school-green rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Comprehensive Learning</h3>
              <p className="text-gray-600 text-center">
                Access course materials, assignments, and grades all in one place.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-school-bg p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-school-green rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Role-Based Access</h3>
              <p className="text-gray-600 text-center">
                Tailored dashboards for students, teachers, and administrators.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-school-bg p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-school-green rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Efficient Management</h3>
              <p className="text-gray-600 text-center">
                Streamline attendance, grades, schedules, and communications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Role</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student */}
            <div className="bg-school-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl font-bold text-school-green text-center mb-4">👨‍🎓</div>
              <h3 className="text-xl font-semibold text-center mb-4">Student</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-school-green mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  View your grades and attendance
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-school-green mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Access course materials
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-school-green mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Submit assignments
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-school-green mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Track your schedule
                </li>
              </ul>
              <div className="text-center">
                <Link to="/register?role=student">
                  <Button className="bg-school-green hover:bg-opacity-90 text-white">
                    Register as Student
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Teacher */}
            <div className="bg-school-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl font-bold text-school-green text-center mb-4">👩‍🏫</div>
              <h3 className="text-xl font-semibold text-center mb-4">Teacher</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-school-green mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Manage classes and courses
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-school-green mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Record grades and attendance
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-school-green mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Create assignments
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-school-green mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Communicate with students
                </li>
              </ul>
              <div className="text-center">
                <Link to="/register?role=teacher">
                  <Button className="bg-school-green hover:bg-opacity-90 text-white">
                    Register as Teacher
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Admin */}
            <div className="bg-school-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl font-bold text-school-green text-center mb-4">👨‍💼</div>
              <h3 className="text-xl font-semibold text-center mb-4">Administrator</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-school-green mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Manage all users
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-school-green mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Configure system settings
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-school-green mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Generate reports
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-school-green mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Manage school resources
                </li>
              </ul>
              <div className="text-center">
                <Link to="/register?role=admin">
                  <Button className="bg-school-green hover:bg-opacity-90 text-white">
                    Register as Admin
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-school-green py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <svg 
                className="h-8 w-8 mr-2" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v7" />
              </svg>
              <h2 className="text-xl font-bold">SchoolSync</h2>
            </div>
            <div>© 2025 SchoolSync. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
