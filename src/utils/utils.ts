// KeyType can be anything that is distinguishable when stringified.
export const uniqueBy = <ItemType, KeyType>(
  items: ItemType[],
  getKey: (item: ItemType) => KeyType
) => {
  const map = new Map<string, boolean>();
  const uniqueItems: ItemType[] = [];
  for (const item of items) {
    const key = JSON.stringify(getKey(item));
    if (!map.has(key)) {
      uniqueItems.push(item);
      map.set(key, true);
    }
  }
  return uniqueItems;
};
