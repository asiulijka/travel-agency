import {connect} from 'react-redux';
import OrderForm from './OrderForm';
import {getOrderOptions, setOrderOption} from '../../../redux/orderRedux';
// import OrderOptionText from '../OrderOption/OrderOptionText';

const mapStateToProps = state => ({
  options: getOrderOptions(state),
  isReadyToSend: state.order.options.name != '' && state.order.options.contact != '',
});

const mapDispatchToProps = dispatch => ({
  setOrderOption: value => dispatch(setOrderOption(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);