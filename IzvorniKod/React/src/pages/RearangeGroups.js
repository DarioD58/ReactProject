import React, { useEffect } from 'react';

function RearangeGroups(props){
    const [groups, setGroups] = React.useState([])

    useEffect(() => {
        let temp = props
        console.log(temp)
    })


    return (
        <div className='aktivnosti'>
          <p>Nešto</p>
        </div>
    );
}
export default RearangeGroups;