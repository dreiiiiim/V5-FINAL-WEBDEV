// import React from "react";
// import MonthlyCalendar from "./Components/MonthlyCalendar";
// import Welcomepage from "./Components/Welcomepage";
// import AuthRedirect from "./Components/AuthRedirect";
// import {  Routes, Route } from "react-router-dom";

// const App = () => {
  
//   return (
    
//       <div className="h-screen w-screen">
//       <Routes>
//         <Route path="/" element={<Welcomepage />} />
//         <Route path="/MonthlyCalendar" element={<MonthlyCalendar />} />
//         <Route path="/auth/callback" element={<AuthRedirect />} />
//       </Routes>
//     </div>

    
//   );
// };

// // export default App;
// import {  Routes, Route } from "react-router-dom";
// import MonthlyCalendar from "./Components/MonthlyCalendar";
// import Welcomepage from "./Components/Welcomepage";
// import AuthRedirect from "./Components/AuthRedirect";

// const App = () => (


//   <div className="h-screen w-screen">
    
//     <Routes>
//       <Route path="/" element={<Welcomepage />} />
//       <Route path="/MonthlyCalendar" element={<MonthlyCalendar />} />
//       <Route path="/auth/callback" element={<AuthRedirect />} />
//     </Routes>
  
//   </div>
  
// );

// export default App;
import { HashRouter, Routes, Route } from "react-router-dom";
import MonthlyCalendar from "./Components/MonthlyCalendar";
import Welcomepage from "./Components/Welcomepage";
import AuthRedirect from "./Components/AuthRedirect";

const App = () => (
  <HashRouter>
    <div className="h-screen w-screen">
      <Routes>
        <Route path="/" element={<Welcomepage />} />
        <Route path="/MonthlyCalendar" element={<MonthlyCalendar />} />
        <Route path="/auth/callback" element={<AuthRedirect />} />
      </Routes>
    </div>
  </HashRouter>
);

export default App;
