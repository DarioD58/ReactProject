import React from 'react';

function Header() {
    return (
      <header id="header" className="container-fluid bg-dark pt-3 pb-3">
        <img src=".\slike\logo.png" alt="Slika kampa" className="rounded-circle mx-auto d-block"/>
        {/*<p className="kamp-title">
          Kamp mlade nade
    </p>*/}
      </header>
    );
  }
  
  export default Header;