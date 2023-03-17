interface BaseType {
    _exists: boolean;
    _namespace: string;
}

export interface _boolean extends BaseType { content: boolean }

export interface _number extends BaseType { content: number }

export interface _string extends BaseType { content: string }
