
import DashboardLayout from "@/components/layout/DashboardLayout";

const StudentSchedule = () => {
  return (
    <DashboardLayout role="student">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Schedule</h1>
        <p className="text-gray-600">
          View your weekly class schedule
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">Your class schedule will be displayed here.</p>
      </div>
    </DashboardLayout>
  );
};

export default StudentSchedule;
