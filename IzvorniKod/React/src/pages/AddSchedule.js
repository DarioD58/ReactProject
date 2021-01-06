import React from 'react';
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

function AddSchedule(props) {

    const [state, setState] = React.useState({
        ime: props.activity[0].ime_aktivnost,
        grupe: [],
        animatori: [],
        datum: "",
    });

    const [data, setData] = React.useState({
        grupe: [],
        animatori: []
    })
    
    const [message, setMessage] = React.useState("")

    React.useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch('http://localhost:5000/aktivnost/add', {
            credentials: 'include',
            method: 'GET'
        })
        .then(response => response.json())
        .then((res) => {
        if(res.error != undefined){
            throw new Error(res.error);
        }
        setData(() => ({
            grupe: res.grupe,
            animatori: res.animatori
        }))
        })
        .catch((error) => {
            console.log(error);
        });
      }, []);


    const onSubmit = (e) => {
        let objekt = JSON.stringify(state);
        fetch("./aktivnost/add", {
            credentials: 'include',
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: objekt
        })
        .then((response) => response.json()
        ).then((res) => {
            props.update()
            if(res.error === undefined)
                setMessage(res.poruka)
            else
                setMessage(res.error)
            handleReset()
        })
        .catch((response) => {
            console.log(response)
            setState(prevState => ({
                ...prevState,
                ime: "",
                grupe: [],
                animatori: [],
                datum: "",
            }))
        });
        e.preventDefault();
    }

    const onChange = (e) => {
        let {id , value} = e.target 
        id = e.target.name  
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleReset = () => {
        setState(prevState => ({
            ...prevState,
            ime: "",
            grupe: [],
            animator: [],
            datum: "",
        }))
    }

    if(Cookies.get('korisnik') === undefined || Cookies.getJSON('korisnik').statusKorisnik !== 'organizator'){
        return <Redirect to='/' />
    }

    const activities = Array.from(props.activity);

    return (
        <div className='everything'>
            <h1 className="naslovi general-text">Dodaj aktivnost u raspored</h1>
            <p className='general-text' hidden={!message}>{message}</p>
            <form  onSubmit={onSubmit}>
                <label className="general-text" htmlFor="ime">Ime aktivnosti: </label>
                <select className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required  name="ime" value={state.ime}>
                    {activities.map((activity) => 
                            <option key={activity.id_aktivnost} id={activity.id_aktivnost} value={activity.ime_aktivnost}>{activity.ime_aktivnost}</option>
                    )}
                </select>
                {data.grupe.map((grupa) => {
                    return (<div>
                        <label className="general-text" htmlFor={grupa.ime_grupa}>{grupa.ime_grupa}: </label>
                        <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange} id={grupa.ime_grupa}
                        required type="checkbox" name="grupe" value={grupa} />
                    </div>)
                })}
                {data.animatori.map((animator) => {
                    return (<div>
                        <label className="general-text" htmlFor={animator.korisnickoIme}>{animator.ime} {animator.prezime}: </label>
                        <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange} id={animator.korisnickoIme}
                        required type="checkbox" name="animatori" value={animator} />
                    </div>)
                })}                
                <label className="general-text" htmlFor="trajanje">Vrijeme održavanja aktivnosti: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange} 
                required type="datetime-local" name="trajanje" value={state.trajanje} size="50"/>
                <input className="bg-dark text-white"
                type="submit" name="submit" placeholder="Submit" />
                <input className="bg-dark text-white" onClick={handleReset}
                type="reset" name="res" placeholder="Reset" />
            </form>
        </div>
    );
  }
  
  export default AddSchedule;