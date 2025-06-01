import React from "react";
import MonthlyCalendar from "./Components/MonthlyCalendar";
import Welcomepage from "./Components/Welcomepage";
import AuthRedirect from "./Components/AuthRedirect";
import { HashRouter, Routes, Route } from "react-router-dom";

const App = () => {
  
  return (
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
};

export default App;