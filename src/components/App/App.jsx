import React from 'react';
import Timer from '../Timer/Timer';

import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.container}>
      <Timer />
    </div>
  );
};

export default App;