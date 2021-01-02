import React from 'react';

function Application(props){

    function onClick(e){
        let object = {
            ime: props.application.korisnik_ime,
            prezime: props.application.korisnik_prezime,
            status: e.target.id
        }
        // GET request using fetch inside useEffect React hook
        fetch("./prijave", {
            credentials: 'include',
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(object)
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
        }).catch((error) => {
            console.log(error);
        });;
      }

    return (
        <div className='applications'>
            <p className='text-dark motivational-letter' >{props.application.korisnik_ime} {props.application.korisnik_prezime}</p>
            <p className='text-dark motivational-letter'>MOTIVACIJSKO PISMO</p>
            <p className='text-dark motivational-letter'>{props.application.motivacijsko_pismo}</p>
            <button id='prihvati' className='buttons' onClick={onClick}>Prihvati prijavu</button>
            <button id='odbij' className='buttons' onClick={onClick}>Odbij prijavu</button>
        </div>
    );
}
export default Application