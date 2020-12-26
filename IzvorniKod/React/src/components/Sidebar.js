import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import {Link} from 'react-router-dom';

export default props => {
  let check = localStorage.getItem('role')
  if(props.logged == 'true' && check == 'organizator'){
    return (
      <Menu>
        <Link to='/'>
          <p className="menu-item">
            Početna stranica
          </p>
        </Link>
        <Link to='/makecamp'>
          <p className="menu-item">
            Dodaj novi kamp
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
        <Link to='/calendar'>
        <p calssName="menu-item">
          Kalendar
        </p>
        </Link>
      </Menu>
    );
  } else if(props.logged == 'true'){
    return (
      <Menu>
        <Link to='/'>
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
        <Link to='/calendar'>
        <p calssName="menu-item">
          Kalendar
        </p>
        </Link>
      </Menu>
    );
  }
  return (
    <Menu>
      <Link to='/'>
        <p className="menu-item">
          Početna stranica
        </p>
      </Link>
      <p className="menu-item">
        Kontakt
      </p>
    </Menu>
  );
};