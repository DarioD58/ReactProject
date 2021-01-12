import React from 'react';
import Cookies from 'js-cookie';

function OverallExperience(){
    // TO DO funkcionalnost da korisnik to moze unjeti samo jednom  
    const [state, setState] = React.useState({
        ocjena: "",
        dojam: ""
    });
    const [isSent, setIsSent] = React.useState(false)

    const [message, setMessage] = React.useState("")

    const [wrong, setWrong] = React.useState("")

    React.useEffect(() =>{
        fetch("./kamp/ocjena", {
            credentials: 'include',
            method: 'GET'
        })
        .then((response) => response.json()
        ).then((res) => {
            if(res.error !== undefined){
                throw new Error(res.error);
            }

            setMessage(res.poruka)
            setIsSent(true)
        })
        .catch((response) => {
            setWrong(response)
            setIsSent(true)
            setState(prevState => ({
                ...prevState,
                ocjena: "",
                dojam: "",
                korisnicko_ime: "",
            }))
        });
    }, [isSent])


    //http je moozda krivi
    const onSubmit = (e) => {
        let objekt = JSON.stringify(state);
        fetch("./kamp/ocjena", {
            credentials: 'include',
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: objekt
        })
        .then((response) => response.json()
        ).then((res) => {
            if(res.error !== undefined){
                throw new Error(res.error);
            }
            setIsSent(true)
        })
        .catch((response) => {
            console.log(response)
            setState(prevState => ({
                ...prevState,
                ocjena: "",
                dojam: "",
                korisnicko_ime: "",
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

    if(wrong !== ""){
        return (
            <div className='everything'>
                <h1 className="naslovi general-text" hidden={isSent}>Ocjeni kamp</h1>
                <p className='general-text'>{wrong}</p>
            </div>
        );
    }

    return (
        <div className='everything'>
            <h1 className="naslovi general-text" hidden={isSent}>Ocjeni kamp</h1>
            <p className='general-text'>{message}</p>
            <form onSubmit={onSubmit}>
            <label className="general-text" for="ocjena" hidden={isSent}>Ocjena za kamp: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="number" min="1" max="10" name="ocjena" value={state.ocjena}
                placeholder="1 - 10" hidden={isSent}/>
            <label className="general-text" for="dojam" hidden={isSent}>Dojam: </label>
                <textarea className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required type="text" name="dojam" value={state.dojam}
                placeholder="Napišite vaš dojam" rows='10' cols='50' maxLength='500' hidden={isSent}/>
            <input className="bg-dark text-white" hidden={isSent} type="submit" name="submit" placeholder="Submit" />
            </form>
        </div>
    );
}
export default OverallExperience;