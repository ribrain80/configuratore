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