
import DashboardLayout from "@/components/layout/DashboardLayout";

const AdminCourses = () => {
  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Courses</h1>
        <p className="text-gray-600">
          Manage school courses
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">Course management tools will be displayed here.</p>
      </div>
    </DashboardLayout>
  );
};

export default AdminCourses;
