import { OptionType } from '../../types';
import { makeOptionList } from './optionString';

describe('makeOptionList', () => {
  test('test', () => {
    const optionStrings = ['-a', '-b', '--long', 'invalid'];
    const optionKeyTypes = makeOptionList(optionStrings);
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
