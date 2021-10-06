import { OptionType } from '../../types';
import { distinguishOptionKeyType } from './optionString';

describe('distinguishOptionKeyType', () => {
  test('test', () => {
    const optionStrings = ['-a', '-b', '--long', 'invalid'];
    const optionKeyTypes = distinguishOptionKeyType(optionStrings);
    expect(optionKeyTypes).toStrictEqual([
      {
        type: OptionType.SHORT,
        key: 'a',
      },
      {
        type: OptionType.SHORT,
        key: 'b',
      },
      {
        type: OptionType.LONG,
        key: 'long',
      },
    ]);
  });
});
