import * as path from 'path';

import { Redprint } from '../Redprint';

export const load = (filename: string = 'redprint.json') => {
  try {
    const redprint: Redprint = require(path.join(process.cwd(), filename));
    return redprint;
  } catch (err) {
    throw new Error('Redprint file does not exist');
  }
};