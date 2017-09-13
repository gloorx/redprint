import * as fs from 'fs-extra';
import * as mock from 'mock-fs';
import * as path from 'path';
import * as _ from 'lodash';

import { debug } from './debug';
import { store } from './store';
import { stringify } from './stringify';
import { red, getPurifier, setPurifier } from '.';

describe('stringify()', () => {
  it('throws an Error if validation cannot convert to string', () => {
    const input: any = {
      Model: {
        attribute: {
          validation: undefined
        }
      }
    };

    expect(() => { stringify(input); }).toThrow();
  });


  it('convert input to redprint', () => {
    const input: any = {
      Model: {
        attribute: {
          validation: () => true
        }
      }
    };

    expect(stringify(input)).toEqual({
      Model: {
        attribute: {
          validation: '() => true'
        }
      }
    });
  });
});



describe('debug()', () => {
  it('throws an Error if redprint is not object type', () => {
    const redprint: any = 'Hello!';

    expect(() => { debug(redprint); }).toThrowError('Redprint must be an object');
  });


  it('throws an Error if some models are not object type', () => {
    const redprint: any = {
      Model: 'Hello!'
    };

    expect(() => { debug(redprint); }).toThrowError('Model must be an object');
  });


  it('throws an Error if some attributes are not object type', () => {
    const redprint: any = {
      Model: {
        attribute: 'Hello'
      }
    };

    expect(() => { debug(redprint); }).toThrowError('Attribute must be an object');
  });


  it('throws an Error if some validations are not string type', () => {
    const redprint: any = {
      Model: {
        attribute: {
          validation: 1
        }
      }
    };

    expect(() => { debug(redprint); }).toThrowError('Validation must be a string');
  });


  it('throws an Error if some validations are not convertable to function', () => {
    const redprint: any = {
      Model: {
        attribute: {
          validation: '{}'
        }
      }
    };

    expect(() => { debug(redprint); }).toThrowError('Validation must be convertable to function');
  });


  it('throws an Error if some validation has two or more arguments', () => {
    const redprint: any = {
      Model: {
        attribute: {
          validation: '() => true'
        }
      }
    };

    expect(() => { debug(redprint); }).toThrowError('Validation must have a single argument');
  });


  it('throws an Error if some validations do not return boolean type', () => {
    const redprint: any = {
      Model: {
        attribute: {
          validation: "(i) => 'Hello!'"
        }
      }
    };

    expect(() => { debug(redprint); }).toThrowError('Validation must return boolean');
  });


  it('does not throw an Error', () => {
    const redprint: any = {
      Model: {
        attribute: {
          validation: '(i) => true'
        }
      }
    };

    expect(() => { debug(redprint); }).not.toThrow();
  });
});



describe('store()', () => {
  afterEach(mock.restore);

  it('throws an Error if redprint.json is not valid', () => {
    mock({ 'redprint.json': 'Hello!' });
    const redprint = {};

    expect(() => { store(redprint); }).toThrow();
  });


  it('create redprint.json if not exists', () => {
    mock();
    const redprint = {};

    store(redprint);
    const data = fs.readJsonSync(path.join(process.cwd(), 'redprint.json'));
    expect(data).toEqual(redprint);
  });


  it('adds a model if not exist', () => {
    mock({
      'redprint.json': JSON.stringify({
        Model1: {}
      })
    });
    const redprint = {
      Model2: {}
    };

    store(redprint);
    const data = fs.readJsonSync(path.join(process.cwd(), 'redprint.json'));
    expect(data).toEqual({
      Model1: {},
      Model2: {}
    });
  });


  it('adds a attribute if not exist', () => {
    mock({
      'redprint.json': JSON.stringify({
        Model: {
          attribute1: {}
        }
      })
    });
    const redprint = {
      Model: {
        attribute2: {}
      }
    };

    store(redprint);
    const data = fs.readJsonSync(path.join(process.cwd(), 'redprint.json'));

    expect(data).toEqual({
      Model: {
        attribute1: {},
        attribute2: {},
      }
    });
  });


  it('adds a validation if not exist', () => {
    mock({
      'redprint.json': JSON.stringify({
        Model: {
          attribute: {
            validation1: '() => true'
          }
        }
      })
    });
    const redprint = {
      Model: {
        attribute: {
          validation2: '() => true'
        }
      }
    };

    store(redprint);
    const data = fs.readJsonSync(path.join(process.cwd(), 'redprint.json'));

    expect(data).toEqual({
      Model: {
        attribute: {
          validation1: '() => true',
          validation2: '() => true',
        }
      }
    });
  });
});



describe('red()', () => {
  afterEach(mock.restore);

  it('returns the argument intactly if the argument is singular', () => {
    mock();
    const input = {};

    expect(red(input)).toEqual(input);
  });

  it('returns the arguments as array if the arguments is multiple', () => {
    mock();
    const input = [{}, {}, {}];

    expect(red(...input)).toEqual(input);
  });

  it('stores redprint at redprint.json', () => {
    mock();
    const input = {};

    red(input);
    const data = fs.readJsonSync(path.join(process.cwd(), 'redprint.json'));

    expect(data).toEqual({});
  });
});



describe('getPurifier()', () => {
  it('returns a function', () => {
    expect(typeof getPurifier()).toEqual('function');
  });
});



describe('setPurifier()', () => {
  it('sets a purifier', () => {
    const purifier: any = () => {};
    setPurifier(purifier);
    expect(getPurifier()).toEqual(purifier);
  });
});