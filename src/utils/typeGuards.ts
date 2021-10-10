export const isString = (maybeString: unknown): maybeString is string =>
  typeof maybeString === 'string';

export const isElement = <K extends keyof HTMLElementTagNameMap>(
  element: Element,
  tagName: K
): element is HTMLElementTagNameMap[K] =>
  element.tagName.toLowerCase() === tagName;
