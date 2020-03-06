import React from 'react';
import logoImg from '../../assets/aarbakke-logo.png';
import './BaseLogo.css';

export const BaseLogo = () => (
  <div className="BaseLogo">
    <img src={logoImg} alt="" />
  </div>
);

export default BaseLogo;
