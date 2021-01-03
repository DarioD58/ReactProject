import React from 'react';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

function OverallExperience(){
    // TO DO funkcionalnost da korisnik to moze unjeti samo jednom
    
    let korIme;
    if(Cookies.get('korisnik') !== undefined){
        korIme = Cookies.getJSON('korisnik').korisnickoIme//mozda krivo
    }else{
        korIme = "Toni";//makni ovo
    }    
    const [state, setState] = React.useState({
        ocjena: "",
        dojam: "",
        korisnicko_ime: "",
    });

    let history = useHistory();

    //http je moozda krivi
    const onSubmit = (e) => {
        let objekt = JSON.stringify(state);
        fetch("http://localhost:5000/OverallExperience", {
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
                ocjena: "",
                dojam: "",
                korisnicko_ime: korIme,
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


    return (
        <div className='everything'>
            <h1 className="naslovi general-text">Ocjeni kamp</h1>
            <form onSubmit={onSubmit}>
            <label className="general-text" for="ocjena">Ocjena za kamp: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="number" min="1" max="10" name="ocjena" value={state.ocjena}
                placeholder="1 - 10"/>
            <label className="general-text" for="dojam">Dojam: </label>
                <textarea className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="text" name="dojam" value={state.dojam}
                placeholder="Napišite vaš dojam" rows='10' cols='50' maxLength='500'/>
            <input className="bg-dark text-white" type="submit" name="submit" placeholder="Submit" />
            </form>
        </div>
    );
}
export default OverallExperience;