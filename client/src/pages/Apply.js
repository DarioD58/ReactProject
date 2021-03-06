import React from 'react';
import { useHistory } from "react-router-dom";

function Apply(props) {

    const [state, setState] = React.useState({
        ime: "",
        prezime: "",
        email: "",
        brtel: "",
        br_tel_odg_osobe: "",
        dob: "",
        pismo: "",
        status: "sudionik"
    });

    const [sudionik, setSudionik] = React.useState(true)

    const [message, setMessage] = React.useState("")

    let history = useHistory();

    const onSubmit = (e) => {
        if((props.kamp.aktivne_prijave_sud === "1" && state.status === "sudionik")  || 
        (props.kamp.aktivne_prijave_anim === "1" && state.status === "animator")){
            let objekt = JSON.stringify(state);
            fetch("/api/apply", {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: objekt
            })
            .then((response) => response.json()
            ).then((res) => {
                if(res.error !== undefined){
                    throw new Error(res.error);
                }
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
                    br_tel_odg_osobe: "",
                    dob: "",
                    pismo: "", 
                    status: "sudionik"
                }))
            });
        } else {
            setMessage(`Trenutno nisu aktivne prijave za ${state.status}a`)
        }
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

    const onChangeRadio = (e) => {
        let {id , value} = e.target 
        id = e.target.name  
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
        setSudionik(!sudionik)
    }

    const handleReset = (e) => {
        setState(prevState => ({
            ...prevState,
            ime: "",
            prezime: "",
            email: "",
            brtel: "",
            brtelrod: "",
            dob: "",
            pismo: "",
            status: "sudionik" 
        }))
    }

    const [hidden, setHidden]= React.useState(true);

    const youngerThan18 = (e) => {
        let {id , value} = e.target 
        id = e.target.name  
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
        var today = new Date();
        var birthDate = new Date(value);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if(age < 18){
            setHidden(false);
        } else {
            setHidden(true)
        }   
    }


    return (
        <div className='everything'>
            <h3 className='text-danger text-center' >{message}</h3>
            <form  onSubmit={onSubmit}>
                <label className="general-text" htmlFor="ime">Ime: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="text" name="ime" value={state.ime}
                placeholder="Ime" size="50"/>
                <label className="general-text" htmlFor="prezime">Prezime: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="text" name="prezime" value={state.prezime}
                placeholder="Prezime" size="50"/>
                <label className="general-text" htmlFor="email">Email: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange} 
                required type="email" name="email" value={state.email}
                placeholder="ivica@email.com" size="50"/>
                <label className="general-text" htmlFor="brtel">Broj telefona: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="text" name="brtel" value={state.brtel}
                placeholder="0999999999" size="50"/>
                <label className="general-text" htmlFor="dob">Datum rođenja: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={youngerThan18} 
                required type="date" value={state.dob}
                name="dob" size="50"/>

                <label className="general-text" htmlFor="br_tel_odg_osobe" hidden = {hidden}>Broj telefona roditelja: </label>
                <input className="bg-dark pt-3 pb-3 text-white" hidden = {hidden} onChange={onChange}
                required = {!hidden} type="text" name="br_tel_odg_osobe" value={state.br_tel_odg_osobe}
                placeholder="0999999999" size="50"/>

                <label className="general-text" htmlFor="pismo">Motivacijsko pismo: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                type="text" name="pismo" value={state.pismo}
                placeholder="Motivacija..." size="50"/>
                <label className="general-text" htmlFor="sudionik">Sudionik: </label>
                <input className="bg-dark pt-3 pb-3 text-white" id='sudionik' onChange={onChangeRadio}
                required type="radio" name="status" checked={sudionik} value="sudionik"/>
                <label className="general-text" htmlFor="animator">Animator: </label>
                <input className="bg-dark pt-3 pb-3 text-white" id='animator' onChange={onChangeRadio}
                required type="radio" name="status" checked={!sudionik} value="animator"/>
                <input className="bg-dark text-white"
                type="submit" name="submit" placeholder="Submit" />
                <input className="bg-dark text-white" onClick={handleReset}
                type="reset" name="res" placeholder="Reset" />
            </form>
        </div>
    );
  }
  
  export default Apply;