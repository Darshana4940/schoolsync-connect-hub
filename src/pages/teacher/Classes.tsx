
import DashboardLayout from "@/components/layout/DashboardLayout";

const TeacherClasses = () => {
  return (
    <DashboardLayout role="teacher">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Classes</h1>
        <p className="text-gray-600">
          Manage your classes and students
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">Your classes will be displayed here.</p>
      </div>
    </DashboardLayout>
  );
};

export default TeacherClasses;
