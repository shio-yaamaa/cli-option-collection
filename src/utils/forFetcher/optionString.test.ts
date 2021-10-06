import { OptionType } from '../../types';
import {
  makeOptionList,
  makeOptionListForSingleDashStyle,
} from './optionString';

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

describe('makeOptionListForSingleDashStyle', () => {
  test('test', () => {
    const optionStrings = ['-a', '-long', '--double', 'invalid'];
    const optionKeyTypes = makeOptionListForSingleDashStyle(optionStrings);
    expect(optionKeyTypes).toStrictEqual([
      {
        type: OptionType.SHORT,
        key: 'a',
      },
      {
        type: OptionType.LONG,
        key: 'long',
      },
    ]);
  });
});
