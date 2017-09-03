import * as fs from 'fs-extra';
import * as mock from 'mock-fs';
import * as path from 'path';

import { load } from './load';
import { validate } from './validate';

describe('[ load() ]', () => {
  afterEach(() => {
    mock.restore();
  });

  it('throws an Error if redprint file does not exist', () => {
    mock();

    const input = 'hello';
    expect(() => { load('blueprint.json'); }).toThrowError('Redprint file does not exist');
  });
});



describe('[ validate() ]', () => {
  afterEach(() => {
    mock.restore();
  });

  it('throws an Error if validation is not a string', () => {
    mock({
      'redprint.json': JSON.stringify({
        Model: {
          username: '(input) => true'
        }
      })
    });

    const input = 'hello';
    expect(() => { validate('Model', input); }).toThrowError('Invalid key');
  });

  it('returns boolean', () => {
    mock({
      'redprint.json': JSON.stringify({
        Model: {
          username: '(input) => true'
        }
      })
    });

    const input = 'hello';
    expect(typeof validate('Model.username', input)).toEqual('boolean');
  });
});