import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Countdown from './components/Countdown';
import NotButton from './components/NotButton';
import Calendar from 'react-calendar';
import './App.css'
import 'react-calendar/dist/Calendar.css'
import Sidebar from './components/Sidebar';
import Apply from './components/Apply'
import Register from './components/Register'




function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Sidebar />
      <Header />
      <div className="everything">
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route exact path='/application'>
          <Apply />
        </Route>
        <Route exact path='/'>
          <NotButton />
          <Countdown />
          <Calendar />
        </Route>
      </div>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
