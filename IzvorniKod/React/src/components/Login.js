import React from 'react';
import { useHistory } from "react-router-dom";

function Login() {

    const [state, setState] = React.useState({
        korime: "",
        lozinka: ""
    });

    let history = useHistory();

    const onSubmit = (e) => {
        let objekt = JSON.stringify(state);
        console.log(objekt)
        fetch("http://localhost:5000/login", {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: objekt
        })
        .then((response) => {
            history.push('/');
        }).catch((response) => {
            console.log("Error")
            setState(prevState => ({
                ...prevState,
                korime: "",
                lozinka: ""
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
            korime: "",
            lozinka: ""
        }))
    }


    return (
        <form  onSubmit={onSubmit}>
            <label className="text-body" for="korime">Korisničko ime: </label>
            <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
             required type="text" name="korime" value = {state.korime}
              placeholder="aanic" size="50"/>
            <label className="text-body" for="lozinka">Lozinka: </label>
            <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
             required type="password" name="lozinka" value={state.lozinka}
              placeholder="xxxxxxx" size="50"/>
            <input className="bg-dark text-white"
             type="submit" name="submit" placeholder="Submit" />
            <input className="bg-dark text-white" onClick={handleReset}
             type="reset" name="res" placeholder="Reset" />
        </form>
    );
  }
  
  export default Login;