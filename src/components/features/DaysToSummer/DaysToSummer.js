import React from 'react';
// import PropTypes from 'prop-types';
import styles from './DaysToSummer.scss';

class DaysToSummer extends React.Component {
  
  constructor(){
    super();
    this.currentDate = new Date();
  }

  getSummerStartDate(){
    return new Date(Date.UTC(this.currentDate.getUTCFullYear(), 5, 21, 0, 0, 0, 0));
  }

  getSummerEndDate(){
    // miesiace sa od 0 do 11
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
    return new Date(Date.UTC(this.currentDate.getUTCFullYear(), 8, 22, 0, 0, 0, 0));
  }

  getDaysToSummer(){
    
    const nextSummer = this.getSummerStartDate();
   
    if(this.currentDate.getUTCMonth() >= 6) {
      nextSummer.setUTCFullYear(this.currentDate.getUTCFullYear()+1);
    } else if(this.currentDate.getUTCMonth() == 5) {
      if (this.currentDate.getUTCDate() >= 22) {
        nextSummer.setUTCFullYear(this.currentDate.getUTCFullYear() + 1);
      }
    }

    const daysToSummer = Math.ceil((nextSummer.getTime() - this.currentDate.getTime())/(1000*60*60*24));
     
    return daysToSummer;
  }

  getCountdownText(){
    return this.getDaysToSummer() == 1 ? '1 day to summer!' : this.getDaysToSummer() + ' days to summer!';
  }


  render () {
    return (
      <div className={styles.component}>
        <div className='description'>
          {this.currentDate > this.getSummerEndDate() || this.currentDate < this.getSummerStartDate() ? this.getCountdownText() : null}
        </div>
      </div>
    );
  }

}

export default DaysToSummer;