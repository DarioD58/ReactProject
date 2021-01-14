import React from 'react';

function Osoba(props){
    
    
    return(
      <div className='aktivnosti'>
      <p>{props.osoba.ime} {props.osoba.prezime}</p>
      <p>{props.osoba.email}</p>
      <p>{props.osoba.br_tel}</p>
      </div>
    );
}
export default Osoba;