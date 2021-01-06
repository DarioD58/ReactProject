import React from 'react';
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

function AddSchedule(props) {

    const [state, setState] = React.useState({
        ime: "",
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
            credentials: 'same-origin',
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
        console.log(e.target.value)
        setState(prevState => ({
            ...prevState,
            ime : e.target.value
        }))
    }

    const onChangeCheck1 = (e) => {
        let temp = state.grupe
        temp.push(e.target.value)  
        console.log(e.target.value)
        setState(prevState => ({
            ...prevState,
            grupe : temp
        }))
    }

    const onChangeCheck2 = (e) => {
        let temp = state.animatori
        temp.push(e.target.value)  
        console.log(e.target.value)
        setState(prevState => ({
            ...prevState,
            animatori: temp
        }))
    }

    const onChangeDate = (e) => {  
        setState(prevState => ({
            ...prevState,
            datum : e.target.value
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

    if(props.activity === undefined){
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
                <h5 className='general-text for-checkboxes'>Izaberite grupe</h5>
                {data.grupe.map((grupa) => {
                    return (<div className='checkboxes'>
                        <label className="general-text" htmlFor={grupa.ime_grupa}>{grupa.ime_grupa}: </label>
                        <input className="bg-dark pt-3 pb-3 text-white" onChange={onChangeCheck1} id={grupa.ime_grupa}
                         type="checkbox" name={grupa.ime_grupa} value={grupa} />
                    </div>)
                })}
                <h5 className='general-text for-checkboxes'>Izaberite animatore</h5>
                {data.animatori.map((animator) => {
                    return (<div className='checkboxes'>
                        <label className="general-text" htmlFor={animator.korisnickoIme}>{animator.ime} {animator.prezime}: </label>
                        <input className="bg-dark pt-3 pb-3 text-white" onChange={onChangeCheck2} id={animator.korisnickoIme}
                         type="checkbox" name={animator.korisnickoIme} value={animator.korisnickoIme} />
                    </div>)
                })}                
                <label className="general-text" htmlFor="datum">Vrijeme održavanja aktivnosti: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChangeDate} 
                required type="datetime-local" name="datum" value={state.datum} size="50"/>
                <input className="bg-dark text-white"
                type="submit" name="submit" placeholder="Submit" />
                <input className="bg-dark text-white" onClick={handleReset}
                type="reset" name="res" placeholder="Reset" />
            </form>
        </div>
    );
  }
  
  export default AddSchedule;