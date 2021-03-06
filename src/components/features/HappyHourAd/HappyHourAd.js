import React from 'react';
import PropTypes from 'prop-types';
import styles from './HappyHourAd.scss';
import { formatTime } from '../../../utils/formatTime';

class HappyHourAd extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    promoDescription: PropTypes.string,
  }

  constructor(){
    super();
    setInterval(() => this.forceUpdate(), 1000);
  }

  getCountdownTime(){
    const currentTime = new Date();
    const nextNoon = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), 12, 0, 0, 0));
  
    if(currentTime.getUTCHours() >= 12){
      nextNoon.setUTCDate(currentTime.getUTCDate()+1);
    }
  
    return Math.round((nextNoon.getTime() - currentTime.getTime())/1000);
  }

  render () {
    const {title, promoDescription} = this.props;
    const countdownTime = this.getCountdownTime();
    return (
      <div className={styles.component}>
        <h3 className='title'>
          {title}
        </h3>
        <div className='promoDescription'>
          {countdownTime > 23*60*60 ? promoDescription : formatTime(this.getCountdownTime())}
        </div>
      </div>
    );
  }
}

export default HappyHourAd;