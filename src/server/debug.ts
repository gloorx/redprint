import * as _ from 'lodash';

import { Redprint } from '../Redprint';

export const debug = (redprint: Redprint) => {

  // verify redprint type
  if (typeof redprint !== 'object')
    throw new Error('Redprint must be an object');

  _.map(redprint, model => {
    // verify model type
    if (typeof model !== 'object')
      throw new Error('Model must be an object');

    _.map(model, validation => {
      // verify validation type
      if (typeof validation !== 'string')
        throw new Error('Validation must be a string');

      // verify validation is convertable to function
      try {
        if (typeof eval(validation) !== 'function') throw new Error;
      } catch (err) {
        throw new Error('Validation must be convertable to function');
      }

      // verify validation returns boolean
      if (typeof eval(validation)('random string') !== 'boolean')
        throw new Error('Validation must return boolean');
    });
  });
};
