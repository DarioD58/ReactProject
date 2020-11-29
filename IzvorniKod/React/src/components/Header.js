import React from 'react';

function Header() {
  const [state, setState] = React.useState({
    ime: "",
    vrijeme: "",
  });

  React.useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('http://localhost:5000/')
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      setState(prevState => ({
        ...prevState,
        ime: data.kamp,
        vrijeme: data.pocetak_kamp
    }))
    });
  }, []);

  return (
      <header id="header" className="container-fluid bg-dark pt-3 pb-3">
        <img src=".\slike\logo.png" alt="Slika kampa" className="rounded-circle mx-auto d-block"/>
        <p className="kamp-title">
          {state.ime}
        </p>
      </header>
    );
  }
  
  export default Header;