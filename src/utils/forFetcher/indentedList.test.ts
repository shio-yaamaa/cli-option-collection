import { findIndentedListItems } from './indentedList';

describe('findIndentedListItems', () => {
  test('test', () => {
    const string = `
      --long-option1
          This is the description of the long option 1.

      --long-option2
          This is the description of the long option 2.
          This is the description of the long option 2.

      -s  This is the description of the short option.
          This is the description of the short option.

      --multi-line-option1
      --multi-line-option2
          This is the description of the multi-line option.

        Something in between

          This is not description.
    `;
    const listItems = findIndentedListItems(string, 6, 10);
    expect(listItems).toStrictEqual([
      {
        titles: ['--long-option1'],
        descriptions: ['This is the description of the long option 1.'],
      },
      {
        titles: ['--long-option2'],
        descriptions: [
          'This is the description of the long option 2.',
          'This is the description of the long option 2.',
        ],
      },
      {
        titles: ['-s'],
        descriptions: [
          'This is the description of the short option.',
          'This is the description of the short option.',
        ],
      },
      {
        titles: ['--multi-line-option1', '--multi-line-option2'],
        descriptions: ['This is the description of the multi-line option.'],
      },
    ]);
  });
});
