import React from 'react';
import logoImg from '../../assets/aarbakke-logo.png';
import './Logo.css';

type Props = {
  hide: boolean;
};

const Logo: React.FC<Props> = ({ hide }: Props) => {
  return !hide ? (
    <div className="Logo">
      <img src={logoImg} alt="" />
    </div>
  ) : null;
};

export default Logo;
