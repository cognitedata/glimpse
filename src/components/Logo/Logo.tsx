import React from 'react';
import logoImg from '../../assets/aarbakke-logo.png';
import './Logo.css';

const Logo = (props: any) => {
  return !props.hide ? (
    <div className="Logo">
      <img src={logoImg} alt="" />
    </div>
  ) : null;
};

export default Logo;
