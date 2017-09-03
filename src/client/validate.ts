import * as path from 'path';
import * as _ from 'lodash';

import { load } from './load';
import { Redprint } from '../Redprint';

export const validate = (key: string, input: any, filename?: string) => {
  const redprint = load(filename);

  const validation = _.get(redprint, key);
  if (typeof validation !== 'string')
    throw new Error('Invalid key');

  return eval(validation)(input) as boolean;
};