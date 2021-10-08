import { parseTabbedTextList } from './listParser';

describe('parseTabbedTextList', () => {
  test('test', () => {
    const text = `
      item1      Description of item1
      item2      Description of item2
                 Description can be multi-line

      long item  Description of long item
    `;
    const listItems = parseTabbedTextList(text);
    expect(listItems).toStrictEqual([
      {
        title: 'item1',
        descriptionLines: ['Description of item1'],
      },
      {
        title: 'item2',
        descriptionLines: [
          'Description of item2',
          'Description can be multi-line',
        ],
      },
      {
        title: 'long item',
        descriptionLines: ['Description of long item'],
      },
    ]);
  });
});
