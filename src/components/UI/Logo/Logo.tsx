import React, { FC } from 'react';
import logoImg from '../../../assets/aarbakke-logo.png';
import './Logo.css';

type Props = {
  hide?: boolean;
};

/**
 * This component used to show the app logo in the left drawer
 * @param hide - visible status is parameterized
 */
const Logo: FC<Props> = ({ hide }: Props) => {
  return !hide ? (
    <div className="Logo">
      <img src={logoImg} alt="Aarbakke Logo" />
    </div>
  ) : null;
};

export default Logo;
