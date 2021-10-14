import React from 'react';

import './OptionItem.css';
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
  const optionLengthType = props.option.key.length === 1 ? 'short' : 'long';
  return (
    <div>
      <p>
        <code className="title">{props.option.title}</code>
        <span className={`type ${optionLengthType}`}>
          {optionLengthType.toUpperCase()}
        </span>
        <code>{props.option.key}</code>
      </p>
      <p dangerouslySetInnerHTML={{ __html: descriptionHTML }}></p>
    </div>
  );
};
