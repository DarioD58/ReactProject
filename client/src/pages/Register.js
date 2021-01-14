import React from 'react';
import { useHistory } from "react-router-dom";

function Register(props) {

    const [state, setState] = React.useState({
        korime: "",
        lozinka: "",
        lozinka2: "", 
        disabledButton: true
    });

    let history = useHistory();

    const onSubmit = (e) => {
        let objekt = JSON.stringify(state);
        console.log(objekt)
        fetch("/api/register", {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: objekt
        })
        .then((response) => response.json()
        )
        .then((res) => {
            if(res.error !== undefined){
                throw new Error(res.error);
            }
            props.setSession('true')
            history.push('/');
        }).catch((response) => {
            console.log("Error")
            setState(prevState => ({
                ...prevState,
                korime: "",
                lozinka: "",
                lozinka2: "", 
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
        if(value === state.lozinka2){
            state.disabledButton = false;
        } else{
            state.disabledButton = true;
        }
    }

    const onPassChange = (e) => {
        let {id , value} = e.target 
        id = e.target.name    
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
        if(state.lozinka === value){
            state.disabledButton = false;
        } else{
            state.disabledButton = true;
        }
    }

    const handleReset = (e) => {
        setState(prevState => ({
            ...prevState,
            korime: "",
            lozinka: "",
            lozinka2: "", 
        }))
    }


    return (
        <div className='everything'>
            <form  onSubmit={onSubmit}>
                <label className="general-text" htmlFor="ime">Korisničko ime: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="text" name="korime" value={state.korime}
                placeholder="aanic" size="50"/>
                <label className="general-text" htmlFor="lozinka">Lozinka: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="password" value={state.lozinka}
                name="lozinka" size="50"/>
                <label className="general-text" htmlFor="lozinka2">Ponovi lozinku: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onPassChange}
                required type="password" value={state.lozinka2}
                name="lozinka2" size="50"/>
                <input className="bg-dark text-white" disabled= {state.disabledButton}
                type="submit" name="submit" placeholder="Submit" />
                <input className="bg-dark text-white" onClick={handleReset}
                type="reset" name="res" placeholder="Reset" />
            </form>
        </div>
    );
  }
  
  export default Register;