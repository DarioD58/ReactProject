import React from 'react';
import Logout from './Logout'

function Header(props) {

  if(props.logged == 'true'){
    return (
        <header id="header" className="container-fluid bg-dark pt-3 pb-3">
          <img src=".\slike\logo.png" alt="Slika kampa" className="rounded-circle mx-auto d-block"/>
          <p className="kamp-title">
            KAMP MLADE NADE
          </p>
          <Logout setSession={props.setSession}/>
        </header>
      );
  }
  return (
    <header id="header" className="container-fluid bg-dark pt-3 pb-3">
      <img src=".\slike\logo.png" alt="Slika kampa" className="rounded-circle mx-auto d-block"/>
      <p className="kamp-title">
        KAMP MLADE NADE
      </p>
    </header>
  );
}
  
  export default Header;