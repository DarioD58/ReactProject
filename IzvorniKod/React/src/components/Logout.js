import React from 'react';
import { useHistory } from "react-router-dom";

function Logout(props){
    let history = useHistory();

    const handleLogout = () => {
        fetch('http://localhost:5000/logout')
        .then((response) => {
            localStorage.setItem("isLoggedIn", false);
            localStorage.setItem("user", undefined);
            localStorage.setItem("role", undefined);
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