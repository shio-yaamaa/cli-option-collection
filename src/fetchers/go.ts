import { Command, Fetcher, Option } from '../types';
import { getInnerText } from '../utils/dom';
import { fetchDocumentFromURL } from '../utils/forFetcher/http';
import { uniqueOptions } from '../utils/forFetcher/options';
import { makeOptionList } from '../utils/forFetcher/optionString';
import {
  normalizeCommaDelimitedString,
  splitByMultipleDelimiters,
} from '../utils/forFetcher/string';
import {
  transformOptionStrings,
  trimOptionalElements,
  trimSpaceDelimitedArguments,
  trimEqualDelimitedArguments,
} from '../utils/forFetcher/transformOptionString';
import { findHeadingContentsPairs } from '../utils/forFetcher/utils';
import { isElement } from '../utils/typeGuards';

// Alternative sources:
// - https://github.com/golang/go/blob/master/src/cmd/go/internal/test/test.go#L139
// - https://github.com/golang/go/blob/master/src/cmd/go/alldocs.go
//   (Generated by mkalldocs.sh)
// - https://manpages.debian.org/testing/golang-go/go-build.1.en.html
//   (Could not find the source for this page)

// NOTE: Go's help and documentation sometimes describe command line options in sentences
//       and not in consistent list format.
//       Even if there is a list, not all the options are listed (e.g. "go test").
//       This fetcher cannot fetch all the options and may easily break.
// NOTE: Go does not plan to have man page. https://github.com/golang/go/issues/101
// BUG: Flags presented in "Testing flags" section are not fetched.
// BUG: When there are multiple flag explanations in a single paragraph, only the first one can be fetched.
//      (e.g. go fmt's -n and -x)

interface Section {
  usage: string;
  paragraphs: string[];
  pres: string[];
}

const DOC_URL = 'https://pkg.go.dev/cmd/go';
const COMMAND_WORD_PATTERN = /^[A-Za-z][A-Za-z0-9-]*$/;

export const go: Fetcher = {
  fetch: () => fetch(),
};

const fetch = async (): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(new URL(DOC_URL));
  const sections = getSections(document);
  const commands: Command[] = [];
  for (const section of sections) {
    const command = sectionToCommand(section);
    if (command) {
      commands.push(command);
    }
  }
  return commands;
};

const getSections = (document: Document): Section[] => {
  const sections: Section[] = [];

  const h4s = Array.from(document.querySelectorAll('h4'));
  for (const h4 of h4s) {
    let usage: string | null = null;
    const paragraphs: string[] = [];
    const preTexts: string[] = [];

    let currentElement: Element | null = h4;
    do {
      const text = getInnerText(currentElement);
      switch (currentElement.tagName.toLowerCase()) {
        case 'p':
          paragraphs.push(text);
          break;
        case 'pre':
          if (!usage) {
            const previousElement = currentElement.previousElementSibling;
            if (
              previousElement &&
              getInnerText(previousElement).trim() === 'Usage:'
            ) {
              usage = text;
            } else {
              preTexts.push(text);
            }
          }
          preTexts.push(text);
          break;
      }
      currentElement = currentElement.nextElementSibling;
    } while (currentElement && !isElement(currentElement, 'h4'));

    if (usage) {
      sections.push({
        usage,
        paragraphs,
        pres: preTexts,
      });
    }
  }

  return sections;
};

const sectionToCommand = (section: Section): Command | null => {
  const commandName = usageToCommandName(section.usage);
  if (!commandName) {
    return null;
  }

  const options: Option[] = [];
  for (const pre of section.pres) {
    options.push(...preToOptions(pre));
  }
  for (const paragraph of section.paragraphs) {
    options.push(...paragraphToOptions(paragraph));
  }
  if (options.length === 0) {
    return null;
  }

  return {
    name: commandName,
    options: uniqueOptions(options),
  };
};

// Example: "go mod why [-m] [-vendor] packages..." -> "go mod why"
const usageToCommandName = (usage: string): string | null => {
  const words = usage.split(' ');
  const commandWords = [];
  for (const word of words) {
    if (COMMAND_WORD_PATTERN.test(word)) {
      commandWords.push(word);
    } else {
      break;
    }
  }
  if (commandWords.length === 0) {
    return null;
  }
  return commandWords.join(' ');
};

const FLAG_LIKE_PATTERN = /^-[A-Za-z]/;
const DESCRIPTION_LIKE_PATTERN = /^(?:\t|(\s{4}))[^\t\s]/;
const preToOptions = (pre: string): Option[] => {
  const options: Option[] = [];

  const lines = pre.split('\n');

  const isFlagLine = (line: string) => FLAG_LIKE_PATTERN.test(line);
  const isDescriptionLine = (line: string) =>
    DESCRIPTION_LIKE_PATTERN.test(line);
  const flagDescriptionLinesPairs = findHeadingContentsPairs(
    lines,
    isFlagLine,
    isDescriptionLine
  );

  for (const { heading, contents } of flagDescriptionLinesPairs) {
    const flag = heading;
    const title = flag.trim();
    const description = contents.map((line) => line.trim()).join(' ');
    const optionString = transformOptionStrings(
      [flag],
      [
        trimOptionalElements,
        trimSpaceDelimitedArguments,
        trimEqualDelimitedArguments,
      ]
    )[0];
    options.push(...makeOptionList([optionString], title, description));
  }

  return options;
};

// Examples
// One flag: "The -i flag causes ..."
// Two flags: "The -require=path@version and -droprequire=path flags add and drop ..."
// More than three flags: "The -asmflags, -gccgoflags, -gcflags, and -ldflags flags accept ..."
const SENTENCE_SUBJECT_FLAG_PATTERN =
  /^The\s([A-Za-z0-9-\s\[\],@=]+)\sflags?\s/;
const FLAG_PATTERN = /^-[A-Za-z][A-Za-z0-9-]*/;
const paragraphToOptions = (paragraph: string): Option[] => {
  const matches = paragraph.match(SENTENCE_SUBJECT_FLAG_PATTERN);
  const sentenceSubjectFlag =
    matches && matches.length >= 2 ? matches[1].trim() : null;
  if (!sentenceSubjectFlag) {
    return [];
  }
  const flags = splitByMultipleDelimiters(sentenceSubjectFlag, [',', 'and']);
  const allValidFlags = flags.every((flag) => FLAG_PATTERN.test(flag));
  if (!allValidFlags) {
    return [];
  }

  const optionTitle = normalizeCommaDelimitedString(sentenceSubjectFlag);
  const optionDescription = paragraph.trim().replace(/\n/g, ' ');

  const optionStrings = transformOptionStrings(flags, [
    trimOptionalElements,
    trimSpaceDelimitedArguments,
    trimEqualDelimitedArguments,
  ]);
  return makeOptionListForSingleDashStyle(
    optionStrings,
    optionTitle,
    optionDescription
  );
};
