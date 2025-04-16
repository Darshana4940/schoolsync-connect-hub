
import DashboardLayout from "@/components/layout/DashboardLayout";

const AdminTeachers = () => {
  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Teachers</h1>
        <p className="text-gray-600">
          Manage teacher records
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">Teacher management tools will be displayed here.</p>
      </div>
    </DashboardLayout>
  );
};

export default AdminTeachers;
