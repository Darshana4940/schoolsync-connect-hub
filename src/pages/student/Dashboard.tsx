
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const StudentDashboard = () => {
  const { user, userDetails, supabase } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    upcomingAssignments: [],
    recentGrades: [],
    attendance: { present: 0, absent: 0, total: 0 },
    todaysClasses: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // This would normally be a real data fetch
        // For now, let's simulate some example data
        setTimeout(() => {
          setDashboardData({
            upcomingAssignments: [
              { id: 1, title: "Math Assignment", due: "Apr 20, 2025", course: "Mathematics" },
              { id: 2, title: "Science Report", due: "Apr 22, 2025", course: "Biology" },
              { id: 3, title: "History Essay", due: "Apr 25, 2025", course: "World History" }
            ],
            recentGrades: [
              { id: 1, title: "Math Quiz", grade: "85/100", course: "Mathematics" },
              { id: 2, title: "English Essay", grade: "92/100", course: "English Literature" }
            ],
            attendance: { present: 42, absent: 3, total: 45, percentage: 93.3 },
            todaysClasses: [
              { id: 1, name: "Mathematics", time: "09:00 AM", room: "101", teacher: "Ms. Johnson" },
              { id: 2, name: "Physics", time: "11:00 AM", room: "203", teacher: "Mr. Thompson" },
              { id: 3, name: "English", time: "01:00 PM", room: "105", teacher: "Mrs. Davis" }
            ]
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
    <DashboardLayout role="student">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {userDetails?.full_name || "Student"}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg h-64"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Today's Classes */}
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Today's Classes
              </CardTitle>
              <CardDescription>
                Your schedule for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.todaysClasses.map(classItem => (
                  <div key={classItem.id} className="flex items-start border-b border-gray-100 pb-2 last:border-0">
                    <div className="bg-school-green-light p-2 rounded-md mr-3">
                      <svg className="h-5 w-5 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{classItem.name}</p>
                      <p className="text-sm text-gray-500">{classItem.time} • Room {classItem.room}</p>
                      <p className="text-sm text-gray-500">{classItem.teacher}</p>
                    </div>
                  </div>
                ))}
                {dashboardData.todaysClasses.length === 0 && (
                  <p className="text-gray-500 text-center italic">No classes scheduled for today</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Assignments */}
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Upcoming Assignments
              </CardTitle>
              <CardDescription>
                Assignments due soon
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.upcomingAssignments.map(assignment => (
                  <div key={assignment.id} className="flex items-start border-b border-gray-100 pb-2 last:border-0">
                    <div className="bg-school-green-light p-2 rounded-md mr-3">
                      <svg className="h-5 w-5 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{assignment.title}</p>
                      <p className="text-sm text-gray-500">{assignment.course}</p>
                      <p className="text-sm text-gray-500">Due: {assignment.due}</p>
                    </div>
                  </div>
                ))}
                {dashboardData.upcomingAssignments.length === 0 && (
                  <p className="text-gray-500 text-center italic">No upcoming assignments</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Grades */}
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Recent Grades
              </CardTitle>
              <CardDescription>
                Your latest academic results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentGrades.map(grade => (
                  <div key={grade.id} className="flex items-start border-b border-gray-100 pb-2 last:border-0">
                    <div className="bg-school-green-light p-2 rounded-md mr-3">
                      <svg className="h-5 w-5 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{grade.title}</p>
                      <p className="text-sm text-gray-500">{grade.course}</p>
                      <p className="text-sm font-semibold text-school-green">{grade.grade}</p>
                    </div>
                  </div>
                ))}
                {dashboardData.recentGrades.length === 0 && (
                  <p className="text-gray-500 text-center italic">No recent grades</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Attendance Summary */}
          <Card className="dashboard-card col-span-1 md:col-span-2 lg:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Attendance Summary
              </CardTitle>
              <CardDescription>
                Your attendance record this semester
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-around py-4">
                <div className="flex flex-col items-center mb-4 md:mb-0">
                  <div className="text-4xl font-bold text-school-green">
                    {dashboardData.attendance.percentage}%
                  </div>
                  <div className="text-sm text-gray-500">Attendance Rate</div>
                </div>
                
                <div className="flex gap-8">
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold">{dashboardData.attendance.present}</div>
                    <div className="text-sm text-gray-500">Days Present</div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold">{dashboardData.attendance.absent}</div>
                    <div className="text-sm text-gray-500">Days Absent</div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold">{dashboardData.attendance.total}</div>
                    <div className="text-sm text-gray-500">Total Days</div>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                <div 
                  className="bg-school-green h-2.5 rounded-full" 
                  style={{ width: `${dashboardData.attendance.percentage}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
};

export default StudentDashboard;
