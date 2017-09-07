import { stringify } from './stringify';
import { debug } from './debug';
import { store } from './store';

import { Redprint, Convertable } from '../Redprint';

interface RedprintConfig {
  [key: string]: any;
  filename?: string;
  purifier?: Function;
}

class Red {
  static config: RedprintConfig;

  constructor() {
    Red.config = {
      filename: 'redprint.json',
      purifier: (validations: Redprint) => validations,
    };
  }

  red = (...args: any[]) => {
    const convertable: Convertable = Red.config.purifier(...args);
    const redprint = stringify(convertable);
    debug(redprint);
    store(redprint, Red.config.filename);
    return args.length == 1 ? args[0] : args;
  };

  setConfig = (config: RedprintConfig) => {
    const { filename, purifier } = config;

    Object.keys(config).forEach(key => {
      Red.config[key] = config[key];
    });
  };
}

export const { red, setConfig } = new Red();