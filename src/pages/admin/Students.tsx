
import DashboardLayout from "@/components/layout/DashboardLayout";

const AdminStudents = () => {
  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Students</h1>
        <p className="text-gray-600">
          Manage student records
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">Student management tools will be displayed here.</p>
      </div>
    </DashboardLayout>
  );
};

export default AdminStudents;
