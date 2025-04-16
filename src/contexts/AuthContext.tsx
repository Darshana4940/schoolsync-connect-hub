
import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient, SupabaseClient, User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

// Define the types
type AuthContextType = {
  user: User | null;
  userRole: string | null;
  userDetails: any | null;
  isLoading: boolean;
  supabase: SupabaseClient;
  signUp: (email: string, password: string, userData: any) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize Supabase client
  const supabase = createClient(
    "https://rqamuzijvmdkpdbfyzjn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxYW11emlqdm1ka3BkYmZ5empuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI3NDk2ODIsImV4cCI6MjAyODMyNTY4Mn0.wCc6CmMjLljYIfWeAJSlrsOPSWqXo2JfSu3X4VhTXNo"
  );

  // Function to fetch user role and details
  const fetchUserDetails = async (userId: string) => {
    try {
      // First try to find in students
      let { data: studentData, error: studentError } = await supabase
        .from("students")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (studentData) {
        setUserRole("student");
        setUserDetails(studentData);
        return;
      }

      // Try to find in teachers
      let { data: teacherData, error: teacherError } = await supabase
        .from("teachers")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (teacherData) {
        setUserRole("teacher");
        setUserDetails(teacherData);
        return;
      }

      // Try to find in admins
      let { data: adminData, error: adminError } = await supabase
        .from("admins")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (adminData) {
        setUserRole("admin");
        setUserDetails(adminData);
        return;
      }

      // If no role is found
      setUserRole(null);
      setUserDetails(null);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUserRole(null);
      setUserDetails(null);
    }
  };

  // Check for user session on initial load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          await fetchUserDetails(session.user.id);
        } else {
          setUser(null);
          setUserRole(null);
          setUserDetails(null);
        }
      } catch (error) {
        console.error("Session check error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Set up auth listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setUser(session.user);
          await fetchUserDetails(session.user.id);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setUserRole(null);
          setUserDetails(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Sign up function
  const signUp = async (email: string, password: string, userData: any) => {
    try {
      setIsLoading(true);
      
      // Register the user in auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      if (data.user) {
        // Insert the user data based on role
        const userId = data.user.id;
        const { role, ...profileData } = userData;

        let insertResult;
        
        if (role === "student") {
          insertResult = await supabase
            .from("students")
            .insert([{ ...profileData, user_id: userId }]);
        } else if (role === "teacher") {
          insertResult = await supabase
            .from("teachers")
            .insert([{ ...profileData, user_id: userId }]);
        } else if (role === "admin") {
          insertResult = await supabase
            .from("admins")
            .insert([{ ...profileData, user_id: userId }]);
        }
        
        if (insertResult?.error) {
          // If profile insertion fails, delete the auth user
          await supabase.auth.admin.deleteUser(userId);
          throw insertResult.error;
        }
        
        await fetchUserDetails(userId);
        
        toast({
          title: "Account created successfully",
          description: "Welcome to SchoolSync!",
        });
        
        return { user: data.user, role };
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast({
        title: "Sign up failed",
        description: error.message || "An error occurred during signup",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        await fetchUserDetails(data.user.id);
        
        toast({
          title: "Sign in successful",
          description: "Welcome back to SchoolSync!",
        });
        
        return { user: data.user, role: userRole };
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast({
        title: "Sign in failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast({
        title: "Signed out successfully",
      });
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast({
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    userRole,
    userDetails,
    isLoading,
    supabase,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
