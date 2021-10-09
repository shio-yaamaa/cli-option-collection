import { parseTabbedTextList, parseTabbedTextList2 } from './listParser';

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

describe('parseTabbedTextList2', () => {
  test('test', () => {
    const text = `
      item1  Description of item1
      item2  Description of item2
             Description can be multi-line
      item3  Description of item 3
        Something in between
             This is not description

      item with two  spaces  Description of the item with two spaces
    `;
    const listItems = parseTabbedTextList2(text);
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
        title: 'item3',
        descriptionLines: ['Description of item 3'],
      },
      {
        title: 'item with two  spaces',
        descriptionLines: ['Description of the item with two spaces'],
      },
    ]);
  });
});
