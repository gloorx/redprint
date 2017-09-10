import { stringify } from './stringify';
import { debug } from './debug';
import { store } from './store';

import { Redprint, Convertable } from '../Redprint';

class Red {
  purifier: Function;

  constructor() {
    this.purifier = (validations: Convertable) => validations;
  }

  red = (...args: any[]) => {
    const convertable: Convertable = this.purifier(...args);
    const redprint = stringify(convertable);
    debug(redprint);
    store(redprint);
    return args.length == 1 ? args[0] : args;
  }

  getPurifier = () => this.purifier;

  setPurifier = (purifier: Function) => {
    this.purifier = purifier;
  }
}

export const { red, getPurifier, setPurifier } = new Red();