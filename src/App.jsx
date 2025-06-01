import React from "react";
import MonthlyCalendar from "./Components/MonthlyCalendar";
import Welcomepage from "./Components/Welcomepage";
import AuthRedirect from "./Components/AuthRedirect";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="h-screen w-screen">
      <Routes>
        <Route path="/" element={<Welcomepage />} />
        <Route path="/auth/callback" element={<AuthRedirect />} />
        <Route path="/MonthlyCalendar" element={<MonthlyCalendar />} />
      </Routes>
    </div>
  );
};

export default App;