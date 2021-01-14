import React from 'react';

const DragOsoba = (props) => {
    const handleClick = (e) =>{
        props.swap(props.clan)
        document.getElementById(e.target.id).style.backgroundColor = 'green'
        props.switch(props.clan)
    }

    return (<div className='groups-box other-text' id={props.clan.korisnicko_ime} onClick={handleClick}>
        {props.clan.ime} {props.clan.prezime}
    </div>
    );
}
 
export default DragOsoba;