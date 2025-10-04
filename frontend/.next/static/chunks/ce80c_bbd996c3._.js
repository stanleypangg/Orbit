(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    assign: null,
    searchParamsToUrlQuery: null,
    urlQueryToSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    assign: function() {
        return assign;
    },
    searchParamsToUrlQuery: function() {
        return searchParamsToUrlQuery;
    },
    urlQueryToSearchParams: function() {
        return urlQueryToSearchParams;
    }
});
function searchParamsToUrlQuery(searchParams) {
    const query = {};
    for (const [key, value] of searchParams.entries()){
        const existing = query[key];
        if (typeof existing === 'undefined') {
            query[key] = value;
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            query[key] = [
                existing,
                value
            ];
        }
    }
    return query;
}
function stringifyUrlQueryParam(param) {
    if (typeof param === 'string') {
        return param;
    }
    if (typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
        return String(param);
    } else {
        return '';
    }
}
function urlQueryToSearchParams(query) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)){
        if (Array.isArray(value)) {
            for (const item of value){
                searchParams.append(key, stringifyUrlQueryParam(item));
            }
        } else {
            searchParams.set(key, stringifyUrlQueryParam(value));
        }
    }
    return searchParams;
}
function assign(target) {
    for(var _len = arguments.length, searchParamsList = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        searchParamsList[_key - 1] = arguments[_key];
    }
    for (const searchParams of searchParamsList){
        for (const key of searchParams.keys()){
            target.delete(key);
        }
        for (const [key, value] of searchParams.entries()){
            target.append(key, value);
        }
    }
    return target;
} //# sourceMappingURL=querystring.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    formatUrl: null,
    formatWithValidation: null,
    urlObjectKeys: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatUrl: function() {
        return formatUrl;
    },
    formatWithValidation: function() {
        return formatWithValidation;
    },
    urlObjectKeys: function() {
        return urlObjectKeys;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _querystring = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)"));
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
    let { auth, hostname } = urlObj;
    let protocol = urlObj.protocol || '';
    let pathname = urlObj.pathname || '';
    let hash = urlObj.hash || '';
    let query = urlObj.query || '';
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';
    if (urlObj.host) {
        host = auth + urlObj.host;
    } else if (hostname) {
        host = auth + (~hostname.indexOf(':') ? "[" + hostname + "]" : hostname);
        if (urlObj.port) {
            host += ':' + urlObj.port;
        }
    }
    if (query && typeof query === 'object') {
        query = String(_querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && "?" + query || '';
    if (protocol && !protocol.endsWith(':')) protocol += ':';
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
    } else if (!host) {
        host = '';
    }
    if (hash && hash[0] !== '#') hash = '#' + hash;
    if (search && search[0] !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace('#', '%23');
    return "" + protocol + host + pathname + search + hash;
}
const urlObjectKeys = [
    'auth',
    'hash',
    'host',
    'hostname',
    'href',
    'path',
    'pathname',
    'port',
    'protocol',
    'query',
    'search',
    'slashes'
];
function formatWithValidation(url) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (url !== null && typeof url === 'object') {
            Object.keys(url).forEach((key)=>{
                if (!urlObjectKeys.includes(key)) {
                    console.warn("Unknown key passed via urlObject into url.format: " + key);
                }
            });
        }
    }
    return formatUrl(url);
} //# sourceMappingURL=format-url.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMergedRef", {
    enumerable: true,
    get: function() {
        return useMergedRef;
    }
});
const _react = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
function useMergedRef(refA, refB) {
    const cleanupA = (0, _react.useRef)(null);
    const cleanupB = (0, _react.useRef)(null);
    // NOTE: In theory, we could skip the wrapping if only one of the refs is non-null.
    // (this happens often if the user doesn't pass a ref to Link/Form/Image)
    // But this can cause us to leak a cleanup-ref into user code (e.g. via `<Link legacyBehavior>`),
    // and the user might pass that ref into ref-merging library that doesn't support cleanup refs
    // (because it hasn't been updated for React 19)
    // which can then cause things to blow up, because a cleanup-returning ref gets called with `null`.
    // So in practice, it's safer to be defensive and always wrap the ref, even on React 19.
    return (0, _react.useCallback)((current)=>{
        if (current === null) {
            const cleanupFnA = cleanupA.current;
            if (cleanupFnA) {
                cleanupA.current = null;
                cleanupFnA();
            }
            const cleanupFnB = cleanupB.current;
            if (cleanupFnB) {
                cleanupB.current = null;
                cleanupFnB();
            }
        } else {
            if (refA) {
                cleanupA.current = applyRef(refA, current);
            }
            if (refB) {
                cleanupB.current = applyRef(refB, current);
            }
        }
    }, [
        refA,
        refB
    ]);
}
function applyRef(refA, current) {
    if (typeof refA === 'function') {
        const cleanup = refA(current);
        if (typeof cleanup === 'function') {
            return cleanup;
        } else {
            return ()=>refA(null);
        }
    } else {
        refA.current = current;
        return ()=>{
            refA.current = null;
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-merged-ref.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DecodeError: null,
    MiddlewareNotFoundError: null,
    MissingStaticPage: null,
    NormalizeError: null,
    PageNotFoundError: null,
    SP: null,
    ST: null,
    WEB_VITALS: null,
    execOnce: null,
    getDisplayName: null,
    getLocationOrigin: null,
    getURL: null,
    isAbsoluteUrl: null,
    isResSent: null,
    loadGetInitialProps: null,
    normalizeRepeatedSlashes: null,
    stringifyError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DecodeError: function() {
        return DecodeError;
    },
    MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
    },
    MissingStaticPage: function() {
        return MissingStaticPage;
    },
    NormalizeError: function() {
        return NormalizeError;
    },
    PageNotFoundError: function() {
        return PageNotFoundError;
    },
    SP: function() {
        return SP;
    },
    ST: function() {
        return ST;
    },
    WEB_VITALS: function() {
        return WEB_VITALS;
    },
    execOnce: function() {
        return execOnce;
    },
    getDisplayName: function() {
        return getDisplayName;
    },
    getLocationOrigin: function() {
        return getLocationOrigin;
    },
    getURL: function() {
        return getURL;
    },
    isAbsoluteUrl: function() {
        return isAbsoluteUrl;
    },
    isResSent: function() {
        return isResSent;
    },
    loadGetInitialProps: function() {
        return loadGetInitialProps;
    },
    normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
    },
    stringifyError: function() {
        return stringifyError;
    }
});
const WEB_VITALS = [
    'CLS',
    'FCP',
    'FID',
    'INP',
    'LCP',
    'TTFB'
];
function execOnce(fn) {
    let used = false;
    let result;
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>ABSOLUTE_URL_REGEX.test(url);
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return protocol + "//" + hostname + (port ? ':' + port : '');
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? "?" + urlParts.slice(1).join('?') : '');
}
async function loadGetInitialProps(App, ctx) {
    if ("TURBOPACK compile-time truthy", 1) {
        var _App_prototype;
        if ((_App_prototype = App.prototype) == null ? void 0 : _App_prototype.getInitialProps) {
            const message = '"' + getDisplayName(App) + '.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.';
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    }
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = '"' + getDisplayName(App) + '.getInitialProps()" should resolve to an object. But found "' + props + '" instead.';
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn("" + getDisplayName(App) + " returned an empty object from `getInitialProps`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps");
        }
    }
    return props;
}
const SP = typeof performance !== 'undefined';
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.name = 'PageNotFoundError';
        this.message = "Cannot find module for page: " + page;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = "Failed to load static file for page: " + page + " " + message;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = "Cannot find the middleware module";
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
} //# sourceMappingURL=utils.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isLocalURL", {
    enumerable: true,
    get: function() {
        return isLocalURL;
    }
});
const _utils = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _hasbasepath = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/client/has-base-path.js [app-client] (ecmascript)");
function isLocalURL(url) {
    // prevent a hydration mismatch on href for url with anchor refs
    if (!(0, _utils.isAbsoluteUrl)(url)) return true;
    try {
        // absolute urls can be local if they are on the same origin
        const locationOrigin = (0, _utils.getLocationOrigin)();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
    } catch (_) {
        return false;
    }
} //# sourceMappingURL=is-local-url.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "errorOnce", {
    enumerable: true,
    get: function() {
        return errorOnce;
    }
});
let errorOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const errors = new Set();
    errorOnce = (msg)=>{
        if (!errors.has(msg)) {
            console.error(msg);
        }
        errors.add(msg);
    };
} //# sourceMappingURL=error-once.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    useLinkStatus: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    /**
 * A React component that extends the HTML `<a>` element to provide
 * [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
 * and client-side navigation. This is the primary way to navigate between routes in Next.js.
 *
 * @remarks
 * - Prefetching is only enabled in production.
 *
 * @see https://nextjs.org/docs/app/api-reference/components/link
 */ default: function() {
        return LinkComponent;
    },
    useLinkStatus: function() {
        return useLinkStatus;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _formaturl = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _usemergedref = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _addbasepath = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/client/add-base-path.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _links = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/client/components/links.js [app-client] (ecmascript)");
const _islocalurl = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)");
const _approuterinstance = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/client/components/app-router-instance.js [app-client] (ecmascript)");
const _erroronce = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)");
const _segmentcache = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/client/components/segment-cache.js [app-client] (ecmascript)");
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute('target');
    return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
    event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate) {
    const { nodeName } = e.currentTarget;
    // anchors inside an svg have a lowercase nodeName
    const isAnchorNodeName = nodeName.toUpperCase() === 'A';
    if (isAnchorNodeName && isModifiedEvent(e) || e.currentTarget.hasAttribute('download')) {
        // ignore click for browser’s default behavior
        return;
    }
    if (!(0, _islocalurl.isLocalURL)(href)) {
        if (replace) {
            // browser default behavior does not replace the history state
            // so we need to do it manually
            e.preventDefault();
            location.replace(href);
        }
        // ignore click for browser’s default behavior
        return;
    }
    e.preventDefault();
    if (onNavigate) {
        let isDefaultPrevented = false;
        onNavigate({
            preventDefault: ()=>{
                isDefaultPrevented = true;
            }
        });
        if (isDefaultPrevented) {
            return;
        }
    }
    _react.default.startTransition(()=>{
        (0, _approuterinstance.dispatchNavigateAction)(as || href, replace ? 'replace' : 'push', scroll != null ? scroll : true, linkInstanceRef.current);
    });
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === 'string') {
        return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
}
function LinkComponent(props) {
    const [linkStatus, setOptimisticLinkStatus] = (0, _react.useOptimistic)(_links.IDLE_LINK_STATUS);
    let children;
    const linkInstanceRef = (0, _react.useRef)(null);
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, onNavigate, ref: forwardedRef, unstable_dynamicOnHover, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === 'string' || typeof children === 'number')) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            children: children
        });
    }
    const router = _react.default.useContext(_approutercontextsharedruntime.AppRouterContext);
    const prefetchEnabled = prefetchProp !== false;
    const fetchStrategy = prefetchProp !== false ? getFetchStrategyFromPrefetchProp(prefetchProp) : _segmentcache.FetchStrategy.PPR;
    if ("TURBOPACK compile-time truthy", 1) {
        function createPropError(args) {
            return Object.defineProperty(new Error("Failed prop type: The prop `" + args.key + "` expects a " + args.expected + " in `<Link>`, but got `" + args.actual + "` instead." + (typeof window !== 'undefined' ? "\nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                value: "E319",
                enumerable: false,
                configurable: true
            });
        }
        // TypeScript trick for type-guarding:
        const requiredPropsGuard = {
            href: true
        };
        const requiredProps = Object.keys(requiredPropsGuard);
        requiredProps.forEach((key)=>{
            if (key === 'href') {
                if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: props[key] === null ? 'null' : typeof props[key]
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const _ = key;
            }
        });
        // TypeScript trick for type-guarding:
        const optionalPropsGuard = {
            as: true,
            replace: true,
            scroll: true,
            shallow: true,
            passHref: true,
            prefetch: true,
            unstable_dynamicOnHover: true,
            onClick: true,
            onMouseEnter: true,
            onTouchStart: true,
            legacyBehavior: true,
            onNavigate: true
        };
        const optionalProps = Object.keys(optionalPropsGuard);
        optionalProps.forEach((key)=>{
            const valType = typeof props[key];
            if (key === 'as') {
                if (props[key] && valType !== 'string' && valType !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: valType
                    });
                }
            } else if (key === 'onClick' || key === 'onMouseEnter' || key === 'onTouchStart' || key === 'onNavigate') {
                if (props[key] && valType !== 'function') {
                    throw createPropError({
                        key,
                        expected: '`function`',
                        actual: valType
                    });
                }
            } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'legacyBehavior' || key === 'unstable_dynamicOnHover') {
                if (props[key] != null && valType !== 'boolean') {
                    throw createPropError({
                        key,
                        expected: '`boolean`',
                        actual: valType
                    });
                }
            } else if (key === 'prefetch') {
                if (props[key] != null && valType !== 'boolean' && props[key] !== 'auto' && props[key] !== 'unstable_forceStale') {
                    throw createPropError({
                        key,
                        expected: '`boolean | "auto" | "unstable_forceStale"`',
                        actual: valType
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const _ = key;
            }
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (props.locale) {
            (0, _warnonce.warnOnce)('The `locale` prop is not supported in `next/link` while using the `app` router. Read more about app router internalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization');
        }
        if (!asProp) {
            let href;
            if (typeof hrefProp === 'string') {
                href = hrefProp;
            } else if (typeof hrefProp === 'object' && typeof hrefProp.pathname === 'string') {
                href = hrefProp.pathname;
            }
            if (href) {
                const hasDynamicSegment = href.split('/').some((segment)=>segment.startsWith('[') && segment.endsWith(']'));
                if (hasDynamicSegment) {
                    throw Object.defineProperty(new Error("Dynamic href `" + href + "` found in <Link> while using the `/app` router, this is not supported. Read more: https://nextjs.org/docs/messages/app-dir-dynamic-href"), "__NEXT_ERROR_CODE", {
                        value: "E267",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
    }
    const { href, as } = _react.default.useMemo({
        "LinkComponent.useMemo": ()=>{
            const resolvedHref = formatStringOrUrl(hrefProp);
            return {
                href: resolvedHref,
                as: asProp ? formatStringOrUrl(asProp) : resolvedHref
            };
        }
    }["LinkComponent.useMemo"], [
        hrefProp,
        asProp
    ]);
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if ("TURBOPACK compile-time truthy", 1) {
            if (onClick) {
                console.warn('"onClick" was passed to <Link> with `href` of `' + hrefProp + '` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link');
            }
            if (onMouseEnterProp) {
                console.warn('"onMouseEnter" was passed to <Link> with `href` of `' + hrefProp + '` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link');
            }
            try {
                child = _react.default.Children.only(children);
            } catch (err) {
                if (!children) {
                    throw Object.defineProperty(new Error("No children were passed to <Link> with `href` of `" + hrefProp + "` but one child is required https://nextjs.org/docs/messages/link-no-children"), "__NEXT_ERROR_CODE", {
                        value: "E320",
                        enumerable: false,
                        configurable: true
                    });
                }
                throw Object.defineProperty(new Error("Multiple children were passed to <Link> with `href` of `" + hrefProp + "` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children" + (typeof window !== 'undefined' ? " \nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                    value: "E266",
                    enumerable: false,
                    configurable: true
                });
            }
        } else //TURBOPACK unreachable
        ;
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ((children == null ? void 0 : children.type) === 'a') {
                throw Object.defineProperty(new Error('Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor'), "__NEXT_ERROR_CODE", {
                    value: "E209",
                    enumerable: false,
                    configurable: true
                });
            }
        }
    }
    const childRef = legacyBehavior ? child && typeof child === 'object' && child.ref : forwardedRef;
    // Use a callback ref to attach an IntersectionObserver to the anchor tag on
    // mount. In the future we will also use this to keep track of all the
    // currently mounted <Link> instances, e.g. so we can re-prefetch them after
    // a revalidation or refresh.
    const observeLinkVisibilityOnMount = _react.default.useCallback({
        "LinkComponent.useCallback[observeLinkVisibilityOnMount]": (element)=>{
            if (router !== null) {
                linkInstanceRef.current = (0, _links.mountLinkInstance)(element, href, router, fetchStrategy, prefetchEnabled, setOptimisticLinkStatus);
            }
            return ({
                "LinkComponent.useCallback[observeLinkVisibilityOnMount]": ()=>{
                    if (linkInstanceRef.current) {
                        (0, _links.unmountLinkForCurrentNavigation)(linkInstanceRef.current);
                        linkInstanceRef.current = null;
                    }
                    (0, _links.unmountPrefetchableInstance)(element);
                }
            })["LinkComponent.useCallback[observeLinkVisibilityOnMount]"];
        }
    }["LinkComponent.useCallback[observeLinkVisibilityOnMount]"], [
        prefetchEnabled,
        href,
        router,
        fetchStrategy,
        setOptimisticLinkStatus
    ]);
    const mergedRef = (0, _usemergedref.useMergedRef)(observeLinkVisibilityOnMount, childRef);
    const childProps = {
        ref: mergedRef,
        onClick (e) {
            if ("TURBOPACK compile-time truthy", 1) {
                if (!e) {
                    throw Object.defineProperty(new Error('Component rendered inside next/link has to pass click event to "onClick" prop.'), "__NEXT_ERROR_CODE", {
                        value: "E312",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
            if (!legacyBehavior && typeof onClick === 'function') {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === 'function') {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === 'function') {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === 'function') {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if ("TURBOPACK compile-time truthy", 1) {
                return;
            }
            //TURBOPACK unreachable
            ;
            const upgradeToDynamicPrefetch = undefined;
        },
        onTouchStart: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : function onTouchStart(e) {
            if (!legacyBehavior && typeof onTouchStartProp === 'function') {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === 'function') {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled) {
                return;
            }
            const upgradeToDynamicPrefetch = unstable_dynamicOnHover === true;
            (0, _links.onNavigationIntent)(e.currentTarget, upgradeToDynamicPrefetch);
        }
    };
    // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
    // defined, we specify the current 'href', so that repetition is not needed by the user.
    // If the url is absolute, we can bypass the logic to prepend the basePath.
    if ((0, _utils.isAbsoluteUrl)(as)) {
        childProps.href = as;
    } else if (!legacyBehavior || passHref || child.type === 'a' && !('href' in child.props)) {
        childProps.href = (0, _addbasepath.addBasePath)(as);
    }
    let link;
    if (legacyBehavior) {
        if ("TURBOPACK compile-time truthy", 1) {
            (0, _erroronce.errorOnce)('`legacyBehavior` is deprecated and will be removed in a future ' + 'release. A codemod is available to upgrade your components:\n\n' + 'npx @next/codemod@latest new-link .\n\n' + 'Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components');
        }
        link = /*#__PURE__*/ _react.default.cloneElement(child, childProps);
    } else {
        link = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            ...restProps,
            ...childProps,
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(LinkStatusContext.Provider, {
        value: linkStatus,
        children: link
    });
}
const LinkStatusContext = /*#__PURE__*/ (0, _react.createContext)(_links.IDLE_LINK_STATUS);
const useLinkStatus = ()=>{
    return (0, _react.useContext)(LinkStatusContext);
};
function getFetchStrategyFromPrefetchProp(prefetchProp) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return prefetchProp === null || prefetchProp === 'auto' ? _segmentcache.FetchStrategy.PPR : // (although invalid values should've been filtered out by prop validation in dev)
        _segmentcache.FetchStrategy.Full;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/image-blur-svg.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * A shared function, used on both client and server, to generate a SVG blur placeholder.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getImageBlurSvg", {
    enumerable: true,
    get: function() {
        return getImageBlurSvg;
    }
});
function getImageBlurSvg(param) {
    let { widthInt, heightInt, blurWidth, blurHeight, blurDataURL, objectFit } = param;
    const std = 20;
    const svgWidth = blurWidth ? blurWidth * 40 : widthInt;
    const svgHeight = blurHeight ? blurHeight * 40 : heightInt;
    const viewBox = svgWidth && svgHeight ? "viewBox='0 0 " + svgWidth + " " + svgHeight + "'" : '';
    const preserveAspectRatio = viewBox ? 'none' : objectFit === 'contain' ? 'xMidYMid' : objectFit === 'cover' ? 'xMidYMid slice' : 'none';
    return "%3Csvg xmlns='http://www.w3.org/2000/svg' " + viewBox + "%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='" + std + "'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='" + std + "'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='" + preserveAspectRatio + "' style='filter: url(%23b);' href='" + blurDataURL + "'/%3E%3C/svg%3E";
} //# sourceMappingURL=image-blur-svg.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/image-config.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    VALID_LOADERS: null,
    imageConfigDefault: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    VALID_LOADERS: function() {
        return VALID_LOADERS;
    },
    imageConfigDefault: function() {
        return imageConfigDefault;
    }
});
const VALID_LOADERS = [
    'default',
    'imgix',
    'cloudinary',
    'akamai',
    'custom'
];
const imageConfigDefault = {
    deviceSizes: [
        640,
        750,
        828,
        1080,
        1200,
        1920,
        2048,
        3840
    ],
    imageSizes: [
        16,
        32,
        48,
        64,
        96,
        128,
        256,
        384
    ],
    path: '/_next/image',
    loader: 'default',
    loaderFile: '',
    domains: [],
    disableStaticImages: false,
    minimumCacheTTL: 60,
    formats: [
        'image/webp'
    ],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;",
    contentDispositionType: 'attachment',
    localPatterns: undefined,
    remotePatterns: [],
    qualities: undefined,
    unoptimized: false
}; //# sourceMappingURL=image-config.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/get-img-props.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getImgProps", {
    enumerable: true,
    get: function() {
        return getImgProps;
    }
});
const _warnonce = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _imageblursvg = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/image-blur-svg.js [app-client] (ecmascript)");
const _imageconfig = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/image-config.js [app-client] (ecmascript)");
const VALID_LOADING_VALUES = [
    'lazy',
    'eager',
    undefined
];
// Object-fit values that are not valid background-size values
const INVALID_BACKGROUND_SIZE_VALUES = [
    '-moz-initial',
    'fill',
    'none',
    'scale-down',
    undefined
];
function isStaticRequire(src) {
    return src.default !== undefined;
}
function isStaticImageData(src) {
    return src.src !== undefined;
}
function isStaticImport(src) {
    return !!src && typeof src === 'object' && (isStaticRequire(src) || isStaticImageData(src));
}
const allImgs = new Map();
let perfObserver;
function getInt(x) {
    if (typeof x === 'undefined') {
        return x;
    }
    if (typeof x === 'number') {
        return Number.isFinite(x) ? x : NaN;
    }
    if (typeof x === 'string' && /^[0-9]+$/.test(x)) {
        return parseInt(x, 10);
    }
    return NaN;
}
function getWidths(param, width, sizes) {
    let { deviceSizes, allSizes } = param;
    if (sizes) {
        // Find all the "vw" percent sizes used in the sizes prop
        const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g;
        const percentSizes = [];
        for(let match; match = viewportWidthRe.exec(sizes); match){
            percentSizes.push(parseInt(match[2]));
        }
        if (percentSizes.length) {
            const smallestRatio = Math.min(...percentSizes) * 0.01;
            return {
                widths: allSizes.filter((s)=>s >= deviceSizes[0] * smallestRatio),
                kind: 'w'
            };
        }
        return {
            widths: allSizes,
            kind: 'w'
        };
    }
    if (typeof width !== 'number') {
        return {
            widths: deviceSizes,
            kind: 'w'
        };
    }
    const widths = [
        ...new Set(// > are actually 3x in the green color, but only 1.5x in the red and
        // > blue colors. Showing a 3x resolution image in the app vs a 2x
        // > resolution image will be visually the same, though the 3x image
        // > takes significantly more data. Even true 3x resolution screens are
        // > wasteful as the human eye cannot see that level of detail without
        // > something like a magnifying glass.
        // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
        [
            width,
            width * 2 /*, width * 3*/ 
        ].map((w)=>allSizes.find((p)=>p >= w) || allSizes[allSizes.length - 1]))
    ];
    return {
        widths,
        kind: 'x'
    };
}
function generateImgAttrs(param) {
    let { config, src, unoptimized, width, quality, sizes, loader } = param;
    if (unoptimized) {
        return {
            src,
            srcSet: undefined,
            sizes: undefined
        };
    }
    const { widths, kind } = getWidths(config, width, sizes);
    const last = widths.length - 1;
    return {
        sizes: !sizes && kind === 'w' ? '100vw' : sizes,
        srcSet: widths.map((w, i)=>loader({
                config,
                src,
                quality,
                width: w
            }) + " " + (kind === 'w' ? w : i + 1) + kind).join(', '),
        // It's intended to keep `src` the last attribute because React updates
        // attributes in order. If we keep `src` the first one, Safari will
        // immediately start to fetch `src`, before `sizes` and `srcSet` are even
        // updated by React. That causes multiple unnecessary requests if `srcSet`
        // and `sizes` are defined.
        // This bug cannot be reproduced in Chrome or Firefox.
        src: loader({
            config,
            src,
            quality,
            width: widths[last]
        })
    };
}
function getImgProps(param, _state) {
    let { src, sizes, unoptimized = false, priority = false, loading, className, quality, width, height, fill = false, style, overrideSrc, onLoad, onLoadingComplete, placeholder = 'empty', blurDataURL, fetchPriority, decoding = 'async', layout, objectFit, objectPosition, lazyBoundary, lazyRoot, ...rest } = param;
    const { imgConf, showAltText, blurComplete, defaultLoader } = _state;
    let config;
    let c = imgConf || _imageconfig.imageConfigDefault;
    if ('allSizes' in c) {
        config = c;
    } else {
        var _c_qualities;
        const allSizes = [
            ...c.deviceSizes,
            ...c.imageSizes
        ].sort((a, b)=>a - b);
        const deviceSizes = c.deviceSizes.sort((a, b)=>a - b);
        const qualities = (_c_qualities = c.qualities) == null ? void 0 : _c_qualities.sort((a, b)=>a - b);
        config = {
            ...c,
            allSizes,
            deviceSizes,
            qualities
        };
    }
    if (typeof defaultLoader === 'undefined') {
        throw Object.defineProperty(new Error('images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config'), "__NEXT_ERROR_CODE", {
            value: "E163",
            enumerable: false,
            configurable: true
        });
    }
    let loader = rest.loader || defaultLoader;
    // Remove property so it's not spread on <img> element
    delete rest.loader;
    delete rest.srcSet;
    // This special value indicates that the user
    // didn't define a "loader" prop or "loader" config.
    const isDefaultLoader = '__next_img_default' in loader;
    if (isDefaultLoader) {
        if (config.loader === 'custom') {
            throw Object.defineProperty(new Error('Image with src "' + src + '" is missing "loader" prop.' + "\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader"), "__NEXT_ERROR_CODE", {
                value: "E252",
                enumerable: false,
                configurable: true
            });
        }
    } else {
        // The user defined a "loader" prop or config.
        // Since the config object is internal only, we
        // must not pass it to the user-defined "loader".
        const customImageLoader = loader;
        loader = (obj)=>{
            const { config: _, ...opts } = obj;
            return customImageLoader(opts);
        };
    }
    if (layout) {
        if (layout === 'fill') {
            fill = true;
        }
        const layoutToStyle = {
            intrinsic: {
                maxWidth: '100%',
                height: 'auto'
            },
            responsive: {
                width: '100%',
                height: 'auto'
            }
        };
        const layoutToSizes = {
            responsive: '100vw',
            fill: '100vw'
        };
        const layoutStyle = layoutToStyle[layout];
        if (layoutStyle) {
            style = {
                ...style,
                ...layoutStyle
            };
        }
        const layoutSizes = layoutToSizes[layout];
        if (layoutSizes && !sizes) {
            sizes = layoutSizes;
        }
    }
    let staticSrc = '';
    let widthInt = getInt(width);
    let heightInt = getInt(height);
    let blurWidth;
    let blurHeight;
    if (isStaticImport(src)) {
        const staticImageData = isStaticRequire(src) ? src.default : src;
        if (!staticImageData.src) {
            throw Object.defineProperty(new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received " + JSON.stringify(staticImageData)), "__NEXT_ERROR_CODE", {
                value: "E460",
                enumerable: false,
                configurable: true
            });
        }
        if (!staticImageData.height || !staticImageData.width) {
            throw Object.defineProperty(new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received " + JSON.stringify(staticImageData)), "__NEXT_ERROR_CODE", {
                value: "E48",
                enumerable: false,
                configurable: true
            });
        }
        blurWidth = staticImageData.blurWidth;
        blurHeight = staticImageData.blurHeight;
        blurDataURL = blurDataURL || staticImageData.blurDataURL;
        staticSrc = staticImageData.src;
        if (!fill) {
            if (!widthInt && !heightInt) {
                widthInt = staticImageData.width;
                heightInt = staticImageData.height;
            } else if (widthInt && !heightInt) {
                const ratio = widthInt / staticImageData.width;
                heightInt = Math.round(staticImageData.height * ratio);
            } else if (!widthInt && heightInt) {
                const ratio = heightInt / staticImageData.height;
                widthInt = Math.round(staticImageData.width * ratio);
            }
        }
    }
    src = typeof src === 'string' ? src : staticSrc;
    let isLazy = !priority && (loading === 'lazy' || typeof loading === 'undefined');
    if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
        // https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
        unoptimized = true;
        isLazy = false;
    }
    if (config.unoptimized) {
        unoptimized = true;
    }
    if (isDefaultLoader && !config.dangerouslyAllowSVG && src.split('?', 1)[0].endsWith('.svg')) {
        // Special case to make svg serve as-is to avoid proxying
        // through the built-in Image Optimization API.
        unoptimized = true;
    }
    const qualityInt = getInt(quality);
    if ("TURBOPACK compile-time truthy", 1) {
        var _config_localPatterns;
        if (config.output === 'export' && isDefaultLoader && !unoptimized) {
            throw Object.defineProperty(new Error("Image Optimization using the default loader is not compatible with `{ output: 'export' }`.\n  Possible solutions:\n    - Remove `{ output: 'export' }` and run \"next start\" to run server mode including the Image Optimization API.\n    - Configure `{ images: { unoptimized: true } }` in `next.config.js` to disable the Image Optimization API.\n  Read more: https://nextjs.org/docs/messages/export-image-api"), "__NEXT_ERROR_CODE", {
                value: "E500",
                enumerable: false,
                configurable: true
            });
        }
        if (!src) {
            // React doesn't show the stack trace and there's
            // no `src` to help identify which image, so we
            // instead console.error(ref) during mount.
            unoptimized = true;
        } else {
            if (fill) {
                if (width) {
                    throw Object.defineProperty(new Error('Image with src "' + src + '" has both "width" and "fill" properties. Only one should be used.'), "__NEXT_ERROR_CODE", {
                        value: "E96",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (height) {
                    throw Object.defineProperty(new Error('Image with src "' + src + '" has both "height" and "fill" properties. Only one should be used.'), "__NEXT_ERROR_CODE", {
                        value: "E115",
                        enumerable: false,
                        configurable: true
                    });
                }
                if ((style == null ? void 0 : style.position) && style.position !== 'absolute') {
                    throw Object.defineProperty(new Error('Image with src "' + src + '" has both "fill" and "style.position" properties. Images with "fill" always use position absolute - it cannot be modified.'), "__NEXT_ERROR_CODE", {
                        value: "E216",
                        enumerable: false,
                        configurable: true
                    });
                }
                if ((style == null ? void 0 : style.width) && style.width !== '100%') {
                    throw Object.defineProperty(new Error('Image with src "' + src + '" has both "fill" and "style.width" properties. Images with "fill" always use width 100% - it cannot be modified.'), "__NEXT_ERROR_CODE", {
                        value: "E73",
                        enumerable: false,
                        configurable: true
                    });
                }
                if ((style == null ? void 0 : style.height) && style.height !== '100%') {
                    throw Object.defineProperty(new Error('Image with src "' + src + '" has both "fill" and "style.height" properties. Images with "fill" always use height 100% - it cannot be modified.'), "__NEXT_ERROR_CODE", {
                        value: "E404",
                        enumerable: false,
                        configurable: true
                    });
                }
            } else {
                if (typeof widthInt === 'undefined') {
                    throw Object.defineProperty(new Error('Image with src "' + src + '" is missing required "width" property.'), "__NEXT_ERROR_CODE", {
                        value: "E451",
                        enumerable: false,
                        configurable: true
                    });
                } else if (isNaN(widthInt)) {
                    throw Object.defineProperty(new Error('Image with src "' + src + '" has invalid "width" property. Expected a numeric value in pixels but received "' + width + '".'), "__NEXT_ERROR_CODE", {
                        value: "E66",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (typeof heightInt === 'undefined') {
                    throw Object.defineProperty(new Error('Image with src "' + src + '" is missing required "height" property.'), "__NEXT_ERROR_CODE", {
                        value: "E397",
                        enumerable: false,
                        configurable: true
                    });
                } else if (isNaN(heightInt)) {
                    throw Object.defineProperty(new Error('Image with src "' + src + '" has invalid "height" property. Expected a numeric value in pixels but received "' + height + '".'), "__NEXT_ERROR_CODE", {
                        value: "E444",
                        enumerable: false,
                        configurable: true
                    });
                }
                // eslint-disable-next-line no-control-regex
                if (/^[\x00-\x20]/.test(src)) {
                    throw Object.defineProperty(new Error('Image with src "' + src + '" cannot start with a space or control character. Use src.trimStart() to remove it or encodeURIComponent(src) to keep it.'), "__NEXT_ERROR_CODE", {
                        value: "E176",
                        enumerable: false,
                        configurable: true
                    });
                }
                // eslint-disable-next-line no-control-regex
                if (/[\x00-\x20]$/.test(src)) {
                    throw Object.defineProperty(new Error('Image with src "' + src + '" cannot end with a space or control character. Use src.trimEnd() to remove it or encodeURIComponent(src) to keep it.'), "__NEXT_ERROR_CODE", {
                        value: "E21",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
        if (!VALID_LOADING_VALUES.includes(loading)) {
            throw Object.defineProperty(new Error('Image with src "' + src + '" has invalid "loading" property. Provided "' + loading + '" should be one of ' + VALID_LOADING_VALUES.map(String).join(',') + "."), "__NEXT_ERROR_CODE", {
                value: "E357",
                enumerable: false,
                configurable: true
            });
        }
        if (priority && loading === 'lazy') {
            throw Object.defineProperty(new Error('Image with src "' + src + '" has both "priority" and "loading=\'lazy\'" properties. Only one should be used.'), "__NEXT_ERROR_CODE", {
                value: "E218",
                enumerable: false,
                configurable: true
            });
        }
        if (placeholder !== 'empty' && placeholder !== 'blur' && !placeholder.startsWith('data:image/')) {
            throw Object.defineProperty(new Error('Image with src "' + src + '" has invalid "placeholder" property "' + placeholder + '".'), "__NEXT_ERROR_CODE", {
                value: "E431",
                enumerable: false,
                configurable: true
            });
        }
        if (placeholder !== 'empty') {
            if (widthInt && heightInt && widthInt * heightInt < 1600) {
                (0, _warnonce.warnOnce)('Image with src "' + src + '" is smaller than 40x40. Consider removing the "placeholder" property to improve performance.');
            }
        }
        if (qualityInt && qualityInt !== 75 && !config.qualities) {
            (0, _warnonce.warnOnce)('Image with src "' + src + '" is using quality "' + qualityInt + '" which is not configured in images.qualities. This config will be required starting in Next.js 16.' + "\nRead more: https://nextjs.org/docs/messages/next-image-unconfigured-qualities");
        }
        if (src.startsWith('/') && src.includes('?') && (!(config == null ? void 0 : (_config_localPatterns = config.localPatterns) == null ? void 0 : _config_localPatterns.length) || config.localPatterns.length === 1 && config.localPatterns[0].pathname === '/_next/static/media/**')) {
            (0, _warnonce.warnOnce)('Image with src "' + src + '" is using a query string which is not configured in images.localPatterns. This config will be required starting in Next.js 16.' + "\nRead more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns");
        }
        if (placeholder === 'blur' && !blurDataURL) {
            const VALID_BLUR_EXT = [
                'jpeg',
                'png',
                'webp',
                'avif'
            ] // should match next-image-loader
            ;
            throw Object.defineProperty(new Error('Image with src "' + src + '" has "placeholder=\'blur\'" property but is missing the "blurDataURL" property.\n        Possible solutions:\n          - Add a "blurDataURL" property, the contents should be a small Data URL to represent the image\n          - Change the "src" property to a static import with one of the supported file types: ' + VALID_BLUR_EXT.join(',') + ' (animated images not supported)\n          - Remove the "placeholder" property, effectively no blur effect\n        Read more: https://nextjs.org/docs/messages/placeholder-blur-data-url'), "__NEXT_ERROR_CODE", {
                value: "E371",
                enumerable: false,
                configurable: true
            });
        }
        if ('ref' in rest) {
            (0, _warnonce.warnOnce)('Image with src "' + src + '" is using unsupported "ref" property. Consider using the "onLoad" property instead.');
        }
        if (!unoptimized && !isDefaultLoader) {
            const urlStr = loader({
                config,
                src,
                width: widthInt || 400,
                quality: qualityInt || 75
            });
            let url;
            try {
                url = new URL(urlStr);
            } catch (err) {}
            if (urlStr === src || url && url.pathname === src && !url.search) {
                (0, _warnonce.warnOnce)('Image with src "' + src + '" has a "loader" property that does not implement width. Please implement it or use the "unoptimized" property instead.' + "\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader-width");
            }
        }
        if (onLoadingComplete) {
            (0, _warnonce.warnOnce)('Image with src "' + src + '" is using deprecated "onLoadingComplete" property. Please use the "onLoad" property instead.');
        }
        for (const [legacyKey, legacyValue] of Object.entries({
            layout,
            objectFit,
            objectPosition,
            lazyBoundary,
            lazyRoot
        })){
            if (legacyValue) {
                (0, _warnonce.warnOnce)('Image with src "' + src + '" has legacy prop "' + legacyKey + '". Did you forget to run the codemod?' + "\nRead more: https://nextjs.org/docs/messages/next-image-upgrade-to-13");
            }
        }
        if (typeof window !== 'undefined' && !perfObserver && window.PerformanceObserver) {
            perfObserver = new PerformanceObserver((entryList)=>{
                for (const entry of entryList.getEntries()){
                    var _entry_element;
                    // @ts-ignore - missing "LargestContentfulPaint" class with "element" prop
                    const imgSrc = (entry == null ? void 0 : (_entry_element = entry.element) == null ? void 0 : _entry_element.src) || '';
                    const lcpImage = allImgs.get(imgSrc);
                    if (lcpImage && !lcpImage.priority && lcpImage.placeholder === 'empty' && !lcpImage.src.startsWith('data:') && !lcpImage.src.startsWith('blob:')) {
                        // https://web.dev/lcp/#measure-lcp-in-javascript
                        (0, _warnonce.warnOnce)('Image with src "' + lcpImage.src + '" was detected as the Largest Contentful Paint (LCP). Please add the "priority" property if this image is above the fold.' + "\nRead more: https://nextjs.org/docs/api-reference/next/image#priority");
                    }
                }
            });
            try {
                perfObserver.observe({
                    type: 'largest-contentful-paint',
                    buffered: true
                });
            } catch (err) {
                // Log error but don't crash the app
                console.error(err);
            }
        }
    }
    const imgStyle = Object.assign(fill ? {
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit,
        objectPosition
    } : {}, showAltText ? {} : {
        color: 'transparent'
    }, style);
    const backgroundImage = !blurComplete && placeholder !== 'empty' ? placeholder === 'blur' ? 'url("data:image/svg+xml;charset=utf-8,' + (0, _imageblursvg.getImageBlurSvg)({
        widthInt,
        heightInt,
        blurWidth,
        blurHeight,
        blurDataURL: blurDataURL || '',
        objectFit: imgStyle.objectFit
    }) + '")' : 'url("' + placeholder + '")' // assume `data:image/`
     : null;
    const backgroundSize = !INVALID_BACKGROUND_SIZE_VALUES.includes(imgStyle.objectFit) ? imgStyle.objectFit : imgStyle.objectFit === 'fill' ? '100% 100%' // the background-size equivalent of `fill`
     : 'cover';
    let placeholderStyle = backgroundImage ? {
        backgroundSize,
        backgroundPosition: imgStyle.objectPosition || '50% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundImage
    } : {};
    if ("TURBOPACK compile-time truthy", 1) {
        if (placeholderStyle.backgroundImage && placeholder === 'blur' && (blurDataURL == null ? void 0 : blurDataURL.startsWith('/'))) {
            // During `next dev`, we don't want to generate blur placeholders with webpack
            // because it can delay starting the dev server. Instead, `next-image-loader.js`
            // will inline a special url to lazily generate the blur placeholder at request time.
            placeholderStyle.backgroundImage = 'url("' + blurDataURL + '")';
        }
    }
    const imgAttributes = generateImgAttrs({
        config,
        src,
        unoptimized,
        width: widthInt,
        quality: qualityInt,
        sizes,
        loader
    });
    if ("TURBOPACK compile-time truthy", 1) {
        if (typeof window !== 'undefined') {
            let fullUrl;
            try {
                fullUrl = new URL(imgAttributes.src);
            } catch (e) {
                fullUrl = new URL(imgAttributes.src, window.location.href);
            }
            allImgs.set(fullUrl.href, {
                src,
                priority,
                placeholder
            });
        }
    }
    const props = {
        ...rest,
        loading: isLazy ? 'lazy' : loading,
        fetchPriority,
        width: widthInt,
        height: heightInt,
        decoding,
        className,
        style: {
            ...imgStyle,
            ...placeholderStyle
        },
        sizes: imgAttributes.sizes,
        srcSet: imgAttributes.srcSet,
        src: overrideSrc || imgAttributes.src
    };
    const meta = {
        unoptimized,
        priority,
        placeholder,
        fill
    };
    return {
        props,
        meta
    };
} //# sourceMappingURL=get-img-props.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/side-effect.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return SideEffect;
    }
});
const _react = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
const isServer = typeof window === 'undefined';
const useClientOnlyLayoutEffect = isServer ? ()=>{} : _react.useLayoutEffect;
const useClientOnlyEffect = isServer ? ()=>{} : _react.useEffect;
function SideEffect(props) {
    const { headManager, reduceComponentsToState } = props;
    function emitChange() {
        if (headManager && headManager.mountedInstances) {
            const headElements = _react.Children.toArray(Array.from(headManager.mountedInstances).filter(Boolean));
            headManager.updateHead(reduceComponentsToState(headElements, props));
        }
    }
    if (isServer) {
        var _headManager_mountedInstances;
        headManager == null ? void 0 : (_headManager_mountedInstances = headManager.mountedInstances) == null ? void 0 : _headManager_mountedInstances.add(props.children);
        emitChange();
    }
    useClientOnlyLayoutEffect({
        "SideEffect.useClientOnlyLayoutEffect": ()=>{
            var _headManager_mountedInstances;
            headManager == null ? void 0 : (_headManager_mountedInstances = headManager.mountedInstances) == null ? void 0 : _headManager_mountedInstances.add(props.children);
            return ({
                "SideEffect.useClientOnlyLayoutEffect": ()=>{
                    var _headManager_mountedInstances;
                    headManager == null ? void 0 : (_headManager_mountedInstances = headManager.mountedInstances) == null ? void 0 : _headManager_mountedInstances.delete(props.children);
                }
            })["SideEffect.useClientOnlyLayoutEffect"];
        }
    }["SideEffect.useClientOnlyLayoutEffect"]);
    // We need to call `updateHead` method whenever the `SideEffect` is trigger in all
    // life-cycles: mount, update, unmount. However, if there are multiple `SideEffect`s
    // being rendered, we only trigger the method from the last one.
    // This is ensured by keeping the last unflushed `updateHead` in the `_pendingUpdate`
    // singleton in the layout effect pass, and actually trigger it in the effect pass.
    useClientOnlyLayoutEffect({
        "SideEffect.useClientOnlyLayoutEffect": ()=>{
            if (headManager) {
                headManager._pendingUpdate = emitChange;
            }
            return ({
                "SideEffect.useClientOnlyLayoutEffect": ()=>{
                    if (headManager) {
                        headManager._pendingUpdate = emitChange;
                    }
                }
            })["SideEffect.useClientOnlyLayoutEffect"];
        }
    }["SideEffect.useClientOnlyLayoutEffect"]);
    useClientOnlyEffect({
        "SideEffect.useClientOnlyEffect": ()=>{
            if (headManager && headManager._pendingUpdate) {
                headManager._pendingUpdate();
                headManager._pendingUpdate = null;
            }
            return ({
                "SideEffect.useClientOnlyEffect": ()=>{
                    if (headManager && headManager._pendingUpdate) {
                        headManager._pendingUpdate();
                        headManager._pendingUpdate = null;
                    }
                }
            })["SideEffect.useClientOnlyEffect"];
        }
    }["SideEffect.useClientOnlyEffect"]);
    return null;
} //# sourceMappingURL=side-effect.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/amp-context.shared-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AmpStateContext", {
    enumerable: true,
    get: function() {
        return AmpStateContext;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const AmpStateContext = _react.default.createContext({});
if ("TURBOPACK compile-time truthy", 1) {
    AmpStateContext.displayName = 'AmpStateContext';
} //# sourceMappingURL=amp-context.shared-runtime.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/amp-mode.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isInAmpMode", {
    enumerable: true,
    get: function() {
        return isInAmpMode;
    }
});
function isInAmpMode(param) {
    let { ampFirst = false, hybrid = false, hasQuery = false } = param === void 0 ? {} : param;
    return ampFirst || hybrid && hasQuery;
} //# sourceMappingURL=amp-mode.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/head.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    defaultHead: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    defaultHead: function() {
        return defaultHead;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _interop_require_wildcard = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _sideeffect = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/side-effect.js [app-client] (ecmascript)"));
const _ampcontextsharedruntime = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/amp-context.shared-runtime.js [app-client] (ecmascript)");
const _headmanagercontextsharedruntime = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/head-manager-context.shared-runtime.js [app-client] (ecmascript)");
const _ampmode = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/amp-mode.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
function defaultHead(inAmpMode) {
    if (inAmpMode === void 0) inAmpMode = false;
    const head = [
        /*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            charSet: "utf-8"
        }, "charset")
    ];
    if (!inAmpMode) {
        head.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "viewport",
            content: "width=device-width"
        }, "viewport"));
    }
    return head;
}
function onlyReactElement(list, child) {
    // React children can be "string" or "number" in this case we ignore them for backwards compat
    if (typeof child === 'string' || typeof child === 'number') {
        return list;
    }
    // Adds support for React.Fragment
    if (child.type === _react.default.Fragment) {
        return list.concat(_react.default.Children.toArray(child.props.children).reduce((fragmentList, fragmentChild)=>{
            if (typeof fragmentChild === 'string' || typeof fragmentChild === 'number') {
                return fragmentList;
            }
            return fragmentList.concat(fragmentChild);
        }, []));
    }
    return list.concat(child);
}
const METATYPES = [
    'name',
    'httpEquiv',
    'charSet',
    'itemProp'
];
/*
 returns a function for filtering head child elements
 which shouldn't be duplicated, like <title/>
 Also adds support for deduplicated `key` properties
*/ function unique() {
    const keys = new Set();
    const tags = new Set();
    const metaTypes = new Set();
    const metaCategories = {};
    return (h)=>{
        let isUnique = true;
        let hasKey = false;
        if (h.key && typeof h.key !== 'number' && h.key.indexOf('$') > 0) {
            hasKey = true;
            const key = h.key.slice(h.key.indexOf('$') + 1);
            if (keys.has(key)) {
                isUnique = false;
            } else {
                keys.add(key);
            }
        }
        // eslint-disable-next-line default-case
        switch(h.type){
            case 'title':
            case 'base':
                if (tags.has(h.type)) {
                    isUnique = false;
                } else {
                    tags.add(h.type);
                }
                break;
            case 'meta':
                for(let i = 0, len = METATYPES.length; i < len; i++){
                    const metatype = METATYPES[i];
                    if (!h.props.hasOwnProperty(metatype)) continue;
                    if (metatype === 'charSet') {
                        if (metaTypes.has(metatype)) {
                            isUnique = false;
                        } else {
                            metaTypes.add(metatype);
                        }
                    } else {
                        const category = h.props[metatype];
                        const categories = metaCategories[metatype] || new Set();
                        if ((metatype !== 'name' || !hasKey) && categories.has(category)) {
                            isUnique = false;
                        } else {
                            categories.add(category);
                            metaCategories[metatype] = categories;
                        }
                    }
                }
                break;
        }
        return isUnique;
    };
}
/**
 *
 * @param headChildrenElements List of children of <Head>
 */ function reduceComponents(headChildrenElements, props) {
    const { inAmpMode } = props;
    return headChildrenElements.reduce(onlyReactElement, []).reverse().concat(defaultHead(inAmpMode).reverse()).filter(unique()).reverse().map((c, i)=>{
        const key = c.key || i;
        if ("TURBOPACK compile-time truthy", 1) {
            // omit JSON-LD structured data snippets from the warning
            if (c.type === 'script' && c.props['type'] !== 'application/ld+json') {
                const srcMessage = c.props['src'] ? '<script> tag with src="' + c.props['src'] + '"' : "inline <script>";
                (0, _warnonce.warnOnce)("Do not add <script> tags using next/head (see " + srcMessage + "). Use next/script instead. \nSee more info here: https://nextjs.org/docs/messages/no-script-tags-in-head-component");
            } else if (c.type === 'link' && c.props['rel'] === 'stylesheet') {
                (0, _warnonce.warnOnce)('Do not add stylesheets using next/head (see <link rel="stylesheet"> tag with href="' + c.props['href'] + '"). Use Document instead. \nSee more info here: https://nextjs.org/docs/messages/no-stylesheets-in-head-component');
            }
        }
        return /*#__PURE__*/ _react.default.cloneElement(c, {
            key
        });
    });
}
/**
 * This component injects elements to `<head>` of your page.
 * To avoid duplicated `tags` in `<head>` you can use the `key` property, which will make sure every tag is only rendered once.
 */ function Head(param) {
    let { children } = param;
    const ampState = (0, _react.useContext)(_ampcontextsharedruntime.AmpStateContext);
    const headManager = (0, _react.useContext)(_headmanagercontextsharedruntime.HeadManagerContext);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_sideeffect.default, {
        reduceComponentsToState: reduceComponents,
        headManager: headManager,
        inAmpMode: (0, _ampmode.isInAmpMode)(ampState),
        children: children
    });
}
const _default = Head;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=head.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/image-config-context.shared-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImageConfigContext", {
    enumerable: true,
    get: function() {
        return ImageConfigContext;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _imageconfig = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/image-config.js [app-client] (ecmascript)");
const ImageConfigContext = _react.default.createContext(_imageconfig.imageConfigDefault);
if ("TURBOPACK compile-time truthy", 1) {
    ImageConfigContext.displayName = 'ImageConfigContext';
} //# sourceMappingURL=image-config-context.shared-runtime.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/router-context.shared-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RouterContext", {
    enumerable: true,
    get: function() {
        return RouterContext;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const RouterContext = _react.default.createContext(null);
if ("TURBOPACK compile-time truthy", 1) {
    RouterContext.displayName = 'RouterContext';
} //# sourceMappingURL=router-context.shared-runtime.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/picomatch/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
(()=>{
    "use strict";
    var t = {
        170: (t, e, u)=>{
            const n = u(510);
            const isWindows = ()=>{
                if (typeof navigator !== "undefined" && navigator.platform) {
                    const t = navigator.platform.toLowerCase();
                    return t === "win32" || t === "windows";
                }
                if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== "undefined" && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].platform) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].platform === "win32";
                }
                return false;
            };
            function picomatch(t, e) {
                let u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
                if (e && (e.windows === null || e.windows === undefined)) {
                    e = {
                        ...e,
                        windows: isWindows()
                    };
                }
                return n(t, e, u);
            }
            Object.assign(picomatch, n);
            t.exports = picomatch;
        },
        154: (t)=>{
            const e = "\\\\/";
            const u = "[^".concat(e, "]");
            const n = "\\.";
            const o = "\\+";
            const s = "\\?";
            const r = "\\/";
            const a = "(?=.)";
            const i = "[^/]";
            const c = "(?:".concat(r, "|$)");
            const p = "(?:^|".concat(r, ")");
            const l = "".concat(n, "{1,2}").concat(c);
            const f = "(?!".concat(n, ")");
            const A = "(?!".concat(p).concat(l, ")");
            const _ = "(?!".concat(n, "{0,1}").concat(c, ")");
            const R = "(?!".concat(l, ")");
            const E = "[^.".concat(r, "]");
            const h = "".concat(i, "*?");
            const g = "/";
            const b = {
                DOT_LITERAL: n,
                PLUS_LITERAL: o,
                QMARK_LITERAL: s,
                SLASH_LITERAL: r,
                ONE_CHAR: a,
                QMARK: i,
                END_ANCHOR: c,
                DOTS_SLASH: l,
                NO_DOT: f,
                NO_DOTS: A,
                NO_DOT_SLASH: _,
                NO_DOTS_SLASH: R,
                QMARK_NO_DOT: E,
                STAR: h,
                START_ANCHOR: p,
                SEP: g
            };
            const C = {
                ...b,
                SLASH_LITERAL: "[".concat(e, "]"),
                QMARK: u,
                STAR: "".concat(u, "*?"),
                DOTS_SLASH: "".concat(n, "{1,2}(?:[").concat(e, "]|$)"),
                NO_DOT: "(?!".concat(n, ")"),
                NO_DOTS: "(?!(?:^|[".concat(e, "])").concat(n, "{1,2}(?:[").concat(e, "]|$))"),
                NO_DOT_SLASH: "(?!".concat(n, "{0,1}(?:[").concat(e, "]|$))"),
                NO_DOTS_SLASH: "(?!".concat(n, "{1,2}(?:[").concat(e, "]|$))"),
                QMARK_NO_DOT: "[^.".concat(e, "]"),
                START_ANCHOR: "(?:^|[".concat(e, "])"),
                END_ANCHOR: "(?:[".concat(e, "]|$)"),
                SEP: "\\"
            };
            const y = {
                alnum: "a-zA-Z0-9",
                alpha: "a-zA-Z",
                ascii: "\\x00-\\x7F",
                blank: " \\t",
                cntrl: "\\x00-\\x1F\\x7F",
                digit: "0-9",
                graph: "\\x21-\\x7E",
                lower: "a-z",
                print: "\\x20-\\x7E ",
                punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
                space: " \\t\\r\\n\\v\\f",
                upper: "A-Z",
                word: "A-Za-z0-9_",
                xdigit: "A-Fa-f0-9"
            };
            t.exports = {
                MAX_LENGTH: 1024 * 64,
                POSIX_REGEX_SOURCE: y,
                REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
                REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
                REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
                REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
                REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
                REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
                REPLACEMENTS: {
                    "***": "*",
                    "**/**": "**",
                    "**/**/**": "**"
                },
                CHAR_0: 48,
                CHAR_9: 57,
                CHAR_UPPERCASE_A: 65,
                CHAR_LOWERCASE_A: 97,
                CHAR_UPPERCASE_Z: 90,
                CHAR_LOWERCASE_Z: 122,
                CHAR_LEFT_PARENTHESES: 40,
                CHAR_RIGHT_PARENTHESES: 41,
                CHAR_ASTERISK: 42,
                CHAR_AMPERSAND: 38,
                CHAR_AT: 64,
                CHAR_BACKWARD_SLASH: 92,
                CHAR_CARRIAGE_RETURN: 13,
                CHAR_CIRCUMFLEX_ACCENT: 94,
                CHAR_COLON: 58,
                CHAR_COMMA: 44,
                CHAR_DOT: 46,
                CHAR_DOUBLE_QUOTE: 34,
                CHAR_EQUAL: 61,
                CHAR_EXCLAMATION_MARK: 33,
                CHAR_FORM_FEED: 12,
                CHAR_FORWARD_SLASH: 47,
                CHAR_GRAVE_ACCENT: 96,
                CHAR_HASH: 35,
                CHAR_HYPHEN_MINUS: 45,
                CHAR_LEFT_ANGLE_BRACKET: 60,
                CHAR_LEFT_CURLY_BRACE: 123,
                CHAR_LEFT_SQUARE_BRACKET: 91,
                CHAR_LINE_FEED: 10,
                CHAR_NO_BREAK_SPACE: 160,
                CHAR_PERCENT: 37,
                CHAR_PLUS: 43,
                CHAR_QUESTION_MARK: 63,
                CHAR_RIGHT_ANGLE_BRACKET: 62,
                CHAR_RIGHT_CURLY_BRACE: 125,
                CHAR_RIGHT_SQUARE_BRACKET: 93,
                CHAR_SEMICOLON: 59,
                CHAR_SINGLE_QUOTE: 39,
                CHAR_SPACE: 32,
                CHAR_TAB: 9,
                CHAR_UNDERSCORE: 95,
                CHAR_VERTICAL_LINE: 124,
                CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
                extglobChars (t) {
                    return {
                        "!": {
                            type: "negate",
                            open: "(?:(?!(?:",
                            close: "))".concat(t.STAR, ")")
                        },
                        "?": {
                            type: "qmark",
                            open: "(?:",
                            close: ")?"
                        },
                        "+": {
                            type: "plus",
                            open: "(?:",
                            close: ")+"
                        },
                        "*": {
                            type: "star",
                            open: "(?:",
                            close: ")*"
                        },
                        "@": {
                            type: "at",
                            open: "(?:",
                            close: ")"
                        }
                    };
                },
                globChars (t) {
                    return t === true ? C : b;
                }
            };
        },
        697: (t, e, u)=>{
            const n = u(154);
            const o = u(96);
            const { MAX_LENGTH: s, POSIX_REGEX_SOURCE: r, REGEX_NON_SPECIAL_CHARS: a, REGEX_SPECIAL_CHARS_BACKREF: i, REPLACEMENTS: c } = n;
            const expandRange = (t, e)=>{
                if (typeof e.expandRange === "function") {
                    return e.expandRange(...t, e);
                }
                t.sort();
                const u = "[".concat(t.join("-"), "]");
                try {
                    new RegExp(u);
                } catch (e) {
                    return t.map((t)=>o.escapeRegex(t)).join("..");
                }
                return u;
            };
            const syntaxError = (t, e)=>"Missing ".concat(t, ': "').concat(e, '" - use "\\\\').concat(e, '" to match literal characters');
            const parse = (t, e)=>{
                if (typeof t !== "string") {
                    throw new TypeError("Expected a string");
                }
                t = c[t] || t;
                const u = {
                    ...e
                };
                const p = typeof u.maxLength === "number" ? Math.min(s, u.maxLength) : s;
                let l = t.length;
                if (l > p) {
                    throw new SyntaxError("Input length: ".concat(l, ", exceeds maximum allowed length: ").concat(p));
                }
                const f = {
                    type: "bos",
                    value: "",
                    output: u.prepend || ""
                };
                const A = [
                    f
                ];
                const _ = u.capture ? "" : "?:";
                const R = n.globChars(u.windows);
                const E = n.extglobChars(R);
                const { DOT_LITERAL: h, PLUS_LITERAL: g, SLASH_LITERAL: b, ONE_CHAR: C, DOTS_SLASH: y, NO_DOT: $, NO_DOT_SLASH: x, NO_DOTS_SLASH: S, QMARK: H, QMARK_NO_DOT: v, STAR: d, START_ANCHOR: L } = R;
                const globstar = (t)=>"(".concat(_, "(?:(?!").concat(L).concat(t.dot ? y : h, ").)*?)");
                const T = u.dot ? "" : $;
                const O = u.dot ? H : v;
                let k = u.bash === true ? globstar(u) : d;
                if (u.capture) {
                    k = "(".concat(k, ")");
                }
                if (typeof u.noext === "boolean") {
                    u.noextglob = u.noext;
                }
                const m = {
                    input: t,
                    index: -1,
                    start: 0,
                    dot: u.dot === true,
                    consumed: "",
                    output: "",
                    prefix: "",
                    backtrack: false,
                    negated: false,
                    brackets: 0,
                    braces: 0,
                    parens: 0,
                    quotes: 0,
                    globstar: false,
                    tokens: A
                };
                t = o.removePrefix(t, m);
                l = t.length;
                const w = [];
                const N = [];
                const I = [];
                let B = f;
                let G;
                const eos = ()=>m.index === l - 1;
                const D = m.peek = function() {
                    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
                    return t[m.index + e];
                };
                const M = m.advance = ()=>t[++m.index] || "";
                const remaining = ()=>t.slice(m.index + 1);
                const consume = function() {
                    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
                    m.consumed += t;
                    m.index += e;
                };
                const append = (t)=>{
                    m.output += t.output != null ? t.output : t.value;
                    consume(t.value);
                };
                const negate = ()=>{
                    let t = 1;
                    while(D() === "!" && (D(2) !== "(" || D(3) === "?")){
                        M();
                        m.start++;
                        t++;
                    }
                    if (t % 2 === 0) {
                        return false;
                    }
                    m.negated = true;
                    m.start++;
                    return true;
                };
                const increment = (t)=>{
                    m[t]++;
                    I.push(t);
                };
                const decrement = (t)=>{
                    m[t]--;
                    I.pop();
                };
                const push = (t)=>{
                    if (B.type === "globstar") {
                        const e = m.braces > 0 && (t.type === "comma" || t.type === "brace");
                        const u = t.extglob === true || w.length && (t.type === "pipe" || t.type === "paren");
                        if (t.type !== "slash" && t.type !== "paren" && !e && !u) {
                            m.output = m.output.slice(0, -B.output.length);
                            B.type = "star";
                            B.value = "*";
                            B.output = k;
                            m.output += B.output;
                        }
                    }
                    if (w.length && t.type !== "paren") {
                        w[w.length - 1].inner += t.value;
                    }
                    if (t.value || t.output) append(t);
                    if (B && B.type === "text" && t.type === "text") {
                        B.output = (B.output || B.value) + t.value;
                        B.value += t.value;
                        return;
                    }
                    t.prev = B;
                    A.push(t);
                    B = t;
                };
                const extglobOpen = (t, e)=>{
                    const n = {
                        ...E[e],
                        conditions: 1,
                        inner: ""
                    };
                    n.prev = B;
                    n.parens = m.parens;
                    n.output = m.output;
                    const o = (u.capture ? "(" : "") + n.open;
                    increment("parens");
                    push({
                        type: t,
                        value: e,
                        output: m.output ? "" : C
                    });
                    push({
                        type: "paren",
                        extglob: true,
                        value: M(),
                        output: o
                    });
                    w.push(n);
                };
                const extglobClose = (t)=>{
                    let n = t.close + (u.capture ? ")" : "");
                    let o;
                    if (t.type === "negate") {
                        let s = k;
                        if (t.inner && t.inner.length > 1 && t.inner.includes("/")) {
                            s = globstar(u);
                        }
                        if (s !== k || eos() || /^\)+$/.test(remaining())) {
                            n = t.close = ")$))".concat(s);
                        }
                        if (t.inner.includes("*") && (o = remaining()) && /^\.[^\\/.]+$/.test(o)) {
                            const u = parse(o, {
                                ...e,
                                fastpaths: false
                            }).output;
                            n = t.close = ")".concat(u, ")").concat(s, ")");
                        }
                        if (t.prev.type === "bos") {
                            m.negatedExtglob = true;
                        }
                    }
                    push({
                        type: "paren",
                        extglob: true,
                        value: G,
                        output: n
                    });
                    decrement("parens");
                };
                if (u.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(t)) {
                    let n = false;
                    let s = t.replace(i, (t, e, u, o, s, r)=>{
                        if (o === "\\") {
                            n = true;
                            return t;
                        }
                        if (o === "?") {
                            if (e) {
                                return e + o + (s ? H.repeat(s.length) : "");
                            }
                            if (r === 0) {
                                return O + (s ? H.repeat(s.length) : "");
                            }
                            return H.repeat(u.length);
                        }
                        if (o === ".") {
                            return h.repeat(u.length);
                        }
                        if (o === "*") {
                            if (e) {
                                return e + o + (s ? k : "");
                            }
                            return k;
                        }
                        return e ? t : "\\".concat(t);
                    });
                    if (n === true) {
                        if (u.unescape === true) {
                            s = s.replace(/\\/g, "");
                        } else {
                            s = s.replace(/\\+/g, (t)=>t.length % 2 === 0 ? "\\\\" : t ? "\\" : "");
                        }
                    }
                    if (s === t && u.contains === true) {
                        m.output = t;
                        return m;
                    }
                    m.output = o.wrapOutput(s, m, e);
                    return m;
                }
                while(!eos()){
                    G = M();
                    if (G === "\0") {
                        continue;
                    }
                    if (G === "\\") {
                        const t = D();
                        if (t === "/" && u.bash !== true) {
                            continue;
                        }
                        if (t === "." || t === ";") {
                            continue;
                        }
                        if (!t) {
                            G += "\\";
                            push({
                                type: "text",
                                value: G
                            });
                            continue;
                        }
                        const e = /^\\+/.exec(remaining());
                        let n = 0;
                        if (e && e[0].length > 2) {
                            n = e[0].length;
                            m.index += n;
                            if (n % 2 !== 0) {
                                G += "\\";
                            }
                        }
                        if (u.unescape === true) {
                            G = M();
                        } else {
                            G += M();
                        }
                        if (m.brackets === 0) {
                            push({
                                type: "text",
                                value: G
                            });
                            continue;
                        }
                    }
                    if (m.brackets > 0 && (G !== "]" || B.value === "[" || B.value === "[^")) {
                        if (u.posix !== false && G === ":") {
                            const t = B.value.slice(1);
                            if (t.includes("[")) {
                                B.posix = true;
                                if (t.includes(":")) {
                                    const t = B.value.lastIndexOf("[");
                                    const e = B.value.slice(0, t);
                                    const u = B.value.slice(t + 2);
                                    const n = r[u];
                                    if (n) {
                                        B.value = e + n;
                                        m.backtrack = true;
                                        M();
                                        if (!f.output && A.indexOf(B) === 1) {
                                            f.output = C;
                                        }
                                        continue;
                                    }
                                }
                            }
                        }
                        if (G === "[" && D() !== ":" || G === "-" && D() === "]") {
                            G = "\\".concat(G);
                        }
                        if (G === "]" && (B.value === "[" || B.value === "[^")) {
                            G = "\\".concat(G);
                        }
                        if (u.posix === true && G === "!" && B.value === "[") {
                            G = "^";
                        }
                        B.value += G;
                        append({
                            value: G
                        });
                        continue;
                    }
                    if (m.quotes === 1 && G !== '"') {
                        G = o.escapeRegex(G);
                        B.value += G;
                        append({
                            value: G
                        });
                        continue;
                    }
                    if (G === '"') {
                        m.quotes = m.quotes === 1 ? 0 : 1;
                        if (u.keepQuotes === true) {
                            push({
                                type: "text",
                                value: G
                            });
                        }
                        continue;
                    }
                    if (G === "(") {
                        increment("parens");
                        push({
                            type: "paren",
                            value: G
                        });
                        continue;
                    }
                    if (G === ")") {
                        if (m.parens === 0 && u.strictBrackets === true) {
                            throw new SyntaxError(syntaxError("opening", "("));
                        }
                        const t = w[w.length - 1];
                        if (t && m.parens === t.parens + 1) {
                            extglobClose(w.pop());
                            continue;
                        }
                        push({
                            type: "paren",
                            value: G,
                            output: m.parens ? ")" : "\\)"
                        });
                        decrement("parens");
                        continue;
                    }
                    if (G === "[") {
                        if (u.nobracket === true || !remaining().includes("]")) {
                            if (u.nobracket !== true && u.strictBrackets === true) {
                                throw new SyntaxError(syntaxError("closing", "]"));
                            }
                            G = "\\".concat(G);
                        } else {
                            increment("brackets");
                        }
                        push({
                            type: "bracket",
                            value: G
                        });
                        continue;
                    }
                    if (G === "]") {
                        if (u.nobracket === true || B && B.type === "bracket" && B.value.length === 1) {
                            push({
                                type: "text",
                                value: G,
                                output: "\\".concat(G)
                            });
                            continue;
                        }
                        if (m.brackets === 0) {
                            if (u.strictBrackets === true) {
                                throw new SyntaxError(syntaxError("opening", "["));
                            }
                            push({
                                type: "text",
                                value: G,
                                output: "\\".concat(G)
                            });
                            continue;
                        }
                        decrement("brackets");
                        const t = B.value.slice(1);
                        if (B.posix !== true && t[0] === "^" && !t.includes("/")) {
                            G = "/".concat(G);
                        }
                        B.value += G;
                        append({
                            value: G
                        });
                        if (u.literalBrackets === false || o.hasRegexChars(t)) {
                            continue;
                        }
                        const e = o.escapeRegex(B.value);
                        m.output = m.output.slice(0, -B.value.length);
                        if (u.literalBrackets === true) {
                            m.output += e;
                            B.value = e;
                            continue;
                        }
                        B.value = "(".concat(_).concat(e, "|").concat(B.value, ")");
                        m.output += B.value;
                        continue;
                    }
                    if (G === "{" && u.nobrace !== true) {
                        increment("braces");
                        const t = {
                            type: "brace",
                            value: G,
                            output: "(",
                            outputIndex: m.output.length,
                            tokensIndex: m.tokens.length
                        };
                        N.push(t);
                        push(t);
                        continue;
                    }
                    if (G === "}") {
                        const t = N[N.length - 1];
                        if (u.nobrace === true || !t) {
                            push({
                                type: "text",
                                value: G,
                                output: G
                            });
                            continue;
                        }
                        let e = ")";
                        if (t.dots === true) {
                            const t = A.slice();
                            const n = [];
                            for(let e = t.length - 1; e >= 0; e--){
                                A.pop();
                                if (t[e].type === "brace") {
                                    break;
                                }
                                if (t[e].type !== "dots") {
                                    n.unshift(t[e].value);
                                }
                            }
                            e = expandRange(n, u);
                            m.backtrack = true;
                        }
                        if (t.comma !== true && t.dots !== true) {
                            const u = m.output.slice(0, t.outputIndex);
                            const n = m.tokens.slice(t.tokensIndex);
                            t.value = t.output = "\\{";
                            G = e = "\\}";
                            m.output = u;
                            for (const t of n){
                                m.output += t.output || t.value;
                            }
                        }
                        push({
                            type: "brace",
                            value: G,
                            output: e
                        });
                        decrement("braces");
                        N.pop();
                        continue;
                    }
                    if (G === "|") {
                        if (w.length > 0) {
                            w[w.length - 1].conditions++;
                        }
                        push({
                            type: "text",
                            value: G
                        });
                        continue;
                    }
                    if (G === ",") {
                        let t = G;
                        const e = N[N.length - 1];
                        if (e && I[I.length - 1] === "braces") {
                            e.comma = true;
                            t = "|";
                        }
                        push({
                            type: "comma",
                            value: G,
                            output: t
                        });
                        continue;
                    }
                    if (G === "/") {
                        if (B.type === "dot" && m.index === m.start + 1) {
                            m.start = m.index + 1;
                            m.consumed = "";
                            m.output = "";
                            A.pop();
                            B = f;
                            continue;
                        }
                        push({
                            type: "slash",
                            value: G,
                            output: b
                        });
                        continue;
                    }
                    if (G === ".") {
                        if (m.braces > 0 && B.type === "dot") {
                            if (B.value === ".") B.output = h;
                            const t = N[N.length - 1];
                            B.type = "dots";
                            B.output += G;
                            B.value += G;
                            t.dots = true;
                            continue;
                        }
                        if (m.braces + m.parens === 0 && B.type !== "bos" && B.type !== "slash") {
                            push({
                                type: "text",
                                value: G,
                                output: h
                            });
                            continue;
                        }
                        push({
                            type: "dot",
                            value: G,
                            output: h
                        });
                        continue;
                    }
                    if (G === "?") {
                        const t = B && B.value === "(";
                        if (!t && u.noextglob !== true && D() === "(" && D(2) !== "?") {
                            extglobOpen("qmark", G);
                            continue;
                        }
                        if (B && B.type === "paren") {
                            const t = D();
                            let e = G;
                            if (B.value === "(" && !/[!=<:]/.test(t) || t === "<" && !/<([!=]|\w+>)/.test(remaining())) {
                                e = "\\".concat(G);
                            }
                            push({
                                type: "text",
                                value: G,
                                output: e
                            });
                            continue;
                        }
                        if (u.dot !== true && (B.type === "slash" || B.type === "bos")) {
                            push({
                                type: "qmark",
                                value: G,
                                output: v
                            });
                            continue;
                        }
                        push({
                            type: "qmark",
                            value: G,
                            output: H
                        });
                        continue;
                    }
                    if (G === "!") {
                        if (u.noextglob !== true && D() === "(") {
                            if (D(2) !== "?" || !/[!=<:]/.test(D(3))) {
                                extglobOpen("negate", G);
                                continue;
                            }
                        }
                        if (u.nonegate !== true && m.index === 0) {
                            negate();
                            continue;
                        }
                    }
                    if (G === "+") {
                        if (u.noextglob !== true && D() === "(" && D(2) !== "?") {
                            extglobOpen("plus", G);
                            continue;
                        }
                        if (B && B.value === "(" || u.regex === false) {
                            push({
                                type: "plus",
                                value: G,
                                output: g
                            });
                            continue;
                        }
                        if (B && (B.type === "bracket" || B.type === "paren" || B.type === "brace") || m.parens > 0) {
                            push({
                                type: "plus",
                                value: G
                            });
                            continue;
                        }
                        push({
                            type: "plus",
                            value: g
                        });
                        continue;
                    }
                    if (G === "@") {
                        if (u.noextglob !== true && D() === "(" && D(2) !== "?") {
                            push({
                                type: "at",
                                extglob: true,
                                value: G,
                                output: ""
                            });
                            continue;
                        }
                        push({
                            type: "text",
                            value: G
                        });
                        continue;
                    }
                    if (G !== "*") {
                        if (G === "$" || G === "^") {
                            G = "\\".concat(G);
                        }
                        const t = a.exec(remaining());
                        if (t) {
                            G += t[0];
                            m.index += t[0].length;
                        }
                        push({
                            type: "text",
                            value: G
                        });
                        continue;
                    }
                    if (B && (B.type === "globstar" || B.star === true)) {
                        B.type = "star";
                        B.star = true;
                        B.value += G;
                        B.output = k;
                        m.backtrack = true;
                        m.globstar = true;
                        consume(G);
                        continue;
                    }
                    let e = remaining();
                    if (u.noextglob !== true && /^\([^?]/.test(e)) {
                        extglobOpen("star", G);
                        continue;
                    }
                    if (B.type === "star") {
                        if (u.noglobstar === true) {
                            consume(G);
                            continue;
                        }
                        const n = B.prev;
                        const o = n.prev;
                        const s = n.type === "slash" || n.type === "bos";
                        const r = o && (o.type === "star" || o.type === "globstar");
                        if (u.bash === true && (!s || e[0] && e[0] !== "/")) {
                            push({
                                type: "star",
                                value: G,
                                output: ""
                            });
                            continue;
                        }
                        const a = m.braces > 0 && (n.type === "comma" || n.type === "brace");
                        const i = w.length && (n.type === "pipe" || n.type === "paren");
                        if (!s && n.type !== "paren" && !a && !i) {
                            push({
                                type: "star",
                                value: G,
                                output: ""
                            });
                            continue;
                        }
                        while(e.slice(0, 3) === "/**"){
                            const u = t[m.index + 4];
                            if (u && u !== "/") {
                                break;
                            }
                            e = e.slice(3);
                            consume("/**", 3);
                        }
                        if (n.type === "bos" && eos()) {
                            B.type = "globstar";
                            B.value += G;
                            B.output = globstar(u);
                            m.output = B.output;
                            m.globstar = true;
                            consume(G);
                            continue;
                        }
                        if (n.type === "slash" && n.prev.type !== "bos" && !r && eos()) {
                            m.output = m.output.slice(0, -(n.output + B.output).length);
                            n.output = "(?:".concat(n.output);
                            B.type = "globstar";
                            B.output = globstar(u) + (u.strictSlashes ? ")" : "|$)");
                            B.value += G;
                            m.globstar = true;
                            m.output += n.output + B.output;
                            consume(G);
                            continue;
                        }
                        if (n.type === "slash" && n.prev.type !== "bos" && e[0] === "/") {
                            const t = e[1] !== void 0 ? "|$" : "";
                            m.output = m.output.slice(0, -(n.output + B.output).length);
                            n.output = "(?:".concat(n.output);
                            B.type = "globstar";
                            B.output = "".concat(globstar(u)).concat(b, "|").concat(b).concat(t, ")");
                            B.value += G;
                            m.output += n.output + B.output;
                            m.globstar = true;
                            consume(G + M());
                            push({
                                type: "slash",
                                value: "/",
                                output: ""
                            });
                            continue;
                        }
                        if (n.type === "bos" && e[0] === "/") {
                            B.type = "globstar";
                            B.value += G;
                            B.output = "(?:^|".concat(b, "|").concat(globstar(u)).concat(b, ")");
                            m.output = B.output;
                            m.globstar = true;
                            consume(G + M());
                            push({
                                type: "slash",
                                value: "/",
                                output: ""
                            });
                            continue;
                        }
                        m.output = m.output.slice(0, -B.output.length);
                        B.type = "globstar";
                        B.output = globstar(u);
                        B.value += G;
                        m.output += B.output;
                        m.globstar = true;
                        consume(G);
                        continue;
                    }
                    const n = {
                        type: "star",
                        value: G,
                        output: k
                    };
                    if (u.bash === true) {
                        n.output = ".*?";
                        if (B.type === "bos" || B.type === "slash") {
                            n.output = T + n.output;
                        }
                        push(n);
                        continue;
                    }
                    if (B && (B.type === "bracket" || B.type === "paren") && u.regex === true) {
                        n.output = G;
                        push(n);
                        continue;
                    }
                    if (m.index === m.start || B.type === "slash" || B.type === "dot") {
                        if (B.type === "dot") {
                            m.output += x;
                            B.output += x;
                        } else if (u.dot === true) {
                            m.output += S;
                            B.output += S;
                        } else {
                            m.output += T;
                            B.output += T;
                        }
                        if (D() !== "*") {
                            m.output += C;
                            B.output += C;
                        }
                    }
                    push(n);
                }
                while(m.brackets > 0){
                    if (u.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
                    m.output = o.escapeLast(m.output, "[");
                    decrement("brackets");
                }
                while(m.parens > 0){
                    if (u.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
                    m.output = o.escapeLast(m.output, "(");
                    decrement("parens");
                }
                while(m.braces > 0){
                    if (u.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
                    m.output = o.escapeLast(m.output, "{");
                    decrement("braces");
                }
                if (u.strictSlashes !== true && (B.type === "star" || B.type === "bracket")) {
                    push({
                        type: "maybe_slash",
                        value: "",
                        output: "".concat(b, "?")
                    });
                }
                if (m.backtrack === true) {
                    m.output = "";
                    for (const t of m.tokens){
                        m.output += t.output != null ? t.output : t.value;
                        if (t.suffix) {
                            m.output += t.suffix;
                        }
                    }
                }
                return m;
            };
            parse.fastpaths = (t, e)=>{
                const u = {
                    ...e
                };
                const r = typeof u.maxLength === "number" ? Math.min(s, u.maxLength) : s;
                const a = t.length;
                if (a > r) {
                    throw new SyntaxError("Input length: ".concat(a, ", exceeds maximum allowed length: ").concat(r));
                }
                t = c[t] || t;
                const { DOT_LITERAL: i, SLASH_LITERAL: p, ONE_CHAR: l, DOTS_SLASH: f, NO_DOT: A, NO_DOTS: _, NO_DOTS_SLASH: R, STAR: E, START_ANCHOR: h } = n.globChars(u.windows);
                const g = u.dot ? _ : A;
                const b = u.dot ? R : A;
                const C = u.capture ? "" : "?:";
                const y = {
                    negated: false,
                    prefix: ""
                };
                let $ = u.bash === true ? ".*?" : E;
                if (u.capture) {
                    $ = "(".concat($, ")");
                }
                const globstar = (t)=>{
                    if (t.noglobstar === true) return $;
                    return "(".concat(C, "(?:(?!").concat(h).concat(t.dot ? f : i, ").)*?)");
                };
                const create = (t)=>{
                    switch(t){
                        case "*":
                            return "".concat(g).concat(l).concat($);
                        case ".*":
                            return "".concat(i).concat(l).concat($);
                        case "*.*":
                            return "".concat(g).concat($).concat(i).concat(l).concat($);
                        case "*/*":
                            return "".concat(g).concat($).concat(p).concat(l).concat(b).concat($);
                        case "**":
                            return g + globstar(u);
                        case "**/*":
                            return "(?:".concat(g).concat(globstar(u)).concat(p, ")?").concat(b).concat(l).concat($);
                        case "**/*.*":
                            return "(?:".concat(g).concat(globstar(u)).concat(p, ")?").concat(b).concat($).concat(i).concat(l).concat($);
                        case "**/.*":
                            return "(?:".concat(g).concat(globstar(u)).concat(p, ")?").concat(i).concat(l).concat($);
                        default:
                            {
                                const e = /^(.*?)\.(\w+)$/.exec(t);
                                if (!e) return;
                                const u = create(e[1]);
                                if (!u) return;
                                return u + i + e[2];
                            }
                    }
                };
                const x = o.removePrefix(t, y);
                let S = create(x);
                if (S && u.strictSlashes !== true) {
                    S += "".concat(p, "?");
                }
                return S;
            };
            t.exports = parse;
        },
        510: (t, e, u)=>{
            const n = u(716);
            const o = u(697);
            const s = u(96);
            const r = u(154);
            const isObject = (t)=>t && typeof t === "object" && !Array.isArray(t);
            const picomatch = function(t, e) {
                let u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
                if (Array.isArray(t)) {
                    const n = t.map((t)=>picomatch(t, e, u));
                    const arrayMatcher = (t)=>{
                        for (const e of n){
                            const u = e(t);
                            if (u) return u;
                        }
                        return false;
                    };
                    return arrayMatcher;
                }
                const n = isObject(t) && t.tokens && t.input;
                if (t === "" || typeof t !== "string" && !n) {
                    throw new TypeError("Expected pattern to be a non-empty string");
                }
                const o = e || {};
                const s = o.windows;
                const r = n ? picomatch.compileRe(t, e) : picomatch.makeRe(t, e, false, true);
                const a = r.state;
                delete r.state;
                let isIgnored = ()=>false;
                if (o.ignore) {
                    const t = {
                        ...e,
                        ignore: null,
                        onMatch: null,
                        onResult: null
                    };
                    isIgnored = picomatch(o.ignore, t, u);
                }
                const matcher = function(u) {
                    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                    const { isMatch: i, match: c, output: p } = picomatch.test(u, r, e, {
                        glob: t,
                        posix: s
                    });
                    const l = {
                        glob: t,
                        state: a,
                        regex: r,
                        posix: s,
                        input: u,
                        output: p,
                        match: c,
                        isMatch: i
                    };
                    if (typeof o.onResult === "function") {
                        o.onResult(l);
                    }
                    if (i === false) {
                        l.isMatch = false;
                        return n ? l : false;
                    }
                    if (isIgnored(u)) {
                        if (typeof o.onIgnore === "function") {
                            o.onIgnore(l);
                        }
                        l.isMatch = false;
                        return n ? l : false;
                    }
                    if (typeof o.onMatch === "function") {
                        o.onMatch(l);
                    }
                    return n ? l : true;
                };
                if (u) {
                    matcher.state = a;
                }
                return matcher;
            };
            picomatch.test = function(t, e, u) {
                let { glob: n, posix: o } = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
                if (typeof t !== "string") {
                    throw new TypeError("Expected input to be a string");
                }
                if (t === "") {
                    return {
                        isMatch: false,
                        output: ""
                    };
                }
                const r = u || {};
                const a = r.format || (o ? s.toPosixSlashes : null);
                let i = t === n;
                let c = i && a ? a(t) : t;
                if (i === false) {
                    c = a ? a(t) : t;
                    i = c === n;
                }
                if (i === false || r.capture === true) {
                    if (r.matchBase === true || r.basename === true) {
                        i = picomatch.matchBase(t, e, u, o);
                    } else {
                        i = e.exec(c);
                    }
                }
                return {
                    isMatch: Boolean(i),
                    match: i,
                    output: c
                };
            };
            picomatch.matchBase = (t, e, u)=>{
                const n = e instanceof RegExp ? e : picomatch.makeRe(e, u);
                return n.test(s.basename(t));
            };
            picomatch.isMatch = (t, e, u)=>picomatch(e, u)(t);
            picomatch.parse = (t, e)=>{
                if (Array.isArray(t)) return t.map((t)=>picomatch.parse(t, e));
                return o(t, {
                    ...e,
                    fastpaths: false
                });
            };
            picomatch.scan = (t, e)=>n(t, e);
            picomatch.compileRe = function(t, e) {
                let u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
                if (u === true) {
                    return t.output;
                }
                const o = e || {};
                const s = o.contains ? "" : "^";
                const r = o.contains ? "" : "$";
                let a = "".concat(s, "(?:").concat(t.output, ")").concat(r);
                if (t && t.negated === true) {
                    a = "^(?!".concat(a, ").*$");
                }
                const i = picomatch.toRegex(a, e);
                if (n === true) {
                    i.state = t;
                }
                return i;
            };
            picomatch.makeRe = function(t) {
                let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
                if (!t || typeof t !== "string") {
                    throw new TypeError("Expected a non-empty string");
                }
                let s = {
                    negated: false,
                    fastpaths: true
                };
                if (e.fastpaths !== false && (t[0] === "." || t[0] === "*")) {
                    s.output = o.fastpaths(t, e);
                }
                if (!s.output) {
                    s = o(t, e);
                }
                return picomatch.compileRe(s, e, u, n);
            };
            picomatch.toRegex = (t, e)=>{
                try {
                    const u = e || {};
                    return new RegExp(t, u.flags || (u.nocase ? "i" : ""));
                } catch (t) {
                    if (e && e.debug === true) throw t;
                    return /$^/;
                }
            };
            picomatch.constants = r;
            t.exports = picomatch;
        },
        716: (t, e, u)=>{
            const n = u(96);
            const { CHAR_ASTERISK: o, CHAR_AT: s, CHAR_BACKWARD_SLASH: r, CHAR_COMMA: a, CHAR_DOT: i, CHAR_EXCLAMATION_MARK: c, CHAR_FORWARD_SLASH: p, CHAR_LEFT_CURLY_BRACE: l, CHAR_LEFT_PARENTHESES: f, CHAR_LEFT_SQUARE_BRACKET: A, CHAR_PLUS: _, CHAR_QUESTION_MARK: R, CHAR_RIGHT_CURLY_BRACE: E, CHAR_RIGHT_PARENTHESES: h, CHAR_RIGHT_SQUARE_BRACKET: g } = u(154);
            const isPathSeparator = (t)=>t === p || t === r;
            const depth = (t)=>{
                if (t.isPrefix !== true) {
                    t.depth = t.isGlobstar ? Infinity : 1;
                }
            };
            const scan = (t, e)=>{
                const u = e || {};
                const b = t.length - 1;
                const C = u.parts === true || u.scanToEnd === true;
                const y = [];
                const $ = [];
                const x = [];
                let S = t;
                let H = -1;
                let v = 0;
                let d = 0;
                let L = false;
                let T = false;
                let O = false;
                let k = false;
                let m = false;
                let w = false;
                let N = false;
                let I = false;
                let B = false;
                let G = false;
                let D = 0;
                let M;
                let P;
                let K = {
                    value: "",
                    depth: 0,
                    isGlob: false
                };
                const eos = ()=>H >= b;
                const peek = ()=>S.charCodeAt(H + 1);
                const advance = ()=>{
                    M = P;
                    return S.charCodeAt(++H);
                };
                while(H < b){
                    P = advance();
                    let t;
                    if (P === r) {
                        N = K.backslashes = true;
                        P = advance();
                        if (P === l) {
                            w = true;
                        }
                        continue;
                    }
                    if (w === true || P === l) {
                        D++;
                        while(eos() !== true && (P = advance())){
                            if (P === r) {
                                N = K.backslashes = true;
                                advance();
                                continue;
                            }
                            if (P === l) {
                                D++;
                                continue;
                            }
                            if (w !== true && P === i && (P = advance()) === i) {
                                L = K.isBrace = true;
                                O = K.isGlob = true;
                                G = true;
                                if (C === true) {
                                    continue;
                                }
                                break;
                            }
                            if (w !== true && P === a) {
                                L = K.isBrace = true;
                                O = K.isGlob = true;
                                G = true;
                                if (C === true) {
                                    continue;
                                }
                                break;
                            }
                            if (P === E) {
                                D--;
                                if (D === 0) {
                                    w = false;
                                    L = K.isBrace = true;
                                    G = true;
                                    break;
                                }
                            }
                        }
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                    if (P === p) {
                        y.push(H);
                        $.push(K);
                        K = {
                            value: "",
                            depth: 0,
                            isGlob: false
                        };
                        if (G === true) continue;
                        if (M === i && H === v + 1) {
                            v += 2;
                            continue;
                        }
                        d = H + 1;
                        continue;
                    }
                    if (u.noext !== true) {
                        const t = P === _ || P === s || P === o || P === R || P === c;
                        if (t === true && peek() === f) {
                            O = K.isGlob = true;
                            k = K.isExtglob = true;
                            G = true;
                            if (P === c && H === v) {
                                B = true;
                            }
                            if (C === true) {
                                while(eos() !== true && (P = advance())){
                                    if (P === r) {
                                        N = K.backslashes = true;
                                        P = advance();
                                        continue;
                                    }
                                    if (P === h) {
                                        O = K.isGlob = true;
                                        G = true;
                                        break;
                                    }
                                }
                                continue;
                            }
                            break;
                        }
                    }
                    if (P === o) {
                        if (M === o) m = K.isGlobstar = true;
                        O = K.isGlob = true;
                        G = true;
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                    if (P === R) {
                        O = K.isGlob = true;
                        G = true;
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                    if (P === A) {
                        while(eos() !== true && (t = advance())){
                            if (t === r) {
                                N = K.backslashes = true;
                                advance();
                                continue;
                            }
                            if (t === g) {
                                T = K.isBracket = true;
                                O = K.isGlob = true;
                                G = true;
                                break;
                            }
                        }
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                    if (u.nonegate !== true && P === c && H === v) {
                        I = K.negated = true;
                        v++;
                        continue;
                    }
                    if (u.noparen !== true && P === f) {
                        O = K.isGlob = true;
                        if (C === true) {
                            while(eos() !== true && (P = advance())){
                                if (P === f) {
                                    N = K.backslashes = true;
                                    P = advance();
                                    continue;
                                }
                                if (P === h) {
                                    G = true;
                                    break;
                                }
                            }
                            continue;
                        }
                        break;
                    }
                    if (O === true) {
                        G = true;
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                }
                if (u.noext === true) {
                    k = false;
                    O = false;
                }
                let U = S;
                let X = "";
                let F = "";
                if (v > 0) {
                    X = S.slice(0, v);
                    S = S.slice(v);
                    d -= v;
                }
                if (U && O === true && d > 0) {
                    U = S.slice(0, d);
                    F = S.slice(d);
                } else if (O === true) {
                    U = "";
                    F = S;
                } else {
                    U = S;
                }
                if (U && U !== "" && U !== "/" && U !== S) {
                    if (isPathSeparator(U.charCodeAt(U.length - 1))) {
                        U = U.slice(0, -1);
                    }
                }
                if (u.unescape === true) {
                    if (F) F = n.removeBackslashes(F);
                    if (U && N === true) {
                        U = n.removeBackslashes(U);
                    }
                }
                const Q = {
                    prefix: X,
                    input: t,
                    start: v,
                    base: U,
                    glob: F,
                    isBrace: L,
                    isBracket: T,
                    isGlob: O,
                    isExtglob: k,
                    isGlobstar: m,
                    negated: I,
                    negatedExtglob: B
                };
                if (u.tokens === true) {
                    Q.maxDepth = 0;
                    if (!isPathSeparator(P)) {
                        $.push(K);
                    }
                    Q.tokens = $;
                }
                if (u.parts === true || u.tokens === true) {
                    let e;
                    for(let n = 0; n < y.length; n++){
                        const o = e ? e + 1 : v;
                        const s = y[n];
                        const r = t.slice(o, s);
                        if (u.tokens) {
                            if (n === 0 && v !== 0) {
                                $[n].isPrefix = true;
                                $[n].value = X;
                            } else {
                                $[n].value = r;
                            }
                            depth($[n]);
                            Q.maxDepth += $[n].depth;
                        }
                        if (n !== 0 || r !== "") {
                            x.push(r);
                        }
                        e = s;
                    }
                    if (e && e + 1 < t.length) {
                        const n = t.slice(e + 1);
                        x.push(n);
                        if (u.tokens) {
                            $[$.length - 1].value = n;
                            depth($[$.length - 1]);
                            Q.maxDepth += $[$.length - 1].depth;
                        }
                    }
                    Q.slashes = y;
                    Q.parts = x;
                }
                return Q;
            };
            t.exports = scan;
        },
        96: (t, e, u)=>{
            const { REGEX_BACKSLASH: n, REGEX_REMOVE_BACKSLASH: o, REGEX_SPECIAL_CHARS: s, REGEX_SPECIAL_CHARS_GLOBAL: r } = u(154);
            e.isObject = (t)=>t !== null && typeof t === "object" && !Array.isArray(t);
            e.hasRegexChars = (t)=>s.test(t);
            e.isRegexChar = (t)=>t.length === 1 && e.hasRegexChars(t);
            e.escapeRegex = (t)=>t.replace(r, "\\$1");
            e.toPosixSlashes = (t)=>t.replace(n, "/");
            e.removeBackslashes = (t)=>t.replace(o, (t)=>t === "\\" ? "" : t);
            e.escapeLast = (t, u, n)=>{
                const o = t.lastIndexOf(u, n);
                if (o === -1) return t;
                if (t[o - 1] === "\\") return e.escapeLast(t, u, o - 1);
                return "".concat(t.slice(0, o), "\\").concat(t.slice(o));
            };
            e.removePrefix = function(t) {
                let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                let u = t;
                if (u.startsWith("./")) {
                    u = u.slice(2);
                    e.prefix = "./";
                }
                return u;
            };
            e.wrapOutput = function(t) {
                let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                const n = u.contains ? "" : "^";
                const o = u.contains ? "" : "$";
                let s = "".concat(n, "(?:").concat(t, ")").concat(o);
                if (e.negated === true) {
                    s = "(?:^(?!".concat(s, ").*$)");
                }
                return s;
            };
            e.basename = function(t) {
                let { windows: e } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                const u = t.split(e ? /[\\/]/ : "/");
                const n = u[u.length - 1];
                if (n === "") {
                    return u[u.length - 2];
                }
                return n;
            };
        }
    };
    var e = {};
    function __nccwpck_require__(u) {
        var n = e[u];
        if (n !== undefined) {
            return n.exports;
        }
        var o = e[u] = {
            exports: {}
        };
        var s = true;
        try {
            t[u](o, o.exports, __nccwpck_require__);
            s = false;
        } finally{
            if (s) delete e[u];
        }
        return o.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/picomatch") + "/";
    var u = __nccwpck_require__(170);
    module.exports = u;
})();
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/match-local-pattern.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    hasLocalMatch: null,
    matchLocalPattern: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    hasLocalMatch: function() {
        return hasLocalMatch;
    },
    matchLocalPattern: function() {
        return matchLocalPattern;
    }
});
const _picomatch = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/picomatch/index.js [app-client] (ecmascript)");
function matchLocalPattern(pattern, url) {
    if (pattern.search !== undefined) {
        if (pattern.search !== url.search) {
            return false;
        }
    }
    var _pattern_pathname;
    if (!(0, _picomatch.makeRe)((_pattern_pathname = pattern.pathname) != null ? _pattern_pathname : '**', {
        dot: true
    }).test(url.pathname)) {
        return false;
    }
    return true;
}
function hasLocalMatch(localPatterns, urlPathAndQuery) {
    if (!localPatterns) {
        // if the user didn't define "localPatterns", we allow all local images
        return true;
    }
    const url = new URL(urlPathAndQuery, 'http://n');
    return localPatterns.some((p)=>matchLocalPattern(p, url));
} //# sourceMappingURL=match-local-pattern.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/match-remote-pattern.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    hasRemoteMatch: null,
    matchRemotePattern: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    hasRemoteMatch: function() {
        return hasRemoteMatch;
    },
    matchRemotePattern: function() {
        return matchRemotePattern;
    }
});
const _picomatch = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/picomatch/index.js [app-client] (ecmascript)");
function matchRemotePattern(pattern, url) {
    if (pattern.protocol !== undefined) {
        if (pattern.protocol.replace(/:$/, '') !== url.protocol.replace(/:$/, '')) {
            return false;
        }
    }
    if (pattern.port !== undefined) {
        if (pattern.port !== url.port) {
            return false;
        }
    }
    if (pattern.hostname === undefined) {
        throw Object.defineProperty(new Error("Pattern should define hostname but found\n" + JSON.stringify(pattern)), "__NEXT_ERROR_CODE", {
            value: "E410",
            enumerable: false,
            configurable: true
        });
    } else {
        if (!(0, _picomatch.makeRe)(pattern.hostname).test(url.hostname)) {
            return false;
        }
    }
    if (pattern.search !== undefined) {
        if (pattern.search !== url.search) {
            return false;
        }
    }
    var _pattern_pathname;
    // Should be the same as writeImagesManifest()
    if (!(0, _picomatch.makeRe)((_pattern_pathname = pattern.pathname) != null ? _pattern_pathname : '**', {
        dot: true
    }).test(url.pathname)) {
        return false;
    }
    return true;
}
function hasRemoteMatch(domains, remotePatterns, url) {
    return domains.some((domain)=>url.hostname === domain) || remotePatterns.some((p)=>matchRemotePattern(p, url));
} //# sourceMappingURL=match-remote-pattern.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/image-loader.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const DEFAULT_Q = 75;
function defaultLoader(param) {
    let { config, src, width, quality } = param;
    var _config_qualities;
    if ("TURBOPACK compile-time truthy", 1) {
        const missingValues = [];
        // these should always be provided but make sure they are
        if (!src) missingValues.push('src');
        if (!width) missingValues.push('width');
        if (missingValues.length > 0) {
            throw Object.defineProperty(new Error("Next Image Optimization requires " + missingValues.join(', ') + " to be provided. Make sure you pass them as props to the `next/image` component. Received: " + JSON.stringify({
                src,
                width,
                quality
            })), "__NEXT_ERROR_CODE", {
                value: "E188",
                enumerable: false,
                configurable: true
            });
        }
        if (src.startsWith('//')) {
            throw Object.defineProperty(new Error('Failed to parse src "' + src + '" on `next/image`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)'), "__NEXT_ERROR_CODE", {
                value: "E360",
                enumerable: false,
                configurable: true
            });
        }
        if (src.startsWith('/') && config.localPatterns) {
            if ("TURBOPACK compile-time truthy", 1) {
                // We use dynamic require because this should only error in development
                const { hasLocalMatch } = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/match-local-pattern.js [app-client] (ecmascript)");
                if (!hasLocalMatch(config.localPatterns, src)) {
                    throw Object.defineProperty(new Error("Invalid src prop (" + src + ") on `next/image` does not match `images.localPatterns` configured in your `next.config.js`\n" + "See more info: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns"), "__NEXT_ERROR_CODE", {
                        value: "E426",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
        if (!src.startsWith('/') && (config.domains || config.remotePatterns)) {
            let parsedSrc;
            try {
                parsedSrc = new URL(src);
            } catch (err) {
                console.error(err);
                throw Object.defineProperty(new Error('Failed to parse src "' + src + '" on `next/image`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)'), "__NEXT_ERROR_CODE", {
                    value: "E63",
                    enumerable: false,
                    configurable: true
                });
            }
            if ("TURBOPACK compile-time truthy", 1) {
                // We use dynamic require because this should only error in development
                const { hasRemoteMatch } = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/match-remote-pattern.js [app-client] (ecmascript)");
                if (!hasRemoteMatch(config.domains, config.remotePatterns, parsedSrc)) {
                    throw Object.defineProperty(new Error("Invalid src prop (" + src + ') on `next/image`, hostname "' + parsedSrc.hostname + '" is not configured under images in your `next.config.js`\n' + "See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host"), "__NEXT_ERROR_CODE", {
                        value: "E231",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
        if (quality && config.qualities && !config.qualities.includes(quality)) {
            throw Object.defineProperty(new Error("Invalid quality prop (" + quality + ") on `next/image` does not match `images.qualities` configured in your `next.config.js`\n" + "See more info: https://nextjs.org/docs/messages/next-image-unconfigured-qualities"), "__NEXT_ERROR_CODE", {
                value: "E623",
                enumerable: false,
                configurable: true
            });
        }
    }
    const q = quality || ((_config_qualities = config.qualities) == null ? void 0 : _config_qualities.reduce((prev, cur)=>Math.abs(cur - DEFAULT_Q) < Math.abs(prev - DEFAULT_Q) ? cur : prev)) || DEFAULT_Q;
    return config.path + "?url=" + encodeURIComponent(src) + "&w=" + width + "&q=" + q + (src.startsWith('/_next/static/media/') && ("TURBOPACK compile-time value", false) ? "TURBOPACK unreachable" : '');
}
// We use this to determine if the import is the default loader
// or a custom loader defined by the user in next.config.js
defaultLoader.__next_img_default = true;
const _default = defaultLoader; //# sourceMappingURL=image-loader.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/client/image-component.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Image", {
    enumerable: true,
    get: function() {
        return Image;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _interop_require_wildcard = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _reactdom = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)"));
const _head = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/head.js [app-client] (ecmascript)"));
const _getimgprops = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/get-img-props.js [app-client] (ecmascript)");
const _imageconfig = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/image-config.js [app-client] (ecmascript)");
const _imageconfigcontextsharedruntime = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/image-config-context.shared-runtime.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _routercontextsharedruntime = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/router-context.shared-runtime.js [app-client] (ecmascript)");
const _imageloader = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/image-loader.js [app-client] (ecmascript)"));
const _usemergedref = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)");
// This is replaced by webpack define plugin
const configEnv = ("TURBOPACK compile-time value", {
    "deviceSizes": ("TURBOPACK compile-time value", [
        ("TURBOPACK compile-time value", 640),
        ("TURBOPACK compile-time value", 750),
        ("TURBOPACK compile-time value", 828),
        ("TURBOPACK compile-time value", 1080),
        ("TURBOPACK compile-time value", 1200),
        ("TURBOPACK compile-time value", 1920),
        ("TURBOPACK compile-time value", 2048),
        ("TURBOPACK compile-time value", 3840)
    ]),
    "imageSizes": ("TURBOPACK compile-time value", [
        ("TURBOPACK compile-time value", 16),
        ("TURBOPACK compile-time value", 32),
        ("TURBOPACK compile-time value", 48),
        ("TURBOPACK compile-time value", 64),
        ("TURBOPACK compile-time value", 96),
        ("TURBOPACK compile-time value", 128),
        ("TURBOPACK compile-time value", 256),
        ("TURBOPACK compile-time value", 384)
    ]),
    "path": ("TURBOPACK compile-time value", "/_next/image"),
    "loader": ("TURBOPACK compile-time value", "default"),
    "dangerouslyAllowSVG": ("TURBOPACK compile-time value", false),
    "unoptimized": ("TURBOPACK compile-time value", false),
    "domains": ("TURBOPACK compile-time value", []),
    "remotePatterns": ("TURBOPACK compile-time value", [])
});
if (typeof window === 'undefined') {
    ;
    globalThis.__NEXT_IMAGE_IMPORTED = true;
}
// See https://stackoverflow.com/q/39777833/266535 for why we use this ref
// handler instead of the img's onLoad attribute.
function handleLoading(img, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized, sizesInput) {
    const src = img == null ? void 0 : img.src;
    if (!img || img['data-loaded-src'] === src) {
        return;
    }
    img['data-loaded-src'] = src;
    const p = 'decode' in img ? img.decode() : Promise.resolve();
    p.catch(()=>{}).then(()=>{
        if (!img.parentElement || !img.isConnected) {
            // Exit early in case of race condition:
            // - onload() is called
            // - decode() is called but incomplete
            // - unmount is called
            // - decode() completes
            return;
        }
        if (placeholder !== 'empty') {
            setBlurComplete(true);
        }
        if (onLoadRef == null ? void 0 : onLoadRef.current) {
            // Since we don't have the SyntheticEvent here,
            // we must create one with the same shape.
            // See https://reactjs.org/docs/events.html
            const event = new Event('load');
            Object.defineProperty(event, 'target', {
                writable: false,
                value: img
            });
            let prevented = false;
            let stopped = false;
            onLoadRef.current({
                ...event,
                nativeEvent: event,
                currentTarget: img,
                target: img,
                isDefaultPrevented: ()=>prevented,
                isPropagationStopped: ()=>stopped,
                persist: ()=>{},
                preventDefault: ()=>{
                    prevented = true;
                    event.preventDefault();
                },
                stopPropagation: ()=>{
                    stopped = true;
                    event.stopPropagation();
                }
            });
        }
        if (onLoadingCompleteRef == null ? void 0 : onLoadingCompleteRef.current) {
            onLoadingCompleteRef.current(img);
        }
        if ("TURBOPACK compile-time truthy", 1) {
            const origSrc = new URL(src, 'http://n').searchParams.get('url') || src;
            if (img.getAttribute('data-nimg') === 'fill') {
                if (!unoptimized && (!sizesInput || sizesInput === '100vw')) {
                    let widthViewportRatio = img.getBoundingClientRect().width / window.innerWidth;
                    if (widthViewportRatio < 0.6) {
                        if (sizesInput === '100vw') {
                            (0, _warnonce.warnOnce)('Image with src "' + origSrc + '" has "fill" prop and "sizes" prop of "100vw", but image is not rendered at full viewport width. Please adjust "sizes" to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes');
                        } else {
                            (0, _warnonce.warnOnce)('Image with src "' + origSrc + '" has "fill" but is missing "sizes" prop. Please add it to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes');
                        }
                    }
                }
                if (img.parentElement) {
                    const { position } = window.getComputedStyle(img.parentElement);
                    const valid = [
                        'absolute',
                        'fixed',
                        'relative'
                    ];
                    if (!valid.includes(position)) {
                        (0, _warnonce.warnOnce)('Image with src "' + origSrc + '" has "fill" and parent element with invalid "position". Provided "' + position + '" should be one of ' + valid.map(String).join(',') + ".");
                    }
                }
                if (img.height === 0) {
                    (0, _warnonce.warnOnce)('Image with src "' + origSrc + '" has "fill" and a height value of 0. This is likely because the parent element of the image has not been styled to have a set height.');
                }
            }
            const heightModified = img.height.toString() !== img.getAttribute('height');
            const widthModified = img.width.toString() !== img.getAttribute('width');
            if (heightModified && !widthModified || !heightModified && widthModified) {
                (0, _warnonce.warnOnce)('Image with src "' + origSrc + '" has either width or height modified, but not the other. If you use CSS to change the size of your image, also include the styles \'width: "auto"\' or \'height: "auto"\' to maintain the aspect ratio.');
            }
        }
    });
}
function getDynamicProps(fetchPriority) {
    if (Boolean(_react.use)) {
        // In React 19.0.0 or newer, we must use camelCase
        // prop to avoid "Warning: Invalid DOM property".
        // See https://github.com/facebook/react/pull/25927
        return {
            fetchPriority
        };
    }
    // In React 18.2.0 or older, we must use lowercase prop
    // to avoid "Warning: Invalid DOM property".
    return {
        fetchpriority: fetchPriority
    };
}
const ImageElement = /*#__PURE__*/ (0, _react.forwardRef)((param, forwardedRef)=>{
    let { src, srcSet, sizes, height, width, decoding, className, style, fetchPriority, placeholder, loading, unoptimized, fill, onLoadRef, onLoadingCompleteRef, setBlurComplete, setShowAltText, sizesInput, onLoad, onError, ...rest } = param;
    const ownRef = (0, _react.useCallback)((img)=>{
        if (!img) {
            return;
        }
        if (onError) {
            // If the image has an error before react hydrates, then the error is lost.
            // The workaround is to wait until the image is mounted which is after hydration,
            // then we set the src again to trigger the error handler (if there was an error).
            // eslint-disable-next-line no-self-assign
            img.src = img.src;
        }
        if ("TURBOPACK compile-time truthy", 1) {
            if (!src) {
                console.error('Image is missing required "src" property:', img);
            }
            if (img.getAttribute('alt') === null) {
                console.error('Image is missing required "alt" property. Please add Alternative Text to describe the image for screen readers and search engines.');
            }
        }
        if (img.complete) {
            handleLoading(img, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized, sizesInput);
        }
    }, [
        src,
        placeholder,
        onLoadRef,
        onLoadingCompleteRef,
        setBlurComplete,
        onError,
        unoptimized,
        sizesInput
    ]);
    const ref = (0, _usemergedref.useMergedRef)(forwardedRef, ownRef);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("img", {
        ...rest,
        ...getDynamicProps(fetchPriority),
        // It's intended to keep `loading` before `src` because React updates
        // props in order which causes Safari/Firefox to not lazy load properly.
        // See https://github.com/facebook/react/issues/25883
        loading: loading,
        width: width,
        height: height,
        decoding: decoding,
        "data-nimg": fill ? 'fill' : '1',
        className: className,
        style: style,
        // It's intended to keep `src` the last attribute because React updates
        // attributes in order. If we keep `src` the first one, Safari will
        // immediately start to fetch `src`, before `sizes` and `srcSet` are even
        // updated by React. That causes multiple unnecessary requests if `srcSet`
        // and `sizes` are defined.
        // This bug cannot be reproduced in Chrome or Firefox.
        sizes: sizes,
        srcSet: srcSet,
        src: src,
        ref: ref,
        onLoad: (event)=>{
            const img = event.currentTarget;
            handleLoading(img, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized, sizesInput);
        },
        onError: (event)=>{
            // if the real image fails to load, this will ensure "alt" is visible
            setShowAltText(true);
            if (placeholder !== 'empty') {
                // If the real image fails to load, this will still remove the placeholder.
                setBlurComplete(true);
            }
            if (onError) {
                onError(event);
            }
        }
    });
});
function ImagePreload(param) {
    let { isAppRouter, imgAttributes } = param;
    const opts = {
        as: 'image',
        imageSrcSet: imgAttributes.srcSet,
        imageSizes: imgAttributes.sizes,
        crossOrigin: imgAttributes.crossOrigin,
        referrerPolicy: imgAttributes.referrerPolicy,
        ...getDynamicProps(imgAttributes.fetchPriority)
    };
    if (isAppRouter && _reactdom.default.preload) {
        _reactdom.default.preload(imgAttributes.src, opts);
        return null;
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_head.default, {
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
            rel: "preload",
            // Note how we omit the `href` attribute, as it would only be relevant
            // for browsers that do not support `imagesrcset`, and in those cases
            // it would cause the incorrect image to be preloaded.
            //
            // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
            href: imgAttributes.srcSet ? undefined : imgAttributes.src,
            ...opts
        }, '__nimg-' + imgAttributes.src + imgAttributes.srcSet + imgAttributes.sizes)
    });
}
const Image = /*#__PURE__*/ (0, _react.forwardRef)((props, forwardedRef)=>{
    const pagesRouter = (0, _react.useContext)(_routercontextsharedruntime.RouterContext);
    // We're in the app directory if there is no pages router.
    const isAppRouter = !pagesRouter;
    const configContext = (0, _react.useContext)(_imageconfigcontextsharedruntime.ImageConfigContext);
    const config = (0, _react.useMemo)(()=>{
        var _c_qualities;
        const c = configEnv || configContext || _imageconfig.imageConfigDefault;
        const allSizes = [
            ...c.deviceSizes,
            ...c.imageSizes
        ].sort((a, b)=>a - b);
        const deviceSizes = c.deviceSizes.sort((a, b)=>a - b);
        const qualities = (_c_qualities = c.qualities) == null ? void 0 : _c_qualities.sort((a, b)=>a - b);
        return {
            ...c,
            allSizes,
            deviceSizes,
            qualities
        };
    }, [
        configContext
    ]);
    const { onLoad, onLoadingComplete } = props;
    const onLoadRef = (0, _react.useRef)(onLoad);
    (0, _react.useEffect)(()=>{
        onLoadRef.current = onLoad;
    }, [
        onLoad
    ]);
    const onLoadingCompleteRef = (0, _react.useRef)(onLoadingComplete);
    (0, _react.useEffect)(()=>{
        onLoadingCompleteRef.current = onLoadingComplete;
    }, [
        onLoadingComplete
    ]);
    const [blurComplete, setBlurComplete] = (0, _react.useState)(false);
    const [showAltText, setShowAltText] = (0, _react.useState)(false);
    const { props: imgAttributes, meta: imgMeta } = (0, _getimgprops.getImgProps)(props, {
        defaultLoader: _imageloader.default,
        imgConf: config,
        blurComplete,
        showAltText
    });
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(ImageElement, {
                ...imgAttributes,
                unoptimized: imgMeta.unoptimized,
                placeholder: imgMeta.placeholder,
                fill: imgMeta.fill,
                onLoadRef: onLoadRef,
                onLoadingCompleteRef: onLoadingCompleteRef,
                setBlurComplete: setBlurComplete,
                setShowAltText: setShowAltText,
                sizesInput: props.sizes,
                ref: forwardedRef
            }),
            imgMeta.priority ? /*#__PURE__*/ (0, _jsxruntime.jsx)(ImagePreload, {
                isAppRouter: isAppRouter,
                imgAttributes: imgAttributes
            }) : null
        ]
    });
});
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=image-component.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/image-external.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    getImageProps: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    getImageProps: function() {
        return getImageProps;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _getimgprops = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/get-img-props.js [app-client] (ecmascript)");
const _imagecomponent = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/client/image-component.js [app-client] (ecmascript)");
const _imageloader = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/image-loader.js [app-client] (ecmascript)"));
function getImageProps(imgProps) {
    const { props } = (0, _getimgprops.getImgProps)(imgProps, {
        defaultLoader: _imageloader.default,
        // This is replaced by webpack define plugin
        imgConf: ("TURBOPACK compile-time value", {
            "deviceSizes": ("TURBOPACK compile-time value", [
                ("TURBOPACK compile-time value", 640),
                ("TURBOPACK compile-time value", 750),
                ("TURBOPACK compile-time value", 828),
                ("TURBOPACK compile-time value", 1080),
                ("TURBOPACK compile-time value", 1200),
                ("TURBOPACK compile-time value", 1920),
                ("TURBOPACK compile-time value", 2048),
                ("TURBOPACK compile-time value", 3840)
            ]),
            "imageSizes": ("TURBOPACK compile-time value", [
                ("TURBOPACK compile-time value", 16),
                ("TURBOPACK compile-time value", 32),
                ("TURBOPACK compile-time value", 48),
                ("TURBOPACK compile-time value", 64),
                ("TURBOPACK compile-time value", 96),
                ("TURBOPACK compile-time value", 128),
                ("TURBOPACK compile-time value", 256),
                ("TURBOPACK compile-time value", 384)
            ]),
            "path": ("TURBOPACK compile-time value", "/_next/image"),
            "loader": ("TURBOPACK compile-time value", "default"),
            "dangerouslyAllowSVG": ("TURBOPACK compile-time value", false),
            "unoptimized": ("TURBOPACK compile-time value", false),
            "domains": ("TURBOPACK compile-time value", []),
            "remotePatterns": ("TURBOPACK compile-time value", [])
        })
    });
    // Normally we don't care about undefined props because we pass to JSX,
    // but this exported function could be used by the end user for anything
    // so we delete undefined props to clean it up a little.
    for (const [key, value] of Object.entries(props)){
        if (value === undefined) {
            delete props[key];
        }
    }
    return {
        props
    };
}
const _default = _imagecomponent.Image; //# sourceMappingURL=image-external.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/image.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/shared/lib/image-external.js [app-client] (ecmascript)");
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _tagged_template_literal(strings, raw) {
    if (!raw) raw = strings.slice(0);
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}
exports._ = _tagged_template_literal;
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/code.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "",
        "",
        ""
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "[",
        "]"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class _CodeOrName {
}
exports._CodeOrName = _CodeOrName;
exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
class Name extends _CodeOrName {
    toString() {
        return this.str;
    }
    emptyStr() {
        return false;
    }
    get names() {
        return {
            [this.str]: 1
        };
    }
    constructor(s){
        super();
        if (!exports.IDENTIFIER.test(s)) throw new Error("CodeGen: name must be a valid identifier");
        this.str = s;
    }
}
exports.Name = Name;
class _Code extends _CodeOrName {
    toString() {
        return this.str;
    }
    emptyStr() {
        if (this._items.length > 1) return false;
        const item = this._items[0];
        return item === "" || item === '""';
    }
    get str() {
        var _a;
        return (_a = this._str) !== null && _a !== void 0 ? _a : this._str = this._items.reduce((s, c)=>"".concat(s).concat(c), "");
    }
    get names() {
        var _a;
        return (_a = this._names) !== null && _a !== void 0 ? _a : this._names = this._items.reduce((names, c)=>{
            if (c instanceof Name) names[c.str] = (names[c.str] || 0) + 1;
            return names;
        }, {});
    }
    constructor(code){
        super();
        this._items = typeof code === "string" ? [
            code
        ] : code;
    }
}
exports._Code = _Code;
exports.nil = new _Code("");
function _(strs) {
    for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        args[_key - 1] = arguments[_key];
    }
    const code = [
        strs[0]
    ];
    let i = 0;
    while(i < args.length){
        addCodeArg(code, args[i]);
        code.push(strs[++i]);
    }
    return new _Code(code);
}
exports._ = _;
const plus = new _Code("+");
function str(strs) {
    for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        args[_key - 1] = arguments[_key];
    }
    const expr = [
        safeStringify(strs[0])
    ];
    let i = 0;
    while(i < args.length){
        expr.push(plus);
        addCodeArg(expr, args[i]);
        expr.push(plus, safeStringify(strs[++i]));
    }
    optimize(expr);
    return new _Code(expr);
}
exports.str = str;
function addCodeArg(code, arg) {
    if (arg instanceof _Code) code.push(...arg._items);
    else if (arg instanceof Name) code.push(arg);
    else code.push(interpolate(arg));
}
exports.addCodeArg = addCodeArg;
function optimize(expr) {
    let i = 1;
    while(i < expr.length - 1){
        if (expr[i] === plus) {
            const res = mergeExprItems(expr[i - 1], expr[i + 1]);
            if (res !== undefined) {
                expr.splice(i - 1, 3, res);
                continue;
            }
            expr[i++] = "+";
        }
        i++;
    }
}
function mergeExprItems(a, b) {
    if (b === '""') return a;
    if (a === '""') return b;
    if (typeof a == "string") {
        if (b instanceof Name || a[a.length - 1] !== '"') return;
        if (typeof b != "string") return "".concat(a.slice(0, -1)).concat(b, '"');
        if (b[0] === '"') return a.slice(0, -1) + b.slice(1);
        return;
    }
    if (typeof b == "string" && b[0] === '"' && !(a instanceof Name)) return '"'.concat(a).concat(b.slice(1));
    return;
}
function strConcat(c1, c2) {
    return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str(_templateObject(), c1, c2);
}
exports.strConcat = strConcat;
// TODO do not allow arrays here
function interpolate(x) {
    return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
}
function stringify(x) {
    return new _Code(safeStringify(x));
}
exports.stringify = stringify;
function safeStringify(x) {
    return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
exports.safeStringify = safeStringify;
function getProperty(key) {
    return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(".".concat(key)) : _(_templateObject1(), key);
}
exports.getProperty = getProperty;
//Does best effort to format the name properly
function getEsmExportName(key) {
    if (typeof key == "string" && exports.IDENTIFIER.test(key)) {
        return new _Code("".concat(key));
    }
    throw new Error("CodeGen: invalid export name: ".concat(key, ", use explicit $id name mapping"));
}
exports.getEsmExportName = getEsmExportName;
function regexpCode(rx) {
    return new _Code(rx.toString());
}
exports.regexpCode = regexpCode; //# sourceMappingURL=code.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/scope.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        ".",
        "[",
        "]"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "\n"
    ], [
        "\\n"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "",
        "",
        ""
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        "",
        "",
        " ",
        " = ",
        ";",
        ""
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = _tagged_template_literal._([
        "",
        "",
        "",
        ""
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
const code_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/code.js [app-client] (ecmascript)");
class ValueError extends Error {
    constructor(name){
        super('CodeGen: "code" for '.concat(name, " not defined"));
        this.value = name.value;
    }
}
var UsedValueState;
(function(UsedValueState) {
    UsedValueState[UsedValueState["Started"] = 0] = "Started";
    UsedValueState[UsedValueState["Completed"] = 1] = "Completed";
})(UsedValueState || (exports.UsedValueState = UsedValueState = {}));
exports.varKinds = {
    const: new code_1.Name("const"),
    let: new code_1.Name("let"),
    var: new code_1.Name("var")
};
class Scope {
    toName(nameOrPrefix) {
        return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
    }
    name(prefix) {
        return new code_1.Name(this._newName(prefix));
    }
    _newName(prefix) {
        const ng = this._names[prefix] || this._nameGroup(prefix);
        return "".concat(prefix).concat(ng.index++);
    }
    _nameGroup(prefix) {
        var _a, _b;
        if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || this._prefixes && !this._prefixes.has(prefix)) {
            throw new Error('CodeGen: prefix "'.concat(prefix, '" is not allowed in this scope'));
        }
        return this._names[prefix] = {
            prefix,
            index: 0
        };
    }
    constructor({ prefixes, parent } = {}){
        this._names = {};
        this._prefixes = prefixes;
        this._parent = parent;
    }
}
exports.Scope = Scope;
class ValueScopeName extends code_1.Name {
    setValue(value, param) {
        let { property, itemIndex } = param;
        this.value = value;
        this.scopePath = (0, code_1._)(_templateObject(), new code_1.Name(property), itemIndex);
    }
    constructor(prefix, nameStr){
        super(nameStr);
        this.prefix = prefix;
    }
}
exports.ValueScopeName = ValueScopeName;
const line = (0, code_1._)(_templateObject1());
class ValueScope extends Scope {
    get() {
        return this._scope;
    }
    name(prefix) {
        return new ValueScopeName(prefix, this._newName(prefix));
    }
    value(nameOrPrefix, value) {
        var _a;
        if (value.ref === undefined) throw new Error("CodeGen: ref must be passed in value");
        const name = this.toName(nameOrPrefix);
        const { prefix } = name;
        const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
        let vs = this._values[prefix];
        if (vs) {
            const _name = vs.get(valueKey);
            if (_name) return _name;
        } else {
            vs = this._values[prefix] = new Map();
        }
        vs.set(valueKey, name);
        const s = this._scope[prefix] || (this._scope[prefix] = []);
        const itemIndex = s.length;
        s[itemIndex] = value.ref;
        name.setValue(value, {
            property: prefix,
            itemIndex
        });
        return name;
    }
    getValue(prefix, keyOrRef) {
        const vs = this._values[prefix];
        if (!vs) return;
        return vs.get(keyOrRef);
    }
    scopeRefs(scopeName) {
        let values = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this._values;
        return this._reduceValues(values, (name)=>{
            if (name.scopePath === undefined) throw new Error('CodeGen: name "'.concat(name, '" has no value'));
            return (0, code_1._)(_templateObject2(), scopeName, name.scopePath);
        });
    }
    scopeCode() {
        let values = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this._values, usedValues = arguments.length > 1 ? arguments[1] : void 0, getCode = arguments.length > 2 ? arguments[2] : void 0;
        return this._reduceValues(values, (name)=>{
            if (name.value === undefined) throw new Error('CodeGen: name "'.concat(name, '" has no value'));
            return name.value.code;
        }, usedValues, getCode);
    }
    _reduceValues(values, valueCode) {
        let usedValues = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, getCode = arguments.length > 3 ? arguments[3] : void 0;
        let code = code_1.nil;
        for(const prefix in values){
            const vs = values[prefix];
            if (!vs) continue;
            const nameSet = usedValues[prefix] = usedValues[prefix] || new Map();
            vs.forEach((name)=>{
                if (nameSet.has(name)) return;
                nameSet.set(name, UsedValueState.Started);
                let c = valueCode(name);
                if (c) {
                    const def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
                    code = (0, code_1._)(_templateObject3(), code, def, name, c, this.opts._n);
                } else if (c = getCode === null || getCode === void 0 ? void 0 : getCode(name)) {
                    code = (0, code_1._)(_templateObject4(), code, c, this.opts._n);
                } else {
                    throw new ValueError(name);
                }
                nameSet.set(name, UsedValueState.Completed);
            });
        }
        return code;
    }
    constructor(opts){
        super(opts);
        this._values = {};
        this._scope = opts.scope;
        this.opts = {
            ...opts,
            _n: opts.lines ? line : code_1.nil
        };
    }
}
exports.ValueScope = ValueScope; //# sourceMappingURL=scope.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "",
        ".length"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "",
        "[",
        "]"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "Object.keys(",
        ")"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        "!",
        ""
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = _tagged_template_literal._([
        "",
        " ",
        " ",
        ""
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
function _templateObject5() {
    const data = _tagged_template_literal._([
        "(",
        ")"
    ]);
    _templateObject5 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
const code_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/code.js [app-client] (ecmascript)");
const scope_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/scope.js [app-client] (ecmascript)");
var code_2 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/code.js [app-client] (ecmascript)");
Object.defineProperty(exports, "_", {
    enumerable: true,
    get: function() {
        return code_2._;
    }
});
Object.defineProperty(exports, "str", {
    enumerable: true,
    get: function() {
        return code_2.str;
    }
});
Object.defineProperty(exports, "strConcat", {
    enumerable: true,
    get: function() {
        return code_2.strConcat;
    }
});
Object.defineProperty(exports, "nil", {
    enumerable: true,
    get: function() {
        return code_2.nil;
    }
});
Object.defineProperty(exports, "getProperty", {
    enumerable: true,
    get: function() {
        return code_2.getProperty;
    }
});
Object.defineProperty(exports, "stringify", {
    enumerable: true,
    get: function() {
        return code_2.stringify;
    }
});
Object.defineProperty(exports, "regexpCode", {
    enumerable: true,
    get: function() {
        return code_2.regexpCode;
    }
});
Object.defineProperty(exports, "Name", {
    enumerable: true,
    get: function() {
        return code_2.Name;
    }
});
var scope_2 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/scope.js [app-client] (ecmascript)");
Object.defineProperty(exports, "Scope", {
    enumerable: true,
    get: function() {
        return scope_2.Scope;
    }
});
Object.defineProperty(exports, "ValueScope", {
    enumerable: true,
    get: function() {
        return scope_2.ValueScope;
    }
});
Object.defineProperty(exports, "ValueScopeName", {
    enumerable: true,
    get: function() {
        return scope_2.ValueScopeName;
    }
});
Object.defineProperty(exports, "varKinds", {
    enumerable: true,
    get: function() {
        return scope_2.varKinds;
    }
});
exports.operators = {
    GT: new code_1._Code(">"),
    GTE: new code_1._Code(">="),
    LT: new code_1._Code("<"),
    LTE: new code_1._Code("<="),
    EQ: new code_1._Code("==="),
    NEQ: new code_1._Code("!=="),
    NOT: new code_1._Code("!"),
    OR: new code_1._Code("||"),
    AND: new code_1._Code("&&"),
    ADD: new code_1._Code("+")
};
class Node {
    optimizeNodes() {
        return this;
    }
    optimizeNames(_names, _constants) {
        return this;
    }
}
class Def extends Node {
    render(param) {
        let { es5, _n } = param;
        const varKind = es5 ? scope_1.varKinds.var : this.varKind;
        const rhs = this.rhs === undefined ? "" : " = ".concat(this.rhs);
        return "".concat(varKind, " ").concat(this.name).concat(rhs, ";") + _n;
    }
    optimizeNames(names, constants) {
        if (!names[this.name.str]) return;
        if (this.rhs) this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
    }
    get names() {
        return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
    }
    constructor(varKind, name, rhs){
        super();
        this.varKind = varKind;
        this.name = name;
        this.rhs = rhs;
    }
}
class Assign extends Node {
    render(param) {
        let { _n } = param;
        return "".concat(this.lhs, " = ").concat(this.rhs, ";") + _n;
    }
    optimizeNames(names, constants) {
        if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects) return;
        this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
    }
    get names() {
        const names = this.lhs instanceof code_1.Name ? {} : {
            ...this.lhs.names
        };
        return addExprNames(names, this.rhs);
    }
    constructor(lhs, rhs, sideEffects){
        super();
        this.lhs = lhs;
        this.rhs = rhs;
        this.sideEffects = sideEffects;
    }
}
class AssignOp extends Assign {
    render(param) {
        let { _n } = param;
        return "".concat(this.lhs, " ").concat(this.op, "= ").concat(this.rhs, ";") + _n;
    }
    constructor(lhs, op, rhs, sideEffects){
        super(lhs, rhs, sideEffects);
        this.op = op;
    }
}
class Label extends Node {
    render(param) {
        let { _n } = param;
        return "".concat(this.label, ":") + _n;
    }
    constructor(label){
        super();
        this.label = label;
        this.names = {};
    }
}
class Break extends Node {
    render(param) {
        let { _n } = param;
        const label = this.label ? " ".concat(this.label) : "";
        return "break".concat(label, ";") + _n;
    }
    constructor(label){
        super();
        this.label = label;
        this.names = {};
    }
}
class Throw extends Node {
    render(param) {
        let { _n } = param;
        return "throw ".concat(this.error, ";") + _n;
    }
    get names() {
        return this.error.names;
    }
    constructor(error){
        super();
        this.error = error;
    }
}
class AnyCode extends Node {
    render(param) {
        let { _n } = param;
        return "".concat(this.code, ";") + _n;
    }
    optimizeNodes() {
        return "".concat(this.code) ? this : undefined;
    }
    optimizeNames(names, constants) {
        this.code = optimizeExpr(this.code, names, constants);
        return this;
    }
    get names() {
        return this.code instanceof code_1._CodeOrName ? this.code.names : {};
    }
    constructor(code){
        super();
        this.code = code;
    }
}
class ParentNode extends Node {
    render(opts) {
        return this.nodes.reduce((code, n)=>code + n.render(opts), "");
    }
    optimizeNodes() {
        const { nodes } = this;
        let i = nodes.length;
        while(i--){
            const n = nodes[i].optimizeNodes();
            if (Array.isArray(n)) nodes.splice(i, 1, ...n);
            else if (n) nodes[i] = n;
            else nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : undefined;
    }
    optimizeNames(names, constants) {
        const { nodes } = this;
        let i = nodes.length;
        while(i--){
            // iterating backwards improves 1-pass optimization
            const n = nodes[i];
            if (n.optimizeNames(names, constants)) continue;
            subtractNames(names, n.names);
            nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : undefined;
    }
    get names() {
        return this.nodes.reduce((names, n)=>addNames(names, n.names), {});
    }
    constructor(nodes = []){
        super();
        this.nodes = nodes;
    }
}
class BlockNode extends ParentNode {
    render(opts) {
        return "{" + opts._n + super.render(opts) + "}" + opts._n;
    }
}
class Root extends ParentNode {
}
class Else extends BlockNode {
}
Else.kind = "else";
class If extends BlockNode {
    render(opts) {
        let code = "if(".concat(this.condition, ")") + super.render(opts);
        if (this.else) code += "else " + this.else.render(opts);
        return code;
    }
    optimizeNodes() {
        super.optimizeNodes();
        const cond = this.condition;
        if (cond === true) return this.nodes; // else is ignored here
        let e = this.else;
        if (e) {
            const ns = e.optimizeNodes();
            e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
        }
        if (e) {
            if (cond === false) return e instanceof If ? e : e.nodes;
            if (this.nodes.length) return this;
            return new If(not(cond), e instanceof If ? [
                e
            ] : e.nodes);
        }
        if (cond === false || !this.nodes.length) return undefined;
        return this;
    }
    optimizeNames(names, constants) {
        var _a;
        this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        if (!(super.optimizeNames(names, constants) || this.else)) return;
        this.condition = optimizeExpr(this.condition, names, constants);
        return this;
    }
    get names() {
        const names = super.names;
        addExprNames(names, this.condition);
        if (this.else) addNames(names, this.else.names);
        return names;
    }
    constructor(condition, nodes){
        super(nodes);
        this.condition = condition;
    }
}
If.kind = "if";
class For extends BlockNode {
}
For.kind = "for";
class ForLoop extends For {
    render(opts) {
        return "for(".concat(this.iteration, ")") + super.render(opts);
    }
    optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants)) return;
        this.iteration = optimizeExpr(this.iteration, names, constants);
        return this;
    }
    get names() {
        return addNames(super.names, this.iteration.names);
    }
    constructor(iteration){
        super();
        this.iteration = iteration;
    }
}
class ForRange extends For {
    render(opts) {
        const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
        const { name, from, to } = this;
        return "for(".concat(varKind, " ").concat(name, "=").concat(from, "; ").concat(name, "<").concat(to, "; ").concat(name, "++)") + super.render(opts);
    }
    get names() {
        const names = addExprNames(super.names, this.from);
        return addExprNames(names, this.to);
    }
    constructor(varKind, name, from, to){
        super();
        this.varKind = varKind;
        this.name = name;
        this.from = from;
        this.to = to;
    }
}
class ForIter extends For {
    render(opts) {
        return "for(".concat(this.varKind, " ").concat(this.name, " ").concat(this.loop, " ").concat(this.iterable, ")") + super.render(opts);
    }
    optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants)) return;
        this.iterable = optimizeExpr(this.iterable, names, constants);
        return this;
    }
    get names() {
        return addNames(super.names, this.iterable.names);
    }
    constructor(loop, varKind, name, iterable){
        super();
        this.loop = loop;
        this.varKind = varKind;
        this.name = name;
        this.iterable = iterable;
    }
}
class Func extends BlockNode {
    render(opts) {
        const _async = this.async ? "async " : "";
        return "".concat(_async, "function ").concat(this.name, "(").concat(this.args, ")") + super.render(opts);
    }
    constructor(name, args, async){
        super();
        this.name = name;
        this.args = args;
        this.async = async;
    }
}
Func.kind = "func";
class Return extends ParentNode {
    render(opts) {
        return "return " + super.render(opts);
    }
}
Return.kind = "return";
class Try extends BlockNode {
    render(opts) {
        let code = "try" + super.render(opts);
        if (this.catch) code += this.catch.render(opts);
        if (this.finally) code += this.finally.render(opts);
        return code;
    }
    optimizeNodes() {
        var _a, _b;
        super.optimizeNodes();
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
        return this;
    }
    optimizeNames(names, constants) {
        var _a, _b;
        super.optimizeNames(names, constants);
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants);
        return this;
    }
    get names() {
        const names = super.names;
        if (this.catch) addNames(names, this.catch.names);
        if (this.finally) addNames(names, this.finally.names);
        return names;
    }
}
class Catch extends BlockNode {
    render(opts) {
        return "catch(".concat(this.error, ")") + super.render(opts);
    }
    constructor(error){
        super();
        this.error = error;
    }
}
Catch.kind = "catch";
class Finally extends BlockNode {
    render(opts) {
        return "finally" + super.render(opts);
    }
}
Finally.kind = "finally";
class CodeGen {
    toString() {
        return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(prefix) {
        return this._scope.name(prefix);
    }
    // reserves unique name in the external scope
    scopeName(prefix) {
        return this._extScope.name(prefix);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(prefixOrName, value) {
        const name = this._extScope.value(prefixOrName, value);
        const vs = this._values[name.prefix] || (this._values[name.prefix] = new Set());
        vs.add(name);
        return name;
    }
    getScopeValue(prefix, keyOrRef) {
        return this._extScope.getValue(prefix, keyOrRef);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(scopeName) {
        return this._extScope.scopeRefs(scopeName, this._values);
    }
    scopeCode() {
        return this._extScope.scopeCode(this._values);
    }
    _def(varKind, nameOrPrefix, rhs, constant) {
        const name = this._scope.toName(nameOrPrefix);
        if (rhs !== undefined && constant) this._constants[name.str] = rhs;
        this._leafNode(new Def(varKind, name, rhs));
        return name;
    }
    // `const` declaration (`var` in es5 mode)
    const(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
    }
    // `var` declaration with optional assignment
    var(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
    }
    // assignment code
    assign(lhs, rhs, sideEffects) {
        return this._leafNode(new Assign(lhs, rhs, sideEffects));
    }
    // `+=` code
    add(lhs, rhs) {
        return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
    }
    // appends passed SafeExpr to code or executes Block
    code(c) {
        if (typeof c == "function") c();
        else if (c !== code_1.nil) this._leafNode(new AnyCode(c));
        return this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object() {
        for(var _len = arguments.length, keyValues = new Array(_len), _key = 0; _key < _len; _key++){
            keyValues[_key] = arguments[_key];
        }
        const code = [
            "{"
        ];
        for (const [key, value] of keyValues){
            if (code.length > 1) code.push(",");
            code.push(key);
            if (key !== value || this.opts.es5) {
                code.push(":");
                (0, code_1.addCodeArg)(code, value);
            }
        }
        code.push("}");
        return new code_1._Code(code);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(condition, thenBody, elseBody) {
        this._blockNode(new If(condition));
        if (thenBody && elseBody) {
            this.code(thenBody).else().code(elseBody).endIf();
        } else if (thenBody) {
            this.code(thenBody).endIf();
        } else if (elseBody) {
            throw new Error('CodeGen: "else" body without "then" body');
        }
        return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(condition) {
        return this._elseNode(new If(condition));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
        return this._elseNode(new Else());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
        return this._endBlockNode(If, Else);
    }
    _for(node, forBody) {
        this._blockNode(node);
        if (forBody) this.code(forBody).endFor();
        return this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(iteration, forBody) {
        return this._for(new ForLoop(iteration), forBody);
    }
    // `for` statement for a range of values
    forRange(nameOrPrefix, from, to, forBody) {
        let varKind = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let;
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForRange(varKind, name, from, to), ()=>forBody(name));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(nameOrPrefix, iterable, forBody) {
        let varKind = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : scope_1.varKinds.const;
        const name = this._scope.toName(nameOrPrefix);
        if (this.opts.es5) {
            const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
            return this.forRange("_i", 0, (0, code_1._)(_templateObject(), arr), (i)=>{
                this.var(name, (0, code_1._)(_templateObject1(), arr, i));
                forBody(name);
            });
        }
        return this._for(new ForIter("of", varKind, name, iterable), ()=>forBody(name));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(nameOrPrefix, obj, forBody) {
        let varKind = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const;
        if (this.opts.ownProperties) {
            return this.forOf(nameOrPrefix, (0, code_1._)(_templateObject2(), obj), forBody);
        }
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForIter("in", varKind, name, obj), ()=>forBody(name));
    }
    // end `for` loop
    endFor() {
        return this._endBlockNode(For);
    }
    // `label` statement
    label(label) {
        return this._leafNode(new Label(label));
    }
    // `break` statement
    break(label) {
        return this._leafNode(new Break(label));
    }
    // `return` statement
    return(value) {
        const node = new Return();
        this._blockNode(node);
        this.code(value);
        if (node.nodes.length !== 1) throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(Return);
    }
    // `try` statement
    try(tryBody, catchCode, finallyCode) {
        if (!catchCode && !finallyCode) throw new Error('CodeGen: "try" without "catch" and "finally"');
        const node = new Try();
        this._blockNode(node);
        this.code(tryBody);
        if (catchCode) {
            const error = this.name("e");
            this._currNode = node.catch = new Catch(error);
            catchCode(error);
        }
        if (finallyCode) {
            this._currNode = node.finally = new Finally();
            this.code(finallyCode);
        }
        return this._endBlockNode(Catch, Finally);
    }
    // `throw` statement
    throw(error) {
        return this._leafNode(new Throw(error));
    }
    // start self-balancing block
    block(body, nodeCount) {
        this._blockStarts.push(this._nodes.length);
        if (body) this.code(body).endBlock(nodeCount);
        return this;
    }
    // end the current self-balancing block
    endBlock(nodeCount) {
        const len = this._blockStarts.pop();
        if (len === undefined) throw new Error("CodeGen: not in self-balancing block");
        const toClose = this._nodes.length - len;
        if (toClose < 0 || nodeCount !== undefined && toClose !== nodeCount) {
            throw new Error("CodeGen: wrong number of nodes: ".concat(toClose, " vs ").concat(nodeCount, " expected"));
        }
        this._nodes.length = len;
        return this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(name) {
        let args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : code_1.nil, async = arguments.length > 2 ? arguments[2] : void 0, funcBody = arguments.length > 3 ? arguments[3] : void 0;
        this._blockNode(new Func(name, args, async));
        if (funcBody) this.code(funcBody).endFunc();
        return this;
    }
    // end function definition
    endFunc() {
        return this._endBlockNode(Func);
    }
    optimize() {
        let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
        while(n-- > 0){
            this._root.optimizeNodes();
            this._root.optimizeNames(this._root.names, this._constants);
        }
    }
    _leafNode(node) {
        this._currNode.nodes.push(node);
        return this;
    }
    _blockNode(node) {
        this._currNode.nodes.push(node);
        this._nodes.push(node);
    }
    _endBlockNode(N1, N2) {
        const n = this._currNode;
        if (n instanceof N1 || N2 && n instanceof N2) {
            this._nodes.pop();
            return this;
        }
        throw new Error('CodeGen: not in block "'.concat(N2 ? "".concat(N1.kind, "/").concat(N2.kind) : N1.kind, '"'));
    }
    _elseNode(node) {
        const n = this._currNode;
        if (!(n instanceof If)) {
            throw new Error('CodeGen: "else" without "if"');
        }
        this._currNode = n.else = node;
        return this;
    }
    get _root() {
        return this._nodes[0];
    }
    get _currNode() {
        const ns = this._nodes;
        return ns[ns.length - 1];
    }
    set _currNode(node) {
        const ns = this._nodes;
        ns[ns.length - 1] = node;
    }
    constructor(extScope, opts = {}){
        this._values = {};
        this._blockStarts = [];
        this._constants = {};
        this.opts = {
            ...opts,
            _n: opts.lines ? "\n" : ""
        };
        this._extScope = extScope;
        this._scope = new scope_1.Scope({
            parent: extScope
        });
        this._nodes = [
            new Root()
        ];
    }
}
exports.CodeGen = CodeGen;
function addNames(names, from) {
    for(const n in from)names[n] = (names[n] || 0) + (from[n] || 0);
    return names;
}
function addExprNames(names, from) {
    return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
}
function optimizeExpr(expr, names, constants) {
    if (expr instanceof code_1.Name) return replaceName(expr);
    if (!canOptimize(expr)) return expr;
    return new code_1._Code(expr._items.reduce((items, c)=>{
        if (c instanceof code_1.Name) c = replaceName(c);
        if (c instanceof code_1._Code) items.push(...c._items);
        else items.push(c);
        return items;
    }, []));
    //TURBOPACK unreachable
    ;
    function replaceName(n) {
        const c = constants[n.str];
        if (c === undefined || names[n.str] !== 1) return n;
        delete names[n.str];
        return c;
    }
    function canOptimize(e) {
        return e instanceof code_1._Code && e._items.some((c)=>c instanceof code_1.Name && names[c.str] === 1 && constants[c.str] !== undefined);
    }
}
function subtractNames(names, from) {
    for(const n in from)names[n] = (names[n] || 0) - (from[n] || 0);
}
function not(x) {
    return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._)(_templateObject3(), par(x));
}
exports.not = not;
const andCode = mappend(exports.operators.AND);
// boolean AND (&&) expression with the passed arguments
function and() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
        args[_key] = arguments[_key];
    }
    return args.reduce(andCode);
}
exports.and = and;
const orCode = mappend(exports.operators.OR);
// boolean OR (||) expression with the passed arguments
function or() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
        args[_key] = arguments[_key];
    }
    return args.reduce(orCode);
}
exports.or = or;
function mappend(op) {
    return (x, y)=>x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._)(_templateObject4(), par(x), op, par(y));
}
function par(x) {
    return x instanceof code_1.Name ? x : (0, code_1._)(_templateObject5(), x);
} //# sourceMappingURL=index.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "",
        ""
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "",
        "",
        "",
        ""
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "",
        " !== true && ",
        " !== undefined"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        "",
        " === true"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = _tagged_template_literal._([
        "",
        " || {}"
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
function _templateObject5() {
    const data = _tagged_template_literal._([
        "Object.assign(",
        ", ",
        ")"
    ]);
    _templateObject5 = function() {
        return data;
    };
    return data;
}
function _templateObject6() {
    const data = _tagged_template_literal._([
        "",
        " !== true"
    ]);
    _templateObject6 = function() {
        return data;
    };
    return data;
}
function _templateObject7() {
    const data = _tagged_template_literal._([
        "",
        " || {}"
    ]);
    _templateObject7 = function() {
        return data;
    };
    return data;
}
function _templateObject8() {
    const data = _tagged_template_literal._([
        "",
        " !== true && ",
        " !== undefined"
    ]);
    _templateObject8 = function() {
        return data;
    };
    return data;
}
function _templateObject9() {
    const data = _tagged_template_literal._([
        "",
        " === true ? true : ",
        " > ",
        " ? ",
        " : ",
        ""
    ]);
    _templateObject9 = function() {
        return data;
    };
    return data;
}
function _templateObject10() {
    const data = _tagged_template_literal._([
        "",
        " !== true"
    ]);
    _templateObject10 = function() {
        return data;
    };
    return data;
}
function _templateObject11() {
    const data = _tagged_template_literal._([
        "",
        " > ",
        " ? ",
        " : ",
        ""
    ]);
    _templateObject11 = function() {
        return data;
    };
    return data;
}
function _templateObject12() {
    const data = _tagged_template_literal._([
        "{}"
    ]);
    _templateObject12 = function() {
        return data;
    };
    return data;
}
function _templateObject13() {
    const data = _tagged_template_literal._([
        "",
        "",
        ""
    ]);
    _templateObject13 = function() {
        return data;
    };
    return data;
}
function _templateObject14() {
    const data = _tagged_template_literal._([
        '"[" + ',
        ' + "]"'
    ]);
    _templateObject14 = function() {
        return data;
    };
    return data;
}
function _templateObject15() {
    const data = _tagged_template_literal._([
        '"[\'" + ',
        ' + "\']"'
    ]);
    _templateObject15 = function() {
        return data;
    };
    return data;
}
function _templateObject16() {
    const data = _tagged_template_literal._([
        '"/" + ',
        ""
    ]);
    _templateObject16 = function() {
        return data;
    };
    return data;
}
function _templateObject17() {
    const data = _tagged_template_literal._([
        '"/" + ',
        '.replace(/~/g, "~0").replace(/\\//g, "~1")'
    ], [
        '"/" + ',
        '.replace(/~/g, "~0").replace(/\\\\//g, "~1")'
    ]);
    _templateObject17 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const code_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/code.js [app-client] (ecmascript)");
// TODO refactor to use Set
function toHash(arr) {
    const hash = {};
    for (const item of arr)hash[item] = true;
    return hash;
}
exports.toHash = toHash;
function alwaysValidSchema(it, schema) {
    if (typeof schema == "boolean") return schema;
    if (Object.keys(schema).length === 0) return true;
    checkUnknownRules(it, schema);
    return !schemaHasRules(schema, it.self.RULES.all);
}
exports.alwaysValidSchema = alwaysValidSchema;
function checkUnknownRules(it) {
    let schema = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : it.schema;
    const { opts, self } = it;
    if (!opts.strictSchema) return;
    if (typeof schema === "boolean") return;
    const rules = self.RULES.keywords;
    for(const key in schema){
        if (!rules[key]) checkStrictMode(it, 'unknown keyword: "'.concat(key, '"'));
    }
}
exports.checkUnknownRules = checkUnknownRules;
function schemaHasRules(schema, rules) {
    if (typeof schema == "boolean") return !schema;
    for(const key in schema)if (rules[key]) return true;
    return false;
}
exports.schemaHasRules = schemaHasRules;
function schemaHasRulesButRef(schema, RULES) {
    if (typeof schema == "boolean") return !schema;
    for(const key in schema)if (key !== "$ref" && RULES.all[key]) return true;
    return false;
}
exports.schemaHasRulesButRef = schemaHasRulesButRef;
function schemaRefOrVal(param, schema, keyword, $data) {
    let { topSchemaRef, schemaPath } = param;
    if (!$data) {
        if (typeof schema == "number" || typeof schema == "boolean") return schema;
        if (typeof schema == "string") return (0, codegen_1._)(_templateObject(), schema);
    }
    return (0, codegen_1._)(_templateObject1(), topSchemaRef, schemaPath, (0, codegen_1.getProperty)(keyword));
}
exports.schemaRefOrVal = schemaRefOrVal;
function unescapeFragment(str) {
    return unescapeJsonPointer(decodeURIComponent(str));
}
exports.unescapeFragment = unescapeFragment;
function escapeFragment(str) {
    return encodeURIComponent(escapeJsonPointer(str));
}
exports.escapeFragment = escapeFragment;
function escapeJsonPointer(str) {
    if (typeof str == "number") return "".concat(str);
    return str.replace(/~/g, "~0").replace(/\//g, "~1");
}
exports.escapeJsonPointer = escapeJsonPointer;
function unescapeJsonPointer(str) {
    return str.replace(/~1/g, "/").replace(/~0/g, "~");
}
exports.unescapeJsonPointer = unescapeJsonPointer;
function eachItem(xs, f) {
    if (Array.isArray(xs)) {
        for (const x of xs)f(x);
    } else {
        f(xs);
    }
}
exports.eachItem = eachItem;
function makeMergeEvaluated(param) {
    let { mergeNames, mergeToName, mergeValues, resultToName } = param;
    return (gen, from, to, toName)=>{
        const res = to === undefined ? from : to instanceof codegen_1.Name ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_1.Name ? (mergeToName(gen, to, from), from) : mergeValues(from, to);
        return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
    };
}
exports.mergeEvaluated = {
    props: makeMergeEvaluated({
        mergeNames: (gen, from, to)=>gen.if((0, codegen_1._)(_templateObject2(), to, from), ()=>{
                gen.if((0, codegen_1._)(_templateObject3(), from), ()=>gen.assign(to, true), ()=>gen.assign(to, (0, codegen_1._)(_templateObject4(), to)).code((0, codegen_1._)(_templateObject5(), to, from)));
            }),
        mergeToName: (gen, from, to)=>gen.if((0, codegen_1._)(_templateObject6(), to), ()=>{
                if (from === true) {
                    gen.assign(to, true);
                } else {
                    gen.assign(to, (0, codegen_1._)(_templateObject7(), to));
                    setEvaluated(gen, to, from);
                }
            }),
        mergeValues: (from, to)=>from === true ? true : {
                ...from,
                ...to
            },
        resultToName: evaluatedPropsToName
    }),
    items: makeMergeEvaluated({
        mergeNames: (gen, from, to)=>gen.if((0, codegen_1._)(_templateObject8(), to, from), ()=>gen.assign(to, (0, codegen_1._)(_templateObject9(), from, to, from, to, from))),
        mergeToName: (gen, from, to)=>gen.if((0, codegen_1._)(_templateObject10(), to), ()=>gen.assign(to, from === true ? true : (0, codegen_1._)(_templateObject11(), to, from, to, from))),
        mergeValues: (from, to)=>from === true ? true : Math.max(from, to),
        resultToName: (gen, items)=>gen.var("items", items)
    })
};
function evaluatedPropsToName(gen, ps) {
    if (ps === true) return gen.var("props", true);
    const props = gen.var("props", (0, codegen_1._)(_templateObject12()));
    if (ps !== undefined) setEvaluated(gen, props, ps);
    return props;
}
exports.evaluatedPropsToName = evaluatedPropsToName;
function setEvaluated(gen, props, ps) {
    Object.keys(ps).forEach((p)=>gen.assign((0, codegen_1._)(_templateObject13(), props, (0, codegen_1.getProperty)(p)), true));
}
exports.setEvaluated = setEvaluated;
const snippets = {};
function useFunc(gen, f) {
    return gen.scopeValue("func", {
        ref: f,
        code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code))
    });
}
exports.useFunc = useFunc;
var Type;
(function(Type) {
    Type[Type["Num"] = 0] = "Num";
    Type[Type["Str"] = 1] = "Str";
})(Type || (exports.Type = Type = {}));
function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
    // let path
    if (dataProp instanceof codegen_1.Name) {
        const isNumber = dataPropType === Type.Num;
        return jsPropertySyntax ? isNumber ? (0, codegen_1._)(_templateObject14(), dataProp) : (0, codegen_1._)(_templateObject15(), dataProp) : isNumber ? (0, codegen_1._)(_templateObject16(), dataProp) : (0, codegen_1._)(_templateObject17(), dataProp); // TODO maybe use global escapePointer
    }
    return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
}
exports.getErrorPath = getErrorPath;
function checkStrictMode(it, msg) {
    let mode = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : it.opts.strictSchema;
    if (!mode) return;
    msg = "strict mode: ".concat(msg);
    if (mode === true) throw new Error(msg);
    it.self.logger.warn(msg);
}
exports.checkStrictMode = checkStrictMode; //# sourceMappingURL=util.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/names.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const names = {
    // validation function arguments
    data: new codegen_1.Name("data"),
    // args passed from referencing schema
    valCxt: new codegen_1.Name("valCxt"),
    instancePath: new codegen_1.Name("instancePath"),
    parentData: new codegen_1.Name("parentData"),
    parentDataProperty: new codegen_1.Name("parentDataProperty"),
    rootData: new codegen_1.Name("rootData"),
    dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
    // function scoped variables
    vErrors: new codegen_1.Name("vErrors"),
    errors: new codegen_1.Name("errors"),
    this: new codegen_1.Name("this"),
    // "globals"
    self: new codegen_1.Name("self"),
    scope: new codegen_1.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new codegen_1.Name("json"),
    jsonPos: new codegen_1.Name("jsonPos"),
    jsonLen: new codegen_1.Name("jsonLen"),
    jsonPart: new codegen_1.Name("jsonPart")
};
exports.default = names; //# sourceMappingURL=names.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/errors.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        'must pass "',
        '" keyword validation'
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        '"',
        '" keyword must be ',
        " ($data)"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        '"',
        '" keyword is invalid ($data)'
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        "[",
        "]"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = _tagged_template_literal._([
        "",
        " !== null"
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
function _templateObject5() {
    const data = _tagged_template_literal._([
        "",
        ".length"
    ]);
    _templateObject5 = function() {
        return data;
    };
    return data;
}
function _templateObject6() {
    const data = _tagged_template_literal._([
        "",
        "[",
        "]"
    ]);
    _templateObject6 = function() {
        return data;
    };
    return data;
}
function _templateObject7() {
    const data = _tagged_template_literal._([
        "",
        ".instancePath === undefined"
    ]);
    _templateObject7 = function() {
        return data;
    };
    return data;
}
function _templateObject8() {
    const data = _tagged_template_literal._([
        "",
        ".instancePath"
    ]);
    _templateObject8 = function() {
        return data;
    };
    return data;
}
function _templateObject9() {
    const data = _tagged_template_literal._([
        "",
        ".schemaPath"
    ]);
    _templateObject9 = function() {
        return data;
    };
    return data;
}
function _templateObject10() {
    const data = _tagged_template_literal._([
        "",
        "/",
        ""
    ]);
    _templateObject10 = function() {
        return data;
    };
    return data;
}
function _templateObject11() {
    const data = _tagged_template_literal._([
        "",
        ".schema"
    ]);
    _templateObject11 = function() {
        return data;
    };
    return data;
}
function _templateObject12() {
    const data = _tagged_template_literal._([
        "",
        ".data"
    ]);
    _templateObject12 = function() {
        return data;
    };
    return data;
}
function _templateObject13() {
    const data = _tagged_template_literal._([
        "",
        " === null"
    ]);
    _templateObject13 = function() {
        return data;
    };
    return data;
}
function _templateObject14() {
    const data = _tagged_template_literal._([
        "[",
        "]"
    ]);
    _templateObject14 = function() {
        return data;
    };
    return data;
}
function _templateObject15() {
    const data = _tagged_template_literal._([
        "",
        ".push(",
        ")"
    ]);
    _templateObject15 = function() {
        return data;
    };
    return data;
}
function _templateObject16() {
    const data = _tagged_template_literal._([
        "",
        "++"
    ]);
    _templateObject16 = function() {
        return data;
    };
    return data;
}
function _templateObject17() {
    const data = _tagged_template_literal._([
        "new ",
        "(",
        ")"
    ]);
    _templateObject17 = function() {
        return data;
    };
    return data;
}
function _templateObject18() {
    const data = _tagged_template_literal._([
        "",
        ".errors"
    ]);
    _templateObject18 = function() {
        return data;
    };
    return data;
}
function _templateObject19() {
    const data = _tagged_template_literal._([
        "{}"
    ]);
    _templateObject19 = function() {
        return data;
    };
    return data;
}
function _templateObject20() {
    const data = _tagged_template_literal._([
        "",
        "",
        ""
    ]);
    _templateObject20 = function() {
        return data;
    };
    return data;
}
function _templateObject21() {
    const data = _tagged_template_literal._([
        "",
        "/",
        ""
    ]);
    _templateObject21 = function() {
        return data;
    };
    return data;
}
function _templateObject22() {
    const data = _tagged_template_literal._([
        "",
        "",
        ""
    ]);
    _templateObject22 = function() {
        return data;
    };
    return data;
}
function _templateObject23() {
    const data = _tagged_template_literal._([
        "{}"
    ]);
    _templateObject23 = function() {
        return data;
    };
    return data;
}
function _templateObject24() {
    const data = _tagged_template_literal._([
        "",
        "",
        ""
    ]);
    _templateObject24 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const names_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/names.js [app-client] (ecmascript)");
exports.keywordError = {
    message: (param)=>{
        let { keyword } = param;
        return (0, codegen_1.str)(_templateObject(), keyword);
    }
};
exports.keyword$DataError = {
    message: (param)=>{
        let { keyword, schemaType } = param;
        return schemaType ? (0, codegen_1.str)(_templateObject1(), keyword, schemaType) : (0, codegen_1.str)(_templateObject2(), keyword);
    }
};
function reportError(cxt) {
    let error = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : exports.keywordError, errorPaths = arguments.length > 2 ? arguments[2] : void 0, overrideAllErrors = arguments.length > 3 ? arguments[3] : void 0;
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error, errorPaths);
    if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : compositeRule || allErrors) {
        addError(gen, errObj);
    } else {
        returnErrors(it, (0, codegen_1._)(_templateObject3(), errObj));
    }
}
exports.reportError = reportError;
function reportExtraError(cxt) {
    let error = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : exports.keywordError, errorPaths = arguments.length > 2 ? arguments[2] : void 0;
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error, errorPaths);
    addError(gen, errObj);
    if (!(compositeRule || allErrors)) {
        returnErrors(it, names_1.default.vErrors);
    }
}
exports.reportExtraError = reportExtraError;
function resetErrorsCount(gen, errsCount) {
    gen.assign(names_1.default.errors, errsCount);
    gen.if((0, codegen_1._)(_templateObject4(), names_1.default.vErrors), ()=>gen.if(errsCount, ()=>gen.assign((0, codegen_1._)(_templateObject5(), names_1.default.vErrors), errsCount), ()=>gen.assign(names_1.default.vErrors, null)));
}
exports.resetErrorsCount = resetErrorsCount;
function extendErrors(param) {
    let { gen, keyword, schemaValue, data, errsCount, it } = param;
    /* istanbul ignore if */ if (errsCount === undefined) throw new Error("ajv implementation error");
    const err = gen.name("err");
    gen.forRange("i", errsCount, names_1.default.errors, (i)=>{
        gen.const(err, (0, codegen_1._)(_templateObject6(), names_1.default.vErrors, i));
        gen.if((0, codegen_1._)(_templateObject7(), err), ()=>gen.assign((0, codegen_1._)(_templateObject8(), err), (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath)));
        gen.assign((0, codegen_1._)(_templateObject9(), err), (0, codegen_1.str)(_templateObject10(), it.errSchemaPath, keyword));
        if (it.opts.verbose) {
            gen.assign((0, codegen_1._)(_templateObject11(), err), schemaValue);
            gen.assign((0, codegen_1._)(_templateObject12(), err), data);
        }
    });
}
exports.extendErrors = extendErrors;
function addError(gen, errObj) {
    const err = gen.const("err", errObj);
    gen.if((0, codegen_1._)(_templateObject13(), names_1.default.vErrors), ()=>gen.assign(names_1.default.vErrors, (0, codegen_1._)(_templateObject14(), err)), (0, codegen_1._)(_templateObject15(), names_1.default.vErrors, err));
    gen.code((0, codegen_1._)(_templateObject16(), names_1.default.errors));
}
function returnErrors(it, errs) {
    const { gen, validateName, schemaEnv } = it;
    if (schemaEnv.$async) {
        gen.throw((0, codegen_1._)(_templateObject17(), it.ValidationError, errs));
    } else {
        gen.assign((0, codegen_1._)(_templateObject18(), validateName), errs);
        gen.return(false);
    }
}
const E = {
    keyword: new codegen_1.Name("keyword"),
    schemaPath: new codegen_1.Name("schemaPath"),
    params: new codegen_1.Name("params"),
    propertyName: new codegen_1.Name("propertyName"),
    message: new codegen_1.Name("message"),
    schema: new codegen_1.Name("schema"),
    parentSchema: new codegen_1.Name("parentSchema")
};
function errorObjectCode(cxt, error, errorPaths) {
    const { createErrors } = cxt.it;
    if (createErrors === false) return (0, codegen_1._)(_templateObject19());
    return errorObject(cxt, error, errorPaths);
}
function errorObject(cxt, error) {
    let errorPaths = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const { gen, it } = cxt;
    const keyValues = [
        errorInstancePath(it, errorPaths),
        errorSchemaPath(cxt, errorPaths)
    ];
    extraErrorProps(cxt, error, keyValues);
    return gen.object(...keyValues);
}
function errorInstancePath(param, param1) {
    let { errorPath } = param, { instancePath } = param1;
    const instPath = instancePath ? (0, codegen_1.str)(_templateObject20(), errorPath, (0, util_1.getErrorPath)(instancePath, util_1.Type.Str)) : errorPath;
    return [
        names_1.default.instancePath,
        (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)
    ];
}
function errorSchemaPath(param, param1) {
    let { keyword, it: { errSchemaPath } } = param, { schemaPath, parentSchema } = param1;
    let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str)(_templateObject21(), errSchemaPath, keyword);
    if (schemaPath) {
        schPath = (0, codegen_1.str)(_templateObject22(), schPath, (0, util_1.getErrorPath)(schemaPath, util_1.Type.Str));
    }
    return [
        E.schemaPath,
        schPath
    ];
}
function extraErrorProps(cxt, param, keyValues) {
    let { params, message } = param;
    const { keyword, data, schemaValue, it } = cxt;
    const { opts, propertyName, topSchemaRef, schemaPath } = it;
    keyValues.push([
        E.keyword,
        keyword
    ], [
        E.params,
        typeof params == "function" ? params(cxt) : params || (0, codegen_1._)(_templateObject23())
    ]);
    if (opts.messages) {
        keyValues.push([
            E.message,
            typeof message == "function" ? message(cxt) : message
        ]);
    }
    if (opts.verbose) {
        keyValues.push([
            E.schema,
            schemaValue
        ], [
            E.parentSchema,
            (0, codegen_1._)(_templateObject24(), topSchemaRef, schemaPath)
        ], [
            names_1.default.data,
            data
        ]);
    }
    if (propertyName) keyValues.push([
        E.propertyName,
        propertyName
    ]);
} //# sourceMappingURL=errors.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/validate/boolSchema.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "",
        ".errors"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.boolOrEmptySchema = exports.topBoolOrEmptySchema = void 0;
const errors_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/errors.js [app-client] (ecmascript)");
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const names_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/names.js [app-client] (ecmascript)");
const boolError = {
    message: "boolean schema is false"
};
function topBoolOrEmptySchema(it) {
    const { gen, schema, validateName } = it;
    if (schema === false) {
        falseSchemaError(it, false);
    } else if (typeof schema == "object" && schema.$async === true) {
        gen.return(names_1.default.data);
    } else {
        gen.assign((0, codegen_1._)(_templateObject(), validateName), null);
        gen.return(true);
    }
}
exports.topBoolOrEmptySchema = topBoolOrEmptySchema;
function boolOrEmptySchema(it, valid) {
    const { gen, schema } = it;
    if (schema === false) {
        gen.var(valid, false); // TODO var
        falseSchemaError(it);
    } else {
        gen.var(valid, true); // TODO var
    }
}
exports.boolOrEmptySchema = boolOrEmptySchema;
function falseSchemaError(it, overrideAllErrors) {
    const { gen, data } = it;
    // TODO maybe some other interface should be used for non-keyword validation errors...
    const cxt = {
        gen,
        keyword: "false schema",
        data,
        schema: false,
        schemaCode: false,
        schemaValue: false,
        params: {},
        it
    };
    (0, errors_1.reportError)(cxt, boolError, undefined, overrideAllErrors);
} //# sourceMappingURL=boolSchema.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/rules.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRules = exports.isJSONType = void 0;
const _jsonTypes = [
    "string",
    "number",
    "integer",
    "boolean",
    "null",
    "object",
    "array"
];
const jsonTypes = new Set(_jsonTypes);
function isJSONType(x) {
    return typeof x == "string" && jsonTypes.has(x);
}
exports.isJSONType = isJSONType;
function getRules() {
    const groups = {
        number: {
            type: "number",
            rules: []
        },
        string: {
            type: "string",
            rules: []
        },
        array: {
            type: "array",
            rules: []
        },
        object: {
            type: "object",
            rules: []
        }
    };
    return {
        types: {
            ...groups,
            integer: true,
            boolean: true,
            null: true
        },
        rules: [
            {
                rules: []
            },
            groups.number,
            groups.string,
            groups.array,
            groups.object
        ],
        post: {
            rules: []
        },
        all: {},
        keywords: {}
    };
}
exports.getRules = getRules; //# sourceMappingURL=rules.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/validate/applicability.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.shouldUseRule = exports.shouldUseGroup = exports.schemaHasRulesForType = void 0;
function schemaHasRulesForType(param, type) {
    let { schema, self } = param;
    const group = self.RULES.types[type];
    return group && group !== true && shouldUseGroup(schema, group);
}
exports.schemaHasRulesForType = schemaHasRulesForType;
function shouldUseGroup(schema, group) {
    return group.rules.some((rule)=>shouldUseRule(schema, rule));
}
exports.shouldUseGroup = shouldUseGroup;
function shouldUseRule(schema, rule) {
    var _a;
    return schema[rule.keyword] !== undefined || ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd)=>schema[kwd] !== undefined));
}
exports.shouldUseRule = shouldUseRule; //# sourceMappingURL=applicability.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/validate/dataType.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "typeof ",
        ""
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "undefined"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "",
        " == 'object' && Array.isArray(",
        ") && ",
        ".length == 1"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        "",
        "[0]"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = _tagged_template_literal._([
        "typeof ",
        ""
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
function _templateObject5() {
    const data = _tagged_template_literal._([
        "",
        " !== undefined"
    ]);
    _templateObject5 = function() {
        return data;
    };
    return data;
}
function _templateObject6() {
    const data = _tagged_template_literal._([
        "",
        " !== undefined"
    ]);
    _templateObject6 = function() {
        return data;
    };
    return data;
}
function _templateObject7() {
    const data = _tagged_template_literal._([
        "",
        ' == "number" || ',
        ' == "boolean"'
    ]);
    _templateObject7 = function() {
        return data;
    };
    return data;
}
function _templateObject8() {
    const data = _tagged_template_literal._([
        '"" + ',
        ""
    ]);
    _templateObject8 = function() {
        return data;
    };
    return data;
}
function _templateObject9() {
    const data = _tagged_template_literal._([
        "",
        " === null"
    ]);
    _templateObject9 = function() {
        return data;
    };
    return data;
}
function _templateObject10() {
    const data = _tagged_template_literal._([
        '""'
    ]);
    _templateObject10 = function() {
        return data;
    };
    return data;
}
function _templateObject11() {
    const data = _tagged_template_literal._([
        "",
        ' == "boolean" || ',
        " === null\n              || (",
        ' == "string" && ',
        " && ",
        " == +",
        ")"
    ]);
    _templateObject11 = function() {
        return data;
    };
    return data;
}
function _templateObject12() {
    const data = _tagged_template_literal._([
        "+",
        ""
    ]);
    _templateObject12 = function() {
        return data;
    };
    return data;
}
function _templateObject13() {
    const data = _tagged_template_literal._([
        "",
        ' === "boolean" || ',
        " === null\n              || (",
        ' === "string" && ',
        " && ",
        " == +",
        " && !(",
        " % 1))"
    ]);
    _templateObject13 = function() {
        return data;
    };
    return data;
}
function _templateObject14() {
    const data = _tagged_template_literal._([
        "+",
        ""
    ]);
    _templateObject14 = function() {
        return data;
    };
    return data;
}
function _templateObject15() {
    const data = _tagged_template_literal._([
        "",
        ' === "false" || ',
        " === 0 || ",
        " === null"
    ]);
    _templateObject15 = function() {
        return data;
    };
    return data;
}
function _templateObject16() {
    const data = _tagged_template_literal._([
        "",
        ' === "true" || ',
        " === 1"
    ]);
    _templateObject16 = function() {
        return data;
    };
    return data;
}
function _templateObject17() {
    const data = _tagged_template_literal._([
        "",
        ' === "" || ',
        " === 0 || ",
        " === false"
    ]);
    _templateObject17 = function() {
        return data;
    };
    return data;
}
function _templateObject18() {
    const data = _tagged_template_literal._([
        "",
        ' === "string" || ',
        ' === "number"\n              || ',
        ' === "boolean" || ',
        " === null"
    ]);
    _templateObject18 = function() {
        return data;
    };
    return data;
}
function _templateObject19() {
    const data = _tagged_template_literal._([
        "[",
        "]"
    ]);
    _templateObject19 = function() {
        return data;
    };
    return data;
}
function _templateObject20() {
    const data = _tagged_template_literal._([
        "",
        " !== undefined"
    ]);
    _templateObject20 = function() {
        return data;
    };
    return data;
}
function _templateObject21() {
    const data = _tagged_template_literal._([
        "",
        "[",
        "]"
    ]);
    _templateObject21 = function() {
        return data;
    };
    return data;
}
function _templateObject22() {
    const data = _tagged_template_literal._([
        "",
        " ",
        " null"
    ]);
    _templateObject22 = function() {
        return data;
    };
    return data;
}
function _templateObject23() {
    const data = _tagged_template_literal._([
        "Array.isArray(",
        ")"
    ]);
    _templateObject23 = function() {
        return data;
    };
    return data;
}
function _templateObject24() {
    const data = _tagged_template_literal._([
        "",
        " && typeof ",
        ' == "object" && !Array.isArray(',
        ")"
    ]);
    _templateObject24 = function() {
        return data;
    };
    return data;
}
function _templateObject25() {
    const data = _tagged_template_literal._([
        "!(",
        " % 1) && !isNaN(",
        ")"
    ]);
    _templateObject25 = function() {
        return data;
    };
    return data;
}
function _templateObject26() {
    const data = _tagged_template_literal._([
        "typeof ",
        " ",
        " ",
        ""
    ]);
    _templateObject26 = function() {
        return data;
    };
    return data;
}
function _templateObject27() {
    const data = _tagged_template_literal._([
        "typeof ",
        ' == "number"'
    ]);
    _templateObject27 = function() {
        return data;
    };
    return data;
}
function _templateObject28() {
    const data = _tagged_template_literal._([
        "isFinite(",
        ")"
    ]);
    _templateObject28 = function() {
        return data;
    };
    return data;
}
function _templateObject29() {
    const data = _tagged_template_literal._([
        "typeof ",
        ' != "object"'
    ]);
    _templateObject29 = function() {
        return data;
    };
    return data;
}
function _templateObject30() {
    const data = _tagged_template_literal._([
        "!",
        " || ",
        ""
    ]);
    _templateObject30 = function() {
        return data;
    };
    return data;
}
function _templateObject31() {
    const data = _tagged_template_literal._([
        "{type: ",
        "}"
    ]);
    _templateObject31 = function() {
        return data;
    };
    return data;
}
function _templateObject32() {
    const data = _tagged_template_literal._([
        "{type: ",
        "}"
    ]);
    _templateObject32 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
const rules_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/rules.js [app-client] (ecmascript)");
const applicability_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/validate/applicability.js [app-client] (ecmascript)");
const errors_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/errors.js [app-client] (ecmascript)");
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
var DataType;
(function(DataType) {
    DataType[DataType["Correct"] = 0] = "Correct";
    DataType[DataType["Wrong"] = 1] = "Wrong";
})(DataType || (exports.DataType = DataType = {}));
function getSchemaTypes(schema) {
    const types = getJSONTypes(schema.type);
    const hasNull = types.includes("null");
    if (hasNull) {
        if (schema.nullable === false) throw new Error("type: null contradicts nullable: false");
    } else {
        if (!types.length && schema.nullable !== undefined) {
            throw new Error('"nullable" cannot be used without "type"');
        }
        if (schema.nullable === true) types.push("null");
    }
    return types;
}
exports.getSchemaTypes = getSchemaTypes;
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
function getJSONTypes(ts) {
    const types = Array.isArray(ts) ? ts : ts ? [
        ts
    ] : [];
    if (types.every(rules_1.isJSONType)) return types;
    throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
}
exports.getJSONTypes = getJSONTypes;
function coerceAndCheckDataType(it, types) {
    const { gen, data, opts } = it;
    const coerceTo = coerceToTypes(types, opts.coerceTypes);
    const checkTypes = types.length > 0 && !(coerceTo.length === 0 && types.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types[0]));
    if (checkTypes) {
        const wrongType = checkDataTypes(types, data, opts.strictNumbers, DataType.Wrong);
        gen.if(wrongType, ()=>{
            if (coerceTo.length) coerceData(it, types, coerceTo);
            else reportTypeError(it);
        });
    }
    return checkTypes;
}
exports.coerceAndCheckDataType = coerceAndCheckDataType;
const COERCIBLE = new Set([
    "string",
    "number",
    "integer",
    "boolean",
    "null"
]);
function coerceToTypes(types, coerceTypes) {
    return coerceTypes ? types.filter((t)=>COERCIBLE.has(t) || coerceTypes === "array" && t === "array") : [];
}
function coerceData(it, types, coerceTo) {
    const { gen, data, opts } = it;
    const dataType = gen.let("dataType", (0, codegen_1._)(_templateObject(), data));
    const coerced = gen.let("coerced", (0, codegen_1._)(_templateObject1()));
    if (opts.coerceTypes === "array") {
        gen.if((0, codegen_1._)(_templateObject2(), dataType, data, data), ()=>gen.assign(data, (0, codegen_1._)(_templateObject3(), data)).assign(dataType, (0, codegen_1._)(_templateObject4(), data)).if(checkDataTypes(types, data, opts.strictNumbers), ()=>gen.assign(coerced, data)));
    }
    gen.if((0, codegen_1._)(_templateObject5(), coerced));
    for (const t of coerceTo){
        if (COERCIBLE.has(t) || t === "array" && opts.coerceTypes === "array") {
            coerceSpecificType(t);
        }
    }
    gen.else();
    reportTypeError(it);
    gen.endIf();
    gen.if((0, codegen_1._)(_templateObject6(), coerced), ()=>{
        gen.assign(data, coerced);
        assignParentData(it, coerced);
    });
    function coerceSpecificType(t) {
        switch(t){
            case "string":
                gen.elseIf((0, codegen_1._)(_templateObject7(), dataType, dataType)).assign(coerced, (0, codegen_1._)(_templateObject8(), data)).elseIf((0, codegen_1._)(_templateObject9(), data)).assign(coerced, (0, codegen_1._)(_templateObject10()));
                return;
            case "number":
                gen.elseIf((0, codegen_1._)(_templateObject11(), dataType, data, dataType, data, data, data)).assign(coerced, (0, codegen_1._)(_templateObject12(), data));
                return;
            case "integer":
                gen.elseIf((0, codegen_1._)(_templateObject13(), dataType, data, dataType, data, data, data, data)).assign(coerced, (0, codegen_1._)(_templateObject14(), data));
                return;
            case "boolean":
                gen.elseIf((0, codegen_1._)(_templateObject15(), data, data, data)).assign(coerced, false).elseIf((0, codegen_1._)(_templateObject16(), data, data)).assign(coerced, true);
                return;
            case "null":
                gen.elseIf((0, codegen_1._)(_templateObject17(), data, data, data));
                gen.assign(coerced, null);
                return;
            case "array":
                gen.elseIf((0, codegen_1._)(_templateObject18(), dataType, dataType, dataType, data)).assign(coerced, (0, codegen_1._)(_templateObject19(), data));
        }
    }
}
function assignParentData(param, expr) {
    let { gen, parentData, parentDataProperty } = param;
    // TODO use gen.property
    gen.if((0, codegen_1._)(_templateObject20(), parentData), ()=>gen.assign((0, codegen_1._)(_templateObject21(), parentData, parentDataProperty), expr));
}
function checkDataType(dataType, data, strictNums) {
    let correct = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : DataType.Correct;
    const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
    let cond;
    switch(dataType){
        case "null":
            return (0, codegen_1._)(_templateObject22(), data, EQ);
        case "array":
            cond = (0, codegen_1._)(_templateObject23(), data);
            break;
        case "object":
            cond = (0, codegen_1._)(_templateObject24(), data, data, data);
            break;
        case "integer":
            cond = numCond((0, codegen_1._)(_templateObject25(), data, data));
            break;
        case "number":
            cond = numCond();
            break;
        default:
            return (0, codegen_1._)(_templateObject26(), data, EQ, dataType);
    }
    return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
    //TURBOPACK unreachable
    ;
    function numCond() {
        let _cond = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : codegen_1.nil;
        return (0, codegen_1.and)((0, codegen_1._)(_templateObject27(), data), _cond, strictNums ? (0, codegen_1._)(_templateObject28(), data) : codegen_1.nil);
    }
}
exports.checkDataType = checkDataType;
function checkDataTypes(dataTypes, data, strictNums, correct) {
    if (dataTypes.length === 1) {
        return checkDataType(dataTypes[0], data, strictNums, correct);
    }
    let cond;
    const types = (0, util_1.toHash)(dataTypes);
    if (types.array && types.object) {
        const notObj = (0, codegen_1._)(_templateObject29(), data);
        cond = types.null ? notObj : (0, codegen_1._)(_templateObject30(), data, notObj);
        delete types.null;
        delete types.array;
        delete types.object;
    } else {
        cond = codegen_1.nil;
    }
    if (types.number) delete types.integer;
    for(const t in types)cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
    return cond;
}
exports.checkDataTypes = checkDataTypes;
const typeError = {
    message: (param)=>{
        let { schema } = param;
        return "must be ".concat(schema);
    },
    params: (param)=>{
        let { schema, schemaValue } = param;
        return typeof schema == "string" ? (0, codegen_1._)(_templateObject31(), schema) : (0, codegen_1._)(_templateObject32(), schemaValue);
    }
};
function reportTypeError(it) {
    const cxt = getTypeErrorContext(it);
    (0, errors_1.reportError)(cxt, typeError);
}
exports.reportTypeError = reportTypeError;
function getTypeErrorContext(it) {
    const { gen, data, schema } = it;
    const schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
    return {
        gen,
        keyword: "type",
        data,
        schema: schema.type,
        schemaCode,
        schemaValue: schemaCode,
        parentSchema: schema,
        params: {},
        it
    };
} //# sourceMappingURL=dataType.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/validate/defaults.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "",
        "",
        ""
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "",
        " === undefined"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "",
        " || ",
        " === null || ",
        ' === ""'
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        "",
        " = ",
        ""
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assignDefaults = void 0;
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
function assignDefaults(it, ty) {
    const { properties, items } = it.schema;
    if (ty === "object" && properties) {
        for(const key in properties){
            assignDefault(it, key, properties[key].default);
        }
    } else if (ty === "array" && Array.isArray(items)) {
        items.forEach((sch, i)=>assignDefault(it, i, sch.default));
    }
}
exports.assignDefaults = assignDefaults;
function assignDefault(it, prop, defaultValue) {
    const { gen, compositeRule, data, opts } = it;
    if (defaultValue === undefined) return;
    const childData = (0, codegen_1._)(_templateObject(), data, (0, codegen_1.getProperty)(prop));
    if (compositeRule) {
        (0, util_1.checkStrictMode)(it, "default is ignored for: ".concat(childData));
        return;
    }
    let condition = (0, codegen_1._)(_templateObject1(), childData);
    if (opts.useDefaults === "empty") {
        condition = (0, codegen_1._)(_templateObject2(), condition, childData, childData);
    }
    // `${childData} === undefined` +
    // (opts.useDefaults === "empty" ? ` || ${childData} === null || ${childData} === ""` : "")
    gen.if(condition, (0, codegen_1._)(_templateObject3(), childData, (0, codegen_1.stringify)(defaultValue)));
} //# sourceMappingURL=defaults.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/code.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "",
        ""
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "",
        " = ",
        ""
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "Object.prototype.hasOwnProperty"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        "",
        ".call(",
        ", ",
        ")"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = _tagged_template_literal._([
        "",
        "",
        " !== undefined"
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
function _templateObject5() {
    const data = _tagged_template_literal._([
        "",
        " && ",
        ""
    ]);
    _templateObject5 = function() {
        return data;
    };
    return data;
}
function _templateObject6() {
    const data = _tagged_template_literal._([
        "",
        "",
        " === undefined"
    ]);
    _templateObject6 = function() {
        return data;
    };
    return data;
}
function _templateObject7() {
    const data = _tagged_template_literal._([
        "",
        ", ",
        ", ",
        "",
        ""
    ]);
    _templateObject7 = function() {
        return data;
    };
    return data;
}
function _templateObject8() {
    const data = _tagged_template_literal._([
        "",
        ", ",
        ""
    ]);
    _templateObject8 = function() {
        return data;
    };
    return data;
}
function _templateObject9() {
    const data = _tagged_template_literal._([
        "",
        ".call(",
        ", ",
        ")"
    ]);
    _templateObject9 = function() {
        return data;
    };
    return data;
}
function _templateObject10() {
    const data = _tagged_template_literal._([
        "",
        "(",
        ")"
    ]);
    _templateObject10 = function() {
        return data;
    };
    return data;
}
function _templateObject11() {
    const data = _tagged_template_literal._([
        "new RegExp"
    ]);
    _templateObject11 = function() {
        return data;
    };
    return data;
}
function _templateObject12() {
    const data = _tagged_template_literal._([
        "",
        "(",
        ", ",
        ")"
    ]);
    _templateObject12 = function() {
        return data;
    };
    return data;
}
function _templateObject13() {
    const data = _tagged_template_literal._([
        "",
        ".length"
    ]);
    _templateObject13 = function() {
        return data;
    };
    return data;
}
function _templateObject14() {
    const data = _tagged_template_literal._([
        "",
        " || ",
        ""
    ]);
    _templateObject14 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateUnion = exports.validateArray = exports.usePattern = exports.callValidateCode = exports.schemaProperties = exports.allSchemaProperties = exports.noPropertyInData = exports.propertyInData = exports.isOwnProperty = exports.hasPropFunc = exports.reportMissingProp = exports.checkMissingProp = exports.checkReportMissingProp = void 0;
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const names_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/names.js [app-client] (ecmascript)");
const util_2 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
function checkReportMissingProp(cxt, prop) {
    const { gen, data, it } = cxt;
    gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), ()=>{
        cxt.setParams({
            missingProperty: (0, codegen_1._)(_templateObject(), prop)
        }, true);
        cxt.error();
    });
}
exports.checkReportMissingProp = checkReportMissingProp;
function checkMissingProp(param, properties, missing) {
    let { gen, data, it: { opts } } = param;
    return (0, codegen_1.or)(...properties.map((prop)=>(0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._)(_templateObject1(), missing, prop))));
}
exports.checkMissingProp = checkMissingProp;
function reportMissingProp(cxt, missing) {
    cxt.setParams({
        missingProperty: missing
    }, true);
    cxt.error();
}
exports.reportMissingProp = reportMissingProp;
function hasPropFunc(gen) {
    return gen.scopeValue("func", {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref: Object.prototype.hasOwnProperty,
        code: (0, codegen_1._)(_templateObject2())
    });
}
exports.hasPropFunc = hasPropFunc;
function isOwnProperty(gen, data, property) {
    return (0, codegen_1._)(_templateObject3(), hasPropFunc(gen), data, property);
}
exports.isOwnProperty = isOwnProperty;
function propertyInData(gen, data, property, ownProperties) {
    const cond = (0, codegen_1._)(_templateObject4(), data, (0, codegen_1.getProperty)(property));
    return ownProperties ? (0, codegen_1._)(_templateObject5(), cond, isOwnProperty(gen, data, property)) : cond;
}
exports.propertyInData = propertyInData;
function noPropertyInData(gen, data, property, ownProperties) {
    const cond = (0, codegen_1._)(_templateObject6(), data, (0, codegen_1.getProperty)(property));
    return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
}
exports.noPropertyInData = noPropertyInData;
function allSchemaProperties(schemaMap) {
    return schemaMap ? Object.keys(schemaMap).filter((p)=>p !== "__proto__") : [];
}
exports.allSchemaProperties = allSchemaProperties;
function schemaProperties(it, schemaMap) {
    return allSchemaProperties(schemaMap).filter((p)=>!(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
}
exports.schemaProperties = schemaProperties;
function callValidateCode(param, func, context, passSchema) {
    let { schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it } = param;
    const dataAndSchema = passSchema ? (0, codegen_1._)(_templateObject7(), schemaCode, data, topSchemaRef, schemaPath) : data;
    const valCxt = [
        [
            names_1.default.instancePath,
            (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)
        ],
        [
            names_1.default.parentData,
            it.parentData
        ],
        [
            names_1.default.parentDataProperty,
            it.parentDataProperty
        ],
        [
            names_1.default.rootData,
            names_1.default.rootData
        ]
    ];
    if (it.opts.dynamicRef) valCxt.push([
        names_1.default.dynamicAnchors,
        names_1.default.dynamicAnchors
    ]);
    const args = (0, codegen_1._)(_templateObject8(), dataAndSchema, gen.object(...valCxt));
    return context !== codegen_1.nil ? (0, codegen_1._)(_templateObject9(), func, context, args) : (0, codegen_1._)(_templateObject10(), func, args);
}
exports.callValidateCode = callValidateCode;
const newRegExp = (0, codegen_1._)(_templateObject11());
function usePattern(param, pattern) {
    let { gen, it: { opts } } = param;
    const u = opts.unicodeRegExp ? "u" : "";
    const { regExp } = opts.code;
    const rx = regExp(pattern, u);
    return gen.scopeValue("pattern", {
        key: rx.toString(),
        ref: rx,
        code: (0, codegen_1._)(_templateObject12(), regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp), pattern, u)
    });
}
exports.usePattern = usePattern;
function validateArray(cxt) {
    const { gen, data, keyword, it } = cxt;
    const valid = gen.name("valid");
    if (it.allErrors) {
        const validArr = gen.let("valid", true);
        validateItems(()=>gen.assign(validArr, false));
        return validArr;
    }
    gen.var(valid, true);
    validateItems(()=>gen.break());
    return valid;
    //TURBOPACK unreachable
    ;
    function validateItems(notValid) {
        const len = gen.const("len", (0, codegen_1._)(_templateObject13(), data));
        gen.forRange("i", 0, len, (i)=>{
            cxt.subschema({
                keyword,
                dataProp: i,
                dataPropType: util_1.Type.Num
            }, valid);
            gen.if((0, codegen_1.not)(valid), notValid);
        });
    }
}
exports.validateArray = validateArray;
function validateUnion(cxt) {
    const { gen, schema, keyword, it } = cxt;
    /* istanbul ignore if */ if (!Array.isArray(schema)) throw new Error("ajv implementation error");
    const alwaysValid = schema.some((sch)=>(0, util_1.alwaysValidSchema)(it, sch));
    if (alwaysValid && !it.opts.unevaluated) return;
    const valid = gen.let("valid", false);
    const schValid = gen.name("_valid");
    gen.block(()=>schema.forEach((_sch, i)=>{
            const schCxt = cxt.subschema({
                keyword,
                schemaProp: i,
                compositeRule: true
            }, schValid);
            gen.assign(valid, (0, codegen_1._)(_templateObject14(), valid, schValid));
            const merged = cxt.mergeValidEvaluated(schCxt, schValid);
            // can short-circuit if `unevaluatedProperties/Items` not supported (opts.unevaluated !== true)
            // or if all properties and items were evaluated (it.props === true && it.items === true)
            if (!merged) gen.if((0, codegen_1.not)(valid));
        }));
    cxt.result(valid, ()=>cxt.reset(), ()=>cxt.error(true));
}
exports.validateUnion = validateUnion; //# sourceMappingURL=code.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/validate/keyword.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "await "
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "",
        " instanceof ",
        ""
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "",
        ".errors"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        "",
        ".errors"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = _tagged_template_literal._([
        "await "
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
function _templateObject5() {
    const data = _tagged_template_literal._([
        "",
        "",
        ""
    ]);
    _templateObject5 = function() {
        return data;
    };
    return data;
}
function _templateObject6() {
    const data = _tagged_template_literal._([
        "",
        "[",
        "]"
    ]);
    _templateObject6 = function() {
        return data;
    };
    return data;
}
function _templateObject7() {
    const data = _tagged_template_literal._([
        "Array.isArray(",
        ")"
    ]);
    _templateObject7 = function() {
        return data;
    };
    return data;
}
function _templateObject8() {
    const data = _tagged_template_literal._([
        "",
        " === null ? ",
        " : ",
        ".concat(",
        ")"
    ]);
    _templateObject8 = function() {
        return data;
    };
    return data;
}
function _templateObject9() {
    const data = _tagged_template_literal._([
        "",
        ".length"
    ]);
    _templateObject9 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateKeywordUsage = exports.validSchemaType = exports.funcKeywordCode = exports.macroKeywordCode = void 0;
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const names_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/names.js [app-client] (ecmascript)");
const code_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/code.js [app-client] (ecmascript)");
const errors_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/errors.js [app-client] (ecmascript)");
function macroKeywordCode(cxt, def) {
    const { gen, keyword, schema, parentSchema, it } = cxt;
    const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
    const schemaRef = useKeyword(gen, keyword, macroSchema);
    if (it.opts.validateSchema !== false) it.self.validateSchema(macroSchema, true);
    const valid = gen.name("valid");
    cxt.subschema({
        schema: macroSchema,
        schemaPath: codegen_1.nil,
        errSchemaPath: "".concat(it.errSchemaPath, "/").concat(keyword),
        topSchemaRef: schemaRef,
        compositeRule: true
    }, valid);
    cxt.pass(valid, ()=>cxt.error(true));
}
exports.macroKeywordCode = macroKeywordCode;
function funcKeywordCode(cxt, def) {
    var _a;
    const { gen, keyword, schema, parentSchema, $data, it } = cxt;
    checkAsyncKeyword(it, def);
    const validate = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
    const validateRef = useKeyword(gen, keyword, validate);
    const valid = gen.let("valid");
    cxt.block$data(valid, validateKeyword);
    cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
    function validateKeyword() {
        if (def.errors === false) {
            assignValid();
            if (def.modifying) modifyData(cxt);
            reportErrs(()=>cxt.error());
        } else {
            const ruleErrs = def.async ? validateAsync() : validateSync();
            if (def.modifying) modifyData(cxt);
            reportErrs(()=>addErrs(cxt, ruleErrs));
        }
    }
    function validateAsync() {
        const ruleErrs = gen.let("ruleErrs", null);
        gen.try(()=>assignValid((0, codegen_1._)(_templateObject())), (e)=>gen.assign(valid, false).if((0, codegen_1._)(_templateObject1(), e, it.ValidationError), ()=>gen.assign(ruleErrs, (0, codegen_1._)(_templateObject2(), e)), ()=>gen.throw(e)));
        return ruleErrs;
    }
    function validateSync() {
        const validateErrs = (0, codegen_1._)(_templateObject3(), validateRef);
        gen.assign(validateErrs, null);
        assignValid(codegen_1.nil);
        return validateErrs;
    }
    function assignValid() {
        let _await = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : def.async ? (0, codegen_1._)(_templateObject4()) : codegen_1.nil;
        const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
        const passSchema = !("compile" in def && !$data || def.schema === false);
        gen.assign(valid, (0, codegen_1._)(_templateObject5(), _await, (0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)), def.modifying);
    }
    function reportErrs(errors) {
        var _a;
        gen.if((0, codegen_1.not)((_a = def.valid) !== null && _a !== void 0 ? _a : valid), errors);
    }
}
exports.funcKeywordCode = funcKeywordCode;
function modifyData(cxt) {
    const { gen, data, it } = cxt;
    gen.if(it.parentData, ()=>gen.assign(data, (0, codegen_1._)(_templateObject6(), it.parentData, it.parentDataProperty)));
}
function addErrs(cxt, errs) {
    const { gen } = cxt;
    gen.if((0, codegen_1._)(_templateObject7(), errs), ()=>{
        gen.assign(names_1.default.vErrors, (0, codegen_1._)(_templateObject8(), names_1.default.vErrors, errs, names_1.default.vErrors, errs)).assign(names_1.default.errors, (0, codegen_1._)(_templateObject9(), names_1.default.vErrors));
        (0, errors_1.extendErrors)(cxt);
    }, ()=>cxt.error());
}
function checkAsyncKeyword(param, def) {
    let { schemaEnv } = param;
    if (def.async && !schemaEnv.$async) throw new Error("async keyword in sync schema");
}
function useKeyword(gen, keyword, result) {
    if (result === undefined) throw new Error('keyword "'.concat(keyword, '" failed to compile'));
    return gen.scopeValue("keyword", typeof result == "function" ? {
        ref: result
    } : {
        ref: result,
        code: (0, codegen_1.stringify)(result)
    });
}
function validSchemaType(schema, schemaType) {
    let allowUndefined = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    // TODO add tests
    return !schemaType.length || schemaType.some((st)=>st === "array" ? Array.isArray(schema) : st === "object" ? schema && typeof schema == "object" && !Array.isArray(schema) : typeof schema == st || allowUndefined && typeof schema == "undefined");
}
exports.validSchemaType = validSchemaType;
function validateKeywordUsage(param, def, keyword) {
    let { schema, opts, self, errSchemaPath } = param;
    /* istanbul ignore if */ if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
        throw new Error("ajv implementation error");
    }
    const deps = def.dependencies;
    if (deps === null || deps === void 0 ? void 0 : deps.some((kwd)=>!Object.prototype.hasOwnProperty.call(schema, kwd))) {
        throw new Error("parent schema must have dependencies of ".concat(keyword, ": ").concat(deps.join(",")));
    }
    if (def.validateSchema) {
        const valid = def.validateSchema(schema[keyword]);
        if (!valid) {
            const msg = 'keyword "'.concat(keyword, '" value is invalid at path "').concat(errSchemaPath, '": ') + self.errorsText(def.validateSchema.errors);
            if (opts.validateSchema === "log") self.logger.error(msg);
            else throw new Error(msg);
        }
    }
}
exports.validateKeywordUsage = validateKeywordUsage; //# sourceMappingURL=keyword.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/validate/subschema.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "",
        "",
        ""
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "",
        "",
        "",
        ""
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "",
        "",
        ""
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        "",
        "",
        ""
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = _tagged_template_literal._([
        "",
        ""
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.extendSubschemaMode = exports.extendSubschemaData = exports.getSubschema = void 0;
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
function getSubschema(it, param) {
    let { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef } = param;
    if (keyword !== undefined && schema !== undefined) {
        throw new Error('both "keyword" and "schema" passed, only one allowed');
    }
    if (keyword !== undefined) {
        const sch = it.schema[keyword];
        return schemaProp === undefined ? {
            schema: sch,
            schemaPath: (0, codegen_1._)(_templateObject(), it.schemaPath, (0, codegen_1.getProperty)(keyword)),
            errSchemaPath: "".concat(it.errSchemaPath, "/").concat(keyword)
        } : {
            schema: sch[schemaProp],
            schemaPath: (0, codegen_1._)(_templateObject1(), it.schemaPath, (0, codegen_1.getProperty)(keyword), (0, codegen_1.getProperty)(schemaProp)),
            errSchemaPath: "".concat(it.errSchemaPath, "/").concat(keyword, "/").concat((0, util_1.escapeFragment)(schemaProp))
        };
    }
    if (schema !== undefined) {
        if (schemaPath === undefined || errSchemaPath === undefined || topSchemaRef === undefined) {
            throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
        }
        return {
            schema,
            schemaPath,
            topSchemaRef,
            errSchemaPath
        };
    }
    throw new Error('either "keyword" or "schema" must be passed');
}
exports.getSubschema = getSubschema;
function extendSubschemaData(subschema, it, param) {
    let { dataProp, dataPropType: dpType, data, dataTypes, propertyName } = param;
    if (data !== undefined && dataProp !== undefined) {
        throw new Error('both "data" and "dataProp" passed, only one allowed');
    }
    const { gen } = it;
    if (dataProp !== undefined) {
        const { errorPath, dataPathArr, opts } = it;
        const nextData = gen.let("data", (0, codegen_1._)(_templateObject2(), it.data, (0, codegen_1.getProperty)(dataProp)), true);
        dataContextProps(nextData);
        subschema.errorPath = (0, codegen_1.str)(_templateObject3(), errorPath, (0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax));
        subschema.parentDataProperty = (0, codegen_1._)(_templateObject4(), dataProp);
        subschema.dataPathArr = [
            ...dataPathArr,
            subschema.parentDataProperty
        ];
    }
    if (data !== undefined) {
        const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true); // replaceable if used once?
        dataContextProps(nextData);
        if (propertyName !== undefined) subschema.propertyName = propertyName;
    // TODO something is possibly wrong here with not changing parentDataProperty and not appending dataPathArr
    }
    if (dataTypes) subschema.dataTypes = dataTypes;
    function dataContextProps(_nextData) {
        subschema.data = _nextData;
        subschema.dataLevel = it.dataLevel + 1;
        subschema.dataTypes = [];
        it.definedProperties = new Set();
        subschema.parentData = it.data;
        subschema.dataNames = [
            ...it.dataNames,
            _nextData
        ];
    }
}
exports.extendSubschemaData = extendSubschemaData;
function extendSubschemaMode(subschema, param) {
    let { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors } = param;
    if (compositeRule !== undefined) subschema.compositeRule = compositeRule;
    if (createErrors !== undefined) subschema.createErrors = createErrors;
    if (allErrors !== undefined) subschema.allErrors = allErrors;
    subschema.jtdDiscriminator = jtdDiscriminator; // not inherited
    subschema.jtdMetadata = jtdMetadata; // not inherited
}
exports.extendSubschemaMode = extendSubschemaMode; //# sourceMappingURL=subschema.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/fast-deep-equal/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
"[project]/Documents/vsc/HTV/frontend/node_modules/json-schema-traverse/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/resolve.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSchemaRefs = exports.resolveUrl = exports.normalizeId = exports._getFullPath = exports.getFullPath = exports.inlineRef = void 0;
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const equal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/fast-deep-equal/index.js [app-client] (ecmascript)");
const traverse = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/json-schema-traverse/index.js [app-client] (ecmascript)");
// TODO refactor to use keyword definitions
const SIMPLE_INLINED = new Set([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum",
    "const"
]);
function inlineRef(schema) {
    let limit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    if (typeof schema == "boolean") return true;
    if (limit === true) return !hasRef(schema);
    if (!limit) return false;
    return countKeys(schema) <= limit;
}
exports.inlineRef = inlineRef;
const REF_KEYWORDS = new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor"
]);
function hasRef(schema) {
    for(const key in schema){
        if (REF_KEYWORDS.has(key)) return true;
        const sch = schema[key];
        if (Array.isArray(sch) && sch.some(hasRef)) return true;
        if (typeof sch == "object" && hasRef(sch)) return true;
    }
    return false;
}
function countKeys(schema) {
    let count = 0;
    for(const key in schema){
        if (key === "$ref") return Infinity;
        count++;
        if (SIMPLE_INLINED.has(key)) continue;
        if (typeof schema[key] == "object") {
            (0, util_1.eachItem)(schema[key], (sch)=>count += countKeys(sch));
        }
        if (count === Infinity) return Infinity;
    }
    return count;
}
function getFullPath(resolver) {
    let id = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", normalize = arguments.length > 2 ? arguments[2] : void 0;
    if (normalize !== false) id = normalizeId(id);
    const p = resolver.parse(id);
    return _getFullPath(resolver, p);
}
exports.getFullPath = getFullPath;
function _getFullPath(resolver, p) {
    const serialized = resolver.serialize(p);
    return serialized.split("#")[0] + "#";
}
exports._getFullPath = _getFullPath;
const TRAILING_SLASH_HASH = /#\/?$/;
function normalizeId(id) {
    return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
}
exports.normalizeId = normalizeId;
function resolveUrl(resolver, baseId, id) {
    id = normalizeId(id);
    return resolver.resolve(baseId, id);
}
exports.resolveUrl = resolveUrl;
const ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
function getSchemaRefs(schema, baseId) {
    if (typeof schema == "boolean") return {};
    const { schemaId, uriResolver } = this.opts;
    const schId = normalizeId(schema[schemaId] || baseId);
    const baseIds = {
        "": schId
    };
    const pathPrefix = getFullPath(uriResolver, schId, false);
    const localRefs = {};
    const schemaRefs = new Set();
    traverse(schema, {
        allKeys: true
    }, (sch, jsonPtr, _, parentJsonPtr)=>{
        if (parentJsonPtr === undefined) return;
        const fullPath = pathPrefix + jsonPtr;
        let innerBaseId = baseIds[parentJsonPtr];
        if (typeof sch[schemaId] == "string") innerBaseId = addRef.call(this, sch[schemaId]);
        addAnchor.call(this, sch.$anchor);
        addAnchor.call(this, sch.$dynamicAnchor);
        baseIds[jsonPtr] = innerBaseId;
        function addRef(ref) {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            const _resolve = this.opts.uriResolver.resolve;
            ref = normalizeId(innerBaseId ? _resolve(innerBaseId, ref) : ref);
            if (schemaRefs.has(ref)) throw ambiguos(ref);
            schemaRefs.add(ref);
            let schOrRef = this.refs[ref];
            if (typeof schOrRef == "string") schOrRef = this.refs[schOrRef];
            if (typeof schOrRef == "object") {
                checkAmbiguosRef(sch, schOrRef.schema, ref);
            } else if (ref !== normalizeId(fullPath)) {
                if (ref[0] === "#") {
                    checkAmbiguosRef(sch, localRefs[ref], ref);
                    localRefs[ref] = sch;
                } else {
                    this.refs[ref] = fullPath;
                }
            }
            return ref;
        }
        function addAnchor(anchor) {
            if (typeof anchor == "string") {
                if (!ANCHOR.test(anchor)) throw new Error('invalid anchor "'.concat(anchor, '"'));
                addRef.call(this, "#".concat(anchor));
            }
        }
    });
    return localRefs;
    //TURBOPACK unreachable
    ;
    function checkAmbiguosRef(sch1, sch2, ref) {
        if (sch2 !== undefined && !equal(sch1, sch2)) throw ambiguos(ref);
    }
    function ambiguos(ref) {
        return new Error('reference "'.concat(ref, '" resolves to more than one schema'));
    }
}
exports.getSchemaRefs = getSchemaRefs; //# sourceMappingURL=resolve.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/validate/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "",
        ", ",
        ""
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        '"use strict"; ',
        ""
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "",
        ", ",
        ""
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        ", ",
        "={}"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = _tagged_template_literal._([
        "{",
        '="", ',
        ", ",
        ", ",
        "=",
        "",
        "}={}"
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
function _templateObject5() {
    const data = _tagged_template_literal._([
        "",
        ".",
        ""
    ]);
    _templateObject5 = function() {
        return data;
    };
    return data;
}
function _templateObject6() {
    const data = _tagged_template_literal._([
        "",
        ".",
        ""
    ]);
    _templateObject6 = function() {
        return data;
    };
    return data;
}
function _templateObject7() {
    const data = _tagged_template_literal._([
        "",
        ".",
        ""
    ]);
    _templateObject7 = function() {
        return data;
    };
    return data;
}
function _templateObject8() {
    const data = _tagged_template_literal._([
        "",
        ".",
        ""
    ]);
    _templateObject8 = function() {
        return data;
    };
    return data;
}
function _templateObject9() {
    const data = _tagged_template_literal._([
        "",
        ".",
        ""
    ]);
    _templateObject9 = function() {
        return data;
    };
    return data;
}
function _templateObject10() {
    const data = _tagged_template_literal._([
        '""'
    ]);
    _templateObject10 = function() {
        return data;
    };
    return data;
}
function _templateObject11() {
    const data = _tagged_template_literal._([
        "undefined"
    ]);
    _templateObject11 = function() {
        return data;
    };
    return data;
}
function _templateObject12() {
    const data = _tagged_template_literal._([
        "undefined"
    ]);
    _templateObject12 = function() {
        return data;
    };
    return data;
}
function _templateObject13() {
    const data = _tagged_template_literal._([
        "{}"
    ]);
    _templateObject13 = function() {
        return data;
    };
    return data;
}
function _templateObject14() {
    const data = _tagged_template_literal._([
        "",
        ".evaluated"
    ]);
    _templateObject14 = function() {
        return data;
    };
    return data;
}
function _templateObject15() {
    const data = _tagged_template_literal._([
        "",
        ".dynamicProps"
    ]);
    _templateObject15 = function() {
        return data;
    };
    return data;
}
function _templateObject16() {
    const data = _tagged_template_literal._([
        "",
        ".props"
    ]);
    _templateObject16 = function() {
        return data;
    };
    return data;
}
function _templateObject17() {
    const data = _tagged_template_literal._([
        "undefined"
    ]);
    _templateObject17 = function() {
        return data;
    };
    return data;
}
function _templateObject18() {
    const data = _tagged_template_literal._([
        "",
        ".dynamicItems"
    ]);
    _templateObject18 = function() {
        return data;
    };
    return data;
}
function _templateObject19() {
    const data = _tagged_template_literal._([
        "",
        ".items"
    ]);
    _templateObject19 = function() {
        return data;
    };
    return data;
}
function _templateObject20() {
    const data = _tagged_template_literal._([
        "undefined"
    ]);
    _templateObject20 = function() {
        return data;
    };
    return data;
}
function _templateObject21() {
    const data = _tagged_template_literal._([
        "/*# sourceURL=",
        " */"
    ]);
    _templateObject21 = function() {
        return data;
    };
    return data;
}
function _templateObject22() {
    const data = _tagged_template_literal._([
        "",
        " === ",
        ""
    ]);
    _templateObject22 = function() {
        return data;
    };
    return data;
}
function _templateObject23() {
    const data = _tagged_template_literal._([
        "",
        ".logger.log(",
        ")"
    ]);
    _templateObject23 = function() {
        return data;
    };
    return data;
}
function _templateObject24() {
    const data = _tagged_template_literal._([
        "",
        "/$comment"
    ]);
    _templateObject24 = function() {
        return data;
    };
    return data;
}
function _templateObject25() {
    const data = _tagged_template_literal._([
        "",
        ".opts.$comment(",
        ", ",
        ", ",
        ".schema)"
    ]);
    _templateObject25 = function() {
        return data;
    };
    return data;
}
function _templateObject26() {
    const data = _tagged_template_literal._([
        "",
        " === 0"
    ]);
    _templateObject26 = function() {
        return data;
    };
    return data;
}
function _templateObject27() {
    const data = _tagged_template_literal._([
        "new ",
        "(",
        ")"
    ]);
    _templateObject27 = function() {
        return data;
    };
    return data;
}
function _templateObject28() {
    const data = _tagged_template_literal._([
        "",
        ".errors"
    ]);
    _templateObject28 = function() {
        return data;
    };
    return data;
}
function _templateObject29() {
    const data = _tagged_template_literal._([
        "",
        " === 0"
    ]);
    _templateObject29 = function() {
        return data;
    };
    return data;
}
function _templateObject30() {
    const data = _tagged_template_literal._([
        "",
        ".props"
    ]);
    _templateObject30 = function() {
        return data;
    };
    return data;
}
function _templateObject31() {
    const data = _tagged_template_literal._([
        "",
        ".items"
    ]);
    _templateObject31 = function() {
        return data;
    };
    return data;
}
function _templateObject32() {
    const data = _tagged_template_literal._([
        "",
        " === ",
        ""
    ]);
    _templateObject32 = function() {
        return data;
    };
    return data;
}
function _templateObject33() {
    const data = _tagged_template_literal._([
        "",
        " !== undefined && (",
        ")"
    ]);
    _templateObject33 = function() {
        return data;
    };
    return data;
}
function _templateObject34() {
    const data = _tagged_template_literal._([
        "",
        " === undefined"
    ]);
    _templateObject34 = function() {
        return data;
    };
    return data;
}
function _templateObject35() {
    const data = _tagged_template_literal._([
        "",
        ""
    ]);
    _templateObject35 = function() {
        return data;
    };
    return data;
}
function _templateObject36() {
    const data = _tagged_template_literal._([
        "!",
        "(",
        ")"
    ]);
    _templateObject36 = function() {
        return data;
    };
    return data;
}
function _templateObject37() {
    const data = _tagged_template_literal._([
        "",
        "",
        ""
    ]);
    _templateObject37 = function() {
        return data;
    };
    return data;
}
function _templateObject38() {
    const data = _tagged_template_literal._([
        "",
        " && ",
        ""
    ]);
    _templateObject38 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getData = exports.KeywordCxt = exports.validateFunctionCode = void 0;
const boolSchema_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/validate/boolSchema.js [app-client] (ecmascript)");
const dataType_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/validate/dataType.js [app-client] (ecmascript)");
const applicability_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/validate/applicability.js [app-client] (ecmascript)");
const dataType_2 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/validate/dataType.js [app-client] (ecmascript)");
const defaults_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/validate/defaults.js [app-client] (ecmascript)");
const keyword_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/validate/keyword.js [app-client] (ecmascript)");
const subschema_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/validate/subschema.js [app-client] (ecmascript)");
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const names_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/names.js [app-client] (ecmascript)");
const resolve_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/resolve.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const errors_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/errors.js [app-client] (ecmascript)");
// schema compilation - generates validation function, subschemaCode (below) is used for subschemas
function validateFunctionCode(it) {
    if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
            topSchemaObjCode(it);
            return;
        }
    }
    validateFunction(it, ()=>(0, boolSchema_1.topBoolOrEmptySchema)(it));
}
exports.validateFunctionCode = validateFunctionCode;
function validateFunction(param, body) {
    let { gen, validateName, schema, schemaEnv, opts } = param;
    if (opts.code.es5) {
        gen.func(validateName, (0, codegen_1._)(_templateObject(), names_1.default.data, names_1.default.valCxt), schemaEnv.$async, ()=>{
            gen.code((0, codegen_1._)(_templateObject1(), funcSourceUrl(schema, opts)));
            destructureValCxtES5(gen, opts);
            gen.code(body);
        });
    } else {
        gen.func(validateName, (0, codegen_1._)(_templateObject2(), names_1.default.data, destructureValCxt(opts)), schemaEnv.$async, ()=>gen.code(funcSourceUrl(schema, opts)).code(body));
    }
}
function destructureValCxt(opts) {
    return (0, codegen_1._)(_templateObject4(), names_1.default.instancePath, names_1.default.parentData, names_1.default.parentDataProperty, names_1.default.rootData, names_1.default.data, opts.dynamicRef ? (0, codegen_1._)(_templateObject3(), names_1.default.dynamicAnchors) : codegen_1.nil);
}
function destructureValCxtES5(gen, opts) {
    gen.if(names_1.default.valCxt, ()=>{
        gen.var(names_1.default.instancePath, (0, codegen_1._)(_templateObject5(), names_1.default.valCxt, names_1.default.instancePath));
        gen.var(names_1.default.parentData, (0, codegen_1._)(_templateObject6(), names_1.default.valCxt, names_1.default.parentData));
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._)(_templateObject7(), names_1.default.valCxt, names_1.default.parentDataProperty));
        gen.var(names_1.default.rootData, (0, codegen_1._)(_templateObject8(), names_1.default.valCxt, names_1.default.rootData));
        if (opts.dynamicRef) gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)(_templateObject9(), names_1.default.valCxt, names_1.default.dynamicAnchors));
    }, ()=>{
        gen.var(names_1.default.instancePath, (0, codegen_1._)(_templateObject10()));
        gen.var(names_1.default.parentData, (0, codegen_1._)(_templateObject11()));
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._)(_templateObject12()));
        gen.var(names_1.default.rootData, names_1.default.data);
        if (opts.dynamicRef) gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)(_templateObject13()));
    });
}
function topSchemaObjCode(it) {
    const { schema, opts, gen } = it;
    validateFunction(it, ()=>{
        if (opts.$comment && schema.$comment) commentKeyword(it);
        checkNoDefault(it);
        gen.let(names_1.default.vErrors, null);
        gen.let(names_1.default.errors, 0);
        if (opts.unevaluated) resetEvaluated(it);
        typeAndKeywords(it);
        returnResults(it);
    });
    return;
}
function resetEvaluated(it) {
    // TODO maybe some hook to execute it in the end to check whether props/items are Name, as in assignEvaluated
    const { gen, validateName } = it;
    it.evaluated = gen.const("evaluated", (0, codegen_1._)(_templateObject14(), validateName));
    gen.if((0, codegen_1._)(_templateObject15(), it.evaluated), ()=>gen.assign((0, codegen_1._)(_templateObject16(), it.evaluated), (0, codegen_1._)(_templateObject17())));
    gen.if((0, codegen_1._)(_templateObject18(), it.evaluated), ()=>gen.assign((0, codegen_1._)(_templateObject19(), it.evaluated), (0, codegen_1._)(_templateObject20())));
}
function funcSourceUrl(schema, opts) {
    const schId = typeof schema == "object" && schema[opts.schemaId];
    return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._)(_templateObject21(), schId) : codegen_1.nil;
}
// schema compilation - this function is used recursively to generate code for sub-schemas
function subschemaCode(it, valid) {
    if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
            subSchemaObjCode(it, valid);
            return;
        }
    }
    (0, boolSchema_1.boolOrEmptySchema)(it, valid);
}
function schemaCxtHasRules(param) {
    let { schema, self } = param;
    if (typeof schema == "boolean") return !schema;
    for(const key in schema)if (self.RULES.all[key]) return true;
    return false;
}
function isSchemaObj(it) {
    return typeof it.schema != "boolean";
}
function subSchemaObjCode(it, valid) {
    const { schema, gen, opts } = it;
    if (opts.$comment && schema.$comment) commentKeyword(it);
    updateContext(it);
    checkAsyncSchema(it);
    const errsCount = gen.const("_errs", names_1.default.errors);
    typeAndKeywords(it, errsCount);
    // TODO var
    gen.var(valid, (0, codegen_1._)(_templateObject22(), errsCount, names_1.default.errors));
}
function checkKeywords(it) {
    (0, util_1.checkUnknownRules)(it);
    checkRefsAndKeywords(it);
}
function typeAndKeywords(it, errsCount) {
    if (it.opts.jtd) return schemaKeywords(it, [], false, errsCount);
    const types = (0, dataType_1.getSchemaTypes)(it.schema);
    const checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types);
    schemaKeywords(it, types, !checkedTypes, errsCount);
}
function checkRefsAndKeywords(it) {
    const { schema, errSchemaPath, opts, self } = it;
    if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self.RULES)) {
        self.logger.warn('$ref: keywords ignored in schema at path "'.concat(errSchemaPath, '"'));
    }
}
function checkNoDefault(it) {
    const { schema, opts } = it;
    if (schema.default !== undefined && opts.useDefaults && opts.strictSchema) {
        (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
    }
}
function updateContext(it) {
    const schId = it.schema[it.opts.schemaId];
    if (schId) it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
}
function checkAsyncSchema(it) {
    if (it.schema.$async && !it.schemaEnv.$async) throw new Error("async schema in sync schema");
}
function commentKeyword(param) {
    let { gen, schemaEnv, schema, errSchemaPath, opts } = param;
    const msg = schema.$comment;
    if (opts.$comment === true) {
        gen.code((0, codegen_1._)(_templateObject23(), names_1.default.self, msg));
    } else if (typeof opts.$comment == "function") {
        const schemaPath = (0, codegen_1.str)(_templateObject24(), errSchemaPath);
        const rootName = gen.scopeValue("root", {
            ref: schemaEnv.root
        });
        gen.code((0, codegen_1._)(_templateObject25(), names_1.default.self, msg, schemaPath, rootName));
    }
}
function returnResults(it) {
    const { gen, schemaEnv, validateName, ValidationError, opts } = it;
    if (schemaEnv.$async) {
        // TODO assign unevaluated
        gen.if((0, codegen_1._)(_templateObject26(), names_1.default.errors), ()=>gen.return(names_1.default.data), ()=>gen.throw((0, codegen_1._)(_templateObject27(), ValidationError, names_1.default.vErrors)));
    } else {
        gen.assign((0, codegen_1._)(_templateObject28(), validateName), names_1.default.vErrors);
        if (opts.unevaluated) assignEvaluated(it);
        gen.return((0, codegen_1._)(_templateObject29(), names_1.default.errors));
    }
}
function assignEvaluated(param) {
    let { gen, evaluated, props, items } = param;
    if (props instanceof codegen_1.Name) gen.assign((0, codegen_1._)(_templateObject30(), evaluated), props);
    if (items instanceof codegen_1.Name) gen.assign((0, codegen_1._)(_templateObject31(), evaluated), items);
}
function schemaKeywords(it, types, typeErrors, errsCount) {
    const { gen, schema, data, allErrors, opts, self } = it;
    const { RULES } = self;
    if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES))) {
        gen.block(()=>keywordCode(it, "$ref", RULES.all.$ref.definition)); // TODO typecast
        return;
    }
    if (!opts.jtd) checkStrictTypes(it, types);
    gen.block(()=>{
        for (const group of RULES.rules)groupKeywords(group);
        groupKeywords(RULES.post);
    });
    function groupKeywords(group) {
        if (!(0, applicability_1.shouldUseGroup)(schema, group)) return;
        if (group.type) {
            gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
            iterateKeywords(it, group);
            if (types.length === 1 && types[0] === group.type && typeErrors) {
                gen.else();
                (0, dataType_2.reportTypeError)(it);
            }
            gen.endIf();
        } else {
            iterateKeywords(it, group);
        }
        // TODO make it "ok" call?
        if (!allErrors) gen.if((0, codegen_1._)(_templateObject32(), names_1.default.errors, errsCount || 0));
    }
}
function iterateKeywords(it, group) {
    const { gen, schema, opts: { useDefaults } } = it;
    if (useDefaults) (0, defaults_1.assignDefaults)(it, group.type);
    gen.block(()=>{
        for (const rule of group.rules){
            if ((0, applicability_1.shouldUseRule)(schema, rule)) {
                keywordCode(it, rule.keyword, rule.definition, group.type);
            }
        }
    });
}
function checkStrictTypes(it, types) {
    if (it.schemaEnv.meta || !it.opts.strictTypes) return;
    checkContextTypes(it, types);
    if (!it.opts.allowUnionTypes) checkMultipleTypes(it, types);
    checkKeywordTypes(it, it.dataTypes);
}
function checkContextTypes(it, types) {
    if (!types.length) return;
    if (!it.dataTypes.length) {
        it.dataTypes = types;
        return;
    }
    types.forEach((t)=>{
        if (!includesType(it.dataTypes, t)) {
            strictTypesError(it, 'type "'.concat(t, '" not allowed by context "').concat(it.dataTypes.join(","), '"'));
        }
    });
    narrowSchemaTypes(it, types);
}
function checkMultipleTypes(it, ts) {
    if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
        strictTypesError(it, "use allowUnionTypes to allow union type keyword");
    }
}
function checkKeywordTypes(it, ts) {
    const rules = it.self.RULES.all;
    for(const keyword in rules){
        const rule = rules[keyword];
        if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
            const { type } = rule.definition;
            if (type.length && !type.some((t)=>hasApplicableType(ts, t))) {
                strictTypesError(it, 'missing type "'.concat(type.join(","), '" for keyword "').concat(keyword, '"'));
            }
        }
    }
}
function hasApplicableType(schTs, kwdT) {
    return schTs.includes(kwdT) || kwdT === "number" && schTs.includes("integer");
}
function includesType(ts, t) {
    return ts.includes(t) || t === "integer" && ts.includes("number");
}
function narrowSchemaTypes(it, withTypes) {
    const ts = [];
    for (const t of it.dataTypes){
        if (includesType(withTypes, t)) ts.push(t);
        else if (withTypes.includes("integer") && t === "number") ts.push("integer");
    }
    it.dataTypes = ts;
}
function strictTypesError(it, msg) {
    const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
    msg += ' at "'.concat(schemaPath, '" (strictTypes)');
    (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
}
class KeywordCxt {
    result(condition, successAction, failAction) {
        this.failResult((0, codegen_1.not)(condition), successAction, failAction);
    }
    failResult(condition, successAction, failAction) {
        this.gen.if(condition);
        if (failAction) failAction();
        else this.error();
        if (successAction) {
            this.gen.else();
            successAction();
            if (this.allErrors) this.gen.endIf();
        } else {
            if (this.allErrors) this.gen.endIf();
            else this.gen.else();
        }
    }
    pass(condition, failAction) {
        this.failResult((0, codegen_1.not)(condition), undefined, failAction);
    }
    fail(condition) {
        if (condition === undefined) {
            this.error();
            if (!this.allErrors) this.gen.if(false); // this branch will be removed by gen.optimize
            return;
        }
        this.gen.if(condition);
        this.error();
        if (this.allErrors) this.gen.endIf();
        else this.gen.else();
    }
    fail$data(condition) {
        if (!this.$data) return this.fail(condition);
        const { schemaCode } = this;
        this.fail((0, codegen_1._)(_templateObject33(), schemaCode, (0, codegen_1.or)(this.invalid$data(), condition)));
    }
    error(append, errorParams, errorPaths) {
        if (errorParams) {
            this.setParams(errorParams);
            this._error(append, errorPaths);
            this.setParams({});
            return;
        }
        this._error(append, errorPaths);
    }
    _error(append, errorPaths) {
        ;
        (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
    }
    $dataError() {
        (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
    }
    reset() {
        if (this.errsCount === undefined) throw new Error('add "trackErrors" to keyword definition');
        (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(cond) {
        if (!this.allErrors) this.gen.if(cond);
    }
    setParams(obj, assign) {
        if (assign) Object.assign(this.params, obj);
        else this.params = obj;
    }
    block$data(valid, codeBlock) {
        let $dataValid = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : codegen_1.nil;
        this.gen.block(()=>{
            this.check$data(valid, $dataValid);
            codeBlock();
        });
    }
    check$data() {
        let valid = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : codegen_1.nil, $dataValid = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : codegen_1.nil;
        if (!this.$data) return;
        const { gen, schemaCode, schemaType, def } = this;
        gen.if((0, codegen_1.or)((0, codegen_1._)(_templateObject34(), schemaCode), $dataValid));
        if (valid !== codegen_1.nil) gen.assign(valid, true);
        if (schemaType.length || def.validateSchema) {
            gen.elseIf(this.invalid$data());
            this.$dataError();
            if (valid !== codegen_1.nil) gen.assign(valid, false);
        }
        gen.else();
    }
    invalid$data() {
        const { gen, schemaCode, schemaType, def, it } = this;
        return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
        //TURBOPACK unreachable
        ;
        function wrong$DataType() {
            if (schemaType.length) {
                /* istanbul ignore if */ if (!(schemaCode instanceof codegen_1.Name)) throw new Error("ajv implementation error");
                const st = Array.isArray(schemaType) ? schemaType : [
                    schemaType
                ];
                return (0, codegen_1._)(_templateObject35(), (0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong));
            }
            return codegen_1.nil;
        }
        function invalid$DataSchema() {
            if (def.validateSchema) {
                const validateSchemaRef = gen.scopeValue("validate$data", {
                    ref: def.validateSchema
                }); // TODO value.code for standalone
                return (0, codegen_1._)(_templateObject36(), validateSchemaRef, schemaCode);
            }
            return codegen_1.nil;
        }
    }
    subschema(appl, valid) {
        const subschema = (0, subschema_1.getSubschema)(this.it, appl);
        (0, subschema_1.extendSubschemaData)(subschema, this.it, appl);
        (0, subschema_1.extendSubschemaMode)(subschema, appl);
        const nextContext = {
            ...this.it,
            ...subschema,
            items: undefined,
            props: undefined
        };
        subschemaCode(nextContext, valid);
        return nextContext;
    }
    mergeEvaluated(schemaCxt, toName) {
        const { it, gen } = this;
        if (!it.opts.unevaluated) return;
        if (it.props !== true && schemaCxt.props !== undefined) {
            it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
        }
        if (it.items !== true && schemaCxt.items !== undefined) {
            it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
        }
    }
    mergeValidEvaluated(schemaCxt, valid) {
        const { it, gen } = this;
        if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
            gen.if(valid, ()=>this.mergeEvaluated(schemaCxt, codegen_1.Name));
            return true;
        }
    }
    constructor(it, def, keyword){
        (0, keyword_1.validateKeywordUsage)(it, def, keyword);
        this.gen = it.gen;
        this.allErrors = it.allErrors;
        this.keyword = keyword;
        this.data = it.data;
        this.schema = it.schema[keyword];
        this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
        this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword, this.$data);
        this.schemaType = def.schemaType;
        this.parentSchema = it.schema;
        this.params = {};
        this.it = it;
        this.def = def;
        if (this.$data) {
            this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
        } else {
            this.schemaCode = this.schemaValue;
            if (!(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) {
                throw new Error("".concat(keyword, " value must be ").concat(JSON.stringify(def.schemaType)));
            }
        }
        if ("code" in def ? def.trackErrors : def.errors !== false) {
            this.errsCount = it.gen.const("_errs", names_1.default.errors);
        }
    }
}
exports.KeywordCxt = KeywordCxt;
function keywordCode(it, keyword, def, ruleType) {
    const cxt = new KeywordCxt(it, def, keyword);
    if ("code" in def) {
        def.code(cxt, ruleType);
    } else if (cxt.$data && def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
    } else if ("macro" in def) {
        (0, keyword_1.macroKeywordCode)(cxt, def);
    } else if (def.compile || def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
    }
}
const JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
const RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function getData($data, param) {
    let { dataLevel, dataNames, dataPathArr } = param;
    let jsonPointer;
    let data;
    if ($data === "") return names_1.default.rootData;
    if ($data[0] === "/") {
        if (!JSON_POINTER.test($data)) throw new Error("Invalid JSON-pointer: ".concat($data));
        jsonPointer = $data;
        data = names_1.default.rootData;
    } else {
        const matches = RELATIVE_JSON_POINTER.exec($data);
        if (!matches) throw new Error("Invalid JSON-pointer: ".concat($data));
        const up = +matches[1];
        jsonPointer = matches[2];
        if (jsonPointer === "#") {
            if (up >= dataLevel) throw new Error(errorMsg("property/index", up));
            return dataPathArr[dataLevel - up];
        }
        if (up > dataLevel) throw new Error(errorMsg("data", up));
        data = dataNames[dataLevel - up];
        if (!jsonPointer) return data;
    }
    let expr = data;
    const segments = jsonPointer.split("/");
    for (const segment of segments){
        if (segment) {
            data = (0, codegen_1._)(_templateObject37(), data, (0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment)));
            expr = (0, codegen_1._)(_templateObject38(), expr, data);
        }
    }
    return expr;
    //TURBOPACK unreachable
    ;
    function errorMsg(pointerType, up) {
        return "Cannot access ".concat(pointerType, " ").concat(up, " levels up, current level is ").concat(dataLevel);
    }
}
exports.getData = getData; //# sourceMappingURL=index.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/runtime/validation_error.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class ValidationError extends Error {
    constructor(errors){
        super("validation failed");
        this.errors = errors;
        this.ajv = this.validation = true;
    }
}
exports.default = ValidationError; //# sourceMappingURL=validation_error.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/ref_error.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const resolve_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/resolve.js [app-client] (ecmascript)");
class MissingRefError extends Error {
    constructor(resolver, baseId, ref, msg){
        super(msg || "can't resolve reference ".concat(ref, " from id ").concat(baseId));
        this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref);
        this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
    }
}
exports.default = MissingRefError; //# sourceMappingURL=ref_error.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        'require("ajv/dist/runtime/validation_error").default'
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        '""'
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveSchema = exports.getCompilingSchema = exports.resolveRef = exports.compileSchema = exports.SchemaEnv = void 0;
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const validation_error_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/runtime/validation_error.js [app-client] (ecmascript)");
const names_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/names.js [app-client] (ecmascript)");
const resolve_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/resolve.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const validate_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/validate/index.js [app-client] (ecmascript)");
class SchemaEnv {
    constructor(env){
        var _a;
        this.refs = {};
        this.dynamicAnchors = {};
        let schema;
        if (typeof env.schema == "object") schema = env.schema;
        this.schema = env.schema;
        this.schemaId = env.schemaId;
        this.root = env.root || this;
        this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
        this.schemaPath = env.schemaPath;
        this.localRefs = env.localRefs;
        this.meta = env.meta;
        this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
        this.refs = {};
    }
}
exports.SchemaEnv = SchemaEnv;
// let codeSize = 0
// let nodeCount = 0
// Compiles schema in SchemaEnv
function compileSchema(sch) {
    // TODO refactor - remove compilations
    const _sch = getCompilingSchema.call(this, sch);
    if (_sch) return _sch;
    const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId); // TODO if getFullPath removed 1 tests fails
    const { es5, lines } = this.opts.code;
    const { ownProperties } = this.opts;
    const gen = new codegen_1.CodeGen(this.scope, {
        es5,
        lines,
        ownProperties
    });
    let _ValidationError;
    if (sch.$async) {
        _ValidationError = gen.scopeValue("Error", {
            ref: validation_error_1.default,
            code: (0, codegen_1._)(_templateObject())
        });
    }
    const validateName = gen.scopeName("validate");
    sch.validateName = validateName;
    const schemaCxt = {
        gen,
        allErrors: this.opts.allErrors,
        data: names_1.default.data,
        parentData: names_1.default.parentData,
        parentDataProperty: names_1.default.parentDataProperty,
        dataNames: [
            names_1.default.data
        ],
        dataPathArr: [
            codegen_1.nil
        ],
        dataLevel: 0,
        dataTypes: [],
        definedProperties: new Set(),
        topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true ? {
            ref: sch.schema,
            code: (0, codegen_1.stringify)(sch.schema)
        } : {
            ref: sch.schema
        }),
        validateName,
        ValidationError: _ValidationError,
        schema: sch.schema,
        schemaEnv: sch,
        rootId,
        baseId: sch.baseId || rootId,
        schemaPath: codegen_1.nil,
        errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
        errorPath: (0, codegen_1._)(_templateObject1()),
        opts: this.opts,
        self: this
    };
    let sourceCode;
    try {
        this._compilations.add(sch);
        (0, validate_1.validateFunctionCode)(schemaCxt);
        gen.optimize(this.opts.code.optimize);
        // gen.optimize(1)
        const validateCode = gen.toString();
        sourceCode = "".concat(gen.scopeRefs(names_1.default.scope), "return ").concat(validateCode);
        // console.log((codeSize += sourceCode.length), (nodeCount += gen.nodeCount))
        if (this.opts.code.process) sourceCode = this.opts.code.process(sourceCode, sch);
        // console.log("\n\n\n *** \n", sourceCode)
        const makeValidate = new Function("".concat(names_1.default.self), "".concat(names_1.default.scope), sourceCode);
        const validate = makeValidate(this, this.scope.get());
        this.scope.value(validateName, {
            ref: validate
        });
        validate.errors = null;
        validate.schema = sch.schema;
        validate.schemaEnv = sch;
        if (sch.$async) validate.$async = true;
        if (this.opts.code.source === true) {
            validate.source = {
                validateName,
                validateCode,
                scopeValues: gen._values
            };
        }
        if (this.opts.unevaluated) {
            const { props, items } = schemaCxt;
            validate.evaluated = {
                props: props instanceof codegen_1.Name ? undefined : props,
                items: items instanceof codegen_1.Name ? undefined : items,
                dynamicProps: props instanceof codegen_1.Name,
                dynamicItems: items instanceof codegen_1.Name
            };
            if (validate.source) validate.source.evaluated = (0, codegen_1.stringify)(validate.evaluated);
        }
        sch.validate = validate;
        return sch;
    } catch (e) {
        delete sch.validate;
        delete sch.validateName;
        if (sourceCode) this.logger.error("Error compiling schema, function code:", sourceCode);
        // console.log("\n\n\n *** \n", sourceCode, this.opts)
        throw e;
    } finally{
        this._compilations.delete(sch);
    }
}
exports.compileSchema = compileSchema;
function resolveRef(root, baseId, ref) {
    var _a;
    ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref);
    const schOrFunc = root.refs[ref];
    if (schOrFunc) return schOrFunc;
    let _sch = resolve.call(this, root, ref);
    if (_sch === undefined) {
        const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref]; // TODO maybe localRefs should hold SchemaEnv
        const { schemaId } = this.opts;
        if (schema) _sch = new SchemaEnv({
            schema,
            schemaId,
            root,
            baseId
        });
    }
    if (_sch === undefined) return;
    return root.refs[ref] = inlineOrCompile.call(this, _sch);
}
exports.resolveRef = resolveRef;
function inlineOrCompile(sch) {
    if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs)) return sch.schema;
    return sch.validate ? sch : compileSchema.call(this, sch);
}
// Index of schema compilation in the currently compiled list
function getCompilingSchema(schEnv) {
    for (const sch of this._compilations){
        if (sameSchemaEnv(sch, schEnv)) return sch;
    }
}
exports.getCompilingSchema = getCompilingSchema;
function sameSchemaEnv(s1, s2) {
    return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
}
// resolve and compile the references ($ref)
// TODO returns AnySchemaObject (if the schema can be inlined) or validation function
function resolve(root, ref // reference to resolve
) {
    let sch;
    while(typeof (sch = this.refs[ref]) == "string")ref = sch;
    return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
}
// Resolve schema, its root and baseId
function resolveSchema(root, ref // reference to resolve
) {
    const p = this.opts.uriResolver.parse(ref);
    const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
    let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, undefined);
    // TODO `Object.keys(root.schema).length > 0` should not be needed - but removing breaks 2 tests
    if (Object.keys(root.schema).length > 0 && refPath === baseId) {
        return getJsonPointer.call(this, p, root);
    }
    const id = (0, resolve_1.normalizeId)(refPath);
    const schOrRef = this.refs[id] || this.schemas[id];
    if (typeof schOrRef == "string") {
        const sch = resolveSchema.call(this, root, schOrRef);
        if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object") return;
        return getJsonPointer.call(this, p, sch);
    }
    if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object") return;
    if (!schOrRef.validate) compileSchema.call(this, schOrRef);
    if (id === (0, resolve_1.normalizeId)(ref)) {
        const { schema } = schOrRef;
        const { schemaId } = this.opts;
        const schId = schema[schemaId];
        if (schId) baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        return new SchemaEnv({
            schema,
            schemaId,
            root,
            baseId
        });
    }
    return getJsonPointer.call(this, p, schOrRef);
}
exports.resolveSchema = resolveSchema;
const PREVENT_SCOPE_CHANGE = new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
]);
function getJsonPointer(parsedRef, param) {
    let { baseId, schema, root } = param;
    var _a;
    if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/") return;
    for (const part of parsedRef.fragment.slice(1).split("/")){
        if (typeof schema === "boolean") return;
        const partSchema = schema[(0, util_1.unescapeFragment)(part)];
        if (partSchema === undefined) return;
        schema = partSchema;
        // TODO PREVENT_SCOPE_CHANGE could be defined in keyword def?
        const schId = typeof schema === "object" && schema[this.opts.schemaId];
        if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
            baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        }
    }
    let env;
    if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
        const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
        env = resolveSchema.call(this, root, $ref);
    }
    // even though resolution failed we need to return SchemaEnv to throw exception
    // so that compileAsync loads missing schema.
    const { schemaId } = this.opts;
    env = env || new SchemaEnv({
        schema,
        schemaId,
        root,
        baseId
    });
    if (env.schema !== env.root.schema) return env;
    return undefined;
} //# sourceMappingURL=index.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/refs/data.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"$id\":\"https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#\",\"description\":\"Meta-schema for $data reference (JSON AnySchema extension proposal)\",\"type\":\"object\",\"required\":[\"$data\"],\"properties\":{\"$data\":{\"type\":\"string\",\"anyOf\":[{\"format\":\"relative-json-pointer\"},{\"format\":\"json-pointer\"}]}},\"additionalProperties\":false}"));}),
"[project]/Documents/vsc/HTV/frontend/node_modules/fast-uri/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
                host = "[".concat(ipV6res.escapedHost, "]");
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
"[project]/Documents/vsc/HTV/frontend/node_modules/fast-uri/lib/schemes.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { isUUID } = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/fast-uri/lib/utils.js [app-client] (ecmascript)");
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
        const urnScheme = "".concat(scheme, ":").concat(options.nid || urnComponent.nid);
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
    const urnScheme = "".concat(scheme, ":").concat(options.nid || nid);
    const schemeHandler = getSchemeHandler(urnScheme);
    if (schemeHandler) {
        urnComponent = schemeHandler.serialize(urnComponent, options);
    }
    const uriComponent = urnComponent;
    const nss = urnComponent.nss;
    uriComponent.path = "".concat(nid || options.nid, ":").concat(nss);
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
"[project]/Documents/vsc/HTV/frontend/node_modules/fast-uri/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { normalizeIPv6, removeDotSegments, recomposeAuthority, normalizeComponentEncoding, isIPv4, nonSimpleDomain } = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/fast-uri/lib/utils.js [app-client] (ecmascript)");
const { SCHEMES, getSchemeHandler } = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/fast-uri/lib/schemes.js [app-client] (ecmascript)");
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
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/runtime/uri.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const uri = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/fast-uri/index.js [app-client] (ecmascript)");
uri.code = 'require("ajv/dist/runtime/uri").default';
exports.default = uri; //# sourceMappingURL=uri.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/core.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
var validate_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/validate/index.js [app-client] (ecmascript)");
Object.defineProperty(exports, "KeywordCxt", {
    enumerable: true,
    get: function() {
        return validate_1.KeywordCxt;
    }
});
var codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
Object.defineProperty(exports, "_", {
    enumerable: true,
    get: function() {
        return codegen_1._;
    }
});
Object.defineProperty(exports, "str", {
    enumerable: true,
    get: function() {
        return codegen_1.str;
    }
});
Object.defineProperty(exports, "stringify", {
    enumerable: true,
    get: function() {
        return codegen_1.stringify;
    }
});
Object.defineProperty(exports, "nil", {
    enumerable: true,
    get: function() {
        return codegen_1.nil;
    }
});
Object.defineProperty(exports, "Name", {
    enumerable: true,
    get: function() {
        return codegen_1.Name;
    }
});
Object.defineProperty(exports, "CodeGen", {
    enumerable: true,
    get: function() {
        return codegen_1.CodeGen;
    }
});
const validation_error_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/runtime/validation_error.js [app-client] (ecmascript)");
const ref_error_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/ref_error.js [app-client] (ecmascript)");
const rules_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/rules.js [app-client] (ecmascript)");
const compile_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/index.js [app-client] (ecmascript)");
const codegen_2 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const resolve_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/resolve.js [app-client] (ecmascript)");
const dataType_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/validate/dataType.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const $dataRefSchema = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/refs/data.json (json)");
const uri_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/runtime/uri.js [app-client] (ecmascript)");
const defaultRegExp = (str, flags)=>new RegExp(str, flags);
defaultRegExp.code = "new RegExp";
const META_IGNORE_OPTIONS = [
    "removeAdditional",
    "useDefaults",
    "coerceTypes"
];
const EXT_SCOPE_NAMES = new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
]);
const removedOptions = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
};
const deprecatedOptions = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
};
const MAX_EXPRESSION = 200;
// eslint-disable-next-line complexity
function requiredOptions(o) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
    const s = o.strict;
    const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
    const optimize = _optz === true || _optz === undefined ? 1 : _optz || 0;
    const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
    const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
    return {
        strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
        strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
        strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
        strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
        strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
        code: o.code ? {
            ...o.code,
            optimize,
            regExp
        } : {
            optimize,
            regExp
        },
        loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
        loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
        meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
        messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
        inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
        schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
        addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
        validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
        validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
        unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
        int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
        uriResolver: uriResolver
    };
}
class Ajv {
    _addVocabularies() {
        this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
        const { $data, meta, schemaId } = this.opts;
        let _dataRefSchema = $dataRefSchema;
        if (schemaId === "id") {
            _dataRefSchema = {
                ...$dataRefSchema
            };
            _dataRefSchema.id = _dataRefSchema.$id;
            delete _dataRefSchema.$id;
        }
        if (meta && $data) this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
    }
    defaultMeta() {
        const { meta, schemaId } = this.opts;
        return this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : undefined;
    }
    validate(schemaKeyRef, // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    data // to be validated
    ) {
        let v;
        if (typeof schemaKeyRef == "string") {
            v = this.getSchema(schemaKeyRef);
            if (!v) throw new Error('no schema with key or ref "'.concat(schemaKeyRef, '"'));
        } else {
            v = this.compile(schemaKeyRef);
        }
        const valid = v(data);
        if (!("$async" in v)) this.errors = v.errors;
        return valid;
    }
    compile(schema, _meta) {
        const sch = this._addSchema(schema, _meta);
        return sch.validate || this._compileSchemaEnv(sch);
    }
    compileAsync(schema, meta) {
        if (typeof this.opts.loadSchema != "function") {
            throw new Error("options.loadSchema should be a function");
        }
        const { loadSchema } = this.opts;
        return runCompileAsync.call(this, schema, meta);
        //TURBOPACK unreachable
        ;
        async function runCompileAsync(_schema, _meta) {
            await loadMetaSchema.call(this, _schema.$schema);
            const sch = this._addSchema(_schema, _meta);
            return sch.validate || _compileAsync.call(this, sch);
        }
        async function loadMetaSchema($ref) {
            if ($ref && !this.getSchema($ref)) {
                await runCompileAsync.call(this, {
                    $ref
                }, true);
            }
        }
        async function _compileAsync(sch) {
            try {
                return this._compileSchemaEnv(sch);
            } catch (e) {
                if (!(e instanceof ref_error_1.default)) throw e;
                checkLoaded.call(this, e);
                await loadMissingSchema.call(this, e.missingSchema);
                return _compileAsync.call(this, sch);
            }
        }
        function checkLoaded(param) {
            let { missingSchema: ref, missingRef } = param;
            if (this.refs[ref]) {
                throw new Error("AnySchema ".concat(ref, " is loaded but ").concat(missingRef, " cannot be resolved"));
            }
        }
        async function loadMissingSchema(ref) {
            const _schema = await _loadSchema.call(this, ref);
            if (!this.refs[ref]) await loadMetaSchema.call(this, _schema.$schema);
            if (!this.refs[ref]) this.addSchema(_schema, ref, meta);
        }
        async function _loadSchema(ref) {
            const p = this._loading[ref];
            if (p) return p;
            try {
                return await (this._loading[ref] = loadSchema(ref));
            } finally{
                delete this._loading[ref];
            }
        }
    }
    // Adds schema to the instance
    addSchema(schema, key, _meta) {
        let _validateSchema = arguments.length > 3 && arguments[3] !== void 0 // false to skip schema validation. Used internally, option validateSchema should be used instead.
         ? arguments[3] : this.opts.validateSchema;
        if (Array.isArray(schema)) {
            for (const sch of schema)this.addSchema(sch, undefined, _meta, _validateSchema);
            return this;
        }
        let id;
        if (typeof schema === "object") {
            const { schemaId } = this.opts;
            id = schema[schemaId];
            if (id !== undefined && typeof id != "string") {
                throw new Error("schema ".concat(schemaId, " must be string"));
            }
        }
        key = (0, resolve_1.normalizeId)(key || id);
        this._checkUnique(key);
        this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
        return this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(schema, key) {
        let _validateSchema = arguments.length > 2 && arguments[2] !== void 0 // false to skip schema validation, can be used to override validateSchema option for meta-schema
         ? arguments[2] : this.opts.validateSchema;
        this.addSchema(schema, key, true, _validateSchema);
        return this;
    }
    //  Validate schema against its meta-schema
    validateSchema(schema, throwOrLogError) {
        if (typeof schema == "boolean") return true;
        let $schema;
        $schema = schema.$schema;
        if ($schema !== undefined && typeof $schema != "string") {
            throw new Error("$schema must be a string");
        }
        $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
        if (!$schema) {
            this.logger.warn("meta-schema not available");
            this.errors = null;
            return true;
        }
        const valid = this.validate($schema, schema);
        if (!valid && throwOrLogError) {
            const message = "schema is invalid: " + this.errorsText();
            if (this.opts.validateSchema === "log") this.logger.error(message);
            else throw new Error(message);
        }
        return valid;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(keyRef) {
        let sch;
        while(typeof (sch = getSchEnv.call(this, keyRef)) == "string")keyRef = sch;
        if (sch === undefined) {
            const { schemaId } = this.opts;
            const root = new compile_1.SchemaEnv({
                schema: {},
                schemaId
            });
            sch = compile_1.resolveSchema.call(this, root, keyRef);
            if (!sch) return;
            this.refs[keyRef] = sch;
        }
        return sch.validate || this._compileSchemaEnv(sch);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(schemaKeyRef) {
        if (schemaKeyRef instanceof RegExp) {
            this._removeAllSchemas(this.schemas, schemaKeyRef);
            this._removeAllSchemas(this.refs, schemaKeyRef);
            return this;
        }
        switch(typeof schemaKeyRef){
            case "undefined":
                this._removeAllSchemas(this.schemas);
                this._removeAllSchemas(this.refs);
                this._cache.clear();
                return this;
            case "string":
                {
                    const sch = getSchEnv.call(this, schemaKeyRef);
                    if (typeof sch == "object") this._cache.delete(sch.schema);
                    delete this.schemas[schemaKeyRef];
                    delete this.refs[schemaKeyRef];
                    return this;
                }
            case "object":
                {
                    const cacheKey = schemaKeyRef;
                    this._cache.delete(cacheKey);
                    let id = schemaKeyRef[this.opts.schemaId];
                    if (id) {
                        id = (0, resolve_1.normalizeId)(id);
                        delete this.schemas[id];
                        delete this.refs[id];
                    }
                    return this;
                }
            default:
                throw new Error("ajv.removeSchema: invalid parameter");
        }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(definitions) {
        for (const def of definitions)this.addKeyword(def);
        return this;
    }
    addKeyword(kwdOrDef, def // deprecated
    ) {
        let keyword;
        if (typeof kwdOrDef == "string") {
            keyword = kwdOrDef;
            if (typeof def == "object") {
                this.logger.warn("these parameters are deprecated, see docs for addKeyword");
                def.keyword = keyword;
            }
        } else if (typeof kwdOrDef == "object" && def === undefined) {
            def = kwdOrDef;
            keyword = def.keyword;
            if (Array.isArray(keyword) && !keyword.length) {
                throw new Error("addKeywords: keyword must be string or non-empty array");
            }
        } else {
            throw new Error("invalid addKeywords parameters");
        }
        checkKeyword.call(this, keyword, def);
        if (!def) {
            (0, util_1.eachItem)(keyword, (kwd)=>addRule.call(this, kwd));
            return this;
        }
        keywordMetaschema.call(this, def);
        const definition = {
            ...def,
            type: (0, dataType_1.getJSONTypes)(def.type),
            schemaType: (0, dataType_1.getJSONTypes)(def.schemaType)
        };
        (0, util_1.eachItem)(keyword, definition.type.length === 0 ? (k)=>addRule.call(this, k, definition) : (k)=>definition.type.forEach((t)=>addRule.call(this, k, definition, t)));
        return this;
    }
    getKeyword(keyword) {
        const rule = this.RULES.all[keyword];
        return typeof rule == "object" ? rule.definition : !!rule;
    }
    // Remove keyword
    removeKeyword(keyword) {
        // TODO return type should be Ajv
        const { RULES } = this;
        delete RULES.keywords[keyword];
        delete RULES.all[keyword];
        for (const group of RULES.rules){
            const i = group.rules.findIndex((rule)=>rule.keyword === keyword);
            if (i >= 0) group.rules.splice(i, 1);
        }
        return this;
    }
    // Add format
    addFormat(name, format) {
        if (typeof format == "string") format = new RegExp(format);
        this.formats[name] = format;
        return this;
    }
    errorsText() {
        let errors = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.errors, { separator = ", ", dataVar = "data" } = arguments.length > 1 && arguments[1] !== void 0 // optional options with properties `separator` and `dataVar`
         ? arguments[1] : {};
        if (!errors || errors.length === 0) return "No errors";
        return errors.map((e)=>"".concat(dataVar).concat(e.instancePath, " ").concat(e.message)).reduce((text, msg)=>text + separator + msg);
    }
    $dataMetaSchema(metaSchema, keywordsJsonPointers) {
        const rules = this.RULES.all;
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        for (const jsonPointer of keywordsJsonPointers){
            const segments = jsonPointer.split("/").slice(1); // first segment is an empty string
            let keywords = metaSchema;
            for (const seg of segments)keywords = keywords[seg];
            for(const key in rules){
                const rule = rules[key];
                if (typeof rule != "object") continue;
                const { $data } = rule.definition;
                const schema = keywords[key];
                if ($data && schema) keywords[key] = schemaOrData(schema);
            }
        }
        return metaSchema;
    }
    _removeAllSchemas(schemas, regex) {
        for(const keyRef in schemas){
            const sch = schemas[keyRef];
            if (!regex || regex.test(keyRef)) {
                if (typeof sch == "string") {
                    delete schemas[keyRef];
                } else if (sch && !sch.meta) {
                    this._cache.delete(sch.schema);
                    delete schemas[keyRef];
                }
            }
        }
    }
    _addSchema(schema, meta, baseId) {
        let validateSchema = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : this.opts.validateSchema, addSchema = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.opts.addUsedSchema;
        let id;
        const { schemaId } = this.opts;
        if (typeof schema == "object") {
            id = schema[schemaId];
        } else {
            if (this.opts.jtd) throw new Error("schema must be object");
            else if (typeof schema != "boolean") throw new Error("schema must be object or boolean");
        }
        let sch = this._cache.get(schema);
        if (sch !== undefined) return sch;
        baseId = (0, resolve_1.normalizeId)(id || baseId);
        const localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
        sch = new compile_1.SchemaEnv({
            schema,
            schemaId,
            meta,
            baseId,
            localRefs
        });
        this._cache.set(sch.schema, sch);
        if (addSchema && !baseId.startsWith("#")) {
            // TODO atm it is allowed to overwrite schemas without id (instead of not adding them)
            if (baseId) this._checkUnique(baseId);
            this.refs[baseId] = sch;
        }
        if (validateSchema) this.validateSchema(schema, true);
        return sch;
    }
    _checkUnique(id) {
        if (this.schemas[id] || this.refs[id]) {
            throw new Error('schema with key or id "'.concat(id, '" already exists'));
        }
    }
    _compileSchemaEnv(sch) {
        if (sch.meta) this._compileMetaSchema(sch);
        else compile_1.compileSchema.call(this, sch);
        /* istanbul ignore if */ if (!sch.validate) throw new Error("ajv implementation error");
        return sch.validate;
    }
    _compileMetaSchema(sch) {
        const currentOpts = this.opts;
        this.opts = this._metaOpts;
        try {
            compile_1.compileSchema.call(this, sch);
        } finally{
            this.opts = currentOpts;
        }
    }
    constructor(opts = {}){
        this.schemas = {};
        this.refs = {};
        this.formats = {};
        this._compilations = new Set();
        this._loading = {};
        this._cache = new Map();
        opts = this.opts = {
            ...opts,
            ...requiredOptions(opts)
        };
        const { es5, lines } = this.opts.code;
        this.scope = new codegen_2.ValueScope({
            scope: {},
            prefixes: EXT_SCOPE_NAMES,
            es5,
            lines
        });
        this.logger = getLogger(opts.logger);
        const formatOpt = opts.validateFormats;
        opts.validateFormats = false;
        this.RULES = (0, rules_1.getRules)();
        checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
        checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
        this._metaOpts = getMetaSchemaOptions.call(this);
        if (opts.formats) addInitialFormats.call(this);
        this._addVocabularies();
        this._addDefaultMetaSchema();
        if (opts.keywords) addInitialKeywords.call(this, opts.keywords);
        if (typeof opts.meta == "object") this.addMetaSchema(opts.meta);
        addInitialSchemas.call(this);
        opts.validateFormats = formatOpt;
    }
}
Ajv.ValidationError = validation_error_1.default;
Ajv.MissingRefError = ref_error_1.default;
exports.default = Ajv;
function checkOptions(checkOpts, options, msg) {
    let log = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "error";
    for(const key in checkOpts){
        const opt = key;
        if (opt in options) this.logger[log]("".concat(msg, ": option ").concat(key, ". ").concat(checkOpts[opt]));
    }
}
function getSchEnv(keyRef) {
    keyRef = (0, resolve_1.normalizeId)(keyRef); // TODO tests fail without this line
    return this.schemas[keyRef] || this.refs[keyRef];
}
function addInitialSchemas() {
    const optsSchemas = this.opts.schemas;
    if (!optsSchemas) return;
    if (Array.isArray(optsSchemas)) this.addSchema(optsSchemas);
    else for(const key in optsSchemas)this.addSchema(optsSchemas[key], key);
}
function addInitialFormats() {
    for(const name in this.opts.formats){
        const format = this.opts.formats[name];
        if (format) this.addFormat(name, format);
    }
}
function addInitialKeywords(defs) {
    if (Array.isArray(defs)) {
        this.addVocabulary(defs);
        return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for(const keyword in defs){
        const def = defs[keyword];
        if (!def.keyword) def.keyword = keyword;
        this.addKeyword(def);
    }
}
function getMetaSchemaOptions() {
    const metaOpts = {
        ...this.opts
    };
    for (const opt of META_IGNORE_OPTIONS)delete metaOpts[opt];
    return metaOpts;
}
const noLogs = {
    log () {},
    warn () {},
    error () {}
};
function getLogger(logger) {
    if (logger === false) return noLogs;
    if (logger === undefined) return console;
    if (logger.log && logger.warn && logger.error) return logger;
    throw new Error("logger must implement log, warn and error methods");
}
const KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
function checkKeyword(keyword, def) {
    const { RULES } = this;
    (0, util_1.eachItem)(keyword, (kwd)=>{
        if (RULES.keywords[kwd]) throw new Error("Keyword ".concat(kwd, " is already defined"));
        if (!KEYWORD_NAME.test(kwd)) throw new Error("Keyword ".concat(kwd, " has invalid name"));
    });
    if (!def) return;
    if (def.$data && !("code" in def || "validate" in def)) {
        throw new Error('$data keyword must have "code" or "validate" function');
    }
}
function addRule(keyword, definition, dataType) {
    var _a;
    const post = definition === null || definition === void 0 ? void 0 : definition.post;
    if (dataType && post) throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES } = this;
    let ruleGroup = post ? RULES.post : RULES.rules.find((param)=>{
        let { type: t } = param;
        return t === dataType;
    });
    if (!ruleGroup) {
        ruleGroup = {
            type: dataType,
            rules: []
        };
        RULES.rules.push(ruleGroup);
    }
    RULES.keywords[keyword] = true;
    if (!definition) return;
    const rule = {
        keyword,
        definition: {
            ...definition,
            type: (0, dataType_1.getJSONTypes)(definition.type),
            schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType)
        }
    };
    if (definition.before) addBeforeRule.call(this, ruleGroup, rule, definition.before);
    else ruleGroup.rules.push(rule);
    RULES.all[keyword] = rule;
    (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd)=>this.addKeyword(kwd));
}
function addBeforeRule(ruleGroup, rule, before) {
    const i = ruleGroup.rules.findIndex((_rule)=>_rule.keyword === before);
    if (i >= 0) {
        ruleGroup.rules.splice(i, 0, rule);
    } else {
        ruleGroup.rules.push(rule);
        this.logger.warn("rule ".concat(before, " is not defined"));
    }
}
function keywordMetaschema(def) {
    let { metaSchema } = def;
    if (metaSchema === undefined) return;
    if (def.$data && this.opts.$data) metaSchema = schemaOrData(metaSchema);
    def.validateSchema = this.compile(metaSchema, true);
}
const $dataRef = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
};
function schemaOrData(schema) {
    return {
        anyOf: [
            schema,
            $dataRef
        ]
    };
} //# sourceMappingURL=core.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/core/id.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const def = {
    keyword: "id",
    code () {
        throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
};
exports.default = def; //# sourceMappingURL=id.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/core/ref.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "",
        ".validate"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "",
        ".validate"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "await ",
        ""
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        "!(",
        " instanceof ",
        ")"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = _tagged_template_literal._([
        "",
        ".errors"
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
function _templateObject5() {
    const data = _tagged_template_literal._([
        "",
        " === null ? ",
        " : ",
        ".concat(",
        ")"
    ]);
    _templateObject5 = function() {
        return data;
    };
    return data;
}
function _templateObject6() {
    const data = _tagged_template_literal._([
        "",
        ".length"
    ]);
    _templateObject6 = function() {
        return data;
    };
    return data;
}
function _templateObject7() {
    const data = _tagged_template_literal._([
        "",
        ".evaluated.props"
    ]);
    _templateObject7 = function() {
        return data;
    };
    return data;
}
function _templateObject8() {
    const data = _tagged_template_literal._([
        "",
        ".evaluated.items"
    ]);
    _templateObject8 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.callRef = exports.getValidate = void 0;
const ref_error_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/ref_error.js [app-client] (ecmascript)");
const code_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/code.js [app-client] (ecmascript)");
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const names_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/names.js [app-client] (ecmascript)");
const compile_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const def = {
    keyword: "$ref",
    schemaType: "string",
    code (cxt) {
        const { gen, schema: $ref, it } = cxt;
        const { baseId, schemaEnv: env, validateName, opts, self } = it;
        const { root } = env;
        if (($ref === "#" || $ref === "#/") && baseId === root.baseId) return callRootRef();
        const schOrEnv = compile_1.resolveRef.call(self, root, baseId, $ref);
        if (schOrEnv === undefined) throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
        if (schOrEnv instanceof compile_1.SchemaEnv) return callValidate(schOrEnv);
        return inlineRefSchema(schOrEnv);
        //TURBOPACK unreachable
        ;
        function callRootRef() {
            if (env === root) return callRef(cxt, validateName, env, env.$async);
            const rootName = gen.scopeValue("root", {
                ref: root
            });
            return callRef(cxt, (0, codegen_1._)(_templateObject(), rootName), root, root.$async);
        }
        function callValidate(sch) {
            const v = getValidate(cxt, sch);
            callRef(cxt, v, sch, sch.$async);
        }
        function inlineRefSchema(sch) {
            const schName = gen.scopeValue("schema", opts.code.source === true ? {
                ref: sch,
                code: (0, codegen_1.stringify)(sch)
            } : {
                ref: sch
            });
            const valid = gen.name("valid");
            const schCxt = cxt.subschema({
                schema: sch,
                dataTypes: [],
                schemaPath: codegen_1.nil,
                topSchemaRef: schName,
                errSchemaPath: $ref
            }, valid);
            cxt.mergeEvaluated(schCxt);
            cxt.ok(valid);
        }
    }
};
function getValidate(cxt, sch) {
    const { gen } = cxt;
    return sch.validate ? gen.scopeValue("validate", {
        ref: sch.validate
    }) : (0, codegen_1._)(_templateObject1(), gen.scopeValue("wrapper", {
        ref: sch
    }));
}
exports.getValidate = getValidate;
function callRef(cxt, v, sch, $async) {
    const { gen, it } = cxt;
    const { allErrors, schemaEnv: env, opts } = it;
    const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
    if ($async) callAsyncRef();
    else callSyncRef();
    function callAsyncRef() {
        if (!env.$async) throw new Error("async schema referenced by sync schema");
        const valid = gen.let("valid");
        gen.try(()=>{
            gen.code((0, codegen_1._)(_templateObject2(), (0, code_1.callValidateCode)(cxt, v, passCxt)));
            addEvaluatedFrom(v); // TODO will not work with async, it has to be returned with the result
            if (!allErrors) gen.assign(valid, true);
        }, (e)=>{
            gen.if((0, codegen_1._)(_templateObject3(), e, it.ValidationError), ()=>gen.throw(e));
            addErrorsFrom(e);
            if (!allErrors) gen.assign(valid, false);
        });
        cxt.ok(valid);
    }
    function callSyncRef() {
        cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), ()=>addEvaluatedFrom(v), ()=>addErrorsFrom(v));
    }
    function addErrorsFrom(source) {
        const errs = (0, codegen_1._)(_templateObject4(), source);
        gen.assign(names_1.default.vErrors, (0, codegen_1._)(_templateObject5(), names_1.default.vErrors, errs, names_1.default.vErrors, errs)); // TODO tagged
        gen.assign(names_1.default.errors, (0, codegen_1._)(_templateObject6(), names_1.default.vErrors));
    }
    function addEvaluatedFrom(source) {
        var _a;
        if (!it.opts.unevaluated) return;
        const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
        // TODO refactor
        if (it.props !== true) {
            if (schEvaluated && !schEvaluated.dynamicProps) {
                if (schEvaluated.props !== undefined) {
                    it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
                }
            } else {
                const props = gen.var("props", (0, codegen_1._)(_templateObject7(), source));
                it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
            }
        }
        if (it.items !== true) {
            if (schEvaluated && !schEvaluated.dynamicItems) {
                if (schEvaluated.items !== undefined) {
                    it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
                }
            } else {
                const items = gen.var("items", (0, codegen_1._)(_templateObject8(), source));
                it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
            }
        }
    }
}
exports.callRef = callRef;
exports.default = def; //# sourceMappingURL=ref.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/core/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const id_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/core/id.js [app-client] (ecmascript)");
const ref_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/core/ref.js [app-client] (ecmascript)");
const core = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    {
        keyword: "$comment"
    },
    "definitions",
    id_1.default,
    ref_1.default
];
exports.default = core; //# sourceMappingURL=index.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/limitNumber.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "must be ",
        " ",
        ""
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "{comparison: ",
        ", limit: ",
        "}"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "",
        " ",
        " ",
        " || isNaN(",
        ")"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const ops = codegen_1.operators;
const KWDs = {
    maximum: {
        okStr: "<=",
        ok: ops.LTE,
        fail: ops.GT
    },
    minimum: {
        okStr: ">=",
        ok: ops.GTE,
        fail: ops.LT
    },
    exclusiveMaximum: {
        okStr: "<",
        ok: ops.LT,
        fail: ops.GTE
    },
    exclusiveMinimum: {
        okStr: ">",
        ok: ops.GT,
        fail: ops.LTE
    }
};
const error = {
    message: (param)=>{
        let { keyword, schemaCode } = param;
        return (0, codegen_1.str)(_templateObject(), KWDs[keyword].okStr, schemaCode);
    },
    params: (param)=>{
        let { keyword, schemaCode } = param;
        return (0, codegen_1._)(_templateObject1(), KWDs[keyword].okStr, schemaCode);
    }
};
const def = {
    keyword: Object.keys(KWDs),
    type: "number",
    schemaType: "number",
    $data: true,
    error,
    code (cxt) {
        const { keyword, data, schemaCode } = cxt;
        cxt.fail$data((0, codegen_1._)(_templateObject2(), data, KWDs[keyword].fail, schemaCode, data));
    }
};
exports.default = def; //# sourceMappingURL=limitNumber.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/multipleOf.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "must be multiple of ",
        ""
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "{multipleOf: ",
        "}"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "Math.abs(Math.round(",
        ") - ",
        ") > 1e-",
        ""
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        "",
        " !== parseInt(",
        ")"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = _tagged_template_literal._([
        "(",
        " === 0 || (",
        " = ",
        "/",
        ", ",
        "))"
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const error = {
    message: (param)=>{
        let { schemaCode } = param;
        return (0, codegen_1.str)(_templateObject(), schemaCode);
    },
    params: (param)=>{
        let { schemaCode } = param;
        return (0, codegen_1._)(_templateObject1(), schemaCode);
    }
};
const def = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: true,
    error,
    code (cxt) {
        const { gen, data, schemaCode, it } = cxt;
        // const bdt = bad$DataType(schemaCode, <string>def.schemaType, $data)
        const prec = it.opts.multipleOfPrecision;
        const res = gen.let("res");
        const invalid = prec ? (0, codegen_1._)(_templateObject2(), res, res, prec) : (0, codegen_1._)(_templateObject3(), res, res);
        cxt.fail$data((0, codegen_1._)(_templateObject4(), schemaCode, res, data, schemaCode, invalid));
    }
};
exports.default = def; //# sourceMappingURL=multipleOf.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/runtime/ucs2length.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// https://mathiasbynens.be/notes/javascript-encoding
// https://github.com/bestiejs/punycode.js - punycode.ucs2.decode
function ucs2length(str) {
    const len = str.length;
    let length = 0;
    let pos = 0;
    let value;
    while(pos < len){
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 0xd800 && value <= 0xdbff && pos < len) {
            // high surrogate, and there is a next character
            value = str.charCodeAt(pos);
            if ((value & 0xfc00) === 0xdc00) pos++; // low surrogate
        }
    }
    return length;
}
exports.default = ucs2length;
ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default'; //# sourceMappingURL=ucs2length.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/limitLength.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "must NOT have ",
        " than ",
        " characters"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "{limit: ",
        "}"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "",
        ".length"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        "",
        "(",
        ")"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = _tagged_template_literal._([
        "",
        " ",
        " ",
        ""
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const ucs2length_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/runtime/ucs2length.js [app-client] (ecmascript)");
const error = {
    message (param) {
        let { keyword, schemaCode } = param;
        const comp = keyword === "maxLength" ? "more" : "fewer";
        return (0, codegen_1.str)(_templateObject(), comp, schemaCode);
    },
    params: (param)=>{
        let { schemaCode } = param;
        return (0, codegen_1._)(_templateObject1(), schemaCode);
    }
};
const def = {
    keyword: [
        "maxLength",
        "minLength"
    ],
    type: "string",
    schemaType: "number",
    $data: true,
    error,
    code (cxt) {
        const { keyword, data, schemaCode, it } = cxt;
        const op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
        const len = it.opts.unicode === false ? (0, codegen_1._)(_templateObject2(), data) : (0, codegen_1._)(_templateObject3(), (0, util_1.useFunc)(cxt.gen, ucs2length_1.default), data);
        cxt.fail$data((0, codegen_1._)(_templateObject4(), len, op, schemaCode));
    }
};
exports.default = def; //# sourceMappingURL=limitLength.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/pattern.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        'must match pattern "',
        '"'
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "{pattern: ",
        "}"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "(new RegExp(",
        ", ",
        "))"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        "!",
        ".test(",
        ")"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
const code_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/code.js [app-client] (ecmascript)");
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const error = {
    message: (param)=>{
        let { schemaCode } = param;
        return (0, codegen_1.str)(_templateObject(), schemaCode);
    },
    params: (param)=>{
        let { schemaCode } = param;
        return (0, codegen_1._)(_templateObject1(), schemaCode);
    }
};
const def = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: true,
    error,
    code (cxt) {
        const { data, $data, schema, schemaCode, it } = cxt;
        // TODO regexp should be wrapped in try/catchs
        const u = it.opts.unicodeRegExp ? "u" : "";
        const regExp = $data ? (0, codegen_1._)(_templateObject2(), schemaCode, u) : (0, code_1.usePattern)(cxt, schema);
        cxt.fail$data((0, codegen_1._)(_templateObject3(), regExp, data));
    }
};
exports.default = def; //# sourceMappingURL=pattern.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/limitProperties.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "must NOT have ",
        " than ",
        " properties"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "{limit: ",
        "}"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "Object.keys(",
        ").length ",
        " ",
        ""
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const error = {
    message (param) {
        let { keyword, schemaCode } = param;
        const comp = keyword === "maxProperties" ? "more" : "fewer";
        return (0, codegen_1.str)(_templateObject(), comp, schemaCode);
    },
    params: (param)=>{
        let { schemaCode } = param;
        return (0, codegen_1._)(_templateObject1(), schemaCode);
    }
};
const def = {
    keyword: [
        "maxProperties",
        "minProperties"
    ],
    type: "object",
    schemaType: "number",
    $data: true,
    error,
    code (cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._)(_templateObject2(), data, op, schemaCode));
    }
};
exports.default = def; //# sourceMappingURL=limitProperties.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/required.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "must have required property '",
        "'"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "{missingProperty: ",
        "}"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
const code_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/code.js [app-client] (ecmascript)");
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const error = {
    message: (param)=>{
        let { params: { missingProperty } } = param;
        return (0, codegen_1.str)(_templateObject(), missingProperty);
    },
    params: (param)=>{
        let { params: { missingProperty } } = param;
        return (0, codegen_1._)(_templateObject1(), missingProperty);
    }
};
const def = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: true,
    error,
    code (cxt) {
        const { gen, schema, schemaCode, data, $data, it } = cxt;
        const { opts } = it;
        if (!$data && schema.length === 0) return;
        const useLoop = schema.length >= opts.loopRequired;
        if (it.allErrors) allErrorsMode();
        else exitOnErrorMode();
        if (opts.strictRequired) {
            const props = cxt.parentSchema.properties;
            const { definedProperties } = cxt.it;
            for (const requiredKey of schema){
                if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === undefined && !definedProperties.has(requiredKey)) {
                    const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
                    const msg = 'required property "'.concat(requiredKey, '" is not defined at "').concat(schemaPath, '" (strictRequired)');
                    (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
                }
            }
        }
        function allErrorsMode() {
            if (useLoop || $data) {
                cxt.block$data(codegen_1.nil, loopAllRequired);
            } else {
                for (const prop of schema){
                    (0, code_1.checkReportMissingProp)(cxt, prop);
                }
            }
        }
        function exitOnErrorMode() {
            const missing = gen.let("missing");
            if (useLoop || $data) {
                const valid = gen.let("valid", true);
                cxt.block$data(valid, ()=>loopUntilMissing(missing, valid));
                cxt.ok(valid);
            } else {
                gen.if((0, code_1.checkMissingProp)(cxt, schema, missing));
                (0, code_1.reportMissingProp)(cxt, missing);
                gen.else();
            }
        }
        function loopAllRequired() {
            gen.forOf("prop", schemaCode, (prop)=>{
                cxt.setParams({
                    missingProperty: prop
                });
                gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), ()=>cxt.error());
            });
        }
        function loopUntilMissing(missing, valid) {
            cxt.setParams({
                missingProperty: missing
            });
            gen.forOf(missing, schemaCode, ()=>{
                gen.assign(valid, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties));
                gen.if((0, codegen_1.not)(valid), ()=>{
                    cxt.error();
                    gen.break();
                });
            }, codegen_1.nil);
        }
    }
};
exports.default = def; //# sourceMappingURL=required.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/limitItems.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "must NOT have ",
        " than ",
        " items"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "{limit: ",
        "}"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "",
        ".length ",
        " ",
        ""
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const error = {
    message (param) {
        let { keyword, schemaCode } = param;
        const comp = keyword === "maxItems" ? "more" : "fewer";
        return (0, codegen_1.str)(_templateObject(), comp, schemaCode);
    },
    params: (param)=>{
        let { schemaCode } = param;
        return (0, codegen_1._)(_templateObject1(), schemaCode);
    }
};
const def = {
    keyword: [
        "maxItems",
        "minItems"
    ],
    type: "array",
    schemaType: "number",
    $data: true,
    error,
    code (cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._)(_templateObject2(), data, op, schemaCode));
    }
};
exports.default = def; //# sourceMappingURL=limitItems.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/runtime/equal.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// https://github.com/ajv-validator/ajv/issues/889
const equal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/fast-deep-equal/index.js [app-client] (ecmascript)");
equal.code = 'require("ajv/dist/runtime/equal").default';
exports.default = equal; //# sourceMappingURL=equal.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/uniqueItems.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "must NOT have duplicate items (items ## ",
        " and ",
        " are identical)"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "{i: ",
        ", j: ",
        "}"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "",
        " === false"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        "",
        ".length"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = _tagged_template_literal._([
        "",
        " > 1"
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
function _templateObject5() {
    const data = _tagged_template_literal._([
        "{}"
    ]);
    _templateObject5 = function() {
        return data;
    };
    return data;
}
function _templateObject6() {
    const data = _tagged_template_literal._([
        ";",
        "--;"
    ]);
    _templateObject6 = function() {
        return data;
    };
    return data;
}
function _templateObject7() {
    const data = _tagged_template_literal._([
        "",
        "[",
        "]"
    ]);
    _templateObject7 = function() {
        return data;
    };
    return data;
}
function _templateObject8() {
    const data = _tagged_template_literal._([
        "continue"
    ]);
    _templateObject8 = function() {
        return data;
    };
    return data;
}
function _templateObject9() {
    const data = _tagged_template_literal._([
        "typeof ",
        ' == "string"'
    ]);
    _templateObject9 = function() {
        return data;
    };
    return data;
}
function _templateObject10() {
    const data = _tagged_template_literal._([
        "",
        ' += "_"'
    ]);
    _templateObject10 = function() {
        return data;
    };
    return data;
}
function _templateObject11() {
    const data = _tagged_template_literal._([
        "typeof ",
        "[",
        '] == "number"'
    ]);
    _templateObject11 = function() {
        return data;
    };
    return data;
}
function _templateObject12() {
    const data = _tagged_template_literal._([
        "",
        "[",
        "]"
    ]);
    _templateObject12 = function() {
        return data;
    };
    return data;
}
function _templateObject13() {
    const data = _tagged_template_literal._([
        "",
        "[",
        "] = ",
        ""
    ]);
    _templateObject13 = function() {
        return data;
    };
    return data;
}
function _templateObject14() {
    const data = _tagged_template_literal._([
        ";",
        "--;"
    ]);
    _templateObject14 = function() {
        return data;
    };
    return data;
}
function _templateObject15() {
    const data = _tagged_template_literal._([
        "",
        " = ",
        "; ",
        "--;"
    ]);
    _templateObject15 = function() {
        return data;
    };
    return data;
}
function _templateObject16() {
    const data = _tagged_template_literal._([
        "",
        "(",
        "[",
        "], ",
        "[",
        "])"
    ]);
    _templateObject16 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
const dataType_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/validate/dataType.js [app-client] (ecmascript)");
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const equal_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/runtime/equal.js [app-client] (ecmascript)");
const error = {
    message: (param)=>{
        let { params: { i, j } } = param;
        return (0, codegen_1.str)(_templateObject(), j, i);
    },
    params: (param)=>{
        let { params: { i, j } } = param;
        return (0, codegen_1._)(_templateObject1(), i, j);
    }
};
const def = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: true,
    error,
    code (cxt) {
        const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
        if (!$data && !schema) return;
        const valid = gen.let("valid");
        const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
        cxt.block$data(valid, validateUniqueItems, (0, codegen_1._)(_templateObject2(), schemaCode));
        cxt.ok(valid);
        function validateUniqueItems() {
            const i = gen.let("i", (0, codegen_1._)(_templateObject3(), data));
            const j = gen.let("j");
            cxt.setParams({
                i,
                j
            });
            gen.assign(valid, true);
            gen.if((0, codegen_1._)(_templateObject4(), i), ()=>(canOptimize() ? loopN : loopN2)(i, j));
        }
        function canOptimize() {
            return itemTypes.length > 0 && !itemTypes.some((t)=>t === "object" || t === "array");
        }
        function loopN(i, j) {
            const item = gen.name("item");
            const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
            const indices = gen.const("indices", (0, codegen_1._)(_templateObject5()));
            gen.for((0, codegen_1._)(_templateObject6(), i), ()=>{
                gen.let(item, (0, codegen_1._)(_templateObject7(), data, i));
                gen.if(wrongType, (0, codegen_1._)(_templateObject8()));
                if (itemTypes.length > 1) gen.if((0, codegen_1._)(_templateObject9(), item), (0, codegen_1._)(_templateObject10(), item));
                gen.if((0, codegen_1._)(_templateObject11(), indices, item), ()=>{
                    gen.assign(j, (0, codegen_1._)(_templateObject12(), indices, item));
                    cxt.error();
                    gen.assign(valid, false).break();
                }).code((0, codegen_1._)(_templateObject13(), indices, item, i));
            });
        }
        function loopN2(i, j) {
            const eql = (0, util_1.useFunc)(gen, equal_1.default);
            const outer = gen.name("outer");
            gen.label(outer).for((0, codegen_1._)(_templateObject14(), i), ()=>gen.for((0, codegen_1._)(_templateObject15(), j, i, j), ()=>gen.if((0, codegen_1._)(_templateObject16(), eql, data, i, data, j), ()=>{
                        cxt.error();
                        gen.assign(valid, false).break(outer);
                    })));
        }
    }
};
exports.default = def; //# sourceMappingURL=uniqueItems.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/const.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "{allowedValue: ",
        "}"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "!",
        "(",
        ", ",
        ")"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "",
        " !== ",
        ""
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const equal_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/runtime/equal.js [app-client] (ecmascript)");
const error = {
    message: "must be equal to constant",
    params: (param)=>{
        let { schemaCode } = param;
        return (0, codegen_1._)(_templateObject(), schemaCode);
    }
};
const def = {
    keyword: "const",
    $data: true,
    error,
    code (cxt) {
        const { gen, data, $data, schemaCode, schema } = cxt;
        if ($data || schema && typeof schema == "object") {
            cxt.fail$data((0, codegen_1._)(_templateObject1(), (0, util_1.useFunc)(gen, equal_1.default), data, schemaCode));
        } else {
            cxt.fail((0, codegen_1._)(_templateObject2(), schema, data));
        }
    }
};
exports.default = def; //# sourceMappingURL=const.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/enum.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "{allowedValues: ",
        "}"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "",
        "(",
        ", ",
        ")"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "",
        "(",
        ", ",
        "[",
        "])"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        "",
        " === ",
        ""
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const equal_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/runtime/equal.js [app-client] (ecmascript)");
const error = {
    message: "must be equal to one of the allowed values",
    params: (param)=>{
        let { schemaCode } = param;
        return (0, codegen_1._)(_templateObject(), schemaCode);
    }
};
const def = {
    keyword: "enum",
    schemaType: "array",
    $data: true,
    error,
    code (cxt) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        if (!$data && schema.length === 0) throw new Error("enum must have non-empty array");
        const useLoop = schema.length >= it.opts.loopEnum;
        let eql;
        const getEql = ()=>eql !== null && eql !== void 0 ? eql : eql = (0, util_1.useFunc)(gen, equal_1.default);
        let valid;
        if (useLoop || $data) {
            valid = gen.let("valid");
            cxt.block$data(valid, loopEnum);
        } else {
            /* istanbul ignore if */ if (!Array.isArray(schema)) throw new Error("ajv implementation error");
            const vSchema = gen.const("vSchema", schemaCode);
            valid = (0, codegen_1.or)(...schema.map((_x, i)=>equalCode(vSchema, i)));
        }
        cxt.pass(valid);
        function loopEnum() {
            gen.assign(valid, false);
            gen.forOf("v", schemaCode, (v)=>gen.if((0, codegen_1._)(_templateObject1(), getEql(), data, v), ()=>gen.assign(valid, true).break()));
        }
        function equalCode(vSchema, i) {
            const sch = schema[i];
            return typeof sch === "object" && sch !== null ? (0, codegen_1._)(_templateObject2(), getEql(), data, vSchema, i) : (0, codegen_1._)(_templateObject3(), data, sch);
        }
    }
};
exports.default = def; //# sourceMappingURL=enum.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const limitNumber_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/limitNumber.js [app-client] (ecmascript)");
const multipleOf_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/multipleOf.js [app-client] (ecmascript)");
const limitLength_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/limitLength.js [app-client] (ecmascript)");
const pattern_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/pattern.js [app-client] (ecmascript)");
const limitProperties_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/limitProperties.js [app-client] (ecmascript)");
const required_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/required.js [app-client] (ecmascript)");
const limitItems_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/limitItems.js [app-client] (ecmascript)");
const uniqueItems_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/uniqueItems.js [app-client] (ecmascript)");
const const_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/const.js [app-client] (ecmascript)");
const enum_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/enum.js [app-client] (ecmascript)");
const validation = [
    // number
    limitNumber_1.default,
    multipleOf_1.default,
    // string
    limitLength_1.default,
    pattern_1.default,
    // object
    limitProperties_1.default,
    required_1.default,
    // array
    limitItems_1.default,
    uniqueItems_1.default,
    // any
    {
        keyword: "type",
        schemaType: [
            "string",
            "array"
        ]
    },
    {
        keyword: "nullable",
        schemaType: "boolean"
    },
    const_1.default,
    enum_1.default
];
exports.default = validation; //# sourceMappingURL=index.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/additionalItems.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "must NOT have more than ",
        " items"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "{limit: ",
        "}"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "",
        ".length"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        "",
        " <= ",
        ""
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = _tagged_template_literal._([
        "",
        " <= ",
        ""
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateAdditionalItems = void 0;
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const error = {
    message: (param)=>{
        let { params: { len } } = param;
        return (0, codegen_1.str)(_templateObject(), len);
    },
    params: (param)=>{
        let { params: { len } } = param;
        return (0, codegen_1._)(_templateObject1(), len);
    }
};
const def = {
    keyword: "additionalItems",
    type: "array",
    schemaType: [
        "boolean",
        "object"
    ],
    before: "uniqueItems",
    error,
    code (cxt) {
        const { parentSchema, it } = cxt;
        const { items } = parentSchema;
        if (!Array.isArray(items)) {
            (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
            return;
        }
        validateAdditionalItems(cxt, items);
    }
};
function validateAdditionalItems(cxt, items) {
    const { gen, schema, data, keyword, it } = cxt;
    it.items = true;
    const len = gen.const("len", (0, codegen_1._)(_templateObject2(), data));
    if (schema === false) {
        cxt.setParams({
            len: items.length
        });
        cxt.pass((0, codegen_1._)(_templateObject3(), len, items.length));
    } else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
        const valid = gen.var("valid", (0, codegen_1._)(_templateObject4(), len, items.length)); // TODO var
        gen.if((0, codegen_1.not)(valid), ()=>validateItems(valid));
        cxt.ok(valid);
    }
    function validateItems(valid) {
        gen.forRange("i", items.length, len, (i)=>{
            cxt.subschema({
                keyword,
                dataProp: i,
                dataPropType: util_1.Type.Num
            }, valid);
            if (!it.allErrors) gen.if((0, codegen_1.not)(valid), ()=>gen.break());
        });
    }
}
exports.validateAdditionalItems = validateAdditionalItems;
exports.default = def; //# sourceMappingURL=additionalItems.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/items.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "",
        ".length"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "",
        " > ",
        ""
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateTuple = void 0;
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const code_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/code.js [app-client] (ecmascript)");
const def = {
    keyword: "items",
    type: "array",
    schemaType: [
        "object",
        "array",
        "boolean"
    ],
    before: "uniqueItems",
    code (cxt) {
        const { schema, it } = cxt;
        if (Array.isArray(schema)) return validateTuple(cxt, "additionalItems", schema);
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema)) return;
        cxt.ok((0, code_1.validateArray)(cxt));
    }
};
function validateTuple(cxt, extraItems) {
    let schArr = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : cxt.schema;
    const { gen, parentSchema, data, keyword, it } = cxt;
    checkStrictTuple(parentSchema);
    if (it.opts.unevaluated && schArr.length && it.items !== true) {
        it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
    }
    const valid = gen.name("valid");
    const len = gen.const("len", (0, codegen_1._)(_templateObject(), data));
    schArr.forEach((sch, i)=>{
        if ((0, util_1.alwaysValidSchema)(it, sch)) return;
        gen.if((0, codegen_1._)(_templateObject1(), len, i), ()=>cxt.subschema({
                keyword,
                schemaProp: i,
                dataProp: i
            }, valid));
        cxt.ok(valid);
    });
    function checkStrictTuple(sch) {
        const { opts, errSchemaPath } = it;
        const l = schArr.length;
        const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
        if (opts.strictTuples && !fullTuple) {
            const msg = '"'.concat(keyword, '" is ').concat(l, "-tuple, but minItems or maxItems/").concat(extraItems, ' are not specified or different at path "').concat(errSchemaPath, '"');
            (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
        }
    }
}
exports.validateTuple = validateTuple;
exports.default = def; //# sourceMappingURL=items.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/prefixItems.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const items_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/items.js [app-client] (ecmascript)");
const def = {
    keyword: "prefixItems",
    type: "array",
    schemaType: [
        "array"
    ],
    before: "uniqueItems",
    code: (cxt)=>(0, items_1.validateTuple)(cxt, "items")
};
exports.default = def; //# sourceMappingURL=prefixItems.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/items2020.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "must NOT have more than ",
        " items"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "{limit: ",
        "}"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const code_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/code.js [app-client] (ecmascript)");
const additionalItems_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/additionalItems.js [app-client] (ecmascript)");
const error = {
    message: (param)=>{
        let { params: { len } } = param;
        return (0, codegen_1.str)(_templateObject(), len);
    },
    params: (param)=>{
        let { params: { len } } = param;
        return (0, codegen_1._)(_templateObject1(), len);
    }
};
const def = {
    keyword: "items",
    type: "array",
    schemaType: [
        "object",
        "boolean"
    ],
    before: "uniqueItems",
    error,
    code (cxt) {
        const { schema, parentSchema, it } = cxt;
        const { prefixItems } = parentSchema;
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema)) return;
        if (prefixItems) (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems);
        else cxt.ok((0, code_1.validateArray)(cxt));
    }
};
exports.default = def; //# sourceMappingURL=items2020.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/contains.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "must contain at least ",
        " valid item(s)"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "must contain at least ",
        " and no more than ",
        " valid item(s)"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "{minContains: ",
        "}"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        "{minContains: ",
        ", maxContains: ",
        "}"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = _tagged_template_literal._([
        "",
        ".length"
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
function _templateObject5() {
    const data = _tagged_template_literal._([
        "",
        " >= ",
        ""
    ]);
    _templateObject5 = function() {
        return data;
    };
    return data;
}
function _templateObject6() {
    const data = _tagged_template_literal._([
        "",
        " && ",
        " <= ",
        ""
    ]);
    _templateObject6 = function() {
        return data;
    };
    return data;
}
function _templateObject7() {
    const data = _tagged_template_literal._([
        "",
        ".length > 0"
    ]);
    _templateObject7 = function() {
        return data;
    };
    return data;
}
function _templateObject8() {
    const data = _tagged_template_literal._([
        "",
        "++"
    ]);
    _templateObject8 = function() {
        return data;
    };
    return data;
}
function _templateObject9() {
    const data = _tagged_template_literal._([
        "",
        " >= ",
        ""
    ]);
    _templateObject9 = function() {
        return data;
    };
    return data;
}
function _templateObject10() {
    const data = _tagged_template_literal._([
        "",
        " > ",
        ""
    ]);
    _templateObject10 = function() {
        return data;
    };
    return data;
}
function _templateObject11() {
    const data = _tagged_template_literal._([
        "",
        " >= ",
        ""
    ]);
    _templateObject11 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const error = {
    message: (param)=>{
        let { params: { min, max } } = param;
        return max === undefined ? (0, codegen_1.str)(_templateObject(), min) : (0, codegen_1.str)(_templateObject1(), min, max);
    },
    params: (param)=>{
        let { params: { min, max } } = param;
        return max === undefined ? (0, codegen_1._)(_templateObject2(), min) : (0, codegen_1._)(_templateObject3(), min, max);
    }
};
const def = {
    keyword: "contains",
    type: "array",
    schemaType: [
        "object",
        "boolean"
    ],
    before: "uniqueItems",
    trackErrors: true,
    error,
    code (cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        let min;
        let max;
        const { minContains, maxContains } = parentSchema;
        if (it.opts.next) {
            min = minContains === undefined ? 1 : minContains;
            max = maxContains;
        } else {
            min = 1;
        }
        const len = gen.const("len", (0, codegen_1._)(_templateObject4(), data));
        cxt.setParams({
            min,
            max
        });
        if (max === undefined && min === 0) {
            (0, util_1.checkStrictMode)(it, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
            return;
        }
        if (max !== undefined && min > max) {
            (0, util_1.checkStrictMode)(it, '"minContains" > "maxContains" is always invalid');
            cxt.fail();
            return;
        }
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
            let cond = (0, codegen_1._)(_templateObject5(), len, min);
            if (max !== undefined) cond = (0, codegen_1._)(_templateObject6(), cond, len, max);
            cxt.pass(cond);
            return;
        }
        it.items = true;
        const valid = gen.name("valid");
        if (max === undefined && min === 1) {
            validateItems(valid, ()=>gen.if(valid, ()=>gen.break()));
        } else if (min === 0) {
            gen.let(valid, true);
            if (max !== undefined) gen.if((0, codegen_1._)(_templateObject7(), data), validateItemsWithCount);
        } else {
            gen.let(valid, false);
            validateItemsWithCount();
        }
        cxt.result(valid, ()=>cxt.reset());
        function validateItemsWithCount() {
            const schValid = gen.name("_valid");
            const count = gen.let("count", 0);
            validateItems(schValid, ()=>gen.if(schValid, ()=>checkLimits(count)));
        }
        function validateItems(_valid, block) {
            gen.forRange("i", 0, len, (i)=>{
                cxt.subschema({
                    keyword: "contains",
                    dataProp: i,
                    dataPropType: util_1.Type.Num,
                    compositeRule: true
                }, _valid);
                block();
            });
        }
        function checkLimits(count) {
            gen.code((0, codegen_1._)(_templateObject8(), count));
            if (max === undefined) {
                gen.if((0, codegen_1._)(_templateObject9(), count, min), ()=>gen.assign(valid, true).break());
            } else {
                gen.if((0, codegen_1._)(_templateObject10(), count, max), ()=>gen.assign(valid, false).break());
                if (min === 1) gen.assign(valid, true);
                else gen.if((0, codegen_1._)(_templateObject11(), count, min), ()=>gen.assign(valid, true));
            }
        }
    }
};
exports.default = def; //# sourceMappingURL=contains.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/dependencies.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "must have ",
        " ",
        " when property ",
        " is present"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "{property: ",
        ",\n    missingProperty: ",
        ",\n    depsCount: ",
        ",\n    deps: ",
        "}"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "",
        " && (",
        ")"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const code_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/code.js [app-client] (ecmascript)");
exports.error = {
    message: (param)=>{
        let { params: { property, depsCount, deps } } = param;
        const property_ies = depsCount === 1 ? "property" : "properties";
        return (0, codegen_1.str)(_templateObject(), property_ies, deps, property);
    },
    params: (param)=>{
        let { params: { property, depsCount, deps, missingProperty } } = param;
        return (0, codegen_1._)(_templateObject1(), property, missingProperty, depsCount, deps);
    }
};
const def = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: exports.error,
    code (cxt) {
        const [propDeps, schDeps] = splitDependencies(cxt);
        validatePropertyDeps(cxt, propDeps);
        validateSchemaDeps(cxt, schDeps);
    }
};
function splitDependencies(param) {
    let { schema } = param;
    const propertyDeps = {};
    const schemaDeps = {};
    for(const key in schema){
        if (key === "__proto__") continue;
        const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
        deps[key] = schema[key];
    }
    return [
        propertyDeps,
        schemaDeps
    ];
}
function validatePropertyDeps(cxt) {
    let propertyDeps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : cxt.schema;
    const { gen, data, it } = cxt;
    if (Object.keys(propertyDeps).length === 0) return;
    const missing = gen.let("missing");
    for(const prop in propertyDeps){
        const deps = propertyDeps[prop];
        if (deps.length === 0) continue;
        const hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
        cxt.setParams({
            property: prop,
            depsCount: deps.length,
            deps: deps.join(", ")
        });
        if (it.allErrors) {
            gen.if(hasProperty, ()=>{
                for (const depProp of deps){
                    (0, code_1.checkReportMissingProp)(cxt, depProp);
                }
            });
        } else {
            gen.if((0, codegen_1._)(_templateObject2(), hasProperty, (0, code_1.checkMissingProp)(cxt, deps, missing)));
            (0, code_1.reportMissingProp)(cxt, missing);
            gen.else();
        }
    }
}
exports.validatePropertyDeps = validatePropertyDeps;
function validateSchemaDeps(cxt) {
    let schemaDeps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : cxt.schema;
    const { gen, data, keyword, it } = cxt;
    const valid = gen.name("valid");
    for(const prop in schemaDeps){
        if ((0, util_1.alwaysValidSchema)(it, schemaDeps[prop])) continue;
        gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties), ()=>{
            const schCxt = cxt.subschema({
                keyword,
                schemaProp: prop
            }, valid);
            cxt.mergeValidEvaluated(schCxt, valid);
        }, ()=>gen.var(valid, true) // TODO var
        );
        cxt.ok(valid);
    }
}
exports.validateSchemaDeps = validateSchemaDeps;
exports.default = def; //# sourceMappingURL=dependencies.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/propertyNames.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "{propertyName: ",
        "}"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const error = {
    message: "property name must be valid",
    params: (param)=>{
        let { params } = param;
        return (0, codegen_1._)(_templateObject(), params.propertyName);
    }
};
const def = {
    keyword: "propertyNames",
    type: "object",
    schemaType: [
        "object",
        "boolean"
    ],
    error,
    code (cxt) {
        const { gen, schema, data, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema)) return;
        const valid = gen.name("valid");
        gen.forIn("key", data, (key)=>{
            cxt.setParams({
                propertyName: key
            });
            cxt.subschema({
                keyword: "propertyNames",
                data: key,
                dataTypes: [
                    "string"
                ],
                propertyName: key,
                compositeRule: true
            }, valid);
            gen.if((0, codegen_1.not)(valid), ()=>{
                cxt.error(true);
                if (!it.allErrors) gen.break();
            });
        });
        cxt.ok(valid);
    }
};
exports.default = def; //# sourceMappingURL=propertyNames.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "{additionalProperty: ",
        "}"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "",
        " === ",
        ""
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "",
        " === ",
        ""
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        "",
        ".test(",
        ")"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = _tagged_template_literal._([
        "delete ",
        "[",
        "]"
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
const code_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/code.js [app-client] (ecmascript)");
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const names_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/names.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const error = {
    message: "must NOT have additional properties",
    params: (param)=>{
        let { params } = param;
        return (0, codegen_1._)(_templateObject(), params.additionalProperty);
    }
};
const def = {
    keyword: "additionalProperties",
    type: [
        "object"
    ],
    schemaType: [
        "boolean",
        "object"
    ],
    allowUndefined: true,
    trackErrors: true,
    error,
    code (cxt) {
        const { gen, schema, parentSchema, data, errsCount, it } = cxt;
        /* istanbul ignore if */ if (!errsCount) throw new Error("ajv implementation error");
        const { allErrors, opts } = it;
        it.props = true;
        if (opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema)) return;
        const props = (0, code_1.allSchemaProperties)(parentSchema.properties);
        const patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
        checkAdditionalProperties();
        cxt.ok((0, codegen_1._)(_templateObject1(), errsCount, names_1.default.errors));
        function checkAdditionalProperties() {
            gen.forIn("key", data, (key)=>{
                if (!props.length && !patProps.length) additionalPropertyCode(key);
                else gen.if(isAdditional(key), ()=>additionalPropertyCode(key));
            });
        }
        function isAdditional(key) {
            let definedProp;
            if (props.length > 8) {
                // TODO maybe an option instead of hard-coded 8?
                const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
                definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
            } else if (props.length) {
                definedProp = (0, codegen_1.or)(...props.map((p)=>(0, codegen_1._)(_templateObject2(), key, p)));
            } else {
                definedProp = codegen_1.nil;
            }
            if (patProps.length) {
                definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p)=>(0, codegen_1._)(_templateObject3(), (0, code_1.usePattern)(cxt, p), key)));
            }
            return (0, codegen_1.not)(definedProp);
        }
        function deleteAdditional(key) {
            gen.code((0, codegen_1._)(_templateObject4(), data, key));
        }
        function additionalPropertyCode(key) {
            if (opts.removeAdditional === "all" || opts.removeAdditional && schema === false) {
                deleteAdditional(key);
                return;
            }
            if (schema === false) {
                cxt.setParams({
                    additionalProperty: key
                });
                cxt.error();
                if (!allErrors) gen.break();
                return;
            }
            if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
                const valid = gen.name("valid");
                if (opts.removeAdditional === "failing") {
                    applyAdditionalSchema(key, valid, false);
                    gen.if((0, codegen_1.not)(valid), ()=>{
                        cxt.reset();
                        deleteAdditional(key);
                    });
                } else {
                    applyAdditionalSchema(key, valid);
                    if (!allErrors) gen.if((0, codegen_1.not)(valid), ()=>gen.break());
                }
            }
        }
        function applyAdditionalSchema(key, valid, errors) {
            const subschema = {
                keyword: "additionalProperties",
                dataProp: key,
                dataPropType: util_1.Type.Str
            };
            if (errors === false) {
                Object.assign(subschema, {
                    compositeRule: true,
                    createErrors: false,
                    allErrors: false
                });
            }
            cxt.subschema(subschema, valid);
        }
    }
};
exports.default = def; //# sourceMappingURL=additionalProperties.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/properties.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const validate_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/validate/index.js [app-client] (ecmascript)");
const code_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/code.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const additionalProperties_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js [app-client] (ecmascript)");
const def = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code (cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === undefined) {
            additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
        }
        const allProps = (0, code_1.allSchemaProperties)(schema);
        for (const prop of allProps){
            it.definedProperties.add(prop);
        }
        if (it.opts.unevaluated && allProps.length && it.props !== true) {
            it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props);
        }
        const properties = allProps.filter((p)=>!(0, util_1.alwaysValidSchema)(it, schema[p]));
        if (properties.length === 0) return;
        const valid = gen.name("valid");
        for (const prop of properties){
            if (hasDefault(prop)) {
                applyPropertySchema(prop);
            } else {
                gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties));
                applyPropertySchema(prop);
                if (!it.allErrors) gen.else().var(valid, true);
                gen.endIf();
            }
            cxt.it.definedProperties.add(prop);
            cxt.ok(valid);
        }
        function hasDefault(prop) {
            return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== undefined;
        }
        function applyPropertySchema(prop) {
            cxt.subschema({
                keyword: "properties",
                schemaProp: prop,
                dataProp: prop
            }, valid);
        }
    }
};
exports.default = def; //# sourceMappingURL=properties.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/patternProperties.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "",
        ".test(",
        ")"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "",
        "[",
        "]"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
const code_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/code.js [app-client] (ecmascript)");
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const util_2 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const def = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code (cxt) {
        const { gen, schema, data, parentSchema, it } = cxt;
        const { opts } = it;
        const patterns = (0, code_1.allSchemaProperties)(schema);
        const alwaysValidPatterns = patterns.filter((p)=>(0, util_1.alwaysValidSchema)(it, schema[p]));
        if (patterns.length === 0 || alwaysValidPatterns.length === patterns.length && (!it.opts.unevaluated || it.props === true)) {
            return;
        }
        const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
        const valid = gen.name("valid");
        if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
            it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
        }
        const { props } = it;
        validatePatternProperties();
        function validatePatternProperties() {
            for (const pat of patterns){
                if (checkProperties) checkMatchingProperties(pat);
                if (it.allErrors) {
                    validateProperties(pat);
                } else {
                    gen.var(valid, true); // TODO var
                    validateProperties(pat);
                    gen.if(valid);
                }
            }
        }
        function checkMatchingProperties(pat) {
            for(const prop in checkProperties){
                if (new RegExp(pat).test(prop)) {
                    (0, util_1.checkStrictMode)(it, "property ".concat(prop, " matches pattern ").concat(pat, " (use allowMatchingProperties)"));
                }
            }
        }
        function validateProperties(pat) {
            gen.forIn("key", data, (key)=>{
                gen.if((0, codegen_1._)(_templateObject(), (0, code_1.usePattern)(cxt, pat), key), ()=>{
                    const alwaysValid = alwaysValidPatterns.includes(pat);
                    if (!alwaysValid) {
                        cxt.subschema({
                            keyword: "patternProperties",
                            schemaProp: pat,
                            dataProp: key,
                            dataPropType: util_2.Type.Str
                        }, valid);
                    }
                    if (it.opts.unevaluated && props !== true) {
                        gen.assign((0, codegen_1._)(_templateObject1(), props, key), true);
                    } else if (!alwaysValid && !it.allErrors) {
                        // can short-circuit if `unevaluatedProperties` is not supported (opts.next === false)
                        // or if all properties were evaluated (props === true)
                        gen.if((0, codegen_1.not)(valid), ()=>gen.break());
                    }
                });
            });
        }
    }
};
exports.default = def; //# sourceMappingURL=patternProperties.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/not.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const def = {
    keyword: "not",
    schemaType: [
        "object",
        "boolean"
    ],
    trackErrors: true,
    code (cxt) {
        const { gen, schema, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
            cxt.fail();
            return;
        }
        const valid = gen.name("valid");
        cxt.subschema({
            keyword: "not",
            compositeRule: true,
            createErrors: false,
            allErrors: false
        }, valid);
        cxt.failResult(valid, ()=>cxt.reset(), ()=>cxt.error());
    },
    error: {
        message: "must NOT be valid"
    }
};
exports.default = def; //# sourceMappingURL=not.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/anyOf.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const code_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/code.js [app-client] (ecmascript)");
const def = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: true,
    code: code_1.validateUnion,
    error: {
        message: "must match a schema in anyOf"
    }
};
exports.default = def; //# sourceMappingURL=anyOf.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/oneOf.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "{passingSchemas: ",
        "}"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "",
        " && ",
        ""
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "[",
        ", ",
        "]"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const error = {
    message: "must match exactly one schema in oneOf",
    params: (param)=>{
        let { params } = param;
        return (0, codegen_1._)(_templateObject(), params.passing);
    }
};
const def = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: true,
    error,
    code (cxt) {
        const { gen, schema, parentSchema, it } = cxt;
        /* istanbul ignore if */ if (!Array.isArray(schema)) throw new Error("ajv implementation error");
        if (it.opts.discriminator && parentSchema.discriminator) return;
        const schArr = schema;
        const valid = gen.let("valid", false);
        const passing = gen.let("passing", null);
        const schValid = gen.name("_valid");
        cxt.setParams({
            passing
        });
        // TODO possibly fail straight away (with warning or exception) if there are two empty always valid schemas
        gen.block(validateOneOf);
        cxt.result(valid, ()=>cxt.reset(), ()=>cxt.error(true));
        function validateOneOf() {
            schArr.forEach((sch, i)=>{
                let schCxt;
                if ((0, util_1.alwaysValidSchema)(it, sch)) {
                    gen.var(schValid, true);
                } else {
                    schCxt = cxt.subschema({
                        keyword: "oneOf",
                        schemaProp: i,
                        compositeRule: true
                    }, schValid);
                }
                if (i > 0) {
                    gen.if((0, codegen_1._)(_templateObject1(), schValid, valid)).assign(valid, false).assign(passing, (0, codegen_1._)(_templateObject2(), passing, i)).else();
                }
                gen.if(schValid, ()=>{
                    gen.assign(valid, true);
                    gen.assign(passing, i);
                    if (schCxt) cxt.mergeEvaluated(schCxt, codegen_1.Name);
                });
            });
        }
    }
};
exports.default = def; //# sourceMappingURL=oneOf.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/allOf.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const def = {
    keyword: "allOf",
    schemaType: "array",
    code (cxt) {
        const { gen, schema, it } = cxt;
        /* istanbul ignore if */ if (!Array.isArray(schema)) throw new Error("ajv implementation error");
        const valid = gen.name("valid");
        schema.forEach((sch, i)=>{
            if ((0, util_1.alwaysValidSchema)(it, sch)) return;
            const schCxt = cxt.subschema({
                keyword: "allOf",
                schemaProp: i
            }, valid);
            cxt.ok(valid);
            cxt.mergeEvaluated(schCxt);
        });
    }
};
exports.default = def; //# sourceMappingURL=allOf.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/if.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        'must match "',
        '" schema'
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "{failingKeyword: ",
        "}"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "",
        ""
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const error = {
    message: (param)=>{
        let { params } = param;
        return (0, codegen_1.str)(_templateObject(), params.ifClause);
    },
    params: (param)=>{
        let { params } = param;
        return (0, codegen_1._)(_templateObject1(), params.ifClause);
    }
};
const def = {
    keyword: "if",
    schemaType: [
        "object",
        "boolean"
    ],
    trackErrors: true,
    error,
    code (cxt) {
        const { gen, parentSchema, it } = cxt;
        if (parentSchema.then === undefined && parentSchema.else === undefined) {
            (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
        }
        const hasThen = hasSchema(it, "then");
        const hasElse = hasSchema(it, "else");
        if (!hasThen && !hasElse) return;
        const valid = gen.let("valid", true);
        const schValid = gen.name("_valid");
        validateIf();
        cxt.reset();
        if (hasThen && hasElse) {
            const ifClause = gen.let("ifClause");
            cxt.setParams({
                ifClause
            });
            gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
        } else if (hasThen) {
            gen.if(schValid, validateClause("then"));
        } else {
            gen.if((0, codegen_1.not)(schValid), validateClause("else"));
        }
        cxt.pass(valid, ()=>cxt.error(true));
        function validateIf() {
            const schCxt = cxt.subschema({
                keyword: "if",
                compositeRule: true,
                createErrors: false,
                allErrors: false
            }, schValid);
            cxt.mergeEvaluated(schCxt);
        }
        function validateClause(keyword, ifClause) {
            return ()=>{
                const schCxt = cxt.subschema({
                    keyword
                }, schValid);
                gen.assign(valid, schValid);
                cxt.mergeValidEvaluated(schCxt, valid);
                if (ifClause) gen.assign(ifClause, (0, codegen_1._)(_templateObject2(), keyword));
                else cxt.setParams({
                    ifClause: keyword
                });
            };
        }
    }
};
function hasSchema(it, keyword) {
    const schema = it.schema[keyword];
    return schema !== undefined && !(0, util_1.alwaysValidSchema)(it, schema);
}
exports.default = def; //# sourceMappingURL=if.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/thenElse.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const def = {
    keyword: [
        "then",
        "else"
    ],
    schemaType: [
        "object",
        "boolean"
    ],
    code (param) {
        let { keyword, parentSchema, it } = param;
        if (parentSchema.if === undefined) (0, util_1.checkStrictMode)(it, '"'.concat(keyword, '" without "if" is ignored'));
    }
};
exports.default = def; //# sourceMappingURL=thenElse.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const additionalItems_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/additionalItems.js [app-client] (ecmascript)");
const prefixItems_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/prefixItems.js [app-client] (ecmascript)");
const items_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/items.js [app-client] (ecmascript)");
const items2020_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/items2020.js [app-client] (ecmascript)");
const contains_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/contains.js [app-client] (ecmascript)");
const dependencies_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/dependencies.js [app-client] (ecmascript)");
const propertyNames_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/propertyNames.js [app-client] (ecmascript)");
const additionalProperties_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js [app-client] (ecmascript)");
const properties_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/properties.js [app-client] (ecmascript)");
const patternProperties_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/patternProperties.js [app-client] (ecmascript)");
const not_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/not.js [app-client] (ecmascript)");
const anyOf_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/anyOf.js [app-client] (ecmascript)");
const oneOf_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/oneOf.js [app-client] (ecmascript)");
const allOf_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/allOf.js [app-client] (ecmascript)");
const if_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/if.js [app-client] (ecmascript)");
const thenElse_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/thenElse.js [app-client] (ecmascript)");
function getApplicator() {
    let draft2020 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    const applicator = [
        // any
        not_1.default,
        anyOf_1.default,
        oneOf_1.default,
        allOf_1.default,
        if_1.default,
        thenElse_1.default,
        // object
        propertyNames_1.default,
        additionalProperties_1.default,
        dependencies_1.default,
        properties_1.default,
        patternProperties_1.default
    ];
    // array
    if (draft2020) applicator.push(prefixItems_1.default, items2020_1.default);
    else applicator.push(additionalItems_1.default, items_1.default);
    applicator.push(contains_1.default);
    return applicator;
}
exports.default = getApplicator; //# sourceMappingURL=index.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/format/format.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        'must match format "',
        '"'
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "{format: ",
        "}"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "",
        "[",
        "]"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        "typeof ",
        ' == "object" && !(',
        " instanceof RegExp)"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = _tagged_template_literal._([
        "",
        '.type || "string"'
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
function _templateObject5() {
    const data = _tagged_template_literal._([
        "",
        ".validate"
    ]);
    _templateObject5 = function() {
        return data;
    };
    return data;
}
function _templateObject6() {
    const data = _tagged_template_literal._([
        '"string"'
    ]);
    _templateObject6 = function() {
        return data;
    };
    return data;
}
function _templateObject7() {
    const data = _tagged_template_literal._([
        "",
        " && !",
        ""
    ]);
    _templateObject7 = function() {
        return data;
    };
    return data;
}
function _templateObject8() {
    const data = _tagged_template_literal._([
        "(",
        ".async ? await ",
        "(",
        ") : ",
        "(",
        "))"
    ]);
    _templateObject8 = function() {
        return data;
    };
    return data;
}
function _templateObject9() {
    const data = _tagged_template_literal._([
        "",
        "(",
        ")"
    ]);
    _templateObject9 = function() {
        return data;
    };
    return data;
}
function _templateObject10() {
    const data = _tagged_template_literal._([
        "(typeof ",
        ' == "function" ? ',
        " : ",
        ".test(",
        "))"
    ]);
    _templateObject10 = function() {
        return data;
    };
    return data;
}
function _templateObject11() {
    const data = _tagged_template_literal._([
        "",
        " && ",
        " !== true && ",
        " === ",
        " && !",
        ""
    ]);
    _templateObject11 = function() {
        return data;
    };
    return data;
}
function _templateObject12() {
    const data = _tagged_template_literal._([
        "",
        "",
        ""
    ]);
    _templateObject12 = function() {
        return data;
    };
    return data;
}
function _templateObject13() {
    const data = _tagged_template_literal._([
        "",
        ".validate"
    ]);
    _templateObject13 = function() {
        return data;
    };
    return data;
}
function _templateObject14() {
    const data = _tagged_template_literal._([
        "await ",
        "(",
        ")"
    ]);
    _templateObject14 = function() {
        return data;
    };
    return data;
}
function _templateObject15() {
    const data = _tagged_template_literal._([
        "",
        "(",
        ")"
    ]);
    _templateObject15 = function() {
        return data;
    };
    return data;
}
function _templateObject16() {
    const data = _tagged_template_literal._([
        "",
        ".test(",
        ")"
    ]);
    _templateObject16 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const error = {
    message: (param)=>{
        let { schemaCode } = param;
        return (0, codegen_1.str)(_templateObject(), schemaCode);
    },
    params: (param)=>{
        let { schemaCode } = param;
        return (0, codegen_1._)(_templateObject1(), schemaCode);
    }
};
const def = {
    keyword: "format",
    type: [
        "number",
        "string"
    ],
    schemaType: "string",
    $data: true,
    error,
    code (cxt, ruleType) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        const { opts, errSchemaPath, schemaEnv, self } = it;
        if (!opts.validateFormats) return;
        if ($data) validate$DataFormat();
        else validateFormat();
        function validate$DataFormat() {
            const fmts = gen.scopeValue("formats", {
                ref: self.formats,
                code: opts.code.formats
            });
            const fDef = gen.const("fDef", (0, codegen_1._)(_templateObject2(), fmts, schemaCode));
            const fType = gen.let("fType");
            const format = gen.let("format");
            // TODO simplify
            gen.if((0, codegen_1._)(_templateObject3(), fDef, fDef), ()=>gen.assign(fType, (0, codegen_1._)(_templateObject4(), fDef)).assign(format, (0, codegen_1._)(_templateObject5(), fDef)), ()=>gen.assign(fType, (0, codegen_1._)(_templateObject6())).assign(format, fDef));
            cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
            function unknownFmt() {
                if (opts.strictSchema === false) return codegen_1.nil;
                return (0, codegen_1._)(_templateObject7(), schemaCode, format);
            }
            function invalidFmt() {
                const callFormat = schemaEnv.$async ? (0, codegen_1._)(_templateObject8(), fDef, format, data, format, data) : (0, codegen_1._)(_templateObject9(), format, data);
                const validData = (0, codegen_1._)(_templateObject10(), format, callFormat, format, data);
                return (0, codegen_1._)(_templateObject11(), format, format, fType, ruleType, validData);
            }
        }
        function validateFormat() {
            const formatDef = self.formats[schema];
            if (!formatDef) {
                unknownFormat();
                return;
            }
            if (formatDef === true) return;
            const [fmtType, format, fmtRef] = getFormat(formatDef);
            if (fmtType === ruleType) cxt.pass(validCondition());
            function unknownFormat() {
                if (opts.strictSchema === false) {
                    self.logger.warn(unknownMsg());
                    return;
                }
                throw new Error(unknownMsg());
                function unknownMsg() {
                    return 'unknown format "'.concat(schema, '" ignored in schema at path "').concat(errSchemaPath, '"');
                }
            }
            function getFormat(fmtDef) {
                const code = fmtDef instanceof RegExp ? (0, codegen_1.regexpCode)(fmtDef) : opts.code.formats ? (0, codegen_1._)(_templateObject12(), opts.code.formats, (0, codegen_1.getProperty)(schema)) : undefined;
                const fmt = gen.scopeValue("formats", {
                    key: schema,
                    ref: fmtDef,
                    code
                });
                if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
                    return [
                        fmtDef.type || "string",
                        fmtDef.validate,
                        (0, codegen_1._)(_templateObject13(), fmt)
                    ];
                }
                return [
                    "string",
                    fmtDef,
                    fmt
                ];
            }
            function validCondition() {
                if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
                    if (!schemaEnv.$async) throw new Error("async format in sync schema");
                    return (0, codegen_1._)(_templateObject14(), fmtRef, data);
                }
                return typeof format == "function" ? (0, codegen_1._)(_templateObject15(), fmtRef, data) : (0, codegen_1._)(_templateObject16(), fmtRef, data);
            }
        }
    }
};
exports.default = def; //# sourceMappingURL=format.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/format/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const format_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/format/format.js [app-client] (ecmascript)");
const format = [
    format_1.default
];
exports.default = format; //# sourceMappingURL=index.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/metadata.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.contentVocabulary = exports.metadataVocabulary = void 0;
exports.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples"
];
exports.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema"
]; //# sourceMappingURL=metadata.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/draft7.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const core_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/core/index.js [app-client] (ecmascript)");
const validation_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/validation/index.js [app-client] (ecmascript)");
const applicator_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/applicator/index.js [app-client] (ecmascript)");
const format_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/format/index.js [app-client] (ecmascript)");
const metadata_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/metadata.js [app-client] (ecmascript)");
const draft7Vocabularies = [
    core_1.default,
    validation_1.default,
    (0, applicator_1.default)(),
    format_1.default,
    metadata_1.metadataVocabulary,
    metadata_1.contentVocabulary
];
exports.default = draft7Vocabularies; //# sourceMappingURL=draft7.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/discriminator/types.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DiscrError = void 0;
var DiscrError;
(function(DiscrError) {
    DiscrError["Tag"] = "tag";
    DiscrError["Mapping"] = "mapping";
})(DiscrError || (exports.DiscrError = DiscrError = {})); //# sourceMappingURL=types.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/discriminator/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "{error: ",
        ", tag: ",
        ", tagValue: ",
        "}"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "",
        "",
        ""
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "typeof ",
        ' == "string"'
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        "",
        " === ",
        ""
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/discriminator/types.js [app-client] (ecmascript)");
const compile_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/index.js [app-client] (ecmascript)");
const ref_error_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/ref_error.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/util.js [app-client] (ecmascript)");
const error = {
    message: (param)=>{
        let { params: { discrError, tagName } } = param;
        return discrError === types_1.DiscrError.Tag ? 'tag "'.concat(tagName, '" must be string') : 'value of tag "'.concat(tagName, '" must be in oneOf');
    },
    params: (param)=>{
        let { params: { discrError, tag, tagName } } = param;
        return (0, codegen_1._)(_templateObject(), discrError, tagName, tag);
    }
};
const def = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error,
    code (cxt) {
        const { gen, data, schema, parentSchema, it } = cxt;
        const { oneOf } = parentSchema;
        if (!it.opts.discriminator) {
            throw new Error("discriminator: requires discriminator option");
        }
        const tagName = schema.propertyName;
        if (typeof tagName != "string") throw new Error("discriminator: requires propertyName");
        if (schema.mapping) throw new Error("discriminator: mapping is not supported");
        if (!oneOf) throw new Error("discriminator: requires oneOf keyword");
        const valid = gen.let("valid", false);
        const tag = gen.const("tag", (0, codegen_1._)(_templateObject1(), data, (0, codegen_1.getProperty)(tagName)));
        gen.if((0, codegen_1._)(_templateObject2(), tag), ()=>validateMapping(), ()=>cxt.error(false, {
                discrError: types_1.DiscrError.Tag,
                tag,
                tagName
            }));
        cxt.ok(valid);
        function validateMapping() {
            const mapping = getMapping();
            gen.if(false);
            for(const tagValue in mapping){
                gen.elseIf((0, codegen_1._)(_templateObject3(), tag, tagValue));
                gen.assign(valid, applyTagSchema(mapping[tagValue]));
            }
            gen.else();
            cxt.error(false, {
                discrError: types_1.DiscrError.Mapping,
                tag,
                tagName
            });
            gen.endIf();
        }
        function applyTagSchema(schemaProp) {
            const _valid = gen.name("valid");
            const schCxt = cxt.subschema({
                keyword: "oneOf",
                schemaProp
            }, _valid);
            cxt.mergeEvaluated(schCxt, codegen_1.Name);
            return _valid;
        }
        function getMapping() {
            var _a;
            const oneOfMapping = {};
            const topRequired = hasRequired(parentSchema);
            let tagRequired = true;
            for(let i = 0; i < oneOf.length; i++){
                let sch = oneOf[i];
                if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
                    const ref = sch.$ref;
                    sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, ref);
                    if (sch instanceof compile_1.SchemaEnv) sch = sch.schema;
                    if (sch === undefined) throw new ref_error_1.default(it.opts.uriResolver, it.baseId, ref);
                }
                const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
                if (typeof propSch != "object") {
                    throw new Error('discriminator: oneOf subschemas (or referenced schemas) must have "properties/'.concat(tagName, '"'));
                }
                tagRequired = tagRequired && (topRequired || hasRequired(sch));
                addMappings(propSch, i);
            }
            if (!tagRequired) throw new Error('discriminator: "'.concat(tagName, '" must be required'));
            return oneOfMapping;
            //TURBOPACK unreachable
            ;
            function hasRequired(param) {
                let { required } = param;
                return Array.isArray(required) && required.includes(tagName);
            }
            function addMappings(sch, i) {
                if (sch.const) {
                    addMapping(sch.const, i);
                } else if (sch.enum) {
                    for (const tagValue of sch.enum){
                        addMapping(tagValue, i);
                    }
                } else {
                    throw new Error('discriminator: "properties/'.concat(tagName, '" must have "const" or "enum"'));
                }
            }
            function addMapping(tagValue, i) {
                if (typeof tagValue != "string" || tagValue in oneOfMapping) {
                    throw new Error('discriminator: "'.concat(tagName, '" values must be unique strings'));
                }
                oneOfMapping[tagValue] = i;
            }
        }
    }
};
exports.default = def; //# sourceMappingURL=index.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/refs/json-schema-draft-07.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"$schema\":\"http://json-schema.org/draft-07/schema#\",\"$id\":\"http://json-schema.org/draft-07/schema#\",\"title\":\"Core schema meta-schema\",\"definitions\":{\"schemaArray\":{\"type\":\"array\",\"minItems\":1,\"items\":{\"$ref\":\"#\"}},\"nonNegativeInteger\":{\"type\":\"integer\",\"minimum\":0},\"nonNegativeIntegerDefault0\":{\"allOf\":[{\"$ref\":\"#/definitions/nonNegativeInteger\"},{\"default\":0}]},\"simpleTypes\":{\"enum\":[\"array\",\"boolean\",\"integer\",\"null\",\"number\",\"object\",\"string\"]},\"stringArray\":{\"type\":\"array\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true,\"default\":[]}},\"type\":[\"object\",\"boolean\"],\"properties\":{\"$id\":{\"type\":\"string\",\"format\":\"uri-reference\"},\"$schema\":{\"type\":\"string\",\"format\":\"uri\"},\"$ref\":{\"type\":\"string\",\"format\":\"uri-reference\"},\"$comment\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"default\":true,\"readOnly\":{\"type\":\"boolean\",\"default\":false},\"examples\":{\"type\":\"array\",\"items\":true},\"multipleOf\":{\"type\":\"number\",\"exclusiveMinimum\":0},\"maximum\":{\"type\":\"number\"},\"exclusiveMaximum\":{\"type\":\"number\"},\"minimum\":{\"type\":\"number\"},\"exclusiveMinimum\":{\"type\":\"number\"},\"maxLength\":{\"$ref\":\"#/definitions/nonNegativeInteger\"},\"minLength\":{\"$ref\":\"#/definitions/nonNegativeIntegerDefault0\"},\"pattern\":{\"type\":\"string\",\"format\":\"regex\"},\"additionalItems\":{\"$ref\":\"#\"},\"items\":{\"anyOf\":[{\"$ref\":\"#\"},{\"$ref\":\"#/definitions/schemaArray\"}],\"default\":true},\"maxItems\":{\"$ref\":\"#/definitions/nonNegativeInteger\"},\"minItems\":{\"$ref\":\"#/definitions/nonNegativeIntegerDefault0\"},\"uniqueItems\":{\"type\":\"boolean\",\"default\":false},\"contains\":{\"$ref\":\"#\"},\"maxProperties\":{\"$ref\":\"#/definitions/nonNegativeInteger\"},\"minProperties\":{\"$ref\":\"#/definitions/nonNegativeIntegerDefault0\"},\"required\":{\"$ref\":\"#/definitions/stringArray\"},\"additionalProperties\":{\"$ref\":\"#\"},\"definitions\":{\"type\":\"object\",\"additionalProperties\":{\"$ref\":\"#\"},\"default\":{}},\"properties\":{\"type\":\"object\",\"additionalProperties\":{\"$ref\":\"#\"},\"default\":{}},\"patternProperties\":{\"type\":\"object\",\"additionalProperties\":{\"$ref\":\"#\"},\"propertyNames\":{\"format\":\"regex\"},\"default\":{}},\"dependencies\":{\"type\":\"object\",\"additionalProperties\":{\"anyOf\":[{\"$ref\":\"#\"},{\"$ref\":\"#/definitions/stringArray\"}]}},\"propertyNames\":{\"$ref\":\"#\"},\"const\":true,\"enum\":{\"type\":\"array\",\"items\":true,\"minItems\":1,\"uniqueItems\":true},\"type\":{\"anyOf\":[{\"$ref\":\"#/definitions/simpleTypes\"},{\"type\":\"array\",\"items\":{\"$ref\":\"#/definitions/simpleTypes\"},\"minItems\":1,\"uniqueItems\":true}]},\"format\":{\"type\":\"string\"},\"contentMediaType\":{\"type\":\"string\"},\"contentEncoding\":{\"type\":\"string\"},\"if\":{\"$ref\":\"#\"},\"then\":{\"$ref\":\"#\"},\"else\":{\"$ref\":\"#\"},\"allOf\":{\"$ref\":\"#/definitions/schemaArray\"},\"anyOf\":{\"$ref\":\"#/definitions/schemaArray\"},\"oneOf\":{\"$ref\":\"#/definitions/schemaArray\"},\"not\":{\"$ref\":\"#\"}},\"default\":true}"));}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/ajv.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = exports.Ajv = void 0;
const core_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/core.js [app-client] (ecmascript)");
const draft7_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/draft7.js [app-client] (ecmascript)");
const discriminator_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/vocabularies/discriminator/index.js [app-client] (ecmascript)");
const draft7MetaSchema = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/refs/json-schema-draft-07.json (json)");
const META_SUPPORT_DATA = [
    "/properties"
];
const META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
class Ajv extends core_1.default {
    _addVocabularies() {
        super._addVocabularies();
        draft7_1.default.forEach((v)=>this.addVocabulary(v));
        if (this.opts.discriminator) this.addKeyword(discriminator_1.default);
    }
    _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        if (!this.opts.meta) return;
        const metaSchema = this.opts.$data ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA) : draft7MetaSchema;
        this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
    }
    defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : undefined);
    }
}
exports.Ajv = Ajv;
module.exports = exports = Ajv;
module.exports.Ajv = Ajv;
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Ajv;
var validate_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/validate/index.js [app-client] (ecmascript)");
Object.defineProperty(exports, "KeywordCxt", {
    enumerable: true,
    get: function() {
        return validate_1.KeywordCxt;
    }
});
var codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
Object.defineProperty(exports, "_", {
    enumerable: true,
    get: function() {
        return codegen_1._;
    }
});
Object.defineProperty(exports, "str", {
    enumerable: true,
    get: function() {
        return codegen_1.str;
    }
});
Object.defineProperty(exports, "stringify", {
    enumerable: true,
    get: function() {
        return codegen_1.stringify;
    }
});
Object.defineProperty(exports, "nil", {
    enumerable: true,
    get: function() {
        return codegen_1.nil;
    }
});
Object.defineProperty(exports, "Name", {
    enumerable: true,
    get: function() {
        return codegen_1.Name;
    }
});
Object.defineProperty(exports, "CodeGen", {
    enumerable: true,
    get: function() {
        return codegen_1.CodeGen;
    }
});
var validation_error_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/runtime/validation_error.js [app-client] (ecmascript)");
Object.defineProperty(exports, "ValidationError", {
    enumerable: true,
    get: function() {
        return validation_error_1.default;
    }
});
var ref_error_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/ref_error.js [app-client] (ecmascript)");
Object.defineProperty(exports, "MissingRefError", {
    enumerable: true,
    get: function() {
        return ref_error_1.default;
    }
}); //# sourceMappingURL=ajv.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv-formats/dist/formats.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv-formats/dist/limit.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        "should be ",
        " ",
        ""
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = _tagged_template_literal._([
        "{comparison: ",
        ", limit: ",
        "}"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = _tagged_template_literal._([
        "",
        "[",
        "]"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = _tagged_template_literal._([
        "typeof ",
        ' != "object"'
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = _tagged_template_literal._([
        "",
        " instanceof RegExp"
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
function _templateObject5() {
    const data = _tagged_template_literal._([
        "typeof ",
        '.compare != "function"'
    ]);
    _templateObject5 = function() {
        return data;
    };
    return data;
}
function _templateObject6() {
    const data = _tagged_template_literal._([
        "",
        "",
        ""
    ]);
    _templateObject6 = function() {
        return data;
    };
    return data;
}
function _templateObject7() {
    const data = _tagged_template_literal._([
        "",
        ".compare(",
        ", ",
        ") ",
        " 0"
    ]);
    _templateObject7 = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formatLimitDefinition = void 0;
const ajv_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/ajv.js [app-client] (ecmascript)");
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
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
    message: (param)=>{
        let { keyword, schemaCode } = param;
        return (0, codegen_1.str)(_templateObject(), KWDs[keyword].okStr, schemaCode);
    },
    params: (param)=>{
        let { keyword, schemaCode } = param;
        return (0, codegen_1._)(_templateObject1(), KWDs[keyword].okStr, schemaCode);
    }
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
            const fmt = gen.const("fmt", (0, codegen_1._)(_templateObject2(), fmts, fCxt.schemaCode));
            cxt.fail$data((0, codegen_1.or)((0, codegen_1._)(_templateObject3(), fmt), (0, codegen_1._)(_templateObject4(), fmt), (0, codegen_1._)(_templateObject5(), fmt), compareCode(fmt)));
        }
        function validateFormat() {
            const format = fCxt.schema;
            const fmtDef = self.formats[format];
            if (!fmtDef || fmtDef === true) return;
            if (typeof fmtDef != "object" || fmtDef instanceof RegExp || typeof fmtDef.compare != "function") {
                throw new Error('"'.concat(keyword, '": format "').concat(format, '" does not define "compare" function'));
            }
            const fmt = gen.scopeValue("formats", {
                key: format,
                ref: fmtDef,
                code: opts.code.formats ? (0, codegen_1._)(_templateObject6(), opts.code.formats, (0, codegen_1.getProperty)(format)) : undefined
            });
            cxt.fail$data(compareCode(fmt));
        }
        function compareCode(fmt) {
            return (0, codegen_1._)(_templateObject7(), fmt, data, schemaCode, KWDs[keyword].fail);
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
"[project]/Documents/vsc/HTV/frontend/node_modules/ajv-formats/dist/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _tagged_template_literal = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@swc/helpers/cjs/_tagged_template_literal.cjs [app-client] (ecmascript)");
function _templateObject() {
    const data = _tagged_template_literal._([
        'require("ajv-formats/dist/formats").',
        ""
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
const formats_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv-formats/dist/formats.js [app-client] (ecmascript)");
const limit_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv-formats/dist/limit.js [app-client] (ecmascript)");
const codegen_1 = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/ajv/dist/compile/codegen/index.js [app-client] (ecmascript)");
const fullName = new codegen_1.Name("fullFormats");
const fastName = new codegen_1.Name("fastFormats");
const formatsPlugin = function(ajv) {
    let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
        keywords: true
    };
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
formatsPlugin.get = function(name) {
    let mode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "full";
    const formats = mode === "fast" ? formats_1.fastFormats : formats_1.fullFormats;
    const f = formats[name];
    if (!f) throw new Error('Unknown format "'.concat(name, '"'));
    return f;
};
function addFormats(ajv, list, fs, exportName) {
    var _a;
    var _b;
    (_a = (_b = ajv.opts.code).formats) !== null && _a !== void 0 ? _a : _b.formats = (0, codegen_1._)(_templateObject(), exportName);
    for (const f of list)ajv.addFormat(f, fs[f]);
}
module.exports = exports = formatsPlugin;
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = formatsPlugin; //# sourceMappingURL=index.js.map
}),
]);

//# sourceMappingURL=ce80c_bbd996c3._.js.map