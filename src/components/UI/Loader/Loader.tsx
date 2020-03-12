import React, { FC } from 'react';
import './Loader.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import BaseLogo from '../BaseLogo/BaseLogo';

const Loader: FC = () => {
  return (
    <div className="Loader">
      <LinearProgress />
      <BaseLogo />
      <div className="Loader-Text">Please Wait...</div>
    </div>
  );
};

export default Loader;
