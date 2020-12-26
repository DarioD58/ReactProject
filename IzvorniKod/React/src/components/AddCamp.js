import React from 'react';
import { useHistory } from "react-router-dom";

function AddCamp() {

    const [state, setState] = React.useState({
        ime_kamp: "",
        datum_odrzavanja: "",
        email: "",
        pocetak_prijava_sud: "",
        kraj_prijava_sud: "",
        pocetak_prijava_anim: "",
        kraj_prijava_anim: ""
    });

    let history = useHistory();

    const onSubmit = (e) => {
        let objekt = JSON.stringify(state);
        fetch("http://localhost:5000/kamp/create", {
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
        })
        .catch((response) => {
            console.log(response)
            setState(prevState => ({
                ...prevState,
                ime_kamp: "",
                datum_odrzavanja: "",
                email: "",
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
            pocetak_prijava_sud: "",
            kraj_prijava_sud: "",
            pocetak_prijava_anim: "",
            kraj_prijava_anim: "" 
        }))
    }


    return (
        <div>
            <h1 className="naslovi text-white">Novi kamp</h1>
            <form  onSubmit={onSubmit}>
                <label className="text-white" for="ime_kamp">Ime kampa: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="text" name="ime_kamp" value={state.ime_kamp}
                placeholder="ime_kamp" size="50"/>
                <label className="text-white" for="datum_odrzavanja">Datum održavanja: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="text" name="datum_odrzavanja" value={state.datum_odrzavanja}
                placeholder="datum_odrzavanja" size="50"/>
                <label className="text-white" for="email">Email: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange} 
                required type="email" name="email" value={state.email}
                placeholder="ivica@email.com" size="50"/>
                <label className="text-white" for="pocetak_prijava_sud">Početak prijava sudionika: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="date" name="pocetak_prijava_sud" value={state.pocetak_prijava_sud}
                placeholder="0999999999" size="50"/>
                <label className="text-white" for="kraj_prijava_sud">Kraj prijava sudionika: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="date" value={state.kraj_prijava_sud}
                name="kraj_prijava_sud" size="50"/>
                <label className="text-white" for="pocetak_prijava_anim">Početak prijava animatora: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                type="date" name="pocetak_prijava_anim" value={state.pocetak_prijava_anim}
                placeholder="Motivacija..." size="50"/>
                <label className="text-white" for="sudionik">Kraj prijava animatora: </label>
                <input className="bg-dark pt-3 pb-3 text-white" id='sudionik' onChange={onChange}
                required type="date" name="kraj_prijava_anim" checked value="sudionik"/>
                <input className="bg-dark text-white"
                type="submit" name="submit" placeholder="Submit" />
                <input className="bg-dark text-white" onClick={handleReset}
                type="reset" name="res" placeholder="Reset" />
            </form>
        </div>
    );
  }
  
  export default AddCamp;