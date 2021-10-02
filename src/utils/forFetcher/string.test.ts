import {
  adjustSpacingAroundComma,
  splitByMultipleDelimiters,
  splitAtTopLevel,
  countIndentWidth,
} from './string';

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

describe('splitAtTopLevel', () => {
  test('test', () => {
    const string = 'aaa, bbb, [ccc, [ddd, eee]], <fff, ggg>, "hhh, iii"';
    const split = splitAtTopLevel(string, ',', ['[]', '<>']);
    expect(split).toStrictEqual([
      'aaa',
      'bbb',
      '[ccc, [ddd, eee]]',
      '<fff, ggg>',
      '"hhh',
      'iii"',
    ]);
  });
});

describe('countIndentWidth', () => {
  test('test', () => {
    expect(countIndentWidth('abc')).toBe(0);
    expect(countIndentWidth('  ab c')).toBe(2);
  });
});
