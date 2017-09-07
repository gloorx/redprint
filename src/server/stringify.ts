import * as _ from 'lodash';

import { Redprint, Convertable } from '../Redprint';

export const stringify  = (convertable: Convertable): Redprint => {
  try {

    // Iterate each model
    const redprint = _.reduce(convertable, (redprint, model, modelName) => {

      // Iterate each attribute
      const convertedModel = _.reduce(model, (convertedModel, attribute, attributeName) => {

        // Iterate each validation
        const convertedAttribute = _.reduce(attribute, (convertedAttribute, validation, validationName) => {

          _.set(convertedAttribute, validationName, validation.toString());
          return convertedAttribute;
        }, {});

        _.set(convertedModel, attributeName, convertedAttribute);
        return convertedModel;
      }, {});

      _.set(redprint, modelName, convertedModel);
      return redprint;
    }, {});

    return redprint;

  } catch (err) {
    throw new Error(`Cannot convert to redprint: '${err.message}'`);
  }
};