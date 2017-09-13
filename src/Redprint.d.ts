export interface Redprint {
  [model: string]: {
    [attribute: string]: {
      [validation: string]: string;
    }
  };
}

export interface Convertable {
  [model: string]: {
    [attribute: string]: {
      [validation: string]: Validation;
    }
  };
}

export interface Validation {
  (input: string): boolean;
}

export interface Purifier {
  (args?: any): Convertable;
}