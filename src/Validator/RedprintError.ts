export class RedprintError extends Error {
  constructor(input: any, key: string, validationName: string) {
    const msg = `'${input}' is invalid ${key} for '${validationName}' validation`;
    super(msg);

    Object.setPrototypeOf(this, RedprintError.prototype);
  }
}