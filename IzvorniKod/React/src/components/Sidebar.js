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

  console.log(props)

  if(props.kamp.ime === undefined && props.logged === "false"){
    return (
      <Menu right isOpen={isOpen.open} onOpen={handleOpen} onClose={handleClose}>
        <Link to='/' onClick={handleClick}>
          <p className="menu-item">
            Početna stranica
          </p>
        </Link>
        <Link to='/login'>
          <p className="menu-item" onClick={handleClick}>
            Prijavi se
          </p>
        </Link>
      </Menu>
    );
  } else if(props.logged === "false" && (props.kamp.aktivne_prijave_sud === "1" || props.kamp.aktivne_prijave_anim === "1")){
    return (
      <Menu right isOpen={isOpen.open} onOpen={handleOpen} onClose={handleClose}>
        <Link to='/'>
          <p className="menu-item" onClick={handleClick}>
            Početna stranica
          </p>
        </Link>
        <Link to='/application'>
          <p className="menu-item" onClick={handleClick}>
            Registriraj se
          </p>
        </Link>
        <Link to='/login'>
          <p className="menu-item" onClick={handleClick}>
            Prijavi se
          </p>
        </Link>
      </Menu>
    );
    }else if(props.logged === "false"){
      return (
      <Menu right isOpen={isOpen.open} onOpen={handleOpen} onClose={handleClose}>
        <Link to='/' onClick={handleClick}>
          <p className="menu-item">
            Početna stranica
          </p>
        </Link>
        <Link to='/login'>
          <p className="menu-item" onClick={handleClick}>
            Prijavi se
          </p>
        </Link>
      </Menu>
      );
    } else if(props.logged === 'true' && props.kamp.ime === undefined && Cookies.getJSON('korisnik').statusKorisnik === 'organizator'){
      return (
        <Menu right isOpen={isOpen.open} onOpen={handleOpen} onClose={handleClose}>
          <Link to='/' onClick={handleClick}>
            <p className="menu-item">
              Početna stranica
            </p>
          </Link>
          <Link to='/makecamp' onClick={handleClick}>
            <p className="menu-item">
              Stvori kamp
            </p>
          </Link>
        </Menu>
        );
    } else if(props.logged === 'true' && props.kamp.status === 0 &&
    (props.kamp.aktivne_prijave_sud === "1" || props.kamp.aktivne_prijave_anim === "1")
     && Cookies.getJSON('korisnik').statusKorisnik === 'organizator'){
      return (
        <Menu right isOpen={isOpen.open} onOpen={handleOpen} onClose={handleClose}>
          <Link to='/' onClick={handleClick}>
            <p className="menu-item">
              Početna stranica
            </p>
          </Link>
          <Link to='/makeactivity' onClick={handleClick}>
            <p className="menu-item">
              Stvori aktivnosti
            </p>
          </Link>
          <Link to='/applications' onClick={handleClick}>
            <p className="menu-item">
              Pregledaj prijave
            </p>
          </Link>
        </Menu>
        );
    } else if(props.logged == 'true' && props.kamp.status === 0 
    && props.kamp.pocetak_prijava_sud !== undefined && Cookies.getJSON('korisnik').statusKorisnik === 'organizator'){
      return (
        <Menu right isOpen={isOpen.open} onOpen={handleOpen} onClose={handleClose}>
          <Link to='/' onClick={handleClick}>
            <p className="menu-item">
              Početna stranica
            </p>
          </Link>
          <Link to='/makeactivity' onClick={handleClick}>
            <p className="menu-item">
              Stvori aktivnosti
            </p>
          </Link>
          <Link to='/addactivity' onClick={handleClick}>
            <p className="menu-item">
              Dodaj aktivnosti u raspored
            </p>
          </Link>
          <Link to='/creategroups' onClick={handleClick}>
            <p className="menu-item">
              Stvori grupe
            </p>
          </Link>
          <Link to='/applications' onClick={handleClick}>
            <p className="menu-item">
              Pregledaj prijave
            </p>
          </Link>
        </Menu>
        );
    } else if(props.logged == 'true' && props.kamp.status === 0 
             && Cookies.getJSON('korisnik').statusKorisnik === 'organizator'){
      return (
        <Menu right isOpen={isOpen.open} onOpen={handleOpen} onClose={handleClose}>
          <Link to='/' onClick={handleClick}>
            <p className="menu-item">
              Početna stranica
            </p>
          </Link>
          <Link to='/makecamp' onClick={handleClick}>
            <p className="menu-item">
              Stvori kamp
            </p>
          </Link>
          <Link to='/viewgrades' onClick={handleClick}>
            <p className="menu-item">
              Pregledaj ocjene aktivnosti
            </p>
          </Link>
        </Menu>
      );
  } else if(props.logged == 'true' && props.kamp.status === 1 
   && Cookies.getJSON('korisnik').statusKorisnik === 'organizator'){
    return (
      <Menu right isOpen={isOpen.open} onOpen={handleOpen} onClose={handleClose}>
        <Link to='/' onClick={handleClick}>
          <p className="menu-item">
            Početna stranica
          </p>
        </Link>
        <Link to='/viewgroups' onClick={handleClick}>
          <p className="menu-item">
            Pregledaj grupe
          </p>
        </Link>
        <Link to='/viewgrades' onClick={handleClick}>
          <p className="menu-item">
            Pregledaj ocjene aktivnosti
          </p>
        </Link>
      </Menu>
    );
  } else if(props.logged == 'true' && props.kamp.status === 0 && props.kamp.pocetak_prijava_sud !== undefined){
    return ( 
      <Menu right isOpen={isOpen.open} onOpen={handleOpen} onClose={handleClose}>
        <Link to='/' onClick={handleClick}>
          <p className="menu-item">
            Početna stranica
          </p>
        </Link>
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
        <Link to='/calendar' onClick={handleClick}>
          <p className="menu-item">
            Raspored
          </p>
        </Link>
        <Link to='/mygroups' onClick={handleClick}>
          <p className="menu-item">
            Moje grupe
          </p>
        </Link>
        <Link to='/activitygrade' onClick={handleClick}>
          <p className="menu-item">
            Moje aktivnosti
          </p>
        </Link>
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
      <Link to='/login'>
        <p className="menu-item" onClick={handleClick}>
          Prijavi se
        </p>
      </Link>
    </Menu>
  );
};