import React from 'react';
import Osoba from './Osoba';
function Group(props){


    return (
        <div className='application-section'>
            <div className='general-text text-center activity-header' >{props.grupa.ime_grupa}</div>
            <div className="activites text-light">
                    <div className='aktivnosti'>
                        <h3>Ime i prezime</h3>
                        <h3>Email</h3>
                        <h3>Broj telefona</h3>
                    </div>
                    {props.clanovi.map((osoba) => {
                            if(osoba.id_grupa === props.grupa.id_grupa){
                                return <Osoba key={osoba.korisnicko_ime} osoba={osoba}/>
                            }
                    })}
                </div>
        </div>
    );
}
export default Group;