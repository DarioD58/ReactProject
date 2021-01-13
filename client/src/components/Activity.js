import React from 'react';

function Activity(props){
    const {ime_aktivnost, opis_aktivnost, trajanje_aktivnost_h} = props.activity;
    return (
        <div className='aktivnosti'>
            <p>{ime_aktivnost}</p>
            <p>{opis_aktivnost}</p>
            <p>{trajanje_aktivnost_h}</p>
        </div>
    );
}
export default Activity