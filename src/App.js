import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "react-datetime/css/react-datetime.css";

import CalendarView from "./components/CalendarView/CalendarView";
import Header from './components/Header/Header';
import Login from './components/Pages/Login/Login';
import DashboardPage from './components/Pages/Dashboard/Dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Counter from "./components/Counter/Counter";

function App() {
  return (
    <>
      <Header/>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="dashboard" element={<DashboardPage/>}/>
      
        </Routes>
      </BrowserRouter>
      {/* <CalendarEvent event={event1}/>
      <CalendarEvent event={event2}/> */}
      {/* <Counter/> */}
    </>
  );
}

export default App;
