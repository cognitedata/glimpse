import React, { FC } from 'react';
import logoImg from '../../../assets/aarbakke-logo.png';
import './BaseLogo.css';

export const BaseLogo: FC = () => (
  <div className="BaseLogo">
    <img src={logoImg} alt="Base Logo" />
  </div>
);

export default BaseLogo;
