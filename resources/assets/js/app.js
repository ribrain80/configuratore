
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


Vue.component('languageselector', require('./components/languageselector.vue'));
Vue.component('step2', require('./components/step2.vue'));
Vue.component('step3', require('./components/step3.vue'));
Vue.component('step4', require('./components/step4.vue'));
Vue.component('step5', require('./components/step5.vue'));