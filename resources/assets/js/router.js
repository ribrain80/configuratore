// # Import needed packages
import VueRouter from 'vue-router'
import Vue       from 'vue'

// # Tell Vue to use VueRouter
Vue.use( VueRouter );

// # Components lazy loading
const step1 = ( resolve ) => require(['./components/step1.vue'], resolve);
const step2 = ( resolve ) => require(['./components/step2.vue'], resolve);
const step3 = ( resolve)  => require(['./components/step3.vue'], resolve);
const stepponte = ( resolve ) => require(['./components/step-ponte.vue'], resolve);
const step4 = ( resolve ) => require(['./components/step4.vue'], resolve);
const step5 = ( resolve ) => require(['./components/step5.vue'], resolve);
const error = ( resolve ) => require(['./components/500.vue'], resolve);

// # Route definitions
export default new VueRouter({

	// # Preserve browser history
    mode: 'history',

    // # Base path
    base: __dirname,

    /**
     * App Routes
     * @type {Array}
     */
	routes: [
		{ 
			path: '/split/step1', 
			component: step1
		},
		{ 
			path: '/split/step2', 
		  	component: step2
		},
		{ 
			path: '/split/step3', 
			component: step3 
		},
		{ 
			path: '/split/stepponte', 
			component: stepponte 
		},
		{ 
			path: '/split/step4', 
			component: step4 
		},
		{ 
			path: '/split/step5', 
			component: step5
		},
		{ 
			path: '/split/500', 
			component: error
		},

	]
});