import { getInnerText } from '../dom';

export interface DListEntry {
  dts: Element[];
  dd: Element;
}

// Traverse elements until it reaches an element that satisfies the specified condition
export const nextClosest = (
  element: Element,
  test: (element: Element) => boolean
): Element | null => {
  let currentElement: Element | null = element;
  while ((currentElement = currentElement.nextElementSibling)) {
    if (test(currentElement)) {
      return currentElement;
    }
  }
  return null;
};

// Traverse elements backwards until it reaches an element that satisfies the specified condition
export const previousClosest = (
  element: Element,
  test: (element: Element) => boolean
): Element | null => {
  let currentElement: Element | null = element;
  while ((currentElement = currentElement.previousElementSibling)) {
    if (test(currentElement)) {
      return currentElement;
    }
  }
  return null;
};

export const findAnchorsWithPattern = (
  parent: Document | Element,
  hrefPattern: RegExp | null,
  textPattern: RegExp | null
) => {
  const anchors = Array.from(parent.querySelectorAll('a'));
  return anchors.filter((anchor) => {
    const href = anchor.getAttribute('href');
    const text = getInnerText(anchor);

    // When the pattern is not specified, it is considered to be always matching
    const matchesHref = !hrefPattern || (href && hrefPattern.test(href));
    const matchesText = !textPattern || textPattern.test(text);
    return matchesHref && matchesText;
  });
};

// If ignoreEmptyDd is true, a <dd> with no textContent after a <dt> is considered to be non-existent.
export const findDListEntries = (
  list: HTMLDListElement,
  ignoreEmptyDd = false
): DListEntry[] => {
  const entries: DListEntry[] = [];

  const elements = Array.from(list.children);
  let currentDts: Element[] = [];
  for (const element of elements) {
    switch (element.tagName.toLowerCase()) {
      case 'dt':
        currentDts.push(element);
        break;
      case 'dd':
        if (ignoreEmptyDd && getInnerText(element).trim().length === 0) {
          // Ignore
        } else {
          entries.push({
            dts: currentDts,
            dd: element,
          });
          currentDts = [];
        }
        break;
      default:
        currentDts = [];
    }
  }

  return entries;
};
