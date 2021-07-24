import React from 'react';
import styles from './OrderOption.scss';
// import {name} from '../../../data/pricing.json';
import PropTypes from 'prop-types';
import OrderOptionDropdown from './OrderOptionDropdown';
import OrderOptionIcons from './OrderOptionIcons';
import OrderOptionNumber from './OrderOptionNumber';
import OrderOptionCheckboxes from './OrderOptionCheckboxes';
import OrderOptionText from './OrderOptionText';
import OrderOptionDate from './OrderOptionDate';

const optionTypes = {
  dropdown: OrderOptionDropdown,
  icons: OrderOptionIcons,
  checkboxes: OrderOptionCheckboxes,
  number: OrderOptionNumber,
  text: OrderOptionText,
  date: OrderOptionDate,
};

const OrderOption = ({name, type, id, setOrderOption, ...otherProps}) => {
  const OptionComponent = optionTypes[type];
  if(!OptionComponent){
    return null;
  } else {
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{name}</h3>
        <OptionComponent
          setOptionValue={value => setOrderOption({[id]: value})}
          name={name}
          {...otherProps}
        />
      </div>
    );
  }
};

OrderOptionDropdown.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  setOrderOption: PropTypes.func,
};

export default OrderOption;