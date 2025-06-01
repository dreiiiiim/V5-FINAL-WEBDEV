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


// import { useEffect, useRef } from "react";
// import { supabase } from "./client";

// const AuthRedirect = () => {
//   const redirected = useRef(false);

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       if (session) {
//         window.location.hash = "#/MonthlyCalendar";
//         redirected.current = true;
//       }
//     });

//     const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
//       if (event === "SIGNED_IN" && session && !redirected.current) {
//         window.location.hash = "#/MonthlyCalendar";
//         redirected.current = true;
//       }
//     });

//     setTimeout(async () => {
//       if (!redirected.current) {
//         const { data: { session } } = await supabase.auth.getSession();
//         if (session) {
//           window.location.hash = "#/MonthlyCalendar";
//         } else {
//           window.location.hash = "#/";
//         }
//       }
//     }, 1000);

//     return () => subscription.unsubscribe();
//   }, []);

//   return <div className="text-center mt-10 text-xl">Redirecting to your calendar...</div>;
// };

// export default AuthRedirect;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./client";

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/#/MonthlyCalendar", { replace: true });
      } else {
        navigate("/#/", { replace: true });
      }
    });
  }, [navigate]);

  return <div className="text-center mt-10 text-xl">Redirecting to your calendar...</div>;
};

export default AuthRedirect;
