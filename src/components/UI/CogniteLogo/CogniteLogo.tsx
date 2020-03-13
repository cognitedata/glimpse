import React, { FC } from 'react';
import './CogniteLogo.css';
import cogniteLogo from '../../../assets/cognite-logo.svg';

type Props = {
  width?: string;
};

/**
 * This component used to show the cognite logo in the left drawer
 *
 * @param width - Logo width is parameterized
 */
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
