import React from 'react';
import { useHistory } from "react-router-dom";
import Activity from './Activity';

function Activities(props){
    const activities = props.activities;
    console.log(activities)
    /*const activities = [
        {id_aktivnost:1, ime_aktivnost:'Dorucak', opis_aktivnost:'Dorucak za samoposluznim stolom', trajanje_aktivnost_h:1, tip_aktivnosti: 'nesto'},
        {id_aktivnost:2, ime_aktivnost:'Rucak', opis_aktivnost:'Rucak za samoposluznim stolom', trajanje_aktivnost_h:1, tip_aktivnosti:''},
        {id_aktivnost:3, ime_aktivnost:'Vecera', opis_aktivnost:'Vecera bez samoposluznog stola', trajanje_aktivnost_h:1, tip_aktivnosti:'nichts'},
        {id_aktivnost:4, ime_aktivnost:'Boks', opis_aktivnost:'Razvoj kompetitivnog duha', trajanje_aktivnost_h:1, tip_aktivnosti:''}
    ]*/
    if(activities === undefined){
        return (
            <div>
            <div className="text-black text-center activity-header">MOJE AKTIVNOSTI</div>
            <div className="activites text-light">
            <div className='aktivnosti'>
                <h3>Naziv</h3>
                <h3>Opis</h3>
                <h3>Trajanje</h3>
            </div>
            </div>
            </div>
        );
    }

    return (
        <div>
        <div className="text-black text-center activity-header">MOJE AKTIVNOSTI</div>
        <div className="activites text-light">
        <div className='aktivnosti'>
            <h3>Naziv</h3>
            <h3>Opis</h3>
            <h3>Trajanje</h3>
        </div>
            {activities.map(activity => <Activity key={activity.id_aktivnost} activity={activity}/>)}
        </div>
        </div>
    );

}
export default Activities;