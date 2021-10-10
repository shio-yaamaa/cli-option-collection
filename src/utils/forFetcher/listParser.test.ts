import { parseTabbedTextList } from './listParser';

describe('parseTabbedTextList', () => {
  test('test', () => {
    const text = `
      item1      Description of item1
      item2      Description of item2
                 Description can be multi-line and can contain  double  spaces.

      long item  Description of long item
      long long item  Description of long long item
                      which has more indentation.
        Something in between
                      This is not description.
    `;
    const listItems = parseTabbedTextList(text);
    expect(listItems).toStrictEqual([
      {
        titles: ['item1'],
        descriptionLines: ['Description of item1'],
      },
      {
        titles: ['item2'],
        descriptionLines: [
          'Description of item2',
          'Description can be multi-line and can contain  double  spaces.',
        ],
      },
      {
        titles: ['long item'],
        descriptionLines: ['Description of long item'],
      },
      {
        titles: ['long long item'],
        descriptionLines: [
          'Description of long long item',
          'which has more indentation.',
        ],
      },
    ]);
  });
});
