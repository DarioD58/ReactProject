import React from 'react';
import {Redirect, withRouter, useHistory} from "react-router-dom";
import Cookies from 'js-cookie'


function Login(props) {
    let history = useHistory();

    const [state, setState] = React.useState({
        korime: "",
        lozinka: ""
    });


    const onSubmit = (e) => {
        let objekt = JSON.stringify(state);
        fetch("./login", {
            credentials: 'include',
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
            history.push('/')
            props.setSession('true')
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
        <div className='everything'>
            <form  onSubmit={onSubmit}>
                <label className="general-text" for="korime">Korisničko ime: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="text" name="korime" value = {state.korime}
                placeholder="aanic" size="50"/>
                <label className="general-text" for="lozinka">Lozinka: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="password" name="lozinka" value={state.lozinka}
                placeholder="**********" size="50"/>
                <input className="bg-dark text-white"
                type="submit" name="submit" placeholder="Submit" />
                <input className="bg-dark text-white" onClick={handleReset}
                type="reset" name="res" placeholder="Reset" />
            </form>
        </div>
    );
  }
  
  export default withRouter(Login);