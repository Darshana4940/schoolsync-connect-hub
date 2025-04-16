
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const TeacherDashboard = () => {
  const { user, userDetails, supabase } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    todayClasses: [],
    pendingTasks: [],
    studentAlerts: [],
    recentAnnouncements: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // This would normally be a real data fetch
        // For now, let's simulate some example data
        setTimeout(() => {
          setDashboardData({
            todayClasses: [
              { id: 1, name: "Mathematics 101", grade: "Grade 10", time: "09:00 AM", room: "101", students: 30 },
              { id: 2, name: "Advanced Algebra", grade: "Grade 11", time: "11:00 AM", room: "203", students: 25 },
              { id: 3, name: "Mathematics 101", grade: "Grade 9", time: "01:00 PM", room: "105", students: 32 }
            ],
            pendingTasks: [
              { id: 1, type: "Grading", description: "Grade Math Quiz for Class 10A", due: "Apr 19, 2025" },
              { id: 2, type: "Attendance", description: "Mark attendance for Class 11B", due: "Today" },
              { id: 3, type: "Assignment", description: "Review homework submissions", due: "Apr 20, 2025" }
            ],
            studentAlerts: [
              { id: 1, name: "John Doe", issue: "Low attendance (75%)", class: "Grade 10A" },
              { id: 2, name: "Jane Smith", issue: "Assignment overdue", class: "Grade 11B" },
              { id: 3, name: "Alex Johnson", issue: "Failed recent quiz", class: "Grade 9C" }
            ],
            recentAnnouncements: [
              { id: 1, title: "Faculty Meeting", date: "Apr 20, 2025", content: "Mandatory faculty meeting at 3:00 PM in the conference room." },
              { id: 2, title: "Exam Schedule Released", date: "Apr 18, 2025", content: "Final exam schedule is now available in the academic calendar." }
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
    <DashboardLayout role="teacher">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Teacher Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {userDetails?.full_name || "Teacher"}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg h-64"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                Your teaching schedule for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.todayClasses.map(classItem => (
                  <div key={classItem.id} className="flex items-start border-b border-gray-100 pb-2 last:border-0">
                    <div className="bg-school-green-light p-2 rounded-md mr-3">
                      <svg className="h-5 w-5 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{classItem.name}</p>
                      <p className="text-sm text-gray-500">{classItem.grade} • {classItem.time}</p>
                      <p className="text-sm text-gray-500">Room {classItem.room} • {classItem.students} students</p>
                    </div>
                  </div>
                ))}
                {dashboardData.todayClasses.length === 0 && (
                  <p className="text-gray-500 text-center italic">No classes scheduled for today</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Pending Tasks
              </CardTitle>
              <CardDescription>
                Tasks requiring your attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.pendingTasks.map(task => (
                  <div key={task.id} className="flex items-start border-b border-gray-100 pb-2 last:border-0">
                    <div className="bg-school-green-light p-2 rounded-md mr-3">
                      <svg className="h-5 w-5 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{task.type}</p>
                      <p className="text-sm">{task.description}</p>
                      <p className="text-sm text-gray-500">Due: {task.due}</p>
                    </div>
                  </div>
                ))}
                {dashboardData.pendingTasks.length === 0 && (
                  <p className="text-gray-500 text-center italic">No pending tasks</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Student Alerts */}
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Student Alerts
              </CardTitle>
              <CardDescription>
                Students who need attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.studentAlerts.map(alert => (
                  <div key={alert.id} className="flex items-start border-b border-gray-100 pb-2 last:border-0">
                    <div className="bg-school-green-light p-2 rounded-md mr-3">
                      <svg className="h-5 w-5 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{alert.name}</p>
                      <p className="text-sm text-red-500">{alert.issue}</p>
                      <p className="text-sm text-gray-500">{alert.class}</p>
                    </div>
                  </div>
                ))}
                {dashboardData.studentAlerts.length === 0 && (
                  <p className="text-gray-500 text-center italic">No student alerts</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Announcements */}
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-school-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
                Recent Announcements
              </CardTitle>
              <CardDescription>
                Latest school notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentAnnouncements.map(announcement => (
                  <div key={announcement.id} className="border-b border-gray-100 pb-2 last:border-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium">{announcement.title}</p>
                      <p className="text-xs text-gray-500">{announcement.date}</p>
                    </div>
                    <p className="text-sm text-gray-600">{announcement.content}</p>
                  </div>
                ))}
                {dashboardData.recentAnnouncements.length === 0 && (
                  <p className="text-gray-500 text-center italic">No recent announcements</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TeacherDashboard;
