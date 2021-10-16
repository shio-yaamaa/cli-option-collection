// KeyType can be anything that is distinguishable when stringified.
export const uniqueBy = <ItemType, KeyType>(
  items: ItemType[],
  getKey: (item: ItemType) => KeyType
): ItemType[] => {
  // uniqueBy is just a special case of mergeBy where the first item is picked
  // whenever they are multiple items with the same key.
  return mergeBy(items, getKey, (a, _b) => a);
};

// KeyType can be anything that is distinguishable when stringified.
export const mergeBy = <ItemType, KeyType>(
  items: ItemType[],
  getKey: (item: ItemType) => KeyType,
  merge: (a: ItemType, b: ItemType) => ItemType
): ItemType[] => {
  const map = new Map<string, ItemType>();
  for (const item of items) {
    const key = JSON.stringify(getKey(item));
    const existingItem = map.get(key);
    if (existingItem) {
      map.set(key, merge(existingItem, item));
    } else {
      map.set(key, item);
    }
  }
  return Array.from(map.values());
};

export const mergeLists = <T>(lists: T[][]): T[] => {
  return ([] as T[]).concat(...lists);
};

export const buildRanking = <ItemType>(
  items: ItemType[],
  compareFn: (a: ItemType, b: ItemType) => number,
  limit: number
): ItemType[] => {
  return [...items].sort(compareFn).slice(0, limit);
};
