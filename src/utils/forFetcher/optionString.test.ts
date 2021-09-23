import { partitionShortAndLongOptionLabels } from './optionString';

describe('partitionShortAndLongOptionLabels', () => {
  test('test', () => {
    const strings = ['-a', '-b', '--long', 'invalid'];
    const { shortOptionLabels, longOptionLabels } =
      partitionShortAndLongOptionLabels(strings);
    expect(shortOptionLabels).toStrictEqual(['a', 'b']);
    expect(longOptionLabels).toStrictEqual(['long']);
  });
});
