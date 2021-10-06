import axios from 'axios';

export const fetchPlainTextFromURL = async (url: URL): Promise<string> => {
  const response = await axios.get(url.toString());
  return response.data;
};
