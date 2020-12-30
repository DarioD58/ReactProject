import React from 'react';
import { useHistory, Redirect } from "react-router-dom";

function AddActivity() {

    const [state, setState] = React.useState({
        ime: "",
        opis: "",
        tip: "1",
        br_grupa: 1,
        trajanje: "",
    });

    const [disabled, setDisabled] = React.useState({
        isDisabled: true
    })

    let history = useHistory();

    const onSubmit = (e) => {
        let objekt = JSON.stringify(state);
        console.log(objekt)
        fetch("./aktivnost/create", {
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
                opis: "",
                tip: "",
                br_grupa: "",
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
            ime: "",
            opis: "",
            tip: "",
            br_grupa: "",
            trajanje: "",
        }))
    }

    const onChangeSelect = (e) => {
        let {id , value} = e.target 
        id = e.target.name  
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
        if(value === "1"){
            setDisabled(() => ({
                isDisabled: true
            }))
            setState(prevState => ({
                ...prevState,
                br_grupa: 1
            }))
        } else if(value === "svi"){
            setDisabled(() => ({
                isDisabled: true
            }))            
            setState(prevState => ({
            ...prevState,
            br_grupa: 0
            }))
        } else {
            setDisabled(() => ({
                isDisabled: false
            }))  
        }       
    }

    if(localStorage.getItem('role') !== 'organizator'){
        return <Redirect to='/' />
    }

    return (
        <div className='everything'>
            <h1 className="naslovi general-text">Nova aktivnost</h1>
            <form  onSubmit={onSubmit}>
                <label className="general-text" for="ime">Ime aktivnosti: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="text" name="ime" value={state.ime}
                placeholder="Ručak" size="50"/>
                <label className="general-text" for="opis">Opis aktivnosti: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="text" name="opis" value={state.opis}
                placeholder="Opis..." size="50"/>
                <label className="general-text" for="tip">Tip aktivnosti: </label>
                <select className="bg-dark pt-3 pb-3 text-white" onChange={onChangeSelect} name="tip" value={state.tip}>
                    <option value="1">Sudjeluje 1 grupa</option>
                    <option value="N">Sudjeluje N grupa</option>
                    <option value="max N">Sudjeuje maksimalno N grupa</option>
                    <option value="svi">Sudjeluju sve grupe</option>
                </select>
                <label className="general-text" for="br_grupa">Broj grupa: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange} 
                required type="number" name="br_grupa" value={state.br_grupa} disabled={disabled.isDisabled} min="1" size="50"/>
                <label className="general-text" for="trajanje">Trajanje aktivnosti u satima: </label>
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