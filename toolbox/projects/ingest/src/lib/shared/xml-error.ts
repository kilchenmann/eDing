export interface Attributes {
  style: string;
}

export interface ParserError {
  "@attributes": Attributes;
  "h3": string[];
  "div": string;
}

export interface Body {
  "parsererror": ParserError;
}

export interface Html {
  "body": Body;
}

export interface XmlError {
  "html": Html;
}
