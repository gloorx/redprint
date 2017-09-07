import { purify } from './purify';
import { stringify } from './stringify';
import { debug } from './debug';
import { store } from './store';

import { Convertable } from '../Redprint';

interface RedprintConfig {
  filename?: string;
  purifier​?: Function;
}

class Red {
  static config: RedprintConfig;

  constructor() {
    Red.config = {};
  }

  red = (validations: any) => {
    const { config } = Red;

    const convertable = purify(validations, config.purifier​);
    const redprint = stringify(convertable);
    debug(redprint);
    store(redprint, config.filename);
    return convertable;
  };

  setConfig = (config: RedprintConfig) => {
    const { filename, purifier​ } = config;

    if (filename) Red.config.filename = filename;
    if (purifier) Red.config.purifier = purifier;
  };
}

export const { red, setConfig } = new Red();