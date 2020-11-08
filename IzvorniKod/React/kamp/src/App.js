import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Countdown from './components/Countdown';
import NotButton from './components/NotButton';
import Calendar from 'react-calendar';
import './App.css'
import 'react-calendar/dist/Calendar.css'
import Sidebar from './components/Sidebar';




function App() {
  return (
    <div className="App">
      <Sidebar />
      <Header />
      <div className="everything">
        <NotButton />
        <Countdown />
        <Calendar />
      </div>
      <Footer />
    </div>
  );
}

export default App;
