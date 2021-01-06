import React from 'react'
import Group from '../components/Group';
import Osoba from '../components/Osoba';
import Cookies from 'js-cookie'

function Groups() {
    const [grupe, setGrupe] = React.useState([])

    const [clanovi, setClanovi] = React.useState([])

    const [animatori, setAnimatori] = React.useState([])

    React.useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch("./grupe", {
            credentials: 'include',
            method: 'GET',
        })
        .then(response => response.json())
        .then((data) => {
        setGrupe(
          data.grupa
        );
        setClanovi(
            data.clanovi
        );
        setAnimatori(
            data.animatori
        );
        }).catch((error) => {
            console.log(error);
        });
      }, []);

    if(grupe === undefined){
        if((Cookies.getJSON('korisnik').statusKorisnik == 'animator') || (Cookies.getJSON('korisnik').statusKorisnik == 'korisnik')){
            return (
            <div className='application-section'>
                <div className="general-text text-center application-header">NEMA GRUPA ZA PRIKAZATI PRICEKAJTE DA SE FORMIRAJU GRUPE</div>
                <p className='general-text text-center application-header'>Organizator je u procesu stvaranja grupa pricekajte jos malo</p>
            </div>
            )
            }else{
                return(
                    <div className ="general-text text-center application-header">OVO JE STRANICA SAMO ZA SUDIONIKE I ANIMATORE</div>
                );
            }
    }
    if(Cookies.getJSON('korisnik').statusKorisnik == 'animator'){
        return (
        <div className='application-section'>
            <div className="general-text text-center application-header">GRUPE S SUDIONICIMA I NJIHOVI KONTAKTI</div>
            {grupe.map((grupa) => <Group key={grupa.id_grupa} grupa={grupa} clanovi={clanovi} />) 
            }
            <div className="general-text text-center activity-header">ANIMATORI KONTAKT</div>
                <div className="activites text-light">
                    <div className='aktivnosti'>
                        <h3>Ime i Prezime</h3>
                        <h3>Email</h3>
                        <h3>Broj telefona</h3>
                    </div>
                    {animatori.map((animator) => <Osoba osoba={animator}/>)}
            </div>
        </div>
        );
    }else if(Cookies.getJSON('korisnik').statusKorisnik == 'korisnik'){
        return(
            <div className='application-section'>
                <div className="general-text text-center application-header">INFO O VASOJ GRUPI</div>
                {grupe.map((grupa) => <Group key={grupa.id_grupa} grupa={grupa} clanovi={clanovi} />)}
                <div className="general-text text-center activity-header">ANIMATORI KONTAKT</div>
                <div className="activites text-light">
                    <div className='aktivnosti'>
                        <h3>Ime i Prezime</h3>
                        <h3>Email</h3>
                        <h3>Broj telefona</h3>
                    </div>
                    {animatori.map((animator) => <Osoba osoba={animator}/>)}
            </div>
            </div>
        );
    }else{
        return(
            <div className ="general-text text-center application-header">OVO JE STRANICA SAMO ZA SUDIONIKE I ANIMATORE</div>);
    }
}

export default Groups;