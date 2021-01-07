import React, { useEffect } from 'react';
import DragGroups from '../components/DragGroups';
import {DndContext} from '@dnd-kit/core';

function RearangeGroups(props){
    const [groups, setGroups] = React.useState([])

    const [rearrange, setRearrange] = React.useState({
        select1: false,
        select2: false
    })
    React.useEffect(() => {
        fetch("./grupe", {
            credentials:'include',
            method:'GET'
        })
        .then(response => response.json())
        .then((res) => {
            if(res.error != undefined){
                throw new Error(res.error);
            }
            setGroups(
                ...groups,
                res.grupeSClanovima
            )
        }).catch((error) => {
            console.log(error);
        });
    }, [])

    if(rearrange.select1 === true && rearrange.select2 === true){
        return (
            <DndContext>
                {groups.map((grupaSClanovima) => <DragGroups key={grupaSClanovima.grupa.id_grupa} cijelaGrupa={groups}/>)}
            </DndContext>
        );
    }


    return (
        <div className='double-groups'>
            < div className='groups-container'>
                {groups.map((grupaSClanovima) => {
                    return (
                        <div className='groups-box'>
                            <p className='other-text' key={grupaSClanovima.grupa.id_grupa}>{grupaSClanovima.grupa.ime_grupa}</p>
                        </div>
                    )
                })}
            </div>
            < div className='groups-container'>
                {groups.map((grupaSClanovima) => {
                    return (
                        <div className='groups-box'>
                            <p className='other-text' key={grupaSClanovima.grupa.id_grupa}>{grupaSClanovima.grupa.ime_grupa}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
export default RearangeGroups;