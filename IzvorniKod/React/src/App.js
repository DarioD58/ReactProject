import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import './App.css'
import 'react-calendar/dist/Calendar.css'
import Sidebar from './components/Sidebar';
import Apply from './pages/Apply'
import Register from './pages/Register'
import AddCamp from './pages/AddCamp';
import AddActivity from './pages/AddActivity';
import HomePage from './pages/HomePage'


function App() {
  const [kamp, setKamp] = React.useState({
    ime: "",
    vrijeme: ""
  });

  const [activity, setActivity] = React.useState([]);

  const [session, setSession] = React.useState(localStorage.getItem('isLoggedIn'));

  React.useEffect(() => {
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

  return (
    <BrowserRouter>
    <div className="App">
      <Sidebar logged={session}/>
      <Header ime = {kamp.ime} logged={session}/>
      <Switch>
        <Route exact path='/'>
          <HomePage logged={session} ime={kamp.ime} vrijeme={kamp.vrijeme} activity={activity} />
        </Route>
        <Route exact path='/makecamp'>
            <AddCamp />
        </Route>
        <Route exact path='/makeactivity'>
            <AddActivity />
          </Route>
        <Route exact path='/login'>
          <Login setSession={setSession}/>
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route exact path='/application'>
          <Apply />
        </Route>
      </Switch>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
