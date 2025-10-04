(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/controls/EventDispatcher.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventDispatcher",
    ()=>EventDispatcher
]);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
class EventDispatcher {
    /**
   * Adds a listener to an event type.
   * @param type The type of event to listen to.
   * @param listener The function that gets called when the event is fired.
   */ addEventListener(type, listener) {
        if (this._listeners === void 0) this._listeners = {};
        const listeners = this._listeners;
        if (listeners[type] === void 0) {
            listeners[type] = [];
        }
        if (listeners[type].indexOf(listener) === -1) {
            listeners[type].push(listener);
        }
    }
    /**
      * Checks if listener is added to an event type.
      * @param type The type of event to listen to.
      * @param listener The function that gets called when the event is fired.
      */ hasEventListener(type, listener) {
        if (this._listeners === void 0) return false;
        const listeners = this._listeners;
        return listeners[type] !== void 0 && listeners[type].indexOf(listener) !== -1;
    }
    /**
      * Removes a listener from an event type.
      * @param type The type of the listener that gets removed.
      * @param listener The listener function that gets removed.
      */ removeEventListener(type, listener) {
        if (this._listeners === void 0) return;
        const listeners = this._listeners;
        const listenerArray = listeners[type];
        if (listenerArray !== void 0) {
            const index = listenerArray.indexOf(listener);
            if (index !== -1) {
                listenerArray.splice(index, 1);
            }
        }
    }
    /**
      * Fire an event type.
      * @param event The event that gets fired.
      */ dispatchEvent(event) {
        if (this._listeners === void 0) return;
        const listeners = this._listeners;
        const listenerArray = listeners[event.type];
        if (listenerArray !== void 0) {
            event.target = this;
            const array = listenerArray.slice(0);
            for(let i = 0, l = array.length; i < l; i++){
                array[i].call(this, event);
            }
            event.target = null;
        }
    }
    constructor(){
        // not defined in @types/three
        __publicField(this, "_listeners");
    }
}
;
 //# sourceMappingURL=EventDispatcher.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/controls/OrbitControls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapControls",
    ()=>MapControls,
    "OrbitControls",
    ()=>OrbitControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/controls/EventDispatcher.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
;
const _ray = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Ray"]();
const _plane = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plane"]();
const TILT_LIMIT = Math.cos(70 * (Math.PI / 180));
const moduloWrapAround = (offset, capacity)=>(offset % capacity + capacity) % capacity;
class OrbitControls extends __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventDispatcher"] {
    constructor(object, domElement){
        super();
        __publicField(this, "object");
        __publicField(this, "domElement");
        // Set to false to disable this control
        __publicField(this, "enabled", true);
        // "target" sets the location of focus, where the object orbits around
        __publicField(this, "target", new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        // How far you can dolly in and out ( PerspectiveCamera only )
        __publicField(this, "minDistance", 0);
        __publicField(this, "maxDistance", Infinity);
        // How far you can zoom in and out ( OrthographicCamera only )
        __publicField(this, "minZoom", 0);
        __publicField(this, "maxZoom", Infinity);
        // How far you can orbit vertically, upper and lower limits.
        // Range is 0 to Math.PI radians.
        __publicField(this, "minPolarAngle", 0);
        // radians
        __publicField(this, "maxPolarAngle", Math.PI);
        // radians
        // How far you can orbit horizontally, upper and lower limits.
        // If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI )
        __publicField(this, "minAzimuthAngle", -Infinity);
        // radians
        __publicField(this, "maxAzimuthAngle", Infinity);
        // radians
        // Set to true to enable damping (inertia)
        // If damping is enabled, you must call controls.update() in your animation loop
        __publicField(this, "enableDamping", false);
        __publicField(this, "dampingFactor", 0.05);
        // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
        // Set to false to disable zooming
        __publicField(this, "enableZoom", true);
        __publicField(this, "zoomSpeed", 1);
        // Set to false to disable rotating
        __publicField(this, "enableRotate", true);
        __publicField(this, "rotateSpeed", 1);
        // Set to false to disable panning
        __publicField(this, "enablePan", true);
        __publicField(this, "panSpeed", 1);
        __publicField(this, "screenSpacePanning", true);
        // if false, pan orthogonal to world-space direction camera.up
        __publicField(this, "keyPanSpeed", 7);
        // pixels moved per arrow key push
        __publicField(this, "zoomToCursor", false);
        // Set to true to automatically rotate around the target
        // If auto-rotate is enabled, you must call controls.update() in your animation loop
        __publicField(this, "autoRotate", false);
        __publicField(this, "autoRotateSpeed", 2);
        // 30 seconds per orbit when fps is 60
        __publicField(this, "reverseOrbit", false);
        // true if you want to reverse the orbit to mouse drag from left to right = orbits left
        __publicField(this, "reverseHorizontalOrbit", false);
        // true if you want to reverse the horizontal orbit direction
        __publicField(this, "reverseVerticalOrbit", false);
        // true if you want to reverse the vertical orbit direction
        // The four arrow keys
        __publicField(this, "keys", {
            LEFT: "ArrowLeft",
            UP: "ArrowUp",
            RIGHT: "ArrowRight",
            BOTTOM: "ArrowDown"
        });
        // Mouse buttons
        __publicField(this, "mouseButtons", {
            LEFT: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].ROTATE,
            MIDDLE: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].DOLLY,
            RIGHT: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].PAN
        });
        // Touch fingers
        __publicField(this, "touches", {
            ONE: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOUCH"].ROTATE,
            TWO: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOUCH"].DOLLY_PAN
        });
        __publicField(this, "target0");
        __publicField(this, "position0");
        __publicField(this, "zoom0");
        // the target DOM element for key events
        __publicField(this, "_domElementKeyEvents", null);
        __publicField(this, "getPolarAngle");
        __publicField(this, "getAzimuthalAngle");
        __publicField(this, "setPolarAngle");
        __publicField(this, "setAzimuthalAngle");
        __publicField(this, "getDistance");
        // Not used in most scenarios, however they can be useful for specific use cases
        __publicField(this, "getZoomScale");
        __publicField(this, "listenToKeyEvents");
        __publicField(this, "stopListenToKeyEvents");
        __publicField(this, "saveState");
        __publicField(this, "reset");
        __publicField(this, "update");
        __publicField(this, "connect");
        __publicField(this, "dispose");
        // Dolly in programmatically
        __publicField(this, "dollyIn");
        // Dolly out programmatically
        __publicField(this, "dollyOut");
        // Get the current scale
        __publicField(this, "getScale");
        // Set the current scale (these are not used in most scenarios, however they can be useful for specific use cases)
        __publicField(this, "setScale");
        this.object = object;
        this.domElement = domElement;
        this.target0 = this.target.clone();
        this.position0 = this.object.position.clone();
        this.zoom0 = this.object.zoom;
        this.getPolarAngle = ()=>spherical.phi;
        this.getAzimuthalAngle = ()=>spherical.theta;
        this.setPolarAngle = (value)=>{
            let phi = moduloWrapAround(value, 2 * Math.PI);
            let currentPhi = spherical.phi;
            if (currentPhi < 0) currentPhi += 2 * Math.PI;
            if (phi < 0) phi += 2 * Math.PI;
            let phiDist = Math.abs(phi - currentPhi);
            if (2 * Math.PI - phiDist < phiDist) {
                if (phi < currentPhi) {
                    phi += 2 * Math.PI;
                } else {
                    currentPhi += 2 * Math.PI;
                }
            }
            sphericalDelta.phi = phi - currentPhi;
            scope.update();
        };
        this.setAzimuthalAngle = (value)=>{
            let theta = moduloWrapAround(value, 2 * Math.PI);
            let currentTheta = spherical.theta;
            if (currentTheta < 0) currentTheta += 2 * Math.PI;
            if (theta < 0) theta += 2 * Math.PI;
            let thetaDist = Math.abs(theta - currentTheta);
            if (2 * Math.PI - thetaDist < thetaDist) {
                if (theta < currentTheta) {
                    theta += 2 * Math.PI;
                } else {
                    currentTheta += 2 * Math.PI;
                }
            }
            sphericalDelta.theta = theta - currentTheta;
            scope.update();
        };
        this.getDistance = ()=>scope.object.position.distanceTo(scope.target);
        this.listenToKeyEvents = (domElement2)=>{
            domElement2.addEventListener("keydown", onKeyDown);
            this._domElementKeyEvents = domElement2;
        };
        this.stopListenToKeyEvents = ()=>{
            this._domElementKeyEvents.removeEventListener("keydown", onKeyDown);
            this._domElementKeyEvents = null;
        };
        this.saveState = ()=>{
            scope.target0.copy(scope.target);
            scope.position0.copy(scope.object.position);
            scope.zoom0 = scope.object.zoom;
        };
        this.reset = ()=>{
            scope.target.copy(scope.target0);
            scope.object.position.copy(scope.position0);
            scope.object.zoom = scope.zoom0;
            scope.object.updateProjectionMatrix();
            scope.dispatchEvent(changeEvent);
            scope.update();
            state = STATE.NONE;
        };
        this.update = (()=>{
            const offset = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            const up = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0);
            const quat = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]().setFromUnitVectors(object.up, up);
            const quatInverse = quat.clone().invert();
            const lastPosition = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            const lastQuaternion = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
            const twoPI = 2 * Math.PI;
            return function update() {
                const position = scope.object.position;
                quat.setFromUnitVectors(object.up, up);
                quatInverse.copy(quat).invert();
                offset.copy(position).sub(scope.target);
                offset.applyQuaternion(quat);
                spherical.setFromVector3(offset);
                if (scope.autoRotate && state === STATE.NONE) {
                    rotateLeft(getAutoRotationAngle());
                }
                if (scope.enableDamping) {
                    spherical.theta += sphericalDelta.theta * scope.dampingFactor;
                    spherical.phi += sphericalDelta.phi * scope.dampingFactor;
                } else {
                    spherical.theta += sphericalDelta.theta;
                    spherical.phi += sphericalDelta.phi;
                }
                let min = scope.minAzimuthAngle;
                let max = scope.maxAzimuthAngle;
                if (isFinite(min) && isFinite(max)) {
                    if (min < -Math.PI) min += twoPI;
                    else if (min > Math.PI) min -= twoPI;
                    if (max < -Math.PI) max += twoPI;
                    else if (max > Math.PI) max -= twoPI;
                    if (min <= max) {
                        spherical.theta = Math.max(min, Math.min(max, spherical.theta));
                    } else {
                        spherical.theta = spherical.theta > (min + max) / 2 ? Math.max(min, spherical.theta) : Math.min(max, spherical.theta);
                    }
                }
                spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));
                spherical.makeSafe();
                if (scope.enableDamping === true) {
                    scope.target.addScaledVector(panOffset, scope.dampingFactor);
                } else {
                    scope.target.add(panOffset);
                }
                if (scope.zoomToCursor && performCursorZoom || scope.object.isOrthographicCamera) {
                    spherical.radius = clampDistance(spherical.radius);
                } else {
                    spherical.radius = clampDistance(spherical.radius * scale);
                }
                offset.setFromSpherical(spherical);
                offset.applyQuaternion(quatInverse);
                position.copy(scope.target).add(offset);
                if (!scope.object.matrixAutoUpdate) scope.object.updateMatrix();
                scope.object.lookAt(scope.target);
                if (scope.enableDamping === true) {
                    sphericalDelta.theta *= 1 - scope.dampingFactor;
                    sphericalDelta.phi *= 1 - scope.dampingFactor;
                    panOffset.multiplyScalar(1 - scope.dampingFactor);
                } else {
                    sphericalDelta.set(0, 0, 0);
                    panOffset.set(0, 0, 0);
                }
                let zoomChanged = false;
                if (scope.zoomToCursor && performCursorZoom) {
                    let newRadius = null;
                    if (scope.object instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"] && scope.object.isPerspectiveCamera) {
                        const prevRadius = offset.length();
                        newRadius = clampDistance(prevRadius * scale);
                        const radiusDelta = prevRadius - newRadius;
                        scope.object.position.addScaledVector(dollyDirection, radiusDelta);
                        scope.object.updateMatrixWorld();
                    } else if (scope.object.isOrthographicCamera) {
                        const mouseBefore = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](mouse.x, mouse.y, 0);
                        mouseBefore.unproject(scope.object);
                        scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / scale));
                        scope.object.updateProjectionMatrix();
                        zoomChanged = true;
                        const mouseAfter = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](mouse.x, mouse.y, 0);
                        mouseAfter.unproject(scope.object);
                        scope.object.position.sub(mouseAfter).add(mouseBefore);
                        scope.object.updateMatrixWorld();
                        newRadius = offset.length();
                    } else {
                        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.");
                        scope.zoomToCursor = false;
                    }
                    if (newRadius !== null) {
                        if (scope.screenSpacePanning) {
                            scope.target.set(0, 0, -1).transformDirection(scope.object.matrix).multiplyScalar(newRadius).add(scope.object.position);
                        } else {
                            _ray.origin.copy(scope.object.position);
                            _ray.direction.set(0, 0, -1).transformDirection(scope.object.matrix);
                            if (Math.abs(scope.object.up.dot(_ray.direction)) < TILT_LIMIT) {
                                object.lookAt(scope.target);
                            } else {
                                _plane.setFromNormalAndCoplanarPoint(scope.object.up, scope.target);
                                _ray.intersectPlane(_plane, scope.target);
                            }
                        }
                    }
                } else if (scope.object instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"] && scope.object.isOrthographicCamera) {
                    zoomChanged = scale !== 1;
                    if (zoomChanged) {
                        scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / scale));
                        scope.object.updateProjectionMatrix();
                    }
                }
                scale = 1;
                performCursorZoom = false;
                if (zoomChanged || lastPosition.distanceToSquared(scope.object.position) > EPS || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {
                    scope.dispatchEvent(changeEvent);
                    lastPosition.copy(scope.object.position);
                    lastQuaternion.copy(scope.object.quaternion);
                    zoomChanged = false;
                    return true;
                }
                return false;
            };
        })();
        this.connect = (domElement2)=>{
            scope.domElement = domElement2;
            scope.domElement.style.touchAction = "none";
            scope.domElement.addEventListener("contextmenu", onContextMenu);
            scope.domElement.addEventListener("pointerdown", onPointerDown);
            scope.domElement.addEventListener("pointercancel", onPointerUp);
            scope.domElement.addEventListener("wheel", onMouseWheel);
        };
        this.dispose = ()=>{
            var _a, _b, _c, _d, _e, _f;
            if (scope.domElement) {
                scope.domElement.style.touchAction = "auto";
            }
            (_a = scope.domElement) == null ? void 0 : _a.removeEventListener("contextmenu", onContextMenu);
            (_b = scope.domElement) == null ? void 0 : _b.removeEventListener("pointerdown", onPointerDown);
            (_c = scope.domElement) == null ? void 0 : _c.removeEventListener("pointercancel", onPointerUp);
            (_d = scope.domElement) == null ? void 0 : _d.removeEventListener("wheel", onMouseWheel);
            (_e = scope.domElement) == null ? void 0 : _e.ownerDocument.removeEventListener("pointermove", onPointerMove);
            (_f = scope.domElement) == null ? void 0 : _f.ownerDocument.removeEventListener("pointerup", onPointerUp);
            if (scope._domElementKeyEvents !== null) {
                scope._domElementKeyEvents.removeEventListener("keydown", onKeyDown);
            }
        };
        const scope = this;
        const changeEvent = {
            type: "change"
        };
        const startEvent = {
            type: "start"
        };
        const endEvent = {
            type: "end"
        };
        const STATE = {
            NONE: -1,
            ROTATE: 0,
            DOLLY: 1,
            PAN: 2,
            TOUCH_ROTATE: 3,
            TOUCH_PAN: 4,
            TOUCH_DOLLY_PAN: 5,
            TOUCH_DOLLY_ROTATE: 6
        };
        let state = STATE.NONE;
        const EPS = 1e-6;
        const spherical = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spherical"]();
        const sphericalDelta = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spherical"]();
        let scale = 1;
        const panOffset = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        const rotateStart = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        const rotateEnd = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        const rotateDelta = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        const panStart = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        const panEnd = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        const panDelta = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        const dollyStart = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        const dollyEnd = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        const dollyDelta = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        const dollyDirection = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        const mouse = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        let performCursorZoom = false;
        const pointers = [];
        const pointerPositions = {};
        function getAutoRotationAngle() {
            return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
        }
        function getZoomScale() {
            return Math.pow(0.95, scope.zoomSpeed);
        }
        function rotateLeft(angle) {
            if (scope.reverseOrbit || scope.reverseHorizontalOrbit) {
                sphericalDelta.theta += angle;
            } else {
                sphericalDelta.theta -= angle;
            }
        }
        function rotateUp(angle) {
            if (scope.reverseOrbit || scope.reverseVerticalOrbit) {
                sphericalDelta.phi += angle;
            } else {
                sphericalDelta.phi -= angle;
            }
        }
        const panLeft = (()=>{
            const v = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            return function panLeft2(distance, objectMatrix) {
                v.setFromMatrixColumn(objectMatrix, 0);
                v.multiplyScalar(-distance);
                panOffset.add(v);
            };
        })();
        const panUp = (()=>{
            const v = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            return function panUp2(distance, objectMatrix) {
                if (scope.screenSpacePanning === true) {
                    v.setFromMatrixColumn(objectMatrix, 1);
                } else {
                    v.setFromMatrixColumn(objectMatrix, 0);
                    v.crossVectors(scope.object.up, v);
                }
                v.multiplyScalar(distance);
                panOffset.add(v);
            };
        })();
        const pan = (()=>{
            const offset = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            return function pan2(deltaX, deltaY) {
                const element = scope.domElement;
                if (element && scope.object instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"] && scope.object.isPerspectiveCamera) {
                    const position = scope.object.position;
                    offset.copy(position).sub(scope.target);
                    let targetDistance = offset.length();
                    targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180);
                    panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
                    panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);
                } else if (element && scope.object instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"] && scope.object.isOrthographicCamera) {
                    panLeft(deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth, scope.object.matrix);
                    panUp(deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight, scope.object.matrix);
                } else {
                    console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");
                    scope.enablePan = false;
                }
            };
        })();
        function setScale(newScale) {
            if (scope.object instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"] && scope.object.isPerspectiveCamera || scope.object instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"] && scope.object.isOrthographicCamera) {
                scale = newScale;
            } else {
                console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
                scope.enableZoom = false;
            }
        }
        function dollyOut(dollyScale) {
            setScale(scale / dollyScale);
        }
        function dollyIn(dollyScale) {
            setScale(scale * dollyScale);
        }
        function updateMouseParameters(event) {
            if (!scope.zoomToCursor || !scope.domElement) {
                return;
            }
            performCursorZoom = true;
            const rect = scope.domElement.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const w = rect.width;
            const h = rect.height;
            mouse.x = x / w * 2 - 1;
            mouse.y = -(y / h) * 2 + 1;
            dollyDirection.set(mouse.x, mouse.y, 1).unproject(scope.object).sub(scope.object.position).normalize();
        }
        function clampDistance(dist) {
            return Math.max(scope.minDistance, Math.min(scope.maxDistance, dist));
        }
        function handleMouseDownRotate(event) {
            rotateStart.set(event.clientX, event.clientY);
        }
        function handleMouseDownDolly(event) {
            updateMouseParameters(event);
            dollyStart.set(event.clientX, event.clientY);
        }
        function handleMouseDownPan(event) {
            panStart.set(event.clientX, event.clientY);
        }
        function handleMouseMoveRotate(event) {
            rotateEnd.set(event.clientX, event.clientY);
            rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
            const element = scope.domElement;
            if (element) {
                rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight);
                rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
            }
            rotateStart.copy(rotateEnd);
            scope.update();
        }
        function handleMouseMoveDolly(event) {
            dollyEnd.set(event.clientX, event.clientY);
            dollyDelta.subVectors(dollyEnd, dollyStart);
            if (dollyDelta.y > 0) {
                dollyOut(getZoomScale());
            } else if (dollyDelta.y < 0) {
                dollyIn(getZoomScale());
            }
            dollyStart.copy(dollyEnd);
            scope.update();
        }
        function handleMouseMovePan(event) {
            panEnd.set(event.clientX, event.clientY);
            panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
            pan(panDelta.x, panDelta.y);
            panStart.copy(panEnd);
            scope.update();
        }
        function handleMouseWheel(event) {
            updateMouseParameters(event);
            if (event.deltaY < 0) {
                dollyIn(getZoomScale());
            } else if (event.deltaY > 0) {
                dollyOut(getZoomScale());
            }
            scope.update();
        }
        function handleKeyDown(event) {
            let needsUpdate = false;
            switch(event.code){
                case scope.keys.UP:
                    pan(0, scope.keyPanSpeed);
                    needsUpdate = true;
                    break;
                case scope.keys.BOTTOM:
                    pan(0, -scope.keyPanSpeed);
                    needsUpdate = true;
                    break;
                case scope.keys.LEFT:
                    pan(scope.keyPanSpeed, 0);
                    needsUpdate = true;
                    break;
                case scope.keys.RIGHT:
                    pan(-scope.keyPanSpeed, 0);
                    needsUpdate = true;
                    break;
            }
            if (needsUpdate) {
                event.preventDefault();
                scope.update();
            }
        }
        function handleTouchStartRotate() {
            if (pointers.length == 1) {
                rotateStart.set(pointers[0].pageX, pointers[0].pageY);
            } else {
                const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);
                const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);
                rotateStart.set(x, y);
            }
        }
        function handleTouchStartPan() {
            if (pointers.length == 1) {
                panStart.set(pointers[0].pageX, pointers[0].pageY);
            } else {
                const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);
                const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);
                panStart.set(x, y);
            }
        }
        function handleTouchStartDolly() {
            const dx = pointers[0].pageX - pointers[1].pageX;
            const dy = pointers[0].pageY - pointers[1].pageY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            dollyStart.set(0, distance);
        }
        function handleTouchStartDollyPan() {
            if (scope.enableZoom) handleTouchStartDolly();
            if (scope.enablePan) handleTouchStartPan();
        }
        function handleTouchStartDollyRotate() {
            if (scope.enableZoom) handleTouchStartDolly();
            if (scope.enableRotate) handleTouchStartRotate();
        }
        function handleTouchMoveRotate(event) {
            if (pointers.length == 1) {
                rotateEnd.set(event.pageX, event.pageY);
            } else {
                const position = getSecondPointerPosition(event);
                const x = 0.5 * (event.pageX + position.x);
                const y = 0.5 * (event.pageY + position.y);
                rotateEnd.set(x, y);
            }
            rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
            const element = scope.domElement;
            if (element) {
                rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight);
                rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
            }
            rotateStart.copy(rotateEnd);
        }
        function handleTouchMovePan(event) {
            if (pointers.length == 1) {
                panEnd.set(event.pageX, event.pageY);
            } else {
                const position = getSecondPointerPosition(event);
                const x = 0.5 * (event.pageX + position.x);
                const y = 0.5 * (event.pageY + position.y);
                panEnd.set(x, y);
            }
            panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
            pan(panDelta.x, panDelta.y);
            panStart.copy(panEnd);
        }
        function handleTouchMoveDolly(event) {
            const position = getSecondPointerPosition(event);
            const dx = event.pageX - position.x;
            const dy = event.pageY - position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            dollyEnd.set(0, distance);
            dollyDelta.set(0, Math.pow(dollyEnd.y / dollyStart.y, scope.zoomSpeed));
            dollyOut(dollyDelta.y);
            dollyStart.copy(dollyEnd);
        }
        function handleTouchMoveDollyPan(event) {
            if (scope.enableZoom) handleTouchMoveDolly(event);
            if (scope.enablePan) handleTouchMovePan(event);
        }
        function handleTouchMoveDollyRotate(event) {
            if (scope.enableZoom) handleTouchMoveDolly(event);
            if (scope.enableRotate) handleTouchMoveRotate(event);
        }
        function onPointerDown(event) {
            var _a, _b;
            if (scope.enabled === false) return;
            if (pointers.length === 0) {
                (_a = scope.domElement) == null ? void 0 : _a.ownerDocument.addEventListener("pointermove", onPointerMove);
                (_b = scope.domElement) == null ? void 0 : _b.ownerDocument.addEventListener("pointerup", onPointerUp);
            }
            addPointer(event);
            if (event.pointerType === "touch") {
                onTouchStart(event);
            } else {
                onMouseDown(event);
            }
        }
        function onPointerMove(event) {
            if (scope.enabled === false) return;
            if (event.pointerType === "touch") {
                onTouchMove(event);
            } else {
                onMouseMove(event);
            }
        }
        function onPointerUp(event) {
            var _a, _b, _c;
            removePointer(event);
            if (pointers.length === 0) {
                (_a = scope.domElement) == null ? void 0 : _a.releasePointerCapture(event.pointerId);
                (_b = scope.domElement) == null ? void 0 : _b.ownerDocument.removeEventListener("pointermove", onPointerMove);
                (_c = scope.domElement) == null ? void 0 : _c.ownerDocument.removeEventListener("pointerup", onPointerUp);
            }
            scope.dispatchEvent(endEvent);
            state = STATE.NONE;
        }
        function onMouseDown(event) {
            let mouseAction;
            switch(event.button){
                case 0:
                    mouseAction = scope.mouseButtons.LEFT;
                    break;
                case 1:
                    mouseAction = scope.mouseButtons.MIDDLE;
                    break;
                case 2:
                    mouseAction = scope.mouseButtons.RIGHT;
                    break;
                default:
                    mouseAction = -1;
            }
            switch(mouseAction){
                case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].DOLLY:
                    if (scope.enableZoom === false) return;
                    handleMouseDownDolly(event);
                    state = STATE.DOLLY;
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].ROTATE:
                    if (event.ctrlKey || event.metaKey || event.shiftKey) {
                        if (scope.enablePan === false) return;
                        handleMouseDownPan(event);
                        state = STATE.PAN;
                    } else {
                        if (scope.enableRotate === false) return;
                        handleMouseDownRotate(event);
                        state = STATE.ROTATE;
                    }
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].PAN:
                    if (event.ctrlKey || event.metaKey || event.shiftKey) {
                        if (scope.enableRotate === false) return;
                        handleMouseDownRotate(event);
                        state = STATE.ROTATE;
                    } else {
                        if (scope.enablePan === false) return;
                        handleMouseDownPan(event);
                        state = STATE.PAN;
                    }
                    break;
                default:
                    state = STATE.NONE;
            }
            if (state !== STATE.NONE) {
                scope.dispatchEvent(startEvent);
            }
        }
        function onMouseMove(event) {
            if (scope.enabled === false) return;
            switch(state){
                case STATE.ROTATE:
                    if (scope.enableRotate === false) return;
                    handleMouseMoveRotate(event);
                    break;
                case STATE.DOLLY:
                    if (scope.enableZoom === false) return;
                    handleMouseMoveDolly(event);
                    break;
                case STATE.PAN:
                    if (scope.enablePan === false) return;
                    handleMouseMovePan(event);
                    break;
            }
        }
        function onMouseWheel(event) {
            if (scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE && state !== STATE.ROTATE) {
                return;
            }
            event.preventDefault();
            scope.dispatchEvent(startEvent);
            handleMouseWheel(event);
            scope.dispatchEvent(endEvent);
        }
        function onKeyDown(event) {
            if (scope.enabled === false || scope.enablePan === false) return;
            handleKeyDown(event);
        }
        function onTouchStart(event) {
            trackPointer(event);
            switch(pointers.length){
                case 1:
                    switch(scope.touches.ONE){
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOUCH"].ROTATE:
                            if (scope.enableRotate === false) return;
                            handleTouchStartRotate();
                            state = STATE.TOUCH_ROTATE;
                            break;
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOUCH"].PAN:
                            if (scope.enablePan === false) return;
                            handleTouchStartPan();
                            state = STATE.TOUCH_PAN;
                            break;
                        default:
                            state = STATE.NONE;
                    }
                    break;
                case 2:
                    switch(scope.touches.TWO){
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOUCH"].DOLLY_PAN:
                            if (scope.enableZoom === false && scope.enablePan === false) return;
                            handleTouchStartDollyPan();
                            state = STATE.TOUCH_DOLLY_PAN;
                            break;
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOUCH"].DOLLY_ROTATE:
                            if (scope.enableZoom === false && scope.enableRotate === false) return;
                            handleTouchStartDollyRotate();
                            state = STATE.TOUCH_DOLLY_ROTATE;
                            break;
                        default:
                            state = STATE.NONE;
                    }
                    break;
                default:
                    state = STATE.NONE;
            }
            if (state !== STATE.NONE) {
                scope.dispatchEvent(startEvent);
            }
        }
        function onTouchMove(event) {
            trackPointer(event);
            switch(state){
                case STATE.TOUCH_ROTATE:
                    if (scope.enableRotate === false) return;
                    handleTouchMoveRotate(event);
                    scope.update();
                    break;
                case STATE.TOUCH_PAN:
                    if (scope.enablePan === false) return;
                    handleTouchMovePan(event);
                    scope.update();
                    break;
                case STATE.TOUCH_DOLLY_PAN:
                    if (scope.enableZoom === false && scope.enablePan === false) return;
                    handleTouchMoveDollyPan(event);
                    scope.update();
                    break;
                case STATE.TOUCH_DOLLY_ROTATE:
                    if (scope.enableZoom === false && scope.enableRotate === false) return;
                    handleTouchMoveDollyRotate(event);
                    scope.update();
                    break;
                default:
                    state = STATE.NONE;
            }
        }
        function onContextMenu(event) {
            if (scope.enabled === false) return;
            event.preventDefault();
        }
        function addPointer(event) {
            pointers.push(event);
        }
        function removePointer(event) {
            delete pointerPositions[event.pointerId];
            for(let i = 0; i < pointers.length; i++){
                if (pointers[i].pointerId == event.pointerId) {
                    pointers.splice(i, 1);
                    return;
                }
            }
        }
        function trackPointer(event) {
            let position = pointerPositions[event.pointerId];
            if (position === void 0) {
                position = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
                pointerPositions[event.pointerId] = position;
            }
            position.set(event.pageX, event.pageY);
        }
        function getSecondPointerPosition(event) {
            const pointer = event.pointerId === pointers[0].pointerId ? pointers[1] : pointers[0];
            return pointerPositions[pointer.pointerId];
        }
        this.dollyIn = function() {
            let dollyScale = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getZoomScale();
            dollyIn(dollyScale);
            scope.update();
        };
        this.dollyOut = function() {
            let dollyScale = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getZoomScale();
            dollyOut(dollyScale);
            scope.update();
        };
        this.getScale = ()=>{
            return scale;
        };
        this.setScale = (newScale)=>{
            setScale(newScale);
            scope.update();
        };
        this.getZoomScale = ()=>{
            return getZoomScale();
        };
        if (domElement !== void 0) this.connect(domElement);
        this.update();
    }
}
class MapControls extends OrbitControls {
    constructor(object, domElement){
        super(object, domElement);
        this.screenSpacePanning = false;
        this.mouseButtons.LEFT = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].PAN;
        this.mouseButtons.RIGHT = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].ROTATE;
        this.touches.ONE = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOUCH"].PAN;
        this.touches.TWO = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOUCH"].DOLLY_ROTATE;
    }
}
;
 //# sourceMappingURL=OrbitControls.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/types/helpers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getWithKey",
    ()=>getWithKey
]);
const getWithKey = (obj, key)=>obj[key];
;
 //# sourceMappingURL=helpers.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/utils/BufferGeometryUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computeMorphedAttributes",
    ()=>computeMorphedAttributes,
    "estimateBytesUsed",
    ()=>estimateBytesUsed,
    "interleaveAttributes",
    ()=>interleaveAttributes,
    "mergeBufferAttributes",
    ()=>mergeBufferAttributes,
    "mergeBufferGeometries",
    ()=>mergeBufferGeometries,
    "mergeVertices",
    ()=>mergeVertices,
    "toCreasedNormals",
    ()=>toCreasedNormals,
    "toTrianglesDrawMode",
    ()=>toTrianglesDrawMode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$types$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/types/helpers.js [app-client] (ecmascript)");
