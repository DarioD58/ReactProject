import React from 'react';
import Activities from './Activities';

function Activity(props){
    const {id_aktivnost, ime_aktivnost, opis_aktivnost, trajanje_aktivnost_h, tip_aktivnosti} = props.activity;
    return (
        <div>
            {id_aktivnost} {ime_aktivnost} {opis_aktivnost} {trajanje_aktivnost_h}
        </div>
    );
}
export default Activity