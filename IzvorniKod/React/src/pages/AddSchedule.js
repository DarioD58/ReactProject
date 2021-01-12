import React from 'react';
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

function AddSchedule(props) {
    const [state, setState] = React.useState({
        ime: "",
        grupe: [],
        animatori: [],
        datum: "",
    });

    const [data, setData] = React.useState({
        grupe: [],
        animatori: []
    })

    const [isSelected, setIsSelected] = React.useState({
        grupe: {},
        animatori: {}
    })
    
    const [message, setMessage] = React.useState("")

    React.useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch('./aktivnost/add', {
            credentials: 'include',
            method: 'GET'
        })
        .then(response => response.json())
        .then((res) => {
        if(res.error !== undefined){
            throw new Error(res.error);
        }
        setState(prevState => ({
            ...prevState,
            ime: props.activity[0].ime_aktivnost
        }))
        setData(() => ({
            grupe: res.grupe,
            animatori: res.animatori
        }))
        setIsSelected(() => {
            let temp = {}
            for(let animator of res.animatori){
                temp[animator.korisnicko_ime] = false
            }
            let help = {}
            for(let grupa of res.grupe){
                help[grupa.id_grupa] = false
            }
            return ({
                grupe: help,
                animatori: temp
            })
        })
        })
        .catch((error) => {
            console.log(error);
        });
      }, []);


    const onSubmit = (e) => {
        let objekt = JSON.stringify(state);
        fetch("./aktivnost/add", {
            credentials: 'include',
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: objekt
        })
        .then((response) => response.json()
        ).then((res) => {
            if(res.error === undefined)
                setMessage(res.poruka)
            else
                setMessage(res.error)
            handleReset()
        })
        .catch((response) => {
            console.log(response)
            handleReset()
        });
        e.preventDefault();
    }

    const onChange = (e) => {  
        setState(prevState => ({
            ...prevState,
            ime : e.target.value
        }))
    }

    const onChangeCheck1 = (e) => {
        let help = isSelected.grupe
        help[e.target.value] = !help[e.target.value]
        setIsSelected(prevState => ({
            ...prevState,
            grupe: help
        }))
        if(isSelected.grupe[e.target.value] === true){
            let temp = state.grupe
            temp.push(e.target.value)  
            setState(prevState => ({
                ...prevState,
                grupe : temp
            }))

        } else {
            let temp = state.grupe
            for(let i = 0; i < temp.length; i++){
                if(temp[i] === e.target.value){
                    temp.splice(i, 1)
                    i--
                }
            }
            setState(prevState => ({
                ...prevState,
                grupe : temp
            }))
        }
    }

    const onChangeCheck2 = (e) => {
        let help = isSelected.animatori
        help[e.target.value] = !help[e.target.value]  
        setIsSelected(prevState => ({
            ...prevState,
            animatori: help
        }))
        if(isSelected.animatori[e.target.value] === true){
            let temp = state.animatori
            temp.push(e.target.value)            
            setState(prevState => ({
                ...prevState,
                animatori : temp
            }))
        } else {
            let temp = state.animatori
            for(let i = 0; i < temp.length; i++){
                if(temp[i] === e.target.value){
                    temp.splice(i, 1)
                    i--
                }
            }
            setState(prevState => ({
                ...prevState,
                animatori : temp
            }))
        }
    }
    

    const onChangeDate = (e) => {  
        setState(prevState => ({
            ...prevState,
            datum : e.target.value
        }))
    }

    const handleReset = () => {
        setIsSelected(prevState => {
            let temp = isSelected.grupe
            let help = isSelected.animatori
            for (let grupa in temp){
                temp[grupa] = false
            }
            for (let animator in help){
                help[animator] = false
            }
            return ({
                ...prevState,
                grupe: temp,
                animatori: help
            })
        })
        setState(prevState => {
            let temp = state.grupe
            let help = state.animatori
            while(temp.length > 0){
                temp.pop()
            }
            while(help.length > 0){
                help.pop()
            }
            return ({
            ...prevState,
            ime: props.activity[0].ime_aktivnost,
            grupe: temp,
            animatori: help,
            datum: "",
        })})
    }

    if(Cookies.get('korisnik') === undefined || Cookies.getJSON('korisnik').statusKorisnik !== 'organizator'){
        return <Redirect to='/' />
    }

    if(props.activity === undefined){
        return <Redirect to='/' />
    }

    const activities = Array.from(props.activity);

    return (
        <div className='everything'>
            <h1 className="naslovi general-text">Dodaj aktivnost u raspored</h1>
            <p className='general-text' hidden={!message}>{message}</p>
            <form  onSubmit={onSubmit}>
                <label className="general-text" htmlFor="ime">Ime aktivnosti: </label>
                <select className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
                required  name="ime" value={state.ime}>
                    {activities.map((activity) => 
                            <option key={activity.id_aktivnost} id={activity.id_aktivnost} value={activity.ime_aktivnost}>{activity.ime_aktivnost}</option>
                    )}
                </select>
                <h5 className='general-text for-checkboxes'>Izaberite grupe</h5>
                {data.grupe.map((grupa) => {
                    return (<div className='checkboxes'>
                        <label className="general-text" htmlFor={grupa.ime_grupa}>{grupa.ime_grupa}: </label>
                        <input className="bg-dark pt-3 pb-3 text-white" onClick={onChangeCheck1} id={grupa.ime_grupa}
                         type="checkbox" checked={isSelected.grupe[grupa.id_grupa]} name={grupa.ime_grupa} value={grupa.id_grupa} />
                    </div>)
                })}
                <h5 className='general-text for-checkboxes'>Izaberite animatore</h5>
                {data.animatori.map((animator) => {
                    return (<div className='checkboxes'>
                        <label className="general-text" htmlFor={animator.korisnicko_ime}>{animator.ime} {animator.prezime}: </label>
                        <input className="bg-dark pt-3 pb-3 text-white" onClick={onChangeCheck2} id={animator.korisnicko_ime}
                         type="checkbox" checked={isSelected.animatori[animator.korisnicko_ime]} name={animator.korisnicko_ime} value={animator.korisnicko_ime} />
                    </div>)
                })}                
                <label className="general-text" htmlFor="datum">Vrijeme održavanja aktivnosti: </label>
                <input className="bg-dark pt-3 pb-3 text-white" onChange={onChangeDate} 
                required type="datetime-local" name="datum" value={state.datum} size="50"/>
                <input className="bg-dark text-white"
                type="submit" name="submit" placeholder="Submit" />
                <input className="bg-dark text-white" onClick={handleReset}
                type="reset" name="res" placeholder="Reset" />
            </form>
        </div>
    );
  }
  
  export default AddSchedule;