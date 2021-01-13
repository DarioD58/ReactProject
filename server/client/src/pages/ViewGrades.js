import React from 'react';
import Grade from '../components/Grade';

const ViewGrades = () => {
    const [grades, setGrades] = React.useState([])

    React.useEffect(() => {
        fetch("./aktivnost/ocjene", {
            credentials:'include',
            method:'GET'
        })
        .then(response => response.json())
        .then((res) => {
            if(res.error !== undefined){
                throw new Error(res.error);
            }
            setGrades(
                res.podaci
            )
        }).catch((error) => {
            console.log(error);
        });
    }, [])

    /*const onChange = (e) => {
        let {id , value} = e.target 
        id = e.target.name  
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const onChange1 = (e) => {
        let {id , value} = e.target 
        id = e.target.name  
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const onChange2 = (e) => {
        let {id , value} = e.target 
        id = e.target.name  
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }*/

    return (
        <div className='everything-start'>
            <h1 className='general-text'>OCJENE AKTIVNOSTI</h1>
            <div className='triple-containers'>
                <div className='grades-title-container'>
                    <h3 className='general-text'>Aktivnost</h3>
                    <h3 className='general-text'>Ocjena</h3>
                    <h3 className='general-text'>Dojam</h3>
                    <h3 className='general-text'>Korisnik</h3>
                </div>
                {grades.map((grade) => {
                    return <Grade grade={grade}/>
                })}
            </div>
        </div>
    );
}
 
export default ViewGrades;