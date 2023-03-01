interface Value {
    '_value': string;
}

interface Text {
    '_text': string;
}

interface Div {
    '_attrstyle': Value;
    '_text': string;
}

interface Parsererror {
    '_attrstyle': Value;
    'h3': Text[];
    'div': Div[];
}

interface Body {
    'parsererror': Parsererror[];
}

export interface Html {
    'body': Body[];
}
