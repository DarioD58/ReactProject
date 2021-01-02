import React from 'react';
import { useHistory } from "react-router-dom";

function Logout(props){
    let history = useHistory();

    const handleLogout = () => {
        fetch('./logout')
        .then((response) => {
            history.push('/');
            props.setSession('false')
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <button className='logout-button' onClick={handleLogout}>Odjavi se</button>
    );
}

export default Logout;