/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GoogleMaps {

  constructor() {
    this.map = null;
    this.markers = [];
    this.bounds = null;
    this.initOptions = { center: {lat: -14.235004, lng: -51.92528}, zoom: 5 }; // brasil
  }

  init() {
    let js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAFGFzc9BcMwW9UT2N5mYj9PeT4bXs8a6o';
    document.getElementsByTagName('head')[0].appendChild(js_file);
  }

  initMap(options) {
    window.gMap.map = new google.maps.Map(document.querySelector('googlemaps'), this.initOptions);
  }

  initBrazil() {
    window.gMap.map.setOptions(this.initOptions);
  }

  clearMarkers() {
    this.markers.forEach(marker => marker.setMap(null) );
  }

  addMarkers(m) {
    this.clearMarkers()
    this.bounds = new google.maps.LatLngBounds();

    m.forEach(marker => {
      let position = new google.maps.LatLng(marker.lat, marker.lng);

      this.markers.push(
        new google.maps.Marker({
          position: position,
          map: window.gMap.map,
          animation: google.maps.Animation.xo
        })
      );

      this.bounds.extend(position);
    });

    window.gMap.map.fitBounds(this.bounds);
    window.gMap.map.setOptions({
      zoom: 18
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GoogleMaps);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Loader {

  constructor() {
    this.loading = false;
    this.template = `<div class='block-screen'><div class='block-screen__spinner'></div></div>`;
  }

  block() {
    this.loading = true;
    this.render();
  }

  unblock() {
    this.loading = false;
    document.querySelector('.block-screen').remove();
  }

  render() {
    document.body.insertAdjacentHTML('beforeend', this.template);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Loader);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_apollo_fetch__ = __webpack_require__(4);


class Queries {

  constructor() {
    this.graphql_api = 'https://803votn6w7.execute-api.us-west-2.amazonaws.com/dev/public/graphql';
  }

  getAddressLocation(address) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAFGFzc9BcMwW9UT2N5mYj9PeT4bXs8a6o&address=${address}`);
  }

  getPOC(location) {
    const fetch = Object(__WEBPACK_IMPORTED_MODULE_0_apollo_fetch__["a" /* createApolloFetch */])({
      uri: this.graphql_api,
    });

    const date = new Date();
    date.toISOString();

    return fetch({
      query: `query pocSearchMethod($now: DateTime!, $algorithm: String!, $lat: String!, $long: String!) {
        pocSearch(now: $now, algorithm: $algorithm, lat: $lat, long: $long) {
          __typename
          id
          status
          tradingName
          officialName
          deliveryTypes {
            __typename
            pocDeliveryTypeId
            deliveryTypeId
            price
            title
            subtitle
            active
          }
          paymentMethods {
            __typename
            pocPaymentMethodId
            paymentMethodId
            active
            title
            subtitle
          }
          pocWorkDay {
            __typename
            weekDay
            active
            workingInterval {
              __typename
              openingTime
              closingTime
            }
          }
          address {
            __typename
            address1
            address2
            number
            city
            province
            zip
            coordinates
          }
          phone {
            __typename
            phoneNumber
          }
        }
      }`,
      variables: {
        "algorithm": "NEAREST",
        "lat": location.lat,
        "long": location.lng,
        "now": date
      }
    });
  }

  getBeers(pocId) {
    const fetch = Object(__WEBPACK_IMPORTED_MODULE_0_apollo_fetch__["a" /* createApolloFetch */])({
      uri: this.graphql_api,
    });

    return fetch({
      query: `query pocCategorySearch($id: ID!, $search: String!, $categoryId: Int!) {
        poc(id: $id) {
          products(categoryId: $categoryId, search: $search) {
            productVariants{
              title
              description
              imageUrl
              price
            }
          }
        }
      }`,
      variables: {
        "id": pocId,
        "search": "",
        "categoryId": 0
      }
    });
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Queries);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_GoogleMaps__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_Loader__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_Queries__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_BeerLocator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_Products__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vanilla_ui_router__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vanilla_ui_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_vanilla_ui_router__);







const loader = new __WEBPACK_IMPORTED_MODULE_1__modules_Loader__["a" /* default */]();
const query = new __WEBPACK_IMPORTED_MODULE_2__modules_Queries__["a" /* default */]();
const router = Object(__WEBPACK_IMPORTED_MODULE_5_vanilla_ui_router__["createRouter"])(document.getElementById('app'));
const BeerLocator = new __WEBPACK_IMPORTED_MODULE_3__modules_BeerLocator__["a" /* default */]();
const gMap = new __WEBPACK_IMPORTED_MODULE_0__modules_GoogleMaps__["a" /* default */]();
const products = new __WEBPACK_IMPORTED_MODULE_4__modules_Products__["a" /* default */]();
gMap.init();

// accessible in the HTML
window.BeerLocator = BeerLocator;
window.gMap = gMap;
window.initOptions = gMap.initOptions;
window.initMap = gMap.initMap;


// Routes
router
	.addRoute('', () => {
		router.navigateTo('home');
	})
	// Home
	.addRoute('home', {
		templateUrl: 'views/home.html',
		routeHandler: (domEntryPoint, routeParams) => {

			gMap.initMap();
			products.removeCart();

      BeerLocator.addressResultsDom = document.querySelector('addressresults');
      BeerLocator.addressResultsDom.addEventListener('click', e => {
          if (e.target.classList.contains('address__get-beers')) {
            router.navigateTo('products');
          }
      });
		}
	})
	// Products
  .addRoute('products', {
    templateUrl: 'views/products.html',
    routeHandler: (domEntryPoint, routeParams) => {

			if (!window.BeerLocator.pocSearch.id) {
				router.navigateTo('home')
				return
			};

			products.renderCart();

      BeerLocator.productsListDom = document.querySelector('products');
			BeerLocator.productsListDom.addEventListener('click', e => {
					if (!e.isTrusted || !e.clientX || !e.clientY) return
					// add product
          if (e.target.classList.contains('product__add')) {
						products.add(e.target.dataset.id);
          }
					// remove product
					if (e.target.classList.contains('product__remove')) {
						products.remove(e.target.dataset.id);
          }
      });
      loader.block();
      // fetch GraphQL products api
      query.getBeers(window.BeerLocator.pocSearch.id)
        .then(res => {
          loader.unblock();
          if (res.data.poc.products.length) {
            BeerLocator.renderProducts(res.data.poc.products);
          }
          console.log(`GraphQL pocCategorySearch:`);
          console.log(res.data);
        });
    }
  })
	.otherwise(() => {
		// If no route configuration matches, the otherwise route is invoked.
		console.log('I am the otherwise route');
		router.navigateTo('404');
	});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apollo_fetch__ = __webpack_require__(5);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__apollo_fetch__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export constructDefaultOptions */
/* harmony export (immutable) */ __webpack_exports__["a"] = createApolloFetch;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cross_fetch_polyfill__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cross_fetch_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_cross_fetch_polyfill__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

function buildWareStack(funcs, modifiedObject, resolve) {
    var _this = this;
    var next = function () {
        if (funcs.length > 0) {
            var f = funcs.shift();
            if (f) {
                f.apply(_this, [modifiedObject, next]);
            }
        }
        else {
            resolve(modifiedObject);
        }
    };
    next();
}
function constructDefaultOptions(requestOrRequests, options) {
    var body;
    try {
        body = JSON.stringify(requestOrRequests);
    }
    catch (e) {
        throw new Error("Network request failed. Payload is not serializable: " + e.message);
    }
    return __assign({ body: body, method: 'POST' }, options, { headers: __assign({ Accept: '*/*', 'Content-Type': 'application/json' }, options.headers || []) });
}
function throwHttpError(response, error) {
    var httpError;
    if (response && response.status >= 300) {
        httpError = new Error("Network request failed with status " + response.status + " - \"" + response.statusText + "\"");
    }
    else {
        httpError = new Error("Network request failed to return valid JSON");
    }
    httpError.response = response;
    httpError.parseError = error;
    throw httpError;
}
function throwBatchError(response) {
    var httpError = new Error("A batched Operation of responses for ");
    httpError.response = response;
    throw httpError;
}
function createApolloFetch(params) {
    if (params === void 0) { params = {}; }
    var constructOptions = params.constructOptions, customFetch = params.customFetch;
    var _uri = params.uri || '/graphql';
    var middlewares = [];
    var batchedMiddlewares = [];
    var afterwares = [];
    var batchedAfterwares = [];
    var applyMiddlewares = function (requestAndOptions, batched) {
        return new Promise(function (resolve, reject) {
            if (batched) {
                buildWareStack(batchedMiddlewares.slice(), requestAndOptions, resolve);
            }
            else {
                buildWareStack(middlewares.slice(), requestAndOptions, resolve);
            }
        });
    };
    var applyAfterwares = function (responseObject, batched) {
        return new Promise(function (resolve, reject) {
            if (batched) {
                buildWareStack(batchedAfterwares.slice(), responseObject, resolve);
            }
            else {
                buildWareStack(afterwares.slice(), responseObject, resolve);
            }
        });
    };
    var apolloFetch = function (request) {
        var options = {};
        var parseError;
        var batched = Array.isArray(request);
        var requestObject = (batched
            ? {
                requests: request,
                options: options,
            }
            : {
                request: request,
                options: options,
            });
        return applyMiddlewares(requestObject, batched)
            .then(function (reqOpts) {
            var construct = constructOptions || constructDefaultOptions;
            var requestOrRequests = reqOpts.request ||
                reqOpts.requests;
            return construct(requestOrRequests, reqOpts.options);
        })
            .then(function (opts) {
            options = __assign({}, opts);
            return (customFetch || fetch)(_uri, options);
        })
            .then(function (response) {
            return response.text().then(function (raw) {
                try {
                    var parsed = JSON.parse(raw);
                    response.raw = raw;
                    response.parsed = parsed;
                    return response;
                }
                catch (e) {
                    parseError = e;
                    response.raw = raw;
                    return response;
                }
            });
        })
            .then(function (response) {
            return applyAfterwares({
                response: response,
                options: options,
            }, batched);
        })
            .then(function (_a) {
            var response = _a.response;
            if (response.parsed) {
                if (batched) {
                    if (Array.isArray(response.parsed)) {
                        return response.parsed;
                    }
                    else {
                        throwBatchError(response);
                    }
                }
                else {
                    return __assign({}, response.parsed);
                }
            }
            else {
                throwHttpError(response, parseError);
            }
        });
    };
    apolloFetch.use = function (middleware) {
        if (typeof middleware === 'function') {
            middlewares.push(middleware);
        }
        else {
            throw new Error('Middleware must be a function');
        }
        return apolloFetch;
    };
    apolloFetch.useAfter = function (afterware) {
        if (typeof afterware === 'function') {
            afterwares.push(afterware);
        }
        else {
            throw new Error('Afterware must be a function');
        }
        return apolloFetch;
    };
    apolloFetch.batchUse = function (middleware) {
        if (typeof middleware === 'function') {
            batchedMiddlewares.push(middleware);
        }
        else {
            throw new Error('Middleware must be a function');
        }
        return apolloFetch;
    };
    apolloFetch.batchUseAfter = function (afterware) {
        if (typeof afterware === 'function') {
            batchedAfterwares.push(afterware);
        }
        else {
            throw new Error('Afterware must be a function');
        }
        return apolloFetch;
    };
    return apolloFetch;
}
//# sourceMappingURL=apollo-fetch.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob();
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    };

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue+','+value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) { items.push(name); });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) { items.push(value); });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) { items.push([name, value]); });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = 'status' in options ? options.status : 200;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);
      var xhr = new XMLHttpRequest();

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  };
  self.fetch.polyfill = true;
})(typeof self !== 'undefined' ? self : this);

/*
 * Rollup wraps up the whatwg-fetch code on ponyfill mode in
 * order to prevent it from adding fetch to the global object.
 */


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Loader__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__GoogleMaps__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Queries__ = __webpack_require__(2);




const gMap = new __WEBPACK_IMPORTED_MODULE_1__GoogleMaps__["a" /* default */]();
const loader = new __WEBPACK_IMPORTED_MODULE_0__Loader__["a" /* default */]();
const query = new __WEBPACK_IMPORTED_MODULE_2__Queries__["a" /* default */]();

class BeerLocator {

  constructor() {
    this.address = {};
    this.pocSearch = {};
    this.addressResultsDom = '';
    this.productsListDom = '';
  }

  searchHandler(e, input) {
    let address = document.getElementById('search_address').value;
    if (address && (e.keyCode === 13 || e.key === `Enter`)) {
      loader.block();
      this.clearSearchResults();
      query.getAddressLocation(address)
        .then(res => res.json())
        .then(data => {
          loader.unblock();

          if (!data.results.length) {
            this.renderAddress('Address not found.');
            gMap.clearMarkers();
            gMap.initBrazil();
            return
          }

          this.address = data.results[0];

          // add marker to gMap
          const location = this.address.geometry.location;
          gMap.addMarkers([{lat: location.lat, lng: location.lng}])

          loader.block();
          // fetch GraphQL POC api
          query.getPOC(location)
            .then(res => {
              loader.unblock();

              console.log(`GraphQL pocSearchMethod:`);
              console.log(res.data);

              if (res.data.pocSearch.length) {
                this.renderAddress(this.address.formatted_address, true);
                this.pocSearch = res.data.pocSearch[0];
              } else {
                this.renderAddress('No POCs found near this location.');
              }
            });

          console.log(`Google maps API:`);
          console.log(data.results);
        })
        .catch()
    } else if (e.key === 'Escape' && !loader.loading) {
      this.clearInput(input);
      this.clearSearchResults();
    }
  }

  clearInput(input) {
    input.value = '';
    gMap.clearMarkers();
    gMap.initBrazil();
  }

  clearSearchResults() {
    this.clearAddress();
  }

  clearAddress() {
    console.log(`[Address cleared]`);
    this.addressResultsDom.innerHTML = ``;
  }

  clearProducts() {
    console.log(`[Products cleared]`);
    this.productsListDom.innerHTML = ``;
  }

  renderAddress(message, showBuy) {
    let template = ``;
    if (showBuy) {
      template = `
        <ul class='address__list'>
          <li class='address__list-item'>
            <span class='address__location'>${message}</span>
            <span class='btn btn--dark address__get-beers'></span>
          </li>
        </ul>
      `;
    } else {
      template = `
        <ul class='address__list'>
          <li class='address__list-item address__list-item--error'><span>${message}</span></li>
        </ul>
      `;
    }
    this.addressResultsDom.innerHTML = template;
  }

  renderProducts(products) {
    let productsHtml = '';
    products.map((product, index) => {
      let p = product.productVariants[0];
      productsHtml += `
        <div class='products__item' data-id='${index}'>
          <div class='product__title'>${p.title}</div>
          <div class='product__image'><img src='${p.imageUrl}' /></div>
          <div class='product__price'>R$ <span class='product__value product__value--id${index}'>${p.price}</span></div>
          <div class='product__controls'>
            <div class='btn btn--light product__remove' data-id='${index}'>-</div>
            <div class='product__quantity product__quantity--id${index}'>0</div>
            <div class='btn btn--light product__add' data-id='${index}'>+</div>
          </div>
        </div>
      `;
    });

    this.productsListDom.innerHTML = productsHtml;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (BeerLocator);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Products {

  constructor() {
    this.totalCart = 0;
  }

  add(id) {
    const qty = document.querySelector(`.product__quantity--id${id}`)
    const value = document.querySelector(`.product__value--id${id}`)
    qty.innerHTML = ++qty.innerHTML;
    this.totalCart = parseFloat(this.totalCart) + parseFloat(value.innerHTML)
    this.updateCart()
  }

  remove(id) {
    const qty = document.querySelector(`.product__quantity--id${id}`)
    const value = document.querySelector(`.product__value--id${id}`)
    if (qty.innerHTML > 0) {
      this.totalCart = parseFloat(this.totalCart) - parseFloat(value.innerHTML);
      qty.innerHTML = --qty.innerHTML;
      this.updateCart()
    }
  }

  removeCart() {
    if(document.querySelectorAll('.cart').length) {
      document.querySelector('.cart').remove();
    }    
  }

  renderCart() {
    let header = document.querySelector('.header');
    const template = `
    <div class='cart'>
      <div class='cart__title'>Total</div>
      <div class='cart__total'>R$ <span class='cart__value'>0</span></div>
    </div>`;
    header.insertAdjacentHTML('beforeend', template)
  }

  updateCart() {
    let cartValue = document.querySelector('.cart__value');
    cartValue.innerHTML = parseFloat(this.totalCart.toFixed(2));
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Products);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var parseRouteParamToCorrectType = function parseRouteParamToCorrectType(paramValue) {
	if (!isNaN(paramValue)) {
		return parseInt(paramValue, 10);
	}

	if (paramValue === 'true' || paramValue === 'false') {
		return JSON.parse(paramValue);
	}

	return paramValue;
};

var extractRouteParams = function extractRouteParams(routeIdentifier, currentHash) {
	var splittedHash = currentHash.split('/');
	var splittedRouteIdentifier = routeIdentifier.split('/');

	return splittedRouteIdentifier.map(function (routeIdentifierToken, index) {
		if (routeIdentifierToken.indexOf(':', 0) === -1) {
			return null;
		}
		var routeParam = {};
		var key = routeIdentifierToken.substr(1, routeIdentifierToken.length - 1);
		routeParam[key] = splittedHash[index];
		return routeParam;
	}).filter(function (p) {
		return p !== null;
	}).reduce(function (acc, curr) {
		Object.keys(curr).forEach(function (key) {
			acc[key] = parseRouteParamToCorrectType(curr[key]);
		});
		return acc;
	}, {});
};

var findMatchingRouteIdentifier = function findMatchingRouteIdentifier(currentHash, routeKeys) {
	var splittedHash = currentHash.split('/');
	var firstHashToken = splittedHash[0];

	return routeKeys.filter(function (routeKey) {
		var splittedRouteKey = routeKey.split('/');
		var staticRouteTokensAreEqual = splittedRouteKey.map(function (routeToken, i) {
			if (routeToken.indexOf(':', 0) !== -1) {
				return true;
			}
			return routeToken === splittedHash[i];
		}).reduce(function (countInvalid, currentValidationState) {
			if (currentValidationState === false) {
				++countInvalid;
			}
			return countInvalid;
		}, 0) === 0;

		return routeKey.indexOf(firstHashToken, 0) !== -1 && staticRouteTokensAreEqual && splittedHash.length === splittedRouteKey.length;
	})[0];
};

var XMLHttpRequestFactory = window.XMLHttpRequest;

var loadTemplate = function loadTemplate(templateUrl, successCallback) {
	var xhr = new XMLHttpRequestFactory();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			successCallback(xhr.responseText);
		}
	};
	xhr.open('GET', templateUrl);
	xhr.send();
};

var renderTemplates = function renderTemplates(routeConfiguration, domEntryPoint, successCallback) {
	if (!routeConfiguration) {
		return;
	}

	if (routeConfiguration.templateString) {
		domEntryPoint.innerHTML = routeConfiguration.templateString;
		successCallback();
	}

	if (routeConfiguration.templateUrl) {
		loadTemplate(routeConfiguration.templateUrl, function (templateString) {
			domEntryPoint.innerHTML = templateString;
			successCallback();
		});
	}

	if (routeConfiguration.templateId) {
		var templateScript = document.getElementById(routeConfiguration.templateId);
		domEntryPoint.innerHTML = templateScript.text;
		successCallback();
	}
};

var createRouter = function createRouter(domEntryPoint) {
	var routes = {};
	var lastDomEntryPoint = domEntryPoint.cloneNode(true);
	var lastRouteHandler = null;

	var navigateTo = function navigateTo(hashUrl) {
		window.location.hash = hashUrl;
	};

	var otherwise = function otherwise(routeHandler) {
		routes['*'] = routeHandler;
	};

	var addRoute = function addRoute(hashUrl, routeHandler, data) {
		routes[hashUrl] = routeHandler;
		routes[hashUrl].data = data;
		return { addRoute: addRoute, otherwise: otherwise, navigateTo: navigateTo };
	};

	var initializeDomElement = function initializeDomElement() {
		if (!domEntryPoint.parentElement) {
			return;
		}

		var domClone = lastDomEntryPoint.cloneNode(true);
		domEntryPoint.parentElement.insertBefore(domClone, domEntryPoint);

		if (typeof domEntryPoint.remove === 'undefined') {
			domEntryPoint.removeNode(true);
		} else {
			domEntryPoint.remove();
		}

		domEntryPoint = domClone;
	};

	var disposeLastRoute = function disposeLastRoute() {
		if (!lastRouteHandler) return;
		if (typeof lastRouteHandler.dispose === 'undefined') return;
		lastRouteHandler.dispose(domEntryPoint);
	};

	var handleRouting = function handleRouting() {
		var defaultRouteIdentifier = '*';
		var currentHash = location.hash.slice(1);

		var maybeMatchingRouteIdentifier = findMatchingRouteIdentifier(currentHash, Object.keys(routes));
		var routeParams = {};
		if (maybeMatchingRouteIdentifier) {
			routeParams = extractRouteParams(maybeMatchingRouteIdentifier, currentHash);
		}

		var routeHandler = Object.keys(routes).indexOf(maybeMatchingRouteIdentifier) > -1 ? routes[maybeMatchingRouteIdentifier] : routes[defaultRouteIdentifier];

		if (!routeHandler) {
			return;
		}

		disposeLastRoute(routeHandler);

		// Memory last routeHandler
		lastRouteHandler = routeHandler;

		initializeDomElement();

		if (typeof routeHandler === 'function') {
			routeHandler(domEntryPoint, routeParams, routeHandler.data);
		} else {

			if (!routeHandler.templateString && !routeHandler.templateId && !routeHandler.templateUrl) {
				throw Error('No template configured for route ' + currentHash);
			}

			renderTemplates(routeHandler, domEntryPoint, function () {
				if (typeof routeHandler.routeHandler === 'function') {
					routeHandler.routeHandler(domEntryPoint, routeParams, routeHandler.data);
				}
			});
		}
	};

	if (window) {
		window.removeEventListener('hashchange', handleRouting);
		window.addEventListener('hashchange', handleRouting);
		window.removeEventListener('load', handleRouting);
		window.addEventListener('load', handleRouting);
	}

	return { addRoute: addRoute, otherwise: otherwise, navigateTo: navigateTo };
};

exports.createRouter = createRouter;


/***/ })
/******/ ]);