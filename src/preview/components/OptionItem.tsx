import React from 'react';

import { Option } from '../../types';

interface Props {
  option: Option;
}

export const OptionItem: React.VFC<Props> = (props) => (
  <p>
    <code>{props.option.title}</code> ({props.option.type},{' '}
    <code>{props.option.key}</code>): {props.option.description}
  </p>
);
