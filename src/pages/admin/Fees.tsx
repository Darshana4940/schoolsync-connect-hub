
import DashboardLayout from "@/components/layout/DashboardLayout";

const AdminFees = () => {
  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Fee Management</h1>
        <p className="text-gray-600">
          Manage student fees and payments
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">Fee management tools will be displayed here.</p>
      </div>
    </DashboardLayout>
  );
};

export default AdminFees;
