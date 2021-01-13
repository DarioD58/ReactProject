import React from 'react'
import Application from '../components/Application'

function Applications() {
    const [applications, setApplications] = React.useState([])

    const [filter, setFilter] = React.useState('sudionik')

    const [refresh, setRefresh] = React.useState(false)

    React.useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch("./api/prijave", {
            credentials: 'include',
            method: 'GET',
        })
        .then(response => response.json())
        .then((data) => {
        setApplications(
          data.prijave
        );
        }).catch((error) => {
            console.log(error);
        });
      }, [refresh]);

    function onClick(e){
        setFilter(e.target.id)
    }

    function onRefresh(){
        setRefresh(!refresh)
    }


    if(applications ===undefined || applications.length === 0){
        return (
        <div className='everything'>
            <div className='application-section'>
                <div className="general-text text-center application-header">PRIJAVE ZA KAMP</div>
                <button className='buttons' onClick={onRefresh}>Osvježi</button>
                <p className='general-text text-center application-header'>Trenutno nema aktivnih prijava za kamp.</p>
            </div>
        </div>
        )
    }


    return (
    <div className='everything'>
        <div className='application-section'>
            <div className="general-text text-center application-header">PRIJAVE ZA KAMP</div>
            <button className='buttons' onClick={onRefresh}>Osvježi</button>
            <div className='button-group'>
                <button id='sudionik' className='buttons' onClick={onClick}>Sudionici</button>
                <button id='animator' className='buttons' onClick={onClick}>Animatori</button>
            </div>
            {Array.from(applications).map((application) => {
                                if(application.status_korisnik === filter){
                                    return <Application key={application.id_prijava} application={application} update={setRefresh}/>
                                }
        })}
        </div>
    </div>
    );
}

export default Applications;