import React from 'react';
import {Link} from 'react-router-dom';

function NotButton(){
    return (
        <div>
            <Link to='/application'>
                <div className="login-not-button text-white">Registriraj se</div>
            </Link>
            <div className="general-text text-center">Već si registriran, <Link className='general-text' to='login'><u>prijavi se!</u></Link></div>
        </div>
    );
}
export default NotButton;