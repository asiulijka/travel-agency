import React from 'react';
import {shallow} from 'enzyme';
import DaysToSummer from './DaysToSummer';

const select = {
  description: '.description',
};


describe('Component DaysToSummer', () => {

  it('should render without crashing', () => {
    const component = shallow(<DaysToSummer />);
    expect(component).toBeTruthy();
  });

  it('should render description', () => {
    const component = shallow(<DaysToSummer />);
    expect(component.exists(select.description)).toEqual(true);
  });

});


// czy w moemncie otwarcia strony poza latem 
// komunikat wyswietla odpowiednia ilosc dni do lata

const trueDate = Date;
const mockDate = customDate => class extends Date  {
  constructor(...args) {
    if(args.length){
      super(...args);
    } else {
      super(customDate);
    }
    return this;
  }
  static now(){
    return (new Date(customDate)).getTime();
  }
};

const checkDescriptionAtDate = (date, expectedDescription) => {
  it(`should show correct at ${date}`, () => {
    global.Date = mockDate(date);

    const component = shallow(<DaysToSummer />);
    const renderedText = component.find(select.description).text();
    expect(renderedText).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};

describe('Component DaysToSummer with mocked Date BEFORE start of summer should calculate correct number of days', () => {
  checkDescriptionAtDate('2021-01-01', '171 days to summer!');
  checkDescriptionAtDate('2021-06-14', '7 days to summer!');
  checkDescriptionAtDate('2021-06-18', '3 days to summer!');
  checkDescriptionAtDate('2021-06-20', '1 day to summer!');

});

describe('Component DaysToSummer with mocked Date AFTER end of summer should calculate correct number of days', () => {
  checkDescriptionAtDate('2021-11-21', '212 days to summer!');
  checkDescriptionAtDate('2022-05-21', '31 days to summer!');
  checkDescriptionAtDate('2022-06-19', '2 days to summer!');
  checkDescriptionAtDate('2022-06-20', '1 day to summer!');
  
});

describe('Component DaysToSummer with mocked Date DURING summer should return null', () => {
  checkDescriptionAtDate('2022-06-25', '');
  checkDescriptionAtDate('2021-06-25', '');
  checkDescriptionAtDate('2022-07-25', '');
});

