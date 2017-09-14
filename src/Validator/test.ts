import * as fs from 'fs-extra';
import * as mock from 'mock-fs';
import * as path from 'path';

import { load } from './load';
import { validate } from '.';

describe('load()', () => {
  afterEach(mock.restore);

  it('throws an Error if the file does not exist', () => {
    mock();
    expect(() => { load(); }).toThrowError('Redprint file does not exist');
  });

  it('returns an Redprint if the file does not exist', () => {
    mock({ 'redprint.json': '{}' });
    expect(load()).toEqual({});
  });
});



describe('validate()', () => {
  afterEach(mock.restore);

  it('throws an Error if key is invalid', () => {
    mock({
      'redprint.json': JSON.stringify({
        Model: {
          attribute1: {
            validation: 'input => true'
          },
          attribute2: {
            validation: 'input => false'
          }
        }
      })
    });

    const input = 'hello';
    expect(() => { validate('Model', input); }).toThrowError('Invalid key');
  });


  it('throws an Error if the validation returns false', () => {
    mock({
      'redprint.json': JSON.stringify({
        Model: {
          attribute: {
            validation: 'input => false'
          }
        }
      })
    });

    const input = 'hello';
    expect(() => { validate('Model.attribute', input); }).toThrowError(
      "'hello' is invalid Model.attribute for 'validation' validation"
    );
  });

  it('throws an Error if the validation throws an Error', () => {
    mock({
      'redprint.json': JSON.stringify({
        Model: {
          attribute: {
            validation: 'input => { throw new Error(); }'
          }
        }
      })
    });

    const input = 'hello';
    expect(() => { validate('Model.attribute', input); }).toThrowError(
      "'hello' is invalid Model.attribute for 'validation' validation"
    );
  });

  it('returns true if the validation returns nothing', () => {
    mock({
      'redprint.json': JSON.stringify({
        Mode: {
          attribute: {
            validation: 'input => {}'
          }
        }
      })
    });

    const input = 'hello';
    expect(validate('Model.attribute', input)).toBeTruthy();
  });

  it('returns true if the validation returns true', () => {
    mock({
      'redprint.json': JSON.stringify({
        Model: {
          attribute: {
            validation: 'input => true'
          }
        }
      })
    });

    const input = 'hello';
    expect(validate('Model.attribute', input)).toBeTruthy();
  });
});