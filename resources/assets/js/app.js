
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

// # Common utils
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt( 0 ).toUpperCase() + this.slice( 1 );
};

/**
 * We will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */

import Vue        from 'vue'
import router     from './router'
import store      from './store'
import {fabric}   from 'fabric'

// # Load others components
const languageselector = Vue.component( 'languageselector', require('./components/languageselector.vue' ) );
const sidebar = Vue.component( 'sidebar', require('./components/sidebar.vue' ) );
const appnavbar = Vue.component( 'appnavbar', require('./components/appnavbar.vue' ) );

// # Load components ( NAV )
const step1 = Vue.component( 'step1', require('./components/step1.vue' ));
const step2 = Vue.component( 'step2', require('./components/step2.vue' ));
const step3 = Vue.component( 'step3', require('./components/step3.vue' ));
const stepponte = Vue.component( 'stepponte', require('./components/step-ponte.vue' ));
const step4 = Vue.component( 'step4', require('./components/step4.vue' ));
const step4_3d = Vue.component( 'step4_3d', require('./components/step4_3d.vue' ));
const step5 = Vue.component( 'step5', require('./components/step5.vue' ));
const error = Vue.component( 'error', require('./components/500.vue' ));

// # Create and mount root instance.
// # Make sure to inject the router.
// # Route components will be rendered inside <router-view>.
const App = new Vue({

	/**
	 * vuex store injection
	 */
	store,

	/**
	 * router injection
	 */
	router,

	/**
	 * Components ( children of this root instance )
	 * @type {Object}
	 */
	components : {
		languageselector,
        sidebar,
        appnavbar,
		step1,
		step2,
		step3,
		stepponte,
		step4,
		step5,
		error
	},

  	data : {},

    mounted () {

        // # Log mount
        console.log( "Application mounted" );

        //Get all init values from Api
        this.$store.dispatch('initApp',this.$router);
    }
 
}).$mount( '#app' );


