export interface Redprint {
  [model: string]: {
    [property: string]: {
      [validation: string]: string;
    }
  };
}

export interface Convertable {
  [model: string]: {
    [property: string]: {
      [validation: string]: Function;
    }
  };
}
