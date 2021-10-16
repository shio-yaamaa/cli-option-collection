import { Command, Option, OptionStyle } from '../../types';
import { getInnerText } from '../../utils/dom';
import { findElementsUnderHeading } from '../../utils/forFetcher/dom';
import { fetchDocumentFromMarkdownPageURL } from '../../utils/forFetcher/http';
import { uniqueOptions } from '../../utils/forFetcher/options';
import { makeOptionList } from '../../utils/forFetcher/optionString';
import {
  splitByComma,
  transformOptionStrings,
  trimEqualDelimitedArguments,
  trimOptionalElements,
  trimSpaceDelimitedArguments,
} from '../../utils/forFetcher/transformOptionString';
import { squashLinebreaks } from '../../utils/string';
import { mergeLists } from '../../utils/utils';

const OPTION_STYLE = OptionStyle.SHORT_AND_LONG;
const DOC_URL =
  'https://raw.githubusercontent.com/rockdaboot/wget2/master/docs/wget2.md';

export const fetchWget2 = async (): Promise<Command[]> => {
  const document = await fetchDocumentFromMarkdownPageURL(new URL(DOC_URL));
  const optionsHeading = document.querySelector('#options');
  if (!optionsHeading) {
    return [];
  }
  const optionContainers = findElementsUnderHeading(
    optionsHeading,
    ['h1'],
    'a'
  );
  const optionElements = mergeLists(
    optionContainers.map((container) =>
      Array.from(container.querySelectorAll('body > a > h3'))
    )
  );
  const options = mergeLists(
    optionElements.map((element) => optionElementToOptions(element))
  );
  return [
    {
      name: 'wget2',
      optionStyle: OPTION_STYLE,
      options: uniqueOptions(options),
    },
  ];
};

const optionElementToOptions = (element: Element): Option[] => {
  const title = getInnerText(element);
  const optionStrings = transformOptionStrings(
    [title],
    [
      splitByComma,
      trimOptionalElements,
      trimSpaceDelimitedArguments,
      trimEqualDelimitedArguments,
    ]
  );
  const contents = findElementsUnderHeading(element, ['h1', 'h2', 'h3'], '*');
  const description = squashLinebreaks(
    contents.map((content) => getInnerText(content)).join('\n\n')
  );

  return makeOptionList(optionStrings, OPTION_STYLE, title, description);
};
