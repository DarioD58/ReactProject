import React, { useEffect } from 'react';
import Grade from '../components/Grade';
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

const ViewGrades = () => {
    const [grades, setGrades] = React.useState([])

    const [userFilter, setUserFilter] = React.useState({
        user: [],
        state: ""
    })

    const [groupsFilter, setGroupsFilter] = React.useState({
        groups: [],
        state: ""
    })

    const [activitiesFilter, setActivitiesFilter] = React.useState({
        activities: [],
        state: ""
    })

    React.useEffect(() => {
        fetch("/api/aktivnost/ocjene", {
            credentials:'include',
            method:'GET'
        })
        .then(response => response.json())
        .then((res) => {
            let temp1 = new Set()
            let temp2 = new Set()
            let temp3 = new Set()
            if(res.error !== undefined){
                throw new Error(res.error);
            }
            setGrades(
                res.podaci
            )
            for(let i = 0; i < res.podaci.length; i++){
                temp1.add(res.podaci[i].korisnicko_ime)
                temp2.add(res.podaci[i].grupa)
                temp3.add(res.podaci[i].aktivnost)
            }
            setUserFilter(prevState => ({
                ...prevState,
                user: Array.from(temp1)
            }))
            setGroupsFilter(prevState => ({
                ...prevState,
                groups: Array.from(temp2)
            }))
            setActivitiesFilter(prevState => ({
                ...prevState,
                activities: Array.from(temp3)
            }))
        }).catch((error) => {
            console.log(error);
        });
    }, [])

    const onChange = (e) => {
        let {id , value} = e.target 
        id = e.target.name 
        console.log(e.target.value) 
        setUserFilter(prevState => ({
            ...prevState,
            state : value
        }))
    }

    
    const onChange1 = (e) => {
        let {id , value} = e.target 
        id = e.target.name  
        setGroupsFilter(prevState => ({
            ...prevState,
            state : value
        }))
    }

    
    const onChange2 = (e) => {
        let {id , value} = e.target 
        id = e.target.name  
        setActivitiesFilter(prevState => ({
            ...prevState,
            state : value
        }))
    }

    if(Cookies.get('korisnik') === undefined){
        return <Redirect to='/' />
    }

    if(Cookies.getJSON('korisnik').statusKorisnik !== 'organizator'){
        return <Redirect to='/' />
    }


    return (
        <div className='everything-start'>
            <h1 className='general-text'>OCJENE AKTIVNOSTI</h1>
            <div className='triple-containers-nogap'>
                <p className='general-text'>Korisnik</p>
                <p className='general-text'>Grupe</p>
                <p className='general-text'>Aktivnosti</p>
                <select className="general-text" onChange={onChange} name="user" value={userFilter.state}>
                    <option value="">--</option>
                    {userFilter.user.map((usr) => {
                        return <option value={usr}>{usr}</option> 
                    })}
                </select>
                <select className="general-text" onChange={onChange1} name="group" value={groupsFilter.state}>
                    <option value="">--</option>
                    {groupsFilter.groups.map((group) => {
                        return <option value={group}>{group}</option> 
                    })}
                </select>
                <select className="general-text" onChange={onChange2} name="activities" value={activitiesFilter.state}>
                    <option value="">--</option>
                    {activitiesFilter.activities.map((activity) => {
                        return <option value={activity}>{activity}</option> 
                    })}
                </select>
            </div>
            <div className='triple-containers'>
                <div className='grades-title-container'>
                    <h3 className='general-text'>Aktivnost</h3>
                    <h3 className='general-text'>Ocjena</h3>
                    <h3 className='general-text'>Dojam</h3>
                    <h3 className='general-text'>Korisnik</h3>
                </div>
                {grades.map((grade) => {
                    if(userFilter.state === grade.korisnicko_ime && groupsFilter.state === grade.grupa && activitiesFilter.state === grade.aktivnost){
                        console.log(1)
                        return <Grade grade={grade}/>
                    } else if(userFilter.state === grade.korisnicko_ime && groupsFilter.state === "" && activitiesFilter.state === ""){
                        console.log(2)
                        return <Grade grade={grade}/>
                    } else if(userFilter.state === "" && groupsFilter.state === grade.grupa && activitiesFilter.state === ""){
                        console.log(3)
                        return <Grade grade={grade}/>
                    } else if(userFilter.state === "" && groupsFilter.state === "" && activitiesFilter.state === grade.aktivnost){
                        console.log(4)
                        return <Grade grade={grade}/>
                    } else if(userFilter.state === grade.korisnicko_ime && groupsFilter.state === grade.grupa && activitiesFilter.state === ""){
                        console.log(5)
                        return <Grade grade={grade}/>
                    } else if(userFilter.state === grade.korisnicko_ime && groupsFilter.state === "" && activitiesFilter.state === grade.aktivnost){
                        console.log(6)
                        return <Grade grade={grade}/>
                    } else if(userFilter.state === "" && groupsFilter.state === grade.grupa && activitiesFilter.state === grade.aktivnost){
                        console.log(7)
                        return <Grade grade={grade}/>
                    } else if(userFilter.state === "" && groupsFilter.state === "" && activitiesFilter.state === ""){
                        return <Grade grade={grade}/>
                    }
                })}
            </div>
        </div>
    );
}
 
export default ViewGrades;