
import DashboardLayout from "@/components/layout/DashboardLayout";

const StudentAttendance = () => {
  return (
    <DashboardLayout role="student">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Attendance</h1>
        <p className="text-gray-600">
          Track your attendance records
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">Your attendance records will be displayed here.</p>
      </div>
    </DashboardLayout>
  );
};

export default StudentAttendance;
