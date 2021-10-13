import {
  normalizeCommaDelimitedString,
  normalizeSpaces,
  splitByMultipleDelimiters,
  splitAtTopLevel,
  countIndentWidth,
  extractLines,
} from './string';

describe('normalizeCommaDelimitedString', () => {
  test('test', () => {
    expect(normalizeCommaDelimitedString('abc , abc')).toBe('abc, abc');
    expect(normalizeCommaDelimitedString('abc,abc')).toBe('abc, abc');
  });
});

describe('normalizeSpaces', () => {
  test('test', () => {
    expect(normalizeSpaces('abc  abc abc\nabc')).toBe('abc abc abc\nabc');
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

describe('extractLines', () => {
  test('test', () => {
    const extractedLines = extractLines(
      ['before', 'start', 'content', 'content', 'end', 'end'],
      (line) => line === 'start',
      (line) => line === 'end'
    );
    expect(extractedLines).toStrictEqual([
      'start',
      'content',
      'content',
      'end',
    ]);
  });
});
