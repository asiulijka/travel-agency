import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const OrderOptionDate = ({setOptionValue, currentValue}) => {
  const startDate = currentValue == '' ? new Date() : currentValue;
  return (
    <div className={styles.component}>
      <DatePicker selected={startDate} onChange={(date) => setOptionValue(date)} />
    </div>
  );
};

OrderOptionDate.propTypes = {
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.string,
};

export default OrderOptionDate;