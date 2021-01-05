import React from 'react';

function Application(props){

    function onClick(e){
        let object = {
            id_prijava: props.application.id_prijava,
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
            <p className='text-dark motivational-letter' >{props.application.ime} {props.application.prezime}</p>
            <p className='text-dark motivational-letter'>MOTIVACIJSKO PISMO</p>
            <p className='text-dark motivational-letter'>{props.application.motivacijsko_pismo}</p>
            <button id='prihvaćena' className='buttons' onClick={onClick}>Prihvati prijavu</button>
            <button id='odbijena' className='buttons' onClick={onClick}>Odbij prijavu</button>
        </div>
    );
}
export default Application