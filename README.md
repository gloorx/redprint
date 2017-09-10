# Redprint

A tool for sharing validations

## Goal

When developing a web application, there were 2 options for validating user input between API suppliers and consumers. A consumer can have validations on its own by refering API documents, or wait the result of validations from a API supplier. On the former, it cannot be ensured that consumer's validations works same with API supplier's. On the latter, there are limits to validate in real-time because of network latency.

## Schema

For using Redprint, API validation must fit in `Redprint` schema.

It shapes
```js
{
  <modelName>: {
    <attributeName>: {
      <validationName>: <validation>
    }
  }
}
```

`validation` is a function. It must receive 1 argument, and return boolean.

For example, It can be like
```js
{
  User: {
    username: {
      notEmpty: (input) => (input.length !== 0),
      isAlpha: (input) => (/^[a-z0-9]+$/.test(input)),
    },
    password: {
      notEmpty: (input) => (input.length !== 0),
    },
  }
}
```

## Install

```sh
npm install redprint
```

## Usage

### Supplier-side

If your validation code is
```js
const validation = {
  User: {
    username: {
      notEmpty: (input) => (input.length !== 0)
    }
  }
};
```

Just do like
```js
import { red } from 'redprint';
const validation = red({
  User: {
    username: {
      notEmpty: (input) => (input.length !== 0)
    }
  }
});
```

Then run server. 'redprint.json' is generated in your project root. Provide this file for your API comsumers.

### Comsumer-side

At first, locate 'redprint.json' provided from API supplier in your project root.

```js
import { validate } from 'redprint';

const username = getUsernameFromForm();
try {
  validate('User.username', username);
} catch (err) {
  handleError(err);
  console.log(err.message);
  // RedprintError: '' is invalid User.username for 'notEmpty' validation
}
```