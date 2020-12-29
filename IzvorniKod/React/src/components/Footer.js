import React from 'react';

function Footer(props) {
    return (
      <footer id ="footer" className="container-fluid bg-dark pt-3 pb-3 text-white">
        <p className="float-left">Email kampa: {props.email}</p>
      </footer>
    );
  }
  
  export default Footer;
  