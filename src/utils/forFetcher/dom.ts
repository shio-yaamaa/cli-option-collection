import { JSDOM, VirtualConsole } from 'jsdom';

export const fetchDocumentFromURL = async (url: URL): Promise<Document> => {
  const virtualConsole = new VirtualConsole();
  const dom = await JSDOM.fromURL(url.toString(), { virtualConsole });
  return dom.window.document;
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
