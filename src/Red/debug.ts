import * as _ from 'lodash';

import { Redprint } from '../Redprint';

export const debug = (redprint: Redprint) => {

  // verify redprint type
  if (typeof redprint !== 'object')
    throw new Error('Redprint must be an object');

  _.each(redprint, model => {
    // verify model type
    if (typeof model !== 'object')
      throw new Error('Model must be an object');

    _.each(model, attribute => {
      // verify attribute type
      if (typeof attribute !== 'object')
        throw new Error('Attribute must be an object');

      _.each(attribute, validation => {
        // verify validation type
        if (typeof validation !== 'string')
          throw new Error('Validation must be a string');

        // verify validation is convertable to function
        try {
          if (typeof eval(validation) !== 'function') throw new Error;
        } catch (err) {
          throw new Error('Validation must be convertable to function');
        }

        if (eval(validation).length !== 1)
          throw new Error('Validation must have a single argument');
      });
    });
  });
};
