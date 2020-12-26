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
import Activities from './components/Activities';
import AddCamp from './components/AddCamp';





function App() {
  const [kamp, setKamp] = React.useState({
    ime: "",
    vrijeme: ""
  });

  const [activity, setActivity] = React.useState([]);

  const [session, setSession] = React.useState({
    isLoggedIn: ''
  });

  React.useEffect(() => {
    if(localStorage.getItem('isLoggedIn') === true){
      setSession(() => ({
        isLoggedIn: localStorage.getItem('isLoggedIn')
      }))
    }
    // GET request using fetch inside useEffect React hook
    fetch('http://localhost:5000/')
    .then(response => response.json())
    .then((data) => {
      setKamp(prevKamp => ({
        ...prevKamp,
        ime: data.kamp,
        vrijeme: data.pocetak_kamp
    }))
    setActivity(
      ...activity,
      data.aktivnosti
    );
    });
  }, []);

  React.useEffect(() => {
    setSession(() => ({
      isLoggedIn: localStorage.getItem("isLoggedIn")
    }));
  }, [session.isLoggedIn]);

  if(localStorage.getItem('isLoggedIn') == 'true'){
    return (
      <BrowserRouter>
      <div className="App">
        <Sidebar logged={session.isLoggedIn}/>
        <Header ime = {kamp.ime} logged={session.isLoggedIn}/>
        <div className="everything">
          <Route exact path='/makecamp'>
            <AddCamp />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>
          <Route exact path='/application'>
            <Apply />
          </Route>
          <Route exact path='/calendar'>
            <Calendar />
          </Route>
          <Route exact path='/'>
            <Countdown vrijeme = {kamp.vrijeme} />
            <Activities activities = {activity} />
          </Route>
        </div>
        <Footer />
      </div>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
    <div className="App">
      <Sidebar logged={session.isLoggedIn}/>
      <Header ime = {kamp.ime} logged={session.isLoggedIn}/>
      <div className="everything">
        <Route exact path='/makecamp'>
            <AddCamp />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route exact path='/application'>
          <Apply />
        </Route>
        <Route exact path='/calendar'>
          <Calendar />
        </Route>
        <Route exact path='/'>
          <NotButton />
          <Countdown vrijeme = {kamp.vrijeme} />
          <Activities activities = {activity} />
        </Route>
      </div>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
