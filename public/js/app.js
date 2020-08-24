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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nBrowserslistError: [BABEL] C:\\users\\alan\\desktop\\laravelapp\\project\\resources\\js\\app.js: Unknown browser query `basedir=$(dirname \"$(echo \"$0\" | sed -e 's`. Maybe you are using old Browserslist or made typo in query. (While processing: \"C:\\\\users\\\\alan\\\\desktop\\\\laravelapp\\\\project\\\\node_modules\\\\@babel\\\\preset-env\\\\lib\\\\index.js\")\n    at unknownQuery (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\browserslist\\index.js:285:10)\n    at C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\browserslist\\index.js:372:11\n    at Array.reduce (<anonymous>)\n    at resolve (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\browserslist\\index.js:318:18)\n    at browserslist (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\browserslist\\index.js:443:21)\n    at getTargets (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\@babel\\helper-compilation-targets\\lib\\index.js:199:48)\n    at C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\@babel\\preset-env\\lib\\index.js:258:57\n    at C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\@babel\\helper-plugin-utils\\lib\\index.js:19:12\n    at C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\@babel\\core\\lib\\config\\full.js:199:14\n    at Generator.next (<anonymous>)\n    at Function.<anonymous> (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\@babel\\core\\lib\\gensync-utils\\async.js:26:3)\n    at Generator.next (<anonymous>)\n    at step (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\gensync\\index.js:254:32)\n    at evaluateAsync (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\gensync\\index.js:284:5)\n    at Function.errback (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\gensync\\index.js:108:7)\n    at errback (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\@babel\\core\\lib\\gensync-utils\\async.js:70:18)\n    at async (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\gensync\\index.js:183:31)\n    at onFirstPause (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\gensync\\index.js:209:13)\n    at Generator.next (<anonymous>)\n    at cachedFunction (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\@babel\\core\\lib\\config\\caching.js:68:46)\n    at cachedFunction.next (<anonymous>)\n    at loadPresetDescriptor (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\@babel\\core\\lib\\config\\full.js:292:43)\n    at loadPresetDescriptor.next (<anonymous>)\n    at recurseDescriptors (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\@babel\\core\\lib\\config\\full.js:107:30)\n    at recurseDescriptors.next (<anonymous>)\n    at loadFullConfig (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\@babel\\core\\lib\\config\\full.js:142:6)\n    at loadFullConfig.next (<anonymous>)\n    at Function.transform (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\@babel\\core\\lib\\transform.js:25:45)\n    at transform.next (<anonymous>)\n    at step (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\gensync\\index.js:262:25)\n    at C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\gensync\\index.js:266:13\n    at async.call.result.err.err (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\gensync\\index.js:216:11)\n    at C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\gensync\\index.js:184:28\n    at C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\@babel\\core\\lib\\gensync-utils\\async.js:72:7\n    at C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\gensync\\index.js:108:33\n    at step (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\gensync\\index.js:280:14)");

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/css-loader/index.js):\nModuleBuildError: Module build failed (from ./node_modules/postcss-loader/src/index.js):\nBrowserslistError: Unknown browser query `basedir=$(dirname \"$(echo \"$0\" | sed -e 's`. Maybe you are using old Browserslist or made typo in query.\n    at unknownQuery (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\browserslist\\index.js:285:10)\n    at C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\browserslist\\index.js:372:11\n    at Array.reduce (<anonymous>)\n    at resolve (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\browserslist\\index.js:318:18)\n    at browserslist (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\browserslist\\index.js:443:21)\n    at Browsers.parse (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\autoprefixer\\lib\\browsers.js:63:12)\n    at new Browsers (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\autoprefixer\\lib\\browsers.js:46:26)\n    at loadPrefixes (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\autoprefixer\\lib\\autoprefixer.js:98:20)\n    at plugin (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\autoprefixer\\lib\\autoprefixer.js:109:20)\n    at LazyResult.run (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\postcss\\lib\\lazy-result.js:295:14)\n    at LazyResult.asyncTick (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\postcss\\lib\\lazy-result.js:208:26)\n    at C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\postcss\\lib\\lazy-result.js:250:14\n    at new Promise (<anonymous>)\n    at LazyResult.async (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\postcss\\lib\\lazy-result.js:246:23)\n    at LazyResult.then (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\postcss\\lib\\lazy-result.js:127:17)\n    at C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\postcss-loader\\src\\index.js:142:8\n    at C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\webpack\\lib\\NormalModule.js:316:20\n    at C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\loader-runner\\lib\\LoaderRunner.js:367:11\n    at C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\loader-runner\\lib\\LoaderRunner.js:233:18\n    at context.callback (C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\loader-runner\\lib\\LoaderRunner.js:111:13)\n    at C:\\users\\alan\\desktop\\laravelapp\\project\\node_modules\\postcss-loader\\src\\index.js:208:9");

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\users\alan\desktop\laravelapp\project\resources\js\app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! C:\users\alan\desktop\laravelapp\project\resources\sass\app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });