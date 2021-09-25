import { adjustSpacingAroundComma, splitByMultipleDelimiters } from './string';

describe('adjustSpacingAroundComma', () => {
  test('test', () => {
    expect(adjustSpacingAroundComma('abc , abc')).toBe('abc, abc');
    expect(adjustSpacingAroundComma('abc,abc')).toBe('abc, abc');
  });
});

describe('splitByMultipleDelimiters', () => {
  test('test', () => {
    expect(splitByMultipleDelimiters('a, b and c', [',', 'and'])).toStrictEqual(
      ['a', 'b', 'c']
    );
    expect(
      splitByMultipleDelimiters('a, b, and c', [',', 'and'])
    ).toStrictEqual(['a', 'b', 'c']);
  });
});
