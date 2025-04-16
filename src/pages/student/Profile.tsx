
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";

const StudentProfile = () => {
  const { userDetails } = useAuth();
  
  return (
    <DashboardLayout role="student">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-gray-600">
          View and manage your profile information
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-32 h-32 rounded-full bg-school-green text-white flex items-center justify-center text-4xl font-semibold">
            {userDetails?.full_name ? userDetails.full_name.charAt(0) : "S"}
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4">{userDetails?.full_name || "Student Name"}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <p className="text-sm text-gray-500">Student ID</p>
                <p>{userDetails?.student_id || "N/A"}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Grade Level</p>
                <p>{userDetails?.grade_level || "N/A"}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Classroom</p>
                <p>{userDetails?.classroom || "N/A"}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p>{userDetails?.date_of_birth || "N/A"}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="capitalize">{userDetails?.gender || "N/A"}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p>{userDetails?.phone_number || "N/A"}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Guardian's Name</p>
                <p>{userDetails?.guardian_name || "N/A"}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Guardian's Contact</p>
                <p>{userDetails?.guardian_contact || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;
