import React from 'react';
import {Link} from 'react-router-dom';

function NotButton(){
    return (
        <div>
            <Link to='/application'>
                <div className="login-not-button text-light">Registriraj se</div>
            </Link>
            <div className="text-light center text-center">Već si registriran, <Link className='text-white' to='login'><u>prijavi se!</u></Link></div>
        </div>
    );
}
export default NotButton;