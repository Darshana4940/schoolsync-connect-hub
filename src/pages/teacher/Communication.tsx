
import DashboardLayout from "@/components/layout/DashboardLayout";

const TeacherCommunication = () => {
  return (
    <DashboardLayout role="teacher">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Communication</h1>
        <p className="text-gray-600">
          Communicate with students and parents
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">Communication tools will be displayed here.</p>
      </div>
    </DashboardLayout>
  );
};

export default TeacherCommunication;
