import { Option } from '../../types';
import { uniqueBy } from '../utils';

export const uniqueOptions = (options: Option[]): Option[] =>
  uniqueBy(options, (option) => [option.type, option.key]);
