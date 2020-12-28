import React from 'react';
import Logout from './Logout'

function Header(props) {

  if(props.logged == 'true'){
    return (
        <header id="header" className="container-fluid bg-dark pt-3 pb-3">
          <p className="kamp-title">
            KAMP MLADE NADE
          </p>
          <img src=".\slike\logo.png" alt="Slika kampa" className="rounded-circle mx-auto d-block"/>
          <Logout/>
        </header>
      );
  }
  return (
    <header id="header" className="container-fluid bg-dark pt-3 pb-3">
      <p className="kamp-title">
        KAMP MLADE NADE
      </p>
      <img src=".\slike\logo.png" alt="Slika kampa" className="rounded-circle mx-auto d-block"/>
    </header>
  );
}
  
  export default Header;