// import React from 'react';
// import {shallow} from 'enzyme';
import { formatTime } from './formatTime';

describe('utils', () => {
  describe('formatTime', () => {

    // Czy jeśli nie podano argumentu, to funkcja zwróci null?
    it('should return null if there is no arg', () => {
      expect(formatTime()).toBe(null);
    });

    // Czy jeśli podano coś innego niż liczbę, to funkcja zwróci null?
    it('should return null if arg is not a number', () => {
      expect(formatTime('abc')).toBe(null);
      expect(formatTime(() => {})).toBe(null);
    });

    // Czy jeśli podano liczbę mniejszą niż zero, to funkcja zwróci null?
    it('should return null if arg is lower than zero', () => {
      expect(formatTime(-1)).toBe(null);
      expect(formatTime(-2)).toBe(null);
    });

    // Czy jeśli podano poprawny argument, to funkcja zwróci dobry czas 
    // w formacie hh:mm:ss?

    // Czy jeśli godzina, minuta albo sekunda jest mniejsza niż 0, 
    // to otrzymuje przedrostek? (ten test możemy połączyć z poprzednim)

    it('should return time in hh:mm:ss if arg is proper', () => {
      expect(formatTime(122)).toBe('00:02:02');
      expect(formatTime(3793)).toBe('01:03:13');
      expect(formatTime(120)).toBe('00:02:00');
      expect(formatTime(3604)).toBe('01:00:04');
    });
    
  });
});