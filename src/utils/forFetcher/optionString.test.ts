import { OptionType } from '../../types';
import {
  makeOptionList,
  makeOptionListForSingleDashStyle,
} from './optionString';

describe('makeOptionList', () => {
  test('test', () => {
    const optionStrings = ['-a', '-b', '--long', 'invalid'];
    const optionKeyTypes = makeOptionList(
      optionStrings,
      'title',
      'description'
    );
    expect(optionKeyTypes).toStrictEqual([
      {
        type: OptionType.SHORT,
        key: 'a',
        title: 'title',
        description: 'description',
      },
      {
        type: OptionType.SHORT,
        key: 'b',
        title: 'title',
        description: 'description',
      },
      {
        type: OptionType.LONG,
        key: 'long',
        title: 'title',
        description: 'description',
      },
    ]);
  });
});

describe('makeOptionListForSingleDashStyle', () => {
  test('test', () => {
    const optionStrings = ['-a', '-long', '--double', 'invalid'];
    const optionKeyTypes = makeOptionListForSingleDashStyle(
      optionStrings,
      'title',
      'description'
    );
    expect(optionKeyTypes).toStrictEqual([
      {
        type: OptionType.SHORT,
        key: 'a',
        title: 'title',
        description: 'description',
      },
      {
        type: OptionType.LONG,
        key: 'long',
        title: 'title',
        description: 'description',
      },
    ]);
  });
});
