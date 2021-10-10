import { parseTextList } from './textListParser';

describe('parseTextList', () => {
  test('test', () => {
    const text = `
      item1      Description of item1
      item2      Description of item2

                 Description can be multi-line

                 and can contain line breaks and  double  spaces.

      long item  Description of long item
      long long item1  Description of long long item
                       which has more indentation.
        Something in between
                       This is not description.
      long long item2
                 Description does not have to start
                 on the same line as its title.
                   And it can have additional indentation.
      title1
      title2
          Item can have multiple title lines.
    `;
    const listItems = parseTextList(text.split('\n'));
    expect(listItems).toStrictEqual([
      {
        titles: ['item1'],
        descriptionLines: ['Description of item1'],
      },
      {
        titles: ['item2'],
        descriptionLines: [
          'Description of item2',
          'Description can be multi-line',
          'and can contain line breaks and  double  spaces.',
        ],
      },
      {
        titles: ['long item'],
        descriptionLines: ['Description of long item'],
      },
      {
        titles: ['long long item1'],
        descriptionLines: [
          'Description of long long item',
          'which has more indentation.',
        ],
      },
      {
        titles: ['long long item2'],
        descriptionLines: [
          'Description does not have to start',
          'on the same line as its title.',
          '  And it can have additional indentation.',
        ],
      },
      {
        titles: ['title1', 'title2'],
        descriptionLines: ['Item can have multiple title lines.'],
      },
    ]);
  });
});
