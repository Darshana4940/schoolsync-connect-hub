
import DashboardLayout from "@/components/layout/DashboardLayout";

const TeacherAssignments = () => {
  return (
    <DashboardLayout role="teacher">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Assignments</h1>
        <p className="text-gray-600">
          Create and manage assignments
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">Your assignments will be displayed here.</p>
      </div>
    </DashboardLayout>
  );
};

export default TeacherAssignments;
