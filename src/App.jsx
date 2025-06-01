import React from 'react';
import MonthlyCalendar from './Components/MonthlyCalendar';
import Welcomepage from './Components/Welcomepage';
import AuthRedirect from './Components/AuthRedirect'; // ✅ Don't forget this!
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className='h-screen w-screen'>
      <Routes>
        <Route path='/' element={<Welcomepage />} />
        {/* <Route path='/MonthlyCalendar' element={<MonthlyCalendar />} /> */}
        <Route path='/MonthlyCalendar' element={<AuthRedirect /> } />
      </Routes>

  
    </div>
  );
};

export default App;
