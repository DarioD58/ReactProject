import React from 'react';
import { useHistory, Redirect } from "react-router-dom";

function AddActivity() {

    const [state, setState] = React.useState({
        ime_aktivnost: "",
        opis_aktivnost: "",
        kategorija: "",
        trajanje: "",
    });

    let history = useHistory();

    const onSubmit = (e) => {
        let objekt = JSON.stringify(state);
        console.log(objekt)
        fetch("http://localhost:5000/aktivnost/create", {
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
                ime_aktivnost: "",
                opis_aktivnost: "",
                kategorija: "",
                trajanje: "",
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
            ime_aktivnost: "",
            opis_aktivnost: "",
            kategorija: "",
            trajanje: "",
        }))
    }

    if(localStorage.getItem('role') !== 'organizator'){
        return <Redirect to='/' />
    }

    return (
        <div className='everything'>
            <h1 className="naslovi text-white">Novi kamp</h1>
            <form  onSubmit={onSubmit}>
                <label className="text-white" for="ime_aktivnost">Ime aktivnosti: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="text" name="ime_aktivnost" value={state.ime_aktivnost}
                placeholder="Ručak" size="50"/>
                <label className="text-white" for="opis_aktivnost">Opis aktivnosti: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="text" name="opis_aktivnost" value={state.opis_aktivnost}
                placeholder="Opis..." size="50"/>
                <label className="text-white" for="kategorija">Tip aktivnosti: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange} 
                required type="text" name="kategorija" value={state.kategorija}
                placeholder="Obrok" size="50"/>
                <label className="text-white" for="trajanje">Trajanje aktivnosti u satima: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange} 
                required type="text" name="trajanje" value={state.trajanje}
                placeholder="0" size="50"/>
                <input className="bg-dark text-white"
                type="submit" name="submit" placeholder="Submit" />
                <input className="bg-dark text-white" onClick={handleReset}
                type="reset" name="res" placeholder="Reset" />
            </form>
        </div>
    );
  }
  
  export default AddActivity;