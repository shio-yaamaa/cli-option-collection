import { htmlToText } from 'html-to-text';
import { squashLinebreaks } from './string';

// An alternative to HTMLElement.innerText because JSDOM does not support it.
// Use this instead of HTMLElement.textContent
// when you want to convert an element to how browsers would render it.
export const getInnerText = (element: Element) => {
  const converted = htmlToText(element.outerHTML, {
    wordwrap: false,
    selectors: [
      ...['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((selector) => ({
        selector,
        format: 'block',
      })),
      {
        selector: 'a',
        format: 'inline',
      },
    ],
  });
  return squashLinebreaks(converted);
};
