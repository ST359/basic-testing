// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 0, b: 2, action: Action.Divide, expected: 0 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 0, b: 2, action: Action.Exponentiate, expected: 0 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
];

describe.each(testCases)(
  'simpleCalculator test',
  ({ a, b, action, expected }) => {
    // This test case is just to run this test suite, remove it when you write your own tests
    test(`Expect ${a} ${action} ${b} to be ${expected}`, () => {
      expect(simpleCalculator({ a: a, b: b, action: action })).toBe(expected);
    });
    // Consider to use Jest table tests API to test all cases above
  },
);
