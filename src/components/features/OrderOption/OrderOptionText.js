import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';

const OrderOptionText = ({name, setOptionValue}) => (
  <div className={styles.component}>
    <input 
      className={styles.input}
      type="text"
      onChange={event => setOptionValue(event.currentTarget.value)}
      placeholder={name}
    >
    </input>
  </div>
);

OrderOptionText.propTypes = {
  name: PropTypes.string,
  setOptionValue: PropTypes.func,
};

export default OrderOptionText;