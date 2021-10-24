import { splitN } from './string';

describe('splitN', () => {
  test('Split N times', () => {
    const string = 'a,b,c,d';
    const split = splitN(string, ',', 3);
    expect(split).toStrictEqual(['a', 'b', 'c,d']);
  });

  test('Spaces are preserved', () => {
    const string = 'a, b, c, d';
    const split = splitN(string, ',', 3);
    expect(split).toStrictEqual(['a', ' b', ' c, d']);
  });

  test('RegExp delimiter', () => {
    const string = 'a, b / c, d';
    const split = splitN(string, /[,\/]/, 3);
    expect(split).toStrictEqual(['a', ' b ', ' c, d']);
  });
});
