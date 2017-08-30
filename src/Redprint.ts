export interface Redprint {
  [model: string]: {
    [property: string]: string;
  };
}

export interface Convertable {
  [model: string]: {
    [property: string]: Function;
  };
}
