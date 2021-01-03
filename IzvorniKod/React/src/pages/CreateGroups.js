import React from 'react'
import {Link} from 'react-router-dom'

function CreateGroup() {
    const [groups, setGroups] = React.useState([])

    const [numberOfParticipants, setNumberOfParticipants] = React.useState(0)

    const [numberOfGroups, setNumberOfGroups] = React.useState(0)

    const [isSent, setIsSent] = React.useState(false)

    const [message, setMessage] = React.useState("")

    React.useEffect(() => {
        fetch("./grupe", {
            credentials:'include',
            method:'GET'
        })
        .then(response => response.json())
        .then((res) => {
            if(res.error != undefined){
                throw new Error(res.error);
            }
            if(res.grupeSClanovima === undefined){
                setNumberOfParticipants(res.brojSudionika)
            } else {
                setGroups(
                    ...groups,
                    res.grupeSClanovima
                )
            }
        }).catch((error) => {
            console.log(error);
        });
    }, [])

    const onSubmit = (e) => {
        let objekt = JSON.stringify(numberOfGroups);
        fetch("./grupe", {
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
            setMessage(res.poruka)
            setIsSent(true)
        }).catch((error) => {
            console.log(error);
            setNumberOfGroups(0)
        });
    }

    const onChange = (e) => {
        let {id , value} = e.target 
        id = e.target.name  
        setNumberOfGroups(prevState => ({
            ...prevState,
            [id] : value
        }))
    }


    if(numberOfGroups === 0){
        return (
            <div className='everything'>
                <p>Grupe su već dodjeljene!</p>
                <p>Možete ih pregledati i premjestiti sudionike</p>
                <Link to={{
                    pathname:'/viewgroups',
                    groups: groups
                }}><button>Pregled grupa</button></Link>
            </div>
        )
    }

    return (
        <div className='everything'>
            <h3>Raspoređivanje grupa</h3>
            <p>Grupe za kamp ne postoje. Rasporedite {numberOfParticipants} sudionika u grupe!`</p>
            <form onSubmit={onSubmit}>
                <input type='number' value={numberOfGroups} onChange={onChange} hidden={isSent} disabled={isSent}
                 name='nmbr_grupa' placeholder='0' min='1' max={numberOfParticipants}/>
                <label for='nmbr_grupa' hidden={isSent} >Unesite broj grupa</label>
                <input type='submit' hidden={isSent} disabled={isSent}>Rasporedi</input>
            </form>
            <p hidden={!isSent}>{message}</p>
        </div>
    );
}

export default CreateGroup;