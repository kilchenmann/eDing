export const XML_OPTIONS = {
    mergeCDATA: false,      // extract cdata and merge with text nodes
    grokAttr: true,         // convert truthy attributes to boolean, etc
    grokText: false,         // convert truthy text/attr to boolean, etc
    normalize: true,        // collapse multiple spaces to single space
    xmlns: false,           // include namespaces as attributes in output
    namespaceKey: '_ns',    // tag name for namespace objects
    textKey: '_text',       // tag name for text nodes
    valueKey: '_value',     // tag name for attribute values
    attrKey: '_attr',       // tag for attr groups
    cdataKey: '_cdata',     // tag for cdata nodes (ignored if mergeCDATA is true)
    attrsAsObject: false,   // if false, key is used as prefix to name, set prefix to '' to merge children and attrs.
    stripAttrPrefix: true,  // remove namespace prefixes from attributes
    stripElemPrefix: true,  // for elements of same name in diff namespaces, you can enable namespaces and access the nskey property
    childrenAsArray: true   // force children into arrays
};