;
;
const mergeBufferGeometries = (geometries, useGroups)=>{
    const isIndexed = geometries[0].index !== null;
    const attributesUsed = new Set(Object.keys(geometries[0].attributes));
    const morphAttributesUsed = new Set(Object.keys(geometries[0].morphAttributes));
    const attributes = {};
    const morphAttributes = {};
    const morphTargetsRelative = geometries[0].morphTargetsRelative;
    const mergedGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
    let offset = 0;
    geometries.forEach((geom, i)=>{
        let attributesCount = 0;
        if (isIndexed !== (geom.index !== null)) {
            console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index " + i + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.");
            return null;
        }
        for(let name in geom.attributes){
            if (!attributesUsed.has(name)) {
                console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index " + i + '. All geometries must have compatible attributes; make sure "' + name + '" attribute exists among all geometries, or in none of them.');
                return null;
            }
            if (attributes[name] === void 0) {
                attributes[name] = [];
            }
            attributes[name].push(geom.attributes[name]);
            attributesCount++;
        }
        if (attributesCount !== attributesUsed.size) {
            console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index " + i + ". Make sure all geometries have the same number of attributes.");
            return null;
        }
        if (morphTargetsRelative !== geom.morphTargetsRelative) {
            console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index " + i + ". .morphTargetsRelative must be consistent throughout all geometries.");
            return null;
        }
        for(let name in geom.morphAttributes){
            if (!morphAttributesUsed.has(name)) {
                console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index " + i + ".  .morphAttributes must be consistent throughout all geometries.");
                return null;
            }
            if (morphAttributes[name] === void 0) morphAttributes[name] = [];
            morphAttributes[name].push(geom.morphAttributes[name]);
        }
        mergedGeometry.userData.mergedUserData = mergedGeometry.userData.mergedUserData || [];
        mergedGeometry.userData.mergedUserData.push(geom.userData);
        if (useGroups) {
            let count;
            if (geom.index) {
                count = geom.index.count;
            } else if (geom.attributes.position !== void 0) {
                count = geom.attributes.position.count;
            } else {
                console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index " + i + ". The geometry must have either an index or a position attribute");
                return null;
            }
            mergedGeometry.addGroup(offset, count, i);
            offset += count;
        }
    });
    if (isIndexed) {
        let indexOffset = 0;
        const mergedIndex = [];
        geometries.forEach((geom)=>{
            const index = geom.index;
            for(let j = 0; j < index.count; ++j){
                mergedIndex.push(index.getX(j) + indexOffset);
            }
            indexOffset += geom.attributes.position.count;
        });
        mergedGeometry.setIndex(mergedIndex);
    }
    for(let name in attributes){
        const mergedAttribute = mergeBufferAttributes(attributes[name]);
        if (!mergedAttribute) {
            console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the " + name + " attribute.");
            return null;
        }
        mergedGeometry.setAttribute(name, mergedAttribute);
    }
    for(let name in morphAttributes){
        const numMorphTargets = morphAttributes[name][0].length;
        if (numMorphTargets === 0) break;
        mergedGeometry.morphAttributes = mergedGeometry.morphAttributes || {};
        mergedGeometry.morphAttributes[name] = [];
        for(let i = 0; i < numMorphTargets; ++i){
            const morphAttributesToMerge = [];
            for(let j = 0; j < morphAttributes[name].length; ++j){
                morphAttributesToMerge.push(morphAttributes[name][j][i]);
            }
            const mergedMorphAttribute = mergeBufferAttributes(morphAttributesToMerge);
            if (!mergedMorphAttribute) {
                console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the " + name + " morphAttribute.");
                return null;
            }
            mergedGeometry.morphAttributes[name].push(mergedMorphAttribute);
        }
    }
    return mergedGeometry;
};
const mergeBufferAttributes = (attributes)=>{
    let TypedArray = void 0;
    let itemSize = void 0;
    let normalized = void 0;
    let arrayLength = 0;
    attributes.forEach((attr)=>{
        if (TypedArray === void 0) {
            TypedArray = attr.array.constructor;
        }
        if (TypedArray !== attr.array.constructor) {
            console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.");
            return null;
        }
        if (itemSize === void 0) itemSize = attr.itemSize;
        if (itemSize !== attr.itemSize) {
            console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.");
            return null;
        }
        if (normalized === void 0) normalized = attr.normalized;
        if (normalized !== attr.normalized) {
            console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.");
            return null;
        }
        arrayLength += attr.array.length;
    });
    if (TypedArray && itemSize) {
        const array = new TypedArray(arrayLength);
        let offset = 0;
        attributes.forEach((attr)=>{
            array.set(attr.array, offset);
            offset += attr.array.length;
        });
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](array, itemSize, normalized);
    }
};
const interleaveAttributes = (attributes)=>{
    let TypedArray = void 0;
    let arrayLength = 0;
    let stride = 0;
    for(let i = 0, l = attributes.length; i < l; ++i){
        const attribute = attributes[i];
        if (TypedArray === void 0) TypedArray = attribute.array.constructor;
        if (TypedArray !== attribute.array.constructor) {
            console.error("AttributeBuffers of different types cannot be interleaved");
            return null;
        }
        arrayLength += attribute.array.length;
        stride += attribute.itemSize;
    }
    const interleavedBuffer = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterleavedBuffer"](new TypedArray(arrayLength), stride);
    let offset = 0;
    const res = [];
    const getters = [
        "getX",
        "getY",
        "getZ",
        "getW"
    ];
    const setters = [
        "setX",
        "setY",
        "setZ",
        "setW"
    ];
    for(let j = 0, l = attributes.length; j < l; j++){
        const attribute = attributes[j];
        const itemSize = attribute.itemSize;
        const count = attribute.count;
        const iba = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterleavedBufferAttribute"](interleavedBuffer, itemSize, offset, attribute.normalized);
        res.push(iba);
        offset += itemSize;
        for(let c = 0; c < count; c++){
            for(let k = 0; k < itemSize; k++){
                const set = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$types$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWithKey"])(iba, setters[k]);
                const get = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$types$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWithKey"])(attribute, getters[k]);
                set(c, get(c));
            }
        }
    }
    return res;
};
function estimateBytesUsed(geometry) {
    let mem = 0;
    for(let name in geometry.attributes){
        const attr = geometry.getAttribute(name);
        mem += attr.count * attr.itemSize * attr.array.BYTES_PER_ELEMENT;
    }
    const indices = geometry.getIndex();
    mem += indices ? indices.count * indices.itemSize * indices.array.BYTES_PER_ELEMENT : 0;
    return mem;
}
function mergeVertices(geometry) {
    let tolerance = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e-4;
    tolerance = Math.max(tolerance, Number.EPSILON);
    const hashToIndex = {};
    const indices = geometry.getIndex();
    const positions = geometry.getAttribute("position");
    const vertexCount = indices ? indices.count : positions.count;
    let nextIndex = 0;
    const attributeNames = Object.keys(geometry.attributes);
    const attrArrays = {};
    const morphAttrsArrays = {};
    const newIndices = [];
    const getters = [
        "getX",
        "getY",
        "getZ",
        "getW"
    ];
    for(let i = 0, l = attributeNames.length; i < l; i++){
        const name = attributeNames[i];
        attrArrays[name] = [];
        const morphAttr = geometry.morphAttributes[name];
        if (morphAttr) {
            morphAttrsArrays[name] = new Array(morphAttr.length).fill(0).map(()=>[]);
        }
    }
    const decimalShift = Math.log10(1 / tolerance);
    const shiftMultiplier = Math.pow(10, decimalShift);
    for(let i = 0; i < vertexCount; i++){
        const index = indices ? indices.getX(i) : i;
        let hash = "";
        for(let j = 0, l = attributeNames.length; j < l; j++){
            const name = attributeNames[j];
            const attribute = geometry.getAttribute(name);
            const itemSize = attribute.itemSize;
            for(let k = 0; k < itemSize; k++){
                hash += "".concat(~~(attribute[getters[k]](index) * shiftMultiplier), ",");
            }
        }
        if (hash in hashToIndex) {
            newIndices.push(hashToIndex[hash]);
        } else {
            for(let j = 0, l = attributeNames.length; j < l; j++){
                const name = attributeNames[j];
                const attribute = geometry.getAttribute(name);
                const morphAttr = geometry.morphAttributes[name];
                const itemSize = attribute.itemSize;
                const newarray = attrArrays[name];
                const newMorphArrays = morphAttrsArrays[name];
                for(let k = 0; k < itemSize; k++){
                    const getterFunc = getters[k];
                    newarray.push(attribute[getterFunc](index));
                    if (morphAttr) {
                        for(let m = 0, ml = morphAttr.length; m < ml; m++){
                            newMorphArrays[m].push(morphAttr[m][getterFunc](index));
                        }
                    }
                }
            }
            hashToIndex[hash] = nextIndex;
            newIndices.push(nextIndex);
            nextIndex++;
        }
    }
    const result = geometry.clone();
    for(let i = 0, l = attributeNames.length; i < l; i++){
        const name = attributeNames[i];
        const oldAttribute = geometry.getAttribute(name);
        const buffer = new oldAttribute.array.constructor(attrArrays[name]);
        const attribute = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](buffer, oldAttribute.itemSize, oldAttribute.normalized);
        result.setAttribute(name, attribute);
        if (name in morphAttrsArrays) {
            for(let j = 0; j < morphAttrsArrays[name].length; j++){
                const oldMorphAttribute = geometry.morphAttributes[name][j];
                const buffer2 = new oldMorphAttribute.array.constructor(morphAttrsArrays[name][j]);
                const morphAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](buffer2, oldMorphAttribute.itemSize, oldMorphAttribute.normalized);
                result.morphAttributes[name][j] = morphAttribute;
            }
        }
    }
    result.setIndex(newIndices);
    return result;
}
function toTrianglesDrawMode(geometry, drawMode) {
    if (drawMode === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrianglesDrawMode"]) {
        console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.");
        return geometry;
    }
    if (drawMode === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TriangleFanDrawMode"] || drawMode === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TriangleStripDrawMode"]) {
        let index = geometry.getIndex();
        if (index === null) {
            const indices = [];
            const position = geometry.getAttribute("position");
            if (position !== void 0) {
                for(let i = 0; i < position.count; i++){
                    indices.push(i);
                }
                geometry.setIndex(indices);
                index = geometry.getIndex();
            } else {
                console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.");
                return geometry;
            }
        }
        const numberOfTriangles = index.count - 2;
        const newIndices = [];
        if (index) {
            if (drawMode === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TriangleFanDrawMode"]) {
                for(let i = 1; i <= numberOfTriangles; i++){
                    newIndices.push(index.getX(0));
                    newIndices.push(index.getX(i));
                    newIndices.push(index.getX(i + 1));
                }
            } else {
                for(let i = 0; i < numberOfTriangles; i++){
                    if (i % 2 === 0) {
                        newIndices.push(index.getX(i));
                        newIndices.push(index.getX(i + 1));
                        newIndices.push(index.getX(i + 2));
                    } else {
                        newIndices.push(index.getX(i + 2));
                        newIndices.push(index.getX(i + 1));
                        newIndices.push(index.getX(i));
                    }
                }
            }
        }
        if (newIndices.length / 3 !== numberOfTriangles) {
            console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
        }
        const newGeometry = geometry.clone();
        newGeometry.setIndex(newIndices);
        newGeometry.clearGroups();
        return newGeometry;
    } else {
        console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", drawMode);
        return geometry;
    }
}
function computeMorphedAttributes(object) {
    if (object.geometry.isBufferGeometry !== true) {
        console.error("THREE.BufferGeometryUtils: Geometry is not of type BufferGeometry.");
        return null;
    }
    const _vA = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const _vB = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const _vC = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const _tempA = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const _tempB = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const _tempC = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const _morphA = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const _morphB = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const _morphC = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    function _calculateMorphedAttributeData(object2, material2, attribute, morphAttribute, morphTargetsRelative2, a2, b2, c2, modifiedAttributeArray) {
        _vA.fromBufferAttribute(attribute, a2);
        _vB.fromBufferAttribute(attribute, b2);
        _vC.fromBufferAttribute(attribute, c2);
        const morphInfluences = object2.morphTargetInfluences;
        if (// @ts-ignore
        material2.morphTargets && morphAttribute && morphInfluences) {
            _morphA.set(0, 0, 0);
            _morphB.set(0, 0, 0);
            _morphC.set(0, 0, 0);
            for(let i2 = 0, il2 = morphAttribute.length; i2 < il2; i2++){
                const influence = morphInfluences[i2];
                const morph = morphAttribute[i2];
                if (influence === 0) continue;
                _tempA.fromBufferAttribute(morph, a2);
                _tempB.fromBufferAttribute(morph, b2);
                _tempC.fromBufferAttribute(morph, c2);
                if (morphTargetsRelative2) {
                    _morphA.addScaledVector(_tempA, influence);
                    _morphB.addScaledVector(_tempB, influence);
                    _morphC.addScaledVector(_tempC, influence);
                } else {
                    _morphA.addScaledVector(_tempA.sub(_vA), influence);
                    _morphB.addScaledVector(_tempB.sub(_vB), influence);
                    _morphC.addScaledVector(_tempC.sub(_vC), influence);
                }
            }
            _vA.add(_morphA);
            _vB.add(_morphB);
            _vC.add(_morphC);
        }
        if (object2.isSkinnedMesh) {
            object2.boneTransform(a2, _vA);
            object2.boneTransform(b2, _vB);
            object2.boneTransform(c2, _vC);
        }
        modifiedAttributeArray[a2 * 3 + 0] = _vA.x;
        modifiedAttributeArray[a2 * 3 + 1] = _vA.y;
        modifiedAttributeArray[a2 * 3 + 2] = _vA.z;
        modifiedAttributeArray[b2 * 3 + 0] = _vB.x;
        modifiedAttributeArray[b2 * 3 + 1] = _vB.y;
        modifiedAttributeArray[b2 * 3 + 2] = _vB.z;
        modifiedAttributeArray[c2 * 3 + 0] = _vC.x;
        modifiedAttributeArray[c2 * 3 + 1] = _vC.y;
        modifiedAttributeArray[c2 * 3 + 2] = _vC.z;
    }
    const geometry = object.geometry;
    const material = object.material;
    let a, b, c;
    const index = geometry.index;
    const positionAttribute = geometry.attributes.position;
    const morphPosition = geometry.morphAttributes.position;
    const morphTargetsRelative = geometry.morphTargetsRelative;
    const normalAttribute = geometry.attributes.normal;
    const morphNormal = geometry.morphAttributes.position;
    const groups = geometry.groups;
    const drawRange = geometry.drawRange;
    let i, j, il, jl;
    let group, groupMaterial;
    let start, end;
    const modifiedPosition = new Float32Array(positionAttribute.count * positionAttribute.itemSize);
    const modifiedNormal = new Float32Array(normalAttribute.count * normalAttribute.itemSize);
    if (index !== null) {
        if (Array.isArray(material)) {
            for(i = 0, il = groups.length; i < il; i++){
                group = groups[i];
                groupMaterial = material[group.materialIndex];
                start = Math.max(group.start, drawRange.start);
                end = Math.min(group.start + group.count, drawRange.start + drawRange.count);
                for(j = start, jl = end; j < jl; j += 3){
                    a = index.getX(j);
                    b = index.getX(j + 1);
                    c = index.getX(j + 2);
                    _calculateMorphedAttributeData(object, groupMaterial, positionAttribute, morphPosition, morphTargetsRelative, a, b, c, modifiedPosition);
                    _calculateMorphedAttributeData(object, groupMaterial, normalAttribute, morphNormal, morphTargetsRelative, a, b, c, modifiedNormal);
                }
            }
        } else {
            start = Math.max(0, drawRange.start);
            end = Math.min(index.count, drawRange.start + drawRange.count);
            for(i = start, il = end; i < il; i += 3){
                a = index.getX(i);
                b = index.getX(i + 1);
                c = index.getX(i + 2);
                _calculateMorphedAttributeData(object, material, positionAttribute, morphPosition, morphTargetsRelative, a, b, c, modifiedPosition);
                _calculateMorphedAttributeData(object, material, normalAttribute, morphNormal, morphTargetsRelative, a, b, c, modifiedNormal);
            }
        }
    } else if (positionAttribute !== void 0) {
        if (Array.isArray(material)) {
            for(i = 0, il = groups.length; i < il; i++){
                group = groups[i];
                groupMaterial = material[group.materialIndex];
                start = Math.max(group.start, drawRange.start);
                end = Math.min(group.start + group.count, drawRange.start + drawRange.count);
                for(j = start, jl = end; j < jl; j += 3){
                    a = j;
                    b = j + 1;
                    c = j + 2;
                    _calculateMorphedAttributeData(object, groupMaterial, positionAttribute, morphPosition, morphTargetsRelative, a, b, c, modifiedPosition);
                    _calculateMorphedAttributeData(object, groupMaterial, normalAttribute, morphNormal, morphTargetsRelative, a, b, c, modifiedNormal);
                }
            }
        } else {
            start = Math.max(0, drawRange.start);
            end = Math.min(positionAttribute.count, drawRange.start + drawRange.count);
            for(i = start, il = end; i < il; i += 3){
                a = i;
                b = i + 1;
                c = i + 2;
                _calculateMorphedAttributeData(object, material, positionAttribute, morphPosition, morphTargetsRelative, a, b, c, modifiedPosition);
                _calculateMorphedAttributeData(object, material, normalAttribute, morphNormal, morphTargetsRelative, a, b, c, modifiedNormal);
            }
        }
    }
    const morphedPositionAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](modifiedPosition, 3);
    const morphedNormalAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](modifiedNormal, 3);
    return {
        positionAttribute,
        normalAttribute,
        morphedPositionAttribute,
        morphedNormalAttribute
    };
}
function toCreasedNormals(geometry) {
    let creaseAngle = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Math.PI / 3;
    const creaseDot = Math.cos(creaseAngle);
    const hashMultiplier = (1 + 1e-10) * 100;
    const verts = [
        new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
        new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
        new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]()
    ];
    const tempVec1 = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const tempVec2 = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const tempNorm = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const tempNorm2 = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    function hashVertex(v) {
        const x = ~~(v.x * hashMultiplier);
        const y = ~~(v.y * hashMultiplier);
        const z = ~~(v.z * hashMultiplier);
        return "".concat(x, ",").concat(y, ",").concat(z);
    }
    const resultGeometry = geometry.index ? geometry.toNonIndexed() : geometry;
    const posAttr = resultGeometry.attributes.position;
    const vertexMap = {};
    for(let i = 0, l = posAttr.count / 3; i < l; i++){
        const i3 = 3 * i;
        const a = verts[0].fromBufferAttribute(posAttr, i3 + 0);
        const b = verts[1].fromBufferAttribute(posAttr, i3 + 1);
        const c = verts[2].fromBufferAttribute(posAttr, i3 + 2);
        tempVec1.subVectors(c, b);
        tempVec2.subVectors(a, b);
        const normal = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().crossVectors(tempVec1, tempVec2).normalize();
        for(let n = 0; n < 3; n++){
            const vert = verts[n];
            const hash = hashVertex(vert);
            if (!(hash in vertexMap)) {
                vertexMap[hash] = [];
            }
            vertexMap[hash].push(normal);
        }
    }
    const normalArray = new Float32Array(posAttr.count * 3);
    const normAttr = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](normalArray, 3, false);
    for(let i = 0, l = posAttr.count / 3; i < l; i++){
        const i3 = 3 * i;
        const a = verts[0].fromBufferAttribute(posAttr, i3 + 0);
        const b = verts[1].fromBufferAttribute(posAttr, i3 + 1);
        const c = verts[2].fromBufferAttribute(posAttr, i3 + 2);
        tempVec1.subVectors(c, b);
        tempVec2.subVectors(a, b);
        tempNorm.crossVectors(tempVec1, tempVec2).normalize();
        for(let n = 0; n < 3; n++){
            const vert = verts[n];
            const hash = hashVertex(vert);
            const otherNormals = vertexMap[hash];
            tempNorm2.set(0, 0, 0);
            for(let k = 0, lk = otherNormals.length; k < lk; k++){
                const otherNorm = otherNormals[k];
                if (tempNorm.dot(otherNorm) > creaseDot) {
                    tempNorm2.add(otherNorm);
                }
            }
            tempNorm2.normalize();
            normAttr.setXYZ(i3 + n, tempNorm2.x, tempNorm2.y, tempNorm2.z);
        }
    }
    resultGeometry.setAttribute("normal", normAttr);
    return resultGeometry;
}
;
 //# sourceMappingURL=BufferGeometryUtils.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/_polyfill/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "version",
    ()=>version
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
const version = /* @__PURE__ */ (()=>parseInt(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REVISION"].replace(/\D+/g, "")))();
;
 //# sourceMappingURL=constants.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/_polyfill/LoaderUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodeText",
    ()=>decodeText
]);
function decodeText(array) {
    if (typeof TextDecoder !== "undefined") {
        return new TextDecoder().decode(array);
    }
    let s = "";
    for(let i = 0, il = array.length; i < il; i++){
        s += String.fromCharCode(array[i]);
    }
    try {
        return decodeURIComponent(escape(s));
    } catch (e) {
        return s;
    }
}
;
 //# sourceMappingURL=LoaderUtils.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/loaders/GLTFLoader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GLTFLoader",
    ()=>GLTFLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$utils$2f$BufferGeometryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/utils/BufferGeometryUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/_polyfill/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$LoaderUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/_polyfill/LoaderUtils.js [app-client] (ecmascript)");
