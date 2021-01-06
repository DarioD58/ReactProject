import React, { useEffect } from 'react';

function RearangeGroups(props){
    const [groups, setGroups] = React.useState([])
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


    return (
        <div className='aktivnosti'>
          <p>Nešto</p>
        </div>
    );
}
export default RearangeGroups;