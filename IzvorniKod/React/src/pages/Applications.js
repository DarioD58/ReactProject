import React from 'react'
import Application from '../components/Application'

function Applications() {
    const [applications, setApplications] = React.useState([])

    const [filter, setFilter] = React.useState('sudionik')

    React.useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch("./prijave", {
            credentials: 'include',
            method: 'GET',
        })
        .then(response => response.json())
        .then((data) => {
        console.log(data.prijave)
        setApplications(
          ...applications,
          data.prijave
        );
        }).catch((error) => {
            console.log(error);
        });
      }, []);

    function onClick(e){
        setFilter(e.target.id)
    }

    function updateApplications(application){
        let temp = applications
        for(let i = 0; i < temp.length; i++){
            if(temp[i] === application){
                temp.slice(i, 1)
            }
        }
        setApplications(
            ...applications,
            temp
          )
        console.log(applications)
    }


    if(applications.length === 0){
        return (
        <div className='application-section'>
            <div className="general-text text-center application-header">PRIJAVE ZA KAMP</div>
            <p className='general-text text-center application-header'>Trenutno nema aktivnih prijava za kamp.</p>
        </div>
        )
    }


    return (
    <div className='application-section'>
        <div className="general-text text-center application-header">PRIJAVE ZA KAMP</div>
        <div className='button-group'>
            <button id='sudionik' className='buttons' onClick={onClick}>Sudionici</button>
            <button id='animator' className='buttons' onClick={onClick}>Animatori</button>
        </div>
        {Array.from(applications).map((application) => {
                            if(application.status_korisnik === filter){
                                return <Application key={application.id_prijava} application={application} update={updateApplications}/>
                            }
    })}
    </div>
    );
}

export default Applications;