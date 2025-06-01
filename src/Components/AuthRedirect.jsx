// // import { useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { supabase } from "./client";

// // const AuthRedirect = () => {
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const {
// //       data: { subscription },
// //     } = supabase.auth.onAuthStateChange((event, session) => {
// //       if (event === "SIGNED_IN" && session) {
// //         navigate("/MonthlyCalendar"); // adjust if needed
// //       }
// //     });

// //     return () => subscription.unsubscribe();
// //   }, [navigate]);

// //   return null;
// // };

// // export default AuthRedirect;


// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "./client";

// const AuthRedirect = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       (event, session) => {
//         if (event === "SIGNED_IN" && session) {
//           navigate("/MonthlyCalendar", { replace: true }); // ✅ Redirect using HashRouter
//         }
//       }
//     );

//     return () => subscription.unsubscribe();
//   }, [navigate]);

//   return null;
// };

// export default AuthRedirect;

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "./client";

// const AuthRedirect = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // 1. Check session directly on load
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       if (session) {
//         navigate("/MonthlyCalendar", { replace: true });
//       }
//     });

//     // 2. Listen for sign-in events as backup
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((event, session) => {
//       if (event === "SIGNED_IN" && session) {
//         navigate("/MonthlyCalendar", { replace: true });
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [navigate]);

//   return null;
// };

// export default AuthRedirect;


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./client";

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let redirected = false;

    // 1. First try: Check session immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/MonthlyCalendar", { replace: true });
        redirected = true;
      }
    });

    // 2. Listen for SIGNED_IN event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session && !redirected) {
        navigate("/MonthlyCalendar", { replace: true });
        redirected = true;
      }
    });

    // 3. Fallback: Try again after short delay in case Supabase is slow to restore
    setTimeout(async () => {
      if (!redirected) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          navigate("/MonthlyCalendar", { replace: true });
        } else {
          navigate("/", { replace: true }); // Fallback to homepage if still no session
        }
      }
    }, 1000); // Adjust delay if needed

    return () => subscription.unsubscribe();
  }, [navigate]);

  return null;
};

export default AuthRedirect;
