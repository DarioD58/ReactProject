import React from 'react';
import { useHistory } from "react-router-dom";

function Apply() {

    const [state, setState] = React.useState({
        ime: "",
        prezime: "",
        email: "",
        brtel: "",
        dob: "",
        pismo: "",
        status: "sudionik"
    });

    let history = useHistory();

    const onSubmit = (e) => {
        let objekt = JSON.stringify(state);
        fetch("http://localhost:5000/apply", {
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
                ime: "",
                prezime: "",
                email: "",
                brtel: "",
                dob: "",
                pismo: "", 
                status: ""
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
            ime: "",
            prezime: "",
            email: "",
            brtel: "",
            dob: "",
            pismo: "",
            status: "sudionik" 
        }))
    }


    return (
        <form  onSubmit={onSubmit}>
            <label className="text-white" for="ime">Ime: </label>
            <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
             required type="text" name="ime" value={state.ime}
             placeholder="Ime" size="50"/>
            <label className="text-white" for="prezime">Prezime: </label>
            <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
             required type="text" name="prezime" value={state.prezime}
             placeholder="Prezime" size="50"/>
            <label className="text-white" for="email">Email: </label>
            <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange} 
             required type="email" name="email" value={state.email}
             placeholder="ivica@email.com" size="50"/>
            <label className="text-white" for="brtel">Broj telefona: </label>
            <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
             required type="text" name="brtel" value={state.brtel}
              placeholder="0999999999" size="50"/>
            <label className="text-white" for="dob">Datum rođenja: </label>
            <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
             required type="date" value={state.dob}
             name="dob" size="50"/>
            <label className="text-white" for="pismo">Motivacijsko pismo: </label>
            <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
             type="text" name="pismo" value={state.pismo}
             placeholder="Motivacija..." size="50"/>
            <label className="text-white" for="sudionik">Sudionik: </label>
            <input className="bg-dark pt-3 pb-3 text-white" id='sudionik' onChange={onChange}
             required type="radio" name="status" checked value="sudionik"/>
             <label className="text-white" for="animator">Animator: </label>
            <input className="bg-dark pt-3 pb-3 text-white" id='animator' onChange={onChange}
             required type="radio" name="status" value="animator"/>
            <input className="bg-dark text-white"
             type="submit" name="submit" placeholder="Submit" />
            <input className="bg-dark text-white" onClick={handleReset}
             type="reset" name="res" placeholder="Reset" />
        </form>
    );
  }
  
  export default Apply;