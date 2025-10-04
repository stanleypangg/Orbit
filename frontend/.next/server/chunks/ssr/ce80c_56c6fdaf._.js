module.exports = [
"[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
        default: obj
    };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }
    newObj.default = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
exports._ = _interop_require_wildcard;
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_class_private_field_loose_base.cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _class_private_field_loose_base(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
        throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
}
exports._ = _class_private_field_loose_base;
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_class_private_field_loose_key.cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var id = 0;
function _class_private_field_loose_key(name) {
    return "__private_" + id++ + "_" + name;
}
exports._ = _class_private_field_loose_key;
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports._ = _interop_require_default;
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/fast-deep-equal/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// do not edit .js files directly - edit src/index.jst
module.exports = function equal(a, b) {
    if (a === b) return true;
    if (a && b && typeof a == 'object' && typeof b == 'object') {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
            length = a.length;
            if (length != b.length) return false;
            for(i = length; i-- !== 0;)if (!equal(a[i], b[i])) return false;
            return true;
        }
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for(i = length; i-- !== 0;)if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        for(i = length; i-- !== 0;){
            var key = keys[i];
            if (!equal(a[key], b[key])) return false;
        }
        return true;
    }
    // true if both NaN, false otherwise
    return a !== a && b !== b;
};
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/json-schema-traverse/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var traverse = module.exports = function(schema, opts, cb) {
    // Legacy support for v0.3.1 and earlier.
    if (typeof opts == 'function') {
        cb = opts;
        opts = {};
    }
    cb = opts.cb || cb;
    var pre = typeof cb == 'function' ? cb : cb.pre || function() {};
    var post = cb.post || function() {};
    _traverse(opts, pre, post, schema, '', schema);
};
traverse.keywords = {
    additionalItems: true,
    items: true,
    contains: true,
    additionalProperties: true,
    propertyNames: true,
    not: true,
    if: true,
    then: true,
    else: true
};
traverse.arrayKeywords = {
    items: true,
    allOf: true,
    anyOf: true,
    oneOf: true
};
traverse.propsKeywords = {
    $defs: true,
    definitions: true,
    properties: true,
    patternProperties: true,
    dependencies: true
};
traverse.skipKeywords = {
    default: true,
    enum: true,
    const: true,
    required: true,
    maximum: true,
    minimum: true,
    exclusiveMaximum: true,
    exclusiveMinimum: true,
    multipleOf: true,
    maxLength: true,
    minLength: true,
    pattern: true,
    format: true,
    maxItems: true,
    minItems: true,
    uniqueItems: true,
    maxProperties: true,
    minProperties: true
};
function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
    if (schema && typeof schema == 'object' && !Array.isArray(schema)) {
        pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
        for(var key in schema){
            var sch = schema[key];
            if (Array.isArray(sch)) {
                if (key in traverse.arrayKeywords) {
                    for(var i = 0; i < sch.length; i++)_traverse(opts, pre, post, sch[i], jsonPtr + '/' + key + '/' + i, rootSchema, jsonPtr, key, schema, i);
                }
            } else if (key in traverse.propsKeywords) {
                if (sch && typeof sch == 'object') {
                    for(var prop in sch)_traverse(opts, pre, post, sch[prop], jsonPtr + '/' + key + '/' + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
                }
            } else if (key in traverse.keywords || opts.allKeys && !(key in traverse.skipKeywords)) {
                _traverse(opts, pre, post, sch, jsonPtr + '/' + key, rootSchema, jsonPtr, key, schema);
            }
        }
        post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
    }
}
function escapeJsonPtr(str) {
    return str.replace(/~/g, '~0').replace(/\//g, '~1');
}
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/fast-uri/lib/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {(value: string) => boolean} */ const isUUID = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu);
/** @type {(value: string) => boolean} */ const isIPv4 = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
/**
 * @param {Array<string>} input
 * @returns {string}
 */ function stringArrayToHexStripped(input) {
    let acc = '';
    let code = 0;
    let i = 0;
    for(i = 0; i < input.length; i++){
        code = input[i].charCodeAt(0);
        if (code === 48) {
            continue;
        }
        if (!(code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102)) {
            return '';
        }
        acc += input[i];
        break;
    }
    for(i += 1; i < input.length; i++){
        code = input[i].charCodeAt(0);
        if (!(code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102)) {
            return '';
        }
        acc += input[i];
    }
    return acc;
}
/**
 * @typedef {Object} GetIPV6Result
 * @property {boolean} error - Indicates if there was an error parsing the IPv6 address.
 * @property {string} address - The parsed IPv6 address.
 * @property {string} [zone] - The zone identifier, if present.
 */ /**
 * @param {string} value
 * @returns {boolean}
 */ const nonSimpleDomain = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
