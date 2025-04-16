
import DashboardLayout from "@/components/layout/DashboardLayout";

const AdminReports = () => {
  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">
          Generate and view school reports
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">Reporting tools will be displayed here.</p>
      </div>
    </DashboardLayout>
  );
};

export default AdminReports;
