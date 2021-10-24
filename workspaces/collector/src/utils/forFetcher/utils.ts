export interface HeadingContentsPair<T> {
  heading: T;
  contents: T[];
}

export const findHeadingContentsPairs = <T>(
  items: T[],
  isHeading: (item: T) => boolean,
  isContent: (item: T) => boolean = () => true
): HeadingContentsPair<T>[] => {
  const pairs: HeadingContentsPair<T>[] = [];

  let isInSection = false;
  for (const item of items) {
    if (isHeading(item)) {
      isInSection = true;
      pairs.push({
        heading: item,
        contents: [],
      });
    } else {
      if (isContent(item)) {
        if (isInSection) {
          pairs[pairs.length - 1].contents.push(item);
        }
      } else {
        isInSection = false;
      }
    }
  }

  return pairs;
};
