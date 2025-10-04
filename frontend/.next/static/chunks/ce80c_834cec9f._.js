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
"[project]/Documents/vsc/HTV/frontend/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    function useSyncExternalStore$2(subscribe, getSnapshot) {
        didWarnOld18Alpha || void 0 === React.startTransition || (didWarnOld18Alpha = !0, console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
        var value = getSnapshot();
        if (!didWarnUncachedGetSnapshot) {
            var cachedValue = getSnapshot();
            objectIs(value, cachedValue) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), didWarnUncachedGetSnapshot = !0);
        }
        cachedValue = useState({
            inst: {
                value: value,
                getSnapshot: getSnapshot
            }
        });
        var inst = cachedValue[0].inst, forceUpdate = cachedValue[1];
        useLayoutEffect({
            "useSyncExternalStore$2.useLayoutEffect": function() {
                inst.value = value;
                inst.getSnapshot = getSnapshot;
                checkIfSnapshotChanged(inst) && forceUpdate({
                    inst: inst
                });
            }
        }["useSyncExternalStore$2.useLayoutEffect"], [
            subscribe,
            value,
            getSnapshot
        ]);
        useEffect({
            "useSyncExternalStore$2.useEffect": function() {
                checkIfSnapshotChanged(inst) && forceUpdate({
                    inst: inst
                });
                return subscribe({
                    "useSyncExternalStore$2.useEffect": function() {
                        checkIfSnapshotChanged(inst) && forceUpdate({
                            inst: inst
                        });
                    }
                }["useSyncExternalStore$2.useEffect"]);
            }
        }["useSyncExternalStore$2.useEffect"], [
            subscribe
        ]);
        useDebugValue(value);
        return value;
    }
    function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
            var nextValue = latestGetSnapshot();
            return !objectIs(inst, nextValue);
        } catch (error) {
            return !0;
        }
    }
    function useSyncExternalStore$1(subscribe, getSnapshot) {
        return getSnapshot();
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var React = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue, didWarnOld18Alpha = !1, didWarnUncachedGetSnapshot = !1, shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
    exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
}();
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/use-sync-external-store/shim/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js [app-client] (ecmascript)");
}
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var React = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), shim = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/use-sync-external-store/shim/index.js [app-client] (ecmascript)"), objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore = shim.useSyncExternalStore, useRef = React.useRef, useEffect = React.useEffect, useMemo = React.useMemo, useDebugValue = React.useDebugValue;
    exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
        var instRef = useRef(null);
        if (null === instRef.current) {
            var inst = {
                hasValue: !1,
                value: null
            };
            instRef.current = inst;
        } else inst = instRef.current;
        instRef = useMemo(function() {
            function memoizedSelector(nextSnapshot) {
                if (!hasMemo) {
                    hasMemo = !0;
                    memoizedSnapshot = nextSnapshot;
                    nextSnapshot = selector(nextSnapshot);
                    if (void 0 !== isEqual && inst.hasValue) {
                        var currentSelection = inst.value;
                        if (isEqual(currentSelection, nextSnapshot)) return memoizedSelection = currentSelection;
                    }
                    return memoizedSelection = nextSnapshot;
                }
                currentSelection = memoizedSelection;
                if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
                var nextSelection = selector(nextSnapshot);
                if (void 0 !== isEqual && isEqual(currentSelection, nextSelection)) return memoizedSnapshot = nextSnapshot, currentSelection;
                memoizedSnapshot = nextSnapshot;
                return memoizedSelection = nextSelection;
            }
            var hasMemo = !1, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
            return [
                function() {
                    return memoizedSelector(getSnapshot());
                },
                null === maybeGetServerSnapshot ? void 0 : function() {
                    return memoizedSelector(maybeGetServerSnapshot());
                }
            ];
        }, [
            getSnapshot,
            getServerSnapshot,
            selector,
            isEqual
        ]);
        var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
        useEffect(function() {
            inst.hasValue = !0;
            inst.value = value;
        }, [
            value
        ]);
        useDebugValue(value);
        return value;
    };
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
}();
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/use-sync-external-store/shim/with-selector.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js [app-client] (ecmascript)");
}
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/zustand/esm/vanilla.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createStore",
    ()=>createStore
]);
const createStoreImpl = (createState)=>{
    let state;
    const listeners = /* @__PURE__ */ new Set();
    const setState = (partial, replace)=>{
        const nextState = typeof partial === "function" ? partial(state) : partial;
        if (!Object.is(nextState, state)) {
            const previousState = state;
            state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
            listeners.forEach((listener)=>listener(state, previousState));
        }
    };
    const getState = ()=>state;
    const getInitialState = ()=>initialState;
    const subscribe = (listener)=>{
        listeners.add(listener);
        return ()=>listeners.delete(listener);
    };
    const api = {
        setState,
        getState,
        getInitialState,
        subscribe
    };
    const initialState = state = createState(setState, getState, api);
    return api;
};
const createStore = (createState)=>createState ? createStoreImpl(createState) : createStoreImpl;
;
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/zustand/esm/traditional.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createWithEqualityFn",
    ()=>createWithEqualityFn,
    "useStoreWithEqualityFn",
    ()=>useStoreWithEqualityFn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$use$2d$sync$2d$external$2d$store$2f$shim$2f$with$2d$selector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/use-sync-external-store/shim/with-selector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/zustand/esm/vanilla.mjs [app-client] (ecmascript)");
