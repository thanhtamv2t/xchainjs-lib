import { getPrivateKeyFromMnemonic, getAddressFromPrivateKey } from '@binance-chain/javascript-sdk/lib/crypto';
import { BncClient } from '@binance-chain/javascript-sdk/lib/client';
import { baseAmount, assetFromString, AssetBNB, assetToBase, assetAmount, BNBChain, assetToString, baseToAsset } from '@xchainjs/xchain-util';
import { validatePhrase } from '@xchainjs/xchain-crypto';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

var utils = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
var buildURL = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
var transformData = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

var cookies = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
var isAbsoluteURL = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
var buildFullPath = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

var isURLSameOrigin = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = xhr;
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

var defaults_1 = defaults;

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults_1.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
var mergeConfig = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

var Axios_1 = Axios;

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

var Cancel_1 = Cancel;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios_1.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults_1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios_1;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = Cancel_1;
axios.CancelToken = CancelToken_1;
axios.isCancel = isCancel;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;

var axios_1 = axios;

// Allow use of default import syntax in TypeScript
var default_1 = axios;
axios_1.default = default_1;

var axios$1 = axios_1;

/**
 * Type guard for runtime checks of `Fee`
 *
 * @param {Fee|TransferFee|DexFees} v
 * @returns {boolean} `true` or `false`.
 */
var isFee = function (v) { var _a, _b, _c; return !!((_a = v) === null || _a === void 0 ? void 0 : _a.msg_type) && ((_b = v) === null || _b === void 0 ? void 0 : _b.fee) !== undefined && ((_c = v) === null || _c === void 0 ? void 0 : _c.fee_for) !== undefined; };
/**
 * Type guard for `TransferFee`
 *
 * @param {Fee|TransferFee|DexFees} v
 * @returns {boolean} `true` or `false`.
 */
var isTransferFee = function (v) { var _a, _b; return isFee((_a = v) === null || _a === void 0 ? void 0 : _a.fixed_fee_params) && !!((_b = v) === null || _b === void 0 ? void 0 : _b.multi_transfer_fee); };
/**
 * Get TxType
 *
 * @param {BinanceTxType} t
 * @returns {TxType} `transfer` or `unknown`.
 */
var getTxType = function (t) {
    if (t === 'TRANSFER' || t === 'DEPOSIT')
        return 'transfer';
    return 'unknown';
};
/**
 * Parse Tx
 *
 * @param {BinanceTx} t The transaction to be parsed. (optional)
 * @returns {Tx|null} The transaction parsed from the binance tx.
 */
var parseTx = function (tx) {
    var asset = assetFromString(AssetBNB.chain + "." + tx.txAsset);
    if (!asset)
        return null;
    return {
        asset: asset,
        from: [
            {
                from: tx.fromAddr,
                amount: assetToBase(assetAmount(tx.value, 8)),
            },
        ],
        to: [
            {
                to: tx.toAddr,
                amount: assetToBase(assetAmount(tx.value, 8)),
            },
        ],
        date: new Date(tx.timeStamp),
        type: getTxType(tx.txType),
        hash: tx.txHash,
    };
};
/**
 * Get DerivePath
 *
 * @param {number} index (optional)
 * @returns {DerivePath} The binance derivation path by the index.
 */
var getDerivePath = function (index) {
    if (index === void 0) { index = 0; }
    return [44, 714, 0, 0, index];
};
/**
 * Get the default fee.
 *
 * @returns {Fees} The default fee.
 */
var getDefaultFees = function () {
    var singleTxFee = baseAmount(37500);
    return {
        type: 'base',
        fast: singleTxFee,
        fastest: singleTxFee,
        average: singleTxFee,
    };
};
/**
 * Get address prefix based on the network.
 *
 * @param {string} network
 * @returns {string} The address prefix based on the network.
 *
 **/
var getPrefix = function (network) { return (network === 'testnet' ? 'tbnb' : 'bnb'); };

/**
 * Custom Binance client
 */
