
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { user, userDetails, supabase } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    metrics: {
      students: 0,
      teachers: 0,
      courses: 0,
      activeClasses: 0
    },
    alerts: [],
    recentActivity: [],
    quickStats: {}
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // This would normally be a real data fetch
        // For now, let's simulate some example data
        setTimeout(() => {
          setDashboardData({
            metrics: {
              students: 1245,
              teachers: 87,
              courses: 42,
              activeClasses: 156
            },
            alerts: [
              { id: 1, type: "Staff", message: "5 teachers absent today" },
              { id: 2, type: "System", message: "Software update scheduled for tonight" },
              { id: 3, type: "Students", message: "10 new student registrations pending approval" },
              { id: 4, type: "Finance", message: "Monthly budget report is due" }
            ],
            recentActivity: [
              { id: 1, type: "User", action: "New student added: Jane Doe", time: "10 minutes ago" },
              { id: 2, type: "Course", action: "Course schedule updated: Mathematics 101", time: "1 hour ago" },
              { id: 3, type: "Admin", action: "System settings updated", time: "3 hours ago" },
              { id: 4, type: "Staff", action: "New teacher hired: Mr. Johnson", time: "Yesterday" }
            ],
            quickStats: {
              attendance: "95% this week",
              fees: "$24,500 collected this month",
              grades: "Mid-term results published",
              events: "2 upcoming school events"
            }
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast({
          title: "Error",
          description: "Could not load dashboard data",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {userDetails?.full_name || "Administrator"}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg h-32"></div>
          ))}
          <div className="bg-white rounded-lg h-64 col-span-1 md:col-span-2"></div>
          <div className="bg-white rounded-lg h-64 col-span-1 md:col-span-2"></div>
        </div>
      ) : (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card className="dashboard-card">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="bg-school-green-light p-4 rounded-full mr-4">
                    <svg className="h-6 w-6 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Students</p>
                    <p className="text-3xl font-bold">{dashboardData.metrics.students}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="bg-school-green-light p-4 rounded-full mr-4">
                    <svg className="h-6 w-6 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Teachers</p>
                    <p className="text-3xl font-bold">{dashboardData.metrics.teachers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="bg-school-green-light p-4 rounded-full mr-4">
                    <svg className="h-6 w-6 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Courses</p>
                    <p className="text-3xl font-bold">{dashboardData.metrics.courses}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="bg-school-green-light p-4 rounded-full mr-4">
                    <svg className="h-6 w-6 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active Classes</p>
                    <p className="text-3xl font-bold">{dashboardData.metrics.activeClasses}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Alerts */}
            <Card className="dashboard-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Alerts
                </CardTitle>
                <CardDescription>
                  Issues requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.alerts.map(alert => (
                    <div key={alert.id} className="flex items-start border-b border-gray-100 pb-2 last:border-0">
                      <div className="bg-school-green-light p-2 rounded-md mr-3">
                        <svg className="h-5 w-5 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">{alert.type}</p>
                        <p className="text-sm">{alert.message}</p>
                      </div>
                    </div>
                  ))}
                  {dashboardData.alerts.length === 0 && (
                    <p className="text-gray-500 text-center italic">No alerts</p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Activity */}
            <Card className="dashboard-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest system changes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentActivity.map(activity => (
                    <div key={activity.id} className="border-b border-gray-100 pb-2 last:border-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium">{activity.type}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <p className="text-sm">{activity.action}</p>
                    </div>
                  ))}
                  {dashboardData.recentActivity.length === 0 && (
                    <p className="text-gray-500 text-center italic">No recent activity</p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Stats */}
            <Card className="dashboard-card md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                  Quick Stats
                </CardTitle>
                <CardDescription>
                  Key performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-school-green bg-opacity-10 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <svg className="h-5 w-5 mr-2 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="font-medium">Attendance</h3>
                    </div>
                    <p className="text-lg font-bold">{dashboardData.quickStats.attendance}</p>
                  </div>
                  
                  <div className="bg-school-green bg-opacity-10 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <svg className="h-5 w-5 mr-2 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="font-medium">Fees</h3>
                    </div>
                    <p className="text-lg font-bold">{dashboardData.quickStats.fees}</p>
                  </div>
                  
                  <div className="bg-school-green bg-opacity-10 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <svg className="h-5 w-5 mr-2 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                      <h3 className="font-medium">Grades</h3>
                    </div>
                    <p className="text-lg font-bold">{dashboardData.quickStats.grades}</p>
                  </div>
                  
                  <div className="bg-school-green bg-opacity-10 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <svg className="h-5 w-5 mr-2 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <h3 className="font-medium">Events</h3>
                    </div>
                    <p className="text-lg font-bold">{dashboardData.quickStats.events}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
