import React from 'react';

const Grade = (props) => {
    return (<div className='grades-container'>
        <p className='other-text'>{props.grade.aktivnost}</p>
        <p className='other-text'>{props.grade.ocjena}</p>
        <p className='other-text'>{props.grade.dojam}</p>
        <p className='other-text'>{props.grade.korisnik_ime} {props.grade.korisnik_prezime}</p>
    </div>);
}
 
export default Grade;