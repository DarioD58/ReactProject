import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Početna stranica
      </a>
      <a className="menu-item" href="/Moj-profil">
        Moj profil
      </a>
      <a className="menu-item" href="/Moja-grupa">
        Moja grupa
      </a>
      <a className="menu-item" href="/Kontakt">
        Kontakt
      </a>
    </Menu>
  );
};