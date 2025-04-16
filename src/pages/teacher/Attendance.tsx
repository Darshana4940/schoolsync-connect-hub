
import DashboardLayout from "@/components/layout/DashboardLayout";

const TeacherAttendance = () => {
  return (
    <DashboardLayout role="teacher">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Attendance</h1>
        <p className="text-gray-600">
          Record and manage student attendance
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">Attendance tools will be displayed here.</p>
      </div>
    </DashboardLayout>
  );
};

export default TeacherAttendance;
