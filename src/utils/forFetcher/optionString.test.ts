import { OptionStyle } from '../../types';
import {
  makeOptionList,
  makeOptionListForSingleDashStyle,
} from './optionString';

describe('makeOptionList', () => {
  test('OptionStyle.SHORT_AND_LONG', () => {
    const optionStrings = ['-a', '-b', '--long', 'invalid'];
    const optionKeyTypes = makeOptionList(
      optionStrings,
      OptionStyle.SHORT_AND_LONG,
      'title',
      'description'
    );
    expect(optionKeyTypes).toStrictEqual([
      {
        key: 'a',
        title: 'title',
        description: 'description',
      },
      {
        key: 'b',
        title: 'title',
        description: 'description',
      },
      {
        key: 'long',
        title: 'title',
        description: 'description',
      },
    ]);
  });

  test('OptionStyle.SINGLE_DASH', () => {
    const optionStrings = ['-a', '-long', '--double', 'invalid'];
    const optionKeyTypes = makeOptionListForSingleDashStyle(
      optionStrings,
      'title',
      'description'
    );
    expect(optionKeyTypes).toStrictEqual([
      {
        key: 'a',
        title: 'title',
        description: 'description',
      },
      {
        key: 'long',
        title: 'title',
        description: 'description',
      },
    ]);
  });
});
