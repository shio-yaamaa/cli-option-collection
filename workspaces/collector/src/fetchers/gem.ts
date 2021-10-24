import { Command, Fetcher, Option, OptionStyle } from '../types';
import { getInnerText } from '../utils/dom';
import {
  findAnchorsWithPattern,
  findElementsUnderHeading,
} from '../utils/forFetcher/dom';
import { fetchDocumentFromURL } from '../utils/forFetcher/http';
import { uniqueOptions } from '../utils/forFetcher/options';
import { makeOptionList } from '../utils/forFetcher/optionString';
import {
  splitByComma,
  transformOptionStrings,
  trimEqualDelimitedArguments,
  trimOptionalElements,
  trimSpaceDelimitedArguments,
} from '../utils/forFetcher/transformOptionString';
import { mergeLists } from '../utils/utils';

// BUG: Some options have optional "no-" in their names like "--[no-]verbose".
//      The fetcher just ignores the optional part and only fetches "--verbose".
// BUG: One of the options of "gem dependency", "-R, --[no-]reverse-dependencies"
//      has inconsistent structure and is not recognized as an option.

export const gem: Fetcher = {
  fetch: () => fetch(),
};

interface SubcommandLocation {
  command: string;
  headingID: string;
}

const OPTION_STYLE = OptionStyle.SHORT_AND_LONG;
const DOC_URL = 'https://guides.rubygems.org/command-reference/';

const fetch = async (): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(new URL(DOC_URL));
  const subcommandLocations = fetchSubcommandLocations(document);
  const commands: Command[] = [];
  for (const subcommandLocation of subcommandLocations) {
    const subcommand = fetchSubcommand(document, subcommandLocation);
    if (subcommand) {
      commands.push(subcommand);
    }
  }
  return commands;
};

const fetchSubcommandLocations = (document: Document): SubcommandLocation[] => {
  // Assume the first <ul> in the page is the command list.
  const list = document.querySelector('ul');
  if (!list) {
    return [];
  }
  const anchors = findAnchorsWithPattern(list, /#gem-/, /^gem/);
  return anchors.map((anchor) => ({
    command: getInnerText(anchor).trim(),
    headingID: anchor.href.split('#')[1],
  }));
};

const fetchSubcommand = (
  document: Document,
  { command, headingID }: SubcommandLocation
): Command | null => {
  const heading = document.querySelector(`#${headingID}`);
  if (!heading) {
    return null;
  }
  const uls = findElementsUnderHeading(heading, ['h1', 'h2'], 'ul');
  const lis = mergeLists(
    uls.map((ul) => Array.from(ul.querySelectorAll('ul > li')))
  );
  const options = mergeLists(lis.map((li) => listItemToOptions(li)));
  return {
    name: command,
    optionStyle: OPTION_STYLE,
    options: uniqueOptions(options),
  };
};

const listItemToOptions = (listItem: Element): Option[] => {
  const text = getInnerText(listItem);
  const firstCodeElement = listItem.querySelector('code');
  if (!firstCodeElement) {
    return [];
  }
  const firstCodeText = getInnerText(firstCodeElement);
  if (!text.startsWith(`${firstCodeText} - `)) {
    return [];
  }
  const title = firstCodeText;
  const description = text.slice(firstCodeText.length + 3); // 3 = " - "
  const optionStrings = transformOptionStrings(
    [title],
    [
      splitByComma,
      trimOptionalElements,
      trimSpaceDelimitedArguments,
      trimEqualDelimitedArguments,
    ]
  );
  return makeOptionList(optionStrings, OPTION_STYLE, title, description);
};
