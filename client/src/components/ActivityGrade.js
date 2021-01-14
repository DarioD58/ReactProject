import React from 'react';
import Cookies from 'js-cookie'

function ActivityGrade(props){
    const [state, setState] = React.useState({
        id_aktivnost:props.aktivnost.id_aktivnost,
        ocjena: "",
        dojam: ""
    });


    //http je moozda krivi
    const onSubmit = (e) => {        
        let objekt = JSON.stringify(state);
        fetch("./aktivnost/ocjena", {//adresa
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

            props.grade()
        })
        .catch((response) => {
            console.log(response)
            setState(prevState => ({
                ...prevState,
                ocjena: "",
                dojam: ""
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
    <form onSubmit={onSubmit} className="aktivnosti3">
        <p className="naslovi general-text">{props.aktivnost.ime_aktivnost}</p>
        <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
        required type="number" min="1" max="10" name="ocjena" value={state.ocjena}
        placeholder="1 - 10"/>
        <textarea className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
        required type="text" name="dojam" value={state.dojam}
        placeholder="Napišite vaš dojam" rows='5' cols='20' maxLength='500'/>
        <input className="bg-dark text-white submit-button" type="submit" name="submit" placeholder="Submit" />
    </form>
    );
}
 
export default ActivityGrade;