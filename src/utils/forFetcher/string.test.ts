import {
  normalizeCommaDelimitedString,
  normalizeSpaces,
  splitByMultipleDelimiters,
  splitAtTopLevel,
  countIndentWidth,
  extractLines,
  extractTopLevelBrackets,
  stripTopLevelParentheses,
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

describe('extractTopLevelBrackets', () => {
  test('test', () => {
    const string = '[aaa], <bbb>, [ccc, [ddd, [eee, fff]]]';
    const { skeleton, fillings } = extractTopLevelBrackets(string, [
      '[]',
      '<>',
    ]);
    expect(skeleton).toBe('[___1___], <___5___>, [___4___]');
    expect(fillings).toStrictEqual([
      '[aaa], <bbb>, [ccc, [ddd, [eee, fff]]]',
      'aaa',
      'eee, fff',
      'ddd, [eee, fff]',
      'ccc, [ddd, [eee, fff]]',
      'bbb',
    ]);
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

describe('stripTopLevelParentheses', () => {
  test('test', () => {
    const string = '(a, (b, c)), [d, (e, f)], {g, (h, i)}';
    const split = stripTopLevelParentheses(string, ['[]', '<>']);
    expect(split).toBe('a, (b, c), [d, (e, f)], {g, h, i}');
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
