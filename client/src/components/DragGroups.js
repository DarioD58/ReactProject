import React from 'react';
import DragOsoba from './DragOsoba'

const DragGroups = (props) => {
    const switchColor = (clan) => {
        for(let i = 0; i < props.cijelaGrupa.length; i++){
            if(clan.korisnicko_ime !== props.cijelaGrupa[i].korisnicko_ime  && clan.id_grupa == props.cijelaGrupa[i].id_grupa){
                document.getElementById(props.cijelaGrupa[i].korisnicko_ime).style.backgroundColor = '#343a40'
            }
        }
    }

    return (<div className='groups-drag-box'>
        <p className='general-text'>{props.ime_grupa}</p>
        {props.cijelaGrupa.map(clan => {
            if(clan.id_grupa === props.id_grupa){
                return <DragOsoba key={clan.korisnicko_ime} switch={switchColor} swap={props.isSwapped} clan={clan}/>
            }
        })}
    </div>);
}
 
export default DragGroups;