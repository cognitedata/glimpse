// Copyright 2020 Cognite AS
import React, { FC } from 'react';
import logoImg from '../../../assets/aarbakke-logo.png';
import './BaseLogo.css';

/**
 * This is logo used to display middle of the screen
 */
const BaseLogo: FC = () => (
  <div className="BaseLogo">
    <img src={logoImg} alt="Base Logo" />
  </div>
);

export default BaseLogo;
