
import DashboardLayout from "@/components/layout/DashboardLayout";

const StudentAssignments = () => {
  return (
    <DashboardLayout role="student">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Assignments</h1>
        <p className="text-gray-600">
          Manage your assignments and submissions
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">Your assignments will be displayed here.</p>
      </div>
    </DashboardLayout>
  );
};

export default StudentAssignments;
