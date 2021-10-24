import path from 'path';
import fs from 'fs';

import { Command, Option, OptionStyle } from '../../types';
import { DOWNLOADS_DIRECTORY } from '../../utils/forFetcher/http';
import { uniqueOptions } from '../../utils/forFetcher/options';
import { mergeOptionTitles } from '../../utils/forFetcher/optionString';
import { isString } from '../../utils/typeGuards';
import { splitN } from '../../utils/string';

const OPTION_STYLE = OptionStyle.SHORT_AND_LONG;

export const fetchCurl = async (): Promise<Command[]> => {
  const optionDefFilePaths = await fetchOptionDefFilePaths();
  const options: Option[] = [];
  for (const path of optionDefFilePaths) {
    options.push(...(await fetchOptions(path)));
  }
  return [
    {
      name: 'curl',
      optionStyle: OPTION_STYLE,
      options: uniqueOptions(options),
    },
  ];
};

const fetchOptionDefFilePaths = async (): Promise<string[]> => {
  const optsDirPath = path.resolve(
    DOWNLOADS_DIRECTORY,
    'curl/docs/cmdline-opts'
  );
  const defFilePaths = fs
    .readdirSync(optsDirPath)
    .filter((filePath) => filePath.endsWith('.d'));
  return defFilePaths.map((filePath) => path.resolve(optsDirPath, filePath));
};

const fetchOptions = async (path: string): Promise<Option[]> => {
  const text = fs.readFileSync(path).toString();
  const lines = text.split('\n');

  const shortOptionKey = findFieldValue('Short', lines);
  const longOptionKey = findFieldValue('Long', lines);
  const arg = findFieldValue('Arg', lines);
  const description = findFieldValue('Help', lines);

  const title = buildOptionTitle(shortOptionKey, longOptionKey, arg);
  if (!title) {
    return [];
  }

  const keys = [shortOptionKey, longOptionKey].filter(isString);
  return keys.map((key) => ({
    key,
    title,
    description: description ?? '',
  }));
};

const findFieldValue = (fieldName: string, lines: string[]): string | null => {
  const line = lines.find((line) => line.startsWith(`${fieldName}:`));
  if (!line) {
    return null;
  }
  return splitN(line, ':', 2)[1].trim();
};

const buildOptionTitle = (
  shortOptionKey: string | null,
  longOptionKey: string | null,
  arg: string | null
): string | null => {
  if (!shortOptionKey && !longOptionKey) {
    return null;
  }
  const shortOption = shortOptionKey ? `-${shortOptionKey}` : null;
  const longOption = longOptionKey ? `--${longOptionKey}` : null;
  const options = mergeOptionTitles([shortOption, longOption].filter(isString));
  return arg ? `${options} ${arg}` : options;
};
