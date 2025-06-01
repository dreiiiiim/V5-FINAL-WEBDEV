import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./client";

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔁 AuthRedirect mounted");

    // 1. Check session directly on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("👀 Initial session check:", session);
      if (session) {
        navigate("/MonthlyCalendar", { replace: true });
      }
    });

    // 2. Listen for sign-in events as backup
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("📡 Auth state change:", event, session);
      if (event === "SIGNED_IN" && session) {
        navigate("/MonthlyCalendar", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="text-center mt-10 text-xl">
      Redirecting to your calendar...
    </div>
  );
};

export default AuthRedirect;
