import React, { FC } from 'react';
import './CogniteLogo.css';
import cogniteLogo from '../../../assets/cognite-logo.svg';

type Props = {
  width?: string;
};

const CogniteLogo: FC<Props> = ({ width = '50px' }: Props) => {
  return (
    <div className="CogniteLogo">
      <img
        src={cogniteLogo}
        alt="Cognite Logo"
        title="Cognite"
        style={{ width }}
      />
    </div>
  );
};

export default CogniteLogo;
