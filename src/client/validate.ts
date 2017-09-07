import * as path from 'path';
import * as _ from 'lodash';

import { load } from './load';
import { Redprint } from '../Redprint';

export const validate = (key: string, input: any, filename?: string) => {
  const redprint = load(filename);

  // validate key
  if (!key.match(/\w+\.\w+/))
    throw new Error('Invalid key');

  const attribute = _.get(redprint, key);
  _.each(attribute, (validation, validationName) => {
    if (!eval(validation)(input))
      // RedError design
      throw new Error(`${key} cannot pass to validate '${validationName}'`);

  });
  return true;
};