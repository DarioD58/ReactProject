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
import Groups from './pages/Groups'
import GradeActivity from './pages/GradeActivity';
import OverallExperience from './pages/OverallExperience';
import ViewGrades from './pages/ViewGrades';
import Redirect from 'react-router-dom'


function App() {
  const [kamp, setKamp] = React.useState({
    ime: "",
    vrijeme: "", 
    email: "",
    pocetak_prijava_sud: "",
    kraj_prijava_sud: "",
    aktivne_prijave_sud: "",
    pocetak_prijava_anim: "",
    kraj_prijava_anim: "", 
    aktivne_prijave_anim: "",
    status: ""
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
    fetch('/api/home', {
      credentials: 'include',
      method: 'GET'
    })
    .then(response => response.json())
    .then((data) => {
      if(data.error !== undefined){
        throw new Error(data.error);
      }
      if(data.prijave_sud_otvorene !== undefined){
        setKamp(prevKamp => ({
          status: data.status_kamp,
          ime: data.kamp,
          vrijeme: data.pocetak_kamp,
          email: data.email,
          pocetak_prijava_sud: data.pocetak_prijava_sud,
          kraj_prijava_sud: data.kraj_prijava_sud,
          pocetak_prijava_anim: data.pocetak_prijava_anim,
          kraj_prijava_anim: data.kraj_prijava_anim,
          aktivne_prijave_sud: data.prijave_sud_otvorene.count,
          aktivne_prijave_anim: data.prijave_anim_otvorene.count
      }))
      } else {
        setKamp(prevKamp => ({
          status: data.status_kamp,
          ime: data.kamp,
          vrijeme: data.pocetak_kamp,
          email: data.email,
          pocetak_prijava_sud: data.pocetak_prijava_sud,
          kraj_prijava_sud: data.kraj_prijava_sud,
          pocetak_prijava_anim: data.pocetak_prijava_anim,
          kraj_prijava_anim: data.kraj_prijava_anim,
          aktivne_prijave_sud: data.prijave_sud_otvorene,
          aktivne_prijave_anim: data.prijave_anim_otvorene
      }))
      }
    setActivity(
      data.aktivnosti
    )
    }).catch(err =>{
      console.log(err)
      setKamp(prevKamp => ({
        status: undefined,
        ime: undefined,
        vrijeme: undefined,
        email: undefined,
        pocetak_prijava_sud: undefined,
        kraj_prijava_sud: undefined,
        pocetak_prijava_anim: undefined,
        kraj_prijava_anim: undefined,
        aktivne_prijave_sud: undefined,
        aktivne_prijave_anim: undefined
    }))
    })
  }, [updateInfo, session]);
  function updateSession(newValue){
    setSession(newValue)
  }

  function updateFetch(){
    setUpdateInfo(!updateInfo)
  }

  if(kamp.status === 1){
    return (
      <BrowserRouter>
      <div className="App">
        <Sidebar logged={session} kamp={kamp}/>
        <Header logged={session} setSession={updateSession}/>
        <Switch>
        <Route exact path='/'>
            <Redirect to = "/home"/>
        </Route>
          <Route exact path='/home'>
            <HomePage logged={session} ime={kamp.ime} status={kamp.status} vrijeme={kamp.vrijeme} pocetak_prijava_sud={kamp.pocetak_prijava_sud}
             kraj_prijava_sud={kamp.kraj_prijava_sud} pocetak_prijava_anim={kamp.pocetak_prijava_anim} aktivne_prijave_sud={kamp.aktivne_prijave_sud}
             aktivne_prijave_anim={kamp.aktivne_prijave_anim} kraj_prijava_anim={kamp.kraj_prijava_anim} activity={activity} />
          </Route>
          <Route exact path='/viewgroups'>
              <RearangeGroups />
          </Route>
          <Route exact path='/mygroups'>
              <Groups />
          </Route>
          <Route exact path='/activitygrade'>
              <GradeActivity />
          </Route>
          <Route exact path='/viewgrades'>
              <ViewGrades />
          </Route>
          <Route exact path='/calendar'>
              <UserCalendar pocetak={kamp.vrijeme}/>
          </Route>
        </Switch>
        <Footer email={kamp.email}/>
      </div>
      </BrowserRouter>
    );
  } else if(kamp.status === 0 && kamp.pocetak_prijava_sud === undefined){
    return (
      <BrowserRouter>
      <div className="App">
        <Sidebar logged={session} kamp={kamp}/>
        <Header logged={session} setSession={updateSession}/>
        <Switch>
        <Route exact path='/'>
            <Redirect to = "/home"/>
        </Route>
          <Route exact path='/home'>
            <HomePage logged={session} ime={kamp.ime} status={kamp.status} vrijeme={kamp.vrijeme} pocetak_prijava_sud={kamp.pocetak_prijava_sud}
             kraj_prijava_sud={kamp.kraj_prijava_sud} pocetak_prijava_anim={kamp.pocetak_prijava_anim} aktivne_prijave_sud={kamp.aktivne_prijave_sud}
             aktivne_prijave_anim={kamp.aktivne_prijave_anim}
             kraj_prijava_anim={kamp.kraj_prijava_anim} activity={activity} />
          </Route>
          <Route exact path='/mygroups'>
              <Groups />
          </Route>
          <Route exact path='/makecamp'>
            <AddCamp update={updateFetch} />
        </Route>
          <Route exact path='/activitygrade'>
              <GradeActivity />
          </Route>
          <Route exact path='/viewgrades'>
              <ViewGrades />
          </Route>
          <Route exact path='/overallexperience'>
            <OverallExperience />
          </Route>
          <Route exact path='/calendar'>
              <UserCalendar pocetak={kamp.vrijeme}/>
          </Route>
        </Switch>
        <Footer email={kamp.email}/>
      </div>
      </BrowserRouter>
    );
  } else if(kamp.status === 0){
    return (
      <BrowserRouter>
      <div className="App">
        <Sidebar logged={session} kamp={kamp}/>
        <Header logged={session} setSession={updateSession}/>
        <Switch>
        <Route exact path='/'>
            <Redirect to = "/home"/>
        </Route>
          <Route exact path='/home'>
            <HomePage logged={session} ime={kamp.ime} status={kamp.status} vrijeme={kamp.vrijeme} pocetak_prijava_sud={kamp.pocetak_prijava_sud}
             kraj_prijava_sud={kamp.kraj_prijava_sud} pocetak_prijava_anim={kamp.pocetak_prijava_anim} aktivne_prijave_sud={kamp.aktivne_prijave_sud}
             aktivne_prijave_anim={kamp.aktivne_prijave_anim}
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
        <Route exact path='/login'>
          <Login setSession={updateSession}/>
        </Route>
        <Route exact path='/register'>
          <Register setSession={updateSession} />
        </Route>
        <Route exact path='/application'>
          <Apply kamp={kamp}/>
        </Route>
        </Switch>
        <Footer email={kamp.email}/>
      </div>
      </BrowserRouter>
    );
  }


  return (
    <BrowserRouter>
    <div className="App">
      <Sidebar logged={session} kamp={kamp}/>
      <Header logged={session} setSession={updateSession}/>
      <Switch>
      <Route exact path='/'>
            <Redirect to = "/home"/>
        </Route>
        <Route exact path='/home'>
          <HomePage logged={session} ime={kamp.ime} status={kamp.status} vrijeme={kamp.vrijeme} pocetak_prijava_sud={kamp.pocetak_prijava_sud}
           kraj_prijava_sud={kamp.kraj_prijava_sud} pocetak_prijava_anim={kamp.pocetak_prijava_anim}
           kraj_prijava_anim={kamp.kraj_prijava_anim} activity={activity} />
        </Route>
        <Route exact path='/login'>
          <Login setSession={updateSession}/>
        </Route>
        <Route exact path='/makecamp'>
            <AddCamp update={updateFetch} />
        </Route>
      </Switch>
      <Footer email={kamp.email}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
