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
    _.each(attribute, (validationString, validationName) => {
      const validation = eval(validationString);

      try {
        // if validation does not return true or nothing
        // if validation throws an Error
        if (!(validation(input) || typeof validation(input) === 'undefined'))
          throw new Error();
      } catch (err) {
          throw new RedprintError(input, key, validationName);
      }

    });
    return true;
  };
}

export const { validate } = new Validator();
