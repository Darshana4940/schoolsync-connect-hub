
import DashboardLayout from "@/components/layout/DashboardLayout";

const StudentAnnouncements = () => {
  return (
    <DashboardLayout role="student">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Announcements</h1>
        <p className="text-gray-600">
          Stay updated with school announcements
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">School announcements will be displayed here.</p>
      </div>
    </DashboardLayout>
  );
};

export default StudentAnnouncements;
