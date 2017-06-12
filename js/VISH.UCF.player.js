(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.UCFPlayer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  return JSON.stringify(v);
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage(){
  try {
    return window.localStorage;
  } catch (e) {}
}

},{"./debug":2}],2:[function(require,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":4}],3:[function(require,module,exports){
(function (global){
// Copyright (C) 2011-2012 Software Languages Lab, Vrije Universiteit Brussel
// This code is dual-licensed under both the Apache License and the MPL

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is a shim for the ES-Harmony reflection module
 *
 * The Initial Developer of the Original Code is
 * Tom Van Cutsem, Vrije Universiteit Brussel.
 * Portions created by the Initial Developer are Copyright (C) 2011-2012
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 */

 // ----------------------------------------------------------------------------

 // This file is a polyfill for the upcoming ECMAScript Reflect API,
 // including support for Proxies. See the draft specification at:
 // http://wiki.ecmascript.org/doku.php?id=harmony:reflect_api
 // http://wiki.ecmascript.org/doku.php?id=harmony:direct_proxies

 // For an implementation of the Handler API, see handlers.js, which implements:
 // http://wiki.ecmascript.org/doku.php?id=harmony:virtual_object_api

 // This implementation supersedes the earlier polyfill at:
 // code.google.com/p/es-lab/source/browse/trunk/src/proxies/DirectProxies.js

 // This code was tested on tracemonkey / Firefox 12
//  (and should run fine on older Firefox versions starting with FF4)
 // The code also works correctly on
 //   v8 --harmony_proxies --harmony_weakmaps (v3.6.5.1)

 // Language Dependencies:
 //  - ECMAScript 5/strict
 //  - "old" (i.e. non-direct) Harmony Proxies
 //  - Harmony WeakMaps
 // Patches:
 //  - Object.{freeze,seal,preventExtensions}
 //  - Object.{isFrozen,isSealed,isExtensible}
 //  - Object.getPrototypeOf
 //  - Object.keys
 //  - Object.prototype.valueOf
 //  - Object.prototype.isPrototypeOf
 //  - Object.prototype.toString
 //  - Object.prototype.hasOwnProperty
 //  - Object.getOwnPropertyDescriptor
 //  - Object.defineProperty
 //  - Object.defineProperties
 //  - Object.getOwnPropertyNames
 //  - Object.getOwnPropertySymbols
 //  - Object.getPrototypeOf
 //  - Object.setPrototypeOf
 //  - Object.assign
 //  - Function.prototype.toString
 //  - Date.prototype.toString
 //  - Array.isArray
 //  - Array.prototype.concat
 //  - Proxy
 // Adds new globals:
 //  - Reflect

 // Direct proxies can be created via Proxy(target, handler)

 // ----------------------------------------------------------------------------

(function(global){ // function-as-module pattern
"use strict";

// === Direct Proxies: Invariant Enforcement ===

// Direct proxies build on non-direct proxies by automatically wrapping
// all user-defined proxy handlers in a Validator handler that checks and
// enforces ES5 invariants.

// A direct proxy is a proxy for an existing object called the target object.

// A Validator handler is a wrapper for a target proxy handler H.
// The Validator forwards all operations to H, but additionally
// performs a number of integrity checks on the results of some traps,
// to make sure H does not violate the ES5 invariants w.r.t. non-configurable
// properties and non-extensible, sealed or frozen objects.

// For each property that H exposes as own, non-configurable
// (e.g. by returning a descriptor from a call to getOwnPropertyDescriptor)
// the Validator handler defines those properties on the target object.
// When the proxy becomes non-extensible, also configurable own properties
// are checked against the target.
// We will call properties that are defined on the target object
// "fixed properties".

// We will name fixed non-configurable properties "sealed properties".
// We will name fixed non-configurable non-writable properties "frozen
// properties".

// The Validator handler upholds the following invariants w.r.t. non-configurability:
// - getOwnPropertyDescriptor cannot report sealed properties as non-existent
// - getOwnPropertyDescriptor cannot report incompatible changes to the
//   attributes of a sealed property (e.g. reporting a non-configurable
//   property as configurable, or reporting a non-configurable, non-writable
//   property as writable)
// - getPropertyDescriptor cannot report sealed properties as non-existent
// - getPropertyDescriptor cannot report incompatible changes to the
//   attributes of a sealed property. It _can_ report incompatible changes
//   to the attributes of non-own, inherited properties.
// - defineProperty cannot make incompatible changes to the attributes of
//   sealed properties
// - deleteProperty cannot report a successful deletion of a sealed property
// - hasOwn cannot report a sealed property as non-existent
// - has cannot report a sealed property as non-existent
// - get cannot report inconsistent values for frozen data
//   properties, and must report undefined for sealed accessors with an
//   undefined getter
// - set cannot report a successful assignment for frozen data
//   properties or sealed accessors with an undefined setter.
// - get{Own}PropertyNames lists all sealed properties of the target.
// - keys lists all enumerable sealed properties of the target.
// - enumerate lists all enumerable sealed properties of the target.
// - if a property of a non-extensible proxy is reported as non-existent,
//   then it must forever be reported as non-existent. This applies to
//   own and inherited properties and is enforced in the
//   deleteProperty, get{Own}PropertyDescriptor, has{Own},
//   get{Own}PropertyNames, keys and enumerate traps

// Violation of any of these invariants by H will result in TypeError being
// thrown.

// Additionally, once Object.preventExtensions, Object.seal or Object.freeze
// is invoked on the proxy, the set of own property names for the proxy is
// fixed. Any property name that is not fixed is called a 'new' property.

// The Validator upholds the following invariants regarding extensibility:
// - getOwnPropertyDescriptor cannot report new properties as existent
//   (it must report them as non-existent by returning undefined)
// - defineProperty cannot successfully add a new property (it must reject)
// - getOwnPropertyNames cannot list new properties
// - hasOwn cannot report true for new properties (it must report false)
// - keys cannot list new properties

// Invariants currently not enforced:
// - getOwnPropertyNames lists only own property names
// - keys lists only enumerable own property names
// Both traps may list more property names than are actually defined on the
// target.

// Invariants with regard to inheritance are currently not enforced.
// - a non-configurable potentially inherited property on a proxy with
//   non-mutable ancestry cannot be reported as non-existent
// (An object with non-mutable ancestry is a non-extensible object whose
// [[Prototype]] is either null or an object with non-mutable ancestry.)

// Changes in Handler API compared to previous harmony:proxies, see:
// http://wiki.ecmascript.org/doku.php?id=strawman:direct_proxies
// http://wiki.ecmascript.org/doku.php?id=harmony:direct_proxies

// ----------------------------------------------------------------------------

// ---- WeakMap polyfill ----

// TODO: find a proper WeakMap polyfill

// define an empty WeakMap so that at least the Reflect module code
// will work in the absence of WeakMaps. Proxy emulation depends on
// actual WeakMaps, so will not work with this little shim.
if (typeof WeakMap === "undefined") {
  global.WeakMap = function(){};
  global.WeakMap.prototype = {
    get: function(k) { return undefined; },
    set: function(k,v) { throw new Error("WeakMap not supported"); }
  };
}

// ---- Normalization functions for property descriptors ----

function isStandardAttribute(name) {
  return /^(get|set|value|writable|enumerable|configurable)$/.test(name);
}

// Adapted from ES5 section 8.10.5
function toPropertyDescriptor(obj) {
  if (Object(obj) !== obj) {
    throw new TypeError("property descriptor should be an Object, given: "+
                        obj);
  }
  var desc = {};
  if ('enumerable' in obj) { desc.enumerable = !!obj.enumerable; }
  if ('configurable' in obj) { desc.configurable = !!obj.configurable; }
  if ('value' in obj) { desc.value = obj.value; }
  if ('writable' in obj) { desc.writable = !!obj.writable; }
  if ('get' in obj) {
    var getter = obj.get;
    if (getter !== undefined && typeof getter !== "function") {
      throw new TypeError("property descriptor 'get' attribute must be "+
                          "callable or undefined, given: "+getter);
    }
    desc.get = getter;
  }
  if ('set' in obj) {
    var setter = obj.set;
    if (setter !== undefined && typeof setter !== "function") {
      throw new TypeError("property descriptor 'set' attribute must be "+
                          "callable or undefined, given: "+setter);
    }
    desc.set = setter;
  }
  if ('get' in desc || 'set' in desc) {
    if ('value' in desc || 'writable' in desc) {
      throw new TypeError("property descriptor cannot be both a data and an "+
                          "accessor descriptor: "+obj);
    }
  }
  return desc;
}

function isAccessorDescriptor(desc) {
  if (desc === undefined) return false;
  return ('get' in desc || 'set' in desc);
}
function isDataDescriptor(desc) {
  if (desc === undefined) return false;
  return ('value' in desc || 'writable' in desc);
}
function isGenericDescriptor(desc) {
  if (desc === undefined) return false;
  return !isAccessorDescriptor(desc) && !isDataDescriptor(desc);
}

function toCompletePropertyDescriptor(desc) {
  var internalDesc = toPropertyDescriptor(desc);
  if (isGenericDescriptor(internalDesc) || isDataDescriptor(internalDesc)) {
    if (!('value' in internalDesc)) { internalDesc.value = undefined; }
    if (!('writable' in internalDesc)) { internalDesc.writable = false; }
  } else {
    if (!('get' in internalDesc)) { internalDesc.get = undefined; }
    if (!('set' in internalDesc)) { internalDesc.set = undefined; }
  }
  if (!('enumerable' in internalDesc)) { internalDesc.enumerable = false; }
  if (!('configurable' in internalDesc)) { internalDesc.configurable = false; }
  return internalDesc;
}

function isEmptyDescriptor(desc) {
  return !('get' in desc) &&
         !('set' in desc) &&
         !('value' in desc) &&
         !('writable' in desc) &&
         !('enumerable' in desc) &&
         !('configurable' in desc);
}

function isEquivalentDescriptor(desc1, desc2) {
  return sameValue(desc1.get, desc2.get) &&
         sameValue(desc1.set, desc2.set) &&
         sameValue(desc1.value, desc2.value) &&
         sameValue(desc1.writable, desc2.writable) &&
         sameValue(desc1.enumerable, desc2.enumerable) &&
         sameValue(desc1.configurable, desc2.configurable);
}

// copied from http://wiki.ecmascript.org/doku.php?id=harmony:egal
function sameValue(x, y) {
  if (x === y) {
    // 0 === -0, but they are not identical
    return x !== 0 || 1 / x === 1 / y;
  }

  // NaN !== NaN, but they are identical.
  // NaNs are the only non-reflexive value, i.e., if x !== x,
  // then x is a NaN.
  // isNaN is broken: it converts its argument to number, so
  // isNaN("foo") => true
  return x !== x && y !== y;
}

/**
 * Returns a fresh property descriptor that is guaranteed
 * to be complete (i.e. contain all the standard attributes).
 * Additionally, any non-standard enumerable properties of
 * attributes are copied over to the fresh descriptor.
 *
 * If attributes is undefined, returns undefined.
 *
 * See also: http://wiki.ecmascript.org/doku.php?id=harmony:proxies_semantics
 */
function normalizeAndCompletePropertyDescriptor(attributes) {
  if (attributes === undefined) { return undefined; }
  var desc = toCompletePropertyDescriptor(attributes);
  // Note: no need to call FromPropertyDescriptor(desc), as we represent
  // "internal" property descriptors as proper Objects from the start
  for (var name in attributes) {
    if (!isStandardAttribute(name)) {
      Object.defineProperty(desc, name,
        { value: attributes[name],
          writable: true,
          enumerable: true,
          configurable: true });
    }
  }
  return desc;
}

/**
 * Returns a fresh property descriptor whose standard
 * attributes are guaranteed to be data properties of the right type.
 * Additionally, any non-standard enumerable properties of
 * attributes are copied over to the fresh descriptor.
 *
 * If attributes is undefined, will throw a TypeError.
 *
 * See also: http://wiki.ecmascript.org/doku.php?id=harmony:proxies_semantics
 */
function normalizePropertyDescriptor(attributes) {
  var desc = toPropertyDescriptor(attributes);
  // Note: no need to call FromGenericPropertyDescriptor(desc), as we represent
  // "internal" property descriptors as proper Objects from the start
  for (var name in attributes) {
    if (!isStandardAttribute(name)) {
      Object.defineProperty(desc, name,
        { value: attributes[name],
          writable: true,
          enumerable: true,
          configurable: true });
    }
  }
  return desc;
}

// store a reference to the real ES5 primitives before patching them later
var prim_preventExtensions =        Object.preventExtensions,
    prim_seal =                     Object.seal,
    prim_freeze =                   Object.freeze,
    prim_isExtensible =             Object.isExtensible,
    prim_isSealed =                 Object.isSealed,
    prim_isFrozen =                 Object.isFrozen,
    prim_getPrototypeOf =           Object.getPrototypeOf,
    prim_getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
    prim_defineProperty =           Object.defineProperty,
    prim_defineProperties =         Object.defineProperties,
    prim_keys =                     Object.keys,
    prim_getOwnPropertyNames =      Object.getOwnPropertyNames,
    prim_getOwnPropertySymbols =    Object.getOwnPropertySymbols,
    prim_assign =                   Object.assign,
    prim_isArray =                  Array.isArray,
    prim_concat =                   Array.prototype.concat,
    prim_isPrototypeOf =            Object.prototype.isPrototypeOf,
    prim_hasOwnProperty =           Object.prototype.hasOwnProperty;

// these will point to the patched versions of the respective methods on
// Object. They are used within this module as the "intrinsic" bindings
// of these methods (i.e. the "original" bindings as defined in the spec)
var Object_isFrozen,
    Object_isSealed,
    Object_isExtensible,
    Object_getPrototypeOf,
    Object_getOwnPropertyNames;

/**
 * A property 'name' is fixed if it is an own property of the target.
 */
function isFixed(name, target) {
  return ({}).hasOwnProperty.call(target, name);
}
function isSealed(name, target) {
  var desc = Object.getOwnPropertyDescriptor(target, name);
  if (desc === undefined) { return false; }
  return desc.configurable === false;
}
function isSealedDesc(desc) {
  return desc !== undefined && desc.configurable === false;
}

/**
 * Performs all validation that Object.defineProperty performs,
 * without actually defining the property. Returns a boolean
 * indicating whether validation succeeded.
 *
 * Implementation transliterated from ES5.1 section 8.12.9
 */
function isCompatibleDescriptor(extensible, current, desc) {
  if (current === undefined && extensible === false) {
    return false;
  }
  if (current === undefined && extensible === true) {
    return true;
  }
  if (isEmptyDescriptor(desc)) {
    return true;
  }
  if (isEquivalentDescriptor(current, desc)) {
    return true;
  }
  if (current.configurable === false) {
    if (desc.configurable === true) {
      return false;
    }
    if ('enumerable' in desc && desc.enumerable !== current.enumerable) {
      return false;
    }
  }
  if (isGenericDescriptor(desc)) {
    return true;
  }
  if (isDataDescriptor(current) !== isDataDescriptor(desc)) {
    if (current.configurable === false) {
      return false;
    }
    return true;
  }
  if (isDataDescriptor(current) && isDataDescriptor(desc)) {
    if (current.configurable === false) {
      if (current.writable === false && desc.writable === true) {
        return false;
      }
      if (current.writable === false) {
        if ('value' in desc && !sameValue(desc.value, current.value)) {
          return false;
        }
      }
    }
    return true;
  }
  if (isAccessorDescriptor(current) && isAccessorDescriptor(desc)) {
    if (current.configurable === false) {
      if ('set' in desc && !sameValue(desc.set, current.set)) {
        return false;
      }
      if ('get' in desc && !sameValue(desc.get, current.get)) {
        return false;
      }
    }
  }
  return true;
}

// ES6 7.3.11 SetIntegrityLevel
// level is one of "sealed" or "frozen"
function setIntegrityLevel(target, level) {
  var ownProps = Object_getOwnPropertyNames(target);
  var pendingException = undefined;
  if (level === "sealed") {
    var l = +ownProps.length;
    var k;
    for (var i = 0; i < l; i++) {
      k = String(ownProps[i]);
      try {
        Object.defineProperty(target, k, { configurable: false });
      } catch (e) {
        if (pendingException === undefined) {
          pendingException = e;
        }
      }
    }
  } else {
    // level === "frozen"
    var l = +ownProps.length;
    var k;
    for (var i = 0; i < l; i++) {
      k = String(ownProps[i]);
      try {
        var currentDesc = Object.getOwnPropertyDescriptor(target, k);
        if (currentDesc !== undefined) {
          var desc;
          if (isAccessorDescriptor(currentDesc)) {
            desc = { configurable: false }
          } else {
            desc = { configurable: false, writable: false }
          }
          Object.defineProperty(target, k, desc);
        }        
      } catch (e) {
        if (pendingException === undefined) {
          pendingException = e;
        }
      }
    }
  }
  if (pendingException !== undefined) {
    throw pendingException;
  }
  return Reflect.preventExtensions(target);
}

// ES6 7.3.12 TestIntegrityLevel
// level is one of "sealed" or "frozen"
function testIntegrityLevel(target, level) {
  var isExtensible = Object_isExtensible(target);
  if (isExtensible) return false;
  
  var ownProps = Object_getOwnPropertyNames(target);
  var pendingException = undefined;
  var configurable = false;
  var writable = false;
  
  var l = +ownProps.length;
  var k;
  var currentDesc;
  for (var i = 0; i < l; i++) {
    k = String(ownProps[i]);
    try {
      currentDesc = Object.getOwnPropertyDescriptor(target, k);
      configurable = configurable || currentDesc.configurable;
      if (isDataDescriptor(currentDesc)) {
        writable = writable || currentDesc.writable;
      }
    } catch (e) {
      if (pendingException === undefined) {
        pendingException = e;
        configurable = true;
      }
    }
  }
  if (pendingException !== undefined) {
    throw pendingException;
  }
  if (level === "frozen" && writable === true) {
    return false;
  }
  if (configurable === true) {
    return false;
  }
  return true;
}

// ---- The Validator handler wrapper around user handlers ----

/**
 * @param target the object wrapped by this proxy.
 * As long as the proxy is extensible, only non-configurable properties
 * are checked against the target. Once the proxy becomes non-extensible,
 * invariants w.r.t. non-extensibility are also enforced.
 *
 * @param handler the handler of the direct proxy. The object emulated by
 * this handler is validated against the target object of the direct proxy.
 * Any violations that the handler makes against the invariants
 * of the target will cause a TypeError to be thrown.
 *
 * Both target and handler must be proper Objects at initialization time.
 */
function Validator(target, handler) {
  // for non-revokable proxies, these are const references
  // for revokable proxies, on revocation:
  // - this.target is set to null
  // - this.handler is set to a handler that throws on all traps
  this.target  = target;
  this.handler = handler;
}

Validator.prototype = {

  /**
   * If getTrap returns undefined, the caller should perform the
   * default forwarding behavior.
   * If getTrap returns normally otherwise, the return value
   * will be a callable trap function. When calling the trap function,
   * the caller is responsible for binding its |this| to |this.handler|.
   */
  getTrap: function(trapName) {
    var trap = this.handler[trapName];
    if (trap === undefined) {
      // the trap was not defined,
      // perform the default forwarding behavior
      return undefined;
    }

    if (typeof trap !== "function") {
      throw new TypeError(trapName + " trap is not callable: "+trap);
    }

    return trap;
  },

  // === fundamental traps ===

  /**
   * If name denotes a fixed property, check:
   *   - whether targetHandler reports it as existent
   *   - whether the returned descriptor is compatible with the fixed property
   * If the proxy is non-extensible, check:
   *   - whether name is not a new property
   * Additionally, the returned descriptor is normalized and completed.
   */
  getOwnPropertyDescriptor: function(name) {
    "use strict";

    var trap = this.getTrap("getOwnPropertyDescriptor");
    if (trap === undefined) {
      return Reflect.getOwnPropertyDescriptor(this.target, name);
    }

    name = String(name);
    var desc = trap.call(this.handler, this.target, name);
    desc = normalizeAndCompletePropertyDescriptor(desc);

    var targetDesc = Object.getOwnPropertyDescriptor(this.target, name);
    var extensible = Object.isExtensible(this.target);

    if (desc === undefined) {
      if (isSealedDesc(targetDesc)) {
        throw new TypeError("cannot report non-configurable property '"+name+
                            "' as non-existent");
      }
      if (!extensible && targetDesc !== undefined) {
          // if handler is allowed to return undefined, we cannot guarantee
          // that it will not return a descriptor for this property later.
          // Once a property has been reported as non-existent on a non-extensible
          // object, it should forever be reported as non-existent
          throw new TypeError("cannot report existing own property '"+name+
                              "' as non-existent on a non-extensible object");
      }
      return undefined;
    }

    // at this point, we know (desc !== undefined), i.e.
    // targetHandler reports 'name' as an existing property

    // Note: we could collapse the following two if-tests into a single
    // test. Separating out the cases to improve error reporting.

    if (!extensible) {
      if (targetDesc === undefined) {
        throw new TypeError("cannot report a new own property '"+
                            name + "' on a non-extensible object");
      }
    }

    if (name !== undefined) {
      if (!isCompatibleDescriptor(extensible, targetDesc, desc)) {
        throw new TypeError("cannot report incompatible property descriptor "+
                            "for property '"+name+"'");
      }
    }

    if (desc.configurable === false && !isSealedDesc(targetDesc)) {
      // if the property is configurable or non-existent on the target,
      // but is reported as a non-configurable property, it may later be
      // reported as configurable or non-existent, which violates the
      // invariant that if the property might change or disappear, the
      // configurable attribute must be true.
      throw new TypeError("cannot report a non-configurable descriptor "+
                          "for configurable or non-existent property '"+name+"'");
    }

    return desc;
  },

  /**
   * In the direct proxies design with refactored prototype climbing,
   * this trap is deprecated. For proxies-as-prototypes, instead
   * of calling this trap, the get, set, has or enumerate traps are
   * called instead.
   *
   * In this implementation, we "abuse" getPropertyDescriptor to
   * support trapping the get or set traps for proxies-as-prototypes.
   * We do this by returning a getter/setter pair that invokes
   * the corresponding traps.
   *
   * While this hack works for inherited property access, it has some
   * quirks:
   *
   * In Firefox, this trap is only called after a prior invocation
   * of the 'has' trap has returned true. Hence, expect the following
   * behavior:
   * <code>
   * var child = Object.create(Proxy(target, handler));
   * child[name] // triggers handler.has(target, name)
   * // if that returns true, triggers handler.get(target, name, child)
   * </code>
   *
   * On v8, the 'in' operator, when applied to an object that inherits
   * from a proxy, will call getPropertyDescriptor and walk the proto-chain.
   * That calls the below getPropertyDescriptor trap on the proxy. The
   * result of the 'in'-operator is then determined by whether this trap
   * returns undefined or a property descriptor object. That is why
   * we first explicitly trigger the 'has' trap to determine whether
   * the property exists.
   *
   * This has the side-effect that when enumerating properties on
   * an object that inherits from a proxy in v8, only properties
   * for which 'has' returns true are returned:
   *
   * <code>
   * var child = Object.create(Proxy(target, handler));
   * for (var prop in child) {
   *   // only enumerates prop if (prop in child) returns true
   * }
   * </code>
   */
  getPropertyDescriptor: function(name) {
    var handler = this;

    if (!handler.has(name)) return undefined;

    return {
      get: function() {
        return handler.get(this, name);
      },
      set: function(val) {
        if (handler.set(this, name, val)) {
          return val;
        } else {
          throw new TypeError("failed assignment to "+name);
        }
      },
      enumerable: true,
      configurable: true
    };
  },

  /**
   * If name denotes a fixed property, check for incompatible changes.
   * If the proxy is non-extensible, check that new properties are rejected.
   */
  defineProperty: function(name, desc) {
    // TODO(tvcutsem): the current tracemonkey implementation of proxies
    // auto-completes 'desc', which is not correct. 'desc' should be
    // normalized, but not completed. Consider:
    // Object.defineProperty(proxy, 'foo', {enumerable:false})
    // This trap will receive desc =
    //  {value:undefined,writable:false,enumerable:false,configurable:false}
    // This will also set all other attributes to their default value,
    // which is unexpected and different from [[DefineOwnProperty]].
    // Bug filed: https://bugzilla.mozilla.org/show_bug.cgi?id=601329

    var trap = this.getTrap("defineProperty");
    if (trap === undefined) {
      // default forwarding behavior
      return Reflect.defineProperty(this.target, name, desc);
    }

    name = String(name);
    desc = normalizePropertyDescriptor(desc);
    var success = trap.call(this.handler, this.target, name, desc);
    success = !!success; // coerce to Boolean

    if (success === true) {

      var targetDesc = Object.getOwnPropertyDescriptor(this.target, name);
      var extensible = Object.isExtensible(this.target);

      // Note: we could collapse the following two if-tests into a single
      // test. Separating out the cases to improve error reporting.

      if (!extensible) {
        if (targetDesc === undefined) {
          throw new TypeError("cannot successfully add a new property '"+
                              name + "' to a non-extensible object");
        }
      }

      if (targetDesc !== undefined) {
        if (!isCompatibleDescriptor(extensible, targetDesc, desc)) {
          throw new TypeError("cannot define incompatible property "+
                              "descriptor for property '"+name+"'");
        }
      }

      if (desc.configurable === false && !isSealedDesc(targetDesc)) {
        // if the property is configurable or non-existent on the target,
        // but is successfully being redefined as a non-configurable property,
        // it may later be reported as configurable or non-existent, which violates
        // the invariant that if the property might change or disappear, the
        // configurable attribute must be true.
        throw new TypeError("cannot successfully define a non-configurable "+
                            "descriptor for configurable or non-existent property '"+
                            name+"'");
      }

    }

    return success;
  },

  /**
   * On success, check whether the target object is indeed non-extensible.
   */
  preventExtensions: function() {
    var trap = this.getTrap("preventExtensions");
    if (trap === undefined) {
      // default forwarding behavior
      return Reflect.preventExtensions(this.target);
    }

    var success = trap.call(this.handler, this.target);
    success = !!success; // coerce to Boolean
    if (success) {
      if (Object_isExtensible(this.target)) {
        throw new TypeError("can't report extensible object as non-extensible: "+
                            this.target);
      }
    }
    return success;
  },

  /**
   * If name denotes a sealed property, check whether handler rejects.
   */
  delete: function(name) {
    "use strict";
    var trap = this.getTrap("deleteProperty");
    if (trap === undefined) {
      // default forwarding behavior
      return Reflect.deleteProperty(this.target, name);
    }

    name = String(name);
    var res = trap.call(this.handler, this.target, name);
    res = !!res; // coerce to Boolean

    if (res === true) {
      if (isSealed(name, this.target)) {
        throw new TypeError("property '"+name+"' is non-configurable "+
                            "and can't be deleted");
      }
    }

    return res;
  },

  /**
   * The getOwnPropertyNames trap was replaced by the ownKeys trap,
   * which now also returns an array (of strings or symbols) and
   * which performs the same rigorous invariant checks as getOwnPropertyNames
   *
   * See issue #48 on how this trap can still get invoked by external libs
   * that don't use the patched Object.getOwnPropertyNames function.
   */
  getOwnPropertyNames: function() {
    // Note: removed deprecation warning to avoid dependency on 'console'
    // (and on node, should anyway use util.deprecate). Deprecation warnings
    // can also be annoying when they are outside of the user's control, e.g.
    // when an external library calls unpatched Object.getOwnPropertyNames.
    // Since there is a clean fallback to `ownKeys`, the fact that the
    // deprecated method is still called is mostly harmless anyway.
    // See also issues #65 and #66.
    // console.warn("getOwnPropertyNames trap is deprecated. Use ownKeys instead");
    return this.ownKeys();
  },

  /**
   * Checks whether the trap result does not contain any new properties
   * if the proxy is non-extensible.
   *
   * Any own non-configurable properties of the target that are not included
   * in the trap result give rise to a TypeError. As such, we check whether the
   * returned result contains at least all sealed properties of the target
   * object.
   *
   * Additionally, the trap result is normalized.
   * Instead of returning the trap result directly:
   *  - create and return a fresh Array,
   *  - of which each element is coerced to a String
   *
   * This trap is called a.o. by Reflect.ownKeys, Object.getOwnPropertyNames
   * and Object.keys (the latter filters out only the enumerable own properties).
   */
  ownKeys: function() {
    var trap = this.getTrap("ownKeys");
    if (trap === undefined) {
      // default forwarding behavior
      return Reflect.ownKeys(this.target);
    }

    var trapResult = trap.call(this.handler, this.target);

    // propNames is used as a set of strings
    var propNames = Object.create(null);
    var numProps = +trapResult.length;
    var result = new Array(numProps);

    for (var i = 0; i < numProps; i++) {
      var s = String(trapResult[i]);
      if (!Object.isExtensible(this.target) && !isFixed(s, this.target)) {
        // non-extensible proxies don't tolerate new own property names
        throw new TypeError("ownKeys trap cannot list a new "+
                            "property '"+s+"' on a non-extensible object");
      }

      propNames[s] = true;
      result[i] = s;
    }

    var ownProps = Object_getOwnPropertyNames(this.target);
    var target = this.target;
    ownProps.forEach(function (ownProp) {
      if (!propNames[ownProp]) {
        if (isSealed(ownProp, target)) {
          throw new TypeError("ownKeys trap failed to include "+
                              "non-configurable property '"+ownProp+"'");
        }
        if (!Object.isExtensible(target) &&
            isFixed(ownProp, target)) {
            // if handler is allowed to report ownProp as non-existent,
            // we cannot guarantee that it will never later report it as
            // existent. Once a property has been reported as non-existent
            // on a non-extensible object, it should forever be reported as
            // non-existent
            throw new TypeError("ownKeys trap cannot report existing own property '"+
                                ownProp+"' as non-existent on a non-extensible object");
        }
      }
    });

    return result;
  },

  /**
   * Checks whether the trap result is consistent with the state of the
   * wrapped target.
   */
  isExtensible: function() {
    var trap = this.getTrap("isExtensible");
    if (trap === undefined) {
      // default forwarding behavior
      return Reflect.isExtensible(this.target);
    }

    var result = trap.call(this.handler, this.target);
    result = !!result; // coerce to Boolean
    var state = Object_isExtensible(this.target);
    if (result !== state) {
      if (result) {
        throw new TypeError("cannot report non-extensible object as extensible: "+
                             this.target);
      } else {
        throw new TypeError("cannot report extensible object as non-extensible: "+
                             this.target);
      }
    }
    return state;
  },

  /**
   * Check whether the trap result corresponds to the target's [[Prototype]]
   */
  getPrototypeOf: function() {
    var trap = this.getTrap("getPrototypeOf");
    if (trap === undefined) {
      // default forwarding behavior
      return Reflect.getPrototypeOf(this.target);
    }

    var allegedProto = trap.call(this.handler, this.target);

    if (!Object_isExtensible(this.target)) {
      var actualProto = Object_getPrototypeOf(this.target);
      if (!sameValue(allegedProto, actualProto)) {
        throw new TypeError("prototype value does not match: " + this.target);
      }
    }

    return allegedProto;
  },

  /**
   * If target is non-extensible and setPrototypeOf trap returns true,
   * check whether the trap result corresponds to the target's [[Prototype]]
   */
  setPrototypeOf: function(newProto) {
    var trap = this.getTrap("setPrototypeOf");
    if (trap === undefined) {
      // default forwarding behavior
      return Reflect.setPrototypeOf(this.target, newProto);
    }

    var success = trap.call(this.handler, this.target, newProto);

    success = !!success;
    if (success && !Object_isExtensible(this.target)) {
      var actualProto = Object_getPrototypeOf(this.target);
      if (!sameValue(newProto, actualProto)) {
        throw new TypeError("prototype value does not match: " + this.target);
      }
    }

    return success;
  },

  /**
   * In the direct proxies design with refactored prototype climbing,
   * this trap is deprecated. For proxies-as-prototypes, for-in will
   * call the enumerate() trap. If that trap is not defined, the
   * operation is forwarded to the target, no more fallback on this
   * fundamental trap.
   */
  getPropertyNames: function() {
    throw new TypeError("getPropertyNames trap is deprecated");
  },

  // === derived traps ===

  /**
   * If name denotes a fixed property, check whether the trap returns true.
   */
  has: function(name) {
    var trap = this.getTrap("has");
    if (trap === undefined) {
      // default forwarding behavior
      return Reflect.has(this.target, name);
    }

    name = String(name);
    var res = trap.call(this.handler, this.target, name);
    res = !!res; // coerce to Boolean

    if (res === false) {
      if (isSealed(name, this.target)) {
        throw new TypeError("cannot report existing non-configurable own "+
                            "property '"+ name + "' as a non-existent "+
                            "property");
      }
      if (!Object.isExtensible(this.target) &&
          isFixed(name, this.target)) {
          // if handler is allowed to return false, we cannot guarantee
          // that it will not return true for this property later.
          // Once a property has been reported as non-existent on a non-extensible
          // object, it should forever be reported as non-existent
          throw new TypeError("cannot report existing own property '"+name+
                              "' as non-existent on a non-extensible object");
      }
    }

    // if res === true, we don't need to check for extensibility
    // even for a non-extensible proxy that has no own name property,
    // the property may have been inherited

    return res;
  },

  /**
   * If name denotes a fixed non-configurable, non-writable data property,
   * check its return value against the previously asserted value of the
   * fixed property.
   */
  get: function(receiver, name) {

    // experimental support for invoke() trap on platforms that
    // support __noSuchMethod__
    /*
    if (name === '__noSuchMethod__') {
      var handler = this;
      return function(name, args) {
        return handler.invoke(receiver, name, args);
      }
    }
    */

    var trap = this.getTrap("get");
    if (trap === undefined) {
      // default forwarding behavior
      return Reflect.get(this.target, name, receiver);
    }

    name = String(name);
    var res = trap.call(this.handler, this.target, name, receiver);

    var fixedDesc = Object.getOwnPropertyDescriptor(this.target, name);
    // check consistency of the returned value
    if (fixedDesc !== undefined) { // getting an existing property
      if (isDataDescriptor(fixedDesc) &&
          fixedDesc.configurable === false &&
          fixedDesc.writable === false) { // own frozen data property
        if (!sameValue(res, fixedDesc.value)) {
          throw new TypeError("cannot report inconsistent value for "+
                              "non-writable, non-configurable property '"+
                              name+"'");
        }
      } else { // it's an accessor property
        if (isAccessorDescriptor(fixedDesc) &&
            fixedDesc.configurable === false &&
            fixedDesc.get === undefined) {
          if (res !== undefined) {
            throw new TypeError("must report undefined for non-configurable "+
                                "accessor property '"+name+"' without getter");
          }
        }
      }
    }

    return res;
  },

  /**
   * If name denotes a fixed non-configurable, non-writable data property,
   * check that the trap rejects the assignment.
   */
  set: function(receiver, name, val) {
    var trap = this.getTrap("set");
    if (trap === undefined) {
      // default forwarding behavior
      return Reflect.set(this.target, name, val, receiver);
    }

    name = String(name);
    var res = trap.call(this.handler, this.target, name, val, receiver);
    res = !!res; // coerce to Boolean

    // if success is reported, check whether property is truly assignable
    if (res === true) {
      var fixedDesc = Object.getOwnPropertyDescriptor(this.target, name);
      if (fixedDesc !== undefined) { // setting an existing property
        if (isDataDescriptor(fixedDesc) &&
            fixedDesc.configurable === false &&
            fixedDesc.writable === false) {
          if (!sameValue(val, fixedDesc.value)) {
            throw new TypeError("cannot successfully assign to a "+
                                "non-writable, non-configurable property '"+
                                name+"'");
          }
        } else {
          if (isAccessorDescriptor(fixedDesc) &&
              fixedDesc.configurable === false && // non-configurable
              fixedDesc.set === undefined) {      // accessor with undefined setter
            throw new TypeError("setting a property '"+name+"' that has "+
                                " only a getter");
          }
        }
      }
    }

    return res;
  },

  /**
   * Any own enumerable non-configurable properties of the target that are not
   * included in the trap result give rise to a TypeError. As such, we check
   * whether the returned result contains at least all sealed enumerable properties
   * of the target object.
   *
   * The trap should return an iterator.
   *
   * However, as implementations of pre-direct proxies still expect enumerate
   * to return an array of strings, we convert the iterator into an array.
   */
  enumerate: function() {
    var trap = this.getTrap("enumerate");
    if (trap === undefined) {
      // default forwarding behavior
      var trapResult = Reflect.enumerate(this.target);
      var result = [];
      var nxt = trapResult.next();
      while (!nxt.done) {
        result.push(String(nxt.value));
        nxt = trapResult.next();
      }
      return result;
    }

    var trapResult = trap.call(this.handler, this.target);
    
    if (trapResult === null ||
        trapResult === undefined ||
        trapResult.next === undefined) {
      throw new TypeError("enumerate trap should return an iterator, got: "+
                          trapResult);    
    }
    
    // propNames is used as a set of strings
    var propNames = Object.create(null);
    
    // var numProps = +trapResult.length;
    var result = []; // new Array(numProps);
    
    // trapResult is supposed to be an iterator
    // drain iterator to array as current implementations still expect
    // enumerate to return an array of strings
    var nxt = trapResult.next();
    
    while (!nxt.done) {
      var s = String(nxt.value);
      if (propNames[s]) {
        throw new TypeError("enumerate trap cannot list a "+
                            "duplicate property '"+s+"'");
      }
      propNames[s] = true;
      result.push(s);
      nxt = trapResult.next();
    }
    
    /*for (var i = 0; i < numProps; i++) {
      var s = String(trapResult[i]);
      if (propNames[s]) {
        throw new TypeError("enumerate trap cannot list a "+
                            "duplicate property '"+s+"'");
      }

      propNames[s] = true;
      result[i] = s;
    } */

    var ownEnumerableProps = Object.keys(this.target);
    var target = this.target;
    ownEnumerableProps.forEach(function (ownEnumerableProp) {
      if (!propNames[ownEnumerableProp]) {
        if (isSealed(ownEnumerableProp, target)) {
          throw new TypeError("enumerate trap failed to include "+
                              "non-configurable enumerable property '"+
                              ownEnumerableProp+"'");
        }
        if (!Object.isExtensible(target) &&
            isFixed(ownEnumerableProp, target)) {
            // if handler is allowed not to report ownEnumerableProp as an own
            // property, we cannot guarantee that it will never report it as
            // an own property later. Once a property has been reported as
            // non-existent on a non-extensible object, it should forever be
            // reported as non-existent
            throw new TypeError("cannot report existing own property '"+
                                ownEnumerableProp+"' as non-existent on a "+
                                "non-extensible object");
        }
      }
    });

    return result;
  },

  /**
   * The iterate trap is deprecated by the enumerate trap.
   */
  iterate: Validator.prototype.enumerate,

  /**
   * Any own non-configurable properties of the target that are not included
   * in the trap result give rise to a TypeError. As such, we check whether the
   * returned result contains at least all sealed properties of the target
   * object.
   *
   * The trap result is normalized.
   * The trap result is not returned directly. Instead:
   *  - create and return a fresh Array,
   *  - of which each element is coerced to String,
   *  - which does not contain duplicates
   *
   * FIXME: keys trap is deprecated
   */
  /*
  keys: function() {
    var trap = this.getTrap("keys");
    if (trap === undefined) {
      // default forwarding behavior
      return Reflect.keys(this.target);
    }

    var trapResult = trap.call(this.handler, this.target);

    // propNames is used as a set of strings
    var propNames = Object.create(null);
    var numProps = +trapResult.length;
    var result = new Array(numProps);

    for (var i = 0; i < numProps; i++) {
     var s = String(trapResult[i]);
     if (propNames[s]) {
       throw new TypeError("keys trap cannot list a "+
                           "duplicate property '"+s+"'");
     }
     if (!Object.isExtensible(this.target) && !isFixed(s, this.target)) {
       // non-extensible proxies don't tolerate new own property names
       throw new TypeError("keys trap cannot list a new "+
                           "property '"+s+"' on a non-extensible object");
     }

     propNames[s] = true;
     result[i] = s;
    }

    var ownEnumerableProps = Object.keys(this.target);
    var target = this.target;
    ownEnumerableProps.forEach(function (ownEnumerableProp) {
      if (!propNames[ownEnumerableProp]) {
        if (isSealed(ownEnumerableProp, target)) {
          throw new TypeError("keys trap failed to include "+
                              "non-configurable enumerable property '"+
                              ownEnumerableProp+"'");
        }
        if (!Object.isExtensible(target) &&
            isFixed(ownEnumerableProp, target)) {
            // if handler is allowed not to report ownEnumerableProp as an own
            // property, we cannot guarantee that it will never report it as
            // an own property later. Once a property has been reported as
            // non-existent on a non-extensible object, it should forever be
            // reported as non-existent
            throw new TypeError("cannot report existing own property '"+
                                ownEnumerableProp+"' as non-existent on a "+
                                "non-extensible object");
        }
      }
    });

    return result;
  },
  */
  
  /**
   * New trap that reifies [[Call]].
   * If the target is a function, then a call to
   *   proxy(...args)
   * Triggers this trap
   */
  apply: function(target, thisBinding, args) {
    var trap = this.getTrap("apply");
    if (trap === undefined) {
      return Reflect.apply(target, thisBinding, args);
    }

    if (typeof this.target === "function") {
      return trap.call(this.handler, target, thisBinding, args);
    } else {
      throw new TypeError("apply: "+ target + " is not a function");
    }
  },

  /**
   * New trap that reifies [[Construct]].
   * If the target is a function, then a call to
   *   new proxy(...args)
   * Triggers this trap
   */
  construct: function(target, args, newTarget) {
    var trap = this.getTrap("construct");
    if (trap === undefined) {
      return Reflect.construct(target, args, newTarget);
    }

    if (typeof target !== "function") {
      throw new TypeError("new: "+ target + " is not a function");
    }

    if (newTarget === undefined) {
      newTarget = target;
    } else {
      if (typeof newTarget !== "function") {
        throw new TypeError("new: "+ newTarget + " is not a function");
      }      
    }
    return trap.call(this.handler, target, args, newTarget);
  }
};

// ---- end of the Validator handler wrapper handler ----

// In what follows, a 'direct proxy' is a proxy
// whose handler is a Validator. Such proxies can be made non-extensible,
// sealed or frozen without losing the ability to trap.

// maps direct proxies to their Validator handlers
var directProxies = new WeakMap();

// patch Object.{preventExtensions,seal,freeze} so that
// they recognize fixable proxies and act accordingly
Object.preventExtensions = function(subject) {
  var vhandler = directProxies.get(subject);
  if (vhandler !== undefined) {
    if (vhandler.preventExtensions()) {
      return subject;
    } else {
      throw new TypeError("preventExtensions on "+subject+" rejected");
    }
  } else {
    return prim_preventExtensions(subject);
  }
};
Object.seal = function(subject) {
  setIntegrityLevel(subject, "sealed");
  return subject;
};
Object.freeze = function(subject) {
  setIntegrityLevel(subject, "frozen");
  return subject;
};
Object.isExtensible = Object_isExtensible = function(subject) {
  var vHandler = directProxies.get(subject);
  if (vHandler !== undefined) {
    return vHandler.isExtensible();
  } else {
    return prim_isExtensible(subject);
  }
};
Object.isSealed = Object_isSealed = function(subject) {
  return testIntegrityLevel(subject, "sealed");
};
Object.isFrozen = Object_isFrozen = function(subject) {
  return testIntegrityLevel(subject, "frozen");
};
Object.getPrototypeOf = Object_getPrototypeOf = function(subject) {
  var vHandler = directProxies.get(subject);
  if (vHandler !== undefined) {
    return vHandler.getPrototypeOf();
  } else {
    return prim_getPrototypeOf(subject);
  }
};

// patch Object.getOwnPropertyDescriptor to directly call
// the Validator.prototype.getOwnPropertyDescriptor trap
// This is to circumvent an assertion in the built-in Proxy
// trapping mechanism of v8, which disallows that trap to
// return non-configurable property descriptors (as per the
// old Proxy design)
Object.getOwnPropertyDescriptor = function(subject, name) {
  var vhandler = directProxies.get(subject);
  if (vhandler !== undefined) {
    return vhandler.getOwnPropertyDescriptor(name);
  } else {
    return prim_getOwnPropertyDescriptor(subject, name);
  }
};

// patch Object.defineProperty to directly call
// the Validator.prototype.defineProperty trap
// This is to circumvent two issues with the built-in
// trap mechanism:
// 1) the current tracemonkey implementation of proxies
// auto-completes 'desc', which is not correct. 'desc' should be
// normalized, but not completed. Consider:
// Object.defineProperty(proxy, 'foo', {enumerable:false})
// This trap will receive desc =
//  {value:undefined,writable:false,enumerable:false,configurable:false}
// This will also set all other attributes to their default value,
// which is unexpected and different from [[DefineOwnProperty]].
// Bug filed: https://bugzilla.mozilla.org/show_bug.cgi?id=601329
// 2) the current spidermonkey implementation does not
// throw an exception when this trap returns 'false', but instead silently
// ignores the operation (this is regardless of strict-mode)
// 2a) v8 does throw an exception for this case, but includes the rather
//     unhelpful error message:
// 'Proxy handler #<Object> returned false from 'defineProperty' trap'
Object.defineProperty = function(subject, name, desc) {
  var vhandler = directProxies.get(subject);
  if (vhandler !== undefined) {
    var normalizedDesc = normalizePropertyDescriptor(desc);
    var success = vhandler.defineProperty(name, normalizedDesc);
    if (success === false) {
      throw new TypeError("can't redefine property '"+name+"'");
    }
    return subject;
  } else {
    return prim_defineProperty(subject, name, desc);
  }
};

Object.defineProperties = function(subject, descs) {
  var vhandler = directProxies.get(subject);
  if (vhandler !== undefined) {
    var names = Object.keys(descs);
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      var normalizedDesc = normalizePropertyDescriptor(descs[name]);
      var success = vhandler.defineProperty(name, normalizedDesc);
      if (success === false) {
        throw new TypeError("can't redefine property '"+name+"'");
      }
    }
    return subject;
  } else {
    return prim_defineProperties(subject, descs);
  }
};

Object.keys = function(subject) {
  var vHandler = directProxies.get(subject);
  if (vHandler !== undefined) {
    var ownKeys = vHandler.ownKeys();
    var result = [];
    for (var i = 0; i < ownKeys.length; i++) {
      var k = String(ownKeys[i]);
      var desc = Object.getOwnPropertyDescriptor(subject, k);
      if (desc !== undefined && desc.enumerable === true) {
        result.push(k);
      }
    }
    return result;
  } else {
    return prim_keys(subject);
  }
}

Object.getOwnPropertyNames = Object_getOwnPropertyNames = function(subject) {
  var vHandler = directProxies.get(subject);
  if (vHandler !== undefined) {
    return vHandler.ownKeys();
  } else {
    return prim_getOwnPropertyNames(subject);
  }
}

// fixes issue #71 (Calling Object.getOwnPropertySymbols() on a Proxy
// throws an error)
if (prim_getOwnPropertySymbols !== undefined) {
  Object.getOwnPropertySymbols = function(subject) {
    var vHandler = directProxies.get(subject);
    if (vHandler !== undefined) {
      // as this shim does not support symbols, a Proxy never advertises
      // any symbol-valued own properties
      return [];
    } else {
      return prim_getOwnPropertySymbols(subject);
    }
  };
}

// fixes issue #72 ('Illegal access' error when using Object.assign)
// Object.assign polyfill based on a polyfill posted on MDN: 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/\
//  Global_Objects/Object/assign
// Note that this polyfill does not support Symbols, but this Proxy Shim
// does not support Symbols anyway.
if (prim_assign !== undefined) {
  Object.assign = function (target) {
    
    // check if any argument is a proxy object
    var noProxies = true;
    for (var i = 0; i < arguments.length; i++) {
      var vHandler = directProxies.get(arguments[i]);
      if (vHandler !== undefined) {
        noProxies = false;
        break;
      }
    }
    if (noProxies) {
      // not a single argument is a proxy, perform built-in algorithm
      return prim_assign.apply(Object, arguments);
    }
    
    // there is at least one proxy argument, use the polyfill
    
    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var output = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source !== undefined && source !== null) {
        for (var nextKey in source) {
          if (source.hasOwnProperty(nextKey)) {
            output[nextKey] = source[nextKey];
          }
        }
      }
    }
    return output;
  };
}

// returns whether an argument is a reference to an object,
// which is legal as a WeakMap key.
function isObject(arg) {
  var type = typeof arg;
  return (type === 'object' && arg !== null) || (type === 'function');
};

// a wrapper for WeakMap.get which returns the undefined value
// for keys that are not objects (in which case the underlying
// WeakMap would have thrown a TypeError).
function safeWeakMapGet(map, key) {
  return isObject(key) ? map.get(key) : undefined;
};

// returns a new function of zero arguments that recursively
// unwraps any proxies specified as the |this|-value.
// The primitive is assumed to be a zero-argument method
// that uses its |this|-binding.
function makeUnwrapping0ArgMethod(primitive) {
  return function builtin() {
    var vHandler = safeWeakMapGet(directProxies, this);
    if (vHandler !== undefined) {
      return builtin.call(vHandler.target);
    } else {
      return primitive.call(this);
    }
  }
};

// returns a new function of 1 arguments that recursively
// unwraps any proxies specified as the |this|-value.
// The primitive is assumed to be a 1-argument method
// that uses its |this|-binding.
function makeUnwrapping1ArgMethod(primitive) {
  return function builtin(arg) {
    var vHandler = safeWeakMapGet(directProxies, this);
    if (vHandler !== undefined) {
      return builtin.call(vHandler.target, arg);
    } else {
      return primitive.call(this, arg);
    }
  }
};

Object.prototype.valueOf =
  makeUnwrapping0ArgMethod(Object.prototype.valueOf);
Object.prototype.toString =
  makeUnwrapping0ArgMethod(Object.prototype.toString);
Function.prototype.toString =
  makeUnwrapping0ArgMethod(Function.prototype.toString);
Date.prototype.toString =
  makeUnwrapping0ArgMethod(Date.prototype.toString);

Object.prototype.isPrototypeOf = function builtin(arg) {
  // bugfix thanks to Bill Mark:
  // built-in isPrototypeOf does not unwrap proxies used
  // as arguments. So, we implement the builtin ourselves,
  // based on the ECMAScript 6 spec. Our encoding will
  // make sure that if a proxy is used as an argument,
  // its getPrototypeOf trap will be called.
  while (true) {
    var vHandler2 = safeWeakMapGet(directProxies, arg);
    if (vHandler2 !== undefined) {
      arg = vHandler2.getPrototypeOf();
      if (arg === null) {
        return false;
      } else if (sameValue(arg, this)) {
        return true;
      }
    } else {
      return prim_isPrototypeOf.call(this, arg);
    }
  }
};

Array.isArray = function(subject) {
  var vHandler = safeWeakMapGet(directProxies, subject);
  if (vHandler !== undefined) {
    return Array.isArray(vHandler.target);
  } else {
    return prim_isArray(subject);
  }
};

function isProxyArray(arg) {
  var vHandler = safeWeakMapGet(directProxies, arg);
  if (vHandler !== undefined) {
    return Array.isArray(vHandler.target);
  }
  return false;
}

// Array.prototype.concat internally tests whether one of its
// arguments is an Array, by checking whether [[Class]] == "Array"
// As such, it will fail to recognize proxies-for-arrays as arrays.
// We patch Array.prototype.concat so that it "unwraps" proxies-for-arrays
// by making a copy. This will trigger the exact same sequence of
// traps on the proxy-for-array as if we would not have unwrapped it.
// See <https://github.com/tvcutsem/harmony-reflect/issues/19> for more.
Array.prototype.concat = function(/*...args*/) {
  var length;
  for (var i = 0; i < arguments.length; i++) {
    if (isProxyArray(arguments[i])) {
      length = arguments[i].length;
      arguments[i] = Array.prototype.slice.call(arguments[i], 0, length);
    }
  }
  return prim_concat.apply(this, arguments);
};

// setPrototypeOf support on platforms that support __proto__

var prim_setPrototypeOf = Object.setPrototypeOf;

// patch and extract original __proto__ setter
var __proto__setter = (function() {
  var protoDesc = prim_getOwnPropertyDescriptor(Object.prototype,'__proto__');
  if (protoDesc === undefined ||
      typeof protoDesc.set !== "function") {
    return function() {
      throw new TypeError("setPrototypeOf not supported on this platform");
    }
  }

  // see if we can actually mutate a prototype with the generic setter
  // (e.g. Chrome v28 doesn't allow setting __proto__ via the generic setter)
  try {
    protoDesc.set.call({},{});
  } catch (e) {
    return function() {
      throw new TypeError("setPrototypeOf not supported on this platform");
    }
  }

  prim_defineProperty(Object.prototype, '__proto__', {
    set: function(newProto) {
      return Object.setPrototypeOf(this, Object(newProto));
    }
  });

  return protoDesc.set;
}());

Object.setPrototypeOf = function(target, newProto) {
  var handler = directProxies.get(target);
  if (handler !== undefined) {
    if (handler.setPrototypeOf(newProto)) {
      return target;
    } else {
      throw new TypeError("proxy rejected prototype mutation");
    }
  } else {
    if (!Object_isExtensible(target)) {
      throw new TypeError("can't set prototype on non-extensible object: " +
                          target);
    }
    if (prim_setPrototypeOf)
      return prim_setPrototypeOf(target, newProto);

    if (Object(newProto) !== newProto || newProto === null) {
      throw new TypeError("Object prototype may only be an Object or null: " +
                         newProto);
      // throw new TypeError("prototype must be an object or null")
    }
    __proto__setter.call(target, newProto);
    return target;
  }
}

Object.prototype.hasOwnProperty = function(name) {
  var handler = safeWeakMapGet(directProxies, this);
  if (handler !== undefined) {
    var desc = handler.getOwnPropertyDescriptor(name);
    return desc !== undefined;
  } else {
    return prim_hasOwnProperty.call(this, name);
  }
}

// ============= Reflection module =============
// see http://wiki.ecmascript.org/doku.php?id=harmony:reflect_api

var Reflect = global.Reflect = {
  getOwnPropertyDescriptor: function(target, name) {
    return Object.getOwnPropertyDescriptor(target, name);
  },
  defineProperty: function(target, name, desc) {

    // if target is a proxy, invoke its "defineProperty" trap
    var handler = directProxies.get(target);
    if (handler !== undefined) {
      return handler.defineProperty(target, name, desc);
    }

    // Implementation transliterated from [[DefineOwnProperty]]
    // see ES5.1 section 8.12.9
    // this is the _exact same algorithm_ as the isCompatibleDescriptor
    // algorithm defined above, except that at every place it
    // returns true, this algorithm actually does define the property.
    var current = Object.getOwnPropertyDescriptor(target, name);
    var extensible = Object.isExtensible(target);
    if (current === undefined && extensible === false) {
      return false;
    }
    if (current === undefined && extensible === true) {
      Object.defineProperty(target, name, desc); // should never fail
      return true;
    }
    if (isEmptyDescriptor(desc)) {
      return true;
    }
    if (isEquivalentDescriptor(current, desc)) {
      return true;
    }
    if (current.configurable === false) {
      if (desc.configurable === true) {
        return false;
      }
      if ('enumerable' in desc && desc.enumerable !== current.enumerable) {
        return false;
      }
    }
    if (isGenericDescriptor(desc)) {
      // no further validation necessary
    } else if (isDataDescriptor(current) !== isDataDescriptor(desc)) {
      if (current.configurable === false) {
        return false;
      }
    } else if (isDataDescriptor(current) && isDataDescriptor(desc)) {
      if (current.configurable === false) {
        if (current.writable === false && desc.writable === true) {
          return false;
        }
        if (current.writable === false) {
          if ('value' in desc && !sameValue(desc.value, current.value)) {
            return false;
          }
        }
      }
    } else if (isAccessorDescriptor(current) && isAccessorDescriptor(desc)) {
      if (current.configurable === false) {
        if ('set' in desc && !sameValue(desc.set, current.set)) {
          return false;
        }
        if ('get' in desc && !sameValue(desc.get, current.get)) {
          return false;
        }
      }
    }
    Object.defineProperty(target, name, desc); // should never fail
    return true;
  },
  deleteProperty: function(target, name) {
    var handler = directProxies.get(target);
    if (handler !== undefined) {
      return handler.delete(name);
    }
    
    var desc = Object.getOwnPropertyDescriptor(target, name);
    if (desc === undefined) {
      return true;
    }
    if (desc.configurable === true) {
      delete target[name];
      return true;
    }
    return false;    
  },
  getPrototypeOf: function(target) {
    return Object.getPrototypeOf(target);
  },
  setPrototypeOf: function(target, newProto) {
    
    var handler = directProxies.get(target);
    if (handler !== undefined) {
      return handler.setPrototypeOf(newProto);
    }
    
    if (Object(newProto) !== newProto || newProto === null) {
      throw new TypeError("Object prototype may only be an Object or null: " +
                         newProto);
    }
    
    if (!Object_isExtensible(target)) {
      return false;
    }
    
    var current = Object.getPrototypeOf(target);
    if (sameValue(current, newProto)) {
      return true;
    }
    
    if (prim_setPrototypeOf) {
      try {
        prim_setPrototypeOf(target, newProto);
        return true;
      } catch (e) {
        return false;
      }
    }

    __proto__setter.call(target, newProto);
    return true;
  },
  preventExtensions: function(target) {
    var handler = directProxies.get(target);
    if (handler !== undefined) {
      return handler.preventExtensions();
    }
    prim_preventExtensions(target);
    return true;
  },
  isExtensible: function(target) {
    return Object.isExtensible(target);
  },
  has: function(target, name) {
    return name in target;
  },
  get: function(target, name, receiver) {
    receiver = receiver || target;

    // if target is a proxy, invoke its "get" trap
    var handler = directProxies.get(target);
    if (handler !== undefined) {
      return handler.get(receiver, name);
    }

    var desc = Object.getOwnPropertyDescriptor(target, name);
    if (desc === undefined) {
      var proto = Object.getPrototypeOf(target);
      if (proto === null) {
        return undefined;
      }
      return Reflect.get(proto, name, receiver);
    }
    if (isDataDescriptor(desc)) {
      return desc.value;
    }
    var getter = desc.get;
    if (getter === undefined) {
      return undefined;
    }
    return desc.get.call(receiver);
  },
  // Reflect.set implementation based on latest version of [[SetP]] at
  // http://wiki.ecmascript.org/doku.php?id=harmony:proto_climbing_refactoring
  set: function(target, name, value, receiver) {
    receiver = receiver || target;

    // if target is a proxy, invoke its "set" trap
    var handler = directProxies.get(target);
    if (handler !== undefined) {
      return handler.set(receiver, name, value);
    }

    // first, check whether target has a non-writable property
    // shadowing name on receiver
    var ownDesc = Object.getOwnPropertyDescriptor(target, name);

    if (ownDesc === undefined) {
      // name is not defined in target, search target's prototype
      var proto = Object.getPrototypeOf(target);

      if (proto !== null) {
        // continue the search in target's prototype
        return Reflect.set(proto, name, value, receiver);
      }

      // Rev16 change. Cf. https://bugs.ecmascript.org/show_bug.cgi?id=1549
      // target was the last prototype, now we know that 'name' is not shadowed
      // by an existing (accessor or data) property, so we can add the property
      // to the initial receiver object
      // (this branch will intentionally fall through to the code below)
      ownDesc =
        { value: undefined,
          writable: true,
          enumerable: true,
          configurable: true };
    }

    // we now know that ownDesc !== undefined
    if (isAccessorDescriptor(ownDesc)) {
      var setter = ownDesc.set;
      if (setter === undefined) return false;
      setter.call(receiver, value); // assumes Function.prototype.call
      return true;
    }
    // otherwise, isDataDescriptor(ownDesc) must be true
    if (ownDesc.writable === false) return false;
    // we found an existing writable data property on the prototype chain.
    // Now update or add the data property on the receiver, depending on
    // whether the receiver already defines the property or not.
    var existingDesc = Object.getOwnPropertyDescriptor(receiver, name);
    if (existingDesc !== undefined) {
      var updateDesc =
        { value: value,
          // FIXME: it should not be necessary to describe the following
          // attributes. Added to circumvent a bug in tracemonkey:
          // https://bugzilla.mozilla.org/show_bug.cgi?id=601329
          writable:     existingDesc.writable,
          enumerable:   existingDesc.enumerable,
          configurable: existingDesc.configurable };
      Object.defineProperty(receiver, name, updateDesc);
      return true;
    } else {
      if (!Object.isExtensible(receiver)) return false;
      var newDesc =
        { value: value,
          writable: true,
          enumerable: true,
          configurable: true };
      Object.defineProperty(receiver, name, newDesc);
      return true;
    }
  },
  /*invoke: function(target, name, args, receiver) {
    receiver = receiver || target;

    var handler = directProxies.get(target);
    if (handler !== undefined) {
      return handler.invoke(receiver, name, args);
    }

    var fun = Reflect.get(target, name, receiver);
    return Function.prototype.apply.call(fun, receiver, args);
  },*/
  enumerate: function(target) {
    var handler = directProxies.get(target);
    var result;
    if (handler !== undefined) {
      // handler.enumerate should return an iterator directly, but the
      // iterator gets converted to an array for backward-compat reasons,
      // so we must re-iterate over the array
      result = handler.enumerate(handler.target);
    } else {
      result = [];
      for (var name in target) { result.push(name); };      
    }
    var l = +result.length;
    var idx = 0;
    return {
      next: function() {
        if (idx === l) return { done: true };
        return { done: false, value: result[idx++] };
      }
    };
  },
  // imperfect ownKeys implementation: in ES6, should also include
  // symbol-keyed properties.
  ownKeys: function(target) {
    return Object_getOwnPropertyNames(target);
  },
  apply: function(target, receiver, args) {
    // target.apply(receiver, args)
    return Function.prototype.apply.call(target, receiver, args);
  },
  construct: function(target, args, newTarget) {
    // return new target(...args);

    // if target is a proxy, invoke its "construct" trap
    var handler = directProxies.get(target);
    if (handler !== undefined) {
      return handler.construct(handler.target, args, newTarget);
    }
    
    if (typeof target !== "function") {
      throw new TypeError("target is not a function: " + target);
    }
    if (newTarget === undefined) {
      newTarget = target;
    } else {
      if (typeof newTarget !== "function") {
        throw new TypeError("newTarget is not a function: " + target);
      }      
    }

    return new (Function.prototype.bind.apply(newTarget, [null].concat(args)));
  }
};

// feature-test whether the Proxy global exists, with
// the harmony-era Proxy.create API
if (typeof Proxy !== "undefined" &&
    typeof Proxy.create !== "undefined") {

  var primCreate = Proxy.create,
      primCreateFunction = Proxy.createFunction;

  var revokedHandler = primCreate({
    get: function() { throw new TypeError("proxy is revoked"); }
  });

  global.Proxy = function(target, handler) {
    // check that target is an Object
    if (Object(target) !== target) {
      throw new TypeError("Proxy target must be an Object, given "+target);
    }
    // check that handler is an Object
    if (Object(handler) !== handler) {
      throw new TypeError("Proxy handler must be an Object, given "+handler);
    }

    var vHandler = new Validator(target, handler);
    var proxy;
    if (typeof target === "function") {
      proxy = primCreateFunction(vHandler,
        // call trap
        function() {
          var args = Array.prototype.slice.call(arguments);
          return vHandler.apply(target, this, args);
        },
        // construct trap
        function() {
          var args = Array.prototype.slice.call(arguments);
          return vHandler.construct(target, args);
        });
    } else {
      proxy = primCreate(vHandler, Object.getPrototypeOf(target));
    }
    directProxies.set(proxy, vHandler);
    return proxy;
  };

  global.Proxy.revocable = function(target, handler) {
    var proxy = new Proxy(target, handler);
    var revoke = function() {
      var vHandler = directProxies.get(proxy);
      if (vHandler !== null) {
        vHandler.target  = null;
        vHandler.handler = revokedHandler;
      }
      return undefined;
    };
    return {proxy: proxy, revoke: revoke};
  }
  
  // add the old Proxy.create and Proxy.createFunction methods
  // so old code that still depends on the harmony-era Proxy object
  // is not broken. Also ensures that multiple versions of this
  // library should load fine
  global.Proxy.create = primCreate;
  global.Proxy.createFunction = primCreateFunction;

} else {
  // Proxy global not defined, or old API not available
  if (typeof Proxy === "undefined") {
    // Proxy global not defined, add a Proxy function stub
    global.Proxy = function(_target, _handler) {
      throw new Error("proxies not supported on this platform. On v8/node/iojs, make sure to pass the --harmony_proxies flag");
    };
  }
  // Proxy global defined but old API not available
  // presumably Proxy global already supports new API, leave untouched
}

// for node.js modules, export every property in the Reflect object
// as part of the module interface
if (typeof exports !== 'undefined') {
  Object.keys(Reflect).forEach(function (key) {
    exports[key] = Reflect[key];
  });
}

// function-as-module pattern
}(typeof exports !== 'undefined' ? global : this));
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options){
  options = options || {};
  if ('string' == typeof val) return parse(val);
  return options['long']
    ? fmtLong(val)
    : fmtShort(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = '' + str;
  if (str.length > 10000) return;
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day')
    || plural(ms, h, 'hour')
    || plural(ms, m, 'minute')
    || plural(ms, s, 'second')
    || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],5:[function(require,module,exports){
module.exports={
  "name": "mooc_player",
  "version": "0.1.0",
  "description": "MOOC player",
  "main": "src/player.js",
  "scripts": {
    "build:createDir": "mkdir -p dist/css || true",
    "build": "npm run build:createDir && browserify ./src/player.js -o dist/player.js --standalone UCFPlayer -t [ babelify --presets [ es2015 ] ]",
    "build:demo": "npm run build:createDir && npm run build:demo:sass && npm run build:demo:copy",
    "build:demo:sass": "node-sass demo/css/default.scss > dist/css/default.css",
    "build:demo:copy": "cp demo/*.*ml ../mooc_orchestrator_client/orchestrator-client.js ../mooc_tracker_player/tracker-player.js dist/",
    "vish": "npm run build && npm run build:demo:copy && cp dist/player.js ../../vish/vish/vish_editor/js/VISH.UCF.player.js  && cp dist/orchestrator-client.js ../../vish/vish/vish_editor/js/VISH.UCF.client.js",
    "xo": "xo",
    "patched-ms": "find node_modules -type d -name ms | xargs rm -fr && npm install https://github.com/gobwas/ms.js.git#patch-1",
    "test": "ava --tap | tap-nyan",
    "coverage": "nyc npm test && nyc report --reporter=lcov"
  },
  "author": "",
  "license": "SEE LICENSE IN LICENSE",
  "devDependencies": {
    "ava": "^0.15.2",
    "eslint": "^1.10.3",
    "eslint-config-xo": "^0.9.1",
    "jsdom": "^9.2.1",
    "node-sass": "^3.8.0"
  },
  "xo": {
    "esnext": true,
    "overrides": [
      {
        "files": "demo/**",
        "esnext": false,
        "envs": [
          "browser"
        ]
      }
    ]
  },
  "dependencies": {
    "babel-preset-es2015": "^6.3.13",
    "babelify": "^7.2.0",
    "browserify": "^12.0.1",
    "debug": "^2.2.0",
    "harmony-reflect": "^1.4.2"
  }
}

},{}],6:[function(require,module,exports){
'use strict';

var debug = require('debug')('UCFPlayer:Core:ActionManager');

function ActionManager() {
	var actionList = {};

	function addActions(newActions) {
		debug('addActions', newActions);
		actionList = Object.assign(actionList, newActions);
	}

	function getActions() {
		return actionList;
	}

	function execAction(element, actionId, data, cb) {
		// TODO element
		return actionList[actionId](data, cb);
	}

	function availableActions() {
		return Object.keys(actionList);
	}

	return {
		addActions: addActions,
		getActions: getActions,
		execAction: execAction,
		availableActions: availableActions
	};
}

module.exports = ActionManager;

},{"debug":1}],7:[function(require,module,exports){
'use strict';

module.exports = {
	playerAttrID: 'data-player-id',
	type: {
		ucf: 'ucf',
		vish: 'vish'
	}
};

},{}],8:[function(require,module,exports){
/* global window */
'use strict';

var debug = require('debug')('UCFPlayer:Core:Events');

function Events() {
	var eventList = {
		EVENT_NAVIGATION_NEXT: 'navigationNext',
		EVENT_NAVIGATION_PREVIOUS: 'navigationPrevious',
		EVENT_NAVIGATION_END: 'navigationEnd',
		EVENT_SHOW_CURENT_PAGE: 'showCurrentPage',
		EVENT_HIDE_CURENT_PAGE: 'hideCurrentPage',
		EVENT_CONTENT_SCROLL: 'contentScroll',
		EVENT_NAVIGATION_GOTOPAGE: 'navigationGotoPage'
	};

	var listeners = [];

	function emit(type, data) {
		var event = new window.CustomEvent(type, { detail: data });
		dispatchEvent(event);
	}

	function dispatchEvent(event) {
		debug(event.type, event);
		listeners.map(function (listener) {
			if (listener.type === event.type) {
				listener.cb(event);
			}
		});
	}

	function addEventListener(type, cb) {
		listeners.push({ type: type, cb: cb });
	}

	function addEvents(newEvents) {
		// eventList = eventList.concat(newEvents);
		eventList = Object.assign(eventList, newEvents);
	}

	function getEvents() {
		return eventList;
	}

	return {
		emit: emit,
		dispatchEvent: dispatchEvent,
		addEventListener: addEventListener,
		addEvents: addEvents,
		getEvents: getEvents
	};
}

module.exports = Events;

},{"debug":1}],9:[function(require,module,exports){
/* global document */
'use strict';

var debug = require('debug')('UCFPlayer:Core:Page');
var Events = require('./events');
var Constants = require('./constants');
var ActionManager = require('./action-manager');

function Player(options) {
	var playerState = {};
	var events = void 0;
	var actionManager = void 0;

	function extendPlayer(options) {
		debug('options', options);
		// TODO: init should be fired AFTER (onload ?) so init events can be properly caught.
		options.init(playerState.playerElement, events);
		events.addEvents(options.events);
		actionManager.addActions(options.actions);
	}

	function initialize(options) {
		// Initiate Events
		events = new Events();
		actionManager = new ActionManager();

		options = options || {};

		if (options.vish === true) {
			// player type VISH
			playerState.type = Constants.type.vish;
			playerState.playerElement = options.V;

			// Set options for websocket client from presentation settings
			var presentation = playerState.playerElement.Viewer.getCurrentPresentation();
			playerState.websocketEnabled = presentation.ucf_allow_ws_client;
			playerState.websocketUrl = presentation.ucf_websocket_url;

			// Set VISH actions and events
			extendPlayer(require('../extension/vish'));
		} else {
			// player type UCF
			playerState.type = Constants.type.ucf;

			// Set player element
			playerState.playerElement = options.element ? options.element : document.body;

			// Set options for websocket client
			playerState.websocketEnabled = options.websocketEnabled;
			playerState.websocketUrl = options.websocketUrl;

			// Set navigation elements
			extendPlayer(require('../extension/navigation'));

			// Set scroll elements
			extendPlayer(require('../extension/scroll'));

			// Set video elements
			extendPlayer(require('../extension/video'));
		}
	}

	function getOptions() {
		return playerState;
	}

	initialize(options);

	return {
		// Events
		addEventListener: events.addEventListener,
		getEvents: events.getEvents,

		// Actions
		execAction: actionManager.execAction.bind(this, playerState.playerElement),
		getActions: actionManager.availableActions,

		// Options
		getOptions: getOptions
	};
}

module.exports = Player;

},{"../extension/navigation":11,"../extension/scroll":12,"../extension/video":13,"../extension/vish":14,"./action-manager":6,"./constants":7,"./events":8,"debug":1}],10:[function(require,module,exports){
'use strict';

var Reflect = require('harmony-reflect');

// Convert to array a node list
function nodeList2Array(nodeList) {
	return Reflect.apply(Array.prototype.slice, nodeList);
}

function execIfFunction(cb, data) {
	if (typeof cb === 'function') {
		cb(data);
	}
}

module.exports = {
	nodeList2Array: nodeList2Array,
	execIfFunction: execIfFunction
};

},{"harmony-reflect":3}],11:[function(require,module,exports){
'use strict';

var _utils = require('../core/utils');

var debug = require('debug')('UCFPlayer:Extension:Navigation');
var PlayerConstants = require('../core/constants');


// Module constants
var ModuleConstants = {
	page: 'data-player-navigation-page',
	next: 'data-player-navigation-next',
	previous: 'data-player-navigation-previous',
	end: 'data-player-navigation-end',
	gotoPage: 'data-player-navigation-gotopage'
};

var events = {
	EVENT_NAVIGATION_NEXT: 'EVENT_NAVIGATION_NEXT',
	EVENT_NAVIGATION_PREVIOUS: 'EVENT_NAVIGATION_PREVIOUS',
	EVENT_NAVIGATION_END: 'EVENT_NAVIGATION_END',
	EVENT_SHOWCURRENT_PAGE: 'EVENT_SHOWCURRENT_PAGE',
	EVENT_HIDECURRENT_PAGE: 'EVENT_HIDECURRENT_PAGE',
	EVENT_NAVIGATION_GOTOPAGE: 'EVENT_NAVIGATION_GOTOPAGE'
};

var moduleState = {};

// Reorder pages accordingly to attribute data-player-page
function reorderPages(pages) {
	var reorderedPages = [];
	for (var i = 0; i < pages.length; i++) {
		var page = pages[i];
		if (page.hasAttribute(ModuleConstants.page)) {
			var pageNumber = parseInt(page.getAttribute(ModuleConstants.page), 10) - 1;
			if (typeof reorderedPages[pageNumber] === 'undefined') {
				reorderedPages[pageNumber] = pages[i];
			} else {
				debug('Found repeated ' + ModuleConstants.page + ', not reordering pages.', pageNumber, page);
				return pages;
			}
		} else {
			debug('Found page without ' + ModuleConstants.page + ', not reordering pages.');
			return pages;
		}
	}
	return reorderedPages;
}

// Add class
function addClass(element, className) {
	if (!element.classList.contains(className)) {
		element.classList.add(className);
	}
}

// Remove class
function removeClass(element, className) {
	if (element.classList.contains(className)) {
		element.classList.remove(className);
	}
}

// Show element
function show(element) {
	removeClass(element, 'playerHide');
	addClass(element, 'playerShow');
}

// Hide element
function hide(element) {
	addClass(element, 'playerHide');
	removeClass(element, 'playerShow');
}

// Show next page, hide current page
function playerNavNext(elementState) {
	debug('nav next', events.EVENT_NAVIGATION_NEXT);
	hideCurrentPage(elementState);
	elementState.currentPage += 1;
	showCurrentPage(elementState);
	elementState.eventManager.emit(events.EVENT_NAVIGATION_NEXT, {
		page: elementState.currentPage
	});

	// tracker.setLocation(playerContentState.currentPage);
}

// Show previous page, hide current page
function playerNavPrevious(elementState) {
	debug('nav previous');
	hideCurrentPage(elementState);
	elementState.currentPage -= 1;
	showCurrentPage(elementState);
	elementState.eventManager.emit(events.EVENT_NAVIGATION_PREVIOUS, {
		page: elementState.currentPage
	});

	// tracker.setLocation(playerContentState.currentPage);
}

// End session
function playerNavEnd(elementState) {
	debug('finish!');
	elementState.eventManager.emit(events.EVENT_NAVIGATION_END);

	// tracker.finish();
}

// Show current page
function showCurrentPage(elementState) {
	elementState.eventManager.emit(events.EVENT_SHOWCURRENT_PAGE, { page: elementState.currentPage });
	show(elementState.pages[elementState.currentPage - 1]);
}

// Hide current page
function hideCurrentPage(elementState) {
	elementState.eventManager.emit(events.EVENT_HIDECURRENT_PAGE, { page: elementState.currentPage });
	hide(elementState.pages[elementState.currentPage - 1]);
}

// Goto page
function playerNavGotoPage(elementState, page) {
	debug('nav goto');
	hideCurrentPage(elementState);
	// TODO: should be change to find by ID
	elementState.currentPage = page;
	showCurrentPage(elementState);
	elementState.eventManager.emit(events.EVENT_NAVIGATION_GOTOPAGE, {
		page: elementState.currentPage
	});

	// tracker.setLocation(playerContentState.currentPage);
}

function findPageIndexByPlayerId(pagePlayerId, elementState) {
	var pageIndex = elementState.pages.reduce(function (previous, current, i) {
		return previous !== -1 || previous === -1 && current.getAttribute(ModuleConstants.page) !== pagePlayerId ? previous : i;
	}, -1);
	return pageIndex;
}

// Goto page
function playerNavGotoPageBind(elementState) {
	debug('nav goto');
	hideCurrentPage(elementState);
	elementState.currentPage = findPageIndexByPlayerId(this.getAttribute(ModuleConstants.gotoPage, elementState));
	showCurrentPage(elementState);
	elementState.eventManager.emit(events.EVENT_NAVIGATION_GOTOPAGE, {
		page: elementState.currentPage
	});

	// tracker.setLocation(playerContentState.currentPage);
}

var actions = {
	ACTION_NAVIGATION_GOTOPAGE: function ACTION_NAVIGATION_GOTOPAGE(data, cb) {
		var elementId = data.elementId || Object.keys(moduleState)[0];
		playerNavGotoPage(moduleState[elementId], data.page);
		(0, _utils.execIfFunction)(cb, {});
	},
	ACTION_NAVIGATION_END: function ACTION_NAVIGATION_END(data, cb) {
		var elementId = data.elementId || Object.keys(moduleState)[0];
		playerNavEnd(moduleState[elementId]);
		(0, _utils.execIfFunction)(cb, {});
	},
	ACTION_NAVIGATION_NEXTPAGE: function ACTION_NAVIGATION_NEXTPAGE(data, cb) {
		var elementId = data.elementId || Object.keys(moduleState)[0];
		playerNavNext(moduleState[elementId]);
		(0, _utils.execIfFunction)(cb, {});
	},
	ACTION_NAVIGATION_PREVIOUSPAGE: function ACTION_NAVIGATION_PREVIOUSPAGE(data, cb) {
		var elementId = data.elementId || Object.keys(moduleState)[0];
		playerNavPrevious(moduleState[elementId]);
		(0, _utils.execIfFunction)(cb, {});
	}
};

module.exports = {
	init: function init(element, eventManager) {
		// Create state for element
		var elementID = element.getAttribute(PlayerConstants.playerAttrID);
		moduleState[elementID] = {
			eventManager: eventManager
		};

		// Detect pages
		moduleState[elementID].pages = reorderPages((0, _utils.nodeList2Array)(element.querySelectorAll('*[' + ModuleConstants.page + ']')));
		debug('ModuleConstants.page', '*[' + ModuleConstants.page + ']');
		debug('element', element);

		// Hide all pages
		moduleState[elementID].pages.forEach(function (page) {
			hide(page);
		});

		// Set next buttons
		var navigationNexts = (0, _utils.nodeList2Array)(element.querySelectorAll('*[' + ModuleConstants.next + ']'));
		navigationNexts.forEach(function (navNext) {
			navNext.onclick = playerNavNext.bind(undefined, moduleState[elementID]);
		});

		// Set previous buttons
		var navigationPreviouss = (0, _utils.nodeList2Array)(element.querySelectorAll('*[' + ModuleConstants.previous + ']'));
		navigationPreviouss.forEach(function (navPrevious) {
			navPrevious.onclick = playerNavPrevious.bind(undefined, moduleState[elementID]);
		});

		// Set end button
		var navigationEnds = (0, _utils.nodeList2Array)(element.querySelectorAll('*[' + ModuleConstants.end + ']'));
		navigationEnds.forEach(function (navEnd) {
			navEnd.onclick = playerNavEnd.bind(undefined, moduleState[elementID]);
		});

		var navigationGotoPages = (0, _utils.nodeList2Array)(element.querySelectorAll('*[' + ModuleConstants.gotoPage + ']'));
		navigationGotoPages.forEach(function (navGotoPage) {
			navGotoPage.onclick = playerNavGotoPageBind.bind(navGotoPage, moduleState[elementID]);
		});

		debug('moduleState', moduleState[elementID]);

		// Show first page
		moduleState[elementID].currentPage = 1;
		showCurrentPage(moduleState[elementID]);
	},
	actions: actions,
	events: events
};

},{"../core/constants":7,"../core/utils":10,"debug":1}],12:[function(require,module,exports){
/* global document */
'use strict';

var _utils = require('../core/utils');

var debug = require('debug')('UCFPlayer:Extension:Scroll');


var propertyName = 'data-player-scroll';

var events = {
	// TODO: implement scroll left / top
	EVENT_CONTENT_SCROLL: 'EVENT_CONTENT_SCROLL'
};

function playerContentScroll(eventManager, e) {
	debug(arguments, e, this);
	eventManager.emit(events.EVENT_CONTENT_SCROLL, { scrollTop: this.scrollTop, scrollLeft: this.scrollLeft });
}

var actions = {
	ACTION_SCROLL: function ACTION_SCROLL(data, cb) {
		var elementId = data.elementId;
		var parentElement = data.parent ? document.querySelector(data.parent) : document;
		var intElemScrollTop = data.scrollTop || null;
		var intElemScrollLeft = data.scrollLeft || null;
		if (intElemScrollTop !== null) {
			parentElement.querySelector('*[data-player-id=' + elementId + ']').scrollTop = intElemScrollTop;
		}
		if (intElemScrollLeft !== null) {
			parentElement.querySelector('*[data-player-id=' + elementId + ']').scrollLeft = intElemScrollLeft;
		}
		(0, _utils.execIfFunction)(cb, {});
	}
};

module.exports = {
	init: function init(element, eventManager) {
		(0, _utils.nodeList2Array)(element.querySelectorAll('*[' + propertyName + ']')).forEach(function (contentVideo) {
			// TODO: check element is valid, for example have data-player-id
			contentVideo.onscroll = playerContentScroll.bind(contentVideo, eventManager);
		});
	},
	actions: actions,
	events: events
};

},{"../core/utils":10,"debug":1}],13:[function(require,module,exports){
/* global document */
'use strict';

var _arguments = arguments;

var _utils = require('../core/utils');

var debug = require('debug')('UCFPlayer:Extension:Video');


var propertyName = 'data-player-video';

var events = {
	EVENT_CONTENT_VIDEO_PLAY: 'EVENT_CONTENT_VIDEO_PLAY',
	EVENT_CONTENT_VIDEO_PAUSE: 'EVENT_CONTENT_VIDEO_PAUSE',
	EVENT_CONTENT_VIDEO_SEEKED: 'EVENT_CONTENT_VIDEO_SEEKED',
	EVENT_CONTENT_VIDEO_TIMEUPDATE: 'EVENT_CONTENT_VIDEO_TIMEUPDATE'
};

function playerContentVideoPlay(eventManager, e) {
	debug(arguments, e);
	eventManager.emit(events.EVENT_CONTENT_VIDEO_PLAY);
}

function playerContentVideoPause(eventManager, e) {
	debug(arguments, e);
	eventManager.emit(events.EVENT_CONTENT_VIDEO_PAUSE);
}

function playerContentVideoSeeked(eventManager, e) {
	debug(arguments, e);
	eventManager.emit(events.EVENT_CONTENT_VIDEO_SEEKED);
}

function playerContentVideoTimeupdate(eventManager, e) {
	debug(arguments, e);
	eventManager.emit(events.EVENT_CONTENT_VIDEO_TIMEUPDATE);
}

var actions = {
	ACTION_CONTENT_VIDEO_PLAY: function ACTION_CONTENT_VIDEO_PLAY(data, cb) {
		debug('actions ACTION_CONTENT_VIDEO_PLAY', _arguments);
		var elementId = data.video;
		var parentElement = data.parent ? document.querySelector(data.parent) : document;
		parentElement.querySelector('*[data-player-id=' + elementId + ']').play();
		(0, _utils.execIfFunction)(cb, {});
	},
	ACTION_CONTENT_VIDEO_PAUSE: function ACTION_CONTENT_VIDEO_PAUSE(data, cb) {
		debug('actions ACTION_CONTENT_VIDEO_PAUSE', _arguments);
		var elementId = data.video;
		var parentElement = data.parent ? document.querySelector(data.parent) : document;
		parentElement.querySelector('*[data-player-id=' + elementId + ']').pause();
		(0, _utils.execIfFunction)(cb, {});
	},
	ACTION_CONTENT_VIDEO_SEEK: function ACTION_CONTENT_VIDEO_SEEK(data, cb) {
		debug('actions ACTION_CONTENT_VIDEO_SEEK', _arguments);
		var elementId = data.video;
		var parentElement = data.parent ? document.querySelector(data.parent) : document;
		parentElement.querySelector('*[data-player-id=' + elementId + ']').currentTime = data.seekTime;
		(0, _utils.execIfFunction)(cb, {});
	},
	ACTION_CONTENT_VIDEO_SET_VOLUME: function ACTION_CONTENT_VIDEO_SET_VOLUME(data, cb) {
		debug('actions ACTION_CONTENT_VIDEO_SEEK', _arguments);
		var elementId = data.video;
		var parentElement = data.parent ? document.querySelector(data.parent) : document;
		parentElement.querySelector('*[data-player-id=' + elementId + ']').volume = data.volume;
		(0, _utils.execIfFunction)(cb, {});
	}
};

module.exports = {
	init: function init(element, eventManager) {
		(0, _utils.nodeList2Array)(element.querySelectorAll('*[' + propertyName + ']')).forEach(function (contentVideo) {
			// TODO: check element is valid, for example have data-player-id
			contentVideo.onplay = playerContentVideoPlay.bind(undefined, eventManager);
			contentVideo.onpause = playerContentVideoPause.bind(undefined, eventManager);
			contentVideo.onseeked = playerContentVideoSeeked.bind(undefined, eventManager);
			contentVideo.ontimeupdate = playerContentVideoTimeupdate.bind(undefined, eventManager);
		});
	},
	actions: actions,
	events: events
};

},{"../core/utils":10,"debug":1}],14:[function(require,module,exports){
/* global $, document*/
'use strict';

var _arguments = arguments;

var _utils = require('../core/utils');

var debug = require('debug')('UCFPlayer:Extension:VISH');


var moduleState = {};

/* Events */
var events = {
	EVENT_NAVIGATION_GOTOPAGE: 'EVENT_NAVIGATION_GOTOPAGE',
	EVENT_NAVIGATION_SUBPAGEOPEN: 'EVENT_NAVIGATION_SUBPAGEOPEN',
	EVENT_NAVIGATION_SUBPAGECLOSED: 'EVENT_NAVIGATION_SUBPAGECLOSED',
	EVENT_CONTENT_VIDEO_PLAY: 'EVENT_CONTENT_VIDEO_PLAY',
	EVENT_CONTENT_VIDEO_PAUSE: 'EVENT_CONTENT_VIDEO_PAUSE',
	EVENT_CONTENT_VIDEO_SEEKED: 'EVENT_CONTENT_VIDEO_SEEKED',
	EVENT_CONTENT_AUDIO_PLAY: 'EVENT_CONTENT_AUDIO_PLAY',
	EVENT_CONTENT_AUDIO_PAUSE: 'EVENT_CONTENT_AUDIO_PAUSE',
	EVENT_CONTENT_AUDIO_SEEKED: 'EVENT_CONTENT_AUDIO_SEEKED',
	EVENT_QUIZ_ANSWERED: 'EVENT_QUIZ_ANSWERED',
	EVENT_CONTENT_RESIZE: 'EVENT_CONTENT_RESIZE',
	EVENT_NAVIGATION_END: 'EVENT_NAVIGATION_END',
	EVENT_NAVIGATION_CLICK: 'EVENT_NAVIGATION_CLICK',
	EVENT_TRACKED_ACTION: 'EVENT_TRACKED_ACTION'
};

// event translation
// UCF => VISH
var eventsUCF2VISH = {
	EVENT_NAVIGATION_GOTOPAGE: {
		vishEventId: 'onGoToSlide',
		data: { page: 'slideNumber' }
	},
	EVENT_NAVIGATION_SUBPAGE_OPEN: {
		vishEventId: 'onSubslideOpen',
		data: { subPage: 'slideId', triggeredByUser: 'triggeredByUser' }
	},
	EVENT_NAVIGATION_SUBPAGE_CLOSED: {
		vishEventId: 'onSubslideClosed',
		data: { subPage: 'slideId', triggeredByUser: 'triggeredByUser' }
	},
	EVENT_CONTENT_VIDEO_PLAY: {
		vishEventId: 'onPlayVideo',
		data: { video: 'id' }
	},
	EVENT_CONTENT_VIDEO_PAUSE: {
		vishEventId: 'onPauseVideo',
		data: { video: 'id' }
	},
	EVENT_CONTENT_VIDEO_SEEKED: {
		vishEventId: 'onSeekVideo',
		data: { video: 'id', time: 'currentTime' }
	},
	EVENT_CONTENT_AUDIO_PLAY: {
		vishEventId: 'onPlayAudio',
		data: { audio: 'id' }
	},
	EVENT_CONTENT_AUDIO_PAUSE: {
		vishEventId: 'onPauseAudio',
		data: { audio: 'id' }
	},
	EVENT_CONTENT_AUDIO_SEEKED: {
		vishEventId: 'onSeekAudio',
		data: { audio: 'id', time: 'currentTime' }
	},
	EVENT_QUIZ_ANSWERED: {
		vishEventId: 'onAnswerQuiz'
	},
	EVENT_CONTENT_RESIZE: {
		vishEventId: 'onViewportResize'
	},
	EVENT_NAVIGATION_END: {
		vishEventId: 'exit'
	},
	EVENT_TRACKED_ACTION: {
		vishEventId: 'onTrackedAction'
	}
};

function registerEvents() {
	var ucfEventKeys = Object.keys(eventsUCF2VISH);
	ucfEventKeys.forEach(function (e) {
		var eventObj = eventsUCF2VISH[e];
		moduleState.VISH.EventsNotifier.registerCallback(moduleState.VISH.Constant.Event[eventObj.vishEventId], function (params) {
			debug('params', params);
			var data = {};
			var keys = eventObj.data ? Object.keys(eventObj.data) : [];
			if (eventObj.data && keys.length) {
				keys.forEach(function (k) {
					data[k] = params[eventObj.data[k]];
				});
			} else {
				data = params;
			}
			moduleState.eventManager.emit(e, data);
		});
	});

	// Custom Tracking Events
	// JQuery is part of VISH
	$(document).bind('click', function (event) {
		var params = {};
		params.x = event.clientX;
		params.y = event.clientY;

		if (event.target) {
			if (event.target.tagName) {
				params.targetTagName = event.target.tagName;
			}
			if (event.target.id) {
				params.targetId = event.target.id;
			}
		}

		moduleState.eventManager.emit(events.EVENT_NAVIGATION_CLICK, params);
	});
}

function jQueryElemById(elemId) {
	return $('#' + elemId);
}

/* Actions */
var actions = {
	ACTION_NAVIGATION_GOTOPAGE: function ACTION_NAVIGATION_GOTOPAGE(data, cb) {
		debug('actions GOTOPAGE', _arguments);
		moduleState.VISH.Slides.goToSlide(data.page);
		(0, _utils.execIfFunction)(cb, {});
	},
	ACTION_NAVIGATION_END: function ACTION_NAVIGATION_END(data, cb) {
		moduleState.VISH.Slides.lastSlide();
		(0, _utils.execIfFunction)(cb, {});
	},
	ACTION_NAVIGATION_NEXTPAGE: function ACTION_NAVIGATION_NEXTPAGE(data, cb) {
		moduleState.VISH.Slides.forwardOneSlide();
		(0, _utils.execIfFunction)(cb, {});
	},
	ACTION_NAVIGATION_PREVIOUSPAGE: function ACTION_NAVIGATION_PREVIOUSPAGE(data, cb) {
		moduleState.VISH.Slides.backwardOneSlide();
		(0, _utils.execIfFunction)(cb, {});
	},
	ACTION_NAVIGATION_SUBPAGE_OPEN: function ACTION_NAVIGATION_SUBPAGE_OPEN(data, cb) {
		debug('actions GOTOPAGE', _arguments);
		moduleState.VISH.Slides.openSubslide(data.subpage, false);
		(0, _utils.execIfFunction)(cb, {});
	},
	ACTION_NAVIGATION_SUBPAGE_CLOSE: function ACTION_NAVIGATION_SUBPAGE_CLOSE(data, cb) {
		debug('actions GOTOPAGE', _arguments);
		moduleState.VISH.Slides.closeSubslide(data.subpage, false);
		(0, _utils.execIfFunction)(cb, {});
	},
	/* Based on VISH.Messenger.WAPP.js */
	ACTION_GET_USER: function ACTION_GET_USER(data, cb) {
		debug('actions ACTION_GET_USER', _arguments);
		var response = { username: moduleState.VISH.User.getName(), logged: moduleState.VISH.User.isLogged() };
		(0, _utils.execIfFunction)(cb, response);
	},
	ACTION_GET_AUTH_TOKEN: function ACTION_GET_AUTH_TOKEN(data, cb) {
		debug('actions ACTION_GET_AUTH_TOKEN', _arguments);
		moduleState.VISH.Object.Webapp.Handler.getAuthToken(function (token) {
			(0, _utils.execIfFunction)(cb, token);
		});
	},
	ACTION_NOTIFY_TRACKER: function ACTION_NOTIFY_TRACKER(data, cb) {
		debug('actions ACTION_NOTIFY_TRACKER', _arguments);
		var trackerAction = data;
		trackerAction.params = trackerAction.params || {};
		trackerAction.params.wapp = data.origin;
		moduleState.VISH.EventsNotifier.notifyEvent(moduleState.VISH.Constant.Event.onTrackedAction, trackerAction, true);
		(0, _utils.execIfFunction)(cb, {});
	},
	ACTION_GET_QUIZ: function ACTION_GET_QUIZ(data, cb) {
		debug('actions ACTION_GET_QUIZ', _arguments);
		var response = moduleState.VISH.Quiz.getQuiz(data.quiz);
		(0, _utils.execIfFunction)(cb, response);
	},
	ACTION_QUIZ_SUBMIT_ENABLE: function ACTION_QUIZ_SUBMIT_ENABLE(data, cb) {
		debug('actions ACTION_QUIZ_SUBMIT_ENABLE', _arguments);
		moduleState.VISH.Quiz.enableAnswerButton('#' + data.quiz);
		(0, _utils.execIfFunction)(cb, {});
	},
	ACTION_QUIZ_SUBMIT_DISABLE: function ACTION_QUIZ_SUBMIT_DISABLE(data, cb) {
		debug('actions ACTION_QUIZ_SUBMIT_DISABLE', _arguments);
		moduleState.VISH.Quiz.disableAnswerButton('#' + data.quiz);
		(0, _utils.execIfFunction)(cb, {});
	},
	ACTION_QUIZ_SUBMIT_RETRY: function ACTION_QUIZ_SUBMIT_RETRY(data, cb) {
		debug('actions ACTION_QUIZ_SUBMIT_RETRY', _arguments);
		moduleState.VISH.Quiz.retryAnswerButton('#' + data.quiz);
		(0, _utils.execIfFunction)(cb, {});
	},
	ACTION_QUIZ_SUBMIT_CONTINUE: function ACTION_QUIZ_SUBMIT_CONTINUE(data, cb) {
		debug('actions ACTION_QUIZ_SUBMIT_CONTINUE', _arguments);
		moduleState.VISH.Quiz.continueAnswerButton('#' + data.quiz);
		(0, _utils.execIfFunction)(cb, {});
	},
	ACTION_CONTENT_VIDEO_PLAY: function ACTION_CONTENT_VIDEO_PLAY(data, cb) {
		debug('actions ACTION_CONTENT_VIDEO_PLAY', _arguments);
		debug('data, cb', data, cb);
		moduleState.VISH.Video.play(jQueryElemById(data.video));
		(0, _utils.execIfFunction)(cb, {});
	},
	ACTION_CONTENT_VIDEO_PAUSE: function ACTION_CONTENT_VIDEO_PAUSE(data, cb) {
		debug('actions ACTION_CONTENT_VIDEO_PAUSE', _arguments);
		moduleState.VISH.Video.pause(jQueryElemById(data.video));
		(0, _utils.execIfFunction)(cb, {});
	},
	ACTION_CONTENT_VIDEO_SEEK: function ACTION_CONTENT_VIDEO_SEEK(data, cb) {
		debug('actions ACTION_CONTENT_VIDEO_SEEK', _arguments);
		moduleState.VISH.Video.seekTo(jQueryElemById(data.video), data.seekTime);
		(0, _utils.execIfFunction)(cb, {});
	},
	ACTION_CONTENT_VIDEO_SET_VOLUME: function ACTION_CONTENT_VIDEO_SET_VOLUME(data, cb) {
		debug('actions ACTION_CONTENT_VIDEO_SET_VOLUME', _arguments);
		moduleState.VISH.Video.setVolume(jQueryElemById(data.video), data.volume * 100);
		(0, _utils.execIfFunction)(cb, {});
	},
	/* Unfortunately AUDIO has no control methods */
	ACTION_IS_FULLSCREEN_SUPPORTED: function ACTION_IS_FULLSCREEN_SUPPORTED(data, cb) {
		debug('actions ACTION_IS_FULLSCREEN_SUPPORTED', _arguments);
		var response = { fullscreenIsSupported: moduleState.VISH.FullScreen.isFullScreenSupported() };
		(0, _utils.execIfFunction)(cb, response);
	},
	ACTION_CAN_FULLSCREEN: function ACTION_CAN_FULLSCREEN(data, cb) {
		debug('actions ACTION_CAN_FULLSCREEN', _arguments);
		var response = { canFullscreen: moduleState.VISH.FullScreen.canFullScreen() };
		(0, _utils.execIfFunction)(cb, response);
	},
	ACTION_ENTER_FULLSCREEN: function ACTION_ENTER_FULLSCREEN(data, cb) {
		debug('actions ACTION_ENTER_FULLSCREEN', _arguments);
		$('#page-fullscreen').click();
		(0, _utils.execIfFunction)(cb, {});
	},
	ACTION_IS_FULLSCREEN: function ACTION_IS_FULLSCREEN(data, cb) {
		debug('actions ACTION_IS_FULLSCREEN', _arguments);
		var response = { isFullscreen: moduleState.VISH.FullScreen.isFullScreen() };
		(0, _utils.execIfFunction)(cb, response);
	},
	ACTION_IS_ANOTHER_ELEMENT_FULLSCREEN: function ACTION_IS_ANOTHER_ELEMENT_FULLSCREEN(data, cb) {
		debug('actions ACTION_IS_FULLSCREEN', _arguments);
		var response = { isAnotherElementFullscreen: moduleState.VISH.FullScreen.isOtherElementInFullScreen() };
		(0, _utils.execIfFunction)(cb, response);
	},
	ACTION_EXIT_FULLSCREEN: function ACTION_EXIT_FULLSCREEN(data, cb) {
		debug('actions ACTION_EXIT_FULLSCREEN', _arguments);
		moduleState.VISH.FullScreen.exitFromNativeFullScreen();
		(0, _utils.execIfFunction)(cb, {});
	},
	ACTION_GET_DEVICE: function ACTION_GET_DEVICE(data, cb) {
		debug('actions ACTION_GET_DEVICE', _arguments);
		var response = moduleState.VISH.Status.getDevice();
		(0, _utils.execIfFunction)(cb, response);
	},
	ACTION_IS_DEVICE_MOBILE: function ACTION_IS_DEVICE_MOBILE(data, cb) {
		debug('actions ACTION_IS_DEVICE_MOBILE', _arguments);
		var response = { mobile: moduleState.VISH.Status.getDevice().mobile };
		(0, _utils.execIfFunction)(cb, response);
	},
	ACTION_IS_DEVICE_DESKTOP: function ACTION_IS_DEVICE_DESKTOP(data, cb) {
		debug('actions ACTION_IS_DEVICE_DESKTOP', _arguments);
		var response = { desktop: moduleState.VISH.Status.getDevice().desktop };
		(0, _utils.execIfFunction)(cb, response);
	}
};

var init = function init(V, eventManager) {
	moduleState.VISH = V;
	moduleState.eventManager = eventManager;

	// Register events
	registerEvents();
};

module.exports = {
	init: init,
	actions: actions,
	events: events
};

},{"../core/utils":10,"debug":1}],15:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var debug = require('debug');
var pjson = require('../package.json');
var Player = require('./core/player');

var UCFPlayer = {
	version: pjson.version,
	debug: debug,
	players: [],
	vish: function vish(V) {
		var options = {
			vish: true,
			V: V
		};
		return player(options);
	},
	ucf: function ucf(element) {
		var options = { ucf: true };
		if ((typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object') {
			options = Object.assign(options, element);
		} else {
			options.element = element;
		}
		return player(options);
	}
};

function player(options) {
	var newPlayer = new Player(options);
	UCFPlayer.players.push(newPlayer);
	return newPlayer;
}

module.exports = UCFPlayer;

},{"../package.json":5,"./core/player":9,"debug":1}]},{},[15])(15)
});