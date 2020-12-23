import React from 'react';
import { useHistory } from "react-router-dom";
import {useCookies} from "react-cookie"

function Login() {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);

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
        .then((response) => 
            response.json()
        )
        .then((res) => {
            if(res.error != undefined){
                throw new Error(res.error);
            }
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("user", res.userName);
            localStorage.setItem("role", res.userStatus);
            history.push('/');
            window.location.reload();
        }).catch((error) => {
            console.log(error);
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
            <label className="text-white" for="korime">Korisničko ime: </label>
            <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
             required type="text" name="korime" value = {state.korime}
              placeholder="aanic" size="50"/>
            <label className="text-white" for="lozinka">Lozinka: </label>
            <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
             required type="password" name="lozinka" value={state.lozinka}
              placeholder="**********" size="50"/>
            <input className="bg-dark text-white"
             type="submit" name="submit" placeholder="Submit" />
            <input className="bg-dark text-white" onClick={handleReset}
             type="reset" name="res" placeholder="Reset" />
        </form>
    );
  }
  
  export default Login;