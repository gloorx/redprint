import * as path from 'path';
import * as fs from 'fs-extra';
import * as _ from 'lodash';

import { Redprint } from '../Redprint';

export const store = (redprint: Redprint, filename = 'redprint.json') => {
  const filepath = path.join(process.cwd(), filename);
  const data = fs.existsSync(filepath) ? fs.readJsonSync(filepath) : {};
  const mergedRedprint = _.merge(data, redprint);
  fs.writeJsonSync(filepath, mergedRedprint);
};