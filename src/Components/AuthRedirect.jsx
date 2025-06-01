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
        // Wait for the session to be detected from URL
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          setChecking(false);
          return;
        }

        if (session) {
          console.log("✅ Found session:", session);
          // navigate("/#/MonthlyCalendar", { replace: true });
          navigate("/MonthlyCalendar", { replace: true });
          return;
        }

        // If no session found, check URL for tokens
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (accessToken && refreshToken) {
          console.log("🔑 Found tokens in URL");
          
          // Try to set the session
          const { data: { session: newSession }, error: setSessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });

          if (setSessionError) {
            console.error("Error setting session:", setSessionError);
            setChecking(false);
            return;
          }

          if (newSession) {
            console.log("✅ Session set successfully");
            navigate("/#/MonthlyCalendar", { replace: true });
            return;
          }
        }

        console.log("❌ No valid session found");
        setChecking(false);
      } catch (error) {
        console.error("❌ Unexpected error:", error);
        setChecking(false);
      }
    };

    // Initial auth check
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