var Client = /** @class */ (function () {
    /**
     * Constructor
     *
     * Client has to be initialised with network type and phrase.
     * It will throw an error if an invalid phrase has been passed.
     *
     * @param {XChainClientParams} params
     *
     * @throws {"Invalid phrase"} Thrown if the given phase is invalid.
     */
    function Client(_a) {
        var _this = this;
        var _b = _a.network, network = _b === void 0 ? 'testnet' : _b, phrase = _a.phrase;
        this.phrase = '';
        /**
         * Get the client url.
         *
         * @returns {string} The client url for binance chain based on the network.
         */
        this.getClientUrl = function () {
            return _this.network === 'testnet' ? 'https://testnet-dex.binance.org' : 'https://dex.binance.org';
        };
        /**
         * Get the explorer url.
         *
         * @returns {string} The explorer url based on the network.
         */
        this.getExplorerUrl = function () {
            return _this.network === 'testnet' ? 'https://testnet-explorer.binance.org' : 'https://explorer.binance.org';
        };
        /**
         * Get the explorer url for the given address.
         *
         * @param {Address} address
         * @returns {string} The explorer url for the given address based on the network.
         */
        this.getExplorerAddressUrl = function (address) {
            return _this.getExplorerUrl() + "/address/" + address;
        };
        /**
         * Get the explorer url for the given transaction id.
         *
         * @param {string} txID
         * @returns {string} The explorer url for the given transaction id based on the network.
         */
        this.getExplorerTxUrl = function (txID) {
            return _this.getExplorerUrl() + "/tx/" + txID;
        };
        /**
         * Set/update a new phrase
         *
         * @param {string} phrase A new phrase.
         * @returns {Address} The address from the given phrase
         *
         * @throws {"Invalid phrase"}
         * Thrown if the given phase is invalid.
         */
        this.setPhrase = function (phrase, walletIndex) {
            if (walletIndex === void 0) { walletIndex = 0; }
            if (!validatePhrase(phrase)) {
                throw new Error('Invalid phrase');
            }
            _this.phrase = phrase;
            return _this.getAddress(walletIndex);
        };
        /**
         * @private
         * Get private key.
         *
         * @param {number} index account index for the derivation path
         * @returns {PrivKey} The privkey generated from the given phrase
         *
         * @throws {"Phrase not set"}
         * Throws an error if phrase has not been set before
         * */
        this.getPrivateKey = function (index) {
            if (!_this.phrase)
                throw new Error('Phrase not set');
            return getPrivateKeyFromMnemonic(_this.phrase, true, index);
        };
        /**
         * Get the current address.
         *
         * @returns {Address} The current address.
         *
         * @throws {Error} Thrown if phrase has not been set before. A phrase is needed to create a wallet and to derive an address from it.
         */
        this.getAddress = function (index) {
            if (index === void 0) { index = 0; }
            return getAddressFromPrivateKey(_this.getPrivateKey(index), getPrefix(_this.network));
        };
        /**
         * Validate the given address.
         *
         * @param {Address} address
         * @returns {boolean} `true` or `false`
         */
        this.validateAddress = function (address) {
            return _this.bncClient.checkAddress(address, getPrefix(_this.network));
        };
        /**
         * Get the balance of a given address.
         *
         * @param {Address | number} address By default, it will return the balance of the current wallet. (optional)
         * @param {Asset} asset If not set, it will return all assets available. (optional)
         * @returns {Array<Balance>} The balance of the address.
         */
        this.getBalance = function (address, assets) { return __awaiter(_this, void 0, void 0, function () {
            var balances, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.bncClient.getBalance(address)];
                    case 1:
                        balances = _a.sent();
                        return [2 /*return*/, balances
                                .map(function (balance) {
                                return {
                                    asset: assetFromString(BNBChain + "." + balance.symbol) || AssetBNB,
                                    amount: assetToBase(assetAmount(balance.free, 8)),
                                };
                            })
                                .filter(function (balance) {
                                return !assets || assets.filter(function (asset) { return assetToString(balance.asset) === assetToString(asset); }).length;
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * @private
         * Search transactions with parameters.
         *
         * @returns {Params} The parameters to be used for transaction search.
         * */
        this.searchTransactions = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var clientUrl, url, endTime, diffTime, key, value, txHistory, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        clientUrl = this.getClientUrl() + "/api/v1/transactions";
                        url = new URL(clientUrl);
                        endTime = Date.now();
                        diffTime = 90 * 24 * 60 * 60 * 1000;
                        url.searchParams.set('endTime', endTime.toString());
                        url.searchParams.set('startTime', (endTime - diffTime).toString());
                        for (key in params) {
                            value = params[key];
                            if (value) {
                                url.searchParams.set(key, value);
                                if (key === 'startTime' && !params['endTime']) {
                                    url.searchParams.set('endTime', (parseInt(value) + diffTime).toString());
                                }
                                if (key === 'endTime' && !params['startTime']) {
                                    url.searchParams.set('startTime', (parseInt(value) - diffTime).toString());
                                }
                            }
                        }
                        return [4 /*yield*/, axios$1.get(url.toString()).then(function (response) { return response.data; })];
                    case 1:
                        txHistory = _a.sent();
                        return [2 /*return*/, {
                                total: txHistory.total,
                                txs: txHistory.tx.map(parseTx).filter(Boolean),
                            }];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_2)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Get transaction history of a given address with pagination options.
         * By default it will return the transaction history of the current wallet.
         *
         * @param {TxHistoryParams} params The options to get transaction history. (optional)
         * @returns {TxsPage} The transaction history.
         */
        this.getTransactions = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var error_3;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.searchTransactions({
                                address: params && params.address,
                                limit: params && ((_a = params.limit) === null || _a === void 0 ? void 0 : _a.toString()),
                                offset: params && ((_b = params.offset) === null || _b === void 0 ? void 0 : _b.toString()),
                                startTime: params && params.startTime && params.startTime.getTime().toString(),
                                txAsset: params && params.asset,
                            })];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2:
                        error_3 = _c.sent();
                        return [2 /*return*/, Promise.reject(error_3)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Get the transaction details of a given transaction id.
         *
         * @param {string} txId The transaction id.
         * @returns {Tx} The transaction details of the given transaction id.
         */
        this.getTransactionData = function (txId) { return __awaiter(_this, void 0, void 0, function () {
            var txResult, blockHeight, address, msgs, msg, txHistory, transaction, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, axios$1
                                .get(this.getClientUrl() + "/api/v1/tx/" + txId + "?format=json")
                                .then(function (response) { return response.data; })];
                    case 1:
                        txResult = _a.sent();
                        blockHeight = txResult.height;
                        address = '';
                        msgs = txResult.tx.value.msg;
                        if (msgs.length) {
                            msg = msgs[0].value;
                            if (msg.inputs && msg.inputs.length) {
                                address = msg.inputs[0].address;
                            }
                            else if (msg.outputs && msg.outputs.length) {
                                address = msg.outputs[0].address;
                            }
                        }
                        return [4 /*yield*/, this.searchTransactions({ address: address, blockHeight: blockHeight })];
                    case 2:
                        txHistory = _a.sent();
                        transaction = txHistory.txs.filter(function (tx) { return tx.hash === txId; })[0];
                        if (!transaction) {
                            throw new Error('transaction not found');
                        }
                        return [2 /*return*/, transaction];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_4)];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Broadcast multi-send transaction.
         *
         * @param {MultiSendParams} params The multi-send transfer options.
         * @returns {TxHash} The transaction hash.
         */
        this.multiSend = function (_a) {
            var _b = _a.walletIndex, walletIndex = _b === void 0 ? 0 : _b, transactions = _a.transactions, _c = _a.memo, memo = _c === void 0 ? '' : _c;
            return __awaiter(_this, void 0, void 0, function () {
                var derivedAddress, transferResult, error_5;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 4, , 5]);
                            derivedAddress = this.getAddress(walletIndex);
                            return [4 /*yield*/, this.bncClient.initChain()];
                        case 1:
                            _d.sent();
                            return [4 /*yield*/, this.bncClient.setPrivateKey(this.getPrivateKey(walletIndex)).catch(function (error) { return Promise.reject(error); })];
                        case 2:
                            _d.sent();
                            return [4 /*yield*/, this.bncClient.multiSend(derivedAddress, transactions.map(function (transaction) {
                                    return {
                                        to: transaction.to,
                                        coins: transaction.coins.map(function (coin) {
                                            return {
                                                denom: coin.asset.symbol,
                                                amount: baseToAsset(coin.amount).amount().toString(),
                                            };
                                        }),
                                    };
                                }), memo)];
                        case 3:
                            transferResult = _d.sent();
                            return [2 /*return*/, transferResult.result.map(function (txResult) { var _a; return (_a = txResult === null || txResult === void 0 ? void 0 : txResult.hash) !== null && _a !== void 0 ? _a : ''; })[0]];
                        case 4:
                            error_5 = _d.sent();
                            return [2 /*return*/, Promise.reject(error_5)];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Transfer balances.
         *
         * @param {TxParams} params The transfer options.
         * @returns {TxHash} The transaction hash.
         */
        this.transfer = function (_a) {
            var walletIndex = _a.walletIndex, asset = _a.asset, amount = _a.amount, recipient = _a.recipient, memo = _a.memo;
            return __awaiter(_this, void 0, void 0, function () {
                var transferResult, error_6;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, this.bncClient.initChain()];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, this.bncClient
                                    .setPrivateKey(this.getPrivateKey(walletIndex || 0))
                                    .catch(function (error) { return Promise.reject(error); })];
                        case 2:
                            _b.sent();
                            return [4 /*yield*/, this.bncClient.transfer(this.getAddress(), recipient, baseToAsset(amount).amount().toString(), asset ? asset.symbol : AssetBNB.symbol, memo)];
                        case 3:
                            transferResult = _b.sent();
                            return [2 /*return*/, transferResult.result.map(function (txResult) { var _a; return (_a = txResult === null || txResult === void 0 ? void 0 : txResult.hash) !== null && _a !== void 0 ? _a : ''; })[0]];
                        case 4:
                            error_6 = _b.sent();
                            return [2 /*return*/, Promise.reject(error_6)];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get the current transfer fee.
         *
         * @returns {TransferFee} The current transfer fee.
         */
        this.getTransferFee = function () { return __awaiter(_this, void 0, void 0, function () {
            var feesArray, transferFee, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios$1
                                .get(this.getClientUrl() + "/api/v1/fees")
                                .then(function (response) { return response.data; })];
                    case 1:
                        feesArray = _a.sent();
                        transferFee = feesArray.filter(isTransferFee)[0];
                        if (!transferFee) {
                            throw new Error('failed to get transfer fees');
                        }
                        return [2 /*return*/, transferFee];
                    case 2:
                        error_7 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_7)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Get the current fee.
         *
         * @returns {Fees} The current fee.
         */
        this.getFees = function () { return __awaiter(_this, void 0, void 0, function () {
            var transferFee, singleTxFee, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getTransferFee()];
                    case 1:
                        transferFee = _a.sent();
                        singleTxFee = baseAmount(transferFee.fixed_fee_params.fee);
                        return [2 /*return*/, {
                                type: 'base',
                                fast: singleTxFee,
                                fastest: singleTxFee,
                                average: singleTxFee,
                            }];
                    case 2:
                        error_8 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_8)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Get the current fee for multi-send transaction.
         *
         * @returns {Fees} The current fee for multi-send transaction.
         */
        this.getMultiSendFees = function () { return __awaiter(_this, void 0, void 0, function () {
            var transferFee, multiTxFee, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getTransferFee()];
                    case 1:
                        transferFee = _a.sent();
                        multiTxFee = baseAmount(transferFee.multi_transfer_fee);
                        return [2 /*return*/, {
                                type: 'base',
                                average: multiTxFee,
                                fast: multiTxFee,
                                fastest: multiTxFee,
                            }];
                    case 2:
                        error_9 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_9)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Get the current fee for both single and multi-send transaction.
         *
         * @returns {SingleAndMultiFees} The current fee for both single and multi-send transaction.
         */
        this.getSingleAndMultiFees = function () { return __awaiter(_this, void 0, void 0, function () {
            var transferFee, singleTxFee, multiTxFee, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getTransferFee()];
                    case 1:
                        transferFee = _a.sent();
                        singleTxFee = baseAmount(transferFee.fixed_fee_params.fee);
                        multiTxFee = baseAmount(transferFee.multi_transfer_fee);
                        return [2 /*return*/, {
                                single: {
                                    type: 'base',
                                    fast: singleTxFee,
                                    fastest: singleTxFee,
                                    average: singleTxFee,
                                },
                                multi: {
                                    type: 'base',
                                    average: multiTxFee,
                                    fast: multiTxFee,
                                    fastest: multiTxFee,
                                },
                            }];
                    case 2:
                        error_10 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_10)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.network = network;
        this.setPhrase(phrase || '');
        this.bncClient = new BncClient(this.getClientUrl());
        this.bncClient.chooseNetwork(network);
    }
    /**
     * Purge client.
     *
     * @returns {void}
     */
    Client.prototype.purgeClient = function () {
        this.phrase = '';
    };
    /**
     * Get the BncClient interface.
     *
     * @returns {BncClient} The BncClient from `@binance-chain/javascript-sdk`.
     */
    Client.prototype.getBncClient = function () {
        return this.bncClient;
    };
    /**
     * Set/update the current network.
     *
     * @param {Network} network `mainnet` or `testnet`.
     * @returns {void}
     *
     * @throws {"Network must be provided"}
     * Thrown if network has not been set before.
     */
    Client.prototype.setNetwork = function (network) {
        if (!network) {
            throw new Error('Network must be provided');
        }
        else {
            this.network = network;
            this.bncClient = new BncClient(this.getClientUrl());
            this.bncClient.chooseNetwork(network);
        }
    };
    /**
     * Get the current network.
     *
     * @returns {Network} The current network. (`mainnet` or `testnet`)
     */
    Client.prototype.getNetwork = function () {
        return this.network;
    };
    return Client;
}());

/**
 * Order status as part of an order
 * See description of Order.status for more detail https://docs.binance.org/api-reference/dex-api/paths.html#order
 */
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Ack"] = "Ack";
    OrderStatus["PartialFill"] = "PartialFill";
    OrderStatus["IocNoFill"] = "IocNoFill";
    OrderStatus["FullyFill"] = "FullyFill";
    OrderStatus["Canceled"] = "Canceled";
    OrderStatus["Expired"] = "Expired";
    OrderStatus["FailedBlocking"] = "FailedBlocking";
    OrderStatus["FailedMatching"] = "FailedMatching";
    OrderStatus["IocExpire"] = "IocExpire";
})(OrderStatus || (OrderStatus = {}));

/**
 * Type definitions for data of Binance WebSocket Streams
 * @see https://docs.binance.org/api-reference/dex-api/ws-streams.html
 *
 */
/**
 * Taker (as part of {@link Trade})
 */
var Taker;
(function (Taker) {
    Taker[Taker["UNKNOWN"] = 0] = "UNKNOWN";
    Taker[Taker["SELL_TAKER"] = 1] = "SELL_TAKER";
    Taker[Taker["BUY_TAKER"] = 2] = "BUY_TAKER";
    Taker[Taker["BUY_SURPLUS"] = 3] = "BUY_SURPLUS";
    Taker[Taker["SELL_SURPLUS"] = 4] = "SELL_SURPLUS";
    Taker[Taker["NEUTRAL"] = 5] = "NEUTRAL";
})(Taker || (Taker = {}));

var binanceWs = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get Taker () { return Taker; }
});

export { Client, OrderStatus, binanceWs as WS, getDefaultFees, getDerivePath, getPrefix };
