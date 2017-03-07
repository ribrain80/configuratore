
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * We will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */
import VueRouter  from 'vue-router'
import router     from './router'
import Vue        from 'vue'

Vue.use(VueRouter)

// lazy load components
const step1 = Vue.component('step1', require('./components/step1.vue'));

// Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.
new Vue({

  router,

  components : {
    step1
  },

  data : {

  }
 
}).$mount('#app')
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


/*Vue.component('languageselector', require('./components/languageselector.vue'));
Vue.component('newconfiguration', require('./components/newconfiguration.vue'));
const route1 = Vue.component('step1', require('./components/step1.vue'));
Vue.component('step2', require('./components/step2.vue'));
Vue.component('stepponte', require('./components/step-ponte.vue'));
Vue.component('step3', require('./components/step3.vue'));
Vue.component('step4', require('./components/step4.vue'));
Vue.component('step5', require('./components/step5.vue'));
*/


