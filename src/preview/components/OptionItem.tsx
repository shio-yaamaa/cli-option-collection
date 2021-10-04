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
  return (
    <p>
      <p>
        <code className="title">{props.option.title}</code>
        <span className={`type ${props.option.type}`}>
          {props.option.type.toUpperCase()}
        </span>
        <code>{props.option.key}</code>
      </p>
      <p dangerouslySetInnerHTML={{ __html: descriptionHTML }}></p>
    </p>
  );
};