;
;
;
const { useSyncExternalStoreWithSelector } = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$use$2d$sync$2d$external$2d$store$2f$shim$2f$with$2d$selector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
const identity = (arg)=>arg;
function useStoreWithEqualityFn(api) {
    let selector = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : identity, equalityFn = arguments.length > 2 ? arguments[2] : void 0;
    const slice = useSyncExternalStoreWithSelector(api.subscribe, api.getState, api.getInitialState, selector, equalityFn);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useDebugValue(slice);
    return slice;
}
const createWithEqualityFnImpl = (createState, defaultEqualityFn)=>{
    const api = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStore"])(createState);
    const useBoundStoreWithEqualityFn = function(selector) {
        let equalityFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultEqualityFn;
        return useStoreWithEqualityFn(api, selector, equalityFn);
    };
    Object.assign(useBoundStoreWithEqualityFn, api);
    return useBoundStoreWithEqualityFn;
};
const createWithEqualityFn = (createState, defaultEqualityFn)=>createState ? createWithEqualityFnImpl(createState, defaultEqualityFn) : createWithEqualityFnImpl;
;
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/suspend-react/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clear",
    ()=>clear,
    "peek",
    ()=>peek,
    "preload",
    ()=>preload,
    "suspend",
    ()=>suspend
]);
const isPromise = (promise)=>typeof promise === 'object' && typeof promise.then === 'function';
const globalCache = [];
function shallowEqualArrays(arrA, arrB) {
    let equal = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : (a, b)=>a === b;
    if (arrA === arrB) return true;
    if (!arrA || !arrB) return false;
    const len = arrA.length;
    if (arrB.length !== len) return false;
    for(let i = 0; i < len; i++)if (!equal(arrA[i], arrB[i])) return false;
    return true;
}
function query(fn) {
    let keys = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, preload = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, config = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    // If no keys were given, the function is the key
    if (keys === null) keys = [
        fn
    ];
    for (const entry of globalCache){
        // Find a match
        if (shallowEqualArrays(keys, entry.keys, entry.equal)) {
            // If we're pre-loading and the element is present, just return
            if (preload) return undefined; // If an error occurred, throw
            if (Object.prototype.hasOwnProperty.call(entry, 'error')) throw entry.error; // If a response was successful, return
            if (Object.prototype.hasOwnProperty.call(entry, 'response')) {
                if (config.lifespan && config.lifespan > 0) {
                    if (entry.timeout) clearTimeout(entry.timeout);
                    entry.timeout = setTimeout(entry.remove, config.lifespan);
                }
                return entry.response;
            } // If the promise is still unresolved, throw
            if (!preload) throw entry.promise;
        }
    } // The request is new or has changed.
    const entry = {
        keys,
        equal: config.equal,
        remove: ()=>{
            const index = globalCache.indexOf(entry);
            if (index !== -1) globalCache.splice(index, 1);
        },
        promise: (isPromise(fn) ? fn : fn(...keys) // When it resolves, store its value
        ).then((response)=>{
            entry.response = response; // Remove the entry in time if a lifespan was given
            if (config.lifespan && config.lifespan > 0) {
                entry.timeout = setTimeout(entry.remove, config.lifespan);
            }
        }) // Store caught errors, they will be thrown in the render-phase to bubble into an error-bound
        .catch((error)=>entry.error = error)
    }; // Register the entry
    globalCache.push(entry); // And throw the promise, this yields control back to React
    if (!preload) throw entry.promise;
    return undefined;
}
const suspend = (fn, keys, config)=>query(fn, keys, false, config);
const preload = (fn, keys, config)=>void query(fn, keys, true, config);
const peek = (keys)=>{
    var _globalCache$find;
    return (_globalCache$find = globalCache.find((entry)=>shallowEqualArrays(keys, entry.keys, entry.equal))) == null ? void 0 : _globalCache$find.response;
};
const clear = (keys)=>{
    if (keys === undefined || keys.length === 0) globalCache.splice(0, globalCache.length);
    else {
        const entry = globalCache.find((entry)=>shallowEqualArrays(keys, entry.keys, entry.equal));
        if (entry) entry.remove();
    }
};
;
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/react-reconciler/node_modules/scheduler/cjs/scheduler.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function performWorkUntilDeadline() {
        if (isMessageLoopRunning) {
            var currentTime = exports.unstable_now();
            startTime = currentTime;
            var hasMoreWork = !0;
            try {
                a: {
                    isHostCallbackScheduled = !1;
                    isHostTimeoutScheduled && (isHostTimeoutScheduled = !1, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
                    isPerformingWork = !0;
                    var previousPriorityLevel = currentPriorityLevel;
                    try {
                        b: {
                            advanceTimers(currentTime);
                            for(currentTask = peek(taskQueue); null !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost());){
                                var callback = currentTask.callback;
                                if ("function" === typeof callback) {
                                    currentTask.callback = null;
                                    currentPriorityLevel = currentTask.priorityLevel;
                                    var continuationCallback = callback(currentTask.expirationTime <= currentTime);
                                    currentTime = exports.unstable_now();
                                    if ("function" === typeof continuationCallback) {
                                        currentTask.callback = continuationCallback;
                                        advanceTimers(currentTime);
                                        hasMoreWork = !0;
                                        break b;
                                    }
                                    currentTask === peek(taskQueue) && pop(taskQueue);
                                    advanceTimers(currentTime);
                                } else pop(taskQueue);
                                currentTask = peek(taskQueue);
                            }
                            if (null !== currentTask) hasMoreWork = !0;
                            else {
                                var firstTimer = peek(timerQueue);
                                null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
                                hasMoreWork = !1;
                            }
                        }
                        break a;
                    } finally{
                        currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = !1;
                    }
                    hasMoreWork = void 0;
                }
            } finally{
                hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = !1;
            }
        }
    }
    function push(heap, node) {
        var index = heap.length;
        heap.push(node);
        a: for(; 0 < index;){
            var parentIndex = index - 1 >>> 1, parent = heap[parentIndex];
            if (0 < compare(parent, node)) heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
            else break a;
        }
    }
    function peek(heap) {
        return 0 === heap.length ? null : heap[0];
    }
    function pop(heap) {
        if (0 === heap.length) return null;
        var first = heap[0], last = heap.pop();
        if (last !== first) {
            heap[0] = last;
            a: for(var index = 0, length = heap.length, halfLength = length >>> 1; index < halfLength;){
                var leftIndex = 2 * (index + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
                if (0 > compare(left, last)) rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
                else if (rightIndex < length && 0 > compare(right, last)) heap[index] = right, heap[rightIndex] = last, index = rightIndex;
                else break a;
            }
        }
        return first;
    }
    function compare(a, b) {
        var diff = a.sortIndex - b.sortIndex;
        return 0 !== diff ? diff : a.id - b.id;
    }
    function advanceTimers(currentTime) {
        for(var timer = peek(timerQueue); null !== timer;){
            if (null === timer.callback) pop(timerQueue);
            else if (timer.startTime <= currentTime) pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
            else break;
            timer = peek(timerQueue);
        }
    }
    function handleTimeout(currentTime) {
        isHostTimeoutScheduled = !1;
        advanceTimers(currentTime);
        if (!isHostCallbackScheduled) if (null !== peek(taskQueue)) isHostCallbackScheduled = !0, requestHostCallback();
        else {
            var firstTimer = peek(timerQueue);
            null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
        }
    }
    function shouldYieldToHost() {
        return exports.unstable_now() - startTime < frameInterval ? !1 : !0;
    }
    function requestHostCallback() {
        isMessageLoopRunning || (isMessageLoopRunning = !0, schedulePerformWorkUntilDeadline());
    }
    function requestHostTimeout(callback, ms) {
        taskTimeoutID = localSetTimeout(function() {
            callback(exports.unstable_now());
        }, ms);
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    exports.unstable_now = void 0;
    if ("object" === typeof performance && "function" === typeof performance.now) {
        var localPerformance = performance;
        exports.unstable_now = function() {
            return localPerformance.now();
        };
    } else {
        var localDate = Date, initialTime = localDate.now();
        exports.unstable_now = function() {
            return localDate.now() - initialTime;
        };
    }
    var taskQueue = [], timerQueue = [], taskIdCounter = 1, currentTask = null, currentPriorityLevel = 3, isPerformingWork = !1, isHostCallbackScheduled = !1, isHostTimeoutScheduled = !1, localSetTimeout = "function" === typeof setTimeout ? setTimeout : null, localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null, localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null, isMessageLoopRunning = !1, taskTimeoutID = -1, frameInterval = 5, startTime = -1;
    if ("function" === typeof localSetImmediate) var schedulePerformWorkUntilDeadline = function() {
        localSetImmediate(performWorkUntilDeadline);
    };
    else if ("undefined" !== typeof MessageChannel) {
        var channel = new MessageChannel(), port = channel.port2;
        channel.port1.onmessage = performWorkUntilDeadline;
        schedulePerformWorkUntilDeadline = function() {
            port.postMessage(null);
        };
    } else schedulePerformWorkUntilDeadline = function() {
        localSetTimeout(performWorkUntilDeadline, 0);
    };
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(task) {
        task.callback = null;
    };
    exports.unstable_continueExecution = function() {
        isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = !0, requestHostCallback());
    };
    exports.unstable_forceFrameRate = function(fps) {
        0 > fps || 125 < fps ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
    };
    exports.unstable_getCurrentPriorityLevel = function() {
        return currentPriorityLevel;
    };
    exports.unstable_getFirstCallbackNode = function() {
        return peek(taskQueue);
    };
    exports.unstable_next = function(eventHandler) {
        switch(currentPriorityLevel){
            case 1:
            case 2:
            case 3:
                var priorityLevel = 3;
                break;
            default:
                priorityLevel = currentPriorityLevel;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
            return eventHandler();
        } finally{
            currentPriorityLevel = previousPriorityLevel;
        }
    };
    exports.unstable_pauseExecution = function() {};
    exports.unstable_requestPaint = function() {};
    exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
        switch(priorityLevel){
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                priorityLevel = 3;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
            return eventHandler();
        } finally{
            currentPriorityLevel = previousPriorityLevel;
        }
    };
    exports.unstable_scheduleCallback = function(priorityLevel, callback, options) {
        var currentTime = exports.unstable_now();
        "object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
        switch(priorityLevel){
            case 1:
                var timeout = -1;
                break;
            case 2:
                timeout = 250;
                break;
            case 5:
                timeout = 1073741823;
                break;
            case 4:
                timeout = 1e4;
                break;
            default:
                timeout = 5e3;
        }
        timeout = options + timeout;
        priorityLevel = {
            id: taskIdCounter++,
            callback: callback,
            priorityLevel: priorityLevel,
            startTime: options,
            expirationTime: timeout,
            sortIndex: -1
        };
        options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = !0, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = !0, requestHostCallback()));
        return priorityLevel;
    };
    exports.unstable_shouldYield = shouldYieldToHost;
    exports.unstable_wrapCallback = function(callback) {
        var parentPriorityLevel = currentPriorityLevel;
        return function() {
            var previousPriorityLevel = currentPriorityLevel;
            currentPriorityLevel = parentPriorityLevel;
            try {
                return callback.apply(this, arguments);
            } finally{
                currentPriorityLevel = previousPriorityLevel;
            }
        };
    };
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
}();
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/react-reconciler/node_modules/scheduler/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/react-reconciler/node_modules/scheduler/cjs/scheduler.development.js [app-client] (ecmascript)");
}
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/fiber/node_modules/scheduler/cjs/scheduler.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function performWorkUntilDeadline() {
        if (isMessageLoopRunning) {
            var currentTime = exports.unstable_now();
            startTime = currentTime;
            var hasMoreWork = !0;
            try {
                a: {
                    isHostCallbackScheduled = !1;
                    isHostTimeoutScheduled && (isHostTimeoutScheduled = !1, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
                    isPerformingWork = !0;
                    var previousPriorityLevel = currentPriorityLevel;
                    try {
                        b: {
                            advanceTimers(currentTime);
                            for(currentTask = peek(taskQueue); null !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost());){
                                var callback = currentTask.callback;
                                if ("function" === typeof callback) {
                                    currentTask.callback = null;
                                    currentPriorityLevel = currentTask.priorityLevel;
                                    var continuationCallback = callback(currentTask.expirationTime <= currentTime);
                                    currentTime = exports.unstable_now();
                                    if ("function" === typeof continuationCallback) {
                                        currentTask.callback = continuationCallback;
                                        advanceTimers(currentTime);
                                        hasMoreWork = !0;
                                        break b;
                                    }
                                    currentTask === peek(taskQueue) && pop(taskQueue);
                                    advanceTimers(currentTime);
                                } else pop(taskQueue);
                                currentTask = peek(taskQueue);
                            }
                            if (null !== currentTask) hasMoreWork = !0;
                            else {
                                var firstTimer = peek(timerQueue);
                                null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
                                hasMoreWork = !1;
                            }
                        }
                        break a;
                    } finally{
                        currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = !1;
                    }
                    hasMoreWork = void 0;
                }
            } finally{
                hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = !1;
            }
        }
    }
    function push(heap, node) {
        var index = heap.length;
        heap.push(node);
        a: for(; 0 < index;){
            var parentIndex = index - 1 >>> 1, parent = heap[parentIndex];
            if (0 < compare(parent, node)) heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
            else break a;
        }
    }
    function peek(heap) {
        return 0 === heap.length ? null : heap[0];
    }
    function pop(heap) {
        if (0 === heap.length) return null;
        var first = heap[0], last = heap.pop();
        if (last !== first) {
            heap[0] = last;
            a: for(var index = 0, length = heap.length, halfLength = length >>> 1; index < halfLength;){
                var leftIndex = 2 * (index + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
                if (0 > compare(left, last)) rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
                else if (rightIndex < length && 0 > compare(right, last)) heap[index] = right, heap[rightIndex] = last, index = rightIndex;
                else break a;
            }
        }
        return first;
    }
    function compare(a, b) {
        var diff = a.sortIndex - b.sortIndex;
        return 0 !== diff ? diff : a.id - b.id;
    }
    function advanceTimers(currentTime) {
        for(var timer = peek(timerQueue); null !== timer;){
            if (null === timer.callback) pop(timerQueue);
            else if (timer.startTime <= currentTime) pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
            else break;
            timer = peek(timerQueue);
        }
    }
    function handleTimeout(currentTime) {
        isHostTimeoutScheduled = !1;
        advanceTimers(currentTime);
        if (!isHostCallbackScheduled) if (null !== peek(taskQueue)) isHostCallbackScheduled = !0, requestHostCallback();
        else {
            var firstTimer = peek(timerQueue);
            null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
        }
    }
    function shouldYieldToHost() {
        return exports.unstable_now() - startTime < frameInterval ? !1 : !0;
    }
    function requestHostCallback() {
        isMessageLoopRunning || (isMessageLoopRunning = !0, schedulePerformWorkUntilDeadline());
    }
    function requestHostTimeout(callback, ms) {
        taskTimeoutID = localSetTimeout(function() {
            callback(exports.unstable_now());
        }, ms);
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    exports.unstable_now = void 0;
    if ("object" === typeof performance && "function" === typeof performance.now) {
        var localPerformance = performance;
        exports.unstable_now = function() {
            return localPerformance.now();
        };
    } else {
        var localDate = Date, initialTime = localDate.now();
        exports.unstable_now = function() {
            return localDate.now() - initialTime;
        };
    }
    var taskQueue = [], timerQueue = [], taskIdCounter = 1, currentTask = null, currentPriorityLevel = 3, isPerformingWork = !1, isHostCallbackScheduled = !1, isHostTimeoutScheduled = !1, localSetTimeout = "function" === typeof setTimeout ? setTimeout : null, localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null, localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null, isMessageLoopRunning = !1, taskTimeoutID = -1, frameInterval = 5, startTime = -1;
    if ("function" === typeof localSetImmediate) var schedulePerformWorkUntilDeadline = function() {
        localSetImmediate(performWorkUntilDeadline);
    };
    else if ("undefined" !== typeof MessageChannel) {
        var channel = new MessageChannel(), port = channel.port2;
        channel.port1.onmessage = performWorkUntilDeadline;
        schedulePerformWorkUntilDeadline = function() {
            port.postMessage(null);
        };
    } else schedulePerformWorkUntilDeadline = function() {
        localSetTimeout(performWorkUntilDeadline, 0);
    };
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(task) {
        task.callback = null;
    };
    exports.unstable_continueExecution = function() {
        isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = !0, requestHostCallback());
    };
    exports.unstable_forceFrameRate = function(fps) {
        0 > fps || 125 < fps ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
    };
    exports.unstable_getCurrentPriorityLevel = function() {
        return currentPriorityLevel;
    };
    exports.unstable_getFirstCallbackNode = function() {
        return peek(taskQueue);
    };
    exports.unstable_next = function(eventHandler) {
        switch(currentPriorityLevel){
            case 1:
            case 2:
            case 3:
                var priorityLevel = 3;
                break;
            default:
                priorityLevel = currentPriorityLevel;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
            return eventHandler();
        } finally{
            currentPriorityLevel = previousPriorityLevel;
        }
    };
    exports.unstable_pauseExecution = function() {};
    exports.unstable_requestPaint = function() {};
    exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
        switch(priorityLevel){
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                priorityLevel = 3;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
            return eventHandler();
        } finally{
            currentPriorityLevel = previousPriorityLevel;
        }
    };
    exports.unstable_scheduleCallback = function(priorityLevel, callback, options) {
        var currentTime = exports.unstable_now();
        "object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
        switch(priorityLevel){
            case 1:
                var timeout = -1;
                break;
            case 2:
                timeout = 250;
                break;
            case 5:
                timeout = 1073741823;
                break;
            case 4:
                timeout = 1e4;
                break;
            default:
                timeout = 5e3;
        }
        timeout = options + timeout;
        priorityLevel = {
            id: taskIdCounter++,
            callback: callback,
            priorityLevel: priorityLevel,
            startTime: options,
            expirationTime: timeout,
            sortIndex: -1
        };
        options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = !0, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = !0, requestHostCallback()));
        return priorityLevel;
    };
    exports.unstable_shouldYield = shouldYieldToHost;
    exports.unstable_wrapCallback = function(callback) {
        var parentPriorityLevel = currentPriorityLevel;
        return function() {
            var previousPriorityLevel = currentPriorityLevel;
            currentPriorityLevel = parentPriorityLevel;
            try {
                return callback.apply(this, arguments);
            } finally{
                currentPriorityLevel = previousPriorityLevel;
            }
        };
    };
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
}();
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/fiber/node_modules/scheduler/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/fiber/node_modules/scheduler/cjs/scheduler.development.js [app-client] (ecmascript)");
}
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/its-fine/dist/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FiberProvider",
    ()=>m,
    "traverseFiber",
    ()=>i,
    "useContainer",
    ()=>w,
    "useContextBridge",
    ()=>x,
    "useContextMap",
    ()=>h,
    "useFiber",
    ()=>c,
    "useNearestChild",
    ()=>v,
    "useNearestParent",
    ()=>y
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
const f = /* @__PURE__ */ (()=>{
    var e, t;
    return typeof window != "undefined" && (((e = window.document) == null ? void 0 : e.createElement) || ((t = window.navigator) == null ? void 0 : t.product) === "ReactNative");
})() ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"] : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"];
function i(e, t, r) {
    if (!e) return;
    if (r(e) === !0) return e;
    let n = t ? e.return : e.child;
    for(; n;){
        const u = i(n, t, r);
        if (u) return u;
        n = t ? null : n.sibling;
    }
}
function l(e) {
    try {
        return Object.defineProperties(e, {
            _currentRenderer: {
                get () {
                    return null;
                },
                set () {}
            },
            _currentRenderer2: {
                get () {
                    return null;
                },
                set () {}
            }
        });
    } catch (t) {
        return e;
    }
}
const a = /* @__PURE__ */ l(/* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](null));
class m extends __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Component"] {
    render() {
        return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](a.Provider, {
            value: this._reactInternals
        }, this.props.children);
    }
}
function c() {
    const e = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](a);
    if (e === null) throw new Error("its-fine: useFiber must be called within a <FiberProvider />!");
    const t = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]();
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "c.useMemo": ()=>{
            for (const n of [
                e,
                e == null ? void 0 : e.alternate
            ]){
                if (!n) continue;
                const u = i(n, !1, {
                    "c.useMemo.u": (d)=>{
                        let s = d.memoizedState;
                        for(; s;){
                            if (s.memoizedState === t) return !0;
                            s = s.next;
                        }
                    }
                }["c.useMemo.u"]);
                if (u) return u;
            }
        }
    }["c.useMemo"], [
        e,
        t
    ]);
}
function w() {
    const e = c(), t = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "w.useMemo[t]": ()=>i(e, !0, {
                "w.useMemo[t]": (r)=>{
                    var n;
                    return ((n = r.stateNode) == null ? void 0 : n.containerInfo) != null;
                }
            }["w.useMemo[t]"])
    }["w.useMemo[t]"], [
        e
    ]);
    return t == null ? void 0 : t.stateNode.containerInfo;
}
function v(e) {
    const t = c(), r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](void 0);
    return f(()=>{
        var n;
        r.current = (n = i(t, !1, (u)=>typeof u.type == "string" && (e === void 0 || u.type === e))) == null ? void 0 : n.stateNode;
    }, [
        t
    ]), r;
}
function y(e) {
    const t = c(), r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](void 0);
    return f(()=>{
        var n;
        r.current = (n = i(t, !0, (u)=>typeof u.type == "string" && (e === void 0 || u.type === e))) == null ? void 0 : n.stateNode;
    }, [
        t
    ]), r;
}
const p = Symbol.for("react.context"), b = (e)=>e !== null && typeof e == "object" && "$$typeof" in e && e.$$typeof === p;
function h() {
    const e = c(), [t] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "h.useState": ()=>/* @__PURE__ */ new Map()
    }["h.useState"]);
    t.clear();
    let r = e;
    for(; r;){
        const n = r.type;
        b(n) && n !== a && !t.has(n) && t.set(n, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"](l(n))), r = r.return;
    }
    return t;
}
function x() {
    const e = h();
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "x.useMemo": ()=>Array.from(e.keys()).reduce({
                "x.useMemo": (t, r)=>({
                        "x.useMemo": (n)=>/* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](t, null, /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](r.Provider, {
                                ...n,
                                value: e.get(r)
                            }))
                    })["x.useMemo"]
            }["x.useMemo"], {
                "x.useMemo": (t)=>/* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](m, {
                        ...t
                    })
            }["x.useMemo"])
    }["x.useMemo"], [
        e
    ]);
}
;
 //# sourceMappingURL=index.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/react-use-measure/dist/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>j
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function g(n, t) {
    let o;
    return function() {
        for(var _len = arguments.length, i = new Array(_len), _key = 0; _key < _len; _key++){
            i[_key] = arguments[_key];
        }
        window.clearTimeout(o), o = window.setTimeout(()=>n(...i), t);
    };
}
function j() {
    let { debounce: n, scroll: t, polyfill: o, offsetSize: i } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
        debounce: 0,
        scroll: !1,
        offsetSize: !1
    };
    const a = o || (typeof window == "undefined" ? class {
    } : window.ResizeObserver);
    if (!a) throw new Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");
    const [c, h] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0
    }), e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        element: null,
        scrollContainers: null,
        resizeObserver: null,
        lastBounds: c,
        orientationHandler: null
    }), d = n ? typeof n == "number" ? n : n.scroll : null, f = n ? typeof n == "number" ? n : n.resize : null, w = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(!1);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>(w.current = !0, ()=>void (w.current = !1)));
    const [z, m, s] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const r = ()=>{
            if (!e.current.element) return;
            const { left: y, top: C, width: H, height: O, bottom: S, right: x, x: B, y: R } = e.current.element.getBoundingClientRect(), l = {
                left: y,
                top: C,
                width: H,
                height: O,
                bottom: S,
                right: x,
                x: B,
                y: R
            };
            e.current.element instanceof HTMLElement && i && (l.height = e.current.element.offsetHeight, l.width = e.current.element.offsetWidth), Object.freeze(l), w.current && !D(e.current.lastBounds, l) && h(e.current.lastBounds = l);
        };
        return [
            r,
            f ? g(r, f) : r,
            d ? g(r, d) : r
        ];
    }, [
        h,
        i,
        d,
        f
    ]);
    function v() {
        e.current.scrollContainers && (e.current.scrollContainers.forEach((r)=>r.removeEventListener("scroll", s, !0)), e.current.scrollContainers = null), e.current.resizeObserver && (e.current.resizeObserver.disconnect(), e.current.resizeObserver = null), e.current.orientationHandler && ("orientation" in screen && "removeEventListener" in screen.orientation ? screen.orientation.removeEventListener("change", e.current.orientationHandler) : "onorientationchange" in window && window.removeEventListener("orientationchange", e.current.orientationHandler));
    }
    function b() {
        e.current.element && (e.current.resizeObserver = new a(s), e.current.resizeObserver.observe(e.current.element), t && e.current.scrollContainers && e.current.scrollContainers.forEach((r)=>r.addEventListener("scroll", s, {
                capture: !0,
                passive: !0
            })), e.current.orientationHandler = ()=>{
            s();
        }, "orientation" in screen && "addEventListener" in screen.orientation ? screen.orientation.addEventListener("change", e.current.orientationHandler) : "onorientationchange" in window && window.addEventListener("orientationchange", e.current.orientationHandler));
    }
    const L = (r)=>{
        !r || r === e.current.element || (v(), e.current.element = r, e.current.scrollContainers = E(r), b());
    };
    return X(s, !!t), W(m), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        v(), b();
    }, [
        t,
        s,
        m
    ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>v, []), [
        L,
        c,
        z
    ];
}
function W(n) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const t = n;
        return window.addEventListener("resize", t), ()=>void window.removeEventListener("resize", t);
    }, [
        n
    ]);
}
function X(n, t) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (t) {
            const o = n;
            return window.addEventListener("scroll", o, {
                capture: !0,
                passive: !0
            }), ()=>void window.removeEventListener("scroll", o, !0);
        }
    }, [
        n,
        t
    ]);
}
function E(n) {
    const t = [];
    if (!n || n === document.body) return t;
    const { overflow: o, overflowX: i, overflowY: a } = window.getComputedStyle(n);
    return [
        o,
        i,
        a
    ].some((c)=>c === "auto" || c === "scroll") && t.push(n), [
        ...t,
        ...E(n.parentElement)
    ];
}
const k = [
    "x",
    "y",
    "top",
    "bottom",
    "left",
    "right",
    "width",
    "height"
], D = (n, t)=>k.every((o)=>n[o] === t[o]);
;
 //# sourceMappingURL=index.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/@babel/runtime/helpers/esm/extends.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>_extends
]);
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/drei/core/OrbitControls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OrbitControls",
    ()=>OrbitControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/@babel/runtime/helpers/esm/extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/fiber/dist/events-e3cb66e2.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/fiber/dist/events-e3cb66e2.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/controls/OrbitControls.js [app-client] (ecmascript)");
;
;
;
;
const OrbitControls = /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((param, ref)=>{
    let { makeDefault, camera, regress, domElement, enableDamping = true, keyEvents = false, onChange, onStart, onEnd, ...restProps } = param;
    const invalidate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])({
        "OrbitControls.useThree[invalidate]": (state)=>state.invalidate
    }["OrbitControls.useThree[invalidate]"]);
    const defaultCamera = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])({
        "OrbitControls.useThree[defaultCamera]": (state)=>state.camera
    }["OrbitControls.useThree[defaultCamera]"]);
    const gl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])({
        "OrbitControls.useThree[gl]": (state)=>state.gl
    }["OrbitControls.useThree[gl]"]);
    const events = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])({
        "OrbitControls.useThree[events]": (state)=>state.events
    }["OrbitControls.useThree[events]"]);
    const setEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])({
        "OrbitControls.useThree[setEvents]": (state)=>state.setEvents
    }["OrbitControls.useThree[setEvents]"]);
    const set = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])({
        "OrbitControls.useThree[set]": (state)=>state.set
    }["OrbitControls.useThree[set]"]);
    const get = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])({
        "OrbitControls.useThree[get]": (state)=>state.get
    }["OrbitControls.useThree[get]"]);
    const performance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])({
        "OrbitControls.useThree[performance]": (state)=>state.performance
    }["OrbitControls.useThree[performance]"]);
    const explCamera = camera || defaultCamera;
    const explDomElement = domElement || events.connected || gl.domElement;
    const controls = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "OrbitControls.useMemo[controls]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrbitControls"](explCamera)
    }["OrbitControls.useMemo[controls]"], [
        explCamera
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "OrbitControls.useFrame": ()=>{
            if (controls.enabled) controls.update();
        }
    }["OrbitControls.useFrame"], -1);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "OrbitControls.useEffect": ()=>{
            if (keyEvents) {
                controls.connect(keyEvents === true ? explDomElement : keyEvents);
            }
            controls.connect(explDomElement);
            return ({
                "OrbitControls.useEffect": ()=>void controls.dispose()
            })["OrbitControls.useEffect"];
        }
    }["OrbitControls.useEffect"], [
        keyEvents,
        explDomElement,
        regress,
        controls,
        invalidate
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "OrbitControls.useEffect": ()=>{
            const callback = {
                "OrbitControls.useEffect.callback": (e)=>{
                    invalidate();
                    if (regress) performance.regress();
                    if (onChange) onChange(e);
                }
            }["OrbitControls.useEffect.callback"];
            const onStartCb = {
                "OrbitControls.useEffect.onStartCb": (e)=>{
                    if (onStart) onStart(e);
                }
            }["OrbitControls.useEffect.onStartCb"];
            const onEndCb = {
                "OrbitControls.useEffect.onEndCb": (e)=>{
                    if (onEnd) onEnd(e);
                }
            }["OrbitControls.useEffect.onEndCb"];
            controls.addEventListener('change', callback);
            controls.addEventListener('start', onStartCb);
            controls.addEventListener('end', onEndCb);
            return ({
                "OrbitControls.useEffect": ()=>{
                    controls.removeEventListener('start', onStartCb);
                    controls.removeEventListener('end', onEndCb);
                    controls.removeEventListener('change', callback);
                }
            })["OrbitControls.useEffect"];
        }
    }["OrbitControls.useEffect"], [
        onChange,
        onStart,
        onEnd,
        controls,
        invalidate,
        setEvents
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "OrbitControls.useEffect": ()=>{
            if (makeDefault) {
                const old = get().controls;
                // @ts-ignore https://github.com/three-types/three-ts-types/pull/1398
                set({
                    controls
                });
                return ({
                    "OrbitControls.useEffect": ()=>set({
                            controls: old
                        })
                })["OrbitControls.useEffect"];
            }
        }
    }["OrbitControls.useEffect"], [
        makeDefault,
        controls
    ]);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("primitive", (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        ref: ref,
        object: controls,
        enableDamping: enableDamping
    }, restProps));
});
;
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/drei/core/Clone.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Clone",
    ()=>Clone
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/@babel/runtime/helpers/esm/extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$utils$2f$SkeletonUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/utils/SkeletonUtils.js [app-client] (ecmascript)");
;
;
;
;
function createSpread(child, param) {
    let { keys = [
        'near',
        'far',
        'color',
        'distance',
        'decay',
        'penumbra',
        'angle',
        'intensity',
        'skeleton',
        'visible',
        'castShadow',
        'receiveShadow',
        'morphTargetDictionary',
        'morphTargetInfluences',
        'name',
        'geometry',
        'material',
        'position',
        'rotation',
        'scale',
        'up',
        'userData',
        'bindMode',
        'bindMatrix',
        'bindMatrixInverse',
        'skeleton'
    ], deep, inject, castShadow, receiveShadow } = param;
    let spread = {};
    for (const key of keys){
        spread[key] = child[key];
    }
    if (deep) {
        if (spread.geometry && deep !== 'materialsOnly') spread.geometry = spread.geometry.clone();
        if (spread.material && deep !== 'geometriesOnly') spread.material = spread.material.clone();
    }
    if (inject) {
        if (typeof inject === 'function') spread = {
            ...spread,
            children: inject(child)
        };
        else if (/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"](inject)) spread = {
            ...spread,
            children: inject
        };
        else spread = {
            ...spread,
            ...inject
        };
    }
    if (child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"]) {
        if (castShadow) spread.castShadow = true;
        if (receiveShadow) spread.receiveShadow = true;
    }
    return spread;
}
const Clone = /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((param, forwardRef)=>{
    let { isChild = false, object, children, deep, castShadow, receiveShadow, inject, keys, ...props } = param;
    const config = {
        keys,
        deep,
        inject,
        castShadow,
        receiveShadow
    };
    object = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "Clone.useMemo": ()=>{
            if (isChild === false && !Array.isArray(object)) {
                let isSkinned = false;
                object.traverse({
                    "Clone.useMemo": (object)=>{
                        if (object.isSkinnedMesh) isSkinned = true;
                    }
                }["Clone.useMemo"]);
                if (isSkinned) return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$utils$2f$SkeletonUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkeletonUtils"].clone(object);
            }
            return object;
        }
    }["Clone.useMemo"], [
        object,
        isChild
    ]);
    // Deal with arrayed clones
    if (Array.isArray(object)) {
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("group", (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({}, props, {
            ref: forwardRef
        }), object.map((o)=>/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](Clone, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
                key: o.uuid,
                object: o
            }, config))), children);
    }
    // Singleton clones
    const { children: injectChildren, ...spread } = createSpread(object, config);
    const Element = object.type[0].toLowerCase() + object.type.slice(1);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](Element, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({}, spread, props, {
        ref: forwardRef
    }), object.children.map((child)=>{
        if (child.type === 'Bone') return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("primitive", (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
            key: child.uuid,
            object: child
        }, config));
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](Clone, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
            key: child.uuid,
            object: child
        }, config, {
            isChild: true
        }));
    }), children, injectChildren);
});
;
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/drei/core/Gltf.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Gltf",
    ()=>Gltf,
    "useGLTF",
    ()=>useGLTF
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/@babel/runtime/helpers/esm/extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$loaders$2f$GLTFLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/loaders/GLTFLoader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$loaders$2f$DRACOLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/loaders/DRACOLoader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$MeshoptDecoder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/libs/MeshoptDecoder.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__G__as__useLoader$3e$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/fiber/dist/events-e3cb66e2.esm.js [app-client] (ecmascript) <export G as useLoader>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Clone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/drei/core/Clone.js [app-client] (ecmascript)");
;
;
;
;
;
let dracoLoader = null;
let decoderPath = 'https://www.gstatic.com/draco/versioned/decoders/1.5.5/';
function extensions() {
    let useDraco = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true, useMeshopt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true, extendLoader = arguments.length > 2 ? arguments[2] : void 0;
    return (loader)=>{
        if (extendLoader) {
            extendLoader(loader);
        }
        if (useDraco) {
            if (!dracoLoader) {
                dracoLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$loaders$2f$DRACOLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DRACOLoader"]();
            }
            dracoLoader.setDecoderPath(typeof useDraco === 'string' ? useDraco : decoderPath);
            loader.setDRACOLoader(dracoLoader);
        }
        if (useMeshopt) {
            loader.setMeshoptDecoder(typeof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$MeshoptDecoder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshoptDecoder"] === 'function' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$MeshoptDecoder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshoptDecoder"])() : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$MeshoptDecoder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshoptDecoder"]);
        }
    };
}
const useGLTF = (path, useDraco, useMeshopt, extendLoader)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__G__as__useLoader$3e$__["useLoader"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$loaders$2f$GLTFLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLTFLoader"], path, extensions(useDraco, useMeshopt, extendLoader));
useGLTF.preload = (path, useDraco, useMeshopt, extendLoader)=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__G__as__useLoader$3e$__["useLoader"].preload(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$loaders$2f$GLTFLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLTFLoader"], path, extensions(useDraco, useMeshopt, extendLoader));
useGLTF.clear = (path)=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__G__as__useLoader$3e$__["useLoader"].clear(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$loaders$2f$GLTFLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLTFLoader"], path);
useGLTF.setDecoderPath = (path)=>{
    decoderPath = path;
};
//
const Gltf = /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((param, ref)=>{
    let { src, useDraco, useMeshOpt, extendLoader, ...props } = param;
    const { scene } = useGLTF(src, useDraco, useMeshOpt, extendLoader);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Clone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Clone"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        ref: ref
    }, props, {
        object: scene
    }));
});
;
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/drei/helpers/environment-assets.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "presetsObj",
    ()=>presetsObj
]);
const presetsObj = {
    apartment: 'lebombo_1k.hdr',
    city: 'potsdamer_platz_1k.hdr',
    dawn: 'kiara_1_dawn_1k.hdr',
    forest: 'forest_slope_1k.hdr',
    lobby: 'st_fagans_interior_1k.hdr',
    night: 'dikhololo_night_1k.hdr',
    park: 'rooitou_park_1k.hdr',
    studio: 'studio_small_03_1k.hdr',
    sunset: 'venice_sunset_1k.hdr',
    warehouse: 'empty_warehouse_01_1k.hdr'
};
;
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/drei/core/useEnvironment.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEnvironment",
    ()=>useEnvironment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/fiber/dist/events-e3cb66e2.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__G__as__useLoader$3e$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/fiber/dist/events-e3cb66e2.esm.js [app-client] (ecmascript) <export G as useLoader>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$loaders$2f$RGBELoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/loaders/RGBELoader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$loaders$2f$EXRLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/loaders/EXRLoader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$monogrid$2f$gainmap$2d$js$2f$dist$2f$decode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/@monogrid/gainmap-js/dist/decode.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$drei$2f$helpers$2f$environment$2d$assets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/drei/helpers/environment-assets.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
;
;
;
;
const CUBEMAP_ROOT = 'https://raw.githack.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/';
const isArray = (arr)=>Array.isArray(arr);
const defaultFiles = [
    '/px.png',
    '/nx.png',
    '/py.png',
    '/ny.png',
    '/pz.png',
    '/nz.png'
];
function useEnvironment() {
    let { files = defaultFiles, path = '', preset = undefined, colorSpace = undefined, extensions } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (preset) {
        validatePreset(preset);
        files = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$drei$2f$helpers$2f$environment$2d$assets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["presetsObj"][preset];
        path = CUBEMAP_ROOT;
    }
    // Everything else
    const multiFile = isArray(files);
    const { extension, isCubemap } = getExtension(files);
    const loader = getLoader(extension);
    if (!loader) throw new Error('useEnvironment: Unrecognized file extension: ' + files);
    const gl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])({
        "useEnvironment.useThree[gl]": (state)=>state.gl
    }["useEnvironment.useThree[gl]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "useEnvironment.useLayoutEffect": ()=>{
            // Only required for gainmap
            if (extension !== 'webp' && extension !== 'jpg' && extension !== 'jpeg') return;
            function clearGainmapTexture() {
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__G__as__useLoader$3e$__["useLoader"].clear(loader, multiFile ? [
                    files
                ] : files);
            }
            gl.domElement.addEventListener('webglcontextlost', clearGainmapTexture, {
                once: true
            });
        }
    }["useEnvironment.useLayoutEffect"], [
        files,
        gl.domElement
    ]);
    const loaderResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__G__as__useLoader$3e$__["useLoader"])(loader, multiFile ? [
        files
    ] : files, {
        "useEnvironment.useLoader[loaderResult]": (loader)=>{
            // Gainmap requires a renderer
            if (extension === 'webp' || extension === 'jpg' || extension === 'jpeg') {
                // @ts-expect-error
                loader.setRenderer(gl);
            }
            loader.setPath == null || loader.setPath(path);
            // @ts-expect-error
            if (extensions) extensions(loader);
        }
    }["useEnvironment.useLoader[loaderResult]"]);
    let texture = multiFile ? // @ts-ignore
    loaderResult[0] : loaderResult;
    if (extension === 'jpg' || extension === 'jpeg' || extension === 'webp') {
        var _renderTarget;
        texture = (_renderTarget = texture.renderTarget) == null ? void 0 : _renderTarget.texture;
    }
    texture.mapping = isCubemap ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CubeReflectionMapping"] : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EquirectangularReflectionMapping"];
    texture.colorSpace = colorSpace !== null && colorSpace !== void 0 ? colorSpace : isCubemap ? 'srgb' : 'srgb-linear';
    return texture;
}
const preloadDefaultOptions = {
    files: defaultFiles,
    path: '',
    preset: undefined,
    extensions: undefined
};
useEnvironment.preload = (preloadOptions)=>{
    const options = {
        ...preloadDefaultOptions,
        ...preloadOptions
    };
    let { files, path = '' } = options;
    const { preset, extensions } = options;
    if (preset) {
        validatePreset(preset);
        files = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$drei$2f$helpers$2f$environment$2d$assets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["presetsObj"][preset];
        path = CUBEMAP_ROOT;
    }
    const { extension } = getExtension(files);
    if (extension === 'webp' || extension === 'jpg' || extension === 'jpeg') {
        throw new Error('useEnvironment: Preloading gainmaps is not supported');
    }
    const loader = getLoader(extension);
    if (!loader) throw new Error('useEnvironment: Unrecognized file extension: ' + files);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__G__as__useLoader$3e$__["useLoader"].preload(loader, isArray(files) ? [
        files
    ] : files, (loader)=>{
        loader.setPath == null || loader.setPath(path);
        // @ts-expect-error
        if (extensions) extensions(loader);
    });
};
const clearDefaultOptins = {
    files: defaultFiles,
    preset: undefined
};
useEnvironment.clear = (clearOptions)=>{
    const options = {
        ...clearDefaultOptins,
        ...clearOptions
    };
    let { files } = options;
    const { preset } = options;
    if (preset) {
        validatePreset(preset);
        files = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$drei$2f$helpers$2f$environment$2d$assets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["presetsObj"][preset];
    }
    const { extension } = getExtension(files);
    const loader = getLoader(extension);
    if (!loader) throw new Error('useEnvironment: Unrecognized file extension: ' + files);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__G__as__useLoader$3e$__["useLoader"].clear(loader, isArray(files) ? [
        files
    ] : files);
};
function validatePreset(preset) {
    if (!(preset in __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$drei$2f$helpers$2f$environment$2d$assets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["presetsObj"])) throw new Error('Preset must be one of: ' + Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$drei$2f$helpers$2f$environment$2d$assets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["presetsObj"]).join(', '));
}
function getExtension(files) {
    var _firstEntry$split$pop;
    const isCubemap = isArray(files) && files.length === 6;
    const isGainmap = isArray(files) && files.length === 3 && files.some((file)=>file.endsWith('json'));
    const firstEntry = isArray(files) ? files[0] : files;
    // Everything else
    const extension = isCubemap ? 'cube' : isGainmap ? 'webp' : firstEntry.startsWith('data:application/exr') ? 'exr' : firstEntry.startsWith('data:application/hdr') ? 'hdr' : firstEntry.startsWith('data:image/jpeg') ? 'jpg' : (_firstEntry$split$pop = firstEntry.split('.').pop()) == null || (_firstEntry$split$pop = _firstEntry$split$pop.split('?')) == null || (_firstEntry$split$pop = _firstEntry$split$pop.shift()) == null ? void 0 : _firstEntry$split$pop.toLowerCase();
    return {
        extension,
        isCubemap,
        isGainmap
    };
}
function getLoader(extension) {
    const loader = extension === 'cube' ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CubeTextureLoader"] : extension === 'hdr' ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$loaders$2f$RGBELoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBELoader"] : extension === 'exr' ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$loaders$2f$EXRLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EXRLoader"] : extension === 'jpg' || extension === 'jpeg' ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$monogrid$2f$gainmap$2d$js$2f$dist$2f$decode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["HDRJPGLoader"] : extension === 'webp' ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$monogrid$2f$gainmap$2d$js$2f$dist$2f$decode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GainMapLoader"] : null;
    return loader;
}
;
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/drei/core/Environment.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Environment",
    ()=>Environment,
    "EnvironmentCube",
    ()=>EnvironmentCube,
    "EnvironmentMap",
    ()=>EnvironmentMap,
    "EnvironmentPortal",
    ()=>EnvironmentPortal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/@babel/runtime/helpers/esm/extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/fiber/dist/events-e3cb66e2.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/fiber/dist/events-e3cb66e2.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__o__as__createPortal$3e$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/fiber/dist/events-e3cb66e2.esm.js [app-client] (ecmascript) <export o as createPortal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__s__as__applyProps$3e$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/fiber/dist/events-e3cb66e2.esm.js [app-client] (ecmascript) <export s as applyProps>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__e__as__extend$3e$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/fiber/dist/events-e3cb66e2.esm.js [app-client] (ecmascript) <export e as extend>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$objects$2f$GroundProjectedEnv$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/objects/GroundProjectedEnv.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$useEnvironment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/@react-three/drei/core/useEnvironment.js [app-client] (ecmascript)");
;
;
;
;
;
;
const isRef = (obj)=>obj.current && obj.current.isScene;
const resolveScene = (scene)=>isRef(scene) ? scene.current : scene;
function setEnvProps(background, scene, defaultScene, texture) {
    let sceneProps = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {};
    var _target$backgroundRot, _target$backgroundRot2, _target$environmentRo, _target$environmentRo2;
    // defaults
    sceneProps = {
        backgroundBlurriness: 0,
        backgroundIntensity: 1,
        backgroundRotation: [
            0,
            0,
            0
        ],
        environmentIntensity: 1,
        environmentRotation: [
            0,
            0,
            0
        ],
        ...sceneProps
    };
    const target = resolveScene(scene || defaultScene);
    const oldbg = target.background;
    const oldenv = target.environment;
    const oldSceneProps = {
        // @ts-ignore
        backgroundBlurriness: target.backgroundBlurriness,
        // @ts-ignore
        backgroundIntensity: target.backgroundIntensity,
        // @ts-ignore
        backgroundRotation: (_target$backgroundRot = (_target$backgroundRot2 = target.backgroundRotation) == null || _target$backgroundRot2.clone == null ? void 0 : _target$backgroundRot2.clone()) !== null && _target$backgroundRot !== void 0 ? _target$backgroundRot : [
            0,
            0,
            0
        ],
        // @ts-ignore
        environmentIntensity: target.environmentIntensity,
        // @ts-ignore
        environmentRotation: (_target$environmentRo = (_target$environmentRo2 = target.environmentRotation) == null || _target$environmentRo2.clone == null ? void 0 : _target$environmentRo2.clone()) !== null && _target$environmentRo !== void 0 ? _target$environmentRo : [
            0,
            0,
            0
        ]
    };
    if (background !== 'only') target.environment = texture;
    if (background) target.background = texture;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__s__as__applyProps$3e$__["applyProps"])(target, sceneProps);
    return ()=>{
        if (background !== 'only') target.environment = oldenv;
        if (background) target.background = oldbg;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__s__as__applyProps$3e$__["applyProps"])(target, oldSceneProps);
    };
}
function EnvironmentMap(param) {
    let { scene, background = false, map, ...config } = param;
    const defaultScene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])({
        "EnvironmentMap.useThree[defaultScene]": (state)=>state.scene
    }["EnvironmentMap.useThree[defaultScene]"]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"]({
        "EnvironmentMap.useLayoutEffect": ()=>{
            if (map) return setEnvProps(background, scene, defaultScene, map, config);
        }
    }["EnvironmentMap.useLayoutEffect"]);
    return null;
}
function EnvironmentCube(param) {
    let { background = false, scene, blur, backgroundBlurriness, backgroundIntensity, backgroundRotation, environmentIntensity, environmentRotation, ...rest } = param;
    const texture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$useEnvironment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnvironment"])(rest);
    const defaultScene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])({
        "EnvironmentCube.useThree[defaultScene]": (state)=>state.scene
    }["EnvironmentCube.useThree[defaultScene]"]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"]({
        "EnvironmentCube.useLayoutEffect": ()=>{
            return setEnvProps(background, scene, defaultScene, texture, {
                backgroundBlurriness: blur !== null && blur !== void 0 ? blur : backgroundBlurriness,
                backgroundIntensity,
                backgroundRotation,
                environmentIntensity,
                environmentRotation
            });
        }
    }["EnvironmentCube.useLayoutEffect"]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "EnvironmentCube.useEffect": ()=>{
            return ({
                "EnvironmentCube.useEffect": ()=>{
                    texture.dispose();
                }
            })["EnvironmentCube.useEffect"];
        }
    }["EnvironmentCube.useEffect"], [
        texture
    ]);
    return null;
}
function EnvironmentPortal(param) {
    let { children, near = 0.1, far = 1000, resolution = 256, frames = 1, map, background = false, blur, backgroundBlurriness, backgroundIntensity, backgroundRotation, environmentIntensity, environmentRotation, scene, files, path, preset = undefined, extensions } = param;
    const gl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])({
        "EnvironmentPortal.useThree[gl]": (state)=>state.gl
    }["EnvironmentPortal.useThree[gl]"]);
    const defaultScene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])({
        "EnvironmentPortal.useThree[defaultScene]": (state)=>state.scene
    }["EnvironmentPortal.useThree[defaultScene]"]);
    const camera = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const [virtualScene] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "EnvironmentPortal.useState": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]()
    }["EnvironmentPortal.useState"]);
    const fbo = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "EnvironmentPortal.useMemo[fbo]": ()=>{
            const fbo = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebGLCubeRenderTarget"](resolution);
            fbo.texture.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HalfFloatType"];
            return fbo;
        }
    }["EnvironmentPortal.useMemo[fbo]"], [
        resolution
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "EnvironmentPortal.useEffect": ()=>{
            return ({
                "EnvironmentPortal.useEffect": ()=>{
                    fbo.dispose();
                }
            })["EnvironmentPortal.useEffect"];
        }
    }["EnvironmentPortal.useEffect"], [
        fbo
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"]({
        "EnvironmentPortal.useLayoutEffect": ()=>{
            if (frames === 1) {
                const autoClear = gl.autoClear;
                gl.autoClear = true;
                camera.current.update(gl, virtualScene);
                gl.autoClear = autoClear;
            }
            return setEnvProps(background, scene, defaultScene, fbo.texture, {
                backgroundBlurriness: blur !== null && blur !== void 0 ? blur : backgroundBlurriness,
                backgroundIntensity,
                backgroundRotation,
                environmentIntensity,
                environmentRotation
            });
        }
    }["EnvironmentPortal.useLayoutEffect"], [
        children,
        virtualScene,
        fbo.texture,
        scene,
        defaultScene,
        background,
        frames,
        gl
    ]);
    let count = 1;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "EnvironmentPortal.useFrame": ()=>{
            if (frames === Infinity || count < frames) {
                const autoClear = gl.autoClear;
                gl.autoClear = true;
                camera.current.update(gl, virtualScene);
                gl.autoClear = autoClear;
                count++;
            }
        }
    }["EnvironmentPortal.useFrame"]);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], null, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__o__as__createPortal$3e$__["createPortal"])(/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], null, children, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("cubeCamera", {
        ref: camera,
        args: [
            near,
            far,
            fbo
        ]
    }), files || preset ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](EnvironmentCube, {
        background: true,
        files: files,
        preset: preset,
        path: path,
        extensions: extensions
    }) : map ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](EnvironmentMap, {
        background: true,
        map: map,
        extensions: extensions
    }) : null), virtualScene));
}
function EnvironmentGround(props) {
    var _props$ground, _props$ground2, _scale, _props$ground3;
    const textureDefault = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$useEnvironment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnvironment"])(props);
    const texture = props.map || textureDefault;
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "EnvironmentGround.useMemo": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__e__as__extend$3e$__["extend"])({
                GroundProjectedEnvImpl: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$objects$2f$GroundProjectedEnv$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GroundProjectedEnv"]
            })
    }["EnvironmentGround.useMemo"], []);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "EnvironmentGround.useEffect": ()=>{
            return ({
                "EnvironmentGround.useEffect": ()=>{
                    textureDefault.dispose();
                }
            })["EnvironmentGround.useEffect"];
        }
    }["EnvironmentGround.useEffect"], [
        textureDefault
    ]);
    const args = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "EnvironmentGround.useMemo[args]": ()=>[
                texture
            ]
    }["EnvironmentGround.useMemo[args]"], [
        texture
    ]);
    const height = (_props$ground = props.ground) == null ? void 0 : _props$ground.height;
    const radius = (_props$ground2 = props.ground) == null ? void 0 : _props$ground2.radius;
    const scale = (_scale = (_props$ground3 = props.ground) == null ? void 0 : _props$ground3.scale) !== null && _scale !== void 0 ? _scale : 1000;
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](EnvironmentMap, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({}, props, {
        map: texture
    })), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("groundProjectedEnvImpl", {
        args: args,
        scale: scale,
        height: height,
        radius: radius
    }));
}
function Environment(props) {
    return props.ground ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](EnvironmentGround, props) : props.map ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](EnvironmentMap, props) : props.children ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](EnvironmentPortal, props) : /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](EnvironmentCube, props);
}
;
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/node_modules/fflate/esm/browser.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// DEFLATE is a complex format; to read this code, you should probably check the RFC first:
// https://tools.ietf.org/html/rfc1951
// You may also wish to take a look at the guide I made about this program:
// https://gist.github.com/101arrowz/253f31eb5abc3d9275ab943003ffecad
// Some of the following code is similar to that of UZIP.js:
// https://github.com/photopea/UZIP.js
// However, the vast majority of the codebase has diverged from UZIP.js to increase performance and reduce bundle size.
// Sometimes 0 will appear where -1 would be more appropriate. This is because using a uint
// is better for memory in most engines (I *think*).
__turbopack_context__.s([
    "AsyncCompress",
    ()=>AsyncGzip,
    "AsyncDecompress",
    ()=>AsyncDecompress,
    "AsyncDeflate",
    ()=>AsyncDeflate,
    "AsyncGunzip",
    ()=>AsyncGunzip,
    "AsyncGzip",
    ()=>AsyncGzip,
    "AsyncInflate",
    ()=>AsyncInflate,
    "AsyncUnzipInflate",
    ()=>AsyncUnzipInflate,
    "AsyncUnzlib",
    ()=>AsyncUnzlib,
    "AsyncZipDeflate",
    ()=>AsyncZipDeflate,
    "AsyncZlib",
    ()=>AsyncZlib,
    "Compress",
    ()=>Gzip,
    "DecodeUTF8",
    ()=>DecodeUTF8,
    "Decompress",
    ()=>Decompress,
    "Deflate",
    ()=>Deflate,
    "EncodeUTF8",
    ()=>EncodeUTF8,
    "Gunzip",
    ()=>Gunzip,
    "Gzip",
    ()=>Gzip,
    "Inflate",
    ()=>Inflate,
    "Unzip",
    ()=>Unzip,
    "UnzipInflate",
    ()=>UnzipInflate,
    "UnzipPassThrough",
    ()=>UnzipPassThrough,
    "Unzlib",
    ()=>Unzlib,
    "Zip",
    ()=>Zip,
    "ZipDeflate",
    ()=>ZipDeflate,
    "ZipPassThrough",
    ()=>ZipPassThrough,
    "Zlib",
    ()=>Zlib,
    "compress",
    ()=>gzip,
    "compressSync",
    ()=>gzipSync,
    "decompress",
    ()=>decompress,
    "decompressSync",
    ()=>decompressSync,
    "deflate",
    ()=>deflate,
    "deflateSync",
    ()=>deflateSync,
    "gunzip",
    ()=>gunzip,
    "gunzipSync",
    ()=>gunzipSync,
    "gzip",
    ()=>gzip,
    "gzipSync",
    ()=>gzipSync,
    "inflate",
    ()=>inflate,
    "inflateSync",
    ()=>inflateSync,
    "strFromU8",
    ()=>strFromU8,
    "strToU8",
    ()=>strToU8,
    "unzip",
    ()=>unzip,
    "unzipSync",
    ()=>unzipSync,
    "unzlib",
    ()=>unzlib,
    "unzlibSync",
    ()=>unzlibSync,
    "zip",
    ()=>zip,
    "zipSync",
    ()=>zipSync,
    "zlib",
    ()=>zlib,
    "zlibSync",
    ()=>zlibSync
]);
var ch2 = {};
var wk = function(c, id, msg, transfer, cb) {
    var w = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([
        c
    ], {
        type: 'text/javascript'
    }))));
    w.onerror = function(e) {
        return cb(e.error, null);
    };
    w.onmessage = function(e) {
        return cb(null, e.data);
    };
    w.postMessage(msg, transfer);
    return w;
};
// aliases for shorter compressed code (most minifers don't do this)
var u8 = Uint8Array, u16 = Uint16Array, u32 = Uint32Array;
// fixed length extra bits
var fleb = new u8([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    /* unused */ 0,
    0,
    /* impossible */ 0
]);
// fixed distance extra bits
// see fleb note
var fdeb = new u8([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    /* unused */ 0,
    0
]);
// code length index map
var clim = new u8([
    16,
    17,
    18,
    0,
    8,
    7,
    9,
    6,
    10,
    5,
    11,
    4,
    12,
    3,
    13,
    2,
    14,
    1,
    15
]);
// get base, reverse index map from extra bits
var freb = function(eb, start) {
    var b = new u16(31);
    for(var i = 0; i < 31; ++i){
        b[i] = start += 1 << eb[i - 1];
    }
    // numbers here are at max 18 bits
    var r = new u32(b[30]);
    for(var i = 1; i < 30; ++i){
        for(var j = b[i]; j < b[i + 1]; ++j){
            r[j] = j - b[i] << 5 | i;
        }
    }
    return [
        b,
        r
    ];
};
var _a = freb(fleb, 2), fl = _a[0], revfl = _a[1];
// we can ignore the fact that the other numbers are wrong; they never happen anyway
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0), fd = _b[0], revfd = _b[1];
// map of value to reverse (assuming 16 bits)
var rev = new u16(32768);
for(var i = 0; i < 32768; ++i){
    // reverse table algorithm from SO
    var x = (i & 0xAAAA) >>> 1 | (i & 0x5555) << 1;
    x = (x & 0xCCCC) >>> 2 | (x & 0x3333) << 2;
    x = (x & 0xF0F0) >>> 4 | (x & 0x0F0F) << 4;
    rev[i] = ((x & 0xFF00) >>> 8 | (x & 0x00FF) << 8) >>> 1;
}
// create huffman tree from u8 "map": index -> code length for code index
// mb (max bits) must be at most 15
// TODO: optimize/split up?
var hMap = function(cd, mb, r) {
    var s = cd.length;
    // index
    var i = 0;
    // u16 "map": index -> # of codes with bit length = index
    var l = new u16(mb);
    // length of cd must be 288 (total # of codes)
    for(; i < s; ++i)++l[cd[i] - 1];
    // u16 "map": index -> minimum code for bit length = index
    var le = new u16(mb);
    for(i = 0; i < mb; ++i){
        le[i] = le[i - 1] + l[i - 1] << 1;
    }
    var co;
    if (r) {
        // u16 "map": index -> number of actual bits, symbol for code
        co = new u16(1 << mb);
        // bits to remove for reverser
        var rvb = 15 - mb;
        for(i = 0; i < s; ++i){
            // ignore 0 lengths
            if (cd[i]) {
                // num encoding both symbol and bits read
                var sv = i << 4 | cd[i];
                // free bits
                var r_1 = mb - cd[i];
                // start value
                var v = le[cd[i] - 1]++ << r_1;
                // m is end value
                for(var m = v | (1 << r_1) - 1; v <= m; ++v){
                    // every 16 bit value starting with the code yields the same result
                    co[rev[v] >>> rvb] = sv;
                }
            }
        }
    } else {
        co = new u16(s);
        for(i = 0; i < s; ++i){
            if (cd[i]) {
                co[i] = rev[le[cd[i] - 1]++] >>> 15 - cd[i];
            }
        }
    }
    return co;
};
// fixed length tree
var flt = new u8(288);
for(var i = 0; i < 144; ++i)flt[i] = 8;
for(var i = 144; i < 256; ++i)flt[i] = 9;
for(var i = 256; i < 280; ++i)flt[i] = 7;
for(var i = 280; i < 288; ++i)flt[i] = 8;
// fixed distance tree
var fdt = new u8(32);
for(var i = 0; i < 32; ++i)fdt[i] = 5;
// fixed length map
var flm = /*#__PURE__*/ hMap(flt, 9, 0), flrm = /*#__PURE__*/ hMap(flt, 9, 1);
// fixed distance map
var fdm = /*#__PURE__*/ hMap(fdt, 5, 0), fdrm = /*#__PURE__*/ hMap(fdt, 5, 1);
// find max of array
var max = function(a) {
    var m = a[0];
    for(var i = 1; i < a.length; ++i){
        if (a[i] > m) m = a[i];
    }
    return m;
};
// read d, starting at bit p and mask with m
var bits = function(d, p, m) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
};
// read d, starting at bit p continuing for at least 16 bits
var bits16 = function(d, p) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
};
// get end of byte
var shft = function(p) {
    return (p / 8 | 0) + (p & 7 && 1);
};
// typed array slice - allows garbage collector to free original reference,
// while being more compatible than .slice
var slc = function(v, s, e) {
    if (s == null || s < 0) s = 0;
    if (e == null || e > v.length) e = v.length;
    // can't use .constructor in case user-supplied
    var n = new (v instanceof u16 ? u16 : v instanceof u32 ? u32 : u8)(e - s);
    n.set(v.subarray(s, e));
    return n;
};
// expands raw DEFLATE data
var inflt = function(dat, buf, st) {
    // source length
    var sl = dat.length;
    if (!sl || st && !st.l && sl < 5) return buf || new u8(0);
    // have to estimate size
    var noBuf = !buf || st;
    // no state
    var noSt = !st || st.i;
    if (!st) st = {};
    // Assumes roughly 33% compression ratio average
    if (!buf) buf = new u8(sl * 3);
    // ensure buffer can fit at least l elements
    var cbuf = function(l) {
        var bl = buf.length;
        // need to increase size to fit
        if (l > bl) {
            // Double or set to necessary, whichever is greater
            var nbuf = new u8(Math.max(bl * 2, l));
            nbuf.set(buf);
            buf = nbuf;
        }
    };
    //  last chunk         bitpos           bytes
    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    // total bits
    var tbts = sl * 8;
    do {
        if (!lm) {
            // BFINAL - this is only 1 when last chunk is next
            st.f = final = bits(dat, pos, 1);
            // type: 0 = no compression, 1 = fixed huffman, 2 = dynamic huffman
            var type = bits(dat, pos + 1, 3);
            pos += 3;
            if (!type) {
                // go to end of byte boundary
                var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
                if (t > sl) {
                    if (noSt) throw 'unexpected EOF';
                    break;
                }
                // ensure size
                if (noBuf) cbuf(bt + l);
                // Copy over uncompressed data
                buf.set(dat.subarray(s, t), bt);
                // Get new bitpos, update byte count
                st.b = bt += l, st.p = pos = t * 8;
                continue;
            } else if (type == 1) lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
            else if (type == 2) {
                //  literal                            lengths
                var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
                var tl = hLit + bits(dat, pos + 5, 31) + 1;
                pos += 14;
                // length+distance tree
                var ldt = new u8(tl);
                // code length tree
                var clt = new u8(19);
                for(var i = 0; i < hcLen; ++i){
                    // use index map to get real code
                    clt[clim[i]] = bits(dat, pos + i * 3, 7);
                }
                pos += hcLen * 3;
                // code lengths bits
                var clb = max(clt), clbmsk = (1 << clb) - 1;
                // code lengths map
                var clm = hMap(clt, clb, 1);
                for(var i = 0; i < tl;){
                    var r = clm[bits(dat, pos, clbmsk)];
                    // bits read
                    pos += r & 15;
                    // symbol
                    var s = r >>> 4;
                    // code length to copy
                    if (s < 16) {
                        ldt[i++] = s;
                    } else {
                        //  copy   count
                        var c = 0, n = 0;
                        if (s == 16) n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
                        else if (s == 17) n = 3 + bits(dat, pos, 7), pos += 3;
                        else if (s == 18) n = 11 + bits(dat, pos, 127), pos += 7;
                        while(n--)ldt[i++] = c;
                    }
                }
                //    length tree                 distance tree
                var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
                // max length bits
                lbt = max(lt);
                // max dist bits
                dbt = max(dt);
                lm = hMap(lt, lbt, 1);
                dm = hMap(dt, dbt, 1);
            } else throw 'invalid block type';
            if (pos > tbts) {
                if (noSt) throw 'unexpected EOF';
                break;
            }
        }
        // Make sure the buffer can hold this + the largest possible addition
        // Maximum chunk size (practically, theoretically infinite) is 2^17;
        if (noBuf) cbuf(bt + 131072);
        var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
        var lpos = pos;
        for(;; lpos = pos){
            // bits read, code
            var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
            pos += c & 15;
            if (pos > tbts) {
                if (noSt) throw 'unexpected EOF';
                break;
            }
            if (!c) throw 'invalid length/literal';
            if (sym < 256) buf[bt++] = sym;
            else if (sym == 256) {
                lpos = pos, lm = null;
                break;
            } else {
                var add = sym - 254;
                // no extra bits needed if less
                if (sym > 264) {
                    // index
                    var i = sym - 257, b = fleb[i];
                    add = bits(dat, pos, (1 << b) - 1) + fl[i];
                    pos += b;
                }
                // dist
                var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
                if (!d) throw 'invalid distance';
                pos += d & 15;
                var dt = fd[dsym];
                if (dsym > 3) {
                    var b = fdeb[dsym];
                    dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
                }
                if (pos > tbts) {
                    if (noSt) throw 'unexpected EOF';
                    break;
                }
                if (noBuf) cbuf(bt + 131072);
                var end = bt + add;
                for(; bt < end; bt += 4){
                    buf[bt] = buf[bt - dt];
                    buf[bt + 1] = buf[bt + 1 - dt];
                    buf[bt + 2] = buf[bt + 2 - dt];
                    buf[bt + 3] = buf[bt + 3 - dt];
                }
                bt = end;
            }
        }
        st.l = lm, st.p = lpos, st.b = bt;
        if (lm) final = 1, st.m = lbt, st.d = dm, st.n = dbt;
    }while (!final)
    return bt == buf.length ? buf : slc(buf, 0, bt);
};
// starting at p, write the minimum number of bits that can hold v to d
var wbits = function(d, p, v) {
    v <<= p & 7;
    var o = p / 8 | 0;
    d[o] |= v;
    d[o + 1] |= v >>> 8;
};
// starting at p, write the minimum number of bits (>8) that can hold v to d
var wbits16 = function(d, p, v) {
    v <<= p & 7;
    var o = p / 8 | 0;
    d[o] |= v;
    d[o + 1] |= v >>> 8;
    d[o + 2] |= v >>> 16;
};
// creates code lengths from a frequency table
var hTree = function(d, mb) {
    // Need extra info to make a tree
    var t = [];
    for(var i = 0; i < d.length; ++i){
        if (d[i]) t.push({
            s: i,
            f: d[i]
        });
    }
    var s = t.length;
    var t2 = t.slice();
    if (!s) return [
        et,
        0
    ];
    if (s == 1) {
        var v = new u8(t[0].s + 1);
        v[t[0].s] = 1;
        return [
            v,
            1
        ];
    }
    t.sort(function(a, b) {
        return a.f - b.f;
    });
    // after i2 reaches last ind, will be stopped
    // freq must be greater than largest possible number of symbols
    t.push({
        s: -1,
        f: 25001
    });
    var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
    t[0] = {
        s: -1,
        f: l.f + r.f,
        l: l,
        r: r
    };
    // efficient algorithm from UZIP.js
    // i0 is lookbehind, i2 is lookahead - after processing two low-freq
    // symbols that combined have high freq, will start processing i2 (high-freq,
    // non-composite) symbols instead
    // see https://reddit.com/r/photopea/comments/ikekht/uzipjs_questions/
    while(i1 != s - 1){
        l = t[t[i0].f < t[i2].f ? i0++ : i2++];
        r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
        t[i1++] = {
            s: -1,
            f: l.f + r.f,
            l: l,
            r: r
        };
    }
    var maxSym = t2[0].s;
    for(var i = 1; i < s; ++i){
        if (t2[i].s > maxSym) maxSym = t2[i].s;
    }
    // code lengths
    var tr = new u16(maxSym + 1);
    // max bits in tree
    var mbt = ln(t[i1 - 1], tr, 0);
    if (mbt > mb) {
        // more algorithms from UZIP.js
        // TODO: find out how this code works (debt)
        //  ind    debt
        var i = 0, dt = 0;
        //    left            cost
        var lft = mbt - mb, cst = 1 << lft;
        t2.sort(function(a, b) {
            return tr[b.s] - tr[a.s] || a.f - b.f;
        });
        for(; i < s; ++i){
            var i2_1 = t2[i].s;
            if (tr[i2_1] > mb) {
                dt += cst - (1 << mbt - tr[i2_1]);
                tr[i2_1] = mb;
            } else break;
        }
        dt >>>= lft;
        while(dt > 0){
            var i2_2 = t2[i].s;
            if (tr[i2_2] < mb) dt -= 1 << mb - tr[i2_2]++ - 1;
            else ++i;
        }
        for(; i >= 0 && dt; --i){
            var i2_3 = t2[i].s;
            if (tr[i2_3] == mb) {
                --tr[i2_3];
                ++dt;
            }
        }
        mbt = mb;
    }
    return [
        new u8(tr),
        mbt
    ];
};
// get the max length and assign length codes
var ln = function(n, l, d) {
    return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
};
// length codes generation
var lc = function(c) {
    var s = c.length;
    // Note that the semicolon was intentional
    while(s && !c[--s]);
    var cl = new u16(++s);
    //  ind      num         streak
    var cli = 0, cln = c[0], cls = 1;
    var w = function(v) {
        cl[cli++] = v;
    };
    for(var i = 1; i <= s; ++i){
        if (c[i] == cln && i != s) ++cls;
        else {
            if (!cln && cls > 2) {
                for(; cls > 138; cls -= 138)w(32754);
                if (cls > 2) {
                    w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
                    cls = 0;
                }
            } else if (cls > 3) {
                w(cln), --cls;
                for(; cls > 6; cls -= 6)w(8304);
                if (cls > 2) w(cls - 3 << 5 | 8208), cls = 0;
            }
            while(cls--)w(cln);
            cls = 1;
            cln = c[i];
        }
    }
    return [
        cl.subarray(0, cli),
        s
    ];
};
// calculate the length of output from tree, code lengths
var clen = function(cf, cl) {
    var l = 0;
    for(var i = 0; i < cl.length; ++i)l += cf[i] * cl[i];
    return l;
};
// writes a fixed block
// returns the new bit pos
var wfblk = function(out, pos, dat) {
    // no need to write 00 as type: TypedArray defaults to 0
    var s = dat.length;
    var o = shft(pos + 2);
    out[o] = s & 255;
    out[o + 1] = s >>> 8;
    out[o + 2] = out[o] ^ 255;
    out[o + 3] = out[o + 1] ^ 255;
    for(var i = 0; i < s; ++i)out[o + i + 4] = dat[i];
    return (o + 4 + s) * 8;
};
// writes a block
var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
    wbits(out, p++, final);
    ++lf[256];
    var _a = hTree(lf, 15), dlt = _a[0], mlb = _a[1];
    var _b = hTree(df, 15), ddt = _b[0], mdb = _b[1];
    var _c = lc(dlt), lclt = _c[0], nlc = _c[1];
    var _d = lc(ddt), lcdt = _d[0], ndc = _d[1];
    var lcfreq = new u16(19);
    for(var i = 0; i < lclt.length; ++i)lcfreq[lclt[i] & 31]++;
    for(var i = 0; i < lcdt.length; ++i)lcfreq[lcdt[i] & 31]++;
    var _e = hTree(lcfreq, 7), lct = _e[0], mlcb = _e[1];
    var nlcc = 19;
    for(; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc);
    var flen = bl + 5 << 3;
    var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
    var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + (2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18]);
    if (flen <= ftlen && flen <= dtlen) return wfblk(out, p, dat.subarray(bs, bs + bl));
    var lm, ll, dm, dl;
    wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
    if (dtlen < ftlen) {
        lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
        var llm = hMap(lct, mlcb, 0);
        wbits(out, p, nlc - 257);
        wbits(out, p + 5, ndc - 1);
        wbits(out, p + 10, nlcc - 4);
        p += 14;
        for(var i = 0; i < nlcc; ++i)wbits(out, p + 3 * i, lct[clim[i]]);
        p += 3 * nlcc;
        var lcts = [
            lclt,
            lcdt
        ];
        for(var it = 0; it < 2; ++it){
            var clct = lcts[it];
            for(var i = 0; i < clct.length; ++i){
                var len = clct[i] & 31;
                wbits(out, p, llm[len]), p += lct[len];
                if (len > 15) wbits(out, p, clct[i] >>> 5 & 127), p += clct[i] >>> 12;
            }
        }
    } else {
        lm = flm, ll = flt, dm = fdm, dl = fdt;
    }
    for(var i = 0; i < li; ++i){
        if (syms[i] > 255) {
            var len = syms[i] >>> 18 & 31;
            wbits16(out, p, lm[len + 257]), p += ll[len + 257];
            if (len > 7) wbits(out, p, syms[i] >>> 23 & 31), p += fleb[len];
            var dst = syms[i] & 31;
            wbits16(out, p, dm[dst]), p += dl[dst];
            if (dst > 3) wbits16(out, p, syms[i] >>> 5 & 8191), p += fdeb[dst];
        } else {
            wbits16(out, p, lm[syms[i]]), p += ll[syms[i]];
        }
    }
    wbits16(out, p, lm[256]);
    return p + ll[256];
};
// deflate options (nice << 13) | chain
var deo = /*#__PURE__*/ new u32([
    65540,
    131080,
    131088,
    131104,
    262176,
    1048704,
    1048832,
    2114560,
    2117632
]);
// empty
var et = /*#__PURE__*/ new u8(0);
// compresses data into a raw DEFLATE buffer
var dflt = function(dat, lvl, plvl, pre, post, lst) {
    var s = dat.length;
    var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7000)) + post);
    // writing to this writes to the output buffer
    var w = o.subarray(pre, o.length - post);
    var pos = 0;
    if (!lvl || s < 8) {
        for(var i = 0; i <= s; i += 65535){
            // end
            var e = i + 65535;
            if (e < s) {
                // write full block
                pos = wfblk(w, pos, dat.subarray(i, e));
            } else {
                // write final block
                w[i] = lst;
                pos = wfblk(w, pos, dat.subarray(i, s));
            }
        }
    } else {
        var opt = deo[lvl - 1];
        var n = opt >>> 13, c = opt & 8191;
        var msk_1 = (1 << plvl) - 1;
        //    prev 2-byte val map    curr 2-byte val map
        var prev = new u16(32768), head = new u16(msk_1 + 1);
        var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
        var hsh = function(i) {
            return (dat[i] ^ dat[i + 1] << bs1_1 ^ dat[i + 2] << bs2_1) & msk_1;
        };
        // 24576 is an arbitrary number of maximum symbols per block
        // 424 buffer for last block
        var syms = new u32(25000);
        // length/literal freq   distance freq
        var lf = new u16(288), df = new u16(32);
        //  l/lcnt  exbits  index  l/lind  waitdx  bitpos
        var lc_1 = 0, eb = 0, i = 0, li = 0, wi = 0, bs = 0;
        for(; i < s; ++i){
            // hash value
            // deopt when i > s - 3 - at end, deopt acceptable
            var hv = hsh(i);
            // index mod 32768    previous index mod
            var imod = i & 32767, pimod = head[hv];
            prev[imod] = pimod;
            head[hv] = imod;
            // We always should modify head and prev, but only add symbols if
            // this data is not yet processed ("wait" for wait index)
            if (wi <= i) {
                // bytes remaining
                var rem = s - i;
                if ((lc_1 > 7000 || li > 24576) && rem > 423) {
                    pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
                    li = lc_1 = eb = 0, bs = i;
                    for(var j = 0; j < 286; ++j)lf[j] = 0;
                    for(var j = 0; j < 30; ++j)df[j] = 0;
                }
                //  len    dist   chain
                var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
                if (rem > 2 && hv == hsh(i - dif)) {
                    var maxn = Math.min(n, rem) - 1;
                    var maxd = Math.min(32767, i);
                    // max possible length
                    // not capped at dif because decompressors implement "rolling" index population
                    var ml = Math.min(258, rem);
                    while(dif <= maxd && --ch_1 && imod != pimod){
                        if (dat[i + l] == dat[i + l - dif]) {
                            var nl = 0;
                            for(; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl);
                            if (nl > l) {
                                l = nl, d = dif;
                                // break out early when we reach "nice" (we are satisfied enough)
                                if (nl > maxn) break;
                                // now, find the rarest 2-byte sequence within this
                                // length of literals and search for that instead.
                                // Much faster than just using the start
                                var mmd = Math.min(dif, nl - 2);
                                var md = 0;
                                for(var j = 0; j < mmd; ++j){
                                    var ti = i - dif + j + 32768 & 32767;
                                    var pti = prev[ti];
                                    var cd = ti - pti + 32768 & 32767;
                                    if (cd > md) md = cd, pimod = ti;
                                }
                            }
                        }
                        // check the previous match
                        imod = pimod, pimod = prev[imod];
                        dif += imod - pimod + 32768 & 32767;
                    }
                }
                // d will be nonzero only when a match was found
                if (d) {
                    // store both dist and len data in one Uint32
                    // Make sure this is recognized as a len/dist with 28th bit (2^28)
                    syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
                    var lin = revfl[l] & 31, din = revfd[d] & 31;
                    eb += fleb[lin] + fdeb[din];
                    ++lf[257 + lin];
                    ++df[din];
                    wi = i + l;
                    ++lc_1;
                } else {
                    syms[li++] = dat[i];
                    ++lf[dat[i]];
                }
            }
        }
        pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
        // this is the easiest way to avoid needing to maintain state
        if (!lst && pos & 7) pos = wfblk(w, pos + 1, et);
    }
    return slc(o, 0, pre + shft(pos) + post);
};
// CRC32 table
var crct = /*#__PURE__*/ function() {
    var t = new Int32Array(256);
    for(var i = 0; i < 256; ++i){
        var c = i, k = 9;
        while(--k)c = (c & 1 && -306674912) ^ c >>> 1;
        t[i] = c;
    }
    return t;
}();
// CRC32
var crc = function() {
    var c = -1;
    return {
        p: function(d) {
            // closures have awful performance
            var cr = c;
            for(var i = 0; i < d.length; ++i)cr = crct[cr & 255 ^ d[i]] ^ cr >>> 8;
            c = cr;
        },
        d: function() {
            return ~c;
        }
    };
};
// Alder32
var adler = function() {
    var a = 1, b = 0;
    return {
        p: function(d) {
            // closures have awful performance
            var n = a, m = b;
            var l = d.length;
            for(var i = 0; i != l;){
                var e = Math.min(i + 2655, l);
                for(; i < e; ++i)m += n += d[i];
                n = (n & 65535) + 15 * (n >> 16), m = (m & 65535) + 15 * (m >> 16);
            }
            a = n, b = m;
        },
        d: function() {
            a %= 65521, b %= 65521;
            return (a & 255) << 24 | a >>> 8 << 16 | (b & 255) << 8 | b >>> 8;
        }
    };
};
;
// deflate with opts
var dopt = function(dat, opt, pre, post, st) {
    return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 12 + opt.mem, pre, post, !st);
};
// Walmart object spread
var mrg = function(a, b) {
    var o = {};
    for(var k in a)o[k] = a[k];
    for(var k in b)o[k] = b[k];
    return o;
};
// worker clone
// This is possibly the craziest part of the entire codebase, despite how simple it may seem.
// The only parameter to this function is a closure that returns an array of variables outside of the function scope.
// We're going to try to figure out the variable names used in the closure as strings because that is crucial for workerization.
// We will return an object mapping of true variable name to value (basically, the current scope as a JS object).
// The reason we can't just use the original variable names is minifiers mangling the toplevel scope.
// This took me three weeks to figure out how to do.
var wcln = function(fn, fnStr, td) {
    var dt = fn();
    var st = fn.toString();
    var ks = st.slice(st.indexOf('[') + 1, st.lastIndexOf(']')).replace(/ /g, '').split(',');
    for(var i = 0; i < dt.length; ++i){
        var v = dt[i], k = ks[i];
        if (typeof v == 'function') {
            fnStr += ';' + k + '=';
            var st_1 = v.toString();
            if (v.prototype) {
                // for global objects
                if (st_1.indexOf('[native code]') != -1) {
                    var spInd = st_1.indexOf(' ', 8) + 1;
                    fnStr += st_1.slice(spInd, st_1.indexOf('(', spInd));
                } else {
                    fnStr += st_1;
                    for(var t in v.prototype)fnStr += ';' + k + '.prototype.' + t + '=' + v.prototype[t].toString();
                }
            } else fnStr += st_1;
        } else td[k] = v;
    }
    return [
        fnStr,
        td
    ];
};
var ch = [];
// clone bufs
var cbfs = function(v) {
    var tl = [];
    for(var k in v){
        if (v[k] instanceof u8 || v[k] instanceof u16 || v[k] instanceof u32) tl.push((v[k] = new v[k].constructor(v[k])).buffer);
    }
    return tl;
};
// use a worker to execute code
var wrkr = function(fns, init, id, cb) {
    var _a;
    if (!ch[id]) {
        var fnStr = '', td_1 = {}, m = fns.length - 1;
        for(var i = 0; i < m; ++i)_a = wcln(fns[i], fnStr, td_1), fnStr = _a[0], td_1 = _a[1];
        ch[id] = wcln(fns[m], fnStr, td_1);
    }
    var td = mrg({}, ch[id][1]);
    return wk(ch[id][0] + ';onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=' + init.toString() + '}', id, td, cbfs(td), cb);
};
// base async inflate fn
var bInflt = function() {
    return [
        u8,
        u16,
        u32,
        fleb,
        fdeb,
        clim,
        fl,
        fd,
        flrm,
        fdrm,
        rev,
        hMap,
        max,
        bits,
        bits16,
        shft,
        slc,
        inflt,
        inflateSync,
        pbf,
        gu8
    ];
};
var bDflt = function() {
    return [
        u8,
        u16,
        u32,
        fleb,
        fdeb,
        clim,
        revfl,
        revfd,
        flm,
        flt,
        fdm,
        fdt,
        rev,
        deo,
        et,
        hMap,
        wbits,
        wbits16,
        hTree,
        ln,
        lc,
        clen,
        wfblk,
        wblk,
        shft,
        slc,
        dflt,
        dopt,
        deflateSync,
        pbf
    ];
};
// gzip extra
var gze = function() {
    return [
        gzh,
        gzhl,
        wbytes,
        crc,
        crct
    ];
};
// gunzip extra
var guze = function() {
    return [
        gzs,
        gzl
    ];
};
// zlib extra
var zle = function() {
    return [
        zlh,
        wbytes,
        adler
    ];
};
// unzlib extra
var zule = function() {
    return [
        zlv
    ];
};
// post buf
var pbf = function(msg) {
    return postMessage(msg, [
        msg.buffer
    ]);
};
// get u8
var gu8 = function(o) {
    return o && o.size && new u8(o.size);
};
// async helper
var cbify = function(dat, opts, fns, init, id, cb) {
    var w = wrkr(fns, init, id, function(err, dat) {
        w.terminate();
        cb(err, dat);
    });
    w.postMessage([
        dat,
        opts
    ], opts.consume ? [
        dat.buffer
    ] : []);
    return function() {
        w.terminate();
    };
};
// auto stream
var astrm = function(strm) {
    strm.ondata = function(dat, final) {
        return postMessage([
            dat,
            final
        ], [
            dat.buffer
        ]);
    };
    return function(ev) {
        return strm.push(ev.data[0], ev.data[1]);
    };
};
// async stream attach
var astrmify = function(fns, strm, opts, init, id) {
    var t;
    var w = wrkr(fns, init, id, function(err, dat) {
        if (err) w.terminate(), strm.ondata.call(strm, err);
        else {
            if (dat[1]) w.terminate();
            strm.ondata.call(strm, err, dat[0], dat[1]);
        }
    });
    w.postMessage(opts);
    strm.push = function(d, f) {
        if (t) throw 'stream finished';
        if (!strm.ondata) throw 'no stream handler';
        w.postMessage([
            d,
            t = f
        ], [
            d.buffer
        ]);
    };
    strm.terminate = function() {
        w.terminate();
    };
};
// read 2 bytes
var b2 = function(d, b) {
    return d[b] | d[b + 1] << 8;
};
// read 4 bytes
var b4 = function(d, b) {
    return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
};
var b8 = function(d, b) {
    return b4(d, b) + b4(d, b + 4) * 4294967296;
};
// write bytes
var wbytes = function(d, b, v) {
    for(; v; ++b)d[b] = v, v >>>= 8;
};
// gzip header
var gzh = function(c, o) {
    var fn = o.filename;
    c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : o.level == 9 ? 2 : 0, c[9] = 3; // assume Unix
    if (o.mtime != 0) wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1000));
    if (fn) {
        c[3] = 8;
        for(var i = 0; i <= fn.length; ++i)c[i + 10] = fn.charCodeAt(i);
    }
};
// gzip footer: -8 to -4 = CRC, -4 to -0 is length
// gzip start
var gzs = function(d) {
    if (d[0] != 31 || d[1] != 139 || d[2] != 8) throw 'invalid gzip data';
    var flg = d[3];
    var st = 10;
    if (flg & 4) st += d[10] | (d[11] << 8) + 2;
    for(var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++]);
    return st + (flg & 2);
};
// gzip length
var gzl = function(d) {
    var l = d.length;
    return (d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16 | d[l - 1] << 24) >>> 0;
};
// gzip header length
var gzhl = function(o) {
    return 10 + (o.filename && o.filename.length + 1 || 0);
};
// zlib header
var zlh = function(c, o) {
    var lv = o.level, fl = lv == 0 ? 0 : lv < 6 ? 1 : lv == 9 ? 3 : 2;
    c[0] = 120, c[1] = fl << 6 | (fl ? 32 - 2 * fl : 1);
};
// zlib valid
var zlv = function(d) {
    if ((d[0] & 15) != 8 || d[0] >>> 4 > 7 || (d[0] << 8 | d[1]) % 31) throw 'invalid zlib data';
    if (d[1] & 32) throw 'invalid zlib data: preset dictionaries not supported';
};
function AsyncCmpStrm(opts, cb) {
    if (!cb && typeof opts == 'function') cb = opts, opts = {};
    this.ondata = cb;
    return opts;
}
// zlib footer: -4 to -0 is Adler32
/**
 * Streaming DEFLATE compression
 */ var Deflate = function() {
    function Deflate(opts, cb) {
        if (!cb && typeof opts == 'function') cb = opts, opts = {};
        this.ondata = cb;
        this.o = opts || {};
    }
    Deflate.prototype.p = function(c, f) {
        this.ondata(dopt(c, this.o, 0, 0, !f), f);
    };
    /**
     * Pushes a chunk to be deflated
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ Deflate.prototype.push = function(chunk, final) {
        if (this.d) throw 'stream finished';
        if (!this.ondata) throw 'no stream handler';
        this.d = final;
        this.p(chunk, final || false);
    };
    return Deflate;
}();
;
/**
 * Asynchronous streaming DEFLATE compression
 */ var AsyncDeflate = function() {
    function AsyncDeflate(opts, cb) {
        astrmify([
            bDflt,
            function() {
                return [
                    astrm,
                    Deflate
                ];
            }
        ], this, AsyncCmpStrm.call(this, opts, cb), function(ev) {
            var strm = new Deflate(ev.data);
            onmessage = astrm(strm);
        }, 6);
    }
    return AsyncDeflate;
}();
;
function deflate(data, opts, cb) {
    if (!cb) cb = opts, opts = {};
    if (typeof cb != 'function') throw 'no callback';
    return cbify(data, opts, [
        bDflt
    ], function(ev) {
        return pbf(deflateSync(ev.data[0], ev.data[1]));
    }, 0, cb);
}
function deflateSync(data, opts) {
    return dopt(data, opts || {}, 0, 0);
}
/**
 * Streaming DEFLATE decompression
 */ var Inflate = function() {
    /**
     * Creates an inflation stream
     * @param cb The callback to call whenever data is inflated
     */ function Inflate(cb) {
        this.s = {};
        this.p = new u8(0);
        this.ondata = cb;
    }
    Inflate.prototype.e = function(c) {
        if (this.d) throw 'stream finished';
        if (!this.ondata) throw 'no stream handler';
        var l = this.p.length;
        var n = new u8(l + c.length);
        n.set(this.p), n.set(c, l), this.p = n;
    };
    Inflate.prototype.c = function(final) {
        this.d = this.s.i = final || false;
        var bts = this.s.b;
        var dt = inflt(this.p, this.o, this.s);
        this.ondata(slc(dt, bts, this.s.b), this.d);
        this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
        this.p = slc(this.p, this.s.p / 8 | 0), this.s.p &= 7;
    };
    /**
     * Pushes a chunk to be inflated
     * @param chunk The chunk to push
     * @param final Whether this is the final chunk
     */ Inflate.prototype.push = function(chunk, final) {
        this.e(chunk), this.c(final);
    };
    return Inflate;
}();
;
/**
 * Asynchronous streaming DEFLATE decompression
 */ var AsyncInflate = function() {
    /**
     * Creates an asynchronous inflation stream
     * @param cb The callback to call whenever data is deflated
     */ function AsyncInflate(cb) {
        this.ondata = cb;
        astrmify([
            bInflt,
            function() {
                return [
                    astrm,
                    Inflate
                ];
            }
        ], this, 0, function() {
            var strm = new Inflate();
            onmessage = astrm(strm);
        }, 7);
    }
    return AsyncInflate;
}();
;
function inflate(data, opts, cb) {
    if (!cb) cb = opts, opts = {};
    if (typeof cb != 'function') throw 'no callback';
    return cbify(data, opts, [
        bInflt
    ], function(ev) {
        return pbf(inflateSync(ev.data[0], gu8(ev.data[1])));
    }, 1, cb);
}
function inflateSync(data, out) {
    return inflt(data, out);
}
// before you yell at me for not just using extends, my reason is that TS inheritance is hard to workerize.
/**
 * Streaming GZIP compression
 */ var Gzip = function() {
    function Gzip(opts, cb) {
        this.c = crc();
        this.l = 0;
        this.v = 1;
        Deflate.call(this, opts, cb);
    }
    /**
     * Pushes a chunk to be GZIPped
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ Gzip.prototype.push = function(chunk, final) {
        Deflate.prototype.push.call(this, chunk, final);
    };
    Gzip.prototype.p = function(c, f) {
        this.c.p(c);
        this.l += c.length;
        var raw = dopt(c, this.o, this.v && gzhl(this.o), f && 8, !f);
        if (this.v) gzh(raw, this.o), this.v = 0;
        if (f) wbytes(raw, raw.length - 8, this.c.d()), wbytes(raw, raw.length - 4, this.l);
        this.ondata(raw, f);
    };
    return Gzip;
}();
;
/**
 * Asynchronous streaming GZIP compression
 */ var AsyncGzip = function() {
    function AsyncGzip(opts, cb) {
        astrmify([
            bDflt,
            gze,
            function() {
                return [
                    astrm,
                    Deflate,
                    Gzip
                ];
            }
        ], this, AsyncCmpStrm.call(this, opts, cb), function(ev) {
            var strm = new Gzip(ev.data);
            onmessage = astrm(strm);
        }, 8);
    }
    return AsyncGzip;
}();
;
function gzip(data, opts, cb) {
    if (!cb) cb = opts, opts = {};
    if (typeof cb != 'function') throw 'no callback';
    return cbify(data, opts, [
        bDflt,
        gze,
        function() {
            return [
                gzipSync
            ];
        }
    ], function(ev) {
        return pbf(gzipSync(ev.data[0], ev.data[1]));
    }, 2, cb);
}
function gzipSync(data, opts) {
    if (!opts) opts = {};
    var c = crc(), l = data.length;
    c.p(data);
    var d = dopt(data, opts, gzhl(opts), 8), s = d.length;
    return gzh(d, opts), wbytes(d, s - 8, c.d()), wbytes(d, s - 4, l), d;
}
/**
 * Streaming GZIP decompression
 */ var Gunzip = function() {
    /**
     * Creates a GUNZIP stream
     * @param cb The callback to call whenever data is inflated
     */ function Gunzip(cb) {
        this.v = 1;
        Inflate.call(this, cb);
    }
    /**
     * Pushes a chunk to be GUNZIPped
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ Gunzip.prototype.push = function(chunk, final) {
        Inflate.prototype.e.call(this, chunk);
        if (this.v) {
            var s = this.p.length > 3 ? gzs(this.p) : 4;
            if (s >= this.p.length && !final) return;
            this.p = this.p.subarray(s), this.v = 0;
        }
        if (final) {
            if (this.p.length < 8) throw 'invalid gzip stream';
            this.p = this.p.subarray(0, -8);
        }
        // necessary to prevent TS from using the closure value
        // This allows for workerization to function correctly
        Inflate.prototype.c.call(this, final);
    };
    return Gunzip;
}();
;
/**
 * Asynchronous streaming GZIP decompression
 */ var AsyncGunzip = function() {
    /**
     * Creates an asynchronous GUNZIP stream
     * @param cb The callback to call whenever data is deflated
     */ function AsyncGunzip(cb) {
        this.ondata = cb;
        astrmify([
            bInflt,
            guze,
            function() {
                return [
                    astrm,
                    Inflate,
                    Gunzip
                ];
            }
        ], this, 0, function() {
            var strm = new Gunzip();
            onmessage = astrm(strm);
        }, 9);
    }
    return AsyncGunzip;
}();
;
function gunzip(data, opts, cb) {
    if (!cb) cb = opts, opts = {};
    if (typeof cb != 'function') throw 'no callback';
    return cbify(data, opts, [
        bInflt,
        guze,
        function() {
            return [
                gunzipSync
            ];
        }
    ], function(ev) {
        return pbf(gunzipSync(ev.data[0]));
    }, 3, cb);
}
function gunzipSync(data, out) {
    return inflt(data.subarray(gzs(data), -8), out || new u8(gzl(data)));
}
/**
 * Streaming Zlib compression
 */ var Zlib = function() {
    function Zlib(opts, cb) {
        this.c = adler();
        this.v = 1;
        Deflate.call(this, opts, cb);
    }
    /**
     * Pushes a chunk to be zlibbed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ Zlib.prototype.push = function(chunk, final) {
        Deflate.prototype.push.call(this, chunk, final);
    };
    Zlib.prototype.p = function(c, f) {
        this.c.p(c);
        var raw = dopt(c, this.o, this.v && 2, f && 4, !f);
        if (this.v) zlh(raw, this.o), this.v = 0;
        if (f) wbytes(raw, raw.length - 4, this.c.d());
        this.ondata(raw, f);
    };
    return Zlib;
}();
;
/**
 * Asynchronous streaming Zlib compression
 */ var AsyncZlib = function() {
    function AsyncZlib(opts, cb) {
        astrmify([
            bDflt,
            zle,
            function() {
                return [
                    astrm,
                    Deflate,
                    Zlib
                ];
            }
        ], this, AsyncCmpStrm.call(this, opts, cb), function(ev) {
            var strm = new Zlib(ev.data);
            onmessage = astrm(strm);
        }, 10);
    }
    return AsyncZlib;
}();
;
function zlib(data, opts, cb) {
    if (!cb) cb = opts, opts = {};
    if (typeof cb != 'function') throw 'no callback';
    return cbify(data, opts, [
        bDflt,
        zle,
        function() {
            return [
                zlibSync
            ];
        }
    ], function(ev) {
        return pbf(zlibSync(ev.data[0], ev.data[1]));
    }, 4, cb);
}
function zlibSync(data, opts) {
    if (!opts) opts = {};
    var a = adler();
    a.p(data);
    var d = dopt(data, opts, 2, 4);
    return zlh(d, opts), wbytes(d, d.length - 4, a.d()), d;
}
/**
 * Streaming Zlib decompression
 */ var Unzlib = function() {
    /**
     * Creates a Zlib decompression stream
     * @param cb The callback to call whenever data is inflated
     */ function Unzlib(cb) {
        this.v = 1;
        Inflate.call(this, cb);
    }
    /**
     * Pushes a chunk to be unzlibbed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ Unzlib.prototype.push = function(chunk, final) {
        Inflate.prototype.e.call(this, chunk);
        if (this.v) {
            if (this.p.length < 2 && !final) return;
            this.p = this.p.subarray(2), this.v = 0;
        }
        if (final) {
            if (this.p.length < 4) throw 'invalid zlib stream';
            this.p = this.p.subarray(0, -4);
        }
        // necessary to prevent TS from using the closure value
        // This allows for workerization to function correctly
        Inflate.prototype.c.call(this, final);
    };
    return Unzlib;
}();
;
/**
 * Asynchronous streaming Zlib decompression
 */ var AsyncUnzlib = function() {
    /**
     * Creates an asynchronous Zlib decompression stream
     * @param cb The callback to call whenever data is deflated
     */ function AsyncUnzlib(cb) {
        this.ondata = cb;
        astrmify([
            bInflt,
            zule,
            function() {
                return [
                    astrm,
                    Inflate,
                    Unzlib
                ];
            }
        ], this, 0, function() {
            var strm = new Unzlib();
            onmessage = astrm(strm);
        }, 11);
    }
    return AsyncUnzlib;
}();
;
function unzlib(data, opts, cb) {
    if (!cb) cb = opts, opts = {};
    if (typeof cb != 'function') throw 'no callback';
    return cbify(data, opts, [
        bInflt,
        zule,
        function() {
            return [
                unzlibSync
            ];
        }
    ], function(ev) {
        return pbf(unzlibSync(ev.data[0], gu8(ev.data[1])));
    }, 5, cb);
}
function unzlibSync(data, out) {
    return inflt((zlv(data), data.subarray(2, -4)), out);
}
;
;
/**
 * Streaming GZIP, Zlib, or raw DEFLATE decompression
 */ var Decompress = function() {
    /**
     * Creates a decompression stream
     * @param cb The callback to call whenever data is decompressed
     */ function Decompress(cb) {
        this.G = Gunzip;
        this.I = Inflate;
        this.Z = Unzlib;
        this.ondata = cb;
    }
    /**
     * Pushes a chunk to be decompressed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ Decompress.prototype.push = function(chunk, final) {
        if (!this.ondata) throw 'no stream handler';
        if (!this.s) {
            if (this.p && this.p.length) {
                var n = new u8(this.p.length + chunk.length);
                n.set(this.p), n.set(chunk, this.p.length);
            } else this.p = chunk;
            if (this.p.length > 2) {
                var _this_1 = this;
                var cb = function() {
                    _this_1.ondata.apply(_this_1, arguments);
                };
                this.s = this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8 ? new this.G(cb) : (this.p[0] & 15) != 8 || this.p[0] >> 4 > 7 || (this.p[0] << 8 | this.p[1]) % 31 ? new this.I(cb) : new this.Z(cb);
                this.s.push(this.p, final);
                this.p = null;
            }
        } else this.s.push(chunk, final);
    };
    return Decompress;
}();
;
/**
 * Asynchronous streaming GZIP, Zlib, or raw DEFLATE decompression
 */ var AsyncDecompress = function() {
    /**
   * Creates an asynchronous decompression stream
   * @param cb The callback to call whenever data is decompressed
   */ function AsyncDecompress(cb) {
        this.G = AsyncGunzip;
        this.I = AsyncInflate;
        this.Z = AsyncUnzlib;
        this.ondata = cb;
    }
    /**
     * Pushes a chunk to be decompressed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ AsyncDecompress.prototype.push = function(chunk, final) {
        Decompress.prototype.push.call(this, chunk, final);
    };
    return AsyncDecompress;
}();
;
function decompress(data, opts, cb) {
    if (!cb) cb = opts, opts = {};
    if (typeof cb != 'function') throw 'no callback';
    return data[0] == 31 && data[1] == 139 && data[2] == 8 ? gunzip(data, opts, cb) : (data[0] & 15) != 8 || data[0] >> 4 > 7 || (data[0] << 8 | data[1]) % 31 ? inflate(data, opts, cb) : unzlib(data, opts, cb);
}
function decompressSync(data, out) {
    return data[0] == 31 && data[1] == 139 && data[2] == 8 ? gunzipSync(data, out) : (data[0] & 15) != 8 || data[0] >> 4 > 7 || (data[0] << 8 | data[1]) % 31 ? inflateSync(data, out) : unzlibSync(data, out);
}
// flatten a directory structure
var fltn = function(d, p, t, o) {
    for(var k in d){
        var val = d[k], n = p + k;
        if (val instanceof u8) t[n] = [
            val,
            o
        ];
        else if (Array.isArray(val)) t[n] = [
            val[0],
            mrg(o, val[1])
        ];
        else fltn(val, n + '/', t, o);
    }
};
// text encoder
var te = typeof TextEncoder != 'undefined' && /*#__PURE__*/ new TextEncoder();
// text decoder
var td = typeof TextDecoder != 'undefined' && /*#__PURE__*/ new TextDecoder();
// text decoder stream
var tds = 0;
try {
    td.decode(et, {
        stream: true
    });
    tds = 1;
} catch (e) {}
// decode UTF8
var dutf8 = function(d) {
    for(var r = '', i = 0;;){
        var c = d[i++];
        var eb = (c > 127) + (c > 223) + (c > 239);
        if (i + eb > d.length) return [
            r,
            slc(d, i - 1)
        ];
        if (!eb) r += String.fromCharCode(c);
        else if (eb == 3) {
            c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | d[i++] & 63) - 65536, r += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);
        } else if (eb & 1) r += String.fromCharCode((c & 31) << 6 | d[i++] & 63);
        else r += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | d[i++] & 63);
    }
};
/**
 * Streaming UTF-8 decoding
 */ var DecodeUTF8 = function() {
    /**
     * Creates a UTF-8 decoding stream
     * @param cb The callback to call whenever data is decoded
     */ function DecodeUTF8(cb) {
        this.ondata = cb;
        if (tds) this.t = new TextDecoder();
        else this.p = et;
    }
    /**
     * Pushes a chunk to be decoded from UTF-8 binary
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ DecodeUTF8.prototype.push = function(chunk, final) {
        if (!this.ondata) throw 'no callback';
        final = !!final;
        if (this.t) {
            this.ondata(this.t.decode(chunk, {
                stream: true
            }), final);
            if (final) {
                if (this.t.decode().length) throw 'invalid utf-8 data';
                this.t = null;
            }
            return;
        }
        if (!this.p) throw 'stream finished';
        var dat = new u8(this.p.length + chunk.length);
        dat.set(this.p);
        dat.set(chunk, this.p.length);
        var _a = dutf8(dat), ch = _a[0], np = _a[1];
        if (final) {
            if (np.length) throw 'invalid utf-8 data';
            this.p = null;
        } else this.p = np;
        this.ondata(ch, final);
    };
    return DecodeUTF8;
}();
;
/**
 * Streaming UTF-8 encoding
 */ var EncodeUTF8 = function() {
    /**
     * Creates a UTF-8 decoding stream
     * @param cb The callback to call whenever data is encoded
     */ function EncodeUTF8(cb) {
        this.ondata = cb;
    }
    /**
     * Pushes a chunk to be encoded to UTF-8
     * @param chunk The string data to push
     * @param final Whether this is the last chunk
     */ EncodeUTF8.prototype.push = function(chunk, final) {
        if (!this.ondata) throw 'no callback';
        if (this.d) throw 'stream finished';
        this.ondata(strToU8(chunk), this.d = final || false);
    };
    return EncodeUTF8;
}();
;
function strToU8(str, latin1) {
    if (latin1) {
        var ar_1 = new u8(str.length);
        for(var i = 0; i < str.length; ++i)ar_1[i] = str.charCodeAt(i);
        return ar_1;
    }
    if (te) return te.encode(str);
    var l = str.length;
    var ar = new u8(str.length + (str.length >> 1));
    var ai = 0;
    var w = function(v) {
        ar[ai++] = v;
    };
    for(var i = 0; i < l; ++i){
        if (ai + 5 > ar.length) {
            var n = new u8(ai + 8 + (l - i << 1));
            n.set(ar);
            ar = n;
        }
        var c = str.charCodeAt(i);
        if (c < 128 || latin1) w(c);
        else if (c < 2048) w(192 | c >> 6), w(128 | c & 63);
        else if (c > 55295 && c < 57344) c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);
        else w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
    }
    return slc(ar, 0, ai);
}
function strFromU8(dat, latin1) {
    if (latin1) {
        var r = '';
        for(var i = 0; i < dat.length; i += 16384)r += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
        return r;
    } else if (td) return td.decode(dat);
    else {
        var _a = dutf8(dat), out = _a[0], ext = _a[1];
        if (ext.length) throw 'invalid utf-8 data';
        return out;
    }
}
;
// deflate bit flag
var dbf = function(l) {
    return l == 1 ? 3 : l < 6 ? 2 : l == 9 ? 1 : 0;
};
// skip local zip header
var slzh = function(d, b) {
    return b + 30 + b2(d, b + 26) + b2(d, b + 28);
};
// read zip header
var zh = function(d, b, z) {
    var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
    var _a = z && bs == 4294967295 ? z64e(d, es) : [
        bs,
        b4(d, b + 24),
        b4(d, b + 42)
    ], sc = _a[0], su = _a[1], off = _a[2];
    return [
        b2(d, b + 10),
        sc,
        su,
        fn,
        es + b2(d, b + 30) + b2(d, b + 32),
        off
    ];
};
// read zip64 extra field
var z64e = function(d, b) {
    for(; b2(d, b) != 1; b += 4 + b2(d, b + 2));
    return [
        b8(d, b + 12),
        b8(d, b + 4),
        b8(d, b + 20)
    ];
};
// extra field length
var exfl = function(ex) {
    var le = 0;
    if (ex) {
        for(var k in ex){
            var l = ex[k].length;
            if (l > 65535) throw 'extra field too long';
            le += l + 4;
        }
    }
    return le;
};
// write zip header
var wzh = function(d, b, f, fn, u, c, ce, co) {
    var fl = fn.length, ex = f.extra, col = co && co.length;
    var exl = exfl(ex);
    wbytes(d, b, ce != null ? 0x2014B50 : 0x4034B50), b += 4;
    if (ce != null) d[b++] = 20, d[b++] = f.os;
    d[b] = 20, b += 2; // spec compliance? what's that?
    d[b++] = f.flag << 1 | (c == null && 8), d[b++] = u && 8;
    d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
    var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
    if (y < 0 || y > 119) throw 'date not in range 1980-2099';
    wbytes(d, b, y << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >>> 1), b += 4;
    if (c != null) {
        wbytes(d, b, f.crc);
        wbytes(d, b + 4, c);
        wbytes(d, b + 8, f.size);
    }
    wbytes(d, b + 12, fl);
    wbytes(d, b + 14, exl), b += 16;
    if (ce != null) {
        wbytes(d, b, col);
        wbytes(d, b + 6, f.attrs);
        wbytes(d, b + 10, ce), b += 14;
    }
    d.set(fn, b);
    b += fl;
    if (exl) {
        for(var k in ex){
            var exf = ex[k], l = exf.length;
            wbytes(d, b, +k);
            wbytes(d, b + 2, l);
            d.set(exf, b + 4), b += 4 + l;
        }
    }
    if (col) d.set(co, b), b += col;
    return b;
};
// write zip footer (end of central directory)
var wzf = function(o, b, c, d, e) {
    wbytes(o, b, 0x6054B50); // skip disk
    wbytes(o, b + 8, c);
    wbytes(o, b + 10, c);
    wbytes(o, b + 12, d);
    wbytes(o, b + 16, e);
};
/**
 * A pass-through stream to keep data uncompressed in a ZIP archive.
 */ var ZipPassThrough = function() {
    /**
     * Creates a pass-through stream that can be added to ZIP archives
     * @param filename The filename to associate with this data stream
     */ function ZipPassThrough(filename) {
        this.filename = filename;
        this.c = crc();
        this.size = 0;
        this.compression = 0;
    }
    /**
     * Processes a chunk and pushes to the output stream. You can override this
     * method in a subclass for custom behavior, but by default this passes
     * the data through. You must call this.ondata(err, chunk, final) at some
     * point in this method.
     * @param chunk The chunk to process
     * @param final Whether this is the last chunk
     */ ZipPassThrough.prototype.process = function(chunk, final) {
        this.ondata(null, chunk, final);
    };
    /**
     * Pushes a chunk to be added. If you are subclassing this with a custom
     * compression algorithm, note that you must push data from the source
     * file only, pre-compression.
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ ZipPassThrough.prototype.push = function(chunk, final) {
        if (!this.ondata) throw 'no callback - add to ZIP archive before pushing';
        this.c.p(chunk);
        this.size += chunk.length;
        if (final) this.crc = this.c.d();
        this.process(chunk, final || false);
    };
    return ZipPassThrough;
}();
;
// I don't extend because TypeScript extension adds 1kB of runtime bloat
/**
 * Streaming DEFLATE compression for ZIP archives. Prefer using AsyncZipDeflate
 * for better performance
 */ var ZipDeflate = function() {
    /**
     * Creates a DEFLATE stream that can be added to ZIP archives
     * @param filename The filename to associate with this data stream
     * @param opts The compression options
     */ function ZipDeflate(filename, opts) {
        var _this_1 = this;
        if (!opts) opts = {};
        ZipPassThrough.call(this, filename);
        this.d = new Deflate(opts, function(dat, final) {
            _this_1.ondata(null, dat, final);
        });
        this.compression = 8;
        this.flag = dbf(opts.level);
    }
    ZipDeflate.prototype.process = function(chunk, final) {
        try {
            this.d.push(chunk, final);
        } catch (e) {
            this.ondata(e, null, final);
        }
    };
    /**
     * Pushes a chunk to be deflated
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ ZipDeflate.prototype.push = function(chunk, final) {
        ZipPassThrough.prototype.push.call(this, chunk, final);
    };
    return ZipDeflate;
}();
;
/**
 * Asynchronous streaming DEFLATE compression for ZIP archives
 */ var AsyncZipDeflate = function() {
    /**
     * Creates a DEFLATE stream that can be added to ZIP archives
     * @param filename The filename to associate with this data stream
     * @param opts The compression options
     */ function AsyncZipDeflate(filename, opts) {
        var _this_1 = this;
        if (!opts) opts = {};
        ZipPassThrough.call(this, filename);
        this.d = new AsyncDeflate(opts, function(err, dat, final) {
            _this_1.ondata(err, dat, final);
        });
        this.compression = 8;
        this.flag = dbf(opts.level);
        this.terminate = this.d.terminate;
    }
    AsyncZipDeflate.prototype.process = function(chunk, final) {
        this.d.push(chunk, final);
    };
    /**
     * Pushes a chunk to be deflated
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ AsyncZipDeflate.prototype.push = function(chunk, final) {
        ZipPassThrough.prototype.push.call(this, chunk, final);
    };
    return AsyncZipDeflate;
}();
;
// TODO: Better tree shaking
/**
 * A zippable archive to which files can incrementally be added
 */ var Zip = function() {
    /**
     * Creates an empty ZIP archive to which files can be added
     * @param cb The callback to call whenever data for the generated ZIP archive
     *           is available
     */ function Zip(cb) {
        this.ondata = cb;
        this.u = [];
        this.d = 1;
    }
    /**
     * Adds a file to the ZIP archive
     * @param file The file stream to add
     */ Zip.prototype.add = function(file) {
        var _this_1 = this;
        if (this.d & 2) throw 'stream finished';
        var f = strToU8(file.filename), fl = f.length;
        var com = file.comment, o = com && strToU8(com);
        var u = fl != file.filename.length || o && com.length != o.length;
        var hl = fl + exfl(file.extra) + 30;
        if (fl > 65535) throw 'filename too long';
        var header = new u8(hl);
        wzh(header, 0, file, f, u);
        var chks = [
            header
        ];
        var pAll = function() {
            for(var _i = 0, chks_1 = chks; _i < chks_1.length; _i++){
                var chk = chks_1[_i];
                _this_1.ondata(null, chk, false);
            }
            chks = [];
        };
        var tr = this.d;
        this.d = 0;
        var ind = this.u.length;
        var uf = mrg(file, {
            f: f,
            u: u,
            o: o,
            t: function() {
                if (file.terminate) file.terminate();
            },
            r: function() {
                pAll();
                if (tr) {
                    var nxt = _this_1.u[ind + 1];
                    if (nxt) nxt.r();
                    else _this_1.d = 1;
                }
                tr = 1;
            }
        });
        var cl = 0;
        file.ondata = function(err, dat, final) {
            if (err) {
                _this_1.ondata(err, dat, final);
                _this_1.terminate();
            } else {
                cl += dat.length;
                chks.push(dat);
                if (final) {
                    var dd = new u8(16);
                    wbytes(dd, 0, 0x8074B50);
                    wbytes(dd, 4, file.crc);
                    wbytes(dd, 8, cl);
                    wbytes(dd, 12, file.size);
                    chks.push(dd);
                    uf.c = cl, uf.b = hl + cl + 16, uf.crc = file.crc, uf.size = file.size;
                    if (tr) uf.r();
                    tr = 1;
                } else if (tr) pAll();
            }
        };
        this.u.push(uf);
    };
    /**
     * Ends the process of adding files and prepares to emit the final chunks.
     * This *must* be called after adding all desired files for the resulting
     * ZIP file to work properly.
     */ Zip.prototype.end = function() {
        var _this_1 = this;
        if (this.d & 2) {
            if (this.d & 1) throw 'stream finishing';
            throw 'stream finished';
        }
        if (this.d) this.e();
        else this.u.push({
            r: function() {
                if (!(_this_1.d & 1)) return;
                _this_1.u.splice(-1, 1);
                _this_1.e();
            },
            t: function() {}
        });
        this.d = 3;
    };
    Zip.prototype.e = function() {
        var bt = 0, l = 0, tl = 0;
        for(var _i = 0, _a = this.u; _i < _a.length; _i++){
            var f = _a[_i];
            tl += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0);
        }
        var out = new u8(tl + 22);
        for(var _b = 0, _c = this.u; _b < _c.length; _b++){
            var f = _c[_b];
            wzh(out, bt, f, f.f, f.u, f.c, l, f.o);
            bt += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0), l += f.b;
        }
        wzf(out, bt, this.u.length, tl, l);
        this.ondata(null, out, true);
        this.d = 2;
    };
    /**
     * A method to terminate any internal workers used by the stream. Subsequent
     * calls to add() will fail.
     */ Zip.prototype.terminate = function() {
        for(var _i = 0, _a = this.u; _i < _a.length; _i++){
            var f = _a[_i];
            f.t();
        }
        this.d = 2;
    };
    return Zip;
}();
;
function zip(data, opts, cb) {
    if (!cb) cb = opts, opts = {};
    if (typeof cb != 'function') throw 'no callback';
    var r = {};
    fltn(data, '', r, opts);
    var k = Object.keys(r);
    var lft = k.length, o = 0, tot = 0;
    var slft = lft, files = new Array(lft);
    var term = [];
    var tAll = function() {
        for(var i = 0; i < term.length; ++i)term[i]();
    };
    var cbf = function() {
        var out = new u8(tot + 22), oe = o, cdl = tot - o;
        tot = 0;
        for(var i = 0; i < slft; ++i){
            var f = files[i];
            try {
                var l = f.c.length;
                wzh(out, tot, f, f.f, f.u, l);
                var badd = 30 + f.f.length + exfl(f.extra);
                var loc = tot + badd;
                out.set(f.c, loc);
                wzh(out, o, f, f.f, f.u, l, tot, f.m), o += 16 + badd + (f.m ? f.m.length : 0), tot = loc + l;
            } catch (e) {
                return cb(e, null);
            }
        }
        wzf(out, o, files.length, cdl, oe);
        cb(null, out);
    };
    if (!lft) cbf();
    var _loop_1 = function(i) {
        var fn = k[i];
        var _a = r[fn], file = _a[0], p = _a[1];
        var c = crc(), size = file.length;
        c.p(file);
        var f = strToU8(fn), s = f.length;
        var com = p.comment, m = com && strToU8(com), ms = m && m.length;
        var exl = exfl(p.extra);
        var compression = p.level == 0 ? 0 : 8;
        var cbl = function(e, d) {
            if (e) {
                tAll();
                cb(e, null);
            } else {
                var l = d.length;
                files[i] = mrg(p, {
                    size: size,
                    crc: c.d(),
                    c: d,
                    f: f,
                    m: m,
                    u: s != fn.length || m && com.length != ms,
                    compression: compression
                });
                o += 30 + s + exl + l;
                tot += 76 + 2 * (s + exl) + (ms || 0) + l;
                if (!--lft) cbf();
            }
        };
        if (s > 65535) cbl('filename too long', null);
        if (!compression) cbl(null, file);
        else if (size < 160000) {
            try {
                cbl(null, deflateSync(file, p));
            } catch (e) {
                cbl(e, null);
            }
        } else term.push(deflate(file, p, cbl));
    };
    // Cannot use lft because it can decrease
    for(var i = 0; i < slft; ++i){
        _loop_1(i);
    }
    return tAll;
}
function zipSync(data, opts) {
    if (!opts) opts = {};
    var r = {};
    var files = [];
    fltn(data, '', r, opts);
    var o = 0;
    var tot = 0;
    for(var fn in r){
        var _a = r[fn], file = _a[0], p = _a[1];
        var compression = p.level == 0 ? 0 : 8;
        var f = strToU8(fn), s = f.length;
        var com = p.comment, m = com && strToU8(com), ms = m && m.length;
        var exl = exfl(p.extra);
        if (s > 65535) throw 'filename too long';
        var d = compression ? deflateSync(file, p) : file, l = d.length;
        var c = crc();
        c.p(file);
        files.push(mrg(p, {
            size: file.length,
            crc: c.d(),
            c: d,
            f: f,
            m: m,
            u: s != fn.length || m && com.length != ms,
            o: o,
            compression: compression
        }));
        o += 30 + s + exl + l;
        tot += 76 + 2 * (s + exl) + (ms || 0) + l;
    }
    var out = new u8(tot + 22), oe = o, cdl = tot - o;
    for(var i = 0; i < files.length; ++i){
        var f = files[i];
        wzh(out, f.o, f, f.f, f.u, f.c.length);
        var badd = 30 + f.f.length + exfl(f.extra);
        out.set(f.c, f.o + badd);
        wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
    }
    wzf(out, o, files.length, cdl, oe);
    return out;
}
/**
 * Streaming pass-through decompression for ZIP archives
 */ var UnzipPassThrough = function() {
    function UnzipPassThrough() {}
    UnzipPassThrough.prototype.push = function(data, final) {
        this.ondata(null, data, final);
    };
    UnzipPassThrough.compression = 0;
    return UnzipPassThrough;
}();
;
/**
 * Streaming DEFLATE decompression for ZIP archives. Prefer AsyncZipInflate for
 * better performance.
 */ var UnzipInflate = function() {
    /**
     * Creates a DEFLATE decompression that can be used in ZIP archives
     */ function UnzipInflate() {
        var _this_1 = this;
        this.i = new Inflate(function(dat, final) {
            _this_1.ondata(null, dat, final);
        });
    }
    UnzipInflate.prototype.push = function(data, final) {
        try {
            this.i.push(data, final);
        } catch (e) {
            this.ondata(e, data, final);
        }
    };
    UnzipInflate.compression = 8;
    return UnzipInflate;
}();
;
/**
 * Asynchronous streaming DEFLATE decompression for ZIP archives
 */ var AsyncUnzipInflate = function() {
    /**
     * Creates a DEFLATE decompression that can be used in ZIP archives
     */ function AsyncUnzipInflate(_, sz) {
        var _this_1 = this;
        if (sz < 320000) {
            this.i = new Inflate(function(dat, final) {
                _this_1.ondata(null, dat, final);
            });
        } else {
            this.i = new AsyncInflate(function(err, dat, final) {
                _this_1.ondata(err, dat, final);
            });
            this.terminate = this.i.terminate;
        }
    }
    AsyncUnzipInflate.prototype.push = function(data, final) {
        if (this.i.terminate) data = slc(data, 0);
        this.i.push(data, final);
    };
    AsyncUnzipInflate.compression = 8;
    return AsyncUnzipInflate;
}();
;
/**
 * A ZIP archive decompression stream that emits files as they are discovered
 */ var Unzip = function() {
    /**
     * Creates a ZIP decompression stream
     * @param cb The callback to call whenever a file in the ZIP archive is found
     */ function Unzip(cb) {
        this.onfile = cb;
        this.k = [];
        this.o = {
            0: UnzipPassThrough
        };
        this.p = et;
    }
    /**
     * Pushes a chunk to be unzipped
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ Unzip.prototype.push = function(chunk, final) {
        var _this_1 = this;
        if (!this.onfile) throw 'no callback';
        if (!this.p) throw 'stream finished';
        if (this.c > 0) {
            var len = Math.min(this.c, chunk.length);
            var toAdd = chunk.subarray(0, len);
            this.c -= len;
            if (this.d) this.d.push(toAdd, !this.c);
            else this.k[0].push(toAdd);
            chunk = chunk.subarray(len);
            if (chunk.length) return this.push(chunk, final);
        } else {
            var f = 0, i = 0, is = void 0, buf = void 0;
            if (!this.p.length) buf = chunk;
            else if (!chunk.length) buf = this.p;
            else {
                buf = new u8(this.p.length + chunk.length);
                buf.set(this.p), buf.set(chunk, this.p.length);
            }
            var l = buf.length, oc = this.c, add = oc && this.d;
            var _loop_2 = function() {
                var _a;
                var sig = b4(buf, i);
                if (sig == 0x4034B50) {
                    f = 1, is = i;
                    this_1.d = null;
                    this_1.c = 0;
                    var bf = b2(buf, i + 6), cmp_1 = b2(buf, i + 8), u = bf & 2048, dd = bf & 8, fnl = b2(buf, i + 26), es = b2(buf, i + 28);
                    if (l > i + 30 + fnl + es) {
                        var chks_2 = [];
                        this_1.k.unshift(chks_2);
                        f = 2;
                        var sc_1 = b4(buf, i + 18), su_1 = b4(buf, i + 22);
                        var fn_1 = strFromU8(buf.subarray(i + 30, i += 30 + fnl), !u);
                        if (sc_1 == 4294967295) {
                            _a = dd ? [
                                -2
                            ] : z64e(buf, i), sc_1 = _a[0], su_1 = _a[1];
                        } else if (dd) sc_1 = -1;
                        i += es;
                        this_1.c = sc_1;
                        var d_1;
                        var file_1 = {
                            name: fn_1,
                            compression: cmp_1,
                            start: function() {
                                if (!file_1.ondata) throw 'no callback';
                                if (!sc_1) file_1.ondata(null, et, true);
                                else {
                                    var ctr = _this_1.o[cmp_1];
                                    if (!ctr) throw 'unknown compression type ' + cmp_1;
                                    d_1 = sc_1 < 0 ? new ctr(fn_1) : new ctr(fn_1, sc_1, su_1);
                                    d_1.ondata = function(err, dat, final) {
                                        file_1.ondata(err, dat, final);
                                    };
                                    for(var _i = 0, chks_3 = chks_2; _i < chks_3.length; _i++){
                                        var dat = chks_3[_i];
                                        d_1.push(dat, false);
                                    }
                                    if (_this_1.k[0] == chks_2 && _this_1.c) _this_1.d = d_1;
                                    else d_1.push(et, true);
                                }
                            },
                            terminate: function() {
                                if (d_1 && d_1.terminate) d_1.terminate();
                            }
                        };
                        if (sc_1 >= 0) file_1.size = sc_1, file_1.originalSize = su_1;
                        this_1.onfile(file_1);
                    }
                    return "break";
                } else if (oc) {
                    if (sig == 0x8074B50) {
                        is = i += 12 + (oc == -2 && 8), f = 3, this_1.c = 0;
                        return "break";
                    } else if (sig == 0x2014B50) {
                        is = i -= 4, f = 3, this_1.c = 0;
                        return "break";
                    }
                }
            };
            var this_1 = this;
            for(; i < l - 4; ++i){
                var state_1 = _loop_2();
                if (state_1 === "break") break;
            }
            this.p = et;
            if (oc < 0) {
                var dat = f ? buf.subarray(0, is - 12 - (oc == -2 && 8) - (b4(buf, is - 16) == 0x8074B50 && 4)) : buf.subarray(0, i);
                if (add) add.push(dat, !!f);
                else this.k[+(f == 2)].push(dat);
            }
            if (f & 2) return this.push(buf.subarray(i), final);
            this.p = buf.subarray(i);
        }
        if (final) {
            if (this.c) throw 'invalid zip file';
            this.p = null;
        }
    };
    /**
     * Registers a decoder with the stream, allowing for files compressed with
     * the compression type provided to be expanded correctly
     * @param decoder The decoder constructor
     */ Unzip.prototype.register = function(decoder) {
        this.o[decoder.compression] = decoder;
    };
    return Unzip;
}();
;
function unzip(data, cb) {
    if (typeof cb != 'function') throw 'no callback';
    var term = [];
    var tAll = function() {
        for(var i = 0; i < term.length; ++i)term[i]();
    };
    var files = {};
    var e = data.length - 22;
    for(; b4(data, e) != 0x6054B50; --e){
        if (!e || data.length - e > 65558) {
            cb('invalid zip file', null);
            return;
        }
    }
    ;
    var lft = b2(data, e + 8);
    if (!lft) cb(null, {});
    var c = lft;
    var o = b4(data, e + 16);
    var z = o == 4294967295;
    if (z) {
        e = b4(data, e - 12);
        if (b4(data, e) != 0x6064B50) {
            cb('invalid zip file', null);
            return;
        }
        c = lft = b4(data, e + 32);
        o = b4(data, e + 48);
    }
    var _loop_3 = function(i) {
        var _a = zh(data, o, z), c_1 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
        o = no;
        var cbl = function(e, d) {
            if (e) {
                tAll();
                cb(e, null);
            } else {
                files[fn] = d;
                if (!--lft) cb(null, files);
            }
        };
        if (!c_1) cbl(null, slc(data, b, b + sc));
        else if (c_1 == 8) {
            var infl = data.subarray(b, b + sc);
            if (sc < 320000) {
                try {
                    cbl(null, inflateSync(infl, new u8(su)));
                } catch (e) {
                    cbl(e, null);
                }
            } else term.push(inflate(infl, {
                size: su
            }, cbl));
        } else cbl('unknown compression type ' + c_1, null);
    };
    for(var i = 0; i < c; ++i){
        _loop_3(i);
    }
    return tAll;
}
function unzipSync(data) {
    var files = {};
    var e = data.length - 22;
    for(; b4(data, e) != 0x6054B50; --e){
        if (!e || data.length - e > 65558) throw 'invalid zip file';
    }
    ;
    var c = b2(data, e + 8);
    if (!c) return {};
    var o = b4(data, e + 16);
    var z = o == 4294967295;
    if (z) {
        e = b4(data, e - 12);
        if (b4(data, e) != 0x6064B50) throw 'invalid zip file';
        c = b4(data, e + 32);
        o = b4(data, e + 48);
    }
    for(var i = 0; i < c; ++i){
        var _a = zh(data, o, z), c_2 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
        o = no;
        if (!c_2) files[fn] = slc(data, b, b + sc);
        else if (c_2 == 8) files[fn] = inflateSync(data.subarray(b, b + sc), new u8(su));
        else throw 'unknown compression type ' + c_2;
    }
    return files;
}
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/@monogrid/gainmap-js/dist/QuadRenderer-DuOPRGA4.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @monogrid/gainmap-js v3.1.0
 * With ❤️, by MONOGRID <rnd@monogrid.com>
 */ __turbopack_context__.s([
    "Q",
    ()=>QuadRenderer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
;
const getBufferForType = (type, width, height)=>{
    let out;
    switch(type){
        case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsignedByteType"]:
            out = new Uint8ClampedArray(width * height * 4);
            break;
        case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HalfFloatType"]:
            out = new Uint16Array(width * height * 4);
            break;
        case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsignedIntType"]:
            out = new Uint32Array(width * height * 4);
            break;
        case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ByteType"]:
            out = new Int8Array(width * height * 4);
            break;
        case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShortType"]:
            out = new Int16Array(width * height * 4);
            break;
        case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IntType"]:
            out = new Int32Array(width * height * 4);
            break;
        case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatType"]:
            out = new Float32Array(width * height * 4);
            break;
        default:
            throw new Error('Unsupported data type');
    }
    return out;
};
let _canReadPixelsResult;
/**
 * Test if this browser implementation can correctly read pixels from the specified
 * Render target type.
 *
 * Runs only once
 *
 * @param type
 * @param renderer
 * @param camera
 * @param renderTargetOptions
 * @returns
 */ const canReadPixels = (type, renderer, camera, renderTargetOptions)=>{
    if (_canReadPixelsResult !== undefined) return _canReadPixelsResult;
    const testRT = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebGLRenderTarget"](1, 1, renderTargetOptions);
    renderer.setRenderTarget(testRT);
    const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](), new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
        color: 0xffffff
    }));
    renderer.render(mesh, camera);
    renderer.setRenderTarget(null);
    const out = getBufferForType(type, testRT.width, testRT.height);
    renderer.readRenderTargetPixels(testRT, 0, 0, testRT.width, testRT.height, out);
    testRT.dispose();
    mesh.geometry.dispose();
    mesh.material.dispose();
    _canReadPixelsResult = out[0] !== 0;
    return _canReadPixelsResult;
};
/**
 * Utility class used for rendering a texture with a material
 *
 * @category Core
 * @group Core
 */ class QuadRenderer {
    /**
     * Instantiates a temporary renderer
     *
     * @returns
     */ static instantiateRenderer() {
        const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]();
        renderer.setSize(128, 128);
        // renderer.outputColorSpace = SRGBColorSpace
        // renderer.toneMapping = LinearToneMapping
        // renderer.debug.checkShaderErrors = false
        // this._rendererIsDisposable = true
        return renderer;
    }
    /**
     * Obtains a Buffer containing the rendered texture.
     *
     * @throws Error if the browser cannot read pixels from this RenderTarget type.
     * @returns a TypedArray containing RGBA values from this renderer
     */ toArray() {
        if (!this._supportsReadPixels) throw new Error('Can\'t read pixels in this browser');
        const out = getBufferForType(this._type, this._width, this._height);
        this._renderer.readRenderTargetPixels(this._renderTarget, 0, 0, this._width, this._height, out);
        return out;
    }
    /**
     * Performs a readPixel operation in the renderTarget
     * and returns a DataTexture containing the read data
     *
     * @param options options
     * @returns
     */ toDataTexture(options) {
        const returnValue = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataTexture"](// fixed values
        this.toArray(), this.width, this.height, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBAFormat"], this._type, // user values
        (options === null || options === void 0 ? void 0 : options.mapping) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UVMapping"], (options === null || options === void 0 ? void 0 : options.wrapS) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"], (options === null || options === void 0 ? void 0 : options.wrapT) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"], (options === null || options === void 0 ? void 0 : options.magFilter) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"], (options === null || options === void 0 ? void 0 : options.minFilter) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"], (options === null || options === void 0 ? void 0 : options.anisotropy) || 1, // fixed value
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearSRGBColorSpace"]);
        // set this afterwards, we can't set it in constructor
        returnValue.generateMipmaps = (options === null || options === void 0 ? void 0 : options.generateMipmaps) !== undefined ? options === null || options === void 0 ? void 0 : options.generateMipmaps : false;
        return returnValue;
    }
    /**
     * If using a disposable renderer, it will dispose it.
     */ disposeOnDemandRenderer() {
        this._renderer.setRenderTarget(null);
        if (this._rendererIsDisposable) {
            this._renderer.dispose();
            this._renderer.forceContextLoss();
        }
    }
    /**
     * Will dispose of **all** assets used by this renderer.
     *
     *
     * @param disposeRenderTarget will dispose of the renderTarget which will not be usable later
     * set this to true if you passed the `renderTarget.texture` to a `PMREMGenerator`
     * or are otherwise done with it.
     *
     * @example
     * ```js
     * const loader = new HDRJPGLoader(renderer)
     * const result = await loader.loadAsync('gainmap.jpeg')
     * const mesh = new Mesh(geometry, new MeshBasicMaterial({ map: result.renderTarget.texture }) )
     * // DO NOT dispose the renderTarget here,
     * // it is used directly in the material
     * result.dispose()
     * ```
     *
     * @example
     * ```js
     * const loader = new HDRJPGLoader(renderer)
     * const pmremGenerator = new PMREMGenerator( renderer );
     * const result = await loader.loadAsync('gainmap.jpeg')
     * const envMap = pmremGenerator.fromEquirectangular(result.renderTarget.texture)
     * const mesh = new Mesh(geometry, new MeshStandardMaterial({ envMap }) )
     * // renderTarget can be disposed here
     * // because it was used to generate a PMREM texture
     * result.dispose(true)
     * ```
     */ dispose(disposeRenderTarget) {
        this.disposeOnDemandRenderer();
        if (disposeRenderTarget) {
            this.renderTarget.dispose();
        }
        // dispose shader material texture uniforms
        if (this.material instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]) {
            Object.values(this.material.uniforms).forEach((v)=>{
                if (v.value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Texture"]) v.value.dispose();
            });
        }
        // dispose other material properties
        Object.values(this.material).forEach((value)=>{
            if (value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Texture"]) value.dispose();
        });
        this.material.dispose();
        this._quad.geometry.dispose();
    }
    /**
     * Width of the texture
     */ get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
        this._renderTarget.setSize(this._width, this._height);
    }
    /**
     * Height of the texture
     */ get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
        this._renderTarget.setSize(this._width, this._height);
    }
    /**
     * The renderer used
     */ get renderer() {
        return this._renderer;
    }
    /**
     * The `WebGLRenderTarget` used.
     */ get renderTarget() {
        return this._renderTarget;
    }
    set renderTarget(value) {
        this._renderTarget = value;
        this._width = value.width;
        this._height = value.height;
    // this._type = value.texture.type
    }
    /**
     * The `Material` used.
     */ get material() {
        return this._material;
    }
    /**
     *
     */ get type() {
        return this._type;
    }
    get colorSpace() {
        return this._colorSpace;
    }
    /**
     * Constructs a new QuadRenderer
     *
     * @param options Parameters for this QuadRenderer
     */ constructor(options){
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        this._rendererIsDisposable = false;
        this._supportsReadPixels = true;
        /**
         * Renders the input texture using the specified material
         */ this.render = ()=>{
            this._renderer.setRenderTarget(this._renderTarget);
            try {
                this._renderer.render(this._scene, this._camera);
            } catch (e) {
                this._renderer.setRenderTarget(null);
                throw e;
            }
            this._renderer.setRenderTarget(null);
        };
        this._width = options.width;
        this._height = options.height;
        this._type = options.type;
        this._colorSpace = options.colorSpace;
        const rtOptions = {
            // fixed options
            format: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBAFormat"],
            depthBuffer: false,
            stencilBuffer: false,
            // user options
            type: this._type,
            colorSpace: this._colorSpace,
            anisotropy: ((_a = options.renderTargetOptions) === null || _a === void 0 ? void 0 : _a.anisotropy) !== undefined ? (_b = options.renderTargetOptions) === null || _b === void 0 ? void 0 : _b.anisotropy : 1,
            generateMipmaps: ((_c = options.renderTargetOptions) === null || _c === void 0 ? void 0 : _c.generateMipmaps) !== undefined ? (_d = options.renderTargetOptions) === null || _d === void 0 ? void 0 : _d.generateMipmaps : false,
            magFilter: ((_e = options.renderTargetOptions) === null || _e === void 0 ? void 0 : _e.magFilter) !== undefined ? (_f = options.renderTargetOptions) === null || _f === void 0 ? void 0 : _f.magFilter : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"],
            minFilter: ((_g = options.renderTargetOptions) === null || _g === void 0 ? void 0 : _g.minFilter) !== undefined ? (_h = options.renderTargetOptions) === null || _h === void 0 ? void 0 : _h.minFilter : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"],
            samples: ((_j = options.renderTargetOptions) === null || _j === void 0 ? void 0 : _j.samples) !== undefined ? (_k = options.renderTargetOptions) === null || _k === void 0 ? void 0 : _k.samples : undefined,
            wrapS: ((_l = options.renderTargetOptions) === null || _l === void 0 ? void 0 : _l.wrapS) !== undefined ? (_m = options.renderTargetOptions) === null || _m === void 0 ? void 0 : _m.wrapS : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"],
            wrapT: ((_o = options.renderTargetOptions) === null || _o === void 0 ? void 0 : _o.wrapT) !== undefined ? (_p = options.renderTargetOptions) === null || _p === void 0 ? void 0 : _p.wrapT : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"]
        };
        this._material = options.material;
        if (options.renderer) {
            this._renderer = options.renderer;
        } else {
            this._renderer = QuadRenderer.instantiateRenderer();
            this._rendererIsDisposable = true;
        }
        this._scene = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
        this._camera = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]();
        this._camera.position.set(0, 0, 10);
        this._camera.left = -0.5;
        this._camera.right = 0.5;
        this._camera.top = 0.5;
        this._camera.bottom = -0.5;
        this._camera.updateProjectionMatrix();
        if (!canReadPixels(this._type, this._renderer, this._camera, rtOptions)) {
            let alternativeType;
            switch(this._type){
                case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HalfFloatType"]:
                    alternativeType = this._renderer.extensions.has('EXT_color_buffer_float') ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatType"] : undefined;
                    break;
            }
            if (alternativeType !== undefined) {
                console.warn("This browser does not support reading pixels from ".concat(this._type, " RenderTargets, switching to ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatType"]));
                this._type = alternativeType;
            } else {
                this._supportsReadPixels = false;
                console.warn('This browser dos not support toArray or toDataTexture, calls to those methods will result in an error thrown');
            }
        }
        this._quad = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](), this._material);
        this._quad.geometry.computeBoundingBox();
        this._scene.add(this._quad);
        this._renderTarget = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebGLRenderTarget"](this.width, this.height, rtOptions);
        this._renderTarget.texture.mapping = ((_q = options.renderTargetOptions) === null || _q === void 0 ? void 0 : _q.mapping) !== undefined ? (_r = options.renderTargetOptions) === null || _r === void 0 ? void 0 : _r.mapping : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UVMapping"];
    }
}
;
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/@monogrid/gainmap-js/dist/decode.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * @monogrid/gainmap-js v3.1.0
 * With ❤️, by MONOGRID <rnd@monogrid.com>
 */ __turbopack_context__.s([
    "GainMapDecoderMaterial",
    ()=>GainMapDecoderMaterial,
    "GainMapLoader",
    ()=>GainMapLoader,
    "HDRJPGLoader",
    ()=>HDRJPGLoader,
    "JPEGRLoader",
    ()=>HDRJPGLoader,
    "MPFExtractor",
    ()=>MPFExtractor,
    "decode",
    ()=>decode,
    "extractGainmapFromJPEG",
    ()=>extractGainmapFromJPEG,
    "extractXMP",
    ()=>extractXMP
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$monogrid$2f$gainmap$2d$js$2f$dist$2f$QuadRenderer$2d$DuOPRGA4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/@monogrid/gainmap-js/dist/QuadRenderer-DuOPRGA4.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
;
const vertexShader = "\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n";
const fragmentShader = "\n// min half float value\n#define HALF_FLOAT_MIN vec3( -65504, -65504, -65504 )\n// max half float value\n#define HALF_FLOAT_MAX vec3( 65504, 65504, 65504 )\n\nuniform sampler2D sdr;\nuniform sampler2D gainMap;\nuniform vec3 gamma;\nuniform vec3 offsetHdr;\nuniform vec3 offsetSdr;\nuniform vec3 gainMapMin;\nuniform vec3 gainMapMax;\nuniform float weightFactor;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vec3 rgb = texture2D( sdr, vUv ).rgb;\n  vec3 recovery = texture2D( gainMap, vUv ).rgb;\n  vec3 logRecovery = pow( recovery, gamma );\n  vec3 logBoost = gainMapMin * ( 1.0 - logRecovery ) + gainMapMax * logRecovery;\n  vec3 hdrColor = (rgb + offsetSdr) * exp2( logBoost * weightFactor ) - offsetHdr;\n  vec3 clampedHdrColor = max( HALF_FLOAT_MIN, min( HALF_FLOAT_MAX, hdrColor ));\n  gl_FragColor = vec4( clampedHdrColor , 1.0 );\n}\n";
/**
 * A Material which is able to decode the Gainmap into a full HDR Representation
 *
 * @category Materials
 * @group Materials
 */ class GainMapDecoderMaterial extends __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"] {
    get sdr() {
        return this.uniforms.sdr.value;
    }
    set sdr(value) {
        this.uniforms.sdr.value = value;
    }
    get gainMap() {
        return this.uniforms.gainMap.value;
    }
    set gainMap(value) {
        this.uniforms.gainMap.value = value;
    }
    /**
     * @see {@link GainMapMetadata.offsetHdr}
     */ get offsetHdr() {
        return this.uniforms.offsetHdr.value.toArray();
    }
    set offsetHdr(value) {
        this.uniforms.offsetHdr.value.fromArray(value);
    }
    /**
     * @see {@link GainMapMetadata.offsetSdr}
     */ get offsetSdr() {
        return this.uniforms.offsetSdr.value.toArray();
    }
    set offsetSdr(value) {
        this.uniforms.offsetSdr.value.fromArray(value);
    }
    /**
     * @see {@link GainMapMetadata.gainMapMin}
     */ get gainMapMin() {
        return this.uniforms.gainMapMin.value.toArray();
    }
    set gainMapMin(value) {
        this.uniforms.gainMapMin.value.fromArray(value);
    }
    /**
     * @see {@link GainMapMetadata.gainMapMax}
     */ get gainMapMax() {
        return this.uniforms.gainMapMax.value.toArray();
    }
    set gainMapMax(value) {
        this.uniforms.gainMapMax.value.fromArray(value);
    }
    /**
     * @see {@link GainMapMetadata.gamma}
     */ get gamma() {
        const g = this.uniforms.gamma.value;
        return [
            1 / g.x,
            1 / g.y,
            1 / g.z
        ];
    }
    set gamma(value) {
        const g = this.uniforms.gamma.value;
        g.x = 1.0 / value[0];
        g.y = 1.0 / value[1];
        g.z = 1.0 / value[2];
    }
    /**
     * @see {@link GainMapMetadata.hdrCapacityMin}
     * @remarks Logarithmic space
     */ get hdrCapacityMin() {
        return this._hdrCapacityMin;
    }
    set hdrCapacityMin(value) {
        this._hdrCapacityMin = value;
        this.calculateWeight();
    }
    /**
     * @see {@link GainMapMetadata.hdrCapacityMin}
     * @remarks Logarithmic space
     */ get hdrCapacityMax() {
        return this._hdrCapacityMax;
    }
    set hdrCapacityMax(value) {
        this._hdrCapacityMax = value;
        this.calculateWeight();
    }
    /**
     * @see {@link GainmapDecodingParameters.maxDisplayBoost}
     * @remarks Non Logarithmic space
     */ get maxDisplayBoost() {
        return this._maxDisplayBoost;
    }
    set maxDisplayBoost(value) {
        this._maxDisplayBoost = Math.max(1, Math.min(65504, value));
        this.calculateWeight();
    }
    calculateWeight() {
        const val = (Math.log2(this._maxDisplayBoost) - this._hdrCapacityMin) / (this._hdrCapacityMax - this._hdrCapacityMin);
        this.uniforms.weightFactor.value = Math.max(0, Math.min(1, val));
    }
    /**
     *
     * @param params
     */ constructor({ gamma, offsetHdr, offsetSdr, gainMapMin, gainMapMax, maxDisplayBoost, hdrCapacityMin, hdrCapacityMax, sdr, gainMap }){
        super({
            name: 'GainMapDecoderMaterial',
            vertexShader,
            fragmentShader,
            uniforms: {
                sdr: {
                    value: sdr
                },
                gainMap: {
                    value: gainMap
                },
                gamma: {
                    value: new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1.0 / gamma[0], 1.0 / gamma[1], 1.0 / gamma[2])
                },
                offsetHdr: {
                    value: new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().fromArray(offsetHdr)
                },
                offsetSdr: {
                    value: new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().fromArray(offsetSdr)
                },
                gainMapMin: {
                    value: new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().fromArray(gainMapMin)
                },
                gainMapMax: {
                    value: new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().fromArray(gainMapMax)
                },
                weightFactor: {
                    value: (Math.log2(maxDisplayBoost) - hdrCapacityMin) / (hdrCapacityMax - hdrCapacityMin)
                }
            },
            blending: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NoBlending"],
            depthTest: false,
            depthWrite: false
        });
        this._maxDisplayBoost = maxDisplayBoost;
        this._hdrCapacityMin = hdrCapacityMin;
        this._hdrCapacityMax = hdrCapacityMax;
        this.needsUpdate = true;
        this.uniformsNeedUpdate = true;
    }
}
/**
 * Decodes a gain map using a WebGLRenderTarget
 *
 * @category Decoding Functions
 * @group Decoding Functions
 * @example
 * import { decode } from '@monogrid/gainmap-js'
 * import {
 *   Mesh,
 *   MeshBasicMaterial,
 *   PerspectiveCamera,
 *   PlaneGeometry,
 *   Scene,
 *   TextureLoader,
 *   WebGLRenderer
 * } from 'three'
 *
 * const renderer = new WebGLRenderer()
 *
 * const textureLoader = new TextureLoader()
 *
 * // load SDR Representation
 * const sdr = await textureLoader.loadAsync('sdr.jpg')
 * // load Gain map recovery image
 * const gainMap = await textureLoader.loadAsync('gainmap.jpg')
 * // load metadata
 * const metadata = await (await fetch('metadata.json')).json()
 *
 * const result = await decode({
 *   sdr,
 *   gainMap,
 *   // this allows to use `result.renderTarget.texture` directly
 *   renderer,
 *   // this will restore the full HDR range
 *   maxDisplayBoost: Math.pow(2, metadata.hdrCapacityMax),
 *   ...metadata
 * })
 *
 * const scene = new Scene()
 * // `result` can be used to populate a Texture
 * const mesh = new Mesh(
 *   new PlaneGeometry(),
 *   new MeshBasicMaterial({ map: result.renderTarget.texture })
 * )
 * scene.add(mesh)
 * renderer.render(scene, new PerspectiveCamera())
 *
 * // result must be manually disposed
 * // when you are done using it
 * result.dispose()
 *
 * @param params
 * @returns
 * @throws {Error} if the WebGLRenderer fails to render the gain map
 */ const decode = (params)=>{
    const { sdr, gainMap, renderer } = params;
    if (sdr.colorSpace !== __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"]) {
        console.warn('SDR Colorspace needs to be *SRGBColorSpace*, setting it automatically');
        sdr.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
    }
    sdr.needsUpdate = true;
    if (gainMap.colorSpace !== __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearSRGBColorSpace"]) {
        console.warn('Gainmap Colorspace needs to be *LinearSRGBColorSpace*, setting it automatically');
        gainMap.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearSRGBColorSpace"];
    }
    gainMap.needsUpdate = true;
    const material = new GainMapDecoderMaterial({
        ...params,
        sdr,
        gainMap
    });
    const quadRenderer = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$monogrid$2f$gainmap$2d$js$2f$dist$2f$QuadRenderer$2d$DuOPRGA4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Q"]({
        // TODO: three types are generic, eslint complains here, see how we can solve
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        width: sdr.image.width,
        // TODO: three types are generic, eslint complains here, see how we can solve
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        height: sdr.image.height,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HalfFloatType"],
        colorSpace: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearSRGBColorSpace"],
        material,
        renderer,
        renderTargetOptions: params.renderTargetOptions
    });
    try {
        quadRenderer.render();
    } catch (e) {
        quadRenderer.disposeOnDemandRenderer();
        throw e;
    }
    return quadRenderer;
};
class GainMapNotFoundError extends Error {
}
class XMPMetadataNotFoundError extends Error {
}
const getXMLValue = (xml, tag, defaultValue)=>{
    // Check for attribute format first: tag="value"
    const attributeMatch = new RegExp("".concat(tag, '="([^"]*)"'), 'i').exec(xml);
    if (attributeMatch) return attributeMatch[1];
    // Check for tag format: <tag>value</tag> or <tag><rdf:li>value</rdf:li>...</tag>
    const tagMatch = new RegExp("<".concat(tag, "[^>]*>([\\s\\S]*?)</").concat(tag, ">"), 'i').exec(xml);
    if (tagMatch) {
        // Check if it contains rdf:li elements
        const liValues = tagMatch[1].match(/<rdf:li>([^<]*)<\/rdf:li>/g);
        if (liValues && liValues.length === 3) {
            return liValues.map((v)=>v.replace(/<\/?rdf:li>/g, ''));
        }
        return tagMatch[1].trim();
    }
    if (defaultValue !== undefined) return defaultValue;
    throw new Error("Can't find ".concat(tag, " in gainmap metadata"));
};
const extractXMP = (input)=>{
    let str;
    // support node test environment
    if (typeof TextDecoder !== 'undefined') str = new TextDecoder().decode(input);
    else str = input.toString();
    let start = str.indexOf('<x:xmpmeta');
    while(start !== -1){
        const end = str.indexOf('x:xmpmeta>', start);
        const xmpBlock = str.slice(start, end + 10);
        try {
            const gainMapMin = getXMLValue(xmpBlock, 'hdrgm:GainMapMin', '0');
            const gainMapMax = getXMLValue(xmpBlock, 'hdrgm:GainMapMax');
            const gamma = getXMLValue(xmpBlock, 'hdrgm:Gamma', '1');
            const offsetSDR = getXMLValue(xmpBlock, 'hdrgm:OffsetSDR', '0.015625');
            const offsetHDR = getXMLValue(xmpBlock, 'hdrgm:OffsetHDR', '0.015625');
            // These are always attributes, so we can use a simpler regex
            const hdrCapacityMinMatch = /hdrgm:HDRCapacityMin="([^"]*)"/.exec(xmpBlock);
            const hdrCapacityMin = hdrCapacityMinMatch ? hdrCapacityMinMatch[1] : '0';
            const hdrCapacityMaxMatch = /hdrgm:HDRCapacityMax="([^"]*)"/.exec(xmpBlock);
            if (!hdrCapacityMaxMatch) throw new Error('Incomplete gainmap metadata');
            const hdrCapacityMax = hdrCapacityMaxMatch[1];
            return {
                gainMapMin: Array.isArray(gainMapMin) ? gainMapMin.map((v)=>parseFloat(v)) : [
                    parseFloat(gainMapMin),
                    parseFloat(gainMapMin),
                    parseFloat(gainMapMin)
                ],
                gainMapMax: Array.isArray(gainMapMax) ? gainMapMax.map((v)=>parseFloat(v)) : [
                    parseFloat(gainMapMax),
                    parseFloat(gainMapMax),
                    parseFloat(gainMapMax)
                ],
                gamma: Array.isArray(gamma) ? gamma.map((v)=>parseFloat(v)) : [
                    parseFloat(gamma),
                    parseFloat(gamma),
                    parseFloat(gamma)
                ],
                offsetSdr: Array.isArray(offsetSDR) ? offsetSDR.map((v)=>parseFloat(v)) : [
                    parseFloat(offsetSDR),
                    parseFloat(offsetSDR),
                    parseFloat(offsetSDR)
                ],
                offsetHdr: Array.isArray(offsetHDR) ? offsetHDR.map((v)=>parseFloat(v)) : [
                    parseFloat(offsetHDR),
                    parseFloat(offsetHDR),
                    parseFloat(offsetHDR)
                ],
                hdrCapacityMin: parseFloat(hdrCapacityMin),
                hdrCapacityMax: parseFloat(hdrCapacityMax)
            };
        } catch (e) {
        // Continue searching for another xmpmeta block if this one fails
        }
        start = str.indexOf('<x:xmpmeta', end);
    }
};
/**
 * MPF Extractor (Multi Picture Format Extractor)
 * By Henrik S Nilsson 2019
 *
 * Extracts images stored in images based on the MPF format (found here: https://www.cipa.jp/e/std/std-sec.html
 * under "CIPA DC-007-Translation-2021 Multi-Picture Format"
 *
 * Overly commented, and without intention of being complete or production ready.
 * Created to extract depth maps from iPhone images, and to learn about image metadata.
 * Kudos to: Phil Harvey (exiftool), Jaume Sanchez (android-lens-blur-depth-extractor)
 */ class MPFExtractor {
    extract(imageArrayBuffer) {
        return new Promise((resolve, reject)=>{
            const debug = this.options.debug;
            const dataView = new DataView(imageArrayBuffer.buffer);
            // If you're executing this line on a big endian machine, it'll be reversed.
            // bigEnd further down though, refers to the endianness of the image itself.
            if (dataView.getUint16(0) !== 0xffd8) {
                reject(new Error('Not a valid jpeg'));
                return;
            }
            const length = dataView.byteLength;
            let offset = 2;
            let loops = 0;
            let marker; // APP# marker
            while(offset < length){
                if (++loops > 250) {
                    reject(new Error("Found no marker after ".concat(loops, " loops 😵")));
                    return;
                }
                if (dataView.getUint8(offset) !== 0xff) {
                    reject(new Error("Not a valid marker at offset 0x".concat(offset.toString(16), ", found: 0x").concat(dataView.getUint8(offset).toString(16))));
                    return;
                }
                marker = dataView.getUint8(offset + 1);
                if (debug) console.log("Marker: ".concat(marker.toString(16)));
                if (marker === 0xe2) {
                    if (debug) console.log('Found APP2 marker (0xffe2)');
                    // Works for iPhone 8 Plus, X, and XSMax. Or any photos of MPF format.
                    // Great way to visualize image information in html is using Exiftool. E.g.:
                    // ./exiftool.exe -htmldump -wantTrailer photo.jpg > photo.html
                    const formatPt = offset + 4;
                    /*
                     *  Structure of the MP Format Identifier
                     *
                     *  Offset Addr.  | Code (Hex)  | Description
                     *  +00             ff            Marker Prefix      <-- offset
                     *  +01             e2            APP2
                     *  +02             #n            APP2 Field Length
                     *  +03             #n            APP2 Field Length
                     *  +04             4d            'M'                <-- formatPt
                     *  +05             50            'P'
                     *  +06             46            'F'
                     *  +07             00            NULL
                     *                                                   <-- tiffOffset
                     */ if (dataView.getUint32(formatPt) === 0x4d504600) {
                        // Found MPF tag, so we start dig out sub images
                        const tiffOffset = formatPt + 4;
                        let bigEnd; // Endianness from TIFF header
                        // Test for TIFF validity and endianness
                        // 0x4949 and 0x4D4D ('II' and 'MM') marks Little Endian and Big Endian
                        if (dataView.getUint16(tiffOffset) === 0x4949) {
                            bigEnd = false;
                        } else if (dataView.getUint16(tiffOffset) === 0x4d4d) {
                            bigEnd = true;
                        } else {
                            reject(new Error('No valid endianness marker found in TIFF header'));
                            return;
                        }
                        if (dataView.getUint16(tiffOffset + 2, !bigEnd) !== 0x002a) {
                            reject(new Error('Not valid TIFF data! (no 0x002A marker)'));
                            return;
                        }
                        // 32 bit number stating the offset from the start of the 8 Byte MP Header
                        // to MP Index IFD Least possible value is thus 8 (means 0 offset)
                        const firstIFDOffset = dataView.getUint32(tiffOffset + 4, !bigEnd);
                        if (firstIFDOffset < 0x00000008) {
                            reject(new Error('Not valid TIFF data! (First offset less than 8)'));
                            return;
                        }
                        // Move ahead to MP Index IFD
                        // Assume we're at the first IFD, so firstIFDOffset points to
                        // MP Index IFD and not MP Attributes IFD. (If we try extract from a sub image,
                        // we fail silently here due to this assumption)
                        // Count (2 Byte) | MP Index Fields a.k.a. MP Entries (count * 12 Byte) | Offset of Next IFD (4 Byte)
                        const dirStart = tiffOffset + firstIFDOffset; // Start of IFD (Image File Directory)
                        const count = dataView.getUint16(dirStart, !bigEnd); // Count of MPEntries (2 Byte)
                        // Extract info from MPEntries (starting after Count)
                        const entriesStart = dirStart + 2;
                        let numberOfImages = 0;
                        for(let i = entriesStart; i < entriesStart + 12 * count; i += 12){
                            // Each entry is 12 Bytes long
                            // Check MP Index IFD tags, here we only take tag 0xb001 = Number of images
                            if (dataView.getUint16(i, !bigEnd) === 0xb001) {
                                // stored in Last 4 bytes of its 12 Byte entry.
                                numberOfImages = dataView.getUint32(i + 8, !bigEnd);
                            }
                        }
                        const nextIFDOffsetLen = 4; // 4 Byte offset field that appears after MP Index IFD tags
                        const MPImageListValPt = dirStart + 2 + count * 12 + nextIFDOffsetLen;
                        const images = [];
                        for(let i = MPImageListValPt; i < MPImageListValPt + numberOfImages * 16; i += 16){
                            const image = {
                                MPType: dataView.getUint32(i, !bigEnd),
                                size: dataView.getUint32(i + 4, !bigEnd),
                                // This offset is specified relative to the address of the MP Endian
                                // field in the MP Header, unless the image is a First Individual Image,
                                // in which case the value of the offset shall be NULL (0x00000000).
                                dataOffset: dataView.getUint32(i + 8, !bigEnd),
                                dependantImages: dataView.getUint32(i + 12, !bigEnd),
                                start: -1,
                                end: -1,
                                isFII: false
                            };
                            if (!image.dataOffset) {
                                // dataOffset is 0x00000000 for First Individual Image
                                image.start = 0;
                                image.isFII = true;
                            } else {
                                image.start = tiffOffset + image.dataOffset;
                                image.isFII = false;
                            }
                            image.end = image.start + image.size;
                            images.push(image);
                        }
                        if (this.options.extractNonFII && images.length) {
                            const bufferBlob = new Blob([
                                dataView
                            ]);
                            const imgs = [];
                            for (const image of images){
                                if (image.isFII && !this.options.extractFII) {
                                    continue; // Skip FII
                                }
                                const imageBlob = bufferBlob.slice(image.start, image.end + 1, 'image/jpeg');
                                // we don't need this
                                // const imageUrl = URL.createObjectURL(imageBlob)
                                // image.img = document.createElement('img')
                                // image.img.src = imageUrl
                                imgs.push(imageBlob);
                            }
                            resolve(imgs);
                        }
                    }
                }
                offset += 2 + dataView.getUint16(offset + 2);
            }
        });
    }
    constructor(options){
        this.options = {
            debug: options && options.debug !== undefined ? options.debug : false,
            extractFII: options && options.extractFII !== undefined ? options.extractFII : true,
            extractNonFII: options && options.extractNonFII !== undefined ? options.extractNonFII : true
        };
    }
}
/**
 * Extracts XMP Metadata and the gain map recovery image
 * from a single JPEG file.
 *
 * @category Decoding Functions
 * @group Decoding Functions
 * @param jpegFile an `Uint8Array` containing and encoded JPEG file
 * @returns an sdr `Uint8Array` compressed in JPEG, a gainMap `Uint8Array` compressed in JPEG and the XMP parsed XMP metadata
 * @throws Error if XMP Metadata is not found
 * @throws Error if Gain map image is not found
 * @example
 * import { FileLoader } from 'three'
 * import { extractGainmapFromJPEG } from '@monogrid/gainmap-js'
 *
 * const jpegFile = await new FileLoader()
 *  .setResponseType('arraybuffer')
 *  .loadAsync('image.jpg')
 *
 * const { sdr, gainMap, metadata } = extractGainmapFromJPEG(jpegFile)
 */ const extractGainmapFromJPEG = async (jpegFile)=>{
    const metadata = extractXMP(jpegFile);
    if (!metadata) throw new XMPMetadataNotFoundError('Gain map XMP metadata not found');
    const mpfExtractor = new MPFExtractor({
        extractFII: true,
        extractNonFII: true
    });
    const images = await mpfExtractor.extract(jpegFile);
    if (images.length !== 2) throw new GainMapNotFoundError('Gain map recovery image not found');
    return {
        sdr: new Uint8Array(await images[0].arrayBuffer()),
        gainMap: new Uint8Array(await images[1].arrayBuffer()),
        metadata
    };
};
/**
 * private function, async get image from blob
 *
 * @param blob
 * @returns
 */ const getHTMLImageFromBlob = (blob)=>{
    return new Promise((resolve, reject)=>{
        const img = document.createElement('img');
        img.onload = ()=>{
            resolve(img);
        };
        img.onerror = (e)=>{
            reject(e);
        };
        img.src = URL.createObjectURL(blob);
    });
};
class LoaderBase extends __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Loader"] {
    /**
     * Specify the renderer to use when rendering the gain map
     *
     * @param renderer
     * @returns
     */ setRenderer(renderer) {
        this._renderer = renderer;
        return this;
    }
    /**
     * Specify the renderTarget options to use when rendering the gain map
     *
     * @param options
     * @returns
     */ setRenderTargetOptions(options) {
        this._renderTargetOptions = options;
        return this;
    }
    /**
     * @private
     * @returns
     */ prepareQuadRenderer() {
        if (!this._renderer) console.warn('WARNING: An existing WebGL Renderer was not passed to this Loader constructor or in setRenderer, the result of this Loader will need to be converted to a Data Texture with toDataTexture() before you can use it in your renderer.');
        // temporary values
        const material = new GainMapDecoderMaterial({
            gainMapMax: [
                1,
                1,
                1
            ],
            gainMapMin: [
                0,
                0,
                0
            ],
            gamma: [
                1,
                1,
                1
            ],
            offsetHdr: [
                1,
                1,
                1
            ],
            offsetSdr: [
                1,
                1,
                1
            ],
            hdrCapacityMax: 1,
            hdrCapacityMin: 0,
            maxDisplayBoost: 1,
            gainMap: new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Texture"](),
            sdr: new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Texture"]()
        });
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f40$monogrid$2f$gainmap$2d$js$2f$dist$2f$QuadRenderer$2d$DuOPRGA4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Q"]({
            width: 16,
            height: 16,
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HalfFloatType"],
            colorSpace: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearSRGBColorSpace"],
            material,
            renderer: this._renderer,
            renderTargetOptions: this._renderTargetOptions
        });
    }
    /**
   * @private
   * @param quadRenderer
   * @param metadata
   * @param sdrBuffer
   * @param gainMapBuffer
   */ async render(quadRenderer, metadata, sdrBuffer, gainMapBuffer) {
        // this is optional, will render a black gain-map if not present
        const gainMapBlob = gainMapBuffer ? new Blob([
            gainMapBuffer
        ], {
            type: 'image/jpeg'
        }) : undefined;
        const sdrBlob = new Blob([
            sdrBuffer
        ], {
            type: 'image/jpeg'
        });
        let sdrImage;
        let gainMapImage;
        let needsFlip = false;
        if (typeof createImageBitmap === 'undefined') {
            const res = await Promise.all([
                gainMapBlob ? getHTMLImageFromBlob(gainMapBlob) : Promise.resolve(undefined),
                getHTMLImageFromBlob(sdrBlob)
            ]);
            gainMapImage = res[0];
            sdrImage = res[1];
            needsFlip = true;
        } else {
            const res = await Promise.all([
                gainMapBlob ? createImageBitmap(gainMapBlob, {
                    imageOrientation: 'flipY'
                }) : Promise.resolve(undefined),
                createImageBitmap(sdrBlob, {
                    imageOrientation: 'flipY'
                })
            ]);
            gainMapImage = res[0];
            sdrImage = res[1];
        }
        const gainMap = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Texture"](gainMapImage || new ImageData(2, 2), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UVMapping"], __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"], __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"], __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"], __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearMipMapLinearFilter"], __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBAFormat"], __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsignedByteType"], 1, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearSRGBColorSpace"]);
        gainMap.flipY = needsFlip;
        gainMap.needsUpdate = true;
        const sdr = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Texture"](sdrImage, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UVMapping"], __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"], __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"], __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"], __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearMipMapLinearFilter"], __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBAFormat"], __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsignedByteType"], 1, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"]);
        sdr.flipY = needsFlip;
        sdr.needsUpdate = true;
        quadRenderer.width = sdrImage.width;
        quadRenderer.height = sdrImage.height;
        quadRenderer.material.gainMap = gainMap;
        quadRenderer.material.sdr = sdr;
        quadRenderer.material.gainMapMin = metadata.gainMapMin;
        quadRenderer.material.gainMapMax = metadata.gainMapMax;
        quadRenderer.material.offsetHdr = metadata.offsetHdr;
        quadRenderer.material.offsetSdr = metadata.offsetSdr;
        quadRenderer.material.gamma = metadata.gamma;
        quadRenderer.material.hdrCapacityMin = metadata.hdrCapacityMin;
        quadRenderer.material.hdrCapacityMax = metadata.hdrCapacityMax;
        quadRenderer.material.maxDisplayBoost = Math.pow(2, metadata.hdrCapacityMax);
        quadRenderer.material.needsUpdate = true;
        quadRenderer.render();
    }
    /**
     *
     * @param renderer
     * @param manager
     */ constructor(renderer, manager){
        super(manager);
        if (renderer) this._renderer = renderer;
        this._internalLoadingManager = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadingManager"]();
    }
}
/**
 * A Three.js Loader for the gain map format.
 *
 * @category Loaders
 * @group Loaders
 *
 * @example
 * import { GainMapLoader } from '@monogrid/gainmap-js'
 * import {
 *   EquirectangularReflectionMapping,
 *   LinearFilter,
 *   Mesh,
 *   MeshBasicMaterial,
 *   PerspectiveCamera,
 *   PlaneGeometry,
 *   Scene,
 *   WebGLRenderer
 * } from 'three'
 *
 * const renderer = new WebGLRenderer()
 *
 * const loader = new GainMapLoader(renderer)
 *
 * const result = await loader.loadAsync(['sdr.jpeg', 'gainmap.jpeg', 'metadata.json'])
 * // `result` can be used to populate a Texture
 *
 * const scene = new Scene()
 * const mesh = new Mesh(
 *   new PlaneGeometry(),
 *   new MeshBasicMaterial({ map: result.renderTarget.texture })
 * )
 * scene.add(mesh)
 * renderer.render(scene, new PerspectiveCamera())
 *
 * // Starting from three.js r159
 * // `result.renderTarget.texture` can
 * // also be used as Equirectangular scene background
 * //
 * // it was previously needed to convert it
 * // to a DataTexture with `result.toDataTexture()`
 * scene.background = result.renderTarget.texture
 * scene.background.mapping = EquirectangularReflectionMapping
 *
 * // result must be manually disposed
 * // when you are done using it
 * result.dispose()
 *
 */ class GainMapLoader extends LoaderBase {
    /**
     * Loads a gainmap using separate data
     * * sdr image
     * * gain map image
     * * metadata json
     *
     * useful for webp gain maps
     *
     * @param urls An array in the form of [sdr.jpg, gainmap.jpg, metadata.json]
     * @param onLoad Load complete callback, will receive the result
     * @param onProgress Progress callback, will receive a {@link ProgressEvent}
     * @param onError Error callback
     * @returns
     */ load(param, onLoad, onProgress, onError) {
        let [sdrUrl, gainMapUrl, metadataUrl] = param;
        const quadRenderer = this.prepareQuadRenderer();
        let sdr;
        let gainMap;
        let metadata;
        const loadCheck = async ()=>{
            if (sdr && gainMap && metadata) {
                // solves #16
                try {
                    await this.render(quadRenderer, metadata, sdr, gainMap);
                } catch (error) {
                    this.manager.itemError(sdrUrl);
                    this.manager.itemError(gainMapUrl);
                    this.manager.itemError(metadataUrl);
                    if (typeof onError === 'function') onError(error);
                    quadRenderer.disposeOnDemandRenderer();
                    return;
                }
                if (typeof onLoad === 'function') onLoad(quadRenderer);
                this.manager.itemEnd(sdrUrl);
                this.manager.itemEnd(gainMapUrl);
                this.manager.itemEnd(metadataUrl);
                quadRenderer.disposeOnDemandRenderer();
            }
        };
        let sdrLengthComputable = true;
        let sdrTotal = 0;
        let sdrLoaded = 0;
        let gainMapLengthComputable = true;
        let gainMapTotal = 0;
        let gainMapLoaded = 0;
        let metadataLengthComputable = true;
        let metadataTotal = 0;
        let metadataLoaded = 0;
        const progressHandler = ()=>{
            if (typeof onProgress === 'function') {
                const total = sdrTotal + gainMapTotal + metadataTotal;
                const loaded = sdrLoaded + gainMapLoaded + metadataLoaded;
                const lengthComputable = sdrLengthComputable && gainMapLengthComputable && metadataLengthComputable;
                onProgress(new ProgressEvent('progress', {
                    lengthComputable,
                    loaded,
                    total
                }));
            }
        };
        this.manager.itemStart(sdrUrl);
        this.manager.itemStart(gainMapUrl);
        this.manager.itemStart(metadataUrl);
        const sdrLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileLoader"](this._internalLoadingManager);
        sdrLoader.setResponseType('arraybuffer');
        sdrLoader.setRequestHeader(this.requestHeader);
        sdrLoader.setPath(this.path);
        sdrLoader.setWithCredentials(this.withCredentials);
        sdrLoader.load(sdrUrl, async (buffer)=>{
            /* istanbul ignore if
             this condition exists only because of three.js types + strict mode
            */ if (typeof buffer === 'string') throw new Error('Invalid sdr buffer');
            sdr = buffer;
            await loadCheck();
        }, (e)=>{
            sdrLengthComputable = e.lengthComputable;
            sdrLoaded = e.loaded;
            sdrTotal = e.total;
            progressHandler();
        }, (error)=>{
            this.manager.itemError(sdrUrl);
            if (typeof onError === 'function') onError(error);
        });
        const gainMapLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileLoader"](this._internalLoadingManager);
        gainMapLoader.setResponseType('arraybuffer');
        gainMapLoader.setRequestHeader(this.requestHeader);
        gainMapLoader.setPath(this.path);
        gainMapLoader.setWithCredentials(this.withCredentials);
        gainMapLoader.load(gainMapUrl, async (buffer)=>{
            /* istanbul ignore if
             this condition exists only because of three.js types + strict mode
            */ if (typeof buffer === 'string') throw new Error('Invalid gainmap buffer');
            gainMap = buffer;
            await loadCheck();
        }, (e)=>{
            gainMapLengthComputable = e.lengthComputable;
            gainMapLoaded = e.loaded;
            gainMapTotal = e.total;
            progressHandler();
        }, (error)=>{
            this.manager.itemError(gainMapUrl);
            if (typeof onError === 'function') onError(error);
        });
        const metadataLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileLoader"](this._internalLoadingManager);
        // metadataLoader.setResponseType('json')
        metadataLoader.setRequestHeader(this.requestHeader);
        metadataLoader.setPath(this.path);
        metadataLoader.setWithCredentials(this.withCredentials);
        metadataLoader.load(metadataUrl, async (json)=>{
            /* istanbul ignore if
             this condition exists only because of three.js types + strict mode
            */ if (typeof json !== 'string') throw new Error('Invalid metadata string');
            // TODO: implement check on JSON file and remove this eslint disable
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            metadata = JSON.parse(json);
            await loadCheck();
        }, (e)=>{
            metadataLengthComputable = e.lengthComputable;
            metadataLoaded = e.loaded;
            metadataTotal = e.total;
            progressHandler();
        }, (error)=>{
            this.manager.itemError(metadataUrl);
            if (typeof onError === 'function') onError(error);
        });
        return quadRenderer;
    }
}
/**
 * A Three.js Loader for a JPEG with embedded gainmap metadata.
 *
 * @category Loaders
 * @group Loaders
 *
 * @example
 * import { HDRJPGLoader } from '@monogrid/gainmap-js'
 * import {
 *   EquirectangularReflectionMapping,
 *   LinearFilter,
 *   Mesh,
 *   MeshBasicMaterial,
 *   PerspectiveCamera,
 *   PlaneGeometry,
 *   Scene,
 *   WebGLRenderer
 * } from 'three'
 *
 * const renderer = new WebGLRenderer()
 *
 * const loader = new HDRJPGLoader(renderer)
 *
 * const result = await loader.loadAsync('gainmap.jpeg')
 * // `result` can be used to populate a Texture
 *
 * const scene = new Scene()
 * const mesh = new Mesh(
 *   new PlaneGeometry(),
 *   new MeshBasicMaterial({ map: result.renderTarget.texture })
 * )
 * scene.add(mesh)
 * renderer.render(scene, new PerspectiveCamera())
 *
 * // Starting from three.js r159
 * // `result.renderTarget.texture` can
 * // also be used as Equirectangular scene background
 * //
 * // it was previously needed to convert it
 * // to a DataTexture with `result.toDataTexture()`
 * scene.background = result.renderTarget.texture
 * scene.background.mapping = EquirectangularReflectionMapping
 *
 * // result must be manually disposed
 * // when you are done using it
 * result.dispose()
 *
 */ class HDRJPGLoader extends LoaderBase {
    /**
     * Loads a JPEG containing gain map metadata
     * Renders a normal SDR image if gainmap data is not found
     *
     * @param url An array in the form of [sdr.jpg, gainmap.jpg, metadata.json]
     * @param onLoad Load complete callback, will receive the result
     * @param onProgress Progress callback, will receive a {@link ProgressEvent}
     * @param onError Error callback
     * @returns
     */ load(url, onLoad, onProgress, onError) {
        const quadRenderer = this.prepareQuadRenderer();
        const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileLoader"](this._internalLoadingManager);
        loader.setResponseType('arraybuffer');
        loader.setRequestHeader(this.requestHeader);
        loader.setPath(this.path);
        loader.setWithCredentials(this.withCredentials);
        this.manager.itemStart(url);
        loader.load(url, async (jpeg)=>{
            /* istanbul ignore if
             this condition exists only because of three.js types + strict mode
            */ if (typeof jpeg === 'string') throw new Error('Invalid buffer, received [string], was expecting [ArrayBuffer]');
            const jpegBuffer = new Uint8Array(jpeg);
            let sdrJPEG;
            let gainMapJPEG;
            let metadata;
            try {
                const extractionResult = await extractGainmapFromJPEG(jpegBuffer);
                // gain map is successfully reconstructed
                sdrJPEG = extractionResult.sdr;
                gainMapJPEG = extractionResult.gainMap;
                metadata = extractionResult.metadata;
            } catch (e) {
                // render the SDR version if this is not a gainmap
                if (e instanceof XMPMetadataNotFoundError || e instanceof GainMapNotFoundError) {
                    console.warn("Failure to reconstruct an HDR image from ".concat(url, ": Gain map metadata not found in the file, HDRJPGLoader will render the SDR jpeg"));
                    metadata = {
                        gainMapMin: [
                            0,
                            0,
                            0
                        ],
                        gainMapMax: [
                            1,
                            1,
                            1
                        ],
                        gamma: [
                            1,
                            1,
                            1
                        ],
                        hdrCapacityMin: 0,
                        hdrCapacityMax: 1,
                        offsetHdr: [
                            0,
                            0,
                            0
                        ],
                        offsetSdr: [
                            0,
                            0,
                            0
                        ]
                    };
                    sdrJPEG = jpegBuffer;
                } else {
                    throw e;
                }
            }
            // solves #16
            try {
                await this.render(quadRenderer, metadata, sdrJPEG, gainMapJPEG);
            } catch (error) {
                this.manager.itemError(url);
                if (typeof onError === 'function') onError(error);
                quadRenderer.disposeOnDemandRenderer();
                return;
            }
            if (typeof onLoad === 'function') onLoad(quadRenderer);
            this.manager.itemEnd(url);
            quadRenderer.disposeOnDemandRenderer();
        }, onProgress, (error)=>{
            this.manager.itemError(url);
            if (typeof onError === 'function') onError(error);
        });
        return quadRenderer;
    }
}
;
}),
]);

//# sourceMappingURL=ce80c_834cec9f._.js.map