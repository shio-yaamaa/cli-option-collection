import axios from 'axios';
import { JSDOM, VirtualConsole } from 'jsdom';

export const fetchPlainTextFromURL = async (url: URL): Promise<string> => {
  const response = await axios.get(url.toString());
  return response.data;
};

export const fetchDocumentFromURL = async (url: URL): Promise<Document> => {
  const virtualConsole = new VirtualConsole();
  const dom = await JSDOM.fromURL(url.toString(), { virtualConsole });
  return dom.window.document;
};

// When you want to apply some filters before feeding response to the JSDOM parser,
// use this instead of fetchDocumentFromURL.
export const fetchDocumentFromURLViaFilter = async (
  url: URL,
  filter: (data: string) => string
): Promise<Document> => {
  const response = await axios.get(url.toString());
  const data = filter(response.data);
  return new JSDOM(data).window.document;
};
