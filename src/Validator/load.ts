import * as path from 'path';
import * as fs from 'fs-extra';

import { Redprint } from '../Redprint';

export const load = (filename: string = 'redprint.json') => {
  try {
    return fs.readJSONSync(path.join(process.cwd(), filename));
  } catch (err) {
    throw new Error('Redprint file does not exist');
  }
};