;
;
;
;
const SRGBColorSpace = "srgb";
const LinearSRGBColorSpace = "srgb-linear";
const sRGBEncoding = 3001;
const LinearEncoding = 3e3;
class GLTFLoader extends __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Loader"] {
    load(url, onLoad, onProgress, onError) {
        const scope = this;
        let resourcePath;
        if (this.resourcePath !== "") {
            resourcePath = this.resourcePath;
        } else if (this.path !== "") {
            const relativeUrl = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoaderUtils"].extractUrlBase(url);
            resourcePath = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoaderUtils"].resolveURL(relativeUrl, this.path);
        } else {
            resourcePath = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoaderUtils"].extractUrlBase(url);
        }
        this.manager.itemStart(url);
        const _onError = function(e) {
            if (onError) {
                onError(e);
            } else {
                console.error(e);
            }
            scope.manager.itemError(url);
            scope.manager.itemEnd(url);
        };
        const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileLoader"](this.manager);
        loader.setPath(this.path);
        loader.setResponseType("arraybuffer");
        loader.setRequestHeader(this.requestHeader);
        loader.setWithCredentials(this.withCredentials);
        loader.load(url, function(data) {
            try {
                scope.parse(data, resourcePath, function(gltf) {
                    onLoad(gltf);
                    scope.manager.itemEnd(url);
                }, _onError);
            } catch (e) {
                _onError(e);
            }
        }, onProgress, _onError);
    }
    setDRACOLoader(dracoLoader) {
        this.dracoLoader = dracoLoader;
        return this;
    }
    setDDSLoader() {
        throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".');
    }
    setKTX2Loader(ktx2Loader) {
        this.ktx2Loader = ktx2Loader;
        return this;
    }
    setMeshoptDecoder(meshoptDecoder) {
        this.meshoptDecoder = meshoptDecoder;
        return this;
    }
    register(callback) {
        if (this.pluginCallbacks.indexOf(callback) === -1) {
            this.pluginCallbacks.push(callback);
        }
        return this;
    }
    unregister(callback) {
        if (this.pluginCallbacks.indexOf(callback) !== -1) {
            this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(callback), 1);
        }
        return this;
    }
    parse(data, path, onLoad, onError) {
        let json;
        const extensions = {};
        const plugins = {};
        if (typeof data === "string") {
            json = JSON.parse(data);
        } else if (data instanceof ArrayBuffer) {
            const magic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$LoaderUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeText"])(new Uint8Array(data.slice(0, 4)));
            if (magic === BINARY_EXTENSION_HEADER_MAGIC) {
                try {
                    extensions[EXTENSIONS.KHR_BINARY_GLTF] = new GLTFBinaryExtension(data);
                } catch (error) {
                    if (onError) onError(error);
                    return;
                }
                json = JSON.parse(extensions[EXTENSIONS.KHR_BINARY_GLTF].content);
            } else {
                json = JSON.parse((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$LoaderUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeText"])(new Uint8Array(data)));
            }
        } else {
            json = data;
        }
        if (json.asset === void 0 || json.asset.version[0] < 2) {
            if (onError) onError(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
            return;
        }
        const parser = new GLTFParser(json, {
            path: path || this.resourcePath || "",
            crossOrigin: this.crossOrigin,
            requestHeader: this.requestHeader,
            manager: this.manager,
            ktx2Loader: this.ktx2Loader,
            meshoptDecoder: this.meshoptDecoder
        });
        parser.fileLoader.setRequestHeader(this.requestHeader);
        for(let i = 0; i < this.pluginCallbacks.length; i++){
            const plugin = this.pluginCallbacks[i](parser);
            if (!plugin.name) console.error("THREE.GLTFLoader: Invalid plugin found: missing name");
            plugins[plugin.name] = plugin;
            extensions[plugin.name] = true;
        }
        if (json.extensionsUsed) {
            for(let i = 0; i < json.extensionsUsed.length; ++i){
                const extensionName = json.extensionsUsed[i];
                const extensionsRequired = json.extensionsRequired || [];
                switch(extensionName){
                    case EXTENSIONS.KHR_MATERIALS_UNLIT:
                        extensions[extensionName] = new GLTFMaterialsUnlitExtension();
                        break;
                    case EXTENSIONS.KHR_DRACO_MESH_COMPRESSION:
                        extensions[extensionName] = new GLTFDracoMeshCompressionExtension(json, this.dracoLoader);
                        break;
                    case EXTENSIONS.KHR_TEXTURE_TRANSFORM:
                        extensions[extensionName] = new GLTFTextureTransformExtension();
                        break;
                    case EXTENSIONS.KHR_MESH_QUANTIZATION:
                        extensions[extensionName] = new GLTFMeshQuantizationExtension();
                        break;
                    default:
                        if (extensionsRequired.indexOf(extensionName) >= 0 && plugins[extensionName] === void 0) {
                            console.warn('THREE.GLTFLoader: Unknown extension "' + extensionName + '".');
                        }
                }
            }
        }
        parser.setExtensions(extensions);
        parser.setPlugins(plugins);
        parser.parse(onLoad, onError);
    }
    parseAsync(data, path) {
        const scope = this;
        return new Promise(function(resolve, reject) {
            scope.parse(data, path, resolve, reject);
        });
    }
    constructor(manager){
        super(manager);
        this.dracoLoader = null;
        this.ktx2Loader = null;
        this.meshoptDecoder = null;
        this.pluginCallbacks = [];
        this.register(function(parser) {
            return new GLTFMaterialsClearcoatExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMaterialsDispersionExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFTextureBasisUExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFTextureWebPExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFTextureAVIFExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMaterialsSheenExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMaterialsTransmissionExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMaterialsVolumeExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMaterialsIorExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMaterialsEmissiveStrengthExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMaterialsSpecularExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMaterialsIridescenceExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMaterialsAnisotropyExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMaterialsBumpExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFLightsExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMeshoptCompression(parser);
        });
        this.register(function(parser) {
            return new GLTFMeshGpuInstancing(parser);
        });
    }
}
function GLTFRegistry() {
    let objects = {};
    return {
        get: function(key) {
            return objects[key];
        },
        add: function(key, object) {
            objects[key] = object;
        },
        remove: function(key) {
            delete objects[key];
        },
        removeAll: function() {
            objects = {};
        }
    };
}
const EXTENSIONS = {
    KHR_BINARY_GLTF: "KHR_binary_glTF",
    KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
    KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
    KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
    KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
    KHR_MATERIALS_IOR: "KHR_materials_ior",
    KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
    KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
    KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
    KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
    KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
    KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
    KHR_MATERIALS_VOLUME: "KHR_materials_volume",
    KHR_TEXTURE_BASISU: "KHR_texture_basisu",
    KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
    KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
    KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
    EXT_MATERIALS_BUMP: "EXT_materials_bump",
    EXT_TEXTURE_WEBP: "EXT_texture_webp",
    EXT_TEXTURE_AVIF: "EXT_texture_avif",
    EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
    EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class GLTFLightsExtension {
    _markDefs() {
        const parser = this.parser;
        const nodeDefs = this.parser.json.nodes || [];
        for(let nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex++){
            const nodeDef = nodeDefs[nodeIndex];
            if (nodeDef.extensions && nodeDef.extensions[this.name] && nodeDef.extensions[this.name].light !== void 0) {
                parser._addNodeRef(this.cache, nodeDef.extensions[this.name].light);
            }
        }
    }
    _loadLight(lightIndex) {
        const parser = this.parser;
        const cacheKey = "light:" + lightIndex;
        let dependency = parser.cache.get(cacheKey);
        if (dependency) return dependency;
        const json = parser.json;
        const extensions = json.extensions && json.extensions[this.name] || {};
        const lightDefs = extensions.lights || [];
        const lightDef = lightDefs[lightIndex];
        let lightNode;
        const color = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](16777215);
        if (lightDef.color !== void 0) color.setRGB(lightDef.color[0], lightDef.color[1], lightDef.color[2], LinearSRGBColorSpace);
        const range = lightDef.range !== void 0 ? lightDef.range : 0;
        switch(lightDef.type){
            case "directional":
                lightNode = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DirectionalLight"](color);
                lightNode.target.position.set(0, 0, -1);
                lightNode.add(lightNode.target);
                break;
            case "point":
                lightNode = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointLight"](color);
                lightNode.distance = range;
                break;
            case "spot":
                lightNode = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpotLight"](color);
                lightNode.distance = range;
                lightDef.spot = lightDef.spot || {};
                lightDef.spot.innerConeAngle = lightDef.spot.innerConeAngle !== void 0 ? lightDef.spot.innerConeAngle : 0;
                lightDef.spot.outerConeAngle = lightDef.spot.outerConeAngle !== void 0 ? lightDef.spot.outerConeAngle : Math.PI / 4;
                lightNode.angle = lightDef.spot.outerConeAngle;
                lightNode.penumbra = 1 - lightDef.spot.innerConeAngle / lightDef.spot.outerConeAngle;
                lightNode.target.position.set(0, 0, -1);
                lightNode.add(lightNode.target);
                break;
            default:
                throw new Error("THREE.GLTFLoader: Unexpected light type: " + lightDef.type);
        }
        lightNode.position.set(0, 0, 0);
        lightNode.decay = 2;
        assignExtrasToUserData(lightNode, lightDef);
        if (lightDef.intensity !== void 0) lightNode.intensity = lightDef.intensity;
        lightNode.name = parser.createUniqueName(lightDef.name || "light_" + lightIndex);
        dependency = Promise.resolve(lightNode);
        parser.cache.add(cacheKey, dependency);
        return dependency;
    }
    getDependency(type, index) {
        if (type !== "light") return;
        return this._loadLight(index);
    }
    createNodeAttachment(nodeIndex) {
        const self2 = this;
        const parser = this.parser;
        const json = parser.json;
        const nodeDef = json.nodes[nodeIndex];
        const lightDef = nodeDef.extensions && nodeDef.extensions[this.name] || {};
        const lightIndex = lightDef.light;
        if (lightIndex === void 0) return null;
        return this._loadLight(lightIndex).then(function(light) {
            return parser._getNodeRef(self2.cache, lightIndex, light);
        });
    }
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_LIGHTS_PUNCTUAL;
        this.cache = {
            refs: {},
            uses: {}
        };
    }
}
class GLTFMaterialsUnlitExtension {
    getMaterialType() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"];
    }
    extendParams(materialParams, materialDef, parser) {
        const pending = [];
        materialParams.color = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](1, 1, 1);
        materialParams.opacity = 1;
        const metallicRoughness = materialDef.pbrMetallicRoughness;
        if (metallicRoughness) {
            if (Array.isArray(metallicRoughness.baseColorFactor)) {
                const array = metallicRoughness.baseColorFactor;
                materialParams.color.setRGB(array[0], array[1], array[2], LinearSRGBColorSpace);
                materialParams.opacity = array[3];
            }
            if (metallicRoughness.baseColorTexture !== void 0) {
                pending.push(parser.assignTexture(materialParams, "map", metallicRoughness.baseColorTexture, SRGBColorSpace));
            }
        }
        return Promise.all(pending);
    }
    constructor(){
        this.name = EXTENSIONS.KHR_MATERIALS_UNLIT;
    }
}
class GLTFMaterialsEmissiveStrengthExtension {
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const emissiveStrength = materialDef.extensions[this.name].emissiveStrength;
        if (emissiveStrength !== void 0) {
            materialParams.emissiveIntensity = emissiveStrength;
        }
        return Promise.resolve();
    }
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_MATERIALS_EMISSIVE_STRENGTH;
    }
}
class GLTFMaterialsClearcoatExtension {
    getMaterialType(materialIndex) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"];
    }
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const pending = [];
        const extension = materialDef.extensions[this.name];
        if (extension.clearcoatFactor !== void 0) {
            materialParams.clearcoat = extension.clearcoatFactor;
        }
        if (extension.clearcoatTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "clearcoatMap", extension.clearcoatTexture));
        }
        if (extension.clearcoatRoughnessFactor !== void 0) {
            materialParams.clearcoatRoughness = extension.clearcoatRoughnessFactor;
        }
        if (extension.clearcoatRoughnessTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "clearcoatRoughnessMap", extension.clearcoatRoughnessTexture));
        }
        if (extension.clearcoatNormalTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "clearcoatNormalMap", extension.clearcoatNormalTexture));
            if (extension.clearcoatNormalTexture.scale !== void 0) {
                const scale = extension.clearcoatNormalTexture.scale;
                materialParams.clearcoatNormalScale = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](scale, scale);
            }
        }
        return Promise.all(pending);
    }
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_MATERIALS_CLEARCOAT;
    }
}
class GLTFMaterialsDispersionExtension {
    getMaterialType(materialIndex) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"];
    }
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const extension = materialDef.extensions[this.name];
        materialParams.dispersion = extension.dispersion !== void 0 ? extension.dispersion : 0;
        return Promise.resolve();
    }
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_MATERIALS_DISPERSION;
    }
}
class GLTFMaterialsIridescenceExtension {
    getMaterialType(materialIndex) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"];
    }
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const pending = [];
        const extension = materialDef.extensions[this.name];
        if (extension.iridescenceFactor !== void 0) {
            materialParams.iridescence = extension.iridescenceFactor;
        }
        if (extension.iridescenceTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "iridescenceMap", extension.iridescenceTexture));
        }
        if (extension.iridescenceIor !== void 0) {
            materialParams.iridescenceIOR = extension.iridescenceIor;
        }
        if (materialParams.iridescenceThicknessRange === void 0) {
            materialParams.iridescenceThicknessRange = [
                100,
                400
            ];
        }
        if (extension.iridescenceThicknessMinimum !== void 0) {
            materialParams.iridescenceThicknessRange[0] = extension.iridescenceThicknessMinimum;
        }
        if (extension.iridescenceThicknessMaximum !== void 0) {
            materialParams.iridescenceThicknessRange[1] = extension.iridescenceThicknessMaximum;
        }
        if (extension.iridescenceThicknessTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "iridescenceThicknessMap", extension.iridescenceThicknessTexture));
        }
        return Promise.all(pending);
    }
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_MATERIALS_IRIDESCENCE;
    }
}
class GLTFMaterialsSheenExtension {
    getMaterialType(materialIndex) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"];
    }
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const pending = [];
        materialParams.sheenColor = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0, 0, 0);
        materialParams.sheenRoughness = 0;
        materialParams.sheen = 1;
        const extension = materialDef.extensions[this.name];
        if (extension.sheenColorFactor !== void 0) {
            const colorFactor = extension.sheenColorFactor;
            materialParams.sheenColor.setRGB(colorFactor[0], colorFactor[1], colorFactor[2], LinearSRGBColorSpace);
        }
        if (extension.sheenRoughnessFactor !== void 0) {
            materialParams.sheenRoughness = extension.sheenRoughnessFactor;
        }
        if (extension.sheenColorTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "sheenColorMap", extension.sheenColorTexture, SRGBColorSpace));
        }
        if (extension.sheenRoughnessTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "sheenRoughnessMap", extension.sheenRoughnessTexture));
        }
        return Promise.all(pending);
    }
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_MATERIALS_SHEEN;
    }
}
class GLTFMaterialsTransmissionExtension {
    getMaterialType(materialIndex) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"];
    }
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const pending = [];
        const extension = materialDef.extensions[this.name];
        if (extension.transmissionFactor !== void 0) {
            materialParams.transmission = extension.transmissionFactor;
        }
        if (extension.transmissionTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "transmissionMap", extension.transmissionTexture));
        }
        return Promise.all(pending);
    }
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_MATERIALS_TRANSMISSION;
    }
}
class GLTFMaterialsVolumeExtension {
    getMaterialType(materialIndex) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"];
    }
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const pending = [];
        const extension = materialDef.extensions[this.name];
        materialParams.thickness = extension.thicknessFactor !== void 0 ? extension.thicknessFactor : 0;
        if (extension.thicknessTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "thicknessMap", extension.thicknessTexture));
        }
        materialParams.attenuationDistance = extension.attenuationDistance || Infinity;
        const colorArray = extension.attenuationColor || [
            1,
            1,
            1
        ];
        materialParams.attenuationColor = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]().setRGB(colorArray[0], colorArray[1], colorArray[2], LinearSRGBColorSpace);
        return Promise.all(pending);
    }
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_MATERIALS_VOLUME;
    }
}
class GLTFMaterialsIorExtension {
    getMaterialType(materialIndex) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"];
    }
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const extension = materialDef.extensions[this.name];
        materialParams.ior = extension.ior !== void 0 ? extension.ior : 1.5;
        return Promise.resolve();
    }
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_MATERIALS_IOR;
    }
}
class GLTFMaterialsSpecularExtension {
    getMaterialType(materialIndex) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"];
    }
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const pending = [];
        const extension = materialDef.extensions[this.name];
        materialParams.specularIntensity = extension.specularFactor !== void 0 ? extension.specularFactor : 1;
        if (extension.specularTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "specularIntensityMap", extension.specularTexture));
        }
        const colorArray = extension.specularColorFactor || [
            1,
            1,
            1
        ];
        materialParams.specularColor = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]().setRGB(colorArray[0], colorArray[1], colorArray[2], LinearSRGBColorSpace);
        if (extension.specularColorTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "specularColorMap", extension.specularColorTexture, SRGBColorSpace));
        }
        return Promise.all(pending);
    }
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_MATERIALS_SPECULAR;
    }
}
class GLTFMaterialsBumpExtension {
    getMaterialType(materialIndex) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"];
    }
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const pending = [];
        const extension = materialDef.extensions[this.name];
        materialParams.bumpScale = extension.bumpFactor !== void 0 ? extension.bumpFactor : 1;
        if (extension.bumpTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "bumpMap", extension.bumpTexture));
        }
        return Promise.all(pending);
    }
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.EXT_MATERIALS_BUMP;
    }
}
class GLTFMaterialsAnisotropyExtension {
    getMaterialType(materialIndex) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"];
    }
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const pending = [];
        const extension = materialDef.extensions[this.name];
        if (extension.anisotropyStrength !== void 0) {
            materialParams.anisotropy = extension.anisotropyStrength;
        }
        if (extension.anisotropyRotation !== void 0) {
            materialParams.anisotropyRotation = extension.anisotropyRotation;
        }
        if (extension.anisotropyTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "anisotropyMap", extension.anisotropyTexture));
        }
        return Promise.all(pending);
    }
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_MATERIALS_ANISOTROPY;
    }
}
class GLTFTextureBasisUExtension {
    loadTexture(textureIndex) {
        const parser = this.parser;
        const json = parser.json;
        const textureDef = json.textures[textureIndex];
        if (!textureDef.extensions || !textureDef.extensions[this.name]) {
            return null;
        }
        const extension = textureDef.extensions[this.name];
        const loader = parser.options.ktx2Loader;
        if (!loader) {
            if (json.extensionsRequired && json.extensionsRequired.indexOf(this.name) >= 0) {
                throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
            } else {
                return null;
            }
        }
        return parser.loadTextureImage(textureIndex, extension.source, loader);
    }
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_TEXTURE_BASISU;
    }
}
class GLTFTextureWebPExtension {
    loadTexture(textureIndex) {
        const name = this.name;
        const parser = this.parser;
        const json = parser.json;
        const textureDef = json.textures[textureIndex];
        if (!textureDef.extensions || !textureDef.extensions[name]) {
            return null;
        }
        const extension = textureDef.extensions[name];
        const source = json.images[extension.source];
        let loader = parser.textureLoader;
        if (source.uri) {
            const handler = parser.options.manager.getHandler(source.uri);
            if (handler !== null) loader = handler;
        }
        return this.detectSupport().then(function(isSupported) {
            if (isSupported) return parser.loadTextureImage(textureIndex, extension.source, loader);
            if (json.extensionsRequired && json.extensionsRequired.indexOf(name) >= 0) {
                throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
            }
            return parser.loadTexture(textureIndex);
        });
    }
    detectSupport() {
        if (!this.isSupported) {
            this.isSupported = new Promise(function(resolve) {
                const image = new Image();
                image.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
                image.onload = image.onerror = function() {
                    resolve(image.height === 1);
                };
            });
        }
        return this.isSupported;
    }
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.EXT_TEXTURE_WEBP;
        this.isSupported = null;
    }
}
class GLTFTextureAVIFExtension {
    loadTexture(textureIndex) {
        const name = this.name;
        const parser = this.parser;
        const json = parser.json;
        const textureDef = json.textures[textureIndex];
        if (!textureDef.extensions || !textureDef.extensions[name]) {
            return null;
        }
        const extension = textureDef.extensions[name];
        const source = json.images[extension.source];
        let loader = parser.textureLoader;
        if (source.uri) {
            const handler = parser.options.manager.getHandler(source.uri);
            if (handler !== null) loader = handler;
        }
        return this.detectSupport().then(function(isSupported) {
            if (isSupported) return parser.loadTextureImage(textureIndex, extension.source, loader);
            if (json.extensionsRequired && json.extensionsRequired.indexOf(name) >= 0) {
                throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
            }
            return parser.loadTexture(textureIndex);
        });
    }
    detectSupport() {
        if (!this.isSupported) {
            this.isSupported = new Promise(function(resolve) {
                const image = new Image();
                image.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=";
                image.onload = image.onerror = function() {
                    resolve(image.height === 1);
                };
            });
        }
        return this.isSupported;
    }
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.EXT_TEXTURE_AVIF;
        this.isSupported = null;
    }
}
class GLTFMeshoptCompression {
    loadBufferView(index) {
        const json = this.parser.json;
        const bufferView = json.bufferViews[index];
        if (bufferView.extensions && bufferView.extensions[this.name]) {
            const extensionDef = bufferView.extensions[this.name];
            const buffer = this.parser.getDependency("buffer", extensionDef.buffer);
            const decoder = this.parser.options.meshoptDecoder;
            if (!decoder || !decoder.supported) {
                if (json.extensionsRequired && json.extensionsRequired.indexOf(this.name) >= 0) {
                    throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
                } else {
                    return null;
                }
            }
            return buffer.then(function(res) {
                const byteOffset = extensionDef.byteOffset || 0;
                const byteLength = extensionDef.byteLength || 0;
                const count = extensionDef.count;
                const stride = extensionDef.byteStride;
                const source = new Uint8Array(res, byteOffset, byteLength);
                if (decoder.decodeGltfBufferAsync) {
                    return decoder.decodeGltfBufferAsync(count, stride, source, extensionDef.mode, extensionDef.filter).then(function(res2) {
                        return res2.buffer;
                    });
                } else {
                    return decoder.ready.then(function() {
                        const result = new ArrayBuffer(count * stride);
                        decoder.decodeGltfBuffer(new Uint8Array(result), count, stride, source, extensionDef.mode, extensionDef.filter);
                        return result;
                    });
                }
            });
        } else {
            return null;
        }
    }
    constructor(parser){
        this.name = EXTENSIONS.EXT_MESHOPT_COMPRESSION;
        this.parser = parser;
    }
}
class GLTFMeshGpuInstancing {
    createNodeMesh(nodeIndex) {
        const json = this.parser.json;
        const nodeDef = json.nodes[nodeIndex];
        if (!nodeDef.extensions || !nodeDef.extensions[this.name] || nodeDef.mesh === void 0) {
            return null;
        }
        const meshDef = json.meshes[nodeDef.mesh];
        for (const primitive of meshDef.primitives){
            if (primitive.mode !== WEBGL_CONSTANTS.TRIANGLES && primitive.mode !== WEBGL_CONSTANTS.TRIANGLE_STRIP && primitive.mode !== WEBGL_CONSTANTS.TRIANGLE_FAN && primitive.mode !== void 0) {
                return null;
            }
        }
        const extensionDef = nodeDef.extensions[this.name];
        const attributesDef = extensionDef.attributes;
        const pending = [];
        const attributes = {};
        for(const key in attributesDef){
            pending.push(this.parser.getDependency("accessor", attributesDef[key]).then((accessor)=>{
                attributes[key] = accessor;
                return attributes[key];
            }));
        }
        if (pending.length < 1) {
            return null;
        }
        pending.push(this.parser.createNodeMesh(nodeIndex));
        return Promise.all(pending).then((results)=>{
            const nodeObject = results.pop();
            const meshes = nodeObject.isGroup ? nodeObject.children : [
                nodeObject
            ];
            const count = results[0].count;
            const instancedMeshes = [];
            for (const mesh of meshes){
                const m = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
                const p = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
                const q = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
                const s = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 1, 1);
                const instancedMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"](mesh.geometry, mesh.material, count);
                for(let i = 0; i < count; i++){
                    if (attributes.TRANSLATION) {
                        p.fromBufferAttribute(attributes.TRANSLATION, i);
                    }
                    if (attributes.ROTATION) {
                        q.fromBufferAttribute(attributes.ROTATION, i);
                    }
                    if (attributes.SCALE) {
                        s.fromBufferAttribute(attributes.SCALE, i);
                    }
                    instancedMesh.setMatrixAt(i, m.compose(p, q, s));
                }
                for(const attributeName in attributes){
                    if (attributeName === "_COLOR_0") {
                        const attr = attributes[attributeName];
                        instancedMesh.instanceColor = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedBufferAttribute"](attr.array, attr.itemSize, attr.normalized);
                    } else if (attributeName !== "TRANSLATION" && attributeName !== "ROTATION" && attributeName !== "SCALE") {
                        mesh.geometry.setAttribute(attributeName, attributes[attributeName]);
                    }
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Object3D"].prototype.copy.call(instancedMesh, mesh);
                this.parser.assignFinalMaterial(instancedMesh);
                instancedMeshes.push(instancedMesh);
            }
            if (nodeObject.isGroup) {
                nodeObject.clear();
                nodeObject.add(...instancedMeshes);
                return nodeObject;
            }
            return instancedMeshes[0];
        });
    }
    constructor(parser){
        this.name = EXTENSIONS.EXT_MESH_GPU_INSTANCING;
        this.parser = parser;
    }
}
const BINARY_EXTENSION_HEADER_MAGIC = "glTF";
const BINARY_EXTENSION_HEADER_LENGTH = 12;
const BINARY_EXTENSION_CHUNK_TYPES = {
    JSON: 1313821514,
    BIN: 5130562
};
class GLTFBinaryExtension {
    constructor(data){
        this.name = EXTENSIONS.KHR_BINARY_GLTF;
        this.content = null;
        this.body = null;
        const headerView = new DataView(data, 0, BINARY_EXTENSION_HEADER_LENGTH);
        this.header = {
            magic: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$LoaderUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeText"])(new Uint8Array(data.slice(0, 4))),
            version: headerView.getUint32(4, true),
            length: headerView.getUint32(8, true)
        };
        if (this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC) {
            throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
        } else if (this.header.version < 2) {
            throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
        }
        const chunkContentsLength = this.header.length - BINARY_EXTENSION_HEADER_LENGTH;
        const chunkView = new DataView(data, BINARY_EXTENSION_HEADER_LENGTH);
        let chunkIndex = 0;
        while(chunkIndex < chunkContentsLength){
            const chunkLength = chunkView.getUint32(chunkIndex, true);
            chunkIndex += 4;
            const chunkType = chunkView.getUint32(chunkIndex, true);
            chunkIndex += 4;
            if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.JSON) {
                const contentArray = new Uint8Array(data, BINARY_EXTENSION_HEADER_LENGTH + chunkIndex, chunkLength);
                this.content = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$LoaderUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeText"])(contentArray);
            } else if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.BIN) {
                const byteOffset = BINARY_EXTENSION_HEADER_LENGTH + chunkIndex;
                this.body = data.slice(byteOffset, byteOffset + chunkLength);
            }
            chunkIndex += chunkLength;
        }
        if (this.content === null) {
            throw new Error("THREE.GLTFLoader: JSON content not found.");
        }
    }
}
class GLTFDracoMeshCompressionExtension {
    decodePrimitive(primitive, parser) {
        const json = this.json;
        const dracoLoader = this.dracoLoader;
        const bufferViewIndex = primitive.extensions[this.name].bufferView;
        const gltfAttributeMap = primitive.extensions[this.name].attributes;
        const threeAttributeMap = {};
        const attributeNormalizedMap = {};
        const attributeTypeMap = {};
        for(const attributeName in gltfAttributeMap){
            const threeAttributeName = ATTRIBUTES[attributeName] || attributeName.toLowerCase();
            threeAttributeMap[threeAttributeName] = gltfAttributeMap[attributeName];
        }
        for(const attributeName in primitive.attributes){
            const threeAttributeName = ATTRIBUTES[attributeName] || attributeName.toLowerCase();
            if (gltfAttributeMap[attributeName] !== void 0) {
                const accessorDef = json.accessors[primitive.attributes[attributeName]];
                const componentType = WEBGL_COMPONENT_TYPES[accessorDef.componentType];
                attributeTypeMap[threeAttributeName] = componentType.name;
                attributeNormalizedMap[threeAttributeName] = accessorDef.normalized === true;
            }
        }
        return parser.getDependency("bufferView", bufferViewIndex).then(function(bufferView) {
            return new Promise(function(resolve, reject) {
                dracoLoader.decodeDracoFile(bufferView, function(geometry) {
                    for(const attributeName in geometry.attributes){
                        const attribute = geometry.attributes[attributeName];
                        const normalized = attributeNormalizedMap[attributeName];
                        if (normalized !== void 0) attribute.normalized = normalized;
                    }
                    resolve(geometry);
                }, threeAttributeMap, attributeTypeMap, LinearSRGBColorSpace, reject);
            });
        });
    }
    constructor(json, dracoLoader){
        if (!dracoLoader) {
            throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
        }
        this.name = EXTENSIONS.KHR_DRACO_MESH_COMPRESSION;
        this.json = json;
        this.dracoLoader = dracoLoader;
        this.dracoLoader.preload();
    }
}
class GLTFTextureTransformExtension {
    extendTexture(texture, transform) {
        if ((transform.texCoord === void 0 || transform.texCoord === texture.channel) && transform.offset === void 0 && transform.rotation === void 0 && transform.scale === void 0) {
            return texture;
        }
        texture = texture.clone();
        if (transform.texCoord !== void 0) {
            texture.channel = transform.texCoord;
        }
        if (transform.offset !== void 0) {
            texture.offset.fromArray(transform.offset);
        }
        if (transform.rotation !== void 0) {
            texture.rotation = transform.rotation;
        }
        if (transform.scale !== void 0) {
            texture.repeat.fromArray(transform.scale);
        }
        texture.needsUpdate = true;
        return texture;
    }
    constructor(){
        this.name = EXTENSIONS.KHR_TEXTURE_TRANSFORM;
    }
}
class GLTFMeshQuantizationExtension {
    constructor(){
        this.name = EXTENSIONS.KHR_MESH_QUANTIZATION;
    }
}
class GLTFCubicSplineInterpolant extends __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Interpolant"] {
    copySampleValue_(index) {
        const result = this.resultBuffer, values = this.sampleValues, valueSize = this.valueSize, offset = index * valueSize * 3 + valueSize;
        for(let i = 0; i !== valueSize; i++){
            result[i] = values[offset + i];
        }
        return result;
    }
    interpolate_(i1, t0, t, t1) {
        const result = this.resultBuffer;
        const values = this.sampleValues;
        const stride = this.valueSize;
        const stride2 = stride * 2;
        const stride3 = stride * 3;
        const td = t1 - t0;
        const p = (t - t0) / td;
        const pp = p * p;
        const ppp = pp * p;
        const offset1 = i1 * stride3;
        const offset0 = offset1 - stride3;
        const s2 = -2 * ppp + 3 * pp;
        const s3 = ppp - pp;
        const s0 = 1 - s2;
        const s1 = s3 - pp + p;
        for(let i = 0; i !== stride; i++){
            const p0 = values[offset0 + i + stride];
            const m0 = values[offset0 + i + stride2] * td;
            const p1 = values[offset1 + i + stride];
            const m1 = values[offset1 + i] * td;
            result[i] = s0 * p0 + s1 * m0 + s2 * p1 + s3 * m1;
        }
        return result;
    }
    constructor(parameterPositions, sampleValues, sampleSize, resultBuffer){
        super(parameterPositions, sampleValues, sampleSize, resultBuffer);
    }
}
const _q = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
class GLTFCubicSplineQuaternionInterpolant extends GLTFCubicSplineInterpolant {
    interpolate_(i1, t0, t, t1) {
        const result = super.interpolate_(i1, t0, t, t1);
        _q.fromArray(result).normalize().toArray(result);
        return result;
    }
}
const WEBGL_CONSTANTS = {
    FLOAT: 5126,
    //FLOAT_MAT2: 35674,
    FLOAT_MAT3: 35675,
    FLOAT_MAT4: 35676,
    FLOAT_VEC2: 35664,
    FLOAT_VEC3: 35665,
    FLOAT_VEC4: 35666,
    LINEAR: 9729,
    REPEAT: 10497,
    SAMPLER_2D: 35678,
    POINTS: 0,
    LINES: 1,
    LINE_LOOP: 2,
    LINE_STRIP: 3,
    TRIANGLES: 4,
    TRIANGLE_STRIP: 5,
    TRIANGLE_FAN: 6,
    UNSIGNED_BYTE: 5121,
    UNSIGNED_SHORT: 5123
};
const WEBGL_COMPONENT_TYPES = {
    5120: Int8Array,
    5121: Uint8Array,
    5122: Int16Array,
    5123: Uint16Array,
    5125: Uint32Array,
    5126: Float32Array
};
const WEBGL_FILTERS = {
    9728: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NearestFilter"],
    9729: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"],
    9984: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NearestMipmapNearestFilter"],
    9985: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearMipmapNearestFilter"],
    9986: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NearestMipmapLinearFilter"],
    9987: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearMipmapLinearFilter"]
};
const WEBGL_WRAPPINGS = {
    33071: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"],
    33648: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MirroredRepeatWrapping"],
    10497: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"]
};
const WEBGL_TYPE_SIZES = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 9,
    MAT4: 16
};
const ATTRIBUTES = {
    POSITION: "position",
    NORMAL: "normal",
    TANGENT: "tangent",
    // uv => uv1, 4 uv channels
    // https://github.com/mrdoob/three.js/pull/25943
    // https://github.com/mrdoob/three.js/pull/25788
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"] >= 152 ? {
        TEXCOORD_0: "uv",
        TEXCOORD_1: "uv1",
        TEXCOORD_2: "uv2",
        TEXCOORD_3: "uv3"
    } : {
        TEXCOORD_0: "uv",
        TEXCOORD_1: "uv2"
    },
    COLOR_0: "color",
    WEIGHTS_0: "skinWeight",
    JOINTS_0: "skinIndex"
};
const PATH_PROPERTIES = {
    scale: "scale",
    translation: "position",
    rotation: "quaternion",
    weights: "morphTargetInfluences"
};
const INTERPOLATION = {
    CUBICSPLINE: void 0,
    // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
    // keyframe track will be initialized with a default interpolation type, then modified.
    LINEAR: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterpolateLinear"],
    STEP: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterpolateDiscrete"]
};
const ALPHA_MODES = {
    OPAQUE: "OPAQUE",
    MASK: "MASK",
    BLEND: "BLEND"
};
function createDefaultMaterial(cache) {
    if (cache["DefaultMaterial"] === void 0) {
        cache["DefaultMaterial"] = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: 16777215,
            emissive: 0,
            metalness: 1,
            roughness: 1,
            transparent: false,
            depthTest: true,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FrontSide"]
        });
    }
    return cache["DefaultMaterial"];
}
function addUnknownExtensionsToUserData(knownExtensions, object, objectDef) {
    for(const name in objectDef.extensions){
        if (knownExtensions[name] === void 0) {
            object.userData.gltfExtensions = object.userData.gltfExtensions || {};
            object.userData.gltfExtensions[name] = objectDef.extensions[name];
        }
    }
}
function assignExtrasToUserData(object, gltfDef) {
    if (gltfDef.extras !== void 0) {
        if (typeof gltfDef.extras === "object") {
            Object.assign(object.userData, gltfDef.extras);
        } else {
            console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + gltfDef.extras);
        }
    }
}
function addMorphTargets(geometry, targets, parser) {
    let hasMorphPosition = false;
    let hasMorphNormal = false;
    let hasMorphColor = false;
    for(let i = 0, il = targets.length; i < il; i++){
        const target = targets[i];
        if (target.POSITION !== void 0) hasMorphPosition = true;
        if (target.NORMAL !== void 0) hasMorphNormal = true;
        if (target.COLOR_0 !== void 0) hasMorphColor = true;
        if (hasMorphPosition && hasMorphNormal && hasMorphColor) break;
    }
    if (!hasMorphPosition && !hasMorphNormal && !hasMorphColor) return Promise.resolve(geometry);
    const pendingPositionAccessors = [];
    const pendingNormalAccessors = [];
    const pendingColorAccessors = [];
    for(let i = 0, il = targets.length; i < il; i++){
        const target = targets[i];
        if (hasMorphPosition) {
            const pendingAccessor = target.POSITION !== void 0 ? parser.getDependency("accessor", target.POSITION) : geometry.attributes.position;
            pendingPositionAccessors.push(pendingAccessor);
        }
        if (hasMorphNormal) {
            const pendingAccessor = target.NORMAL !== void 0 ? parser.getDependency("accessor", target.NORMAL) : geometry.attributes.normal;
            pendingNormalAccessors.push(pendingAccessor);
        }
        if (hasMorphColor) {
            const pendingAccessor = target.COLOR_0 !== void 0 ? parser.getDependency("accessor", target.COLOR_0) : geometry.attributes.color;
            pendingColorAccessors.push(pendingAccessor);
        }
    }
    return Promise.all([
        Promise.all(pendingPositionAccessors),
        Promise.all(pendingNormalAccessors),
        Promise.all(pendingColorAccessors)
    ]).then(function(accessors) {
        const morphPositions = accessors[0];
        const morphNormals = accessors[1];
        const morphColors = accessors[2];
        if (hasMorphPosition) geometry.morphAttributes.position = morphPositions;
        if (hasMorphNormal) geometry.morphAttributes.normal = morphNormals;
        if (hasMorphColor) geometry.morphAttributes.color = morphColors;
        geometry.morphTargetsRelative = true;
        return geometry;
    });
}
function updateMorphTargets(mesh, meshDef) {
    mesh.updateMorphTargets();
    if (meshDef.weights !== void 0) {
        for(let i = 0, il = meshDef.weights.length; i < il; i++){
            mesh.morphTargetInfluences[i] = meshDef.weights[i];
        }
    }
    if (meshDef.extras && Array.isArray(meshDef.extras.targetNames)) {
        const targetNames = meshDef.extras.targetNames;
        if (mesh.morphTargetInfluences.length === targetNames.length) {
            mesh.morphTargetDictionary = {};
            for(let i = 0, il = targetNames.length; i < il; i++){
                mesh.morphTargetDictionary[targetNames[i]] = i;
            }
        } else {
            console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
        }
    }
}
function createPrimitiveKey(primitiveDef) {
    let geometryKey;
    const dracoExtension = primitiveDef.extensions && primitiveDef.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION];
    if (dracoExtension) {
        geometryKey = "draco:" + dracoExtension.bufferView + ":" + dracoExtension.indices + ":" + createAttributesKey(dracoExtension.attributes);
    } else {
        geometryKey = primitiveDef.indices + ":" + createAttributesKey(primitiveDef.attributes) + ":" + primitiveDef.mode;
    }
    if (primitiveDef.targets !== void 0) {
        for(let i = 0, il = primitiveDef.targets.length; i < il; i++){
            geometryKey += ":" + createAttributesKey(primitiveDef.targets[i]);
        }
    }
    return geometryKey;
}
function createAttributesKey(attributes) {
    let attributesKey = "";
    const keys = Object.keys(attributes).sort();
    for(let i = 0, il = keys.length; i < il; i++){
        attributesKey += keys[i] + ":" + attributes[keys[i]] + ";";
    }
    return attributesKey;
}
function getNormalizedComponentScale(constructor) {
    switch(constructor){
        case Int8Array:
            return 1 / 127;
        case Uint8Array:
            return 1 / 255;
        case Int16Array:
            return 1 / 32767;
        case Uint16Array:
            return 1 / 65535;
        default:
            throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
    }
}
function getImageURIMimeType(uri) {
    if (uri.search(/\.jpe?g($|\?)/i) > 0 || uri.search(/^data\:image\/jpeg/) === 0) return "image/jpeg";
    if (uri.search(/\.webp($|\?)/i) > 0 || uri.search(/^data\:image\/webp/) === 0) return "image/webp";
    return "image/png";
}
const _identityMatrix = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
class GLTFParser {
    setExtensions(extensions) {
        this.extensions = extensions;
    }
    setPlugins(plugins) {
        this.plugins = plugins;
    }
    parse(onLoad, onError) {
        const parser = this;
        const json = this.json;
        const extensions = this.extensions;
        this.cache.removeAll();
        this.nodeCache = {};
        this._invokeAll(function(ext) {
            return ext._markDefs && ext._markDefs();
        });
        Promise.all(this._invokeAll(function(ext) {
            return ext.beforeRoot && ext.beforeRoot();
        })).then(function() {
            return Promise.all([
                parser.getDependencies("scene"),
                parser.getDependencies("animation"),
                parser.getDependencies("camera")
            ]);
        }).then(function(dependencies) {
            const result = {
                scene: dependencies[0][json.scene || 0],
                scenes: dependencies[0],
                animations: dependencies[1],
                cameras: dependencies[2],
                asset: json.asset,
                parser,
                userData: {}
            };
            addUnknownExtensionsToUserData(extensions, result, json);
            assignExtrasToUserData(result, json);
            return Promise.all(parser._invokeAll(function(ext) {
                return ext.afterRoot && ext.afterRoot(result);
            })).then(function() {
                for (const scene of result.scenes){
                    scene.updateMatrixWorld();
                }
                onLoad(result);
            });
        }).catch(onError);
    }
    /**
   * Marks the special nodes/meshes in json for efficient parse.
   */ _markDefs() {
        const nodeDefs = this.json.nodes || [];
        const skinDefs = this.json.skins || [];
        const meshDefs = this.json.meshes || [];
        for(let skinIndex = 0, skinLength = skinDefs.length; skinIndex < skinLength; skinIndex++){
            const joints = skinDefs[skinIndex].joints;
            for(let i = 0, il = joints.length; i < il; i++){
                nodeDefs[joints[i]].isBone = true;
            }
        }
        for(let nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex++){
            const nodeDef = nodeDefs[nodeIndex];
            if (nodeDef.mesh !== void 0) {
                this._addNodeRef(this.meshCache, nodeDef.mesh);
                if (nodeDef.skin !== void 0) {
                    meshDefs[nodeDef.mesh].isSkinnedMesh = true;
                }
            }
            if (nodeDef.camera !== void 0) {
                this._addNodeRef(this.cameraCache, nodeDef.camera);
            }
        }
    }
    /**
   * Counts references to shared node / Object3D resources. These resources
   * can be reused, or "instantiated", at multiple nodes in the scene
   * hierarchy. Mesh, Camera, and Light instances are instantiated and must
   * be marked. Non-scenegraph resources (like Materials, Geometries, and
   * Textures) can be reused directly and are not marked here.
   *
   * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
   */ _addNodeRef(cache, index) {
        if (index === void 0) return;
        if (cache.refs[index] === void 0) {
            cache.refs[index] = cache.uses[index] = 0;
        }
        cache.refs[index]++;
    }
    /** Returns a reference to a shared resource, cloning it if necessary. */ _getNodeRef(cache, index, object) {
        if (cache.refs[index] <= 1) return object;
        const ref = object.clone();
        const updateMappings = (original, clone)=>{
            const mappings = this.associations.get(original);
            if (mappings != null) {
                this.associations.set(clone, mappings);
            }
            for (const [i, child] of original.children.entries()){
                updateMappings(child, clone.children[i]);
            }
        };
        updateMappings(object, ref);
        ref.name += "_instance_" + cache.uses[index]++;
        return ref;
    }
    _invokeOne(func) {
        const extensions = Object.values(this.plugins);
        extensions.push(this);
        for(let i = 0; i < extensions.length; i++){
            const result = func(extensions[i]);
            if (result) return result;
        }
        return null;
    }
    _invokeAll(func) {
        const extensions = Object.values(this.plugins);
        extensions.unshift(this);
        const pending = [];
        for(let i = 0; i < extensions.length; i++){
            const result = func(extensions[i]);
            if (result) pending.push(result);
        }
        return pending;
    }
    /**
   * Requests the specified dependency asynchronously, with caching.
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
   */ getDependency(type, index) {
        const cacheKey = type + ":" + index;
        let dependency = this.cache.get(cacheKey);
        if (!dependency) {
            switch(type){
                case "scene":
                    dependency = this.loadScene(index);
                    break;
                case "node":
                    dependency = this._invokeOne(function(ext) {
                        return ext.loadNode && ext.loadNode(index);
                    });
                    break;
                case "mesh":
                    dependency = this._invokeOne(function(ext) {
                        return ext.loadMesh && ext.loadMesh(index);
                    });
                    break;
                case "accessor":
                    dependency = this.loadAccessor(index);
                    break;
                case "bufferView":
                    dependency = this._invokeOne(function(ext) {
                        return ext.loadBufferView && ext.loadBufferView(index);
                    });
                    break;
                case "buffer":
                    dependency = this.loadBuffer(index);
                    break;
                case "material":
                    dependency = this._invokeOne(function(ext) {
                        return ext.loadMaterial && ext.loadMaterial(index);
                    });
                    break;
                case "texture":
                    dependency = this._invokeOne(function(ext) {
                        return ext.loadTexture && ext.loadTexture(index);
                    });
                    break;
                case "skin":
                    dependency = this.loadSkin(index);
                    break;
                case "animation":
                    dependency = this._invokeOne(function(ext) {
                        return ext.loadAnimation && ext.loadAnimation(index);
                    });
                    break;
                case "camera":
                    dependency = this.loadCamera(index);
                    break;
                default:
                    dependency = this._invokeOne(function(ext) {
                        return ext != this && ext.getDependency && ext.getDependency(type, index);
                    });
                    if (!dependency) {
                        throw new Error("Unknown type: " + type);
                    }
                    break;
            }
            this.cache.add(cacheKey, dependency);
        }
        return dependency;
    }
    /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */ getDependencies(type) {
        let dependencies = this.cache.get(type);
        if (!dependencies) {
            const parser = this;
            const defs = this.json[type + (type === "mesh" ? "es" : "s")] || [];
            dependencies = Promise.all(defs.map(function(def, index) {
                return parser.getDependency(type, index);
            }));
            this.cache.add(type, dependencies);
        }
        return dependencies;
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */ loadBuffer(bufferIndex) {
        const bufferDef = this.json.buffers[bufferIndex];
        const loader = this.fileLoader;
        if (bufferDef.type && bufferDef.type !== "arraybuffer") {
            throw new Error("THREE.GLTFLoader: " + bufferDef.type + " buffer type is not supported.");
        }
        if (bufferDef.uri === void 0 && bufferIndex === 0) {
            return Promise.resolve(this.extensions[EXTENSIONS.KHR_BINARY_GLTF].body);
        }
        const options = this.options;
        return new Promise(function(resolve, reject) {
            loader.load(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoaderUtils"].resolveURL(bufferDef.uri, options.path), resolve, void 0, function() {
                reject(new Error('THREE.GLTFLoader: Failed to load buffer "' + bufferDef.uri + '".'));
            });
        });
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */ loadBufferView(bufferViewIndex) {
        const bufferViewDef = this.json.bufferViews[bufferViewIndex];
        return this.getDependency("buffer", bufferViewDef.buffer).then(function(buffer) {
            const byteLength = bufferViewDef.byteLength || 0;
            const byteOffset = bufferViewDef.byteOffset || 0;
            return buffer.slice(byteOffset, byteOffset + byteLength);
        });
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */ loadAccessor(accessorIndex) {
        const parser = this;
        const json = this.json;
        const accessorDef = this.json.accessors[accessorIndex];
        if (accessorDef.bufferView === void 0 && accessorDef.sparse === void 0) {
            const itemSize = WEBGL_TYPE_SIZES[accessorDef.type];
            const TypedArray = WEBGL_COMPONENT_TYPES[accessorDef.componentType];
            const normalized = accessorDef.normalized === true;
            const array = new TypedArray(accessorDef.count * itemSize);
            return Promise.resolve(new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](array, itemSize, normalized));
        }
        const pendingBufferViews = [];
        if (accessorDef.bufferView !== void 0) {
            pendingBufferViews.push(this.getDependency("bufferView", accessorDef.bufferView));
        } else {
            pendingBufferViews.push(null);
        }
        if (accessorDef.sparse !== void 0) {
            pendingBufferViews.push(this.getDependency("bufferView", accessorDef.sparse.indices.bufferView));
            pendingBufferViews.push(this.getDependency("bufferView", accessorDef.sparse.values.bufferView));
        }
        return Promise.all(pendingBufferViews).then(function(bufferViews) {
            const bufferView = bufferViews[0];
            const itemSize = WEBGL_TYPE_SIZES[accessorDef.type];
            const TypedArray = WEBGL_COMPONENT_TYPES[accessorDef.componentType];
            const elementBytes = TypedArray.BYTES_PER_ELEMENT;
            const itemBytes = elementBytes * itemSize;
            const byteOffset = accessorDef.byteOffset || 0;
            const byteStride = accessorDef.bufferView !== void 0 ? json.bufferViews[accessorDef.bufferView].byteStride : void 0;
            const normalized = accessorDef.normalized === true;
            let array, bufferAttribute;
            if (byteStride && byteStride !== itemBytes) {
                const ibSlice = Math.floor(byteOffset / byteStride);
                const ibCacheKey = "InterleavedBuffer:" + accessorDef.bufferView + ":" + accessorDef.componentType + ":" + ibSlice + ":" + accessorDef.count;
                let ib = parser.cache.get(ibCacheKey);
                if (!ib) {
                    array = new TypedArray(bufferView, ibSlice * byteStride, accessorDef.count * byteStride / elementBytes);
                    ib = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterleavedBuffer"](array, byteStride / elementBytes);
                    parser.cache.add(ibCacheKey, ib);
                }
                bufferAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterleavedBufferAttribute"](ib, itemSize, byteOffset % byteStride / elementBytes, normalized);
            } else {
                if (bufferView === null) {
                    array = new TypedArray(accessorDef.count * itemSize);
                } else {
                    array = new TypedArray(bufferView, byteOffset, accessorDef.count * itemSize);
                }
                bufferAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](array, itemSize, normalized);
            }
            if (accessorDef.sparse !== void 0) {
                const itemSizeIndices = WEBGL_TYPE_SIZES.SCALAR;
                const TypedArrayIndices = WEBGL_COMPONENT_TYPES[accessorDef.sparse.indices.componentType];
                const byteOffsetIndices = accessorDef.sparse.indices.byteOffset || 0;
                const byteOffsetValues = accessorDef.sparse.values.byteOffset || 0;
                const sparseIndices = new TypedArrayIndices(bufferViews[1], byteOffsetIndices, accessorDef.sparse.count * itemSizeIndices);
                const sparseValues = new TypedArray(bufferViews[2], byteOffsetValues, accessorDef.sparse.count * itemSize);
                if (bufferView !== null) {
                    bufferAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](bufferAttribute.array.slice(), bufferAttribute.itemSize, bufferAttribute.normalized);
                }
                for(let i = 0, il = sparseIndices.length; i < il; i++){
                    const index = sparseIndices[i];
                    bufferAttribute.setX(index, sparseValues[i * itemSize]);
                    if (itemSize >= 2) bufferAttribute.setY(index, sparseValues[i * itemSize + 1]);
                    if (itemSize >= 3) bufferAttribute.setZ(index, sparseValues[i * itemSize + 2]);
                    if (itemSize >= 4) bufferAttribute.setW(index, sparseValues[i * itemSize + 3]);
                    if (itemSize >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
                }
            }
            return bufferAttribute;
        });
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture|null>}
   */ loadTexture(textureIndex) {
        const json = this.json;
        const options = this.options;
        const textureDef = json.textures[textureIndex];
        const sourceIndex = textureDef.source;
        const sourceDef = json.images[sourceIndex];
        let loader = this.textureLoader;
        if (sourceDef.uri) {
            const handler = options.manager.getHandler(sourceDef.uri);
            if (handler !== null) loader = handler;
        }
        return this.loadTextureImage(textureIndex, sourceIndex, loader);
    }
    loadTextureImage(textureIndex, sourceIndex, loader) {
        const parser = this;
        const json = this.json;
        const textureDef = json.textures[textureIndex];
        const sourceDef = json.images[sourceIndex];
        const cacheKey = (sourceDef.uri || sourceDef.bufferView) + ":" + textureDef.sampler;
        if (this.textureCache[cacheKey]) {
            return this.textureCache[cacheKey];
        }
        const promise = this.loadImageSource(sourceIndex, loader).then(function(texture) {
            texture.flipY = false;
            texture.name = textureDef.name || sourceDef.name || "";
            if (texture.name === "" && typeof sourceDef.uri === "string" && sourceDef.uri.startsWith("data:image/") === false) {
                texture.name = sourceDef.uri;
            }
            const samplers = json.samplers || {};
            const sampler = samplers[textureDef.sampler] || {};
            texture.magFilter = WEBGL_FILTERS[sampler.magFilter] || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"];
            texture.minFilter = WEBGL_FILTERS[sampler.minFilter] || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearMipmapLinearFilter"];
            texture.wrapS = WEBGL_WRAPPINGS[sampler.wrapS] || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
            texture.wrapT = WEBGL_WRAPPINGS[sampler.wrapT] || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
            parser.associations.set(texture, {
                textures: textureIndex
            });
            return texture;
        }).catch(function() {
            return null;
        });
        this.textureCache[cacheKey] = promise;
        return promise;
    }
    loadImageSource(sourceIndex, loader) {
        const parser = this;
        const json = this.json;
        const options = this.options;
        if (this.sourceCache[sourceIndex] !== void 0) {
            return this.sourceCache[sourceIndex].then((texture)=>texture.clone());
        }
        const sourceDef = json.images[sourceIndex];
        const URL = self.URL || self.webkitURL;
        let sourceURI = sourceDef.uri || "";
        let isObjectURL = false;
        if (sourceDef.bufferView !== void 0) {
            sourceURI = parser.getDependency("bufferView", sourceDef.bufferView).then(function(bufferView) {
                isObjectURL = true;
                const blob = new Blob([
                    bufferView
                ], {
                    type: sourceDef.mimeType
                });
                sourceURI = URL.createObjectURL(blob);
                return sourceURI;
            });
        } else if (sourceDef.uri === void 0) {
            throw new Error("THREE.GLTFLoader: Image " + sourceIndex + " is missing URI and bufferView");
        }
        const promise = Promise.resolve(sourceURI).then(function(sourceURI2) {
            return new Promise(function(resolve, reject) {
                let onLoad = resolve;
                if (loader.isImageBitmapLoader === true) {
                    onLoad = function(imageBitmap) {
                        const texture = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Texture"](imageBitmap);
                        texture.needsUpdate = true;
                        resolve(texture);
                    };
                }
                loader.load(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoaderUtils"].resolveURL(sourceURI2, options.path), onLoad, void 0, reject);
            });
        }).then(function(texture) {
            if (isObjectURL === true) {
                URL.revokeObjectURL(sourceURI);
            }
            assignExtrasToUserData(texture, sourceDef);
            texture.userData.mimeType = sourceDef.mimeType || getImageURIMimeType(sourceDef.uri);
            return texture;
        }).catch(function(error) {
            console.error("THREE.GLTFLoader: Couldn't load texture", sourceURI);
            throw error;
        });
        this.sourceCache[sourceIndex] = promise;
        return promise;
    }
    /**
   * Asynchronously assigns a texture to the given material parameters.
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @return {Promise<Texture>}
   */ assignTexture(materialParams, mapName, mapDef, colorSpace) {
        const parser = this;
        return this.getDependency("texture", mapDef.index).then(function(texture) {
            if (!texture) return null;
            if (mapDef.texCoord !== void 0 && mapDef.texCoord > 0) {
                texture = texture.clone();
                texture.channel = mapDef.texCoord;
            }
            if (parser.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM]) {
                const transform = mapDef.extensions !== void 0 ? mapDef.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM] : void 0;
                if (transform) {
                    const gltfReference = parser.associations.get(texture);
                    texture = parser.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM].extendTexture(texture, transform);
                    parser.associations.set(texture, gltfReference);
                }
            }
            if (colorSpace !== void 0) {
                if (typeof colorSpace === "number") colorSpace = colorSpace === sRGBEncoding ? SRGBColorSpace : LinearSRGBColorSpace;
                if ("colorSpace" in texture) texture.colorSpace = colorSpace;
                else texture.encoding = colorSpace === SRGBColorSpace ? sRGBEncoding : LinearEncoding;
            }
            materialParams[mapName] = texture;
            return texture;
        });
    }
    /**
   * Assigns final material to a Mesh, Line, or Points instance. The instance
   * already has a material (generated from the glTF material options alone)
   * but reuse of the same glTF material may require multiple threejs materials
   * to accommodate different primitive types, defines, etc. New materials will
   * be created if necessary, and reused from a cache.
   * @param  {Object3D} mesh Mesh, Line, or Points instance.
   */ assignFinalMaterial(mesh) {
        const geometry = mesh.geometry;
        let material = mesh.material;
        const useDerivativeTangents = geometry.attributes.tangent === void 0;
        const useVertexColors = geometry.attributes.color !== void 0;
        const useFlatShading = geometry.attributes.normal === void 0;
        if (mesh.isPoints) {
            const cacheKey = "PointsMaterial:" + material.uuid;
            let pointsMaterial = this.cache.get(cacheKey);
            if (!pointsMaterial) {
                pointsMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointsMaterial"]();
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Material"].prototype.copy.call(pointsMaterial, material);
                pointsMaterial.color.copy(material.color);
                pointsMaterial.map = material.map;
                pointsMaterial.sizeAttenuation = false;
                this.cache.add(cacheKey, pointsMaterial);
            }
            material = pointsMaterial;
        } else if (mesh.isLine) {
            const cacheKey = "LineBasicMaterial:" + material.uuid;
            let lineMaterial = this.cache.get(cacheKey);
            if (!lineMaterial) {
                lineMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]();
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Material"].prototype.copy.call(lineMaterial, material);
                lineMaterial.color.copy(material.color);
                lineMaterial.map = material.map;
                this.cache.add(cacheKey, lineMaterial);
            }
            material = lineMaterial;
        }
        if (useDerivativeTangents || useVertexColors || useFlatShading) {
            let cacheKey = "ClonedMaterial:" + material.uuid + ":";
            if (useDerivativeTangents) cacheKey += "derivative-tangents:";
            if (useVertexColors) cacheKey += "vertex-colors:";
            if (useFlatShading) cacheKey += "flat-shading:";
            let cachedMaterial = this.cache.get(cacheKey);
            if (!cachedMaterial) {
                cachedMaterial = material.clone();
                if (useVertexColors) cachedMaterial.vertexColors = true;
                if (useFlatShading) cachedMaterial.flatShading = true;
                if (useDerivativeTangents) {
                    if (cachedMaterial.normalScale) cachedMaterial.normalScale.y *= -1;
                    if (cachedMaterial.clearcoatNormalScale) cachedMaterial.clearcoatNormalScale.y *= -1;
                }
                this.cache.add(cacheKey, cachedMaterial);
                this.associations.set(cachedMaterial, this.associations.get(material));
            }
            material = cachedMaterial;
        }
        mesh.material = material;
    }
    getMaterialType() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"];
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */ loadMaterial(materialIndex) {
        const parser = this;
        const json = this.json;
        const extensions = this.extensions;
        const materialDef = json.materials[materialIndex];
        let materialType;
        const materialParams = {};
        const materialExtensions = materialDef.extensions || {};
        const pending = [];
        if (materialExtensions[EXTENSIONS.KHR_MATERIALS_UNLIT]) {
            const kmuExtension = extensions[EXTENSIONS.KHR_MATERIALS_UNLIT];
            materialType = kmuExtension.getMaterialType();
            pending.push(kmuExtension.extendParams(materialParams, materialDef, parser));
        } else {
            const metallicRoughness = materialDef.pbrMetallicRoughness || {};
            materialParams.color = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](1, 1, 1);
            materialParams.opacity = 1;
            if (Array.isArray(metallicRoughness.baseColorFactor)) {
                const array = metallicRoughness.baseColorFactor;
                materialParams.color.setRGB(array[0], array[1], array[2], LinearSRGBColorSpace);
                materialParams.opacity = array[3];
            }
            if (metallicRoughness.baseColorTexture !== void 0) {
                pending.push(parser.assignTexture(materialParams, "map", metallicRoughness.baseColorTexture, SRGBColorSpace));
            }
            materialParams.metalness = metallicRoughness.metallicFactor !== void 0 ? metallicRoughness.metallicFactor : 1;
            materialParams.roughness = metallicRoughness.roughnessFactor !== void 0 ? metallicRoughness.roughnessFactor : 1;
            if (metallicRoughness.metallicRoughnessTexture !== void 0) {
                pending.push(parser.assignTexture(materialParams, "metalnessMap", metallicRoughness.metallicRoughnessTexture));
                pending.push(parser.assignTexture(materialParams, "roughnessMap", metallicRoughness.metallicRoughnessTexture));
            }
            materialType = this._invokeOne(function(ext) {
                return ext.getMaterialType && ext.getMaterialType(materialIndex);
            });
            pending.push(Promise.all(this._invokeAll(function(ext) {
                return ext.extendMaterialParams && ext.extendMaterialParams(materialIndex, materialParams);
            })));
        }
        if (materialDef.doubleSided === true) {
            materialParams.side = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"];
        }
        const alphaMode = materialDef.alphaMode || ALPHA_MODES.OPAQUE;
        if (alphaMode === ALPHA_MODES.BLEND) {
            materialParams.transparent = true;
            materialParams.depthWrite = false;
        } else {
            materialParams.transparent = false;
            if (alphaMode === ALPHA_MODES.MASK) {
                materialParams.alphaTest = materialDef.alphaCutoff !== void 0 ? materialDef.alphaCutoff : 0.5;
            }
        }
        if (materialDef.normalTexture !== void 0 && materialType !== __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]) {
            pending.push(parser.assignTexture(materialParams, "normalMap", materialDef.normalTexture));
            materialParams.normalScale = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](1, 1);
            if (materialDef.normalTexture.scale !== void 0) {
                const scale = materialDef.normalTexture.scale;
                materialParams.normalScale.set(scale, scale);
            }
        }
        if (materialDef.occlusionTexture !== void 0 && materialType !== __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]) {
            pending.push(parser.assignTexture(materialParams, "aoMap", materialDef.occlusionTexture));
            if (materialDef.occlusionTexture.strength !== void 0) {
                materialParams.aoMapIntensity = materialDef.occlusionTexture.strength;
            }
        }
        if (materialDef.emissiveFactor !== void 0 && materialType !== __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]) {
            const emissiveFactor = materialDef.emissiveFactor;
            materialParams.emissive = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]().setRGB(emissiveFactor[0], emissiveFactor[1], emissiveFactor[2], LinearSRGBColorSpace);
        }
        if (materialDef.emissiveTexture !== void 0 && materialType !== __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]) {
            pending.push(parser.assignTexture(materialParams, "emissiveMap", materialDef.emissiveTexture, SRGBColorSpace));
        }
        return Promise.all(pending).then(function() {
            const material = new materialType(materialParams);
            if (materialDef.name) material.name = materialDef.name;
            assignExtrasToUserData(material, materialDef);
            parser.associations.set(material, {
                materials: materialIndex
            });
            if (materialDef.extensions) addUnknownExtensionsToUserData(extensions, material, materialDef);
            return material;
        });
    }
    /** When Object3D instances are targeted by animation, they need unique names. */ createUniqueName(originalName) {
        const sanitizedName = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PropertyBinding"].sanitizeNodeName(originalName || "");
        if (sanitizedName in this.nodeNamesUsed) {
            return sanitizedName + "_" + ++this.nodeNamesUsed[sanitizedName];
        } else {
            this.nodeNamesUsed[sanitizedName] = 0;
            return sanitizedName;
        }
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */ loadGeometries(primitives) {
        const parser = this;
        const extensions = this.extensions;
        const cache = this.primitiveCache;
        function createDracoPrimitive(primitive) {
            return extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(primitive, parser).then(function(geometry) {
                return addPrimitiveAttributes(geometry, primitive, parser);
            });
        }
        const pending = [];
        for(let i = 0, il = primitives.length; i < il; i++){
            const primitive = primitives[i];
            const cacheKey = createPrimitiveKey(primitive);
            const cached = cache[cacheKey];
            if (cached) {
                pending.push(cached.promise);
            } else {
                let geometryPromise;
                if (primitive.extensions && primitive.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION]) {
                    geometryPromise = createDracoPrimitive(primitive);
                } else {
                    geometryPromise = addPrimitiveAttributes(new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"](), primitive, parser);
                }
                cache[cacheKey] = {
                    primitive,
                    promise: geometryPromise
                };
                pending.push(geometryPromise);
            }
        }
        return Promise.all(pending);
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */ loadMesh(meshIndex) {
        const parser = this;
        const json = this.json;
        const extensions = this.extensions;
        const meshDef = json.meshes[meshIndex];
        const primitives = meshDef.primitives;
        const pending = [];
        for(let i = 0, il = primitives.length; i < il; i++){
            const material = primitives[i].material === void 0 ? createDefaultMaterial(this.cache) : this.getDependency("material", primitives[i].material);
            pending.push(material);
        }
        pending.push(parser.loadGeometries(primitives));
        return Promise.all(pending).then(function(results) {
            const materials = results.slice(0, results.length - 1);
            const geometries = results[results.length - 1];
            const meshes = [];
            for(let i = 0, il = geometries.length; i < il; i++){
                const geometry = geometries[i];
                const primitive = primitives[i];
                let mesh;
                const material = materials[i];
                if (primitive.mode === WEBGL_CONSTANTS.TRIANGLES || primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP || primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN || primitive.mode === void 0) {
                    mesh = meshDef.isSkinnedMesh === true ? new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkinnedMesh"](geometry, material) : new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
                    if (mesh.isSkinnedMesh === true) {
                        mesh.normalizeSkinWeights();
                    }
                    if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP) {
                        mesh.geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$utils$2f$BufferGeometryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toTrianglesDrawMode"])(mesh.geometry, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TriangleStripDrawMode"]);
                    } else if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN) {
                        mesh.geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$utils$2f$BufferGeometryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toTrianglesDrawMode"])(mesh.geometry, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TriangleFanDrawMode"]);
                    }
                } else if (primitive.mode === WEBGL_CONSTANTS.LINES) {
                    mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineSegments"](geometry, material);
                } else if (primitive.mode === WEBGL_CONSTANTS.LINE_STRIP) {
                    mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](geometry, material);
                } else if (primitive.mode === WEBGL_CONSTANTS.LINE_LOOP) {
                    mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineLoop"](geometry, material);
                } else if (primitive.mode === WEBGL_CONSTANTS.POINTS) {
                    mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Points"](geometry, material);
                } else {
                    throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + primitive.mode);
                }
                if (Object.keys(mesh.geometry.morphAttributes).length > 0) {
                    updateMorphTargets(mesh, meshDef);
                }
                mesh.name = parser.createUniqueName(meshDef.name || "mesh_" + meshIndex);
                assignExtrasToUserData(mesh, meshDef);
                if (primitive.extensions) addUnknownExtensionsToUserData(extensions, mesh, primitive);
                parser.assignFinalMaterial(mesh);
                meshes.push(mesh);
            }
            for(let i = 0, il = meshes.length; i < il; i++){
                parser.associations.set(meshes[i], {
                    meshes: meshIndex,
                    primitives: i
                });
            }
            if (meshes.length === 1) {
                if (meshDef.extensions) addUnknownExtensionsToUserData(extensions, meshes[0], meshDef);
                return meshes[0];
            }
            const group = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            if (meshDef.extensions) addUnknownExtensionsToUserData(extensions, group, meshDef);
            parser.associations.set(group, {
                meshes: meshIndex
            });
            for(let i = 0, il = meshes.length; i < il; i++){
                group.add(meshes[i]);
            }
            return group;
        });
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */ loadCamera(cameraIndex) {
        let camera;
        const cameraDef = this.json.cameras[cameraIndex];
        const params = cameraDef[cameraDef.type];
        if (!params) {
            console.warn("THREE.GLTFLoader: Missing camera parameters.");
            return;
        }
        if (cameraDef.type === "perspective") {
            camera = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].radToDeg(params.yfov), params.aspectRatio || 1, params.znear || 1, params.zfar || 2e6);
        } else if (cameraDef.type === "orthographic") {
            camera = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"](-params.xmag, params.xmag, params.ymag, -params.ymag, params.znear, params.zfar);
        }
        if (cameraDef.name) camera.name = this.createUniqueName(cameraDef.name);
        assignExtrasToUserData(camera, cameraDef);
        return Promise.resolve(camera);
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */ loadSkin(skinIndex) {
        const skinDef = this.json.skins[skinIndex];
        const pending = [];
        for(let i = 0, il = skinDef.joints.length; i < il; i++){
            pending.push(this._loadNodeShallow(skinDef.joints[i]));
        }
        if (skinDef.inverseBindMatrices !== void 0) {
            pending.push(this.getDependency("accessor", skinDef.inverseBindMatrices));
        } else {
            pending.push(null);
        }
        return Promise.all(pending).then(function(results) {
            const inverseBindMatrices = results.pop();
            const jointNodes = results;
            const bones = [];
            const boneInverses = [];
            for(let i = 0, il = jointNodes.length; i < il; i++){
                const jointNode = jointNodes[i];
                if (jointNode) {
                    bones.push(jointNode);
                    const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
                    if (inverseBindMatrices !== null) {
                        mat.fromArray(inverseBindMatrices.array, i * 16);
                    }
                    boneInverses.push(mat);
                } else {
                    console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', skinDef.joints[i]);
                }
            }
            return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"](bones, boneInverses);
        });
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */ loadAnimation(animationIndex) {
        const json = this.json;
        const parser = this;
        const animationDef = json.animations[animationIndex];
        const animationName = animationDef.name ? animationDef.name : "animation_" + animationIndex;
        const pendingNodes = [];
        const pendingInputAccessors = [];
        const pendingOutputAccessors = [];
        const pendingSamplers = [];
        const pendingTargets = [];
        for(let i = 0, il = animationDef.channels.length; i < il; i++){
            const channel = animationDef.channels[i];
            const sampler = animationDef.samplers[channel.sampler];
            const target = channel.target;
            const name = target.node;
            const input = animationDef.parameters !== void 0 ? animationDef.parameters[sampler.input] : sampler.input;
            const output = animationDef.parameters !== void 0 ? animationDef.parameters[sampler.output] : sampler.output;
            if (target.node === void 0) continue;
            pendingNodes.push(this.getDependency("node", name));
            pendingInputAccessors.push(this.getDependency("accessor", input));
            pendingOutputAccessors.push(this.getDependency("accessor", output));
            pendingSamplers.push(sampler);
            pendingTargets.push(target);
        }
        return Promise.all([
            Promise.all(pendingNodes),
            Promise.all(pendingInputAccessors),
            Promise.all(pendingOutputAccessors),
            Promise.all(pendingSamplers),
            Promise.all(pendingTargets)
        ]).then(function(dependencies) {
            const nodes = dependencies[0];
            const inputAccessors = dependencies[1];
            const outputAccessors = dependencies[2];
            const samplers = dependencies[3];
            const targets = dependencies[4];
            const tracks = [];
            for(let i = 0, il = nodes.length; i < il; i++){
                const node = nodes[i];
                const inputAccessor = inputAccessors[i];
                const outputAccessor = outputAccessors[i];
                const sampler = samplers[i];
                const target = targets[i];
                if (node === void 0) continue;
                if (node.updateMatrix) {
                    node.updateMatrix();
                }
                const createdTracks = parser._createAnimationTracks(node, inputAccessor, outputAccessor, sampler, target);
                if (createdTracks) {
                    for(let k = 0; k < createdTracks.length; k++){
                        tracks.push(createdTracks[k]);
                    }
                }
            }
            return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationClip"](animationName, void 0, tracks);
        });
    }
    createNodeMesh(nodeIndex) {
        const json = this.json;
        const parser = this;
        const nodeDef = json.nodes[nodeIndex];
        if (nodeDef.mesh === void 0) return null;
        return parser.getDependency("mesh", nodeDef.mesh).then(function(mesh) {
            const node = parser._getNodeRef(parser.meshCache, nodeDef.mesh, mesh);
            if (nodeDef.weights !== void 0) {
                node.traverse(function(o) {
                    if (!o.isMesh) return;
                    for(let i = 0, il = nodeDef.weights.length; i < il; i++){
                        o.morphTargetInfluences[i] = nodeDef.weights[i];
                    }
                });
            }
            return node;
        });
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */ loadNode(nodeIndex) {
        const json = this.json;
        const parser = this;
        const nodeDef = json.nodes[nodeIndex];
        const nodePending = parser._loadNodeShallow(nodeIndex);
        const childPending = [];
        const childrenDef = nodeDef.children || [];
        for(let i = 0, il = childrenDef.length; i < il; i++){
            childPending.push(parser.getDependency("node", childrenDef[i]));
        }
        const skeletonPending = nodeDef.skin === void 0 ? Promise.resolve(null) : parser.getDependency("skin", nodeDef.skin);
        return Promise.all([
            nodePending,
            Promise.all(childPending),
            skeletonPending
        ]).then(function(results) {
            const node = results[0];
            const children = results[1];
            const skeleton = results[2];
            if (skeleton !== null) {
                node.traverse(function(mesh) {
                    if (!mesh.isSkinnedMesh) return;
                    mesh.bind(skeleton, _identityMatrix);
                });
            }
            for(let i = 0, il = children.length; i < il; i++){
                node.add(children[i]);
            }
            return node;
        });
    }
    // ._loadNodeShallow() parses a single node.
    // skin and child nodes are created and added in .loadNode() (no '_' prefix).
    _loadNodeShallow(nodeIndex) {
        const json = this.json;
        const extensions = this.extensions;
        const parser = this;
        if (this.nodeCache[nodeIndex] !== void 0) {
            return this.nodeCache[nodeIndex];
        }
        const nodeDef = json.nodes[nodeIndex];
        const nodeName = nodeDef.name ? parser.createUniqueName(nodeDef.name) : "";
        const pending = [];
        const meshPromise = parser._invokeOne(function(ext) {
            return ext.createNodeMesh && ext.createNodeMesh(nodeIndex);
        });
        if (meshPromise) {
            pending.push(meshPromise);
        }
        if (nodeDef.camera !== void 0) {
            pending.push(parser.getDependency("camera", nodeDef.camera).then(function(camera) {
                return parser._getNodeRef(parser.cameraCache, nodeDef.camera, camera);
            }));
        }
        parser._invokeAll(function(ext) {
            return ext.createNodeAttachment && ext.createNodeAttachment(nodeIndex);
        }).forEach(function(promise) {
            pending.push(promise);
        });
        this.nodeCache[nodeIndex] = Promise.all(pending).then(function(objects) {
            let node;
            if (nodeDef.isBone === true) {
                node = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bone"]();
            } else if (objects.length > 1) {
                node = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            } else if (objects.length === 1) {
                node = objects[0];
            } else {
                node = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Object3D"]();
            }
            if (node !== objects[0]) {
                for(let i = 0, il = objects.length; i < il; i++){
                    node.add(objects[i]);
                }
            }
            if (nodeDef.name) {
                node.userData.name = nodeDef.name;
                node.name = nodeName;
            }
            assignExtrasToUserData(node, nodeDef);
            if (nodeDef.extensions) addUnknownExtensionsToUserData(extensions, node, nodeDef);
            if (nodeDef.matrix !== void 0) {
                const matrix = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
                matrix.fromArray(nodeDef.matrix);
                node.applyMatrix4(matrix);
            } else {
                if (nodeDef.translation !== void 0) {
                    node.position.fromArray(nodeDef.translation);
                }
                if (nodeDef.rotation !== void 0) {
                    node.quaternion.fromArray(nodeDef.rotation);
                }
                if (nodeDef.scale !== void 0) {
                    node.scale.fromArray(nodeDef.scale);
                }
            }
            if (!parser.associations.has(node)) {
                parser.associations.set(node, {});
            }
            parser.associations.get(node).nodes = nodeIndex;
            return node;
        });
        return this.nodeCache[nodeIndex];
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */ loadScene(sceneIndex) {
        const extensions = this.extensions;
        const sceneDef = this.json.scenes[sceneIndex];
        const parser = this;
        const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
        if (sceneDef.name) scene.name = parser.createUniqueName(sceneDef.name);
        assignExtrasToUserData(scene, sceneDef);
        if (sceneDef.extensions) addUnknownExtensionsToUserData(extensions, scene, sceneDef);
        const nodeIds = sceneDef.nodes || [];
        const pending = [];
        for(let i = 0, il = nodeIds.length; i < il; i++){
            pending.push(parser.getDependency("node", nodeIds[i]));
        }
        return Promise.all(pending).then(function(nodes) {
            for(let i = 0, il = nodes.length; i < il; i++){
                scene.add(nodes[i]);
            }
            const reduceAssociations = (node)=>{
                const reducedAssociations = /* @__PURE__ */ new Map();
                for (const [key, value] of parser.associations){
                    if (key instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Material"] || key instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Texture"]) {
                        reducedAssociations.set(key, value);
                    }
                }
                node.traverse((node2)=>{
                    const mappings = parser.associations.get(node2);
                    if (mappings != null) {
                        reducedAssociations.set(node2, mappings);
                    }
                });
                return reducedAssociations;
            };
            parser.associations = reduceAssociations(scene);
            return scene;
        });
    }
    _createAnimationTracks(node, inputAccessor, outputAccessor, sampler, target) {
        const tracks = [];
        const targetName = node.name ? node.name : node.uuid;
        const targetNames = [];
        if (PATH_PROPERTIES[target.path] === PATH_PROPERTIES.weights) {
            node.traverse(function(object) {
                if (object.morphTargetInfluences) {
                    targetNames.push(object.name ? object.name : object.uuid);
                }
            });
        } else {
            targetNames.push(targetName);
        }
        let TypedKeyframeTrack;
        switch(PATH_PROPERTIES[target.path]){
            case PATH_PROPERTIES.weights:
                TypedKeyframeTrack = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberKeyframeTrack"];
                break;
            case PATH_PROPERTIES.rotation:
                TypedKeyframeTrack = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuaternionKeyframeTrack"];
                break;
            case PATH_PROPERTIES.position:
            case PATH_PROPERTIES.scale:
                TypedKeyframeTrack = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VectorKeyframeTrack"];
                break;
            default:
                switch(outputAccessor.itemSize){
                    case 1:
                        TypedKeyframeTrack = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberKeyframeTrack"];
                        break;
                    case 2:
                    case 3:
                    default:
                        TypedKeyframeTrack = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VectorKeyframeTrack"];
                        break;
                }
                break;
        }
        const interpolation = sampler.interpolation !== void 0 ? INTERPOLATION[sampler.interpolation] : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterpolateLinear"];
        const outputArray = this._getArrayFromAccessor(outputAccessor);
        for(let j = 0, jl = targetNames.length; j < jl; j++){
            const track = new TypedKeyframeTrack(targetNames[j] + "." + PATH_PROPERTIES[target.path], inputAccessor.array, outputArray, interpolation);
            if (sampler.interpolation === "CUBICSPLINE") {
                this._createCubicSplineTrackInterpolant(track);
            }
            tracks.push(track);
        }
        return tracks;
    }
    _getArrayFromAccessor(accessor) {
        let outputArray = accessor.array;
        if (accessor.normalized) {
            const scale = getNormalizedComponentScale(outputArray.constructor);
            const scaled = new Float32Array(outputArray.length);
            for(let j = 0, jl = outputArray.length; j < jl; j++){
                scaled[j] = outputArray[j] * scale;
            }
            outputArray = scaled;
        }
        return outputArray;
    }
    _createCubicSplineTrackInterpolant(track) {
        track.createInterpolant = function InterpolantFactoryMethodGLTFCubicSpline(result) {
            const interpolantType = this instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuaternionKeyframeTrack"] ? GLTFCubicSplineQuaternionInterpolant : GLTFCubicSplineInterpolant;
            return new interpolantType(this.times, this.values, this.getValueSize() / 3, result);
        };
        track.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true;
    }
    constructor(json = {}, options = {}){
        this.json = json;
        this.extensions = {};
        this.plugins = {};
        this.options = options;
        this.cache = new GLTFRegistry();
        this.associations = /* @__PURE__ */ new Map();
        this.primitiveCache = {};
        this.nodeCache = {};
        this.meshCache = {
            refs: {},
            uses: {}
        };
        this.cameraCache = {
            refs: {},
            uses: {}
        };
        this.lightCache = {
            refs: {},
            uses: {}
        };
        this.sourceCache = {};
        this.textureCache = {};
        this.nodeNamesUsed = {};
        let isSafari = false;
        let isFirefox = false;
        let firefoxVersion = -1;
        if (typeof navigator !== "undefined" && typeof navigator.userAgent !== "undefined") {
            isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === true;
            isFirefox = navigator.userAgent.indexOf("Firefox") > -1;
            firefoxVersion = isFirefox ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1;
        }
        if (typeof createImageBitmap === "undefined" || isSafari || isFirefox && firefoxVersion < 98) {
            this.textureLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextureLoader"](this.options.manager);
        } else {
            this.textureLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageBitmapLoader"](this.options.manager);
        }
        this.textureLoader.setCrossOrigin(this.options.crossOrigin);
        this.textureLoader.setRequestHeader(this.options.requestHeader);
        this.fileLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileLoader"](this.options.manager);
        this.fileLoader.setResponseType("arraybuffer");
        if (this.options.crossOrigin === "use-credentials") {
            this.fileLoader.setWithCredentials(true);
        }
    }
}
function computeBounds(geometry, primitiveDef, parser) {
    const attributes = primitiveDef.attributes;
    const box = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]();
    if (attributes.POSITION !== void 0) {
        const accessor = parser.json.accessors[attributes.POSITION];
        const min = accessor.min;
        const max = accessor.max;
        if (min !== void 0 && max !== void 0) {
            box.set(new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](min[0], min[1], min[2]), new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](max[0], max[1], max[2]));
            if (accessor.normalized) {
                const boxScale = getNormalizedComponentScale(WEBGL_COMPONENT_TYPES[accessor.componentType]);
                box.min.multiplyScalar(boxScale);
                box.max.multiplyScalar(boxScale);
            }
        } else {
            console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
            return;
        }
    } else {
        return;
    }
    const targets = primitiveDef.targets;
    if (targets !== void 0) {
        const maxDisplacement = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        const vector = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        for(let i = 0, il = targets.length; i < il; i++){
            const target = targets[i];
            if (target.POSITION !== void 0) {
                const accessor = parser.json.accessors[target.POSITION];
                const min = accessor.min;
                const max = accessor.max;
                if (min !== void 0 && max !== void 0) {
                    vector.setX(Math.max(Math.abs(min[0]), Math.abs(max[0])));
                    vector.setY(Math.max(Math.abs(min[1]), Math.abs(max[1])));
                    vector.setZ(Math.max(Math.abs(min[2]), Math.abs(max[2])));
                    if (accessor.normalized) {
                        const boxScale = getNormalizedComponentScale(WEBGL_COMPONENT_TYPES[accessor.componentType]);
                        vector.multiplyScalar(boxScale);
                    }
                    maxDisplacement.max(vector);
                } else {
                    console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
                }
            }
        }
        box.expandByVector(maxDisplacement);
    }
    geometry.boundingBox = box;
    const sphere = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sphere"]();
    box.getCenter(sphere.center);
    sphere.radius = box.min.distanceTo(box.max) / 2;
    geometry.boundingSphere = sphere;
}
function addPrimitiveAttributes(geometry, primitiveDef, parser) {
    const attributes = primitiveDef.attributes;
    const pending = [];
    function assignAttributeAccessor(accessorIndex, attributeName) {
        return parser.getDependency("accessor", accessorIndex).then(function(accessor) {
            geometry.setAttribute(attributeName, accessor);
        });
    }
    for(const gltfAttributeName in attributes){
        const threeAttributeName = ATTRIBUTES[gltfAttributeName] || gltfAttributeName.toLowerCase();
        if (threeAttributeName in geometry.attributes) continue;
        pending.push(assignAttributeAccessor(attributes[gltfAttributeName], threeAttributeName));
    }
    if (primitiveDef.indices !== void 0 && !geometry.index) {
        const accessor = parser.getDependency("accessor", primitiveDef.indices).then(function(accessor2) {
            geometry.setIndex(accessor2);
        });
        pending.push(accessor);
    }
    assignExtrasToUserData(geometry, primitiveDef);
    computeBounds(geometry, primitiveDef, parser);
    return Promise.all(pending).then(function() {
        return primitiveDef.targets !== void 0 ? addMorphTargets(geometry, primitiveDef.targets, parser) : geometry;
    });
}
;
 //# sourceMappingURL=GLTFLoader.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/loaders/DRACOLoader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DRACOLoader",
    ()=>DRACOLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
