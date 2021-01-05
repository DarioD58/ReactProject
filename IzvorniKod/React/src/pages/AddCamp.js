import React from 'react';
import { useHistory, Redirect } from "react-router-dom";
import Cookies from 'js-cookie'

function AddCamp(props) {

    const [state, setState] = React.useState({
        ime_kamp: "",
        datum_odrzavanja: "",
        email: "",
        trajanje: "",
        pocetak_prijava_sud: "",
        kraj_prijava_sud: "",
        pocetak_prijava_anim: "",
        kraj_prijava_anim: ""
    });

    let history = useHistory();

    const onSubmit = (e) => {
        let objekt = JSON.stringify(state);
        fetch("./kamp/create", {
            credentials: 'include',
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: objekt
        })
        .then((response) => response.json()
        ).then((res) => {
            /*if(res.error == undefined){
                throw new Error(res.error);
            }*/
            history.push('/');
            props.update()
        })
        .catch((response) => {
            console.log(response)
            setState(prevState => ({
                ...prevState,
                ime_kamp: "",
                datum_odrzavanja: "",
                email: "",
                trajanje: "",
                pocetak_prijava_sud: "",
                kraj_prijava_sud: "",
                pocetak_prijava_anim: "", 
                kraj_prijava_anim: ""
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

    const handleReset = (e) => {
        setState(prevState => ({
            ...prevState,
            ime_kamp: "",
            datum_odrzavanja: "",
            email: "",
            trajanje: "",
            pocetak_prijava_sud: "",
            kraj_prijava_sud: "",
            pocetak_prijava_anim: "",
            kraj_prijava_anim: "" 
        }))
    }
    
    if(Cookies.getJSON('korisnik').statusKorisnik !== 'organizator'){
        return <Redirect to='/' />
    }


    return (
        <div className='everything'>
            <h1 className="naslovi general-text">Novi kamp</h1>
            <form  onSubmit={onSubmit}>
                <label className="general-text" htmlFor="ime_kamp">Ime kampa: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="text" name="ime_kamp" value={state.ime_kamp}
                placeholder="ime_kamp" size="50"/>
                <label className="general-text" htmlFor="datum_odrzavanja">Datum održavanja: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="date" name="datum_odrzavanja" value={state.datum_odrzavanja}
                placeholder="datum_odrzavanja" size="50"/>
                <label className="general-text" htmlFor="email">Email: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange} 
                required type="email" name="email" value={state.email}
                placeholder="ivica@email.com" size="50"/>
                <label className="general-text" htmlFor="trajanje">Trajanje kampa: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange} 
                required type="text" name="trajanje" value={state.trajanje}
                placeholder="0" size="50"/>
                <label className="general-text" htmlFor="pocetak_prijava_sud">Početak prijava sudionika: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="date" name="pocetak_prijava_sud" value={state.pocetak_prijava_sud}
                placeholder="0999999999" size="50"/>
                <label className="general-text" htmlFor="kraj_prijava_sud">Kraj prijava sudionika: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="date" value={state.kraj_prijava_sud}
                name="kraj_prijava_sud" size="50"/>
                <label className="general-text" htmlFor="pocetak_prijava_anim">Početak prijava animatora: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                type="date" name="pocetak_prijava_anim" value={state.pocetak_prijava_anim}
                size="50"/>
                <label className="general-text" htmlFor="kraj_prijava_animator">Kraj prijava animatora: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                type="date" name="kraj_prijava_anim" value={state.kraj_prijava_anim}
                size="50"/>
                <input className="bg-dark text-white"
                type="submit" name="submit" placeholder="Submit" />
                <input className="bg-dark text-white" onClick={handleReset}
                type="reset" name="res" placeholder="Reset" />
            </form>
        </div>
    );
  }
  
  export default AddCamp;