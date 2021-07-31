import React from 'react';
// import styles from './OrderForm.scss';
import OrderSummary from '../OrderSummary/OrderSummary';
import {Row, Col} from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';
import settings from '../../../data/settings';
import Button from '../../common/Button/Button';
import { formatPrice } from '../../../utils/formatPrice';
import { calculateTotal } from '../../../utils/calculateTotal';

const sendOrder = (options, tripCost, tripId, tripName, tripCountry) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    tripId, 
    tripName, 
    tripCountry,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

class OrderForm extends React.Component {
  static propTypes = {
    tripCost: PropTypes.string,
    options: PropTypes.object,
    setOrderOption: PropTypes.func,
    tripId: PropTypes.string, 
    tripName: PropTypes.string, 
    tripCountry: PropTypes.string, 
    isReadyToSend: PropTypes.func,
  }

  render(){
    const {tripCost, options, setOrderOption, tripId, tripName, tripCountry, isReadyToSend} = this.props;
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

        <Button 
          onClick={() => sendOrder(options, tripCost, tripId, tripName, tripCountry)}
          disabled={!isReadyToSend}
        >
          Order now!
        </Button>

      </Row>
    );
  }

}

export default OrderForm;