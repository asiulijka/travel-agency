import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe ('Component TripSummary', () => {
  it('generates link to correct address', () => {
    const expectedAddress = '/trip/abc';
    const expectedId = 'abc';
    const component = shallow(<TripSummary id={expectedId} image='test image' name='test name' cost='test cost' days={3} tags={[]} />);

    const renderedAddress = component.find('.link').prop('to');
    expect(renderedAddress).toEqual(expectedAddress);
  });

  it('has <img> with correct src and alt', () => {
    const mockSrc = 'testSrc';
    const mockAlt = 'testAlt';
    const component = shallow(<TripSummary image={mockSrc} name={mockAlt} id='test Id' cost='test cost' days={3} tags={[]} />);

    expect(component.find('img').prop('src')).toBe(mockSrc);
    expect(component.find('img').prop('alt')).toEqual(mockAlt);
  });

  it('correct render name, cost and days', () => {
    const expectedName = 'Test name';
    const expectedCost = 'Test cost';
    const expectedDays = 3;

    const component = shallow(<TripSummary name={expectedName} cost={expectedCost} days={expectedDays} id='test Id' image='test image' tags={[]} />);

    expect(component.find('.title').text()).toBe(expectedName);
    expect(component.find('.details span').at(1).text()).toBe('from ' + expectedCost);
    expect(component.find('.details span').at(0).text()).toBe(expectedDays + ' days');
  });

  it('throw error when missing props - id', () => {
    expect(() => shallow(<TripSummary image='test image' name='test name' cost='test cost' days={3} tags={[]} />)).toThrow();
  });

  it('throw error when missing props - image', () => {
    expect(() => shallow(<TripSummary id='test Id' name='test name' cost='test cost' days={3} tags={[]} />)).toThrow();
  });

  it('throw error when missing props - name', () => {
    expect(() => shallow(<TripSummary id='test Id' image='test image' cost='test cost' days={3} tags={[]} />)).toThrow();
  });

  it('throw error when missing props - cost', () => {
    expect(() => shallow(<TripSummary id='test Id' image='test image' name='test name' days={3} tags={[]} />)).toThrow();
  });

  it('throw error when missing props - days', () => {
    expect(() => shallow(<TripSummary id='test Id' image='test image' name='test name' cost='test cost' tags={[]} />)).toThrow();
  });
});