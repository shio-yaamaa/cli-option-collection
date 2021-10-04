import React from 'react';

import { Option } from '../../types';
import { escapeHTML } from '../../utils/string';

interface Props {
  option: Option;
}

export const OptionItem: React.VFC<Props> = (props) => {
  const descriptionHTML = escapeHTML(props.option.description).replace(
    /\n/g,
    '<br>'
  );
  return (
    <p>
      <code>{props.option.title}</code> ({props.option.type},{' '}
      <code>{props.option.key}</code>):{' '}
      <span dangerouslySetInnerHTML={{ __html: descriptionHTML }}></span>
    </p>
  );
};
