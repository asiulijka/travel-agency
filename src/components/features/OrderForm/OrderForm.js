import React from 'react';
// import styles from './OrderForm.scss';
import OrderSummary from '../OrderSummary/OrderSummary';
import {Row, Col} from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';

class OrderForm extends React.Component {
  static propTypes = {
    tripCost: PropTypes.string,
    options: PropTypes.object,
    setOrderOption: PropTypes.func,
  }

  render(){
    const {tripCost, options, setOrderOption} = this.props;
    return (
      <Row>
        
        {pricing.map(optionData => (
          <Col key={optionData.id} md={4}>
            <OrderOption key={optionData.id} currentCost={tripCost} currentValue={options[optionData.id]} setOrderOption={setOrderOption} {...optionData} />
          </Col>
        ))}
       
        
        <Col xs={12}>
          <OrderSummary tripCost={tripCost} options={options} />
        </Col>
      </Row>
    );
  }

}

export default OrderForm;