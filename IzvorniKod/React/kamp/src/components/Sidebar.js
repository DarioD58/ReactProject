import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import {Link} from 'react-router-dom';

export default props => {
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
    </Menu>
  );
};