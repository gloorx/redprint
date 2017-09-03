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


  it('throws an Error if key is invalid', () => {
    mock({
      'redprint.json': JSON.stringify({
        Model: {
          property1: {
            validation: 'input => true'
          },
          property2: {
            validation: 'input => false'
          }
        }
      })
    });

    const input = 'hello';
    expect(() => { validate('Model', input); }).toThrowError('Invalid key');
  });


  it('throws. an Error if input cannot pass some validation', () => {
    mock({
      'redprint.json': JSON.stringify({
        Model: {
          property1: {
            validation: 'input => true'
          },
          property2: {
            validation: 'input => false'
          }
        }
      })
    });

    const input = 'hello';
    expect(() => { validate('Model.property2', input); }).toThrowError(
      "Model.property2 cannot pass to validate 'validation'"
    );
  });


  it('returns boolean', () => {
    mock({
      'redprint.json': JSON.stringify({
        Model: {
          property1: {
            validation: 'input => true'
          },
          property2: {
            validation: 'input => false'
          }
        }
      })
    });

    const input = 'hello';
    expect(validate('Model.property1', input)).toBeTruthy();
  });
});