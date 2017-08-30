import { toRedprint } from './toRedprint';
import { debug } from './debug';
import { store } from './store';

import { Convertable } from '../Redprint';

export const red = (convertable: Convertable) => {
  const redprint = toRedprint(convertable);
  debug(redprint);
  store(redprint);
  return convertable;
};