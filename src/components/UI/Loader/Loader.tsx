// Copyright 2020 Cognite AS
import React, { FC } from 'react';
import './Loader.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import BaseLogo from '../BaseLogo/BaseLogo';

/**
 * This is the component used to show main loader
 */
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
