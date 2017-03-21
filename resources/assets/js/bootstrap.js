/**
 *  Loading lodash: usefull library for handling arrays and objects
 */
window._ = require('lodash');

/**
 * Loading Jquery.
 * We need to use Jquery plugins not compatible with webpack so we import jquery using vendor.js
 */
//window.$ = window.jQuery = require( 'jquery' );

/**
 * Load bootstrap js libs
 */
require( 'bootstrap-sass' );

/**
 * Load Vue for data-bind
 * @type {Vue}
 */
window.Vue = require( 'vue' );

/**
 * Load Axios for handle ajax calls with ES6 promises
 */
window.Axios = require ( 'axios');

/**
 * Load VueCookie for handle cookies inside Vue
 */

window.VueCookie = require('vue-cookie');

/**
 * Inject Vue-cookie plugin in Vue
 */
Vue.use( VueCookie );