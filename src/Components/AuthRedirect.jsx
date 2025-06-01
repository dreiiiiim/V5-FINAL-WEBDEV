// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "./client";

// const AuthRedirect = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("🔁 AuthRedirect mounted");

//     // 1. Check session directly on load
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       console.log("👀 Initial session check:", session);
//       if (session) {
//         navigate("/MonthlyCalendar", { replace: true });
//       }
//     });

//     // 2. Listen for sign-in events as backup
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((event, session) => {
//       console.log("📡 Auth state change:", event, session);
//       if (event === "SIGNED_IN" && session) {
//         navigate("/MonthlyCalendar", { replace: true });
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [navigate]);

//   return (
//     <div className="text-center mt-10 text-xl">
//       Redirecting to your calendar...
//     </div>
//   );
// };

// export default AuthRedirect;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./client";

const AuthRedirect = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    console.log("🔁 AuthRedirect mounted");

    const handleAuth = async () => {
      try {
        // Get the hash parameters from the URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (accessToken) {
          // Set the session manually if we have tokens
          const { data: { session }, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });

          if (error) throw error;
          if (session) {
            console.log("✅ Session set successfully:", session);
            navigate("/#/MonthlyCalendar", { replace: true });
            return;
          }
        }

        // Fallback to normal session check
        const { data: { session } } = await supabase.auth.getSession();
        console.log("👀 Session check:", session);
        
        if (session) {
          navigate("/#/MonthlyCalendar", { replace: true });
        } else {
          setChecking(false);
        }
      } catch (error) {
        console.error("❌ Auth error:", error);
        setChecking(false);
      }
    };

    handleAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("📡 Auth state change:", event, session);
      if (event === "SIGNED_IN" && session) {
        navigate("/#/MonthlyCalendar", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="text-center mt-10 text-xl text-gray-700">
      {checking ? "Redirecting to your calendar..." : "No session found. Please sign in again."}
    </div>
  );
};

export default AuthRedirect;
