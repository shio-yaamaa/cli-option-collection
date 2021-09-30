import { JSDOM, VirtualConsole } from 'jsdom';

export interface DListEntry {
  dts: string[];
  dd: string;
}

export const fetchDocumentFromURL = async (url: URL): Promise<Document> => {
  const virtualConsole = new VirtualConsole();
  const dom = await JSDOM.fromURL(url.toString(), { virtualConsole });
  return dom.window.document;
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
    const text = anchor.textContent;
    if (!href || !text) {
      return false;
    }
    const matchesHref = !hrefPattern || hrefPattern.test(href);
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
        if (
          ignoreEmptyDd &&
          (element.textContent === null ||
            element.textContent.trim().length === 0)
        ) {
          // Ignore
        } else {
          entries.push({
            dts: currentDts.map((dt) => dt.textContent?.trim() ?? ''),
            dd: element.textContent?.trim() ?? '',
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
