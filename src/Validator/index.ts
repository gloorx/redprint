import * as path from 'path';
import * as _ from 'lodash';

import { load } from './load';
import { RedprintError } from './RedprintError';

class Validator {

  validate = (key: string, input: any) => {
    const redprint = load();

    // validate key
    if (!key.match(/\w+\.\w+/))
      throw new Error('Invalid key');

    const attribute = _.get(redprint, key);
    _.each(attribute, (validation, validationName) => {
      if (!eval(validation)(input))
        // RedError design
        throw new RedprintError(input, key, validationName);

    });
    return true;
  };
}

export const { validate } = new Validator();
