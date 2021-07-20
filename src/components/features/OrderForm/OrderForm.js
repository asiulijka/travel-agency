import React from 'react';
// import styles from './OrderForm.scss';
import OrderSummary from '../OrderSummary/OrderSummary';
import {Row, Col} from 'react-flexbox-grid';

class OrderForm extends React.Component {

  render(){
    return (
      <Row>
        <Col xs={12}>
          <OrderSummary />
        </Col>
      </Row>
    );
  }

}

export default OrderForm;