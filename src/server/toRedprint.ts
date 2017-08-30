import * as _ from 'lodash';

import { Redprint, Convertable } from '../Redprint';

export const toRedprint = (convertable: Convertable) => {
  try {

    // Iterate each model
    const redprint = _.reduce(convertable, (redprint, model, modelName) => {

      // Iterate each property
      const convertedModel = _.reduce(model, (convertedModel, validation, property) => {
        _.set(convertedModel, property, validation.toString());
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