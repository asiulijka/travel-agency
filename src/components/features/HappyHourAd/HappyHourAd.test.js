import React from 'react';
import {shallow} from 'enzyme';
import HappyHourAd from './HappyHourAd';

const select = {
  title: '.title',
  promoDescription: '.promoDescription',
};

const mockProps = {
  title: 'testTitle',
  promoDescription: 'testPromoDescription',
};

beforeAll(() => {
  const utilsModule = jest.requireActual('../../../utils/formatTime.js');
  utilsModule.formatTime = jest.fn(seconds => seconds);
});

describe('Component HappyHourAd', () => {

  it('should render without crashing', () => {
    const component = shallow(<HappyHourAd />);
    expect(component).toBeTruthy();
  });

  it('should render heading and description', () => {
    const component = shallow(<HappyHourAd />);
    expect(component.exists(select.title)).toEqual(true);
    expect(component.exists(select.promoDescription)).toEqual(true);
  });

  // czy nagłówek ma treść przekazaną komponentowi w propsie title,
  it('should have title taken from props', () => {
    const component = shallow(<HappyHourAd {...mockProps} />);
    expect(component.find(select.title).text()).toEqual((mockProps.title));
  });

});

// czy w momencie wyświetlenia strony poza godzinami promocji, 
// komunikat wyświetla odliczanie z odpowiednią liczbą sekund,

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

const checkDescriptionAtTime = (time, expectedDescription) => {
  it(`should show correct at ${time}`, () => {
    global.Date = mockDate(`2019-05-14T${time}.135Z`);

    const component = shallow(<HappyHourAd {...mockProps} />);
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};

describe('Component HappyHourAd with mocked Date', () => {
  checkDescriptionAtTime('11:57:58', '122');
  checkDescriptionAtTime('11:59:59', '1');
  checkDescriptionAtTime('13:00:00', 23 * 60 * 60 + '');
});


// czy odliczanie co sekundę zmniejsza wyświetlaną liczbę,

const checkDescriptionAfterTime = (time, delaySeconds, expectedDescription) => {
  it(`should show correct value ${delaySeconds} seconds after ${time}`, () => {
    global.Date = mockDate(`2019-05-14T${time}.135Z`);

    jest.useFakeTimers();
    const component = shallow(<HappyHourAd {...mockProps} />);

    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + delaySeconds);
    global.Date = mockDate(newTime.getTime());

    jest.advanceTimersByTime(delaySeconds * 1000);

    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
    jest.useRealTimers();
  });
};

describe('Component HappyHourAd with mocked Date and delay', () => {
  checkDescriptionAfterTime('11:57:58', 2, '120');
  checkDescriptionAfterTime('11:59:58', 1, '1');
  checkDescriptionAfterTime('13:00:00', 60 * 60, 22 * 60 * 60 + '');
});

// czy w momencie wyświetlenia strony w godzinach promocji, 
// komunikat wyświetla informację o promocji, którego treść 
// znajduje się w propsie promoDescription

describe('Component HappyHourAd with mocked Date returns Promo information during promotion hour', () => {
  checkDescriptionAtTime('12:00:00', mockProps.promoDescription);
  checkDescriptionAtTime('12:49:53', mockProps.promoDescription);
  checkDescriptionAtTime('12:59:59', mockProps.promoDescription);
});


// czy jeśli strona została otwarta przed startem promocji, a następnie
//  odliczanie dotarło do zera, 
// to czy zostanie wyświetlona informacja o promocji.

describe('Component HappyHourAd with mocked Date and delay returns Promo information once counting gets to zero', () => {
  checkDescriptionAfterTime('11:57:58', 123, mockProps.promoDescription);
  checkDescriptionAfterTime('11:59:58', 4, mockProps.promoDescription);
});