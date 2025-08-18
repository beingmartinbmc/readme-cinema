import { readmeCinema } from '../src/index.js';

describe('Simple Test', () => {
  test('should import readmeCinema function', () => {
    expect(typeof readmeCinema).toBe('function');
  });

  test('should have basic functionality', () => {
    expect(readmeCinema).toBeDefined();
  });
});
