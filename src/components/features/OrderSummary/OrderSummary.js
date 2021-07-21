import React from 'react';
import styles from './OrderSummary.scss';
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';
import PropTypes from 'prop-types';

class OrderSummary extends React.Component {
  static propTypes = {
    tripCost: PropTypes.string,
    options: PropTypes.object,
  }

  render () {
    const {tripCost, options} = this.props;
    return (
      <h2 className={styles.component}>
        Total: <strong>{formatPrice(calculateTotal(tripCost, options))}</strong>
      </h2>
    );
  }
}

export default OrderSummary;