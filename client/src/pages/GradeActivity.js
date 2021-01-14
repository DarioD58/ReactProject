import Cookies from 'js-cookie'
import React from 'react';
import ActivityGrade from '../components/ActivityGrade';

function GradeActivity(){
    const [aktivnosti, setAktivnosti] = React.useState([])

    const [isGraded, setIsGraded] = React.useState(false)

    React.useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch("/api/korisnik/aktivnosti", {
            credentials: 'include',
            method: 'GET'
        })
        .then(response => response.json())
        .then((data) => {
        if(data.error !== undefined){
            throw new Error(data.error);
        }
        setAktivnosti(
            data.aktivnosti
        );
        }).catch((error) => {
                console.log(error);
            });
      }, [isGraded]);

    function gradeGiven(){
        setIsGraded(!isGraded)
    }

    if(Cookies.get('korisnik') === undefined || Cookies.getJSON('korisnik').statusKorisnik !== 'animator'
    || Cookies.getJSON('korisnik').statusKorisnik !== 'sudionik'){
        return <Redirect to='/' />
    }

    if(aktivnosti === undefined){
        return(
            <div className='application-section'>
                <div className="general-text text-center application-header">OCIJENITE AKTIVNOSTI</div>
                <p className='general-text'>Niste sudjelovali ni na jednoj aktivnosti</p>
            </div>
        );
    } 

    return(
        <div className='application-section'>
            <div className="general-text text-center application-header">OCIJENITE AKTIVNOSTI</div>              
                <div className='aktivnosti3'>
                    <h3 className='general-text'>Aktivnost</h3>
                    <h3 className='general-text'>Ocjena</h3>
                    <h3 className='general-text'>Dojam</h3>
                </div>
                {aktivnosti.map((aktivnost) => <ActivityGrade key={aktivnost.id_aktivnost} grade={gradeGiven} aktivnost={aktivnost}/>)}
        </div>
    );
}
export default GradeActivity;