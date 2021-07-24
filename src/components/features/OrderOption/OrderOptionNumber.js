import React from 'react';
import styles from './OrderOption.scss';
import { parseOptionPrice } from '../../../utils/parseOptionPrice';
import { formatPrice } from '../../../utils/formatPrice';
import PropTypes from 'prop-types';

const OrderOptionNumber = ({currentValue, limits, setOptionValue, price, currentCost}) => (
  <div className={styles.numbers}>
    <input type="number" 
      className={styles.inputSmall}
      value={currentValue}
      min={limits.min}
      max={limits.max}
      onChange={event => setOptionValue(event.currentTarget.value)}
    />
    <h2>
      +{formatPrice(parseOptionPrice(currentValue).value*parseOptionPrice(price).value*parseOptionPrice(currentCost).value)}
    </h2>
  </div>
);

OrderOptionNumber.propTypes = {
  currentValue: PropTypes.number,
  limits: PropTypes.object,
  setOptionValue: PropTypes.func,
  price: PropTypes.string,
  currentCost: PropTypes.string,

};

export default OrderOptionNumber;