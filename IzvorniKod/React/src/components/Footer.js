import React from 'react';
import {ReactComponent as FER} from '../slike/FER_logo_1.svg'

function Footer(props) {
    return (
      <footer id ="footer" className="container-fluid bg-dark pt-3 pb-3 text-white">
        <p className="float-left">U slučaju dodatnih pitanja obratite nam se na email adresu kampa: {props.email}</p>
        <div className='footer-logo-container'>
          <p>POWERED BY</p>
          <FER className="footer-logo"/>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  