const _taskCache = /* @__PURE__ */ new WeakMap();
class DRACOLoader extends __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Loader"] {
    setDecoderPath(path) {
        this.decoderPath = path;
        return this;
    }
    setDecoderConfig(config) {
        this.decoderConfig = config;
        return this;
    }
    setWorkerLimit(workerLimit) {
        this.workerLimit = workerLimit;
        return this;
    }
    load(url, onLoad, onProgress, onError) {
        const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileLoader"](this.manager);
        loader.setPath(this.path);
        loader.setResponseType("arraybuffer");
        loader.setRequestHeader(this.requestHeader);
        loader.setWithCredentials(this.withCredentials);
        loader.load(url, (buffer)=>{
            const taskConfig = {
                attributeIDs: this.defaultAttributeIDs,
                attributeTypes: this.defaultAttributeTypes,
                useUniqueIDs: false
            };
            this.decodeGeometry(buffer, taskConfig).then(onLoad).catch(onError);
        }, onProgress, onError);
    }
    /** @deprecated Kept for backward-compatibility with previous DRACOLoader versions. */ decodeDracoFile(buffer, callback, attributeIDs, attributeTypes) {
        const taskConfig = {
            attributeIDs: attributeIDs || this.defaultAttributeIDs,
            attributeTypes: attributeTypes || this.defaultAttributeTypes,
            useUniqueIDs: !!attributeIDs
        };
        this.decodeGeometry(buffer, taskConfig).then(callback);
    }
    decodeGeometry(buffer, taskConfig) {
        for(const attribute in taskConfig.attributeTypes){
            const type = taskConfig.attributeTypes[attribute];
            if (type.BYTES_PER_ELEMENT !== void 0) {
                taskConfig.attributeTypes[attribute] = type.name;
            }
        }
        const taskKey = JSON.stringify(taskConfig);
        if (_taskCache.has(buffer)) {
            const cachedTask = _taskCache.get(buffer);
            if (cachedTask.key === taskKey) {
                return cachedTask.promise;
            } else if (buffer.byteLength === 0) {
                throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.");
            }
        }
        let worker;
        const taskID = this.workerNextTaskID++;
        const taskCost = buffer.byteLength;
        const geometryPending = this._getWorker(taskID, taskCost).then((_worker)=>{
            worker = _worker;
            return new Promise((resolve, reject)=>{
                worker._callbacks[taskID] = {
                    resolve,
                    reject
                };
                worker.postMessage({
                    type: "decode",
                    id: taskID,
                    taskConfig,
                    buffer
                }, [
                    buffer
                ]);
            });
        }).then((message)=>this._createGeometry(message.geometry));
        geometryPending.catch(()=>true).then(()=>{
            if (worker && taskID) {
                this._releaseTask(worker, taskID);
            }
        });
        _taskCache.set(buffer, {
            key: taskKey,
            promise: geometryPending
        });
        return geometryPending;
    }
    _createGeometry(geometryData) {
        const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        if (geometryData.index) {
            geometry.setIndex(new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](geometryData.index.array, 1));
        }
        for(let i = 0; i < geometryData.attributes.length; i++){
            const attribute = geometryData.attributes[i];
            const name = attribute.name;
            const array = attribute.array;
            const itemSize = attribute.itemSize;
            geometry.setAttribute(name, new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](array, itemSize));
        }
        return geometry;
    }
    _loadLibrary(url, responseType) {
        const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileLoader"](this.manager);
        loader.setPath(this.decoderPath);
        loader.setResponseType(responseType);
        loader.setWithCredentials(this.withCredentials);
        return new Promise((resolve, reject)=>{
            loader.load(url, resolve, void 0, reject);
        });
    }
    preload() {
        this._initDecoder();
        return this;
    }
    _initDecoder() {
        if (this.decoderPending) return this.decoderPending;
        const useJS = typeof WebAssembly !== "object" || this.decoderConfig.type === "js";
        const librariesPending = [];
        if (useJS) {
            librariesPending.push(this._loadLibrary("draco_decoder.js", "text"));
        } else {
            librariesPending.push(this._loadLibrary("draco_wasm_wrapper.js", "text"));
            librariesPending.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"));
        }
        this.decoderPending = Promise.all(librariesPending).then((libraries)=>{
            const jsContent = libraries[0];
            if (!useJS) {
                this.decoderConfig.wasmBinary = libraries[1];
            }
            const fn = DRACOWorker.toString();
            const body = [
                "/* draco decoder */",
                jsContent,
                "",
                "/* worker */",
                fn.substring(fn.indexOf("{") + 1, fn.lastIndexOf("}"))
            ].join("\n");
            this.workerSourceURL = URL.createObjectURL(new Blob([
                body
            ]));
        });
        return this.decoderPending;
    }
    _getWorker(taskID, taskCost) {
        return this._initDecoder().then(()=>{
            if (this.workerPool.length < this.workerLimit) {
                const worker2 = new Worker(this.workerSourceURL);
                worker2._callbacks = {};
                worker2._taskCosts = {};
                worker2._taskLoad = 0;
                worker2.postMessage({
                    type: "init",
                    decoderConfig: this.decoderConfig
                });
                worker2.onmessage = function(e) {
                    const message = e.data;
                    switch(message.type){
                        case "decode":
                            worker2._callbacks[message.id].resolve(message);
                            break;
                        case "error":
                            worker2._callbacks[message.id].reject(message);
                            break;
                        default:
                            console.error('THREE.DRACOLoader: Unexpected message, "' + message.type + '"');
                    }
                };
                this.workerPool.push(worker2);
            } else {
                this.workerPool.sort(function(a, b) {
                    return a._taskLoad > b._taskLoad ? -1 : 1;
                });
            }
            const worker = this.workerPool[this.workerPool.length - 1];
            worker._taskCosts[taskID] = taskCost;
            worker._taskLoad += taskCost;
            return worker;
        });
    }
    _releaseTask(worker, taskID) {
        worker._taskLoad -= worker._taskCosts[taskID];
        delete worker._callbacks[taskID];
        delete worker._taskCosts[taskID];
    }
    debug() {
        console.log("Task load: ", this.workerPool.map((worker)=>worker._taskLoad));
    }
    dispose() {
        for(let i = 0; i < this.workerPool.length; ++i){
            this.workerPool[i].terminate();
        }
        this.workerPool.length = 0;
        return this;
    }
    constructor(manager){
        super(manager);
        this.decoderPath = "";
        this.decoderConfig = {};
        this.decoderBinary = null;
        this.decoderPending = null;
        this.workerLimit = 4;
        this.workerPool = [];
        this.workerNextTaskID = 1;
        this.workerSourceURL = "";
        this.defaultAttributeIDs = {
            position: "POSITION",
            normal: "NORMAL",
            color: "COLOR",
            uv: "TEX_COORD"
        };
        this.defaultAttributeTypes = {
            position: "Float32Array",
            normal: "Float32Array",
            color: "Float32Array",
            uv: "Float32Array"
        };
    }
}
function DRACOWorker() {
    let decoderConfig;
    let decoderPending;
    onmessage = function(e) {
        const message = e.data;
        switch(message.type){
            case "init":
                decoderConfig = message.decoderConfig;
                decoderPending = new Promise(function(resolve) {
                    decoderConfig.onModuleLoaded = function(draco) {
                        resolve({
                            draco
                        });
                    };
                    DracoDecoderModule(decoderConfig);
                });
                break;
            case "decode":
                const buffer = message.buffer;
                const taskConfig = message.taskConfig;
                decoderPending.then((module)=>{
                    const draco = module.draco;
                    const decoder = new draco.Decoder();
                    const decoderBuffer = new draco.DecoderBuffer();
                    decoderBuffer.Init(new Int8Array(buffer), buffer.byteLength);
                    try {
                        const geometry = decodeGeometry(draco, decoder, decoderBuffer, taskConfig);
                        const buffers = geometry.attributes.map((attr)=>attr.array.buffer);
                        if (geometry.index) buffers.push(geometry.index.array.buffer);
                        self.postMessage({
                            type: "decode",
                            id: message.id,
                            geometry
                        }, buffers);
                    } catch (error) {
                        console.error(error);
                        self.postMessage({
                            type: "error",
                            id: message.id,
                            error: error.message
                        });
                    } finally{
                        draco.destroy(decoderBuffer);
                        draco.destroy(decoder);
                    }
                });
                break;
        }
    };
    function decodeGeometry(draco, decoder, decoderBuffer, taskConfig) {
        const attributeIDs = taskConfig.attributeIDs;
        const attributeTypes = taskConfig.attributeTypes;
        let dracoGeometry;
        let decodingStatus;
        const geometryType = decoder.GetEncodedGeometryType(decoderBuffer);
        if (geometryType === draco.TRIANGULAR_MESH) {
            dracoGeometry = new draco.Mesh();
            decodingStatus = decoder.DecodeBufferToMesh(decoderBuffer, dracoGeometry);
        } else if (geometryType === draco.POINT_CLOUD) {
            dracoGeometry = new draco.PointCloud();
            decodingStatus = decoder.DecodeBufferToPointCloud(decoderBuffer, dracoGeometry);
        } else {
            throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
        }
        if (!decodingStatus.ok() || dracoGeometry.ptr === 0) {
            throw new Error("THREE.DRACOLoader: Decoding failed: " + decodingStatus.error_msg());
        }
        const geometry = {
            index: null,
            attributes: []
        };
        for(const attributeName in attributeIDs){
            const attributeType = self[attributeTypes[attributeName]];
            let attribute;
            let attributeID;
            if (taskConfig.useUniqueIDs) {
                attributeID = attributeIDs[attributeName];
                attribute = decoder.GetAttributeByUniqueId(dracoGeometry, attributeID);
            } else {
                attributeID = decoder.GetAttributeId(dracoGeometry, draco[attributeIDs[attributeName]]);
                if (attributeID === -1) continue;
                attribute = decoder.GetAttribute(dracoGeometry, attributeID);
            }
            geometry.attributes.push(decodeAttribute(draco, decoder, dracoGeometry, attributeName, attributeType, attribute));
        }
        if (geometryType === draco.TRIANGULAR_MESH) {
            geometry.index = decodeIndex(draco, decoder, dracoGeometry);
        }
        draco.destroy(dracoGeometry);
        return geometry;
    }
    function decodeIndex(draco, decoder, dracoGeometry) {
        const numFaces = dracoGeometry.num_faces();
        const numIndices = numFaces * 3;
        const byteLength = numIndices * 4;
        const ptr = draco._malloc(byteLength);
        decoder.GetTrianglesUInt32Array(dracoGeometry, byteLength, ptr);
        const index = new Uint32Array(draco.HEAPF32.buffer, ptr, numIndices).slice();
        draco._free(ptr);
        return {
            array: index,
            itemSize: 1
        };
    }
    function decodeAttribute(draco, decoder, dracoGeometry, attributeName, attributeType, attribute) {
        const numComponents = attribute.num_components();
        const numPoints = dracoGeometry.num_points();
        const numValues = numPoints * numComponents;
        const byteLength = numValues * attributeType.BYTES_PER_ELEMENT;
        const dataType = getDracoDataType(draco, attributeType);
        const ptr = draco._malloc(byteLength);
        decoder.GetAttributeDataArrayForAllPoints(dracoGeometry, attribute, dataType, byteLength, ptr);
        const array = new attributeType(draco.HEAPF32.buffer, ptr, numValues).slice();
        draco._free(ptr);
        return {
            name: attributeName,
            array,
            itemSize: numComponents
        };
    }
    function getDracoDataType(draco, attributeType) {
        switch(attributeType){
            case Float32Array:
                return draco.DT_FLOAT32;
            case Int8Array:
                return draco.DT_INT8;
            case Int16Array:
                return draco.DT_INT16;
            case Int32Array:
                return draco.DT_INT32;
            case Uint8Array:
                return draco.DT_UINT8;
            case Uint16Array:
                return draco.DT_UINT16;
            case Uint32Array:
                return draco.DT_UINT32;
        }
    }
}
;
 //# sourceMappingURL=DRACOLoader.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/libs/MeshoptDecoder.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MeshoptDecoder",
    ()=>MeshoptDecoder
]);
let generated;
const MeshoptDecoder = ()=>{
    if (generated) return generated;
    const wasm_base = "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";
    const wasm_simd = "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";
    const detector = new Uint8Array([
        0,
        97,
        115,
        109,
        1,
        0,
        0,
        0,
        1,
        4,
        1,
        96,
        0,
        0,
        3,
        3,
        2,
        0,
        0,
        5,
        3,
        1,
        0,
        1,
        12,
        1,
        0,
        10,
        22,
        2,
        12,
        0,
        65,
        0,
        65,
        0,
        65,
        0,
        252,
        10,
        0,
        0,
        11,
        7,
        0,
        65,
        0,
        253,
        15,
        26,
        11
    ]);
    const wasmpack = new Uint8Array([
        32,
        0,
        65,
        253,
        3,
        1,
        2,
        34,
        4,
        106,
        6,
        5,
        11,
        8,
        7,
        20,
        13,
        33,
        12,
        16,
        128,
        9,
        116,
        64,
        19,
        113,
        127,
        15,
        10,
        21,
        22,
        14,
        255,
        66,
        24,
        54,
        136,
        107,
        18,
        23,
        192,
        26,
        114,
        118,
        132,
        17,
        77,
        101,
        130,
        144,
        27,
        87,
        131,
        44,
        45,
        74,
        156,
        154,
        70,
        167
    ]);
    if (typeof WebAssembly !== "object") {
        return {
            supported: false
        };
    }
    let wasm = wasm_base;
    if (WebAssembly.validate(detector)) {
        wasm = wasm_simd;
    }
    let instance;
    const promise = WebAssembly.instantiate(unpack(wasm), {}).then((result)=>{
        instance = result.instance;
        instance.exports.__wasm_call_ctors();
    });
    function unpack(data) {
        const result = new Uint8Array(data.length);
        for(let i = 0; i < data.length; ++i){
            const ch = data.charCodeAt(i);
            result[i] = ch > 96 ? ch - 71 : ch > 64 ? ch - 65 : ch > 47 ? ch + 4 : ch > 46 ? 63 : 62;
        }
        let write = 0;
        for(let i = 0; i < data.length; ++i){
            result[write++] = result[i] < 60 ? wasmpack[result[i]] : (result[i] - 60) * 64 + result[++i];
        }
        return result.buffer.slice(0, write);
    }
    function decode(fun, target, count, size, source, filter) {
        const sbrk = instance.exports.sbrk;
        const count4 = count + 3 & ~3;
        const tp = sbrk(count4 * size);
        const sp = sbrk(source.length);
        const heap = new Uint8Array(instance.exports.memory.buffer);
        heap.set(source, sp);
        const res = fun(tp, count, size, sp, source.length);
        if (res === 0 && filter) {
            filter(tp, count4, size);
        }
        target.set(heap.subarray(tp, tp + count * size));
        sbrk(tp - sbrk(0));
        if (res !== 0) {
            throw new Error("Malformed buffer data: ".concat(res));
        }
    }
    const filters = {
        // legacy index-based enums for glTF
        0: "",
        1: "meshopt_decodeFilterOct",
        2: "meshopt_decodeFilterQuat",
        3: "meshopt_decodeFilterExp",
        // string-based enums for glTF
        NONE: "",
        OCTAHEDRAL: "meshopt_decodeFilterOct",
        QUATERNION: "meshopt_decodeFilterQuat",
        EXPONENTIAL: "meshopt_decodeFilterExp"
    };
    const decoders = {
        // legacy index-based enums for glTF
        0: "meshopt_decodeVertexBuffer",
        1: "meshopt_decodeIndexBuffer",
        2: "meshopt_decodeIndexSequence",
        // string-based enums for glTF
        ATTRIBUTES: "meshopt_decodeVertexBuffer",
        TRIANGLES: "meshopt_decodeIndexBuffer",
        INDICES: "meshopt_decodeIndexSequence"
    };
    generated = {
        ready: promise,
        supported: true,
        decodeVertexBuffer (target, count, size, source, filter) {
            decode(instance.exports.meshopt_decodeVertexBuffer, target, count, size, source, instance.exports[filters[filter]]);
        },
        decodeIndexBuffer (target, count, size, source) {
            decode(instance.exports.meshopt_decodeIndexBuffer, target, count, size, source);
        },
        decodeIndexSequence (target, count, size, source) {
            decode(instance.exports.meshopt_decodeIndexSequence, target, count, size, source);
        },
        decodeGltfBuffer (target, count, size, source, mode, filter) {
            decode(instance.exports[decoders[mode]], target, count, size, source, instance.exports[filters[filter]]);
        }
    };
    return generated;
};
;
 //# sourceMappingURL=MeshoptDecoder.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/utils/SkeletonUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SkeletonUtils",
    ()=>SkeletonUtils
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
function retarget(target, source) {
    let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const pos = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](), quat = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"](), scale = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](), bindBoneMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"](), relativeMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"](), globalMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    options.preserveMatrix = options.preserveMatrix !== void 0 ? options.preserveMatrix : true;
    options.preservePosition = options.preservePosition !== void 0 ? options.preservePosition : true;
    options.preserveHipPosition = options.preserveHipPosition !== void 0 ? options.preserveHipPosition : false;
    options.useTargetMatrix = options.useTargetMatrix !== void 0 ? options.useTargetMatrix : false;
    options.hip = options.hip !== void 0 ? options.hip : "hip";
    options.names = options.names || {};
    const sourceBones = source.isObject3D ? source.skeleton.bones : getBones(source), bones = target.isObject3D ? target.skeleton.bones : getBones(target);
    let bindBones, bone, name, boneTo, bonesPosition;
    if (target.isObject3D) {
        target.skeleton.pose();
    } else {
        options.useTargetMatrix = true;
        options.preserveMatrix = false;
    }
    if (options.preservePosition) {
        bonesPosition = [];
        for(let i = 0; i < bones.length; i++){
            bonesPosition.push(bones[i].position.clone());
        }
    }
    if (options.preserveMatrix) {
        target.updateMatrixWorld();
        target.matrixWorld.identity();
        for(let i = 0; i < target.children.length; ++i){
            target.children[i].updateMatrixWorld(true);
        }
    }
    if (options.offsets) {
        bindBones = [];
        for(let i = 0; i < bones.length; ++i){
            bone = bones[i];
            name = options.names[bone.name] || bone.name;
            if (options.offsets[name]) {
                bone.matrix.multiply(options.offsets[name]);
                bone.matrix.decompose(bone.position, bone.quaternion, bone.scale);
                bone.updateMatrixWorld();
            }
            bindBones.push(bone.matrixWorld.clone());
        }
    }
    for(let i = 0; i < bones.length; ++i){
        bone = bones[i];
        name = options.names[bone.name] || bone.name;
        boneTo = getBoneByName(name, sourceBones);
        globalMatrix.copy(bone.matrixWorld);
        if (boneTo) {
            boneTo.updateMatrixWorld();
            if (options.useTargetMatrix) {
                relativeMatrix.copy(boneTo.matrixWorld);
            } else {
                relativeMatrix.copy(target.matrixWorld).invert();
                relativeMatrix.multiply(boneTo.matrixWorld);
            }
            scale.setFromMatrixScale(relativeMatrix);
            relativeMatrix.scale(scale.set(1 / scale.x, 1 / scale.y, 1 / scale.z));
            globalMatrix.makeRotationFromQuaternion(quat.setFromRotationMatrix(relativeMatrix));
            if (target.isObject3D) {
                const boneIndex = bones.indexOf(bone), wBindMatrix = bindBones ? bindBones[boneIndex] : bindBoneMatrix.copy(target.skeleton.boneInverses[boneIndex]).invert();
                globalMatrix.multiply(wBindMatrix);
            }
            globalMatrix.copyPosition(relativeMatrix);
        }
        if (bone.parent && bone.parent.isBone) {
            bone.matrix.copy(bone.parent.matrixWorld).invert();
            bone.matrix.multiply(globalMatrix);
        } else {
            bone.matrix.copy(globalMatrix);
        }
        if (options.preserveHipPosition && name === options.hip) {
            bone.matrix.setPosition(pos.set(0, bone.position.y, 0));
        }
        bone.matrix.decompose(bone.position, bone.quaternion, bone.scale);
        bone.updateMatrixWorld();
    }
    if (options.preservePosition) {
        for(let i = 0; i < bones.length; ++i){
            bone = bones[i];
            name = options.names[bone.name] || bone.name;
            if (name !== options.hip) {
                bone.position.copy(bonesPosition[i]);
            }
        }
    }
    if (options.preserveMatrix) {
        target.updateMatrixWorld(true);
    }
}
function retargetClip(target, source, clip) {
    let options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    options.useFirstFramePosition = options.useFirstFramePosition !== void 0 ? options.useFirstFramePosition : false;
    options.fps = options.fps !== void 0 ? options.fps : 30;
    options.names = options.names || [];
    if (!source.isObject3D) {
        source = getHelperFromSkeleton(source);
    }
    const numFrames = Math.round(clip.duration * (options.fps / 1e3) * 1e3), delta = 1 / options.fps, convertedTracks = [], mixer = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationMixer"](source), bones = getBones(target.skeleton), boneDatas = [];
    let positionOffset, bone, boneTo, boneData, name;
    mixer.clipAction(clip).play();
    mixer.update(0);
    source.updateMatrixWorld();
    for(let i = 0; i < numFrames; ++i){
        const time = i * delta;
        retarget(target, source, options);
        for(let j = 0; j < bones.length; ++j){
            name = options.names[bones[j].name] || bones[j].name;
            boneTo = getBoneByName(name, source.skeleton);
            if (boneTo) {
                bone = bones[j];
                boneData = boneDatas[j] = boneDatas[j] || {
                    bone
                };
                if (options.hip === name) {
                    if (!boneData.pos) {
                        boneData.pos = {
                            times: new Float32Array(numFrames),
                            values: new Float32Array(numFrames * 3)
                        };
                    }
                    if (options.useFirstFramePosition) {
                        if (i === 0) {
                            positionOffset = bone.position.clone();
                        }
                        bone.position.sub(positionOffset);
                    }
                    boneData.pos.times[i] = time;
                    bone.position.toArray(boneData.pos.values, i * 3);
                }
                if (!boneData.quat) {
                    boneData.quat = {
                        times: new Float32Array(numFrames),
                        values: new Float32Array(numFrames * 4)
                    };
                }
                boneData.quat.times[i] = time;
                bone.quaternion.toArray(boneData.quat.values, i * 4);
            }
        }
        mixer.update(delta);
        source.updateMatrixWorld();
    }
    for(let i = 0; i < boneDatas.length; ++i){
        boneData = boneDatas[i];
        if (boneData) {
            if (boneData.pos) {
                convertedTracks.push(new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VectorKeyframeTrack"](".bones[" + boneData.bone.name + "].position", boneData.pos.times, boneData.pos.values));
            }
            convertedTracks.push(new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuaternionKeyframeTrack"](".bones[" + boneData.bone.name + "].quaternion", boneData.quat.times, boneData.quat.values));
        }
    }
    mixer.uncacheAction(clip);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationClip"](clip.name, -1, convertedTracks);
}
function clone(source) {
    const sourceLookup = /* @__PURE__ */ new Map();
    const cloneLookup = /* @__PURE__ */ new Map();
    const clone2 = source.clone();
    parallelTraverse(source, clone2, function(sourceNode, clonedNode) {
        sourceLookup.set(clonedNode, sourceNode);
        cloneLookup.set(sourceNode, clonedNode);
    });
    clone2.traverse(function(node) {
        if (!node.isSkinnedMesh) return;
        const clonedMesh = node;
        const sourceMesh = sourceLookup.get(node);
        const sourceBones = sourceMesh.skeleton.bones;
        clonedMesh.skeleton = sourceMesh.skeleton.clone();
        clonedMesh.bindMatrix.copy(sourceMesh.bindMatrix);
        clonedMesh.skeleton.bones = sourceBones.map(function(bone) {
            return cloneLookup.get(bone);
        });
        clonedMesh.bind(clonedMesh.skeleton, clonedMesh.bindMatrix);
    });
    return clone2;
}
function getBoneByName(name, skeleton) {
    for(let i = 0, bones = getBones(skeleton); i < bones.length; i++){
        if (name === bones[i].name) return bones[i];
    }
}
function getBones(skeleton) {
    return Array.isArray(skeleton) ? skeleton : skeleton.bones;
}
function getHelperFromSkeleton(skeleton) {
    const source = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkeletonHelper"](skeleton.bones[0]);
    source.skeleton = skeleton;
    return source;
}
function parallelTraverse(a, b, callback) {
    callback(a, b);
    for(let i = 0; i < a.children.length; i++){
        parallelTraverse(a.children[i], b.children[i], callback);
    }
}
const SkeletonUtils = {
    retarget,
    retargetClip,
    clone
};
;
 //# sourceMappingURL=SkeletonUtils.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/objects/GroundProjectedEnv.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GroundProjectedEnv",
    ()=>GroundProjectedEnv
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/_polyfill/constants.js [app-client] (ecmascript)");
;
;
const isCubeTexture = (def)=>def && def.isCubeTexture;
class GroundProjectedEnv extends __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"] {
    set radius(radius) {
        this.material.uniforms.radius.value = radius;
    }
    get radius() {
        return this.material.uniforms.radius.value;
    }
    set height(height) {
        this.material.uniforms.height.value = height;
    }
    get height() {
        return this.material.uniforms.height.value;
    }
    constructor(texture, options){
        var _a, _b;
        const isCubeMap = isCubeTexture(texture);
        const w = (_b = isCubeMap ? (_a = texture.image[0]) == null ? void 0 : _a.width : texture.image.width) != null ? _b : 1024;
        const cubeSize = w / 4;
        const _lodMax = Math.floor(Math.log2(cubeSize));
        const _cubeSize = Math.pow(2, _lodMax);
        const width = 3 * Math.max(_cubeSize, 16 * 7);
        const height = 4 * _cubeSize;
        const defines = [
            isCubeMap ? "#define ENVMAP_TYPE_CUBE" : "",
            "#define CUBEUV_TEXEL_WIDTH ".concat(1 / width),
            "#define CUBEUV_TEXEL_HEIGHT ".concat(1 / height),
            "#define CUBEUV_MAX_MIP ".concat(_lodMax, ".0")
        ];
        const vertexShader = "\n        varying vec3 vWorldPosition;\n        void main() \n        {\n            vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );\n            vWorldPosition = worldPosition.xyz;\n            \n            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n        }\n        ";
        const fragmentShader = defines.join("\n") + /* glsl */ "\n        #define ENVMAP_TYPE_CUBE_UV\n        varying vec3 vWorldPosition;\n        uniform float radius;\n        uniform float height;\n        uniform float angle;\n        #ifdef ENVMAP_TYPE_CUBE\n            uniform samplerCube map;\n        #else\n            uniform sampler2D map;\n        #endif\n        // From: https://www.shadertoy.com/view/4tsBD7\n        float diskIntersectWithBackFaceCulling( vec3 ro, vec3 rd, vec3 c, vec3 n, float r ) \n        {\n            float d = dot ( rd, n );\n            \n            if( d > 0.0 ) { return 1e6; }\n            \n            vec3  o = ro - c;\n            float t = - dot( n, o ) / d;\n            vec3  q = o + rd * t;\n            \n            return ( dot( q, q ) < r * r ) ? t : 1e6;\n        }\n        // From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm\n        float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) \n        {\n            vec3 oc = ro - ce;\n            float b = dot( oc, rd );\n            float c = dot( oc, oc ) - ra * ra;\n            float h = b * b - c;\n            \n            if( h < 0.0 ) { return -1.0; }\n            \n            h = sqrt( h );\n            \n            return - b + h;\n        }\n        vec3 project() \n        {\n            vec3 p = normalize( vWorldPosition );\n            vec3 camPos = cameraPosition;\n            camPos.y -= height;\n            float intersection = sphereIntersect( camPos, p, vec3( 0.0 ), radius );\n            if( intersection > 0.0 ) {\n                \n                vec3 h = vec3( 0.0, - height, 0.0 );\n                float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );\n                p = ( camPos + min( intersection, intersection2 ) * p ) / radius;\n            } else {\n                p = vec3( 0.0, 1.0, 0.0 );\n            }\n            return p;\n        }\n        #include <common>\n        #include <cube_uv_reflection_fragment>\n        void main() \n        {\n            vec3 projectedWorldPosition = project();\n            \n            #ifdef ENVMAP_TYPE_CUBE\n                vec3 outcolor = textureCube( map, projectedWorldPosition ).rgb;\n            #else\n                vec3 direction = normalize( projectedWorldPosition );\n                vec2 uv = equirectUv( direction );\n                vec3 outcolor = texture2D( map, uv ).rgb;\n            #endif\n            gl_FragColor = vec4( outcolor, 1.0 );\n            #include <tonemapping_fragment>\n            #include <".concat(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"] >= 154 ? "colorspace_fragment" : "encodings_fragment", ">\n        }\n        ");
        const uniforms = {
            map: {
                value: texture
            },
            height: {
                value: (options == null ? void 0 : options.height) || 15
            },
            radius: {
                value: (options == null ? void 0 : options.radius) || 100
            }
        };
        const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IcosahedronGeometry"](1, 16);
        const material = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
            uniforms,
            fragmentShader,
            vertexShader,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
        });
        super(geometry, material);
    }
}
;
 //# sourceMappingURL=GroundProjectedEnv.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/loaders/RGBELoader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RGBELoader",
    ()=>RGBELoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
