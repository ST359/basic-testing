// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList(['head', 'tail']);
    expect(result).toStrictEqual({
      "next": {
        "next": {
          "next": null,
          "value": null,
        },
        "value": "tail",
      },
      "value": "head",
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(['head', 'first', 'second', 'tail']);
    expect(result).toMatchSnapshot();
  });
});
