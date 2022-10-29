import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "react-datetime/css/react-datetime.css";

import CalendarView from "./components/CalendarView/CalendarView";
// import Counter from "./components/Counter/Counter";

function App() {
  return (
    <>
      <CalendarView/>
      {/* <CalendarEvent event={event1}/>
      <CalendarEvent event={event2}/> */}
      {/* <Counter/> */}
    </>
  );
}

export default App;
