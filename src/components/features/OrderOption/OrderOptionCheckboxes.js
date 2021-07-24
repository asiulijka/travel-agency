import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';

const newValueSet = (currentValue, id, checked) => {
  if(checked){
    return [
      ...currentValue,
      id,
    ];
  } else {
    return currentValue.filter(value => value != id);
  }
};

const OrderOptionCheckboxes = ({values, currentValue, setOptionValue}) => (
  <div className={styles.checkboxes}>

    {values.map(value =>{
      return (
        <label
          key={value.id}
        >
          <input 
            type="checkbox" 
            value={value.id}
            checked={currentValue.indexOf(value.id) != -1}
            onChange={event => setOptionValue(newValueSet(currentValue, value.id, event.currentTarget.checked))}
          />
          {value.name}
          {value.price}
        </label>
      );
    })}

  </div>
);

OrderOptionCheckboxes.propTypes = {
  currentValue: PropTypes.string,
  values: PropTypes.array,
  setOptionValue: PropTypes.func,
};

export default OrderOptionCheckboxes;