/**
 * @param {Array<string>} buffer
 * @returns {boolean}
 */ function consumeIsZone(buffer) {
    buffer.length = 0;
    return true;
}
/**
 * @param {Array<string>} buffer
 * @param {Array<string>} address
 * @param {GetIPV6Result} output
 * @returns {boolean}
 */ function consumeHextets(buffer, address, output) {
    if (buffer.length) {
        const hex = stringArrayToHexStripped(buffer);
        if (hex !== '') {
            address.push(hex);
        } else {
            output.error = true;
            return false;
        }
        buffer.length = 0;
    }
    return true;
}
/**
 * @param {string} input
 * @returns {GetIPV6Result}
 */ function getIPV6(input) {
    let tokenCount = 0;
    const output = {
        error: false,
        address: '',
        zone: ''
    };
    /** @type {Array<string>} */ const address = [];
    /** @type {Array<string>} */ const buffer = [];
    let endipv6Encountered = false;
    let endIpv6 = false;
    let consume = consumeHextets;
    for(let i = 0; i < input.length; i++){
        const cursor = input[i];
        if (cursor === '[' || cursor === ']') {
            continue;
        }
        if (cursor === ':') {
            if (endipv6Encountered === true) {
                endIpv6 = true;
            }
            if (!consume(buffer, address, output)) {
                break;
            }
            if (++tokenCount > 7) {
                // not valid
                output.error = true;
                break;
            }
            if (i > 0 && input[i - 1] === ':') {
                endipv6Encountered = true;
            }
            address.push(':');
            continue;
        } else if (cursor === '%') {
            if (!consume(buffer, address, output)) {
                break;
            }
            // switch to zone detection
            consume = consumeIsZone;
        } else {
            buffer.push(cursor);
            continue;
        }
    }
    if (buffer.length) {
        if (consume === consumeIsZone) {
            output.zone = buffer.join('');
        } else if (endIpv6) {
            address.push(buffer.join(''));
        } else {
            address.push(stringArrayToHexStripped(buffer));
        }
    }
    output.address = address.join('');
    return output;
}
/**
 * @typedef {Object} NormalizeIPv6Result
 * @property {string} host - The normalized host.
 * @property {string} [escapedHost] - The escaped host.
 * @property {boolean} isIPV6 - Indicates if the host is an IPv6 address.
 */ /**
 * @param {string} host
 * @returns {NormalizeIPv6Result}
 */ function normalizeIPv6(host) {
    if (findToken(host, ':') < 2) {
        return {
            host,
            isIPV6: false
        };
    }
    const ipv6 = getIPV6(host);
    if (!ipv6.error) {
        let newHost = ipv6.address;
        let escapedHost = ipv6.address;
        if (ipv6.zone) {
            newHost += '%' + ipv6.zone;
            escapedHost += '%25' + ipv6.zone;
        }
        return {
            host: newHost,
            isIPV6: true,
            escapedHost
        };
    } else {
        return {
            host,
            isIPV6: false
        };
    }
}
/**
 * @param {string} str
 * @param {string} token
 * @returns {number}
 */ function findToken(str, token) {
    let ind = 0;
    for(let i = 0; i < str.length; i++){
        if (str[i] === token) ind++;
    }
    return ind;
}
/**
 * @param {string} path
 * @returns {string}
 *
 * @see https://datatracker.ietf.org/doc/html/rfc3986#section-5.2.4
 */ function removeDotSegments(path) {
    let input = path;
    const output = [];
    let nextSlash = -1;
    let len = 0;
    // eslint-disable-next-line no-cond-assign
    while(len = input.length){
        if (len === 1) {
            if (input === '.') {
                break;
            } else if (input === '/') {
                output.push('/');
                break;
            } else {
                output.push(input);
                break;
            }
        } else if (len === 2) {
            if (input[0] === '.') {
                if (input[1] === '.') {
                    break;
                } else if (input[1] === '/') {
                    input = input.slice(2);
                    continue;
                }
            } else if (input[0] === '/') {
                if (input[1] === '.' || input[1] === '/') {
                    output.push('/');
                    break;
                }
            }
        } else if (len === 3) {
            if (input === '/..') {
                if (output.length !== 0) {
                    output.pop();
                }
                output.push('/');
                break;
            }
        }
        if (input[0] === '.') {
            if (input[1] === '.') {
                if (input[2] === '/') {
                    input = input.slice(3);
                    continue;
                }
            } else if (input[1] === '/') {
                input = input.slice(2);
                continue;
            }
        } else if (input[0] === '/') {
            if (input[1] === '.') {
                if (input[2] === '/') {
                    input = input.slice(2);
                    continue;
                } else if (input[2] === '.') {
                    if (input[3] === '/') {
                        input = input.slice(3);
                        if (output.length !== 0) {
                            output.pop();
                        }
                        continue;
                    }
                }
            }
        }
        // Rule 2E: Move normal path segment to output
        if ((nextSlash = input.indexOf('/', 1)) === -1) {
            output.push(input);
            break;
        } else {
            output.push(input.slice(0, nextSlash));
            input = input.slice(nextSlash);
        }
    }
    return output.join('');
}
/**
 * @param {import('../types/index').URIComponent} component
 * @param {boolean} esc
 * @returns {import('../types/index').URIComponent}
 */ function normalizeComponentEncoding(component, esc) {
    const func = esc !== true ? escape : unescape;
    if (component.scheme !== undefined) {
        component.scheme = func(component.scheme);
    }
    if (component.userinfo !== undefined) {
        component.userinfo = func(component.userinfo);
    }
    if (component.host !== undefined) {
        component.host = func(component.host);
    }
    if (component.path !== undefined) {
        component.path = func(component.path);
    }
    if (component.query !== undefined) {
        component.query = func(component.query);
    }
    if (component.fragment !== undefined) {
        component.fragment = func(component.fragment);
    }
    return component;
}
/**
 * @param {import('../types/index').URIComponent} component
 * @returns {string|undefined}
 */ function recomposeAuthority(component) {
    const uriTokens = [];
    if (component.userinfo !== undefined) {
        uriTokens.push(component.userinfo);
        uriTokens.push('@');
    }
    if (component.host !== undefined) {
        let host = unescape(component.host);
        if (!isIPv4(host)) {
            const ipV6res = normalizeIPv6(host);
            if (ipV6res.isIPV6 === true) {
                host = `[${ipV6res.escapedHost}]`;
            } else {
                host = component.host;
            }
        }
        uriTokens.push(host);
    }
    if (typeof component.port === 'number' || typeof component.port === 'string') {
        uriTokens.push(':');
        uriTokens.push(String(component.port));
    }
    return uriTokens.length ? uriTokens.join('') : undefined;
}
;
module.exports = {
    nonSimpleDomain,
    recomposeAuthority,
    normalizeComponentEncoding,
    removeDotSegments,
    isIPv4,
    isUUID,
    normalizeIPv6,
    stringArrayToHexStripped
};
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/fast-uri/lib/schemes.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { isUUID } = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/fast-uri/lib/utils.js [app-ssr] (ecmascript)");
const URN_REG = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
const supportedSchemeNames = [
    'http',
    'https',
    'ws',
    'wss',
    'urn',
    'urn:uuid'
];
/** @typedef {supportedSchemeNames[number]} SchemeName */ /**
 * @param {string} name
 * @returns {name is SchemeName}
 */ function isValidSchemeName(name) {
    return supportedSchemeNames.indexOf(name) !== -1;
}
/**
 * @callback SchemeFn
 * @param {import('../types/index').URIComponent} component
 * @param {import('../types/index').Options} options
 * @returns {import('../types/index').URIComponent}
 */ /**
 * @typedef {Object} SchemeHandler
 * @property {SchemeName} scheme - The scheme name.
 * @property {boolean} [domainHost] - Indicates if the scheme supports domain hosts.
 * @property {SchemeFn} parse - Function to parse the URI component for this scheme.
 * @property {SchemeFn} serialize - Function to serialize the URI component for this scheme.
 * @property {boolean} [skipNormalize] - Indicates if normalization should be skipped for this scheme.
 * @property {boolean} [absolutePath] - Indicates if the scheme uses absolute paths.
 * @property {boolean} [unicodeSupport] - Indicates if the scheme supports Unicode.
 */ /**
 * @param {import('../types/index').URIComponent} wsComponent
 * @returns {boolean}
 */ function wsIsSecure(wsComponent) {
    if (wsComponent.secure === true) {
        return true;
    } else if (wsComponent.secure === false) {
        return false;
    } else if (wsComponent.scheme) {
        return wsComponent.scheme.length === 3 && (wsComponent.scheme[0] === 'w' || wsComponent.scheme[0] === 'W') && (wsComponent.scheme[1] === 's' || wsComponent.scheme[1] === 'S') && (wsComponent.scheme[2] === 's' || wsComponent.scheme[2] === 'S');
    } else {
        return false;
    }
}
/** @type {SchemeFn} */ function httpParse(component) {
    if (!component.host) {
        component.error = component.error || 'HTTP URIs must have a host.';
    }
    return component;
}
/** @type {SchemeFn} */ function httpSerialize(component) {
    const secure = String(component.scheme).toLowerCase() === 'https';
    // normalize the default port
    if (component.port === (secure ? 443 : 80) || component.port === '') {
        component.port = undefined;
    }
    // normalize the empty path
    if (!component.path) {
        component.path = '/';
    }
    // NOTE: We do not parse query strings for HTTP URIs
    // as WWW Form Url Encoded query strings are part of the HTML4+ spec,
    // and not the HTTP spec.
    return component;
}
/** @type {SchemeFn} */ function wsParse(wsComponent) {
    // indicate if the secure flag is set
    wsComponent.secure = wsIsSecure(wsComponent);
    // construct resouce name
    wsComponent.resourceName = (wsComponent.path || '/') + (wsComponent.query ? '?' + wsComponent.query : '');
    wsComponent.path = undefined;
    wsComponent.query = undefined;
    return wsComponent;
}
/** @type {SchemeFn} */ function wsSerialize(wsComponent) {
    // normalize the default port
    if (wsComponent.port === (wsIsSecure(wsComponent) ? 443 : 80) || wsComponent.port === '') {
        wsComponent.port = undefined;
    }
    // ensure scheme matches secure flag
    if (typeof wsComponent.secure === 'boolean') {
        wsComponent.scheme = wsComponent.secure ? 'wss' : 'ws';
        wsComponent.secure = undefined;
    }
    // reconstruct path from resource name
    if (wsComponent.resourceName) {
        const [path, query] = wsComponent.resourceName.split('?');
        wsComponent.path = path && path !== '/' ? path : undefined;
        wsComponent.query = query;
        wsComponent.resourceName = undefined;
    }
    // forbid fragment component
    wsComponent.fragment = undefined;
    return wsComponent;
}
/** @type {SchemeFn} */ function urnParse(urnComponent, options) {
    if (!urnComponent.path) {
        urnComponent.error = 'URN can not be parsed';
        return urnComponent;
    }
    const matches = urnComponent.path.match(URN_REG);
    if (matches) {
        const scheme = options.scheme || urnComponent.scheme || 'urn';
        urnComponent.nid = matches[1].toLowerCase();
        urnComponent.nss = matches[2];
        const urnScheme = `${scheme}:${options.nid || urnComponent.nid}`;
        const schemeHandler = getSchemeHandler(urnScheme);
        urnComponent.path = undefined;
        if (schemeHandler) {
            urnComponent = schemeHandler.parse(urnComponent, options);
        }
    } else {
        urnComponent.error = urnComponent.error || 'URN can not be parsed.';
    }
    return urnComponent;
}
/** @type {SchemeFn} */ function urnSerialize(urnComponent, options) {
    if (urnComponent.nid === undefined) {
        throw new Error('URN without nid cannot be serialized');
    }
    const scheme = options.scheme || urnComponent.scheme || 'urn';
    const nid = urnComponent.nid.toLowerCase();
    const urnScheme = `${scheme}:${options.nid || nid}`;
    const schemeHandler = getSchemeHandler(urnScheme);
    if (schemeHandler) {
        urnComponent = schemeHandler.serialize(urnComponent, options);
    }
    const uriComponent = urnComponent;
    const nss = urnComponent.nss;
    uriComponent.path = `${nid || options.nid}:${nss}`;
    options.skipEscape = true;
    return uriComponent;
}
/** @type {SchemeFn} */ function urnuuidParse(urnComponent, options) {
    const uuidComponent = urnComponent;
    uuidComponent.uuid = uuidComponent.nss;
    uuidComponent.nss = undefined;
    if (!options.tolerant && (!uuidComponent.uuid || !isUUID(uuidComponent.uuid))) {
        uuidComponent.error = uuidComponent.error || 'UUID is not valid.';
    }
    return uuidComponent;
}
/** @type {SchemeFn} */ function urnuuidSerialize(uuidComponent) {
    const urnComponent = uuidComponent;
    // normalize UUID
    urnComponent.nss = (uuidComponent.uuid || '').toLowerCase();
    return urnComponent;
}
const http = {
    scheme: 'http',
    domainHost: true,
    parse: httpParse,
    serialize: httpSerialize
};
const https = {
    scheme: 'https',
    domainHost: http.domainHost,
    parse: httpParse,
    serialize: httpSerialize
};
const ws = {
    scheme: 'ws',
    domainHost: true,
    parse: wsParse,
    serialize: wsSerialize
};
const wss = {
    scheme: 'wss',
    domainHost: ws.domainHost,
    parse: ws.parse,
    serialize: ws.serialize
};
const urn = {
    scheme: 'urn',
    parse: urnParse,
    serialize: urnSerialize,
    skipNormalize: true
};
const urnuuid = {
    scheme: 'urn:uuid',
    parse: urnuuidParse,
    serialize: urnuuidSerialize,
    skipNormalize: true
};
const SCHEMES = {
    http,
    https,
    ws,
    wss,
    urn,
    'urn:uuid': urnuuid
};
Object.setPrototypeOf(SCHEMES, null);
/**
 * @param {string|undefined} scheme
 * @returns {SchemeHandler|undefined}
 */ function getSchemeHandler(scheme) {
    return scheme && (SCHEMES[scheme] || SCHEMES[scheme.toLowerCase()]) || undefined;
}
module.exports = {
    wsIsSecure,
    SCHEMES,
    isValidSchemeName,
    getSchemeHandler
};
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/fast-uri/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { normalizeIPv6, removeDotSegments, recomposeAuthority, normalizeComponentEncoding, isIPv4, nonSimpleDomain } = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/fast-uri/lib/utils.js [app-ssr] (ecmascript)");
const { SCHEMES, getSchemeHandler } = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/fast-uri/lib/schemes.js [app-ssr] (ecmascript)");
/**
 * @template {import('./types/index').URIComponent|string} T
 * @param {T} uri
 * @param {import('./types/index').Options} [options]
 * @returns {T}
 */ function normalize(uri, options) {
    if (typeof uri === 'string') {
        uri = serialize(parse(uri, options), options);
    } else if (typeof uri === 'object') {
        uri = parse(serialize(uri, options), options);
    }
    return uri;
}
/**
 * @param {string} baseURI
 * @param {string} relativeURI
 * @param {import('./types/index').Options} [options]
 * @returns {string}
 */ function resolve(baseURI, relativeURI, options) {
    const schemelessOptions = options ? Object.assign({
        scheme: 'null'
    }, options) : {
        scheme: 'null'
    };
    const resolved = resolveComponent(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true);
    schemelessOptions.skipEscape = true;
    return serialize(resolved, schemelessOptions);
}
/**
 * @param {import ('./types/index').URIComponent} base
 * @param {import ('./types/index').URIComponent} relative
 * @param {import('./types/index').Options} [options]
 * @param {boolean} [skipNormalization=false]
 * @returns {import ('./types/index').URIComponent}
 */ function resolveComponent(base, relative, options, skipNormalization) {
    /** @type {import('./types/index').URIComponent} */ const target = {};
    if (!skipNormalization) {
        base = parse(serialize(base, options), options); // normalize base component
        relative = parse(serialize(relative, options), options); // normalize relative component
    }
    options = options || {};
    if (!options.tolerant && relative.scheme) {
        target.scheme = relative.scheme;
        // target.authority = relative.authority;
        target.userinfo = relative.userinfo;
        target.host = relative.host;
        target.port = relative.port;
        target.path = removeDotSegments(relative.path || '');
        target.query = relative.query;
    } else {
        if (relative.userinfo !== undefined || relative.host !== undefined || relative.port !== undefined) {
            // target.authority = relative.authority;
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || '');
            target.query = relative.query;
        } else {
            if (!relative.path) {
                target.path = base.path;
                if (relative.query !== undefined) {
                    target.query = relative.query;
                } else {
                    target.query = base.query;
                }
            } else {
                if (relative.path[0] === '/') {
                    target.path = removeDotSegments(relative.path);
                } else {
                    if ((base.userinfo !== undefined || base.host !== undefined || base.port !== undefined) && !base.path) {
                        target.path = '/' + relative.path;
                    } else if (!base.path) {
                        target.path = relative.path;
                    } else {
                        target.path = base.path.slice(0, base.path.lastIndexOf('/') + 1) + relative.path;
                    }
                    target.path = removeDotSegments(target.path);
                }
                target.query = relative.query;
            }
            // target.authority = base.authority;
            target.userinfo = base.userinfo;
            target.host = base.host;
            target.port = base.port;
        }
        target.scheme = base.scheme;
    }
    target.fragment = relative.fragment;
    return target;
}
/**
 * @param {import ('./types/index').URIComponent|string} uriA
 * @param {import ('./types/index').URIComponent|string} uriB
 * @param {import ('./types/index').Options} options
 * @returns {boolean}
 */ function equal(uriA, uriB, options) {
    if (typeof uriA === 'string') {
        uriA = unescape(uriA);
        uriA = serialize(normalizeComponentEncoding(parse(uriA, options), true), {
            ...options,
            skipEscape: true
        });
    } else if (typeof uriA === 'object') {
        uriA = serialize(normalizeComponentEncoding(uriA, true), {
            ...options,
            skipEscape: true
        });
    }
    if (typeof uriB === 'string') {
        uriB = unescape(uriB);
        uriB = serialize(normalizeComponentEncoding(parse(uriB, options), true), {
            ...options,
            skipEscape: true
        });
    } else if (typeof uriB === 'object') {
        uriB = serialize(normalizeComponentEncoding(uriB, true), {
            ...options,
            skipEscape: true
        });
    }
    return uriA.toLowerCase() === uriB.toLowerCase();
}
/**
 * @param {Readonly<import('./types/index').URIComponent>} cmpts
 * @param {import('./types/index').Options} [opts]
 * @returns {string}
 */ function serialize(cmpts, opts) {
    const component = {
        host: cmpts.host,
        scheme: cmpts.scheme,
        userinfo: cmpts.userinfo,
        port: cmpts.port,
        path: cmpts.path,
        query: cmpts.query,
        nid: cmpts.nid,
        nss: cmpts.nss,
        uuid: cmpts.uuid,
        fragment: cmpts.fragment,
        reference: cmpts.reference,
        resourceName: cmpts.resourceName,
        secure: cmpts.secure,
        error: ''
    };
    const options = Object.assign({}, opts);
    const uriTokens = [];
    // find scheme handler
    const schemeHandler = getSchemeHandler(options.scheme || component.scheme);
    // perform scheme specific serialization
    if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(component, options);
    if (component.path !== undefined) {
        if (!options.skipEscape) {
            component.path = escape(component.path);
            if (component.scheme !== undefined) {
                component.path = component.path.split('%3A').join(':');
            }
        } else {
            component.path = unescape(component.path);
        }
    }
    if (options.reference !== 'suffix' && component.scheme) {
        uriTokens.push(component.scheme, ':');
    }
    const authority = recomposeAuthority(component);
    if (authority !== undefined) {
        if (options.reference !== 'suffix') {
            uriTokens.push('//');
        }
        uriTokens.push(authority);
        if (component.path && component.path[0] !== '/') {
            uriTokens.push('/');
        }
    }
    if (component.path !== undefined) {
        let s = component.path;
        if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
            s = removeDotSegments(s);
        }
        if (authority === undefined && s[0] === '/' && s[1] === '/') {
            // don't allow the path to start with "//"
            s = '/%2F' + s.slice(2);
        }
        uriTokens.push(s);
    }
    if (component.query !== undefined) {
        uriTokens.push('?', component.query);
    }
    if (component.fragment !== undefined) {
        uriTokens.push('#', component.fragment);
    }
    return uriTokens.join('');
}
const URI_PARSE = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
/**
 * @param {string} uri
 * @param {import('./types/index').Options} [opts]
 * @returns
 */ function parse(uri, opts) {
    const options = Object.assign({}, opts);
    /** @type {import('./types/index').URIComponent} */ const parsed = {
        scheme: undefined,
        userinfo: undefined,
        host: '',
        port: undefined,
        path: '',
        query: undefined,
        fragment: undefined
    };
    let isIP = false;
    if (options.reference === 'suffix') {
        if (options.scheme) {
            uri = options.scheme + ':' + uri;
        } else {
            uri = '//' + uri;
        }
    }
    const matches = uri.match(URI_PARSE);
    if (matches) {
        // store each component
        parsed.scheme = matches[1];
        parsed.userinfo = matches[3];
        parsed.host = matches[4];
        parsed.port = parseInt(matches[5], 10);
        parsed.path = matches[6] || '';
        parsed.query = matches[7];
        parsed.fragment = matches[8];
        // fix port number
        if (isNaN(parsed.port)) {
            parsed.port = matches[5];
        }
        if (parsed.host) {
            const ipv4result = isIPv4(parsed.host);
            if (ipv4result === false) {
                const ipv6result = normalizeIPv6(parsed.host);
                parsed.host = ipv6result.host.toLowerCase();
                isIP = ipv6result.isIPV6;
            } else {
                isIP = true;
            }
        }
        if (parsed.scheme === undefined && parsed.userinfo === undefined && parsed.host === undefined && parsed.port === undefined && parsed.query === undefined && !parsed.path) {
            parsed.reference = 'same-document';
        } else if (parsed.scheme === undefined) {
            parsed.reference = 'relative';
        } else if (parsed.fragment === undefined) {
            parsed.reference = 'absolute';
        } else {
            parsed.reference = 'uri';
        }
        // check for reference errors
        if (options.reference && options.reference !== 'suffix' && options.reference !== parsed.reference) {
            parsed.error = parsed.error || 'URI is not a ' + options.reference + ' reference.';
        }
        // find scheme handler
        const schemeHandler = getSchemeHandler(options.scheme || parsed.scheme);
        // check if scheme can't handle IRIs
        if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
            // if host component is a domain name
            if (parsed.host && (options.domainHost || schemeHandler && schemeHandler.domainHost) && isIP === false && nonSimpleDomain(parsed.host)) {
                // convert Unicode IDN -> ASCII IDN
                try {
                    parsed.host = URL.domainToASCII(parsed.host.toLowerCase());
                } catch (e) {
                    parsed.error = parsed.error || "Host's domain name can not be converted to ASCII: " + e;
                }
            }
        // convert IRI -> URI
        }
        if (!schemeHandler || schemeHandler && !schemeHandler.skipNormalize) {
            if (uri.indexOf('%') !== -1) {
                if (parsed.scheme !== undefined) {
                    parsed.scheme = unescape(parsed.scheme);
                }
                if (parsed.host !== undefined) {
                    parsed.host = unescape(parsed.host);
                }
            }
            if (parsed.path) {
                parsed.path = escape(unescape(parsed.path));
            }
            if (parsed.fragment) {
                parsed.fragment = encodeURI(decodeURIComponent(parsed.fragment));
            }
        }
        // perform scheme specific parsing
        if (schemeHandler && schemeHandler.parse) {
            schemeHandler.parse(parsed, options);
        }
    } else {
        parsed.error = parsed.error || 'URI can not be parsed.';
    }
    return parsed;
}
const fastUri = {
    SCHEMES,
    normalize,
    resolve,
    resolveComponent,
    equal,
    serialize,
    parse
};
module.exports = fastUri;
module.exports.default = fastUri;
module.exports.fastUri = fastUri;
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv-formats/dist/formats.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formatNames = exports.fastFormats = exports.fullFormats = void 0;
function fmtDef(validate, compare) {
    return {
        validate,
        compare
    };
}
exports.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: fmtDef(date, compareDate),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: fmtDef(getTime(true), compareTime),
    "date-time": fmtDef(getDateTime(true), compareDateTime),
    "iso-time": fmtDef(getTime(), compareIsoTime),
    "iso-date-time": fmtDef(getDateTime(), compareIsoDateTime),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte,
    // signed 32 bit integer
    int32: {
        type: "number",
        validate: validateInt32
    },
    // signed 64 bit integer
    int64: {
        type: "number",
        validate: validateInt64
    },
    // C-type float
    float: {
        type: "number",
        validate: validateNumber
    },
    // C-type double
    double: {
        type: "number",
        validate: validateNumber
    },
    // hint to the UI to hide input strings
    password: true,
    // unchecked string payload
    binary: true
};
exports.fastFormats = {
    ...exports.fullFormats,
    date: fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, compareDate),
    time: fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareTime),
    "date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareDateTime),
    "iso-time": fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareIsoTime),
    "iso-date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareIsoDateTime),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
};
exports.formatNames = Object.keys(exports.fullFormats);
function isLeapYear(year) {
    // https://tools.ietf.org/html/rfc3339#appendix-C
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
const DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
const DAYS = [
    0,
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
];
function date(str) {
    // full-date from http://tools.ietf.org/html/rfc3339#section-5.6
    const matches = DATE.exec(str);
    if (!matches) return false;
    const year = +matches[1];
    const month = +matches[2];
    const day = +matches[3];
    return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
}
function compareDate(d1, d2) {
    if (!(d1 && d2)) return undefined;
    if (d1 > d2) return 1;
    if (d1 < d2) return -1;
    return 0;
}
const TIME = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
function getTime(strictTimeZone) {
    return function time(str) {
        const matches = TIME.exec(str);
        if (!matches) return false;
        const hr = +matches[1];
        const min = +matches[2];
        const sec = +matches[3];
        const tz = matches[4];
        const tzSign = matches[5] === "-" ? -1 : 1;
        const tzH = +(matches[6] || 0);
        const tzM = +(matches[7] || 0);
        if (tzH > 23 || tzM > 59 || strictTimeZone && !tz) return false;
        if (hr <= 23 && min <= 59 && sec < 60) return true;
        // leap second
        const utcMin = min - tzM * tzSign;
        const utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0);
        return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1) && sec < 61;
    };
}
function compareTime(s1, s2) {
    if (!(s1 && s2)) return undefined;
    const t1 = new Date("2020-01-01T" + s1).valueOf();
    const t2 = new Date("2020-01-01T" + s2).valueOf();
    if (!(t1 && t2)) return undefined;
    return t1 - t2;
}
function compareIsoTime(t1, t2) {
    if (!(t1 && t2)) return undefined;
    const a1 = TIME.exec(t1);
    const a2 = TIME.exec(t2);
    if (!(a1 && a2)) return undefined;
    t1 = a1[1] + a1[2] + a1[3];
    t2 = a2[1] + a2[2] + a2[3];
    if (t1 > t2) return 1;
    if (t1 < t2) return -1;
    return 0;
}
const DATE_TIME_SEPARATOR = /t|\s/i;
function getDateTime(strictTimeZone) {
    const time = getTime(strictTimeZone);
    return function date_time(str) {
        // http://tools.ietf.org/html/rfc3339#section-5.6
        const dateTime = str.split(DATE_TIME_SEPARATOR);
        return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1]);
    };
}
function compareDateTime(dt1, dt2) {
    if (!(dt1 && dt2)) return undefined;
    const d1 = new Date(dt1).valueOf();
    const d2 = new Date(dt2).valueOf();
    if (!(d1 && d2)) return undefined;
    return d1 - d2;
}
function compareIsoDateTime(dt1, dt2) {
    if (!(dt1 && dt2)) return undefined;
    const [d1, t1] = dt1.split(DATE_TIME_SEPARATOR);
    const [d2, t2] = dt2.split(DATE_TIME_SEPARATOR);
    const res = compareDate(d1, d2);
    if (res === undefined) return undefined;
    return res || compareTime(t1, t2);
}
const NOT_URI_FRAGMENT = /\/|:/;
const URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
function uri(str) {
    // http://jmrware.com/articles/2009/uri_regexp/URI_regex.html + optional protocol + required "."
    return NOT_URI_FRAGMENT.test(str) && URI.test(str);
}
const BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
function byte(str) {
    BYTE.lastIndex = 0;
    return BYTE.test(str);
}
const MIN_INT32 = -(2 ** 31);
const MAX_INT32 = 2 ** 31 - 1;
function validateInt32(value) {
    return Number.isInteger(value) && value <= MAX_INT32 && value >= MIN_INT32;
}
function validateInt64(value) {
    // JSON and javascript max Int is 2**53, so any int that passes isInteger is valid for Int64
    return Number.isInteger(value);
}
function validateNumber() {
    return true;
}
const Z_ANCHOR = /[^\\]\\Z/;
function regex(str) {
    if (Z_ANCHOR.test(str)) return false;
    try {
        new RegExp(str);
        return true;
    } catch (e) {
        return false;
    }
} //# sourceMappingURL=formats.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv-formats/dist/limit.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formatLimitDefinition = void 0;
const ajv_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/ajv.js [app-ssr] (ecmascript)");
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-ssr] (ecmascript)");
const ops = codegen_1.operators;
const KWDs = {
    formatMaximum: {
        okStr: "<=",
        ok: ops.LTE,
        fail: ops.GT
    },
    formatMinimum: {
        okStr: ">=",
        ok: ops.GTE,
        fail: ops.LT
    },
    formatExclusiveMaximum: {
        okStr: "<",
        ok: ops.LT,
        fail: ops.GTE
    },
    formatExclusiveMinimum: {
        okStr: ">",
        ok: ops.GT,
        fail: ops.LTE
    }
};
const error = {
    message: ({ keyword, schemaCode })=>(0, codegen_1.str)`should be ${KWDs[keyword].okStr} ${schemaCode}`,
    params: ({ keyword, schemaCode })=>(0, codegen_1._)`{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`
};
exports.formatLimitDefinition = {
    keyword: Object.keys(KWDs),
    type: "string",
    schemaType: "string",
    $data: true,
    error,
    code (cxt) {
        const { gen, data, schemaCode, keyword, it } = cxt;
        const { opts, self } = it;
        if (!opts.validateFormats) return;
        const fCxt = new ajv_1.KeywordCxt(it, self.RULES.all.format.definition, "format");
        if (fCxt.$data) validate$DataFormat();
        else validateFormat();
        function validate$DataFormat() {
            const fmts = gen.scopeValue("formats", {
                ref: self.formats,
                code: opts.code.formats
            });
            const fmt = gen.const("fmt", (0, codegen_1._)`${fmts}[${fCxt.schemaCode}]`);
            cxt.fail$data((0, codegen_1.or)((0, codegen_1._)`typeof ${fmt} != "object"`, (0, codegen_1._)`${fmt} instanceof RegExp`, (0, codegen_1._)`typeof ${fmt}.compare != "function"`, compareCode(fmt)));
        }
        function validateFormat() {
            const format = fCxt.schema;
            const fmtDef = self.formats[format];
            if (!fmtDef || fmtDef === true) return;
            if (typeof fmtDef != "object" || fmtDef instanceof RegExp || typeof fmtDef.compare != "function") {
                throw new Error(`"${keyword}": format "${format}" does not define "compare" function`);
            }
            const fmt = gen.scopeValue("formats", {
                key: format,
                ref: fmtDef,
                code: opts.code.formats ? (0, codegen_1._)`${opts.code.formats}${(0, codegen_1.getProperty)(format)}` : undefined
            });
            cxt.fail$data(compareCode(fmt));
        }
        function compareCode(fmt) {
            return (0, codegen_1._)`${fmt}.compare(${data}, ${schemaCode}) ${KWDs[keyword].fail} 0`;
        }
    },
    dependencies: [
        "format"
    ]
};
const formatLimitPlugin = (ajv)=>{
    ajv.addKeyword(exports.formatLimitDefinition);
    return ajv;
};
exports.default = formatLimitPlugin; //# sourceMappingURL=limit.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv-formats/dist/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const formats_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv-formats/dist/formats.js [app-ssr] (ecmascript)");
const limit_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv-formats/dist/limit.js [app-ssr] (ecmascript)");
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-ssr] (ecmascript)");
const fullName = new codegen_1.Name("fullFormats");
const fastName = new codegen_1.Name("fastFormats");
const formatsPlugin = (ajv, opts = {
    keywords: true
})=>{
    if (Array.isArray(opts)) {
        addFormats(ajv, opts, formats_1.fullFormats, fullName);
        return ajv;
    }
    const [formats, exportName] = opts.mode === "fast" ? [
        formats_1.fastFormats,
        fastName
    ] : [
        formats_1.fullFormats,
        fullName
    ];
    const list = opts.formats || formats_1.formatNames;
    addFormats(ajv, list, formats, exportName);
    if (opts.keywords) (0, limit_1.default)(ajv);
    return ajv;
};
formatsPlugin.get = (name, mode = "full")=>{
    const formats = mode === "fast" ? formats_1.fastFormats : formats_1.fullFormats;
    const f = formats[name];
    if (!f) throw new Error(`Unknown format "${name}"`);
    return f;
};
function addFormats(ajv, list, fs, exportName) {
    var _a;
    var _b;
    (_a = (_b = ajv.opts.code).formats) !== null && _a !== void 0 ? _a : _b.formats = (0, codegen_1._)`require("ajv-formats/dist/formats").${exportName}`;
    for (const f of list)ajv.addFormat(f, fs[f]);
}
module.exports = exports = formatsPlugin;
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = formatsPlugin; //# sourceMappingURL=index.js.map
}),
];

//# sourceMappingURL=ce80c_56c6fdaf._.js.map