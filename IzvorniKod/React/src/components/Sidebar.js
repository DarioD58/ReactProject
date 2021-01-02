import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie'

export default props => {
  const [isOpen, setIsOpen] = React.useState({
    open: false
  })

  const handleClick = () => {
    setIsOpen(prevState => ({
      ...prevState,
      open: false
    }))
  }

  const handleOpen = () => {
    setIsOpen(prevState => ({
      ...prevState,
      open: true
    }))
  }

  const handleClose = () => {
    setIsOpen(prevState => ({
      ...prevState,
      open: false
    }))
  }

  if(props.logged == 'true' && Cookies.getJSON('korisnik').statusKorisnik == 'organizator'){
    return (
      <Menu right isOpen={isOpen.open} onOpen={handleOpen} onClose={handleClose}>
        <Link to='/' onClick={handleClick}>
          <p className="menu-item">
            Početna stranica
          </p>
        </Link>
        <Link to='/makecamp' onClick={handleClick}>
          <p className="menu-item">
            Stvori novi kamp
          </p>
        </Link>
        <Link to='/makeactivity' onClick={handleClick}>
          <p className="menu-item">
            Stvori novu aktivnost
          </p>
        </Link>
        <p className="menu-item">
          Moj profil
        </p>
      </Menu>
    );
  } else if(props.logged == 'true'){
    return (
      <Menu right isOpen={isOpen.open} onOpen={handleOpen} onClose={handleClose}>
        <Link to='/' onClick={handleClick}>
          <p className="menu-item">
            Početna stranica
          </p>
        </Link>
        <p className="menu-item">
          Moj profil
        </p>
        <p className="menu-item">
          Moja grupa
        </p>
        <p className="menu-item">
          Kontakt
        </p>
      </Menu>
    );
  }
  return (
    <Menu right isOpen={isOpen.open} onOpen={handleOpen} onClose={handleClose}>
      <Link to='/'>
        <p className="menu-item" onClick={handleClick}>
          Početna stranica
        </p>
      </Link>
      <p className="menu-item">
        Kontakt
      </p>
    </Menu>
  );
};