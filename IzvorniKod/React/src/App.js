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
  const [kamp, setKamp] = React.useState({
    ime: "",
    aktivnost: "",
    vrijeme: ""
  });

  const [session, setSession] = React.useState({
    isLoggedIn: true
  });

  React.useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('http://localhost:5000/')
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      setKamp(prevKamp => ({
        ...prevKamp,
        ime: data.nadolazeci_kamp,
        aktivnost: data.aktivnost,
        vrijeme: data.pocetak_kamp
    }))
    });
  }, []);

  React.useEffect(() => {
    sessionStorage.setItem("isLoggedIn", session.isLoggedIn)
    console.log(sessionStorage.getItem("isLoggedIn"))
    setSession(() => ({
      isLoggedIn: sessionStorage.getItem("isLoggedIn")
    }));
  }, [session.isLoggedIn]);

  return (
    <BrowserRouter>
    <div className="App">
      <Sidebar />
      <Header ime = {kamp.ime} logged={session.isLoggedIn}/>
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
          <Countdown vrijeme = {kamp.vrijeme} />
          <Calendar />
        </Route>
      </div>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
