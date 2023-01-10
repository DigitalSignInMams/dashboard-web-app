import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "react-datetime/css/react-datetime.css";

import CalendarView from "./components/CalendarView/CalendarView";
import Header from './components/header/Header';
import Login from './components/Pages/Login/Login';
import DashboardPage from './components/Pages/Dashboard/Dashboard';
import LogoutPage from './components/Pages/Login/LogoutPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Counter from "./components/Counter/Counter";
import DateTemplate from './components/Pages/Dashboard/DateTemplate/DateTemplate';
import SettingsPage from './components/Pages/Settings/Settings';

function App() {
  return (
    <>
      
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            
            <Route path="calendar" element={<DashboardPage/>}/>
            <Route path="calendar/:date" element={<DateTemplate/>}/>
            <Route path="settings" element={<SettingsPage/>} />
            <Route path="logout" element={<LogoutPage/>} />


      
        </Routes>
      </BrowserRouter>
      {/* <CalendarEvent event={event1}/>
      <CalendarEvent event={event2}/> */}
      {/* <Counter/> */}
    </>
  );
}

export default App;
