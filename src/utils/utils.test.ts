import { uniqueBy } from './utils';

describe('uniqueBy', () => {
  test('string key', () => {
    const items = [
      { name: 'a', prop: 1 },
      { name: 'b', prop: 2 },
      { name: 'a', prop: 3 },
    ];
    const uniqueItems = uniqueBy(items, (item) => item.name);
    expect(uniqueItems).toStrictEqual([
      { name: 'a', prop: 1 },
      { name: 'b', prop: 2 },
    ]);
  });

  test('composite keys', () => {
    const items = [
      { name: 'a', type: 'c', prop: 1 },
      { name: 'b', type: 'c', prop: 2 },
      { name: 'a', type: 'd', prop: 3 },
      { name: 'a', type: 'c', prop: 4 },
    ];
    const uniqueItems = uniqueBy(items, (item) => [item.name, item.type]);
    expect(uniqueItems).toStrictEqual([
      { name: 'a', type: 'c', prop: 1 },
      { name: 'b', type: 'c', prop: 2 },
      { name: 'a', type: 'd', prop: 3 },
    ]);
  });
});
