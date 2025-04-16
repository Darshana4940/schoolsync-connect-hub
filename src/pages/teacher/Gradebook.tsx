
import DashboardLayout from "@/components/layout/DashboardLayout";

const TeacherGradebook = () => {
  return (
    <DashboardLayout role="teacher">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gradebook</h1>
        <p className="text-gray-600">
          Manage student grades and assessments
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">Your gradebook will be displayed here.</p>
      </div>
    </DashboardLayout>
  );
};

export default TeacherGradebook;
