import React from 'react';
import { useHistory } from "react-router-dom";

function Logout(){
    let history = useHistory();

    const handleLogout = () => {
        sessionStorage.setItem("isLoggedIn", false)
        history.push('/');
    }

    return (
        <button className='text-black' onClick={handleLogout}>Odjavi se!</button>
    );
}

export default Logout;