class RGBELoader extends __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataTextureLoader"] {
    // adapted from http://www.graphics.cornell.edu/~bjw/rgbe.html
    parse(buffer) {
        const rgbe_read_error = 1, rgbe_write_error = 2, rgbe_format_error = 3, rgbe_memory_error = 4, rgbe_error = function(rgbe_error_code, msg) {
            switch(rgbe_error_code){
                case rgbe_read_error:
                    throw new Error("THREE.RGBELoader: Read Error: " + (msg || ""));
                case rgbe_write_error:
                    throw new Error("THREE.RGBELoader: Write Error: " + (msg || ""));
                case rgbe_format_error:
                    throw new Error("THREE.RGBELoader: Bad File Format: " + (msg || ""));
                default:
                case rgbe_memory_error:
                    throw new Error("THREE.RGBELoader: Memory Error: " + (msg || ""));
            }
        }, RGBE_VALID_PROGRAMTYPE = 1, RGBE_VALID_FORMAT = 2, RGBE_VALID_DIMENSIONS = 4, NEWLINE = "\n", fgets = function(buffer2, lineLimit, consume) {
            const chunkSize = 128;
            lineLimit = !lineLimit ? 1024 : lineLimit;
            let p = buffer2.pos, i = -1, len = 0, s = "", chunk = String.fromCharCode.apply(null, new Uint16Array(buffer2.subarray(p, p + chunkSize)));
            while(0 > (i = chunk.indexOf(NEWLINE)) && len < lineLimit && p < buffer2.byteLength){
                s += chunk;
                len += chunk.length;
                p += chunkSize;
                chunk += String.fromCharCode.apply(null, new Uint16Array(buffer2.subarray(p, p + chunkSize)));
            }
            if (-1 < i) {
                if (false !== consume) buffer2.pos += len + i + 1;
                return s + chunk.slice(0, i);
            }
            return false;
        }, RGBE_ReadHeader = function(buffer2) {
            const magic_token_re = /^#\?(\S+)/, gamma_re = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, exposure_re = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, format_re = /^\s*FORMAT=(\S+)\s*$/, dimensions_re = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, header = {
                valid: 0,
                string: "",
                comments: "",
                programtype: "RGBE",
                format: "",
                gamma: 1,
                exposure: 1,
                width: 0,
                height: 0
            };
            let line, match;
            if (buffer2.pos >= buffer2.byteLength || !(line = fgets(buffer2))) {
                rgbe_error(rgbe_read_error, "no header found");
            }
            if (!(match = line.match(magic_token_re))) {
                rgbe_error(rgbe_format_error, "bad initial token");
            }
            header.valid |= RGBE_VALID_PROGRAMTYPE;
            header.programtype = match[1];
            header.string += line + "\n";
            while(true){
                line = fgets(buffer2);
                if (false === line) break;
                header.string += line + "\n";
                if ("#" === line.charAt(0)) {
                    header.comments += line + "\n";
                    continue;
                }
                if (match = line.match(gamma_re)) {
                    header.gamma = parseFloat(match[1]);
                }
                if (match = line.match(exposure_re)) {
                    header.exposure = parseFloat(match[1]);
                }
                if (match = line.match(format_re)) {
                    header.valid |= RGBE_VALID_FORMAT;
                    header.format = match[1];
                }
                if (match = line.match(dimensions_re)) {
                    header.valid |= RGBE_VALID_DIMENSIONS;
                    header.height = parseInt(match[1], 10);
                    header.width = parseInt(match[2], 10);
                }
                if (header.valid & RGBE_VALID_FORMAT && header.valid & RGBE_VALID_DIMENSIONS) break;
            }
            if (!(header.valid & RGBE_VALID_FORMAT)) {
                rgbe_error(rgbe_format_error, "missing format specifier");
            }
            if (!(header.valid & RGBE_VALID_DIMENSIONS)) {
                rgbe_error(rgbe_format_error, "missing image size specifier");
            }
            return header;
        }, RGBE_ReadPixels_RLE = function(buffer2, w2, h2) {
            const scanline_width = w2;
            if (// run length encoding is not allowed so read flat
            scanline_width < 8 || scanline_width > 32767 || // this file is not run length encoded
            2 !== buffer2[0] || 2 !== buffer2[1] || buffer2[2] & 128) {
                return new Uint8Array(buffer2);
            }
            if (scanline_width !== (buffer2[2] << 8 | buffer2[3])) {
                rgbe_error(rgbe_format_error, "wrong scanline width");
            }
            const data_rgba = new Uint8Array(4 * w2 * h2);
            if (!data_rgba.length) {
                rgbe_error(rgbe_memory_error, "unable to allocate buffer space");
            }
            let offset = 0, pos = 0;
            const ptr_end = 4 * scanline_width;
            const rgbeStart = new Uint8Array(4);
            const scanline_buffer = new Uint8Array(ptr_end);
            let num_scanlines = h2;
            while(num_scanlines > 0 && pos < buffer2.byteLength){
                if (pos + 4 > buffer2.byteLength) {
                    rgbe_error(rgbe_read_error);
                }
                rgbeStart[0] = buffer2[pos++];
                rgbeStart[1] = buffer2[pos++];
                rgbeStart[2] = buffer2[pos++];
                rgbeStart[3] = buffer2[pos++];
                if (2 != rgbeStart[0] || 2 != rgbeStart[1] || (rgbeStart[2] << 8 | rgbeStart[3]) != scanline_width) {
                    rgbe_error(rgbe_format_error, "bad rgbe scanline format");
                }
                let ptr = 0, count;
                while(ptr < ptr_end && pos < buffer2.byteLength){
                    count = buffer2[pos++];
                    const isEncodedRun = count > 128;
                    if (isEncodedRun) count -= 128;
                    if (0 === count || ptr + count > ptr_end) {
                        rgbe_error(rgbe_format_error, "bad scanline data");
                    }
                    if (isEncodedRun) {
                        const byteValue = buffer2[pos++];
                        for(let i = 0; i < count; i++){
                            scanline_buffer[ptr++] = byteValue;
                        }
                    } else {
                        scanline_buffer.set(buffer2.subarray(pos, pos + count), ptr);
                        ptr += count;
                        pos += count;
                    }
                }
                const l = scanline_width;
                for(let i = 0; i < l; i++){
                    let off = 0;
                    data_rgba[offset] = scanline_buffer[i + off];
                    off += scanline_width;
                    data_rgba[offset + 1] = scanline_buffer[i + off];
                    off += scanline_width;
                    data_rgba[offset + 2] = scanline_buffer[i + off];
                    off += scanline_width;
                    data_rgba[offset + 3] = scanline_buffer[i + off];
                    offset += 4;
                }
                num_scanlines--;
            }
            return data_rgba;
        };
        const RGBEByteToRGBFloat = function(sourceArray, sourceOffset, destArray, destOffset) {
            const e = sourceArray[sourceOffset + 3];
            const scale = Math.pow(2, e - 128) / 255;
            destArray[destOffset + 0] = sourceArray[sourceOffset + 0] * scale;
            destArray[destOffset + 1] = sourceArray[sourceOffset + 1] * scale;
            destArray[destOffset + 2] = sourceArray[sourceOffset + 2] * scale;
            destArray[destOffset + 3] = 1;
        };
        const RGBEByteToRGBHalf = function(sourceArray, sourceOffset, destArray, destOffset) {
            const e = sourceArray[sourceOffset + 3];
            const scale = Math.pow(2, e - 128) / 255;
            destArray[destOffset + 0] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataUtils"].toHalfFloat(Math.min(sourceArray[sourceOffset + 0] * scale, 65504));
            destArray[destOffset + 1] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataUtils"].toHalfFloat(Math.min(sourceArray[sourceOffset + 1] * scale, 65504));
            destArray[destOffset + 2] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataUtils"].toHalfFloat(Math.min(sourceArray[sourceOffset + 2] * scale, 65504));
            destArray[destOffset + 3] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataUtils"].toHalfFloat(1);
        };
        const byteArray = new Uint8Array(buffer);
        byteArray.pos = 0;
        const rgbe_header_info = RGBE_ReadHeader(byteArray);
        const w = rgbe_header_info.width, h = rgbe_header_info.height, image_rgba_data = RGBE_ReadPixels_RLE(byteArray.subarray(byteArray.pos), w, h);
        let data, type;
        let numElements;
        switch(this.type){
            case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatType"]:
                numElements = image_rgba_data.length / 4;
                const floatArray = new Float32Array(numElements * 4);
                for(let j = 0; j < numElements; j++){
                    RGBEByteToRGBFloat(image_rgba_data, j * 4, floatArray, j * 4);
                }
                data = floatArray;
                type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatType"];
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HalfFloatType"]:
                numElements = image_rgba_data.length / 4;
                const halfArray = new Uint16Array(numElements * 4);
                for(let j = 0; j < numElements; j++){
                    RGBEByteToRGBHalf(image_rgba_data, j * 4, halfArray, j * 4);
                }
                data = halfArray;
                type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HalfFloatType"];
                break;
            default:
                throw new Error("THREE.RGBELoader: Unsupported type: " + this.type);
        }
        return {
            width: w,
            height: h,
            data,
            header: rgbe_header_info.string,
            gamma: rgbe_header_info.gamma,
            exposure: rgbe_header_info.exposure,
            type
        };
    }
    setDataType(value) {
        this.type = value;
        return this;
    }
    load(url, onLoad, onProgress, onError) {
        function onLoadCallback(texture, texData) {
            switch(texture.type){
                case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatType"]:
                case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HalfFloatType"]:
                    if ("colorSpace" in texture) texture.colorSpace = "srgb-linear";
                    else texture.encoding = 3e3;
                    texture.minFilter = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"];
                    texture.magFilter = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"];
                    texture.generateMipmaps = false;
                    texture.flipY = true;
                    break;
            }
            if (onLoad) onLoad(texture, texData);
        }
        return super.load(url, onLoadCallback, onProgress, onError);
    }
    constructor(manager){
        super(manager);
        this.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HalfFloatType"];
    }
}
;
 //# sourceMappingURL=RGBELoader.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/loaders/EXRLoader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EXRLoader",
    ()=>EXRLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$node_modules$2f$fflate$2f$esm$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/node_modules/fflate/esm/browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/three-stdlib/_polyfill/constants.js [app-client] (ecmascript)");
