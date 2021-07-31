import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';

import DatePicker from 'react-datepicker';


describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption name='test name' type='test type' />);
    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should show name in the title', () => {
    const expectedName = 'abc';
    const component = shallow(<OrderOption name={expectedName} type='dropdown' />);

    const renderedName = component.find('.title').text();
    expect(renderedName).toEqual(expectedName);
  });
});

// Testy subkomponentow

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: { 
    currentValue: 1,
    currentCost: '$20'},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;
    
    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);
        
          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);
        
          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });

        break;
      }

      case 'icons': {
        it('contains Icon', () => {
          const externalDiv = renderedSubcomponent.find('.component');
          expect(externalDiv.length).toBe(1);

          const timesCircleIcon = externalDiv.find('Icon[name="times-circle"]').length;
          expect(timesCircleIcon).toBe(1);

          const otherIcons = externalDiv.find('Icon').not('[name="times-circle"]');
          expect(otherIcons.length).toBe(mockProps.values.length);
          for(let i=0; i<mockProps.values.length; i++){
            expect(otherIcons.at(i).prop('name')).toBe(mockProps.values[i].icon);
          }
        });

        it('should run setOrderOption function on click event', () => {
          // console.log(renderedSubcomponent.debug);
          const lastIcon = renderedSubcomponent.find(`div[className="icon"]`);
          lastIcon.simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });

        break;
      }


      case 'checkboxes': {
        it('renders all inputs correctly', () => {
          const externalDiv = renderedSubcomponent.find('.checkboxes');
          expect(externalDiv.length).toBe(1);

          const checkedBoxes = externalDiv.find('input[checked=true]');
          expect(checkedBoxes.length).toBe(mockPropsForType.checkboxes.currentValue.length);

          const allBoxes = externalDiv.find('input');
          expect(allBoxes.length).toBe(mockProps.values.length);

          for (let i=0; i<mockProps.values.length; i++) {
            expect(allBoxes.at(i).prop('checked')).toBe(mockPropsForType.checkboxes.currentValue.indexOf(mockProps.values[i].id) > -1);
          }
        });

        it('should run setOrderOption function on change event', () => {
          renderedSubcomponent.find(`input[value="${testValue}"]`).simulate('change', {currentTarget: {checked: true}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: [...mockPropsForType.checkboxes.currentValue, testValue]});
        });

        break;
      }


      case 'number': {
        it('renders input', () => {
          const input = renderedSubcomponent.find('input');
          expect(input.length).toBe(1);
        });

        it('should run setOrderOption function on change event', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });

        break;
      }

      case 'text': {
        it('renders input', () => {
          const input = renderedSubcomponent.find('input');
          expect(input.length).toBe(1);
        });

        it('should run setOrderOption function on change event', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });

        break;
      }

      case 'date': {
        it('renders div and DatePicker', () => {
          const externalDiv = renderedSubcomponent.find('.component');
          expect(externalDiv.length).toBe(1);

          expect(externalDiv.find(DatePicker).length).toBe(1);
        });

        it('should run setOrderOption function on change event', () => {
          renderedSubcomponent.find(DatePicker).simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: testValue});
        });

        break;
      }

    }
  });
}