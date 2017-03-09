
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
import Vuex from 'vuex'

// # Tell Vue to use these plugins
Vue.use( Vuex );
Vue.use( VueRouter );

/**
 * [store description]
 * @type {Vuex}
 */
const store = new Vuex.Store({

	state: {

		/**
		 * [drawertype description]
		 * @type {Number}
		 */
		drawertype: 0,

		/**
		 * [is_lineabox description]
		 * @type {Boolean}
		 */
	    is_lineabox: false,

	    /**
	     * [dimensions description]
	     * @type {Object}
	     */
	    dimensions: {

	    	/**
	    	 * [width description]
	    	 * @type {Number}
	    	 */
	        width: 800,

	        /**
	         * [shoulder_height description]
	         * @type {Number}
	         */
	        shoulder_height: 100,

	        /**
	         * [length description]
	         * @type {Number}
	         */
	        length: 600
	    },

	    /**
	     * drawer width must not exceed a value for a H bridge to be chosen
	     * @type {Boolean}
	     */
	    is_suitable_width_4hbridge: true,

	    /**
	     * shoulder height must exceed a minimum value to allow for a bridge to be chosen
	     * @type {Boolean}
	     */
	    is_suitable_height_4bridge: true,

	    /**
	     * [bridge_orientation description]
	     * @type {String}
	     */
	    bridge_orientation: "",

	    /**
	     * [has_bridge description]
	     * @type {Boolean}
	     */
	    has_bridge: false,

	    /**
	     * [bridge_supportID description]
	     * @type {Number}
	     */
	    bridge_supportID: 0,

	    /**
	     * [bridge_ID description]
	     * @type {Number}
	     */
	    bridge_ID: 0,

	    /**
	     * [bridge_supports_selected description]
	     * @type {Array}
	     */
	    bridge_supports_selected: [],

	    /**
	     * [bridges_selected description]
	     * @type {Array}
	     */
	    bridges_selected: [],

	   	/**
	     * [dividers description]
	     * @type {Array}
	     */
	    dividers_selected:[],

	    /**
	     * [pdf description]
	     * @type {Object}
	     */
	    pdf: {

	    	brochure: false,
	    	summary: true,
	    	email: '',
	    	send: false,
	    	download: false
	    }		
	},

	mutations: {

		setDrawerType: function( state, typeID ) {
			console.log( "drawer type changed to: " + typeID );
			state.drawertype = typeID;
		},

		isLineaBox: function( state, val ) {
			console.log( "lineabox flag changed to: " + val );
			state.is_lineabox = val;
		},

		setWidth: function( state, val ) {
			console.log( "width dimension changed to: " + val );
			state.dimensions.width = val;
		},

		setLength: function( state, val ) {
			console.log( "length dimension changed to: " + val );
			state.dimensions.length = val;
		},

		setShoulderHeight: function( state, val ) {
			console.log( "shoulder height dimension changed to: " + val );
			state.dimensions.shoulder_height = val;
		},

		setBridgeOrientation: function( state, val ) {
			console.log( "bridge orientation changed to: " + val );
			state.bridge_orientation = val;
		},

		isSuitableForHBridge: function( state, val ) {
			console.log( "is_suitable_width_4hbridge changed to: " + val );
			state.is_suitable_width_4hbridge = val;
		},

		isSuitableHeightForBridge: function( state, val ) {
			console.log( "is_suitable_height_4bridge changed to: " + val );
			state.is_suitable_height_4bridge = val;
		},

		hasBridge: function( state, val ) {
			console.log( "has_bridge changed to: " + val );
			state.has_bridge = val;
		},

		setBridgeSupportID: function( state, val ) {
			console.log( "bridge_supportID changed to: " + val );
			state.bridge_supportID = val;
		},

		setBridgeID: function( state, val ) {
			console.log( "bridge_ID changed to: " + val );
			state.bridge_ID = val;
		},

		pushBridgeSupport: function( state, obj ) {
			console.log( "pushing support: " + obj );
			state.bridge_supports_selected.push( obj );
		},

		removeBridgeSupport: function( state, val ) { /** TODO **/ },

		clearBridgeSupports: function( state ) {
			console.log( "Bridge supports cleanUp");
			state.bridge_supports_selected = [];
		},

		pushBridge: function( state, obj ) {
			console.log( "pushing bridge: " + obj );
			state.bridges_selected.push( obj );
		},

		removeBridge: function( state, val ) { /** TODO **/ },

		clearBridges: function( state ) {
			console.log( "Bridges cleanUp");
			state.bridges_selected = [];
		},

		clearBridgeData: function( state ) { 

			console.log( "clearing bridge data" );

            state.bridge_supports_selected = [];
            state.bridges_selected = [];
            state.bridge_ID = 0;
            state.bridge_supportID = 0;
            state.has_bridge = false;
       	},

       	manageDivider: function ( state, obj ) {

       		console.log( "managing dividers" );

            if(  $.inArray( obj.id, state.dividers_selected ) != -1 ) {
            	console.log( "pulling out divider" );
                state.dividers_selected.splice( $.inArray( obj.id, state.dividers_selected ), 1 );
                return;
            }
            
            console.log( "pushing in divider" );
            state.dividers_selected.push( obj.id );
       	},
	}
});

// # Load components ( NAV )
const step1 = Vue.component( 'step1', require('./components/step1.vue' ));
const step2 = Vue.component( 'step2', require('./components/step2.vue' ));
const step3 = Vue.component( 'step3', require('./components/step3.vue' ));
const stepponte = Vue.component( 'stepponte', require('./components/step-ponte.vue' ));
const step4 = Vue.component( 'step4', require('./components/step4.vue' ));
const step5 = Vue.component( 'step5', require('./components/step5.vue' ));

// # Load others components
const languageselector = Vue.component( 'languageselector', require('./components/languageselector.vue' ) );

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
		step1,
		step2,
		step3,
		stepponte,
		step4,
		step5
	},

  	data : {}
 
}).$mount( '#app' );


