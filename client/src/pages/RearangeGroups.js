import React, { useEffect } from 'react';
import DragGroups from '../components/DragGroups';
import {DndContext} from '@dnd-kit/core';

function RearangeGroups(){
    const [groups, setGroups] = React.useState([])

    const [clanovi, setClanovi] = React.useState([])

    const [rearrange, setRearrange] = React.useState({
        select1: false,
        select2: false,
        select1_id: "",
        select2_id: ""
    })
    const [swap, setSwap] = React.useState({
        swap1: "",
        swap2: ""
    })

    const [isSwapped, setIsSwapped] = React.useState(false)

    React.useEffect(() => {
        fetch("./api/grupe", {
            credentials:'include',
            method:'GET'
        })
        .then(response => response.json())
        .then((res) => {
            if(res.error !== undefined){
                throw new Error(res.error);
            }
            setGroups(
                res.grupe
            )
            setClanovi(
                res.clanovi
            )
        }).catch((error) => {
            console.log(error);
        });
    }, [isSwapped])

    const onClick1 = (e) => {
        if(e.target.id === 'nazad1'){
            setRearrange((prevState) => ({
                ...prevState,
                select1: false,
                select1_id: ""
            }))
        } else {        
            setRearrange((prevState) => ({
            ...prevState,
            select1: true,
            select1_id: e.target.id
            }))
        }
    }

    const onClick2 = (e) => {
        if(e.target.id === 'nazad2'){
            setRearrange((prevState) => ({
                ...prevState,
                select2: false,
                select2_id: ""
            }))
        } else {        
            setRearrange((prevState) => ({
            ...prevState,
            select2: true,
            select2_id: e.target.id
            }))
        }
    }

    const onSwap = () => {
        console.log(swap)
        if(swap.swap1 !== "" && swap.swap2 !== ""){
            let objekt = {
                ...swap,
                id_grupa1: rearrange.select2_id,
                id_grupa2: rearrange.select1_id
            }
            fetch("./grupe/promjeni", {
                credentials:'include',
                method:'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(objekt)
            })
            .then(response => response.json())
            .then((res) => {
                if(res.error !== undefined){
                    throw new Error(res.error);
                }
                setIsSwapped(!isSwapped)
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    const osobaSetSwap = (osoba) => {
        console.log(osoba)
        if(osoba.id_grupa == rearrange.select1_id){
            setSwap(prevState => ({
                ...prevState,
                swap1: osoba.korisnicko_ime
            }))
        } else {
            setSwap(prevState => ({
                ...prevState,
                swap2: osoba.korisnicko_ime
            }))
        }
    }

    const onBack = () => {
        setSwap(() => ({
            swap1: "",
            swap2: "" 
        }))
        setRearrange(() => ({
            select1: false,
            select2: false,
            select1_id: "",
            select2_id: ""
        }))
    }


    if(rearrange.select1 === true && rearrange.select2 === true){
        return (
            <div className='triple-groups'>
                < div className='groups-container'>
                    {groups.map((grupa) => {
                            if((grupa.id_grupa) == rearrange.select1_id)
                                return <DragGroups key={grupa.id_grupa} isSwapped={osobaSetSwap} id_grupa={grupa.id_grupa} ime_grupa={grupa.ime_grupa} cijelaGrupa={clanovi}/>
                    })}
                </div>
                <div className='groups-container'>
                    <button className='buttons swap-button' onClick={onSwap}>Zamjeni</button>
                    <button className='buttons swap-button' onClick={onBack}>Nazad</button>
                </div>
                < div className='groups-container'>
                    {groups.map((grupa) => {
                            if((grupa.id_grupa) == rearrange.select2_id)
                                return <DragGroups key={grupa.id_grupa} isSwapped={osobaSetSwap} id_grupa={grupa.id_grupa} ime_grupa={grupa.ime_grupa} cijelaGrupa={clanovi}/>
                    })}
                </div>
            </div>
        );
    } else if(rearrange.select1 === true && rearrange.select2 === false){
        return (
            <div className='double-groups'>
                < div className='groups-container'>
                    {groups.map((grupa) => {
                            if((grupa.id_grupa) == rearrange.select1_id)
                                return <DragGroups key={grupa.id_grupa} isSwapped={osobaSetSwap} id_grupa={grupa.id_grupa} ime_grupa={grupa.ime_grupa} cijelaGrupa={clanovi}/>
                    })}
                </div>
                < div className='groups-container'>
                    {groups.map((grupa) => {
                        if(grupa.id_grupa != rearrange.select1_id){
                            return (
                                <div className='groups-box other-text' id={grupa.id_grupa} key={grupa.id_grupa} onClick={onClick2}>
                                    {grupa.ime_grupa}
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        );
    } 


    return (
        < div className='groups-container'>
            {groups.map((grupa) => {
                return (
                    <div className='groups-box other-text' id={grupa.id_grupa} key={grupa.id_grupa} onClick={onClick1}>
                        {grupa.ime_grupa}
                    </div>
                )
            })}
        </div>
    );
}
export default RearangeGroups;