import React from 'react';
import Icon from '../../common/Icon/Icon';
import styles from './OrderOption.scss';
import {formatPrice} from '../../../utils/formatPrice';
import PropTypes from 'prop-types';

const OrderOptionIcons = ({values, required, currentValue, setOptionValue}) => (
  <div className={styles.component}>
    
    {required ? '' : (
      <div
        onClick={() => setOptionValue('')}
      >
        <Icon name='times-circle' />
        none
      </div>
    )}
    
    {values.map(value => {
      const fullClass = value.id==currentValue ? `${styles.icon} ${styles.iconActive}` : styles.icon;
      return (
        <div 
          className={fullClass} 
          key={value.id} 
          onClick={() => setOptionValue(value.id)}
        >
          <Icon name={value.icon}/>
          {value.name}
          {formatPrice(value.price)}
        </div>
      );}
    )}

   
  </div>
);

OrderOptionIcons.propTypes = {
  values: PropTypes.array,
  required: PropTypes.bool,
  currentValue: PropTypes.string,
  setOptionValue: PropTypes.func,
};

export default OrderOptionIcons;