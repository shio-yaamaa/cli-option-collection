import { adjustSpacingAroundComma } from './string';

describe('adjustSpacingAroundComma', () => {
  test('test', () => {
    expect(adjustSpacingAroundComma('abc , abc')).toBe('abc, abc');
    expect(adjustSpacingAroundComma('abc,abc')).toBe('abc, abc');
  });
});
