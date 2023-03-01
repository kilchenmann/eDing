export interface Value {
    '_value': string;
}

export interface Text {
    '_text': string;
}

export interface Div {
    '_attrstyle': Value;
    '_text': string;
}

export interface Parsererror {
    '_attrstyle': Value;
    'h3': Text[];
    'div': Div[];
}

export interface Body {
    'parsererror': Parsererror[];
}

export interface Html {
    'body': Body[];
}

export interface XmlError {
    'html': Html[];
}
