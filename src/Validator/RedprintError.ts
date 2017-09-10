export class RedprintError extends Error {
  public input: any;
  public key: string;
  public validationName: string;
  constructor(input: any, key: string, validationName: string) {
    const message = `'${input}' is invalid ${key} for '${validationName}' validation`;
    super(message);

    this.input = input;
    this.key = key;
    this.validationName = validationName;

    Object.setPrototypeOf(this, RedprintError.prototype);
  }
}