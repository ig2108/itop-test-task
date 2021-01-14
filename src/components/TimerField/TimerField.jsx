import React from 'react';
import PropTypes from 'prop-types';

import styles from './TimerField.module.scss';

const TimerField = ({value, label}) => {
  return (
    <div className={styles.field}>
      <span className={styles.field__value}>{value}</span>
      <span className={styles.field__label}>{label}</span>
    </div>
  );
};

TimerField.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TimerField;