
import DashboardLayout from "@/components/layout/DashboardLayout";

const AdminSettings = () => {
  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">System Settings</h1>
        <p className="text-gray-600">
          Configure SchoolSync settings
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">System setting controls will be displayed here.</p>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
