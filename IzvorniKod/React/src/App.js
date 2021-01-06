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
import Cookies from 'js-cookie'
import Applications from './pages/Applications'
import CreateGroups from './pages/CreateGroups'
import UserCalendar from './pages/UserCalendar'
import AddSchedule from './pages/AddSchedule';
import RearangeGroups from './pages/RearangeGroups';


function App() {
  const [kamp, setKamp] = React.useState({
    ime: "",
    vrijeme: "", 
    email: "",
    pocetak_prijava_sud: "",
    kraj_prijava_sud: "",
    pocetak_prijava_anim: "",
    kraj_prijava_anim: ""
  });

  const [activity, setActivity] = React.useState([]);

  const [session, setSession] = React.useState();

  const [updateInfo, setUpdateInfo] = React.useState();

  React.useEffect(() => {
    if(Cookies.get('korisnik') === undefined){
      setSession('false')
    } else {
      setSession('true')
    }
    // GET request using fetch inside useEffect React hook
    fetch('http://localhost:5000/')
    .then(response => response.json())
    .then((data) => {
      setKamp(prevKamp => ({
        ...prevKamp,
        ime: data.kamp,
        vrijeme: data.pocetak_kamp,
        email: data.email,
        pocetak_prijava_sud: data.pocetak_prijava_sud,
        kraj_prijava_sud: data.kraj_prijava_sud,
        pocetak_prijava_anim: data.pocetak_prijava_anim,
        kraj_prijava_anim: data.kraj_prijava_anim
    }))
    setActivity(
      data.aktivnosti
    );
    });
  }, [updateInfo]);

  function updateSession(newValue){
    setSession(newValue)
  }

  function updateFetch(){
    setUpdateInfo(!updateInfo)
  }


  return (
    <BrowserRouter>
    <div className="App">
      <Sidebar logged={session}/>
      <Header logged={session} setSession={updateSession}/>
      <Switch>
        <Route exact path='/'>
          <HomePage logged={session} ime={kamp.ime} vrijeme={kamp.vrijeme} pocetak_prijava_sud={kamp.pocetak_prijava_sud}
           kraj_prijava_sud={kamp.kraj_prijava_sud} pocetak_prijava_anim={kamp.pocetak_prijava_anim}
           kraj_prijava_anim={kamp.kraj_prijava_anim} activity={activity} />
        </Route>
        <Route exact path='/makecamp'>
            <AddCamp update={updateFetch} />
        </Route>
        <Route exact path='/makeactivity'>
            <AddActivity update={updateFetch} />
        </Route>
        <Route exact path='/addactivity'>
            <AddSchedule  activity={activity} />
        </Route>
        <Route exact path='/viewgroups'>
            <RearangeGroups />
        </Route>
        <Route exact path='/creategroups'>
            <CreateGroups />
        </Route>
        <Route exact path='/applications'>
            <Applications />
        </Route>
        <Route exact path='/calendar'>
            <UserCalendar />
        </Route>
        <Route exact path='/login'>
          <Login setSession={updateSession}/>
        </Route>
        <Route exact path='/register'>
          <Register setSession={updateSession} />
        </Route>
        <Route exact path='/application'>
          <Apply />
        </Route>
      </Switch>
      <Footer email={kamp.email}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
