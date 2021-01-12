import Cookies from 'js-cookie'
import React from 'react';
import ActivityGrade from '../components/ActivityGrade';

function GradeActivity(){
    const [aktivnosti, setAktivnosti] = React.useState([])

    React.useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch("./korisnik/aktivnosti", {
            credentials: 'include',
            method: 'GET'
        })
        .then(response => response.json())
        .then((data) => {
        setAktivnosti(
            data.aktivnosti
        );
        }).catch((error) => {
                console.log(error);
            });
      }, []);

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
                <div className="activites text-light">
                    <div className='ocjenjivanjeAktivnosti2'>
                        <h3>Ativnost</h3>
                        <h3>Ocjena</h3>
                        <h3>Dojam</h3>
                    </div>
                    {aktivnosti.map((aktivnost) => <ActivityGrade aktivnost={aktivnost}/>)}
                </div>
        </div>
    );
}
export default GradeActivity;