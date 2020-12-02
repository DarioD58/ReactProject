import React from 'react';
import { useHistory } from "react-router-dom";

function Logout(){
    let history = useHistory();

    const handleLogout = () => {
        fetch('http://localhost:5000/logout')
        .then((response) => {
            localStorage.setItem("isLoggedIn", false);
            localStorage.setItem("user", undefined);
            localStorage.setItem("role", undefined);
            history.push('/');
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <button className='text-black' onClick={handleLogout}>Odjavi se!</button>
    );
}

export default Logout;