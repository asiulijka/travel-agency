import {connect} from 'react-redux';
import TripListOptions from './TripListOptions';
import {getAllTags} from '../../../redux/tagsRedux';
import {getAllFilters, changeSearchPhrase, changeDurationFrom, changeDurationTo, changeAddFilterTag, changeRemoveFilterTag} from '../../../redux/filtersRedux';

const mapStateToProps = state => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = dispatch => ({
  changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
  // TODO - add more dispatchers for other filters
  changeDurationFrom: value => dispatch(changeDurationFrom(value)),
  changeDurationTo: value => dispatch(changeDurationTo(value)),
  changeAddFilterTag: tag => dispatch(changeAddFilterTag(tag)),
  changeRemoveFilterTag: tag => dispatch(changeRemoveFilterTag(tag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
