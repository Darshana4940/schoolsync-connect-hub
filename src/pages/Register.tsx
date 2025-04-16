
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") || "student";
  
  const [activeTab, setActiveTab] = useState<string>(initialRole);
  const [isLoading, setIsLoading] = useState(false);

  // Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");

  // Student fields
  const [gradeLevel, setGradeLevel] = useState("");
  const [classroom, setClassroom] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianContact, setGuardianContact] = useState("");

  // Teacher fields
  const [department, setDepartment] = useState("");
  const [subjects, setSubjects] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");

  // Admin fields
  const [position, setPosition] = useState("");
  const [accessLevel, setAccessLevel] = useState("moderator");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      // Common validation
      if (password !== confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      }
      
      const commonData = {
        full_name: fullName,
        phone_number: phoneNumber,
        date_of_birth: dateOfBirth,
        gender,
      };
      
      let userData;
      
      // Role-specific data
      if (activeTab === "student") {
        userData = {
          ...commonData,
          role: "student",
          grade_level: gradeLevel,
          classroom,
          guardian_name: guardianName,
          guardian_contact: guardianContact,
        };
      } else if (activeTab === "teacher") {
        userData = {
          ...commonData,
          role: "teacher",
          department,
          subjects_taught: subjects,
          qualifications,
          years_of_experience: experience,
        };
      } else if (activeTab === "admin") {
        userData = {
          ...commonData,
          role: "admin",
          position,
          access_level: accessLevel,
        };
      }
      
      await signUp(email, password, userData);
      
      // Redirect based on role
      if (activeTab === "student") {
        navigate("/student/dashboard");
      } else if (activeTab === "teacher") {
        navigate("/teacher/dashboard");
      } else if (activeTab === "admin") {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Registration error:", error);
      // Error handling is done in the AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-school-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center">
            <svg 
              className="h-8 w-8 mr-2 text-school-green" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v7" />
            </svg>
            <span className="text-2xl font-bold text-school-green">SchoolSync</span>
          </Link>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card className="bg-school-white border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
              <CardDescription className="text-center">
                Join SchoolSync to manage your school experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="student" className="data-[state=active]:bg-school-green data-[state=active]:text-white">Student</TabsTrigger>
                  <TabsTrigger value="teacher" className="data-[state=active]:bg-school-green data-[state=active]:text-white">Teacher</TabsTrigger>
                  <TabsTrigger value="admin" className="data-[state=active]:bg-school-green data-[state=active]:text-white">Admin</TabsTrigger>
                </TabsList>
                
                <form onSubmit={handleRegister}>
                  {/* Common Fields for All Roles */}
                  <div className="space-y-4 mb-6">
                    <h3 className="font-medium text-lg">Account Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="form-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          placeholder="John Doe"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="form-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="form-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="form-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          placeholder="(123) 456-7890"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="form-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          required
                          className="form-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={gender} onValueChange={setGender}>
                          <SelectTrigger className="form-input">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  {/* Student-Specific Fields */}
                  <TabsContent value="student">
                    <div className="space-y-4 mb-6">
                      <h3 className="font-medium text-lg">Student Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="gradeLevel">Grade Level</Label>
                          <Select value={gradeLevel} onValueChange={setGradeLevel}>
                            <SelectTrigger className="form-input">
                              <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                            <SelectContent>
                              {[...Array(12)].map((_, i) => (
                                <SelectItem key={i} value={`Grade ${i+1}`}>Grade {i+1}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="classroom">Classroom</Label>
                          <Input
                            id="classroom"
                            placeholder="e.g., 10A"
                            value={classroom}
                            onChange={(e) => setClassroom(e.target.value)}
                            required
                            className="form-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="guardianName">Guardian Name</Label>
                          <Input
                            id="guardianName"
                            placeholder="Parent/Guardian name"
                            value={guardianName}
                            onChange={(e) => setGuardianName(e.target.value)}
                            required
                            className="form-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="guardianContact">Guardian Contact</Label>
                          <Input
                            id="guardianContact"
                            placeholder="Parent/Guardian phone"
                            value={guardianContact}
                            onChange={(e) => setGuardianContact(e.target.value)}
                            required
                            className="form-input"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Teacher-Specific Fields */}
                  <TabsContent value="teacher">
                    <div className="space-y-4 mb-6">
                      <h3 className="font-medium text-lg">Teacher Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Select value={department} onValueChange={setDepartment}>
                            <SelectTrigger className="form-input">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mathematics">Mathematics</SelectItem>
                              <SelectItem value="science">Science</SelectItem>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="history">History</SelectItem>
                              <SelectItem value="arts">Arts</SelectItem>
                              <SelectItem value="physical_education">Physical Education</SelectItem>
                              <SelectItem value="technology">Technology</SelectItem>
                              <SelectItem value="languages">Languages</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subjects">Subjects Taught</Label>
                          <Input
                            id="subjects"
                            placeholder="e.g., Algebra, Calculus"
                            value={subjects}
                            onChange={(e) => setSubjects(e.target.value)}
                            required
                            className="form-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="qualifications">Qualifications</Label>
                          <Input
                            id="qualifications"
                            placeholder="e.g., M.Ed. in Mathematics"
                            value={qualifications}
                            onChange={(e) => setQualifications(e.target.value)}
                            required
                            className="form-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="experience">Years of Experience</Label>
                          <Input
                            id="experience"
                            type="number"
                            min="0"
                            placeholder="e.g., 5"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            required
                            className="form-input"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Admin-Specific Fields */}
                  <TabsContent value="admin">
                    <div className="space-y-4 mb-6">
                      <h3 className="font-medium text-lg">Administrator Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="position">Position</Label>
                          <Select value={position} onValueChange={setPosition}>
                            <SelectTrigger className="form-input">
                              <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="principal">Principal</SelectItem>
                              <SelectItem value="vice_principal">Vice Principal</SelectItem>
                              <SelectItem value="department_head">Department Head</SelectItem>
                              <SelectItem value="counselor">Counselor</SelectItem>
                              <SelectItem value="registrar">Registrar</SelectItem>
                              <SelectItem value="it_admin">IT Administrator</SelectItem>
                              <SelectItem value="financial_admin">Financial Administrator</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accessLevel">Access Level</Label>
                          <Select value={accessLevel} onValueChange={setAccessLevel}>
                            <SelectTrigger className="form-input">
                              <SelectValue placeholder="Select access level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="super_admin">Super Admin</SelectItem>
                              <SelectItem value="moderator">Moderator</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-school-green hover:bg-opacity-90 text-white mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-school-green hover:underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
          
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-600 hover:text-school-green">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