;
;
;
const hasColorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"] >= 152;
class EXRLoader extends __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataTextureLoader"] {
    parse(buffer) {
        const USHORT_RANGE = 1 << 16;
        const BITMAP_SIZE = USHORT_RANGE >> 3;
        const HUF_ENCBITS = 16;
        const HUF_DECBITS = 14;
        const HUF_ENCSIZE = (1 << HUF_ENCBITS) + 1;
        const HUF_DECSIZE = 1 << HUF_DECBITS;
        const HUF_DECMASK = HUF_DECSIZE - 1;
        const NBITS = 16;
        const A_OFFSET = 1 << NBITS - 1;
        const MOD_MASK = (1 << NBITS) - 1;
        const SHORT_ZEROCODE_RUN = 59;
        const LONG_ZEROCODE_RUN = 63;
        const SHORTEST_LONG_RUN = 2 + LONG_ZEROCODE_RUN - SHORT_ZEROCODE_RUN;
        const ULONG_SIZE = 8;
        const FLOAT32_SIZE = 4;
        const INT32_SIZE = 4;
        const INT16_SIZE = 2;
        const INT8_SIZE = 1;
        const STATIC_HUFFMAN = 0;
        const DEFLATE = 1;
        const UNKNOWN = 0;
        const LOSSY_DCT = 1;
        const RLE = 2;
        const logBase = Math.pow(2.7182818, 2.2);
        function reverseLutFromBitmap(bitmap, lut) {
            var k = 0;
            for(var i = 0; i < USHORT_RANGE; ++i){
                if (i == 0 || bitmap[i >> 3] & 1 << (i & 7)) {
                    lut[k++] = i;
                }
            }
            var n = k - 1;
            while(k < USHORT_RANGE)lut[k++] = 0;
            return n;
        }
        function hufClearDecTable(hdec) {
            for(var i = 0; i < HUF_DECSIZE; i++){
                hdec[i] = {};
                hdec[i].len = 0;
                hdec[i].lit = 0;
                hdec[i].p = null;
            }
        }
        const getBitsReturn = {
            l: 0,
            c: 0,
            lc: 0
        };
        function getBits(nBits, c, lc, uInt8Array2, inOffset) {
            while(lc < nBits){
                c = c << 8 | parseUint8Array(uInt8Array2, inOffset);
                lc += 8;
            }
            lc -= nBits;
            getBitsReturn.l = c >> lc & (1 << nBits) - 1;
            getBitsReturn.c = c;
            getBitsReturn.lc = lc;
        }
        const hufTableBuffer = new Array(59);
        function hufCanonicalCodeTable(hcode) {
            for(var i = 0; i <= 58; ++i)hufTableBuffer[i] = 0;
            for(var i = 0; i < HUF_ENCSIZE; ++i)hufTableBuffer[hcode[i]] += 1;
            var c = 0;
            for(var i = 58; i > 0; --i){
                var nc = c + hufTableBuffer[i] >> 1;
                hufTableBuffer[i] = c;
                c = nc;
            }
            for(var i = 0; i < HUF_ENCSIZE; ++i){
                var l = hcode[i];
                if (l > 0) hcode[i] = l | hufTableBuffer[l]++ << 6;
            }
        }
        function hufUnpackEncTable(uInt8Array2, inDataView, inOffset, ni, im, iM, hcode) {
            var p = inOffset;
            var c = 0;
            var lc = 0;
            for(; im <= iM; im++){
                if (p.value - inOffset.value > ni) return false;
                getBits(6, c, lc, uInt8Array2, p);
                var l = getBitsReturn.l;
                c = getBitsReturn.c;
                lc = getBitsReturn.lc;
                hcode[im] = l;
                if (l == LONG_ZEROCODE_RUN) {
                    if (p.value - inOffset.value > ni) {
                        throw "Something wrong with hufUnpackEncTable";
                    }
                    getBits(8, c, lc, uInt8Array2, p);
                    var zerun = getBitsReturn.l + SHORTEST_LONG_RUN;
                    c = getBitsReturn.c;
                    lc = getBitsReturn.lc;
                    if (im + zerun > iM + 1) {
                        throw "Something wrong with hufUnpackEncTable";
                    }
                    while(zerun--)hcode[im++] = 0;
                    im--;
                } else if (l >= SHORT_ZEROCODE_RUN) {
                    var zerun = l - SHORT_ZEROCODE_RUN + 2;
                    if (im + zerun > iM + 1) {
                        throw "Something wrong with hufUnpackEncTable";
                    }
                    while(zerun--)hcode[im++] = 0;
                    im--;
                }
            }
            hufCanonicalCodeTable(hcode);
        }
        function hufLength(code) {
            return code & 63;
        }
        function hufCode(code) {
            return code >> 6;
        }
        function hufBuildDecTable(hcode, im, iM, hdecod) {
            for(; im <= iM; im++){
                var c = hufCode(hcode[im]);
                var l = hufLength(hcode[im]);
                if (c >> l) {
                    throw "Invalid table entry";
                }
                if (l > HUF_DECBITS) {
                    var pl = hdecod[c >> l - HUF_DECBITS];
                    if (pl.len) {
                        throw "Invalid table entry";
                    }
                    pl.lit++;
                    if (pl.p) {
                        var p = pl.p;
                        pl.p = new Array(pl.lit);
                        for(var i = 0; i < pl.lit - 1; ++i){
                            pl.p[i] = p[i];
                        }
                    } else {
                        pl.p = new Array(1);
                    }
                    pl.p[pl.lit - 1] = im;
                } else if (l) {
                    var plOffset = 0;
                    for(var i = 1 << HUF_DECBITS - l; i > 0; i--){
                        var pl = hdecod[(c << HUF_DECBITS - l) + plOffset];
                        if (pl.len || pl.p) {
                            throw "Invalid table entry";
                        }
                        pl.len = l;
                        pl.lit = im;
                        plOffset++;
                    }
                }
            }
            return true;
        }
        const getCharReturn = {
            c: 0,
            lc: 0
        };
        function getChar(c, lc, uInt8Array2, inOffset) {
            c = c << 8 | parseUint8Array(uInt8Array2, inOffset);
            lc += 8;
            getCharReturn.c = c;
            getCharReturn.lc = lc;
        }
        const getCodeReturn = {
            c: 0,
            lc: 0
        };
        function getCode(po, rlc, c, lc, uInt8Array2, inDataView, inOffset, outBuffer, outBufferOffset, outBufferEndOffset) {
            if (po == rlc) {
                if (lc < 8) {
                    getChar(c, lc, uInt8Array2, inOffset);
                    c = getCharReturn.c;
                    lc = getCharReturn.lc;
                }
                lc -= 8;
                var cs = c >> lc;
                var cs = new Uint8Array([
                    cs
                ])[0];
                if (outBufferOffset.value + cs > outBufferEndOffset) {
                    return false;
                }
                var s = outBuffer[outBufferOffset.value - 1];
                while(cs-- > 0){
                    outBuffer[outBufferOffset.value++] = s;
                }
            } else if (outBufferOffset.value < outBufferEndOffset) {
                outBuffer[outBufferOffset.value++] = po;
            } else {
                return false;
            }
            getCodeReturn.c = c;
            getCodeReturn.lc = lc;
        }
        function UInt16(value) {
            return value & 65535;
        }
        function Int16(value) {
            var ref = UInt16(value);
            return ref > 32767 ? ref - 65536 : ref;
        }
        const wdec14Return = {
            a: 0,
            b: 0
        };
        function wdec14(l, h) {
            var ls = Int16(l);
            var hs = Int16(h);
            var hi = hs;
            var ai = ls + (hi & 1) + (hi >> 1);
            var as = ai;
            var bs = ai - hi;
            wdec14Return.a = as;
            wdec14Return.b = bs;
        }
        function wdec16(l, h) {
            var m = UInt16(l);
            var d = UInt16(h);
            var bb = m - (d >> 1) & MOD_MASK;
            var aa = d + bb - A_OFFSET & MOD_MASK;
            wdec14Return.a = aa;
            wdec14Return.b = bb;
        }
        function wav2Decode(buffer2, j, nx, ox, ny, oy, mx) {
            var w14 = mx < 1 << 14;
            var n = nx > ny ? ny : nx;
            var p = 1;
            var p2;
            while(p <= n)p <<= 1;
            p >>= 1;
            p2 = p;
            p >>= 1;
            while(p >= 1){
                var py = 0;
                var ey = py + oy * (ny - p2);
                var oy1 = oy * p;
                var oy2 = oy * p2;
                var ox1 = ox * p;
                var ox2 = ox * p2;
                var i00, i01, i10, i11;
                for(; py <= ey; py += oy2){
                    var px = py;
                    var ex = py + ox * (nx - p2);
                    for(; px <= ex; px += ox2){
                        var p01 = px + ox1;
                        var p10 = px + oy1;
                        var p11 = p10 + ox1;
                        if (w14) {
                            wdec14(buffer2[px + j], buffer2[p10 + j]);
                            i00 = wdec14Return.a;
                            i10 = wdec14Return.b;
                            wdec14(buffer2[p01 + j], buffer2[p11 + j]);
                            i01 = wdec14Return.a;
                            i11 = wdec14Return.b;
                            wdec14(i00, i01);
                            buffer2[px + j] = wdec14Return.a;
                            buffer2[p01 + j] = wdec14Return.b;
                            wdec14(i10, i11);
                            buffer2[p10 + j] = wdec14Return.a;
                            buffer2[p11 + j] = wdec14Return.b;
                        } else {
                            wdec16(buffer2[px + j], buffer2[p10 + j]);
                            i00 = wdec14Return.a;
                            i10 = wdec14Return.b;
                            wdec16(buffer2[p01 + j], buffer2[p11 + j]);
                            i01 = wdec14Return.a;
                            i11 = wdec14Return.b;
                            wdec16(i00, i01);
                            buffer2[px + j] = wdec14Return.a;
                            buffer2[p01 + j] = wdec14Return.b;
                            wdec16(i10, i11);
                            buffer2[p10 + j] = wdec14Return.a;
                            buffer2[p11 + j] = wdec14Return.b;
                        }
                    }
                    if (nx & p) {
                        var p10 = px + oy1;
                        if (w14) wdec14(buffer2[px + j], buffer2[p10 + j]);
                        else wdec16(buffer2[px + j], buffer2[p10 + j]);
                        i00 = wdec14Return.a;
                        buffer2[p10 + j] = wdec14Return.b;
                        buffer2[px + j] = i00;
                    }
                }
                if (ny & p) {
                    var px = py;
                    var ex = py + ox * (nx - p2);
                    for(; px <= ex; px += ox2){
                        var p01 = px + ox1;
                        if (w14) wdec14(buffer2[px + j], buffer2[p01 + j]);
                        else wdec16(buffer2[px + j], buffer2[p01 + j]);
                        i00 = wdec14Return.a;
                        buffer2[p01 + j] = wdec14Return.b;
                        buffer2[px + j] = i00;
                    }
                }
                p2 = p;
                p >>= 1;
            }
            return py;
        }
        function hufDecode(encodingTable, decodingTable, uInt8Array2, inDataView, inOffset, ni, rlc, no, outBuffer, outOffset) {
            var c = 0;
            var lc = 0;
            var outBufferEndOffset = no;
            var inOffsetEnd = Math.trunc(inOffset.value + (ni + 7) / 8);
            while(inOffset.value < inOffsetEnd){
                getChar(c, lc, uInt8Array2, inOffset);
                c = getCharReturn.c;
                lc = getCharReturn.lc;
                while(lc >= HUF_DECBITS){
                    var index = c >> lc - HUF_DECBITS & HUF_DECMASK;
                    var pl = decodingTable[index];
                    if (pl.len) {
                        lc -= pl.len;
                        getCode(pl.lit, rlc, c, lc, uInt8Array2, inDataView, inOffset, outBuffer, outOffset, outBufferEndOffset);
                        c = getCodeReturn.c;
                        lc = getCodeReturn.lc;
                    } else {
                        if (!pl.p) {
                            throw "hufDecode issues";
                        }
                        var j;
                        for(j = 0; j < pl.lit; j++){
                            var l = hufLength(encodingTable[pl.p[j]]);
                            while(lc < l && inOffset.value < inOffsetEnd){
                                getChar(c, lc, uInt8Array2, inOffset);
                                c = getCharReturn.c;
                                lc = getCharReturn.lc;
                            }
                            if (lc >= l) {
                                if (hufCode(encodingTable[pl.p[j]]) == (c >> lc - l & (1 << l) - 1)) {
                                    lc -= l;
                                    getCode(pl.p[j], rlc, c, lc, uInt8Array2, inDataView, inOffset, outBuffer, outOffset, outBufferEndOffset);
                                    c = getCodeReturn.c;
                                    lc = getCodeReturn.lc;
                                    break;
                                }
                            }
                        }
                        if (j == pl.lit) {
                            throw "hufDecode issues";
                        }
                    }
                }
            }
            var i = 8 - ni & 7;
            c >>= i;
            lc -= i;
            while(lc > 0){
                var pl = decodingTable[c << HUF_DECBITS - lc & HUF_DECMASK];
                if (pl.len) {
                    lc -= pl.len;
                    getCode(pl.lit, rlc, c, lc, uInt8Array2, inDataView, inOffset, outBuffer, outOffset, outBufferEndOffset);
                    c = getCodeReturn.c;
                    lc = getCodeReturn.lc;
                } else {
                    throw "hufDecode issues";
                }
            }
            return true;
        }
        function hufUncompress(uInt8Array2, inDataView, inOffset, nCompressed, outBuffer, nRaw) {
            var outOffset = {
                value: 0
            };
            var initialInOffset = inOffset.value;
            var im = parseUint32(inDataView, inOffset);
            var iM = parseUint32(inDataView, inOffset);
            inOffset.value += 4;
            var nBits = parseUint32(inDataView, inOffset);
            inOffset.value += 4;
            if (im < 0 || im >= HUF_ENCSIZE || iM < 0 || iM >= HUF_ENCSIZE) {
                throw "Something wrong with HUF_ENCSIZE";
            }
            var freq = new Array(HUF_ENCSIZE);
            var hdec = new Array(HUF_DECSIZE);
            hufClearDecTable(hdec);
            var ni = nCompressed - (inOffset.value - initialInOffset);
            hufUnpackEncTable(uInt8Array2, inDataView, inOffset, ni, im, iM, freq);
            if (nBits > 8 * (nCompressed - (inOffset.value - initialInOffset))) {
                throw "Something wrong with hufUncompress";
            }
            hufBuildDecTable(freq, im, iM, hdec);
            hufDecode(freq, hdec, uInt8Array2, inDataView, inOffset, nBits, iM, nRaw, outBuffer, outOffset);
        }
        function applyLut(lut, data, nData) {
            for(var i = 0; i < nData; ++i){
                data[i] = lut[data[i]];
            }
        }
        function predictor(source) {
            for(var t = 1; t < source.length; t++){
                var d = source[t - 1] + source[t] - 128;
                source[t] = d;
            }
        }
        function interleaveScalar(source, out) {
            var t1 = 0;
            var t2 = Math.floor((source.length + 1) / 2);
            var s = 0;
            var stop = source.length - 1;
            while(true){
                if (s > stop) break;
                out[s++] = source[t1++];
                if (s > stop) break;
                out[s++] = source[t2++];
            }
        }
        function decodeRunLength(source) {
            var size = source.byteLength;
            var out = new Array();
            var p = 0;
            var reader = new DataView(source);
            while(size > 0){
                var l = reader.getInt8(p++);
                if (l < 0) {
                    var count = -l;
                    size -= count + 1;
                    for(var i = 0; i < count; i++){
                        out.push(reader.getUint8(p++));
                    }
                } else {
                    var count = l;
                    size -= 2;
                    var value = reader.getUint8(p++);
                    for(var i = 0; i < count + 1; i++){
                        out.push(value);
                    }
                }
            }
            return out;
        }
        function lossyDctDecode(cscSet, rowPtrs, channelData, acBuffer, dcBuffer, outBuffer) {
            var dataView = new DataView(outBuffer.buffer);
            var width = channelData[cscSet.idx[0]].width;
            var height = channelData[cscSet.idx[0]].height;
            var numComp = 3;
            var numFullBlocksX = Math.floor(width / 8);
            var numBlocksX = Math.ceil(width / 8);
            var numBlocksY = Math.ceil(height / 8);
            var leftoverX = width - (numBlocksX - 1) * 8;
            var leftoverY = height - (numBlocksY - 1) * 8;
            var currAcComp = {
                value: 0
            };
            var currDcComp = new Array(numComp);
            var dctData = new Array(numComp);
            var halfZigBlock = new Array(numComp);
            var rowBlock = new Array(numComp);
            var rowOffsets = new Array(numComp);
            for(let comp2 = 0; comp2 < numComp; ++comp2){
                rowOffsets[comp2] = rowPtrs[cscSet.idx[comp2]];
                currDcComp[comp2] = comp2 < 1 ? 0 : currDcComp[comp2 - 1] + numBlocksX * numBlocksY;
                dctData[comp2] = new Float32Array(64);
                halfZigBlock[comp2] = new Uint16Array(64);
                rowBlock[comp2] = new Uint16Array(numBlocksX * 64);
            }
            for(let blocky = 0; blocky < numBlocksY; ++blocky){
                var maxY = 8;
                if (blocky == numBlocksY - 1) maxY = leftoverY;
                var maxX = 8;
                for(let blockx = 0; blockx < numBlocksX; ++blockx){
                    if (blockx == numBlocksX - 1) maxX = leftoverX;
                    for(let comp2 = 0; comp2 < numComp; ++comp2){
                        halfZigBlock[comp2].fill(0);
                        halfZigBlock[comp2][0] = dcBuffer[currDcComp[comp2]++];
                        unRleAC(currAcComp, acBuffer, halfZigBlock[comp2]);
                        unZigZag(halfZigBlock[comp2], dctData[comp2]);
                        dctInverse(dctData[comp2]);
                    }
                    {
                        csc709Inverse(dctData);
                    }
                    for(let comp2 = 0; comp2 < numComp; ++comp2){
                        convertToHalf(dctData[comp2], rowBlock[comp2], blockx * 64);
                    }
                }
                let offset2 = 0;
                for(let comp2 = 0; comp2 < numComp; ++comp2){
                    const type2 = channelData[cscSet.idx[comp2]].type;
                    for(let y2 = 8 * blocky; y2 < 8 * blocky + maxY; ++y2){
                        offset2 = rowOffsets[comp2][y2];
                        for(let blockx = 0; blockx < numFullBlocksX; ++blockx){
                            const src = blockx * 64 + (y2 & 7) * 8;
                            dataView.setUint16(offset2 + 0 * INT16_SIZE * type2, rowBlock[comp2][src + 0], true);
                            dataView.setUint16(offset2 + 1 * INT16_SIZE * type2, rowBlock[comp2][src + 1], true);
                            dataView.setUint16(offset2 + 2 * INT16_SIZE * type2, rowBlock[comp2][src + 2], true);
                            dataView.setUint16(offset2 + 3 * INT16_SIZE * type2, rowBlock[comp2][src + 3], true);
                            dataView.setUint16(offset2 + 4 * INT16_SIZE * type2, rowBlock[comp2][src + 4], true);
                            dataView.setUint16(offset2 + 5 * INT16_SIZE * type2, rowBlock[comp2][src + 5], true);
                            dataView.setUint16(offset2 + 6 * INT16_SIZE * type2, rowBlock[comp2][src + 6], true);
                            dataView.setUint16(offset2 + 7 * INT16_SIZE * type2, rowBlock[comp2][src + 7], true);
                            offset2 += 8 * INT16_SIZE * type2;
                        }
                    }
                    if (numFullBlocksX != numBlocksX) {
                        for(let y2 = 8 * blocky; y2 < 8 * blocky + maxY; ++y2){
                            const offset3 = rowOffsets[comp2][y2] + 8 * numFullBlocksX * INT16_SIZE * type2;
                            const src = numFullBlocksX * 64 + (y2 & 7) * 8;
                            for(let x2 = 0; x2 < maxX; ++x2){
                                dataView.setUint16(offset3 + x2 * INT16_SIZE * type2, rowBlock[comp2][src + x2], true);
                            }
                        }
                    }
                }
            }
            var halfRow = new Uint16Array(width);
            var dataView = new DataView(outBuffer.buffer);
            for(var comp = 0; comp < numComp; ++comp){
                channelData[cscSet.idx[comp]].decoded = true;
                var type = channelData[cscSet.idx[comp]].type;
                if (channelData[comp].type != 2) continue;
                for(var y = 0; y < height; ++y){
                    const offset2 = rowOffsets[comp][y];
                    for(var x = 0; x < width; ++x){
                        halfRow[x] = dataView.getUint16(offset2 + x * INT16_SIZE * type, true);
                    }
                    for(var x = 0; x < width; ++x){
                        dataView.setFloat32(offset2 + x * INT16_SIZE * type, decodeFloat16(halfRow[x]), true);
                    }
                }
            }
        }
        function unRleAC(currAcComp, acBuffer, halfZigBlock) {
            var acValue;
            var dctComp = 1;
            while(dctComp < 64){
                acValue = acBuffer[currAcComp.value];
                if (acValue == 65280) {
                    dctComp = 64;
                } else if (acValue >> 8 == 255) {
                    dctComp += acValue & 255;
                } else {
                    halfZigBlock[dctComp] = acValue;
                    dctComp++;
                }
                currAcComp.value++;
            }
        }
        function unZigZag(src, dst) {
            dst[0] = decodeFloat16(src[0]);
            dst[1] = decodeFloat16(src[1]);
            dst[2] = decodeFloat16(src[5]);
            dst[3] = decodeFloat16(src[6]);
            dst[4] = decodeFloat16(src[14]);
            dst[5] = decodeFloat16(src[15]);
            dst[6] = decodeFloat16(src[27]);
            dst[7] = decodeFloat16(src[28]);
            dst[8] = decodeFloat16(src[2]);
            dst[9] = decodeFloat16(src[4]);
            dst[10] = decodeFloat16(src[7]);
            dst[11] = decodeFloat16(src[13]);
            dst[12] = decodeFloat16(src[16]);
            dst[13] = decodeFloat16(src[26]);
            dst[14] = decodeFloat16(src[29]);
            dst[15] = decodeFloat16(src[42]);
            dst[16] = decodeFloat16(src[3]);
            dst[17] = decodeFloat16(src[8]);
            dst[18] = decodeFloat16(src[12]);
            dst[19] = decodeFloat16(src[17]);
            dst[20] = decodeFloat16(src[25]);
            dst[21] = decodeFloat16(src[30]);
            dst[22] = decodeFloat16(src[41]);
            dst[23] = decodeFloat16(src[43]);
            dst[24] = decodeFloat16(src[9]);
            dst[25] = decodeFloat16(src[11]);
            dst[26] = decodeFloat16(src[18]);
            dst[27] = decodeFloat16(src[24]);
            dst[28] = decodeFloat16(src[31]);
            dst[29] = decodeFloat16(src[40]);
            dst[30] = decodeFloat16(src[44]);
            dst[31] = decodeFloat16(src[53]);
            dst[32] = decodeFloat16(src[10]);
            dst[33] = decodeFloat16(src[19]);
            dst[34] = decodeFloat16(src[23]);
            dst[35] = decodeFloat16(src[32]);
            dst[36] = decodeFloat16(src[39]);
            dst[37] = decodeFloat16(src[45]);
            dst[38] = decodeFloat16(src[52]);
            dst[39] = decodeFloat16(src[54]);
            dst[40] = decodeFloat16(src[20]);
            dst[41] = decodeFloat16(src[22]);
            dst[42] = decodeFloat16(src[33]);
            dst[43] = decodeFloat16(src[38]);
            dst[44] = decodeFloat16(src[46]);
            dst[45] = decodeFloat16(src[51]);
            dst[46] = decodeFloat16(src[55]);
            dst[47] = decodeFloat16(src[60]);
            dst[48] = decodeFloat16(src[21]);
            dst[49] = decodeFloat16(src[34]);
            dst[50] = decodeFloat16(src[37]);
            dst[51] = decodeFloat16(src[47]);
            dst[52] = decodeFloat16(src[50]);
            dst[53] = decodeFloat16(src[56]);
            dst[54] = decodeFloat16(src[59]);
            dst[55] = decodeFloat16(src[61]);
            dst[56] = decodeFloat16(src[35]);
            dst[57] = decodeFloat16(src[36]);
            dst[58] = decodeFloat16(src[48]);
            dst[59] = decodeFloat16(src[49]);
            dst[60] = decodeFloat16(src[57]);
            dst[61] = decodeFloat16(src[58]);
            dst[62] = decodeFloat16(src[62]);
            dst[63] = decodeFloat16(src[63]);
        }
        function dctInverse(data) {
            const a = 0.5 * Math.cos(3.14159 / 4);
            const b = 0.5 * Math.cos(3.14159 / 16);
            const c = 0.5 * Math.cos(3.14159 / 8);
            const d = 0.5 * Math.cos(3 * 3.14159 / 16);
            const e = 0.5 * Math.cos(5 * 3.14159 / 16);
            const f = 0.5 * Math.cos(3 * 3.14159 / 8);
            const g = 0.5 * Math.cos(7 * 3.14159 / 16);
            var alpha = new Array(4);
            var beta = new Array(4);
            var theta = new Array(4);
            var gamma = new Array(4);
            for(var row = 0; row < 8; ++row){
                var rowPtr = row * 8;
                alpha[0] = c * data[rowPtr + 2];
                alpha[1] = f * data[rowPtr + 2];
                alpha[2] = c * data[rowPtr + 6];
                alpha[3] = f * data[rowPtr + 6];
                beta[0] = b * data[rowPtr + 1] + d * data[rowPtr + 3] + e * data[rowPtr + 5] + g * data[rowPtr + 7];
                beta[1] = d * data[rowPtr + 1] - g * data[rowPtr + 3] - b * data[rowPtr + 5] - e * data[rowPtr + 7];
                beta[2] = e * data[rowPtr + 1] - b * data[rowPtr + 3] + g * data[rowPtr + 5] + d * data[rowPtr + 7];
                beta[3] = g * data[rowPtr + 1] - e * data[rowPtr + 3] + d * data[rowPtr + 5] - b * data[rowPtr + 7];
                theta[0] = a * (data[rowPtr + 0] + data[rowPtr + 4]);
                theta[3] = a * (data[rowPtr + 0] - data[rowPtr + 4]);
                theta[1] = alpha[0] + alpha[3];
                theta[2] = alpha[1] - alpha[2];
                gamma[0] = theta[0] + theta[1];
                gamma[1] = theta[3] + theta[2];
                gamma[2] = theta[3] - theta[2];
                gamma[3] = theta[0] - theta[1];
                data[rowPtr + 0] = gamma[0] + beta[0];
                data[rowPtr + 1] = gamma[1] + beta[1];
                data[rowPtr + 2] = gamma[2] + beta[2];
                data[rowPtr + 3] = gamma[3] + beta[3];
                data[rowPtr + 4] = gamma[3] - beta[3];
                data[rowPtr + 5] = gamma[2] - beta[2];
                data[rowPtr + 6] = gamma[1] - beta[1];
                data[rowPtr + 7] = gamma[0] - beta[0];
            }
            for(var column = 0; column < 8; ++column){
                alpha[0] = c * data[16 + column];
                alpha[1] = f * data[16 + column];
                alpha[2] = c * data[48 + column];
                alpha[3] = f * data[48 + column];
                beta[0] = b * data[8 + column] + d * data[24 + column] + e * data[40 + column] + g * data[56 + column];
                beta[1] = d * data[8 + column] - g * data[24 + column] - b * data[40 + column] - e * data[56 + column];
                beta[2] = e * data[8 + column] - b * data[24 + column] + g * data[40 + column] + d * data[56 + column];
                beta[3] = g * data[8 + column] - e * data[24 + column] + d * data[40 + column] - b * data[56 + column];
                theta[0] = a * (data[column] + data[32 + column]);
                theta[3] = a * (data[column] - data[32 + column]);
                theta[1] = alpha[0] + alpha[3];
                theta[2] = alpha[1] - alpha[2];
                gamma[0] = theta[0] + theta[1];
                gamma[1] = theta[3] + theta[2];
                gamma[2] = theta[3] - theta[2];
                gamma[3] = theta[0] - theta[1];
                data[0 + column] = gamma[0] + beta[0];
                data[8 + column] = gamma[1] + beta[1];
                data[16 + column] = gamma[2] + beta[2];
                data[24 + column] = gamma[3] + beta[3];
                data[32 + column] = gamma[3] - beta[3];
                data[40 + column] = gamma[2] - beta[2];
                data[48 + column] = gamma[1] - beta[1];
                data[56 + column] = gamma[0] - beta[0];
            }
        }
        function csc709Inverse(data) {
            for(var i = 0; i < 64; ++i){
                var y = data[0][i];
                var cb = data[1][i];
                var cr = data[2][i];
                data[0][i] = y + 1.5747 * cr;
                data[1][i] = y - 0.1873 * cb - 0.4682 * cr;
                data[2][i] = y + 1.8556 * cb;
            }
        }
        function convertToHalf(src, dst, idx) {
            for(var i = 0; i < 64; ++i){
                dst[idx + i] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataUtils"].toHalfFloat(toLinear(src[i]));
            }
        }
        function toLinear(float) {
            if (float <= 1) {
                return Math.sign(float) * Math.pow(Math.abs(float), 2.2);
            } else {
                return Math.sign(float) * Math.pow(logBase, Math.abs(float) - 1);
            }
        }
        function uncompressRAW(info) {
            return new DataView(info.array.buffer, info.offset.value, info.size);
        }
        function uncompressRLE(info) {
            var compressed = info.viewer.buffer.slice(info.offset.value, info.offset.value + info.size);
            var rawBuffer = new Uint8Array(decodeRunLength(compressed));
            var tmpBuffer = new Uint8Array(rawBuffer.length);
            predictor(rawBuffer);
            interleaveScalar(rawBuffer, tmpBuffer);
            return new DataView(tmpBuffer.buffer);
        }
        function uncompressZIP(info) {
            var compressed = info.array.slice(info.offset.value, info.offset.value + info.size);
            var rawBuffer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$node_modules$2f$fflate$2f$esm$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unzlibSync"])(compressed);
            var tmpBuffer = new Uint8Array(rawBuffer.length);
            predictor(rawBuffer);
            interleaveScalar(rawBuffer, tmpBuffer);
            return new DataView(tmpBuffer.buffer);
        }
        function uncompressPIZ(info) {
            var inDataView = info.viewer;
            var inOffset = {
                value: info.offset.value
            };
            var outBuffer = new Uint16Array(info.width * info.scanlineBlockSize * (info.channels * info.type));
            var bitmap = new Uint8Array(BITMAP_SIZE);
            var outBufferEnd = 0;
            var pizChannelData = new Array(info.channels);
            for(var i = 0; i < info.channels; i++){
                pizChannelData[i] = {};
                pizChannelData[i]["start"] = outBufferEnd;
                pizChannelData[i]["end"] = pizChannelData[i]["start"];
                pizChannelData[i]["nx"] = info.width;
                pizChannelData[i]["ny"] = info.lines;
                pizChannelData[i]["size"] = info.type;
                outBufferEnd += pizChannelData[i].nx * pizChannelData[i].ny * pizChannelData[i].size;
            }
            var minNonZero = parseUint16(inDataView, inOffset);
            var maxNonZero = parseUint16(inDataView, inOffset);
            if (maxNonZero >= BITMAP_SIZE) {
                throw "Something is wrong with PIZ_COMPRESSION BITMAP_SIZE";
            }
            if (minNonZero <= maxNonZero) {
                for(var i = 0; i < maxNonZero - minNonZero + 1; i++){
                    bitmap[i + minNonZero] = parseUint8(inDataView, inOffset);
                }
            }
            var lut = new Uint16Array(USHORT_RANGE);
            var maxValue = reverseLutFromBitmap(bitmap, lut);
            var length = parseUint32(inDataView, inOffset);
            hufUncompress(info.array, inDataView, inOffset, length, outBuffer, outBufferEnd);
            for(var i = 0; i < info.channels; ++i){
                var cd = pizChannelData[i];
                for(var j = 0; j < pizChannelData[i].size; ++j){
                    wav2Decode(outBuffer, cd.start + j, cd.nx, cd.size, cd.ny, cd.nx * cd.size, maxValue);
                }
            }
            applyLut(lut, outBuffer, outBufferEnd);
            var tmpOffset2 = 0;
            var tmpBuffer = new Uint8Array(outBuffer.buffer.byteLength);
            for(var y = 0; y < info.lines; y++){
                for(var c = 0; c < info.channels; c++){
                    var cd = pizChannelData[c];
                    var n = cd.nx * cd.size;
                    var cp = new Uint8Array(outBuffer.buffer, cd.end * INT16_SIZE, n * INT16_SIZE);
                    tmpBuffer.set(cp, tmpOffset2);
                    tmpOffset2 += n * INT16_SIZE;
                    cd.end += n;
                }
            }
            return new DataView(tmpBuffer.buffer);
        }
        function uncompressPXR(info) {
            var compressed = info.array.slice(info.offset.value, info.offset.value + info.size);
            var rawBuffer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$node_modules$2f$fflate$2f$esm$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unzlibSync"])(compressed);
            const sz = info.lines * info.channels * info.width;
            const tmpBuffer = info.type == 1 ? new Uint16Array(sz) : new Uint32Array(sz);
            let tmpBufferEnd = 0;
            let writePtr = 0;
            const ptr = new Array(4);
            for(let y = 0; y < info.lines; y++){
                for(let c = 0; c < info.channels; c++){
                    let pixel = 0;
                    switch(info.type){
                        case 1:
                            ptr[0] = tmpBufferEnd;
                            ptr[1] = ptr[0] + info.width;
                            tmpBufferEnd = ptr[1] + info.width;
                            for(let j = 0; j < info.width; ++j){
                                const diff = rawBuffer[ptr[0]++] << 8 | rawBuffer[ptr[1]++];
                                pixel += diff;
                                tmpBuffer[writePtr] = pixel;
                                writePtr++;
                            }
                            break;
                        case 2:
                            ptr[0] = tmpBufferEnd;
                            ptr[1] = ptr[0] + info.width;
                            ptr[2] = ptr[1] + info.width;
                            tmpBufferEnd = ptr[2] + info.width;
                            for(let j = 0; j < info.width; ++j){
                                const diff = rawBuffer[ptr[0]++] << 24 | rawBuffer[ptr[1]++] << 16 | rawBuffer[ptr[2]++] << 8;
                                pixel += diff;
                                tmpBuffer[writePtr] = pixel;
                                writePtr++;
                            }
                            break;
                    }
                }
            }
            return new DataView(tmpBuffer.buffer);
        }
        function uncompressDWA(info) {
            var inDataView = info.viewer;
            var inOffset = {
                value: info.offset.value
            };
            var outBuffer = new Uint8Array(info.width * info.lines * (info.channels * info.type * INT16_SIZE));
            var dwaHeader = {
                version: parseInt64(inDataView, inOffset),
                unknownUncompressedSize: parseInt64(inDataView, inOffset),
                unknownCompressedSize: parseInt64(inDataView, inOffset),
                acCompressedSize: parseInt64(inDataView, inOffset),
                dcCompressedSize: parseInt64(inDataView, inOffset),
                rleCompressedSize: parseInt64(inDataView, inOffset),
                rleUncompressedSize: parseInt64(inDataView, inOffset),
                rleRawSize: parseInt64(inDataView, inOffset),
                totalAcUncompressedCount: parseInt64(inDataView, inOffset),
                totalDcUncompressedCount: parseInt64(inDataView, inOffset),
                acCompression: parseInt64(inDataView, inOffset)
            };
            if (dwaHeader.version < 2) {
                throw "EXRLoader.parse: " + EXRHeader.compression + " version " + dwaHeader.version + " is unsupported";
            }
            var channelRules = new Array();
            var ruleSize = parseUint16(inDataView, inOffset) - INT16_SIZE;
            while(ruleSize > 0){
                var name = parseNullTerminatedString(inDataView.buffer, inOffset);
                var value = parseUint8(inDataView, inOffset);
                var compression = value >> 2 & 3;
                var csc = (value >> 4) - 1;
                var index = new Int8Array([
                    csc
                ])[0];
                var type = parseUint8(inDataView, inOffset);
                channelRules.push({
                    name,
                    index,
                    type,
                    compression
                });
                ruleSize -= name.length + 3;
            }
            var channels = EXRHeader.channels;
            var channelData = new Array(info.channels);
            for(var i = 0; i < info.channels; ++i){
                var cd = channelData[i] = {};
                var channel = channels[i];
                cd.name = channel.name;
                cd.compression = UNKNOWN;
                cd.decoded = false;
                cd.type = channel.pixelType;
                cd.pLinear = channel.pLinear;
                cd.width = info.width;
                cd.height = info.lines;
            }
            var cscSet = {
                idx: new Array(3)
            };
            for(var offset2 = 0; offset2 < info.channels; ++offset2){
                var cd = channelData[offset2];
                for(var i = 0; i < channelRules.length; ++i){
                    var rule = channelRules[i];
                    if (cd.name == rule.name) {
                        cd.compression = rule.compression;
                        if (rule.index >= 0) {
                            cscSet.idx[rule.index] = offset2;
                        }
                        cd.offset = offset2;
                    }
                }
            }
            if (dwaHeader.acCompressedSize > 0) {
                switch(dwaHeader.acCompression){
                    case STATIC_HUFFMAN:
                        var acBuffer = new Uint16Array(dwaHeader.totalAcUncompressedCount);
                        hufUncompress(info.array, inDataView, inOffset, dwaHeader.acCompressedSize, acBuffer, dwaHeader.totalAcUncompressedCount);
                        break;
                    case DEFLATE:
                        var compressed = info.array.slice(inOffset.value, inOffset.value + dwaHeader.totalAcUncompressedCount);
                        var data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$node_modules$2f$fflate$2f$esm$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unzlibSync"])(compressed);
                        var acBuffer = new Uint16Array(data.buffer);
                        inOffset.value += dwaHeader.totalAcUncompressedCount;
                        break;
                }
            }
            if (dwaHeader.dcCompressedSize > 0) {
                var zlibInfo = {
                    array: info.array,
                    offset: inOffset,
                    size: dwaHeader.dcCompressedSize
                };
                var dcBuffer = new Uint16Array(uncompressZIP(zlibInfo).buffer);
                inOffset.value += dwaHeader.dcCompressedSize;
            }
            if (dwaHeader.rleRawSize > 0) {
                var compressed = info.array.slice(inOffset.value, inOffset.value + dwaHeader.rleCompressedSize);
                var data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2d$stdlib$2f$node_modules$2f$fflate$2f$esm$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unzlibSync"])(compressed);
                var rleBuffer = decodeRunLength(data.buffer);
                inOffset.value += dwaHeader.rleCompressedSize;
            }
            var outBufferEnd = 0;
            var rowOffsets = new Array(channelData.length);
            for(var i = 0; i < rowOffsets.length; ++i){
                rowOffsets[i] = new Array();
            }
            for(var y = 0; y < info.lines; ++y){
                for(var chan = 0; chan < channelData.length; ++chan){
                    rowOffsets[chan].push(outBufferEnd);
                    outBufferEnd += channelData[chan].width * info.type * INT16_SIZE;
                }
            }
            lossyDctDecode(cscSet, rowOffsets, channelData, acBuffer, dcBuffer, outBuffer);
            for(var i = 0; i < channelData.length; ++i){
                var cd = channelData[i];
                if (cd.decoded) continue;
                switch(cd.compression){
                    case RLE:
                        var row = 0;
                        var rleOffset = 0;
                        for(var y = 0; y < info.lines; ++y){
                            var rowOffsetBytes = rowOffsets[i][row];
                            for(var x = 0; x < cd.width; ++x){
                                for(var byte = 0; byte < INT16_SIZE * cd.type; ++byte){
                                    outBuffer[rowOffsetBytes++] = rleBuffer[rleOffset + byte * cd.width * cd.height];
                                }
                                rleOffset++;
                            }
                            row++;
                        }
                        break;
                    case LOSSY_DCT:
                    default:
                        throw "EXRLoader.parse: unsupported channel compression";
                }
            }
            return new DataView(outBuffer.buffer);
        }
        function parseNullTerminatedString(buffer2, offset2) {
            var uintBuffer = new Uint8Array(buffer2);
            var endOffset = 0;
            while(uintBuffer[offset2.value + endOffset] != 0){
                endOffset += 1;
            }
            var stringValue = new TextDecoder().decode(uintBuffer.slice(offset2.value, offset2.value + endOffset));
            offset2.value = offset2.value + endOffset + 1;
            return stringValue;
        }
        function parseFixedLengthString(buffer2, offset2, size) {
            var stringValue = new TextDecoder().decode(new Uint8Array(buffer2).slice(offset2.value, offset2.value + size));
            offset2.value = offset2.value + size;
            return stringValue;
        }
        function parseRational(dataView, offset2) {
            var x = parseInt32(dataView, offset2);
            var y = parseUint32(dataView, offset2);
            return [
                x,
                y
            ];
        }
        function parseTimecode(dataView, offset2) {
            var x = parseUint32(dataView, offset2);
            var y = parseUint32(dataView, offset2);
            return [
                x,
                y
            ];
        }
        function parseInt32(dataView, offset2) {
            var Int32 = dataView.getInt32(offset2.value, true);
            offset2.value = offset2.value + INT32_SIZE;
            return Int32;
        }
        function parseUint32(dataView, offset2) {
            var Uint32 = dataView.getUint32(offset2.value, true);
            offset2.value = offset2.value + INT32_SIZE;
            return Uint32;
        }
        function parseUint8Array(uInt8Array2, offset2) {
            var Uint8 = uInt8Array2[offset2.value];
            offset2.value = offset2.value + INT8_SIZE;
            return Uint8;
        }
        function parseUint8(dataView, offset2) {
            var Uint8 = dataView.getUint8(offset2.value);
            offset2.value = offset2.value + INT8_SIZE;
            return Uint8;
        }
        const parseInt64 = function(dataView, offset2) {
            let int;
            if ("getBigInt64" in DataView.prototype) {
                int = Number(dataView.getBigInt64(offset2.value, true));
            } else {
                int = dataView.getUint32(offset2.value + 4, true) + Number(dataView.getUint32(offset2.value, true) << 32);
            }
            offset2.value += ULONG_SIZE;
            return int;
        };
        function parseFloat32(dataView, offset2) {
            var float = dataView.getFloat32(offset2.value, true);
            offset2.value += FLOAT32_SIZE;
            return float;
        }
        function decodeFloat32(dataView, offset2) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataUtils"].toHalfFloat(parseFloat32(dataView, offset2));
        }
        function decodeFloat16(binary) {
            var exponent = (binary & 31744) >> 10, fraction = binary & 1023;
            return (binary >> 15 ? -1 : 1) * (exponent ? exponent === 31 ? fraction ? NaN : Infinity : Math.pow(2, exponent - 15) * (1 + fraction / 1024) : 6103515625e-14 * (fraction / 1024));
        }
        function parseUint16(dataView, offset2) {
            var Uint16 = dataView.getUint16(offset2.value, true);
            offset2.value += INT16_SIZE;
            return Uint16;
        }
        function parseFloat16(buffer2, offset2) {
            return decodeFloat16(parseUint16(buffer2, offset2));
        }
        function parseChlist(dataView, buffer2, offset2, size) {
            var startOffset = offset2.value;
            var channels = [];
            while(offset2.value < startOffset + size - 1){
                var name = parseNullTerminatedString(buffer2, offset2);
                var pixelType = parseInt32(dataView, offset2);
                var pLinear = parseUint8(dataView, offset2);
                offset2.value += 3;
                var xSampling = parseInt32(dataView, offset2);
                var ySampling = parseInt32(dataView, offset2);
                channels.push({
                    name,
                    pixelType,
                    pLinear,
                    xSampling,
                    ySampling
                });
            }
            offset2.value += 1;
            return channels;
        }
        function parseChromaticities(dataView, offset2) {
            var redX = parseFloat32(dataView, offset2);
            var redY = parseFloat32(dataView, offset2);
            var greenX = parseFloat32(dataView, offset2);
            var greenY = parseFloat32(dataView, offset2);
            var blueX = parseFloat32(dataView, offset2);
            var blueY = parseFloat32(dataView, offset2);
            var whiteX = parseFloat32(dataView, offset2);
            var whiteY = parseFloat32(dataView, offset2);
            return {
                redX,
                redY,
                greenX,
                greenY,
                blueX,
                blueY,
                whiteX,
                whiteY
            };
        }
        function parseCompression(dataView, offset2) {
            var compressionCodes = [
                "NO_COMPRESSION",
                "RLE_COMPRESSION",
                "ZIPS_COMPRESSION",
                "ZIP_COMPRESSION",
                "PIZ_COMPRESSION",
                "PXR24_COMPRESSION",
                "B44_COMPRESSION",
                "B44A_COMPRESSION",
                "DWAA_COMPRESSION",
                "DWAB_COMPRESSION"
            ];
            var compression = parseUint8(dataView, offset2);
            return compressionCodes[compression];
        }
        function parseBox2i(dataView, offset2) {
            var xMin = parseUint32(dataView, offset2);
            var yMin = parseUint32(dataView, offset2);
            var xMax = parseUint32(dataView, offset2);
            var yMax = parseUint32(dataView, offset2);
            return {
                xMin,
                yMin,
                xMax,
                yMax
            };
        }
        function parseLineOrder(dataView, offset2) {
            var lineOrders = [
                "INCREASING_Y"
            ];
            var lineOrder = parseUint8(dataView, offset2);
            return lineOrders[lineOrder];
        }
        function parseV2f(dataView, offset2) {
            var x = parseFloat32(dataView, offset2);
            var y = parseFloat32(dataView, offset2);
            return [
                x,
                y
            ];
        }
        function parseV3f(dataView, offset2) {
            var x = parseFloat32(dataView, offset2);
            var y = parseFloat32(dataView, offset2);
            var z = parseFloat32(dataView, offset2);
            return [
                x,
                y,
                z
            ];
        }
        function parseValue(dataView, buffer2, offset2, type, size) {
            if (type === "string" || type === "stringvector" || type === "iccProfile") {
                return parseFixedLengthString(buffer2, offset2, size);
            } else if (type === "chlist") {
                return parseChlist(dataView, buffer2, offset2, size);
            } else if (type === "chromaticities") {
                return parseChromaticities(dataView, offset2);
            } else if (type === "compression") {
                return parseCompression(dataView, offset2);
            } else if (type === "box2i") {
                return parseBox2i(dataView, offset2);
            } else if (type === "lineOrder") {
                return parseLineOrder(dataView, offset2);
            } else if (type === "float") {
                return parseFloat32(dataView, offset2);
            } else if (type === "v2f") {
                return parseV2f(dataView, offset2);
            } else if (type === "v3f") {
                return parseV3f(dataView, offset2);
            } else if (type === "int") {
                return parseInt32(dataView, offset2);
            } else if (type === "rational") {
                return parseRational(dataView, offset2);
            } else if (type === "timecode") {
                return parseTimecode(dataView, offset2);
            } else if (type === "preview") {
                offset2.value += size;
                return "skipped";
            } else {
                offset2.value += size;
                return void 0;
            }
        }
        function parseHeader(dataView, buffer2, offset2) {
            const EXRHeader2 = {};
            if (dataView.getUint32(0, true) != 20000630) {
                throw "THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.";
            }
            EXRHeader2.version = dataView.getUint8(4);
            const spec = dataView.getUint8(5);
            EXRHeader2.spec = {
                singleTile: !!(spec & 2),
                longName: !!(spec & 4),
                deepFormat: !!(spec & 8),
                multiPart: !!(spec & 16)
            };
            offset2.value = 8;
            var keepReading = true;
            while(keepReading){
                var attributeName = parseNullTerminatedString(buffer2, offset2);
                if (attributeName == 0) {
                    keepReading = false;
                } else {
                    var attributeType = parseNullTerminatedString(buffer2, offset2);
                    var attributeSize = parseUint32(dataView, offset2);
                    var attributeValue = parseValue(dataView, buffer2, offset2, attributeType, attributeSize);
                    if (attributeValue === void 0) {
                        console.warn("EXRLoader.parse: skipped unknown header attribute type '".concat(attributeType, "'."));
                    } else {
                        EXRHeader2[attributeName] = attributeValue;
                    }
                }
            }
            if ((spec & ~4) != 0) {
                console.error("EXRHeader:", EXRHeader2);
                throw "THREE.EXRLoader: provided file is currently unsupported.";
            }
            return EXRHeader2;
        }
        function setupDecoder(EXRHeader2, dataView, uInt8Array2, offset2, outputType) {
            const EXRDecoder2 = {
                size: 0,
                viewer: dataView,
                array: uInt8Array2,
                offset: offset2,
                width: EXRHeader2.dataWindow.xMax - EXRHeader2.dataWindow.xMin + 1,
                height: EXRHeader2.dataWindow.yMax - EXRHeader2.dataWindow.yMin + 1,
                channels: EXRHeader2.channels.length,
                bytesPerLine: null,
                lines: null,
                inputSize: null,
                type: EXRHeader2.channels[0].pixelType,
                uncompress: null,
                getter: null,
                format: null,
                [hasColorSpace ? "colorSpace" : "encoding"]: null
            };
            switch(EXRHeader2.compression){
                case "NO_COMPRESSION":
                    EXRDecoder2.lines = 1;
                    EXRDecoder2.uncompress = uncompressRAW;
                    break;
                case "RLE_COMPRESSION":
                    EXRDecoder2.lines = 1;
                    EXRDecoder2.uncompress = uncompressRLE;
                    break;
                case "ZIPS_COMPRESSION":
                    EXRDecoder2.lines = 1;
                    EXRDecoder2.uncompress = uncompressZIP;
                    break;
                case "ZIP_COMPRESSION":
                    EXRDecoder2.lines = 16;
                    EXRDecoder2.uncompress = uncompressZIP;
                    break;
                case "PIZ_COMPRESSION":
                    EXRDecoder2.lines = 32;
                    EXRDecoder2.uncompress = uncompressPIZ;
                    break;
                case "PXR24_COMPRESSION":
                    EXRDecoder2.lines = 16;
                    EXRDecoder2.uncompress = uncompressPXR;
                    break;
                case "DWAA_COMPRESSION":
                    EXRDecoder2.lines = 32;
                    EXRDecoder2.uncompress = uncompressDWA;
                    break;
                case "DWAB_COMPRESSION":
                    EXRDecoder2.lines = 256;
                    EXRDecoder2.uncompress = uncompressDWA;
                    break;
                default:
                    throw "EXRLoader.parse: " + EXRHeader2.compression + " is unsupported";
            }
            EXRDecoder2.scanlineBlockSize = EXRDecoder2.lines;
            if (EXRDecoder2.type == 1) {
                switch(outputType){
                    case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatType"]:
                        EXRDecoder2.getter = parseFloat16;
                        EXRDecoder2.inputSize = INT16_SIZE;
                        break;
                    case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HalfFloatType"]:
                        EXRDecoder2.getter = parseUint16;
                        EXRDecoder2.inputSize = INT16_SIZE;
                        break;
                }
            } else if (EXRDecoder2.type == 2) {
                switch(outputType){
                    case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatType"]:
                        EXRDecoder2.getter = parseFloat32;
                        EXRDecoder2.inputSize = FLOAT32_SIZE;
                        break;
                    case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HalfFloatType"]:
                        EXRDecoder2.getter = decodeFloat32;
                        EXRDecoder2.inputSize = FLOAT32_SIZE;
                }
            } else {
                throw "EXRLoader.parse: unsupported pixelType " + EXRDecoder2.type + " for " + EXRHeader2.compression + ".";
            }
            EXRDecoder2.blockCount = (EXRHeader2.dataWindow.yMax + 1) / EXRDecoder2.scanlineBlockSize;
            for(var i = 0; i < EXRDecoder2.blockCount; i++)parseInt64(dataView, offset2);
            EXRDecoder2.outputChannels = EXRDecoder2.channels == 3 ? 4 : EXRDecoder2.channels;
            const size = EXRDecoder2.width * EXRDecoder2.height * EXRDecoder2.outputChannels;
            switch(outputType){
                case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatType"]:
                    EXRDecoder2.byteArray = new Float32Array(size);
                    if (EXRDecoder2.channels < EXRDecoder2.outputChannels) EXRDecoder2.byteArray.fill(1, 0, size);
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HalfFloatType"]:
                    EXRDecoder2.byteArray = new Uint16Array(size);
                    if (EXRDecoder2.channels < EXRDecoder2.outputChannels) EXRDecoder2.byteArray.fill(15360, 0, size);
                    break;
                default:
                    console.error("THREE.EXRLoader: unsupported type: ", outputType);
                    break;
            }
            EXRDecoder2.bytesPerLine = EXRDecoder2.width * EXRDecoder2.inputSize * EXRDecoder2.channels;
            if (EXRDecoder2.outputChannels == 4) EXRDecoder2.format = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBAFormat"];
            else EXRDecoder2.format = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RedFormat"];
            if (hasColorSpace) EXRDecoder2.colorSpace = "srgb-linear";
            else EXRDecoder2.encoding = 3e3;
            return EXRDecoder2;
        }
        const bufferDataView = new DataView(buffer);
        const uInt8Array = new Uint8Array(buffer);
        const offset = {
            value: 0
        };
        const EXRHeader = parseHeader(bufferDataView, buffer, offset);
        const EXRDecoder = setupDecoder(EXRHeader, bufferDataView, uInt8Array, offset, this.type);
        const tmpOffset = {
            value: 0
        };
        const channelOffsets = {
            R: 0,
            G: 1,
            B: 2,
            A: 3,
            Y: 0
        };
        for(let scanlineBlockIdx = 0; scanlineBlockIdx < EXRDecoder.height / EXRDecoder.scanlineBlockSize; scanlineBlockIdx++){
            const line = parseUint32(bufferDataView, offset);
            EXRDecoder.size = parseUint32(bufferDataView, offset);
            EXRDecoder.lines = line + EXRDecoder.scanlineBlockSize > EXRDecoder.height ? EXRDecoder.height - line : EXRDecoder.scanlineBlockSize;
            const isCompressed = EXRDecoder.size < EXRDecoder.lines * EXRDecoder.bytesPerLine;
            const viewer = isCompressed ? EXRDecoder.uncompress(EXRDecoder) : uncompressRAW(EXRDecoder);
            offset.value += EXRDecoder.size;
            for(let line_y = 0; line_y < EXRDecoder.scanlineBlockSize; line_y++){
                const true_y = line_y + scanlineBlockIdx * EXRDecoder.scanlineBlockSize;
                if (true_y >= EXRDecoder.height) break;
                for(let channelID = 0; channelID < EXRDecoder.channels; channelID++){
                    const cOff = channelOffsets[EXRHeader.channels[channelID].name];
                    for(let x = 0; x < EXRDecoder.width; x++){
                        tmpOffset.value = (line_y * (EXRDecoder.channels * EXRDecoder.width) + channelID * EXRDecoder.width + x) * EXRDecoder.inputSize;
                        const outIndex = (EXRDecoder.height - 1 - true_y) * (EXRDecoder.width * EXRDecoder.outputChannels) + x * EXRDecoder.outputChannels + cOff;
                        EXRDecoder.byteArray[outIndex] = EXRDecoder.getter(viewer, tmpOffset);
                    }
                }
            }
        }
        return {
            header: EXRHeader,
            width: EXRDecoder.width,
            height: EXRDecoder.height,
            data: EXRDecoder.byteArray,
            format: EXRDecoder.format,
            [hasColorSpace ? "colorSpace" : "encoding"]: EXRDecoder[hasColorSpace ? "colorSpace" : "encoding"],
            type: this.type
        };
    }
    setDataType(value) {
        this.type = value;
        return this;
    }
    load(url, onLoad, onProgress, onError) {
        function onLoadCallback(texture, texData) {
            if (hasColorSpace) texture.colorSpace = texData.colorSpace;
            else texture.encoding = texData.encoding;
            texture.minFilter = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"];
            texture.magFilter = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"];
            texture.generateMipmaps = false;
            texture.flipY = false;
            if (onLoad) onLoad(texture, texData);
        }
        return super.load(url, onLoadCallback, onProgress, onError);
    }
    constructor(manager){
        super(manager);
        this.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HalfFloatType"];
    }
}
;
 //# sourceMappingURL=EXRLoader.js.map
}),
]);

//# sourceMappingURL=ce80c_three-stdlib_4673a4b5._